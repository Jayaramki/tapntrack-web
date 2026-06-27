import{a as se,b as me}from"./chunk-3X7LSWDE.js";import{a as ce,b as fe}from"./chunk-DKN74RLS.js";import{a as ue,b as pe}from"./chunk-YBQJD7J6.js";import{b as he,c as xe}from"./chunk-IFFDCG7Z.js";import"./chunk-4IYJ2GHJ.js";import{a as ve}from"./chunk-ZTL52BTV.js";import"./chunk-C6JVNQVQ.js";import"./chunk-3K6QLRSF.js";import{b as j,c as m,d as G,e as X,f as Y,h as J,i as K,j as Q,k as W,l as Z,m as ee,o as te,p as ne,q as oe,r as ae}from"./chunk-TOQK7QAG.js";import"./chunk-QVPE5YPI.js";import{a as re,k as de,l as le}from"./chunk-VY2DRIQ5.js";import"./chunk-PMBDFCGA.js";import{b as ie,d as E}from"./chunk-BLU5XCHA.js";import{d as $,f as H,g as L}from"./chunk-MSVHUWFE.js";import{b as ge}from"./chunk-E5K6ZNJR.js";import"./chunk-54KBNMB3.js";import{Da as M,Va as U}from"./chunk-DXC4ZM5Y.js";import{Ba as d,Ib as v,Kb as B,Lb as a,Mb as q,Oa as P,P as w,Pa as D,Q as N,Qa as A,S as F,Sa as R,Ta as O,U as l,Ub as b,a as _,b as S,bb as p,cb as c,ea as k,hb as u,ib as n,ja as h,jb as o,kb as s,kc as C,ma as T,oa as z,qc as g,vb as x,wb as V,zc as y}from"./chunk-7QM6MCS2.js";var be=`
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
`;var Ie=`
    ${be}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,we={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},Ce=(()=>{class e extends U{name="textarea";style=Ie;classes=we;static \u0275fac=(()=>{let i;return function(f){return(i||(i=z(e)))(f||e)}})();static \u0275prov=w({token:e,factory:e.\u0275fac})}return e})();var ye=new F("TEXTAREA_INSTANCE"),Ee=(()=>{class e extends ne{componentName="Textarea";bindDirectiveInstance=l(E,{self:!0});$pcTextarea=l(ye,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=g();pTextareaUnstyled=g();autoResize;pSize;variant=g();fluid=g(void 0,{transform:y});invalid=g(void 0,{transform:y});$variant=C(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new k;ngControlSubscription;_componentStyle=l(Ce);ngControl=l(G,{optional:!0,self:!0});pcFluid=l(re,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),T(()=>{let i=this.pTextareaPT();i&&this.directivePT.set(i)}),T(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(i){this.writeModelValue(i.target?.value),this.updateState()}resize(i){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(i||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(t){return new(t||e)};static \u0275dir=A({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(t,f){t&1&&x("input",function(Te){return f.onInput(Te)}),t&2&&B(f.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",y],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[b([Ce,{provide:ye,useExisting:e},{provide:ie,useExisting:e}]),R([E]),O]})}return e})(),_e=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=D({type:e});static \u0275inj=N({})}return e})();function Fe(e,r){if(e&1&&s(0,"p-message",4),e&2){let i=V();u("text",i.loadError())}}function ke(e,r){e&1&&(n(0,"div",10),a(1,"Clear or change it to reassign this number to another customer."),o())}function ze(e,r){e&1&&(n(0,"div",13),a(1,"Name is required (2\u2013100 chars)."),o())}function Pe(e,r){e&1&&(n(0,"div",13),a(1,"Father name is required (2\u2013100 chars)."),o())}function De(e,r){e&1&&(n(0,"div",13),a(1,"Valid 10-digit phone required."),o())}function Ae(e,r){e&1&&(n(0,"div",13),a(1,"Address is required (min 5 chars)."),o())}var Se=class e{fb=l(ee);router=l(H);route=l($);data=l(ge);toastSvc=l(M);bookCtx=l(ve);saving=h(!1);loadError=h(null);customerId=h(null);isEdit=C(()=>this.customerId()!==null);form=this.fb.group({customer_number:[null],name:["",[m.required,m.minLength(2),m.maxLength(100)]],father_name:["",[m.required,m.minLength(2),m.maxLength(100)]],phone:["",[m.required,m.pattern(/^\d{10}$/)]],address:["",[m.required,m.minLength(5)]],profession:[""],is_active:[!0]});ngOnInit(){let r=this.route.snapshot.paramMap.get("id");r&&(this.customerId.set(r),this.data.customers.getById(r).subscribe({next:i=>this.form.patchValue(i.data),error:()=>this.loadError.set("Customer not found.")}))}isInvalid(r){let i=this.form.get(r);return!!(i?.invalid&&i?.touched)}onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}this.saving.set(!0);let r=this.form.value,t={book_id:this.bookCtx.bookId(),name:r.name,father_name:r.father_name,phone:r.phone,address:r.address,profession:r.profession||void 0,is_active:r.is_active};(this.isEdit()?this.data.customers.update(this.customerId(),S(_({},t),{customer_number:r.customer_number??null})):this.data.customers.create(S(_({},t),{customer_number:r.customer_number??void 0}))).subscribe({next:I=>{this.toastSvc.add({severity:"success",summary:this.isEdit()?"Customer Updated":"Customer Added",detail:I.data.name,life:2500}),setTimeout(()=>this.router.navigate(["/customers"]),800)},error:()=>{this.saving.set(!1),this.loadError.set("Failed to save. Please try again.")}})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=P({type:e,selectors:[["app-customer-form"]],features:[b([M])],decls:57,vars:25,consts:[[1,"page-header"],["icon","pi pi-arrow-left","severity","secondary","routerLink","/customers",3,"text","rounded"],[1,"page-title"],[1,"form-wrap"],["severity","error","styleClass","w-full mb-4",3,"text"],[3,"ngSubmit","formGroup"],[1,"form-grid"],[1,"field"],[2,"font-weight","400","color","var(--p-text-muted-color)"],["pInputText","","type","number","formControlName","customer_number","min","1",1,"w-full",3,"placeholder"],[1,"field-hint"],[2,"color","var(--p-red-500)"],["pInputText","","formControlName","name","placeholder","Full name",1,"w-full"],[1,"field-error"],["pInputText","","formControlName","father_name","placeholder","Father's name",1,"w-full"],["pInputText","","formControlName","phone","placeholder","10-digit mobile",1,"w-full"],["pInputText","","formControlName","profession","placeholder","e.g. Tailor, Vendor",1,"w-full"],[1,"field","full-width"],["pTextarea","","formControlName","address","rows","3","placeholder","Residential address",1,"w-full"],[1,"flex","items-center","gap-3"],["formControlName","is_active","inputId","isActive",3,"binary"],["for","isActive",2,"cursor","pointer","margin","0"],[1,"form-actions"],["type","submit","icon","pi pi-check",3,"label","loading","fluid"],["label","Cancel","icon","pi pi-times","severity","secondary","routerLink","/customers",3,"outlined","fluid"]],template:function(i,t){i&1&&(s(0,"p-toast"),n(1,"div",0),s(2,"p-button",1),n(3,"h1",2),a(4),o()(),n(5,"div",3)(6,"p-card"),p(7,Fe,1,1,"p-message",4),n(8,"form",5),x("ngSubmit",function(){return t.onSubmit()}),n(9,"div",6)(10,"div",7)(11,"label"),a(12,"Customer # "),n(13,"span",8),a(14,"(optional)"),o()(),s(15,"input",9),p(16,ke,2,0,"div",10),o(),n(17,"div",7)(18,"label"),a(19,"Name "),n(20,"span",11),a(21,"*"),o()(),s(22,"input",12),p(23,ze,2,0,"div",13),o(),n(24,"div",7)(25,"label"),a(26,"Father Name "),n(27,"span",11),a(28,"*"),o()(),s(29,"input",14),p(30,Pe,2,0,"div",13),o(),n(31,"div",7)(32,"label"),a(33,"Phone "),n(34,"span",11),a(35,"*"),o()(),s(36,"input",15),p(37,De,2,0,"div",13),o(),n(38,"div",7)(39,"label"),a(40,"Profession"),o(),s(41,"input",16),o(),n(42,"div",17)(43,"label"),a(44,"Address "),n(45,"span",11),a(46,"*"),o()(),s(47,"textarea",18),p(48,Ae,2,0,"div",13),o(),n(49,"div",7)(50,"div",19),s(51,"p-checkbox",20),n(52,"label",21),a(53,"Active"),o()()()(),n(54,"div",22),s(55,"p-button",23)(56,"p-button",24),o()()()()),i&2&&(d(2),u("text",!0)("rounded",!0),d(2),q(t.isEdit()?"Edit Customer":"Add Customer"),d(3),c(t.loadError()?7:-1),d(),u("formGroup",t.form),d(7),u("placeholder",t.isEdit()?"Clear to free this number":"Auto-assigned if blank"),d(),c(t.isEdit()?16:-1),d(6),v("ng-invalid",t.isInvalid("name")),d(),c(t.isInvalid("name")?23:-1),d(6),v("ng-invalid",t.isInvalid("father_name")),d(),c(t.isInvalid("father_name")?30:-1),d(6),v("ng-invalid",t.isInvalid("phone")),d(),c(t.isInvalid("phone")?37:-1),d(10),v("ng-invalid",t.isInvalid("address")),d(),c(t.isInvalid("address")?48:-1),d(3),u("binary",!0),d(4),u("label",t.isEdit()?"Save Changes":"Add Customer")("loading",t.saving())("fluid",!0),d(),u("outlined",!0)("fluid",!0))},dependencies:[te,J,j,K,X,Y,Z,W,Q,L,ae,oe,_e,Ee,le,de,me,se,fe,ce,xe,he,pe,ue],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:24px}.page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0}.form-wrap[_ngcontent-%COMP%]{max-width:720px}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:0 24px}@media(min-width:768px){.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}}.field[_ngcontent-%COMP%]{margin-bottom:18px}.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:.875rem;font-weight:500;margin-bottom:6px}.field-error[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-red-500);margin-top:4px}.field-hint[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-text-muted-color);margin-top:4px}.full-width[_ngcontent-%COMP%]{grid-column:1/-1}.form-actions[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap;padding-top:8px}.form-actions[_ngcontent-%COMP%]   p-button[_ngcontent-%COMP%]{flex:1;min-width:120px}.hint[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-text-muted-color);margin-top:4px}"]})};export{Se as CustomerFormComponent};
