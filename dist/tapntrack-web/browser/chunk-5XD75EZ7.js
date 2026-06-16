import{a as de,b as le}from"./chunk-MQJ4WADV.js";import{a as se,b as me}from"./chunk-ZZCUESOW.js";import{a as ue}from"./chunk-JJ2JMDZM.js";import{a as oe,b as ae}from"./chunk-LF6PWUPN.js";import{b as ce,c as fe}from"./chunk-DI6OT4LG.js";import"./chunk-WDAGZAKS.js";import"./chunk-3DI7LYFY.js";import{b as L,c as m,d as U,e as j,f as G,h as X,j as Y,k as J,m as K,o as Q,p as Z,q as te,r as ie}from"./chunk-5WZ2OUSM.js";import"./chunk-WPXHZDND.js";import{b as pe}from"./chunk-JQSL2F5N.js";import"./chunk-SPXVRVIF.js";import{b as W,d as S,f as ee,s as ne,t as re}from"./chunk-RWVLOKZA.js";import{c as V,e as q,f as $}from"./chunk-QHDKVW22.js";import"./chunk-324X46NT.js";import{Ca as E,Ua as H}from"./chunk-CVSOQVV7.js";import{$a as c,Fb as v,Hb as O,Ib as d,Jb as B,Ma as k,N as I,Na as z,O as _,Oa as P,Q as w,Qa as D,Qb as b,Ra as A,S as l,ab as f,ca as N,fb as p,gb as n,gc as y,ha as h,hb as o,ib as s,ka as T,kc as g,ma as F,sc as C,tb as x,ub as R,za as a}from"./chunk-LHJ6PDSB.js";var ge=`
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
`;var Te=`
    ${ge}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,Ee={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},ve=(()=>{class e extends H{name="textarea";style=Te;classes=Ee;static \u0275fac=(()=>{let t;return function(u){return(t||(t=F(e)))(u||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var he=new w("TEXTAREA_INSTANCE"),xe=(()=>{class e extends Z{componentName="Textarea";bindDirectiveInstance=l(S,{self:!0});$pcTextarea=l(he,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=g();pTextareaUnstyled=g();autoResize;pSize;variant=g();fluid=g(void 0,{transform:C});invalid=g(void 0,{transform:C});$variant=y(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new N;ngControlSubscription;_componentStyle=l(ve);ngControl=l(U,{optional:!0,self:!0});pcFluid=l(ee,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),T(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t)}),T(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=P({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(i,u){i&1&&x("input",function(Ce){return u.onInput(Ce)}),i&2&&O(u.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",C],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[b([ve,{provide:he,useExisting:e},{provide:W,useExisting:e}]),D([S]),A]})}return e})(),be=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=z({type:e});static \u0275inj=_({})}return e})();function Ie(e,r){if(e&1&&s(0,"p-message",4),e&2){let t=R();p("text",t.loadError())}}function _e(e,r){e&1&&(n(0,"div",10),d(1,"Name is required (2\u2013100 chars)."),o())}function we(e,r){e&1&&(n(0,"div",10),d(1,"Father name is required (2\u2013100 chars)."),o())}function Ne(e,r){e&1&&(n(0,"div",10),d(1,"Valid 10-digit phone required."),o())}function Fe(e,r){e&1&&(n(0,"div",10),d(1,"Address is required (min 5 chars)."),o())}var ye=class e{fb=l(K);router=l(q);route=l(V);data=l(pe);toastSvc=l(E);bookCtx=l(ue);saving=h(!1);loadError=h(null);customerId=h(null);isEdit=y(()=>this.customerId()!==null);form=this.fb.group({name:["",[m.required,m.minLength(2),m.maxLength(100)]],father_name:["",[m.required,m.minLength(2),m.maxLength(100)]],phone:["",[m.required,m.pattern(/^\d{10}$/)]],address:["",[m.required,m.minLength(5)]],profession:[""],is_active:[!0]});ngOnInit(){let r=this.route.snapshot.paramMap.get("id");r&&(this.customerId.set(r),this.data.customers.getById(r).subscribe({next:t=>this.form.patchValue(t.data),error:()=>this.loadError.set("Customer not found.")}))}isInvalid(r){let t=this.form.get(r);return!!(t?.invalid&&t?.touched)}onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}this.saving.set(!0);let r=this.form.value,i={book_id:this.bookCtx.bookId(),name:r.name,father_name:r.father_name,phone:r.phone,address:r.address,profession:r.profession||void 0,is_active:r.is_active};(this.isEdit()?this.data.customers.update(this.customerId(),i):this.data.customers.create(i)).subscribe({next:M=>{this.toastSvc.add({severity:"success",summary:this.isEdit()?"Customer Updated":"Customer Added",detail:M.data.name,life:2500}),setTimeout(()=>this.router.navigate(["/customers"]),800)},error:()=>{this.saving.set(!1),this.loadError.set("Failed to save. Please try again.")}})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=k({type:e,selectors:[["app-customer-form"]],features:[b([E])],decls:50,vars:23,consts:[[1,"page-header"],["icon","pi pi-arrow-left","severity","secondary","routerLink","/customers",3,"text","rounded"],[1,"page-title"],[1,"form-wrap"],["severity","error","styleClass","w-full mb-4",3,"text"],[3,"ngSubmit","formGroup"],[1,"form-grid"],[1,"field"],[2,"color","var(--p-red-500)"],["pInputText","","formControlName","name","placeholder","Full name",1,"w-full"],[1,"field-error"],["pInputText","","formControlName","father_name","placeholder","Father's name",1,"w-full"],["pInputText","","formControlName","phone","placeholder","10-digit mobile",1,"w-full"],["pInputText","","formControlName","profession","placeholder","e.g. Tailor, Vendor",1,"w-full"],[1,"field","full-width"],["pTextarea","","formControlName","address","rows","3","placeholder","Residential address",1,"w-full"],[1,"flex","items-center","gap-3"],["formControlName","is_active","inputId","isActive",3,"binary"],["for","isActive",2,"cursor","pointer","margin","0"],[1,"form-actions"],["type","submit","icon","pi pi-check",3,"label","loading","fluid"],["label","Cancel","icon","pi pi-times","severity","secondary","routerLink","/customers",3,"outlined","fluid"]],template:function(t,i){t&1&&(s(0,"p-toast"),n(1,"div",0),s(2,"p-button",1),n(3,"h1",2),d(4),o()(),n(5,"div",3)(6,"p-card"),c(7,Ie,1,1,"p-message",4),n(8,"form",5),x("ngSubmit",function(){return i.onSubmit()}),n(9,"div",6)(10,"div",7)(11,"label"),d(12,"Name "),n(13,"span",8),d(14,"*"),o()(),s(15,"input",9),c(16,_e,2,0,"div",10),o(),n(17,"div",7)(18,"label"),d(19,"Father Name "),n(20,"span",8),d(21,"*"),o()(),s(22,"input",11),c(23,we,2,0,"div",10),o(),n(24,"div",7)(25,"label"),d(26,"Phone "),n(27,"span",8),d(28,"*"),o()(),s(29,"input",12),c(30,Ne,2,0,"div",10),o(),n(31,"div",7)(32,"label"),d(33,"Profession"),o(),s(34,"input",13),o(),n(35,"div",14)(36,"label"),d(37,"Address "),n(38,"span",8),d(39,"*"),o()(),s(40,"textarea",15),c(41,Fe,2,0,"div",10),o(),n(42,"div",7)(43,"div",16),s(44,"p-checkbox",17),n(45,"label",18),d(46,"Active"),o()()()(),n(47,"div",19),s(48,"p-button",20)(49,"p-button",21),o()()()()),t&2&&(a(2),p("text",!0)("rounded",!0),a(2),B(i.isEdit()?"Edit Customer":"Add Customer"),a(3),f(i.loadError()?7:-1),a(),p("formGroup",i.form),a(7),v("ng-invalid",i.isInvalid("name")),a(),f(i.isInvalid("name")?16:-1),a(6),v("ng-invalid",i.isInvalid("father_name")),a(),f(i.isInvalid("father_name")?23:-1),a(6),v("ng-invalid",i.isInvalid("phone")),a(),f(i.isInvalid("phone")?30:-1),a(10),v("ng-invalid",i.isInvalid("address")),a(),f(i.isInvalid("address")?41:-1),a(3),p("binary",!0),a(4),p("label",i.isEdit()?"Save Changes":"Add Customer")("loading",i.saving())("fluid",!0),a(),p("outlined",!0)("fluid",!0))},dependencies:[Q,X,L,j,G,J,Y,$,ie,te,be,xe,re,ne,ae,oe,me,se,fe,ce,le,de],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:24px}.page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0}.form-wrap[_ngcontent-%COMP%]{max-width:720px}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:0 24px}@media(min-width:768px){.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}}.field[_ngcontent-%COMP%]{margin-bottom:18px}.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:.875rem;font-weight:500;margin-bottom:6px}.field-error[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-red-500);margin-top:4px}.full-width[_ngcontent-%COMP%]{grid-column:1/-1}.form-actions[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap;padding-top:8px}.form-actions[_ngcontent-%COMP%]   p-button[_ngcontent-%COMP%]{flex:1;min-width:120px}.hint[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-text-muted-color);margin-top:4px}"]})};export{ye as CustomerFormComponent};
