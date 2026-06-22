import{a as de,b as le}from"./chunk-YSNSACOI.js";import{a as pe,b as ue}from"./chunk-6M4IXT3P.js";import{a as se,b as me}from"./chunk-FY4N33HD.js";import{b as ge,c as ve}from"./chunk-GSQ3LC6W.js";import"./chunk-TBXGZ3P4.js";import{a as fe}from"./chunk-QTJDY7ZT.js";import"./chunk-Q7JRXLK2.js";import"./chunk-4ZRVJ64U.js";import{b as L,c as m,d as U,e as j,f as G,h as X,i as Y,j as J,k as K,l as Q,m as W,o as Z,p as te,q as ne,r as re}from"./chunk-BUSOTY3R.js";import"./chunk-L2J2QV7F.js";import{b as ce}from"./chunk-SS6SAIFE.js";import{a as ie,k as oe,l as ae}from"./chunk-ZFPKREZS.js";import"./chunk-3T4NSRG3.js";import"./chunk-DHX4LLMV.js";import{b as ee,d as S}from"./chunk-S4C2365B.js";import{d as B,f as q,g as $}from"./chunk-TWRP74EN.js";import"./chunk-IJ4D5MUK.js";import{Da as T,Va as H}from"./chunk-RC4I7ZLI.js";import{$a as c,Fb as v,Hb as O,Ib as a,Jb as V,Ma as F,N as _,Na as z,O as I,Oa as P,Q as w,Qa as D,Ra as A,Rb as b,S as l,ab as f,ca as N,fb as p,gb as n,ha as h,hb as o,hc as y,ib as s,ka as E,lc as g,ma as k,tb as x,tc as C,ub as R,za as d}from"./chunk-2H46AMQ2.js";var he=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var Me=`
    ${he}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,_e={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},xe=(()=>{class e extends H{name="textarea";style=Me;classes=_e;static \u0275fac=(()=>{let t;return function(u){return(t||(t=k(e)))(u||e)}})();static \u0275prov=_({token:e,factory:e.\u0275fac})}return e})();var be=new w("TEXTAREA_INSTANCE"),ye=(()=>{class e extends te{componentName="Textarea";bindDirectiveInstance=l(S,{self:!0});$pcTextarea=l(be,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=g();pTextareaUnstyled=g();autoResize;pSize;variant=g();fluid=g(void 0,{transform:C});invalid=g(void 0,{transform:C});$variant=y(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new N;ngControlSubscription;_componentStyle=l(xe);ngControl=l(U,{optional:!0,self:!0});pcFluid=l(ie,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),E(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t)}),E(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=P({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(i,u){i&1&&x("input",function(Ee){return u.onInput(Ee)}),i&2&&O(u.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",C],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[b([xe,{provide:be,useExisting:e},{provide:ee,useExisting:e}]),D([S]),A]})}return e})(),Ce=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=z({type:e});static \u0275inj=I({})}return e})();function we(e,r){if(e&1&&s(0,"p-message",4),e&2){let t=R();p("text",t.loadError())}}function Ne(e,r){e&1&&(n(0,"div",12),a(1,"Name is required (2\u2013100 chars)."),o())}function ke(e,r){e&1&&(n(0,"div",12),a(1,"Father name is required (2\u2013100 chars)."),o())}function Fe(e,r){e&1&&(n(0,"div",12),a(1,"Valid 10-digit phone required."),o())}function ze(e,r){e&1&&(n(0,"div",12),a(1,"Address is required (min 5 chars)."),o())}var Se=class e{fb=l(W);router=l(q);route=l(B);data=l(ce);toastSvc=l(T);bookCtx=l(fe);saving=h(!1);loadError=h(null);customerId=h(null);isEdit=y(()=>this.customerId()!==null);form=this.fb.group({customer_number:[null],name:["",[m.required,m.minLength(2),m.maxLength(100)]],father_name:["",[m.required,m.minLength(2),m.maxLength(100)]],phone:["",[m.required,m.pattern(/^\d{10}$/)]],address:["",[m.required,m.minLength(5)]],profession:[""],is_active:[!0]});ngOnInit(){let r=this.route.snapshot.paramMap.get("id");r&&(this.customerId.set(r),this.data.customers.getById(r).subscribe({next:t=>this.form.patchValue(t.data),error:()=>this.loadError.set("Customer not found.")}))}isInvalid(r){let t=this.form.get(r);return!!(t?.invalid&&t?.touched)}onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}this.saving.set(!0);let r=this.form.value,i={book_id:this.bookCtx.bookId(),name:r.name,father_name:r.father_name,phone:r.phone,address:r.address,profession:r.profession||void 0,is_active:r.is_active,customer_number:r.customer_number??void 0};(this.isEdit()?this.data.customers.update(this.customerId(),i):this.data.customers.create(i)).subscribe({next:M=>{this.toastSvc.add({severity:"success",summary:this.isEdit()?"Customer Updated":"Customer Added",detail:M.data.name,life:2500}),setTimeout(()=>this.router.navigate(["/customers"]),800)},error:()=>{this.saving.set(!1),this.loadError.set("Failed to save. Please try again.")}})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=F({type:e,selectors:[["app-customer-form"]],features:[b([T])],decls:56,vars:23,consts:[[1,"page-header"],["icon","pi pi-arrow-left","severity","secondary","routerLink","/customers",3,"text","rounded"],[1,"page-title"],[1,"form-wrap"],["severity","error","styleClass","w-full mb-4",3,"text"],[3,"ngSubmit","formGroup"],[1,"form-grid"],[1,"field"],[2,"font-weight","400","color","var(--p-text-muted-color)"],["pInputText","","type","number","formControlName","customer_number","min","1","placeholder","Auto-assigned if blank",1,"w-full"],[2,"color","var(--p-red-500)"],["pInputText","","formControlName","name","placeholder","Full name",1,"w-full"],[1,"field-error"],["pInputText","","formControlName","father_name","placeholder","Father's name",1,"w-full"],["pInputText","","formControlName","phone","placeholder","10-digit mobile",1,"w-full"],["pInputText","","formControlName","profession","placeholder","e.g. Tailor, Vendor",1,"w-full"],[1,"field","full-width"],["pTextarea","","formControlName","address","rows","3","placeholder","Residential address",1,"w-full"],[1,"flex","items-center","gap-3"],["formControlName","is_active","inputId","isActive",3,"binary"],["for","isActive",2,"cursor","pointer","margin","0"],[1,"form-actions"],["type","submit","icon","pi pi-check",3,"label","loading","fluid"],["label","Cancel","icon","pi pi-times","severity","secondary","routerLink","/customers",3,"outlined","fluid"]],template:function(t,i){t&1&&(s(0,"p-toast"),n(1,"div",0),s(2,"p-button",1),n(3,"h1",2),a(4),o()(),n(5,"div",3)(6,"p-card"),c(7,we,1,1,"p-message",4),n(8,"form",5),x("ngSubmit",function(){return i.onSubmit()}),n(9,"div",6)(10,"div",7)(11,"label"),a(12,"Customer # "),n(13,"span",8),a(14,"(optional)"),o()(),s(15,"input",9),o(),n(16,"div",7)(17,"label"),a(18,"Name "),n(19,"span",10),a(20,"*"),o()(),s(21,"input",11),c(22,Ne,2,0,"div",12),o(),n(23,"div",7)(24,"label"),a(25,"Father Name "),n(26,"span",10),a(27,"*"),o()(),s(28,"input",13),c(29,ke,2,0,"div",12),o(),n(30,"div",7)(31,"label"),a(32,"Phone "),n(33,"span",10),a(34,"*"),o()(),s(35,"input",14),c(36,Fe,2,0,"div",12),o(),n(37,"div",7)(38,"label"),a(39,"Profession"),o(),s(40,"input",15),o(),n(41,"div",16)(42,"label"),a(43,"Address "),n(44,"span",10),a(45,"*"),o()(),s(46,"textarea",17),c(47,ze,2,0,"div",12),o(),n(48,"div",7)(49,"div",18),s(50,"p-checkbox",19),n(51,"label",20),a(52,"Active"),o()()()(),n(53,"div",21),s(54,"p-button",22)(55,"p-button",23),o()()()()),t&2&&(d(2),p("text",!0)("rounded",!0),d(2),V(i.isEdit()?"Edit Customer":"Add Customer"),d(3),f(i.loadError()?7:-1),d(),p("formGroup",i.form),d(13),v("ng-invalid",i.isInvalid("name")),d(),f(i.isInvalid("name")?22:-1),d(6),v("ng-invalid",i.isInvalid("father_name")),d(),f(i.isInvalid("father_name")?29:-1),d(6),v("ng-invalid",i.isInvalid("phone")),d(),f(i.isInvalid("phone")?36:-1),d(10),v("ng-invalid",i.isInvalid("address")),d(),f(i.isInvalid("address")?47:-1),d(3),p("binary",!0),d(4),p("label",i.isEdit()?"Save Changes":"Add Customer")("loading",i.saving())("fluid",!0),d(),p("outlined",!0)("fluid",!0))},dependencies:[Z,X,L,Y,j,G,Q,K,J,$,re,ne,Ce,ye,ae,oe,le,de,ue,pe,ve,ge,me,se],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:24px}.page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0}.form-wrap[_ngcontent-%COMP%]{max-width:720px}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:0 24px}@media(min-width:768px){.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}}.field[_ngcontent-%COMP%]{margin-bottom:18px}.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:.875rem;font-weight:500;margin-bottom:6px}.field-error[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-red-500);margin-top:4px}.full-width[_ngcontent-%COMP%]{grid-column:1/-1}.form-actions[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap;padding-top:8px}.form-actions[_ngcontent-%COMP%]   p-button[_ngcontent-%COMP%]{flex:1;min-width:120px}.hint[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-text-muted-color);margin-top:4px}"]})};export{Se as CustomerFormComponent};
