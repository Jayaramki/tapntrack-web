import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, ButtonModule, CheckboxModule,
    CardModule, ToastModule, MessageModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
    }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .form-wrap { max-width: 560px; }
    .field { margin-bottom: 20px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .form-actions {
      display: flex; gap: 12px; padding-top: 8px;
      flex-wrap: wrap;
    }
    .form-actions p-button { flex: 1; min-width: 120px; }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/books" />
      <h1 class="page-title">{{ isEdit() ? 'Edit Book' : 'Add Book' }}</h1>
    </div>

    <div class="form-wrap">
      <p-card>
        @if (loadError()) {
          <p-message severity="error" [text]="loadError()!" styleClass="w-full mb-4" />
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="name">Book Name <span style="color:var(--p-red-500)">*</span></label>
            <input pInputText id="name" formControlName="name"
                   placeholder="e.g. Chennai Branch"
                   class="w-full" [class.ng-invalid]="isInvalid('name')" />
            @if (isInvalid('name')) {
              <div class="field-error">
                @if (form.get('name')?.errors?.['required']) { Name is required. }
                @else if (form.get('name')?.errors?.['minlength']) { Minimum 2 characters. }
                @else if (form.get('name')?.errors?.['maxlength']) { Maximum 100 characters. }
              </div>
            }
          </div>

          <div class="field">
            <div class="flex items-center gap-3">
              <p-checkbox formControlName="is_active" [binary]="true" inputId="isActive" />
              <label for="isActive" style="cursor:pointer; margin:0;">
                Active (book is accessible to its users)
              </label>
            </div>
          </div>

          <div class="form-actions">
            <p-button type="submit" [label]="isEdit() ? 'Save Changes' : 'Create Book'"
                      icon="pi pi-check" [loading]="saving()" [fluid]="true" />
            <p-button label="Cancel" icon="pi pi-times" severity="secondary"
                      [outlined]="true" routerLink="/books" [fluid]="true" />
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class BookFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);

  protected readonly saving = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly bookId = signal<number | null>(null);
  protected readonly isEdit = computed(() => this.bookId() !== null);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    is_active: [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId.set(Number(id));
      this.data.books.getById(Number(id)).subscribe({
        next: (res) => this.form.patchValue({ name: res.data.name, is_active: res.data.is_active }),
        error: () => this.loadError.set('Book not found.'),
      });
    }
  }

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const payload = { name: this.form.value.name!, is_active: this.form.value.is_active! };

    const req$ = this.isEdit()
      ? this.data.books.update(this.bookId()!, payload)
      : this.data.books.create(payload);

    req$.subscribe({
      next: () => {
        this.toastSvc.add({
          severity: 'success',
          summary: this.isEdit() ? 'Book Updated' : 'Book Created',
          detail: payload.name,
          life: 2500,
        });
        setTimeout(() => this.router.navigate(['/books']), 800);
      },
      error: () => {
        this.saving.set(false);
        this.loadError.set('Failed to save. Please try again.');
      },
    });
  }
}

