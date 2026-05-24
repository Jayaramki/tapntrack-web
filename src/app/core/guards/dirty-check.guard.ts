import { CanDeactivateFn } from '@angular/router';

export interface DirtyCheckable {
  isDirty(): boolean;
}

export const dirtyCheckGuard: CanDeactivateFn<DirtyCheckable> = (component) => {
  if (component.isDirty && component.isDirty()) {
    return confirm('You have unsaved changes. Leave without saving?');
  }
  return true;
};
