import{a as At,b as Ft}from"./chunk-M3JLNOJY.js";import{a as Ct,b as It}from"./chunk-TIUZ5DIE.js";import{a as bt,b as xt}from"./chunk-47HY24CP.js";import{a as ve}from"./chunk-KYMEXQE7.js";import{e as Tt,g as Ot,h as St}from"./chunk-ZMZDUCHE.js";import{a as ye,b as Mt,c as Vt}from"./chunk-EPYR7762.js";import"./chunk-635ZYPEO.js";import{a as gt}from"./chunk-SVH3B6TP.js";import{a as kt,b as Lt}from"./chunk-OT3CA72F.js";import"./chunk-CA52IG7W.js";import{a as mt}from"./chunk-6KVJRO5D.js";import"./chunk-QBWPPIYM.js";import{a as Et}from"./chunk-6VYRF2F3.js";import"./chunk-D4HJQB6T.js";import{a as ut}from"./chunk-M625RUV5.js";import"./chunk-YXFQ4YBL.js";import{a as Ye,b as Je,c as V,e as Xe,f as et,g as tt,h as nt,j as it,k as ot,m as at,n as lt,o as rt,q as fe,r as ct}from"./chunk-DWBE6XTV.js";import"./chunk-ALCZF2WT.js";import{f as dt,g as _t,k as yt,l as vt}from"./chunk-B22I4PQH.js";import{b as wt}from"./chunk-VCCZZN2J.js";import{a as ht}from"./chunk-VW65MC3C.js";import{a as We,b as ge,c as pt,d as F,e as st,g as ft}from"./chunk-6X27EO56.js";import{d as Qe,f as Ue,g as je}from"./chunk-LCPK32YC.js";import"./chunk-RDLEHQJE.js";import{B as U,C as j,D as W,Da as Me,Ea as Ze,F as Ee,Ha as me,Ia as Z,Ja as _e,Va as he,ea as ue,fa as B,g as re,h as $e,i as pe,j as He,k as se,n as Ge,p as ce,y as de}from"./chunk-NZF7UNEK.js";import{$a as k,$b as le,Ab as b,Eb as J,Fb as Pe,Gb as P,Ha as Ie,Hb as G,Ib as g,Jb as u,Kb as N,Lb as z,M as Ve,Ma as H,N as X,Na as we,O as Ce,Ob as Ne,Pb as ze,Q as ee,Qa as te,Qb as Ke,Ra as ne,S as w,Sa as m,Sb as Q,Tb as oe,Ub as D,Vb as ae,Wb as Te,X as _,Y as h,Ya as y,Z as R,aa as ke,ab as L,ac as Oe,bc as Re,ca as T,da as Le,dc as K,fb as l,gb as c,ha as S,hb as d,ib as I,ic as q,ma as Y,mb as E,nb as M,ob as A,oc as Se,pb as O,tb as x,tc as qe,ub as p,vb as Fe,wb as De,xa as Ae,xb as ie,xc as f,yb as Be,yc as $,za as s,zb as v}from"./chunk-F5MASDRF.js";var Dt=`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`;var Wt=["removeicon"],Zt=["*"];function Yt(i,a){if(i&1){let e=O();c(0,"img",4),x("error",function(n){_(e);let o=p();return h(o.imageError(n))}),d()}if(i&2){let e=p();g(e.cx("image")),l("pBind",e.ptm("image"))("src",e.image,Ae)("alt",e.alt)}}function Jt(i,a){if(i&1&&I(0,"span",6),i&2){let e=p(2);g(e.icon),l("pBind",e.ptm("icon"))("ngClass",e.cx("icon"))}}function Xt(i,a){if(i&1&&m(0,Jt,1,4,"span",5),i&2){let e=p();l("ngIf",e.icon)}}function en(i,a){if(i&1&&(c(0,"div",7),u(1),d()),i&2){let e=p();g(e.cx("label")),l("pBind",e.ptm("label")),s(),N(e.label)}}function tn(i,a){if(i&1){let e=O();c(0,"span",11),x("click",function(n){_(e);let o=p(3);return h(o.close(n))})("keydown",function(n){_(e);let o=p(3);return h(o.onKeydown(n))}),d()}if(i&2){let e=p(3);g(e.removeIcon),l("pBind",e.ptm("removeIcon"))("ngClass",e.cx("removeIcon")),y("tabindex",e.disabled?-1:0)("aria-label",e.removeAriaLabel)}}function nn(i,a){if(i&1){let e=O();R(),c(0,"svg",12),x("click",function(n){_(e);let o=p(3);return h(o.close(n))})("keydown",function(n){_(e);let o=p(3);return h(o.onKeydown(n))}),d()}if(i&2){let e=p(3);g(e.cx("removeIcon")),l("pBind",e.ptm("removeIcon")),y("tabindex",e.disabled?-1:0)("aria-label",e.removeAriaLabel)}}function on(i,a){if(i&1&&(E(0),m(1,tn,1,6,"span",9)(2,nn,1,5,"svg",10),M()),i&2){let e=p(2);s(),l("ngIf",e.removeIcon),s(),l("ngIf",!e.removeIcon)}}function an(i,a){}function ln(i,a){i&1&&m(0,an,0,0,"ng-template")}function rn(i,a){if(i&1){let e=O();c(0,"span",13),x("click",function(n){_(e);let o=p(2);return h(o.close(n))})("keydown",function(n){_(e);let o=p(2);return h(o.onKeydown(n))}),m(1,ln,1,0,null,14),d()}if(i&2){let e=p(2);g(e.cx("removeIcon")),l("pBind",e.ptm("removeIcon")),y("tabindex",e.disabled?-1:0)("aria-label",e.removeAriaLabel),s(),l("ngTemplateOutlet",e.removeIconTemplate||e._removeIconTemplate)}}function pn(i,a){if(i&1&&(E(0),m(1,on,3,2,"ng-container",3)(2,rn,2,6,"span",8),M()),i&2){let e=p();s(),l("ngIf",!e.removeIconTemplate&&!e._removeIconTemplate),s(),l("ngIf",e.removeIconTemplate||e._removeIconTemplate)}}var sn={root:({instance:i})=>({display:!i.visible&&"none"})},cn={root:({instance:i})=>["p-chip p-component",{"p-disabled":i.disabled}],image:"p-chip-image",icon:"p-chip-icon",label:"p-chip-label",removeIcon:"p-chip-remove-icon"},Bt=(()=>{class i extends he{name="chip";style=Dt;classes=cn;inlineStyles=sn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=Y(i)))(n||i)}})();static \u0275prov=X({token:i,factory:i.\u0275fac})}return i})();var Pt=new ee("CHIP_INSTANCE"),zt=(()=>{class i extends pt{componentName="Chip";$pcChip=w(Pt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=w(F,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;alt;styleClass;disabled=!1;removable=!1;removeIcon;onRemove=new T;onImageError=new T;visible=!0;get removeAriaLabel(){return this.config.getTranslation(_e.ARIA).removeLabel}get chipProps(){return this._chipProps}set chipProps(e){this._chipProps=e,e&&typeof e=="object"&&Object.entries(e).forEach(([t,n])=>this[`_${t}`]!==n&&(this[`_${t}`]=n))}_chipProps;_componentStyle=w(Bt);removeIconTemplate;templates;_removeIconTemplate;onAfterContentInit(){this.templates.forEach(e=>{e.getType()==="removeicon"?this._removeIconTemplate=e.template:this._removeIconTemplate=e.template})}onChanges(e){if(e.chipProps&&e.chipProps.currentValue){let{currentValue:t}=e.chipProps;t.label!==void 0&&(this.label=t.label),t.icon!==void 0&&(this.icon=t.icon),t.image!==void 0&&(this.image=t.image),t.alt!==void 0&&(this.alt=t.alt),t.styleClass!==void 0&&(this.styleClass=t.styleClass),t.removable!==void 0&&(this.removable=t.removable),t.removeIcon!==void 0&&(this.removeIcon=t.removeIcon)}}close(e){this.visible=!1,this.onRemove.emit(e)}onKeydown(e){(e.key==="Enter"||e.key==="Backspace")&&this.close(e)}imageError(e){this.onImageError.emit(e)}get dataP(){return this.cn({removable:this.removable})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=Y(i)))(n||i)}})();static \u0275cmp=H({type:i,selectors:[["p-chip"]],contentQueries:function(t,n,o){if(t&1&&ie(o,Wt,4)(o,me,4),t&2){let r;v(r=b())&&(n.removeIconTemplate=r.first),v(r=b())&&(n.templates=r)}},hostVars:6,hostBindings:function(t,n){t&2&&(y("aria-label",n.label)("data-p",n.dataP),G(n.sx("root")),g(n.cn(n.cx("root"),n.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",alt:"alt",styleClass:"styleClass",disabled:[2,"disabled","disabled",f],removable:[2,"removable","removable",f],removeIcon:"removeIcon",chipProps:"chipProps"},outputs:{onRemove:"onRemove",onImageError:"onImageError"},features:[Q([Bt,{provide:Pt,useExisting:i},{provide:ge,useExisting:i}]),te([F]),ne],ngContentSelectors:Zt,decls:6,vars:4,consts:[["iconTemplate",""],[3,"pBind","class","src","alt","error",4,"ngIf","ngIfElse"],[3,"pBind","class",4,"ngIf"],[4,"ngIf"],[3,"error","pBind","src","alt"],[3,"pBind","class","ngClass",4,"ngIf"],[3,"pBind","ngClass"],[3,"pBind"],["role","button",3,"pBind","class","click","keydown",4,"ngIf"],["role","button",3,"pBind","class","ngClass","click","keydown",4,"ngIf"],["data-p-icon","times-circle","role","button",3,"pBind","class","click","keydown",4,"ngIf"],["role","button",3,"click","keydown","pBind","ngClass"],["data-p-icon","times-circle","role","button",3,"click","keydown","pBind"],["role","button",3,"click","keydown","pBind"],[4,"ngTemplateOutlet"]],template:function(t,n){if(t&1&&(Fe(),De(0),m(1,Yt,1,5,"img",1)(2,Xt,1,1,"ng-template",null,0,K)(4,en,2,4,"div",2)(5,pn,3,2,"ng-container",3)),t&2){let o=J(3);s(),l("ngIf",n.image)("ngIfElse",o),s(3),l("ngIf",n.label),s(),l("ngIf",n.removable)}},dependencies:[ce,re,pe,se,ye,Z,F],encapsulation:2,changeDetection:0})}return i})();var Kt=`
    .p-autocomplete {
        display: inline-flex;
    }

    .p-autocomplete-loader {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
        inset-inline-end: calc(dt('autocomplete.dropdown.width') + dt('autocomplete.padding.x'));
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-autocomplete-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('autocomplete.dropdown.width');
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
        background: dt('autocomplete.dropdown.background');
        border: 1px solid dt('autocomplete.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('autocomplete.dropdown.color');
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
    }

    .p-autocomplete-dropdown:not(:disabled):hover {
        background: dt('autocomplete.dropdown.hover.background');
        border-color: dt('autocomplete.dropdown.hover.border.color');
        color: dt('autocomplete.dropdown.hover.color');
    }

    .p-autocomplete-dropdown:not(:disabled):active {
        background: dt('autocomplete.dropdown.active.background');
        border-color: dt('autocomplete.dropdown.active.border.color');
        color: dt('autocomplete.dropdown.active.color');
    }

    .p-autocomplete-dropdown:focus-visible {
        box-shadow: dt('autocomplete.dropdown.focus.ring.shadow');
        outline: dt('autocomplete.dropdown.focus.ring.width') dt('autocomplete.dropdown.focus.ring.style') dt('autocomplete.dropdown.focus.ring.color');
        outline-offset: dt('autocomplete.dropdown.focus.ring.offset');
    }

    .p-autocomplete-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('autocomplete.overlay.background');
        color: dt('autocomplete.overlay.color');
        border: 1px solid dt('autocomplete.overlay.border.color');
        border-radius: dt('autocomplete.overlay.border.radius');
        box-shadow: dt('autocomplete.overlay.shadow');
        min-width: 100%;
    }

    .p-autocomplete-list-container {
        overflow: auto;
    }

    .p-autocomplete-list {
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: dt('autocomplete.list.gap');
        padding: dt('autocomplete.list.padding');
    }

    .p-autocomplete-option {
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('autocomplete.option.padding');
        border: 0 none;
        color: dt('autocomplete.option.color');
        background: transparent;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration');
        border-radius: dt('autocomplete.option.border.radius');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled):hover {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option-selected {
        background: dt('autocomplete.option.selected.background');
        color: dt('autocomplete.option.selected.color');
    }

    .p-autocomplete-option-selected.p-focus {
        background: dt('autocomplete.option.selected.focus.background');
        color: dt('autocomplete.option.selected.focus.color');
    }

    .p-autocomplete-option-group {
        margin: 0;
        padding: dt('autocomplete.option.group.padding');
        color: dt('autocomplete.option.group.color');
        background: dt('autocomplete.option.group.background');
        font-weight: dt('autocomplete.option.group.font.weight');
    }

    .p-autocomplete-input-multiple {
        margin: 0;
        list-style-type: none;
        cursor: text;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: calc(dt('autocomplete.padding.y') / 2) dt('autocomplete.padding.x');
        gap: calc(dt('autocomplete.padding.y') / 2);
        color: dt('autocomplete.color');
        background: dt('autocomplete.background');
        border: 1px solid dt('autocomplete.border.color');
        border-radius: dt('autocomplete.border.radius');
        width: 100%;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
        box-shadow: dt('autocomplete.shadow');
    }

    .p-autocomplete-input-multiple.p-disabled {
        opacity: 1;
        background: dt('autocomplete.disabled.background');
        color: dt('autocomplete.disabled.color');
    }

    .p-autocomplete-input-multiple:not(.p-disabled):hover {
        border-color: dt('autocomplete.hover.border.color');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple:not(.p-disabled) {
        border-color: dt('autocomplete.focus.border.color');
        box-shadow: dt('autocomplete.focus.ring.shadow');
        outline: dt('autocomplete.focus.ring.width') dt('autocomplete.focus.ring.style') dt('autocomplete.focus.ring.color');
        outline-offset: dt('autocomplete.focus.ring.offset');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-multiple {
        border-color: dt('autocomplete.invalid.border.color');
    }

    .p-variant-filled.p-autocomplete-input-multiple {
        background: dt('autocomplete.filled.background');
    }

    .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled):hover {
        background: dt('autocomplete.filled.hover.background');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled) {
        background: dt('autocomplete.filled.focus.background');
    }

    .p-autocomplete-chip.p-chip {
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
        border-radius: dt('autocomplete.chip.border.radius');
    }

    .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
        padding-inline-start: calc(dt('autocomplete.padding.y') / 2);
        padding-inline-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
        background: dt('autocomplete.chip.focus.background');
        color: dt('autocomplete.chip.focus.color');
    }

    .p-autocomplete-input-chip {
        flex: 1 1 auto;
        display: inline-flex;
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-input-chip input {
        border: 0 none;
        outline: 0 none;
        background: transparent;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        width: 100%;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: inherit;
    }

    .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.placeholder.color');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.invalid.placeholder.color');
    }

    .p-autocomplete-empty-message {
        padding: dt('autocomplete.empty.message.padding');
    }

    .p-autocomplete-fluid {
        display: flex;
    }

    .p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        width: 1%;
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.sm.width');
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.lg.width');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-autocomplete-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
        inset-inline-end: calc(dt('autocomplete.padding.x') + dt('autocomplete.dropdown.width'));
    }

    .p-autocomplete:has(.p-autocomplete-clear-icon) .p-autocomplete-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputgroup .p-autocomplete-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child:has(.p-autocomplete-dropdown) > .p-autocomplete-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child .p-autocomplete-dropdown {
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
    }
`;var dn=["item"],un=["empty"],mn=["header"],_n=["footer"],hn=["selecteditem"],gn=["group"],fn=["loader"],yn=["removeicon"],vn=["loadingicon"],bn=["clearicon"],xn=["dropdownicon"],Cn=["focusInput"],In=["multiIn"],wn=["multiContainer"],Tn=["ddBtn"],On=["items"],Sn=["scroller"],En=["overlay"],Mn=i=>({i}),$t=i=>({$implicit:i}),Vn=(i,a,e)=>({removeCallback:i,index:a,class:e}),be=i=>({height:i}),Ht=(i,a)=>({$implicit:i,options:a}),kn=i=>({options:i}),Ln=()=>({}),An=(i,a,e)=>({option:i,i:a,scrollerOptions:e}),Fn=(i,a)=>({$implicit:i,index:a});function Dn(i,a){if(i&1){let e=O();c(0,"input",18,2),x("input",function(n){_(e);let o=p();return h(o.onInput(n))})("keydown",function(n){_(e);let o=p();return h(o.onKeyDown(n))})("change",function(n){_(e);let o=p();return h(o.onInputChange(n))})("focus",function(n){_(e);let o=p();return h(o.onInputFocus(n))})("blur",function(n){_(e);let o=p();return h(o.onInputBlur(n))})("paste",function(n){_(e);let o=p();return h(o.onInputPaste(n))})("keyup",function(n){_(e);let o=p();return h(o.onInputKeyUp(n))}),d()}if(i&2){let e=p();g(e.cn(e.cx("pcInputText"),e.inputStyleClass)),l("pAutoFocus",e.autofocus)("pt",e.ptm("pcInputText"))("ngStyle",e.inputStyle)("variant",e.$variant())("invalid",e.invalid())("pSize",e.size())("fluid",e.hasFluid)("pInputTextUnstyled",e.unstyled()),y("type",e.type)("value",e.inputValue())("id",e.inputId)("autocomplete",e.autocomplete)("placeholder",e.placeholder)("name",e.name())("minlength",e.minlength())("min",e.min())("max",e.max())("pattern",e.pattern())("size",e.inputSize())("maxlength",e.maxlength())("tabindex",e.$disabled()?-1:e.tabindex)("required",e.required()?"":void 0)("readonly",e.readonly?"":void 0)("disabled",e.$disabled()?"":void 0)("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledBy)("aria-required",e.required())("aria-expanded",e.overlayVisible??!1)("aria-controls",e.overlayVisible?e.id+"_list":null)("aria-activedescendant",e.focused?e.focusedOptionId:void 0)}}function Bn(i,a){if(i&1){let e=O();R(),c(0,"svg",21),x("click",function(){_(e);let n=p(2);return h(n.clear())}),d()}if(i&2){let e=p(2);g(e.cx("clearIcon")),l("pBind",e.ptm("clearIcon")),y("aria-hidden",!0)}}function Pn(i,a){}function Nn(i,a){i&1&&m(0,Pn,0,0,"ng-template")}function zn(i,a){if(i&1){let e=O();c(0,"span",22),x("click",function(){_(e);let n=p(2);return h(n.clear())}),m(1,Nn,1,0,null,23),d()}if(i&2){let e=p(2);g(e.cx("clearIcon")),l("pBind",e.ptm("clearIcon")),y("aria-hidden",!0),s(),l("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)}}function Kn(i,a){if(i&1&&(E(0),m(1,Bn,1,4,"svg",19)(2,zn,2,5,"span",20),M()),i&2){let e=p();s(),l("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),s(),l("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function Rn(i,a){i&1&&A(0)}function qn(i,a){if(i&1){let e=O();c(0,"span",22),x("click",function(n){_(e);let o=p(2).index,r=p(2);return h(!r.readonly&&!r.$disabled()?r.removeOption(n,o):"")}),R(),I(1,"svg",31),d()}if(i&2){let e=p(4);g(e.cx("chipIcon")),l("pBind",e.ptm("chipIcon")),s(),g(e.cx("chipIcon")),y("aria-hidden",!0)}}function $n(i,a){}function Hn(i,a){i&1&&m(0,$n,0,0,"ng-template")}function Gn(i,a){if(i&1&&(c(0,"span",32),m(1,Hn,1,0,null,29),d()),i&2){let e=p(2).index,t=p(2);l("pBind",t.ptm("chipIcon")),y("aria-hidden",!0),s(),l("ngTemplateOutlet",t.removeIconTemplate||t._removeIconTemplate)("ngTemplateOutletContext",Te(4,Vn,t.removeOption.bind(t),e,t.cx("chipIcon")))}}function Qn(i,a){if(i&1&&m(0,qn,2,6,"span",20)(1,Gn,2,8,"span",30),i&2){let e=p(3);l("ngIf",!e.removeIconTemplate&&!e._removeIconTemplate),s(),l("ngIf",e.removeIconTemplate||e._removeIconTemplate)}}function Un(i,a){if(i&1){let e=O();c(0,"li",26,5)(2,"p-chip",28),x("onRemove",function(n){let o=_(e).index,r=p(2);return h(r.readonly?"":r.removeOption(n,o))}),m(3,Rn,1,0,"ng-container",29)(4,Qn,2,2,"ng-template",null,6,K),d()()}if(i&2){let e=a.$implicit,t=a.index,n=p(2);g(n.cx("chipItem",D(17,Mn,t))),l("pBind",n.ptm("chipItem")),y("id",n.id+"_multiple_option_"+t)("aria-label",n.getOptionLabel(e))("aria-setsize",n.modelValue().length)("aria-posinset",t+1)("aria-selected",!0),s(2),g(n.cx("pcChip")),l("pt",n.ptm("pcChip"))("label",!n.selectedItemTemplate&&!n._selectedItemTemplate&&n.getOptionLabel(e))("disabled",n.$disabled())("removable",!0)("unstyled",n.unstyled()),s(),l("ngTemplateOutlet",n.selectedItemTemplate||n._selectedItemTemplate)("ngTemplateOutletContext",D(19,$t,e))}}function jn(i,a){if(i&1){let e=O();c(0,"ul",24,3),x("focus",function(n){_(e);let o=p();return h(o.onMultipleContainerFocus(n))})("blur",function(n){_(e);let o=p();return h(o.onMultipleContainerBlur(n))})("keydown",function(n){_(e);let o=p();return h(o.onMultipleContainerKeyDown(n))}),m(2,Un,6,21,"li",25),c(3,"li",26)(4,"input",27,4),x("input",function(n){_(e);let o=p();return h(o.onInput(n))})("keydown",function(n){_(e);let o=p();return h(o.onKeyDown(n))})("change",function(n){_(e);let o=p();return h(o.onInputChange(n))})("focus",function(n){_(e);let o=p();return h(o.onInputFocus(n))})("blur",function(n){_(e);let o=p();return h(o.onInputBlur(n))})("paste",function(n){_(e);let o=p();return h(o.onInputPaste(n))})("keyup",function(n){_(e);let o=p();return h(o.onInputKeyUp(n))}),d()()()}if(i&2){let e=p();g(e.cx("inputMultiple")),l("pBind",e.ptm("inputMultiple"))("tabindex",-1),y("data-p",e.inputMultipleDataP)("aria-orientation","horizontal")("aria-activedescendant",e.focused?e.focusedMultipleOptionId:void 0),s(2),l("ngForOf",e.modelValue()),s(),g(e.cx("inputChip")),l("pBind",e.ptm("inputChip")),s(),g(e.cx("pcInputText")),l("pAutoFocus",e.autofocus)("pBind",e.ptm("input"))("ngStyle",e.inputStyle),y("type",e.type)("id",e.inputId)("autocomplete",e.autocomplete)("name",e.name())("minlength",e.minlength())("maxlength",e.maxlength())("size",e.size())("min",e.min())("max",e.max())("pattern",e.pattern())("placeholder",e.$filled()?null:e.placeholder)("tabindex",e.$disabled()?-1:e.tabindex)("required",e.required()?"":void 0)("readonly",e.readonly?"":void 0)("disabled",e.$disabled()?"":void 0)("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledBy)("aria-required",e.required())("aria-expanded",e.overlayVisible??!1)("aria-controls",e.overlayVisible?e.id+"_list":null)("aria-activedescendant",e.focused?e.focusedOptionId:void 0)}}function Wn(i,a){if(i&1&&(R(),I(0,"svg",35)),i&2){let e=p(2);g(e.cx("loader")),l("pBind",e.ptm("loader"))("spin",!0),y("aria-hidden",!0)}}function Zn(i,a){}function Yn(i,a){i&1&&m(0,Zn,0,0,"ng-template")}function Jn(i,a){if(i&1&&(c(0,"span",32),m(1,Yn,1,0,null,23),d()),i&2){let e=p(2);g(e.cx("loader")),l("pBind",e.ptm("loader")),y("aria-hidden",!0),s(),l("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)}}function Xn(i,a){if(i&1&&(E(0),m(1,Wn,1,5,"svg",33)(2,Jn,2,5,"span",34),M()),i&2){let e=p();s(),l("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),s(),l("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function ei(i,a){if(i&1&&I(0,"span",38),i&2){let e=p(2);l("ngClass",e.dropdownIcon),y("aria-hidden",!0)}}function ti(i,a){if(i&1&&(R(),I(0,"svg",40)),i&2){let e=p(3);l("pBind",e.ptm("dropdown"))}}function ni(i,a){}function ii(i,a){i&1&&m(0,ni,0,0,"ng-template")}function oi(i,a){if(i&1&&(E(0),m(1,ti,1,1,"svg",39)(2,ii,1,0,null,23),M()),i&2){let e=p(2);s(),l("ngIf",!e.dropdownIconTemplate&&!e._dropdownIconTemplate),s(),l("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function ai(i,a){if(i&1){let e=O();c(0,"button",36,7),x("click",function(n){_(e);let o=p();return h(o.handleDropdownClick(n))}),m(2,ei,1,2,"span",37)(3,oi,3,2,"ng-container",14),d()}if(i&2){let e=p();g(e.cx("dropdown")),l("pBind",e.ptm("dropdown"))("disabled",e.$disabled()),y("aria-label",e.dropdownAriaLabel)("tabindex",e.tabindex),s(2),l("ngIf",e.dropdownIcon),s(),l("ngIf",!e.dropdownIcon)}}function li(i,a){i&1&&A(0)}function ri(i,a){i&1&&A(0)}function pi(i,a){if(i&1&&m(0,ri,1,0,"ng-container",29),i&2){let e=a.$implicit,t=a.options;p(2);let n=J(6);l("ngTemplateOutlet",n)("ngTemplateOutletContext",ae(2,Ht,e,t))}}function si(i,a){i&1&&A(0)}function ci(i,a){if(i&1&&m(0,si,1,0,"ng-container",29),i&2){let e=a.options,t=p(4);l("ngTemplateOutlet",t.loaderTemplate||t._loaderTemplate)("ngTemplateOutletContext",D(2,kn,e))}}function di(i,a){i&1&&(E(0),m(1,ci,1,4,"ng-template",null,10,K),M())}function ui(i,a){if(i&1){let e=O();c(0,"p-scroller",45,9),x("onLazyLoad",function(n){_(e);let o=p(2);return h(o.onLazyLoad.emit(n))}),m(2,pi,1,5,"ng-template",null,1,K)(4,di,3,0,"ng-container",14),d()}if(i&2){let e=p(2);G(D(10,be,e.scrollHeight)),l("tabindex",-1)("pt",e.ptm("virtualScroller"))("items",e.visibleOptions())("itemSize",e.virtualScrollItemSize)("autoSize",!0)("lazy",e.lazy)("options",e.virtualScrollOptions),s(4),l("ngIf",e.loaderTemplate||e._loaderTemplate)}}function mi(i,a){i&1&&A(0)}function _i(i,a){if(i&1&&(E(0),m(1,mi,1,0,"ng-container",29),M()),i&2){p();let e=J(6),t=p();s(),l("ngTemplateOutlet",e)("ngTemplateOutletContext",ae(3,Ht,t.visibleOptions(),oe(2,Ln)))}}function hi(i,a){if(i&1&&(c(0,"span"),u(1),d()),i&2){let e=p(2).$implicit,t=p(3);s(),N(t.getOptionGroupLabel(e.optionGroup))}}function gi(i,a){i&1&&A(0)}function fi(i,a){if(i&1&&(E(0),c(1,"li",49),m(2,hi,2,1,"span",14)(3,gi,1,0,"ng-container",29),d(),M()),i&2){let e=p(),t=e.$implicit,n=e.index,o=p().options,r=p(2);s(),g(r.cx("optionGroup")),l("pBind",r.ptm("optionGroup"))("ngStyle",D(8,be,o.itemSize+"px")),y("id",r.id+"_"+r.getOptionIndex(n,o)),s(),l("ngIf",!r.groupTemplate),s(),l("ngTemplateOutlet",r.groupTemplate)("ngTemplateOutletContext",D(10,$t,t.optionGroup))}}function yi(i,a){if(i&1&&(c(0,"span"),u(1),d()),i&2){let e=p(2).$implicit,t=p(3);s(),N(t.getOptionLabel(e))}}function vi(i,a){i&1&&A(0)}function bi(i,a){if(i&1){let e=O();E(0),c(1,"li",50),x("click",function(n){_(e);let o=p().$implicit,r=p(3);return h(r.onOptionSelect(n,o))})("mouseenter",function(n){_(e);let o=p().index,r=p().options,C=p(2);return h(C.onOptionMouseEnter(n,C.getOptionIndex(o,r)))}),m(2,yi,2,1,"span",14)(3,vi,1,0,"ng-container",29),d(),M()}if(i&2){let e=p(),t=e.$implicit,n=e.index,o=p().options,r=p(2);s(),g(r.cx("option",Te(15,An,t,n,o))),l("pBind",r.getPTOptions(t,o,n,"option"))("ngStyle",D(19,be,o.itemSize+"px")),y("id",r.id+"_"+r.getOptionIndex(n,o))("aria-label",r.getOptionLabel(t))("aria-selected",r.isSelected(t))("data-p-selected",r.isSelected(t))("aria-disabled",r.isOptionDisabled(t))("data-p-focused",r.focusedOptionIndex()===r.getOptionIndex(n,o))("aria-setsize",r.ariaSetSize)("aria-posinset",r.getAriaPosInset(r.getOptionIndex(n,o))),s(),l("ngIf",!r.itemTemplate&&!r._itemTemplate),s(),l("ngTemplateOutlet",r.itemTemplate||r._itemTemplate)("ngTemplateOutletContext",ae(21,Fn,t,o.getOptions?o.getOptions(n):n))}}function xi(i,a){if(i&1&&m(0,fi,4,12,"ng-container",14)(1,bi,4,24,"ng-container",14),i&2){let e=a.$implicit,t=p(3);l("ngIf",t.isOptionGroup(e)),s(),l("ngIf",!t.isOptionGroup(e))}}function Ci(i,a){if(i&1&&(E(0),u(1),M()),i&2){let e=p(4);s(),z(" ",e.searchResultMessageText," ")}}function Ii(i,a){i&1&&A(0,null,12)}function wi(i,a){if(i&1&&(c(0,"li",49),m(1,Ci,2,1,"ng-container",51)(2,Ii,2,0,"ng-container",23),d()),i&2){let e=p().options,t=p(2);g(t.cx("emptyMessage")),l("pBind",t.ptm("emptyMessage"))("ngStyle",D(7,be,e.itemSize+"px")),s(),l("ngIf",!t.emptyTemplate&&!t._emptyTemplate)("ngIfElse",t.empty),s(),l("ngTemplateOutlet",t.emptyTemplate||t._emptyTemplate)}}function Ti(i,a){if(i&1&&(c(0,"ul",46,11),m(2,xi,2,2,"ng-template",47)(3,wi,3,9,"li",48),d()),i&2){let e=a.$implicit,t=a.options,n=p(2);G(t.contentStyle),g(n.cn(n.cx("list"),t.contentStyleClass)),l("pBind",n.ptm("list")),y("id",n.id+"_list")("aria-label",n.listLabel),s(2),l("ngForOf",e),s(),l("ngIf",!e||e&&e.length===0&&n.showEmptyMessage)}}function Oi(i,a){i&1&&A(0)}function Si(i,a){if(i&1&&(c(0,"div",41),m(1,li,1,0,"ng-container",23),c(2,"div",42),m(3,ui,5,12,"p-scroller",43)(4,_i,2,6,"ng-container",14),d(),m(5,Ti,4,9,"ng-template",null,8,K)(7,Oi,1,0,"ng-container",23),d(),c(8,"span",44),u(9),d()),i&2){let e=p();g(e.cn(e.cx("overlay"),e.panelStyleClass)),l("pBind",e.ptm("overlay"))("ngStyle",e.panelStyle),s(),l("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),s(),g(e.cx("listContainer")),Pe("max-height",e.virtualScroll?"auto":e.scrollHeight),l("pBind",e.ptm("listContainer"))("tabindex",-1),s(),l("ngIf",e.virtualScroll),s(),l("ngIf",!e.virtualScroll),s(3),l("ngTemplateOutlet",e.footerTemplate||e._footerTemplate),s(2),z(" ",e.selectedMessageText," ")}}var Ei=`
${Kt}

/* For PrimeNG */
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input,
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-multiple p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple {
    border-color: dt('autocomplete.invalid.border.color');
}

p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-autoComplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-auto-complete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-autocomplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
    border-color: dt('autocomplete.focus.border.color');
}

p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder {
    color: dt('autocomplete.invalid.placeholder.color');
}

p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder {
    color: dt('autocomplete.invalid.placeholder.color');
}
`,Mi={root:{position:"relative"}},Vi={root:({instance:i})=>["p-autocomplete p-component p-inputwrapper",{"p-invalid":i.invalid(),"p-focus":i.focused,"p-inputwrapper-filled":i.$filled(),"p-inputwrapper-focus":i.focused&&!i.$disabled()||i.autofocus||i.overlayVisible,"p-autocomplete-open":i.overlayVisible,"p-autocomplete-clearable":i.showClear&&!i.$disabled(),"p-autocomplete-fluid":i.hasFluid}],pcInputText:"p-autocomplete-input",inputMultiple:({instance:i})=>["p-autocomplete-input-multiple",{"p-disabled":i.$disabled(),"p-variant-filled":i.$variant()==="filled"}],chipItem:({instance:i,i:a})=>["p-autocomplete-chip-item",{"p-focus":i.focusedMultipleOptionIndex()===a}],pcChip:"p-autocomplete-chip",chipIcon:"p-autocomplete-chip-icon",inputChip:"p-autocomplete-input-chip",loader:"p-autocomplete-loader",dropdown:"p-autocomplete-dropdown",overlay:({instance:i})=>["p-autocomplete-overlay p-component-overlay p-component",{"p-input-filled":i.$variant()==="filled","p-ripple-disabled":i.config.ripple()===!1}],listContainer:"p-autocomplete-list-container",list:"p-autocomplete-list",optionGroup:"p-autocomplete-option-group",option:({instance:i,option:a,i:e,scrollerOptions:t})=>({"p-autocomplete-option":!0,"p-autocomplete-option-selected":i.isSelected(a),"p-focus":i.focusedOptionIndex()===i.getOptionIndex(e,t),"p-disabled":i.isOptionDisabled(a)}),emptyMessage:"p-autocomplete-empty-message",clearIcon:"p-autocomplete-clear-icon"},Rt=(()=>{class i extends he{name="autocomplete";style=Ei;classes=Vi;inlineStyles=Mi;static \u0275fac=(()=>{let e;return function(n){return(e||(e=Y(i)))(n||i)}})();static \u0275prov=X({token:i,factory:i.\u0275fac})}return i})();var qt=new ee("AUTOCOMPLETE_INSTANCE"),ki={provide:Ye,useExisting:Ve(()=>xe),multi:!0},xe=(()=>{class i extends ut{overlayService;zone;componentName="AutoComplete";$pcAutoComplete=w(qt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=w(F,{self:!0});minLength=1;minQueryLength;delay=300;panelStyle;styleClass;panelStyleClass;inputStyle;inputId;inputStyleClass;placeholder;readonly;scrollHeight="200px";lazy=!1;virtualScroll;virtualScrollItemSize;virtualScrollOptions;autoHighlight;forceSelection;type="text";autoZIndex=!0;baseZIndex=0;ariaLabel;dropdownAriaLabel;ariaLabelledBy;dropdownIcon;unique=!0;group;completeOnFocus=!1;showClear=!1;dropdown;showEmptyMessage=!0;dropdownMode="blank";multiple;addOnTab=!1;tabindex;dataKey;emptyMessage;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";autofocus;autocomplete="off";optionGroupChildren="items";optionGroupLabel="label";overlayOptions;get suggestions(){return this._suggestions()}set suggestions(e){this._suggestions.set(e),this.handleSuggestionsChange()}optionLabel;optionValue;id;searchMessage;emptySelectionMessage;selectionMessage;autoOptionFocus=!1;selectOnFocus;searchLocale;optionDisabled;focusOnHover=!0;typeahead=!0;addOnBlur=!1;separator;appendTo=Se(void 0);motionOptions=Se(void 0);completeMethod=new T;onSelect=new T;onUnselect=new T;onAdd=new T;onFocus=new T;onBlur=new T;onDropdownClick=new T;onClear=new T;onInputKeydown=new T;onKeyUp=new T;onShow=new T;onHide=new T;onLazyLoad=new T;inputEL;multiInputEl;multiContainerEL;dropdownButton;itemsViewChild;scroller;overlayViewChild;itemsWrapper;itemTemplate;emptyTemplate;headerTemplate;footerTemplate;selectedItemTemplate;groupTemplate;loaderTemplate;removeIconTemplate;loadingIconTemplate;clearIconTemplate;dropdownIconTemplate;onHostClick(e){this.onContainerClick(e)}value;_suggestions=S(null);timeout;overlayVisible;suggestionsUpdated;highlightOption;highlightOptionChanged;focused=!1;loading;scrollHandler;listId;searchTimeout;dirty=!1;_itemTemplate;_groupTemplate;_selectedItemTemplate;_headerTemplate;_emptyTemplate;_footerTemplate;_loaderTemplate;_removeIconTemplate;_loadingIconTemplate;_clearIconTemplate;_dropdownIconTemplate;focusedMultipleOptionIndex=S(-1);focusedOptionIndex=S(-1);_componentStyle=w(Rt);$appendTo=q(()=>this.appendTo()||this.config.overlayAppendTo());visibleOptions=q(()=>this.group?this.flatOptions(this._suggestions()):this._suggestions()||[]);inputValue=q(()=>{let e=this.modelValue(),t=this.optionValueSelected?(this.suggestions||[]).find(n=>W(n,e,this.equalityKey())):e;if(U(e))if(typeof e=="object"||this.optionValueSelected){let n=this.getOptionLabel(t);return n??e}else return e;else return""});get focusedMultipleOptionId(){return this.focusedMultipleOptionIndex()!==-1?`${this.id}_multiple_option_${this.focusedMultipleOptionIndex()}`:null}get focusedOptionId(){return this.focusedOptionIndex()!==-1?`${this.id}_${this.focusedOptionIndex()}`:null}get searchResultMessageText(){return U(this.visibleOptions())&&this.overlayVisible?this.searchMessageText.replaceAll("{0}",this.visibleOptions().length):this.emptySearchMessageText}get searchMessageText(){return this.searchMessage||this.config.translation.searchMessage||""}get emptySearchMessageText(){return this.emptyMessage||this.config.translation.emptySearchMessage||""}get selectionMessageText(){return this.selectionMessage||this.config.translation.selectionMessage||""}get emptySelectionMessageText(){return this.emptySelectionMessage||this.config.translation.emptySelectionMessage||""}get selectedMessageText(){return this.hasSelectedOption()?this.selectionMessageText.replaceAll("{0}",this.multiple?this.modelValue()?.length:"1"):this.emptySelectionMessageText}get ariaSetSize(){return this.visibleOptions().filter(e=>!this.isOptionGroup(e)).length}get listLabel(){return this.config.getTranslation(_e.ARIA).listLabel}get virtualScrollerDisabled(){return!this.virtualScroll}get optionValueSelected(){return typeof this.modelValue()=="string"&&this.optionValue}chipItemClass(e){return this._componentStyle.classes.chipItem({instance:this,i:e})}constructor(e,t){super(),this.overlayService=e,this.zone=t}onInit(){this.id=this.id||We("pn_id_"),this.cd.detectChanges()}templates;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"group":this._groupTemplate=e.template;break;case"selecteditem":this._selectedItemTemplate=e.template;break;case"selectedItem":this._selectedItemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"empty":this._emptyTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"removetokenicon":this._removeIconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;case"clearicon":this._clearIconTemplate=e.template;break;case"dropdownicon":this._dropdownIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.suggestionsUpdated&&this.overlayViewChild&&this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.overlayViewChild&&this.overlayViewChild.alignOverlay()},1),this.suggestionsUpdated=!1})}handleSuggestionsChange(){if(this.loading){this._suggestions()?.length>0||this.showEmptyMessage||this.emptyTemplate?this.show():this.hide();let e=this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(e),this.suggestionsUpdated=!0,this.loading=!1,this.cd.markForCheck()}}flatOptions(e){return(e||[]).reduce((t,n,o)=>{t.push({optionGroup:n,group:!0,index:o});let r=this.getOptionGroupChildren(n);return r&&r.forEach(C=>t.push(C)),t},[])}isOptionGroup(e){return this.optionGroupLabel&&e.optionGroup&&e.group}findFirstOptionIndex(){return this.visibleOptions().findIndex(e=>this.isValidOption(e))}findLastOptionIndex(){return Ee(this.visibleOptions(),e=>this.isValidOption(e))}findFirstFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e}findLastFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e}findSelectedOptionIndex(){return this.hasSelectedOption()?this.visibleOptions().findIndex(e=>this.isValidSelectedOption(e)):-1}findNextOptionIndex(e){let t=e<this.visibleOptions().length-1?this.visibleOptions().slice(e+1).findIndex(n=>this.isValidOption(n)):-1;return t>-1?t+e+1:e}findPrevOptionIndex(e){let t=e>0?Ee(this.visibleOptions().slice(0,e),n=>this.isValidOption(n)):-1;return t>-1?t:e}isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)}isValidOption(e){return e&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))}isOptionDisabled(e){return this.optionDisabled?j(e,this.optionDisabled):!1}isSelected(e){return this.multiple?this.unique?this.modelValue()?.some(t=>W(t,e,this.equalityKey())):!1:W(this.modelValue(),e,this.equalityKey())}isOptionMatched(e,t){return this.isValidOption(e)&&this.getOptionLabel(e).toLocaleLowerCase(this.searchLocale)===t.toLocaleLowerCase(this.searchLocale)}isInputClicked(e){return e.target===this.inputEL?.nativeElement}isDropdownClicked(e){return this.dropdownButton?.nativeElement?e.target===this.dropdownButton.nativeElement||this.dropdownButton.nativeElement.contains(e.target):!1}equalityKey(){return this.optionValue?void 0:this.dataKey}onContainerClick(e){this.$disabled()||this.loading||this.isInputClicked(e)||this.isDropdownClicked(e)||(!this.overlayViewChild||!this.overlayViewChild.overlayViewChild?.nativeElement.contains(e.target))&&B(this.inputEL?.nativeElement)}handleDropdownClick(e){let t;this.overlayVisible?this.hide(!0):(B(this.inputEL?.nativeElement),t=this.inputEL?.nativeElement?.value,this.dropdownMode==="blank"?this.search(e,"","dropdown"):this.dropdownMode==="current"&&this.search(e,t,"dropdown")),this.onDropdownClick.emit({originalEvent:e,query:t})}onInput(e){if(this.typeahead){let t=this.minQueryLength||this.minLength;this.searchTimeout&&clearTimeout(this.searchTimeout);let n=e.target.value;this.maxlength()!==null&&(n=n.split("").slice(0,this.maxlength()).join("")),!this.multiple&&!this.forceSelection&&this.updateModel(n),n.length===0&&!this.multiple?(this.onClear.emit(),setTimeout(()=>{this.hide()},this.delay/2)):n.length>=t?(this.focusedOptionIndex.set(-1),this.searchTimeout=setTimeout(()=>{this.search(e,n,"input")},this.delay)):this.hide()}}onInputChange(e){this.updateInputWithForceSelection(e)}onInputFocus(e){if(this.$disabled())return;!this.dirty&&this.completeOnFocus&&this.search(e,e.target.value,"focus"),this.dirty=!0,this.focused=!0;let t=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(t),this.overlayVisible&&this.scrollInView(this.focusedOptionIndex()),this.onFocus.emit(e)}onMultipleContainerFocus(e){this.$disabled()||(this.focused=!0)}onMultipleContainerBlur(e){this.focusedMultipleOptionIndex.set(-1),this.focused=!1}onMultipleContainerKeyDown(e){if(this.$disabled()){e.preventDefault();return}switch(e.code){case"ArrowLeft":this.onArrowLeftKeyOnMultiple(e);break;case"ArrowRight":this.onArrowRightKeyOnMultiple(e);break;case"Backspace":this.onBackspaceKeyOnMultiple(e);break;default:break}}onInputBlur(e){if(this.dirty=!1,this.focused=!1,this.focusedOptionIndex.set(-1),this.addOnBlur&&this.multiple&&!this.typeahead){let t=(this.multiInputEl?.nativeElement?.value||e.target.value||"").trim();t&&!this.isSelected(t)&&(this.updateModel([...this.modelValue()||[],t]),this.onAdd.emit({originalEvent:e,value:t}),this.multiInputEl?.nativeElement?this.multiInputEl.nativeElement.value="":e.target.value="")}this.onModelTouched(),this.onBlur.emit(e)}onInputPaste(e){if(this.separator&&this.multiple&&!this.typeahead){let t=(e.clipboardData||window.clipboardData)?.getData("Text");if(t){let n=t.split(this.separator),o=[...this.modelValue()||[]];if(n.forEach(r=>{let C=r.trim();C&&!this.isSelected(C)&&o.push(C)}),o.length>(this.modelValue()||[]).length){let r=o.slice((this.modelValue()||[]).length);this.updateModel(o),r.forEach(C=>{this.onAdd.emit({originalEvent:e,value:C})}),this.multiInputEl?.nativeElement?this.multiInputEl.nativeElement.value="":e.target.value="",e.preventDefault()}}}else this.onKeyDown(e)}onInputKeyUp(e){this.onKeyUp.emit(e)}onKeyDown(e){if(this.$disabled()){e.preventDefault();return}switch(this.onInputKeydown.emit(e),e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e);break;case"ShiftLeft":case"ShiftRight":break;default:this.handleSeparatorKey(e);break}}handleSeparatorKey(e){if(this.separator&&this.multiple&&!this.typeahead&&(this.separator===e.key||typeof this.separator=="string"&&e.key===this.separator||this.separator instanceof RegExp&&e.key.match(this.separator))){let t=(this.multiInputEl?.nativeElement?.value||e.target.value||"").trim();t&&!this.isSelected(t)&&(this.updateModel([...this.modelValue()||[],t]),this.onAdd.emit({originalEvent:e,value:t}),this.multiInputEl?.nativeElement?this.multiInputEl.nativeElement.value="":e.target.value="",e.preventDefault())}}onArrowDownKey(e){if(!this.overlayVisible)return;let t=this.focusedOptionIndex()!==-1?this.findNextOptionIndex(this.focusedOptionIndex()):this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,t),e.preventDefault(),e.stopPropagation()}onArrowUpKey(e){if(this.overlayVisible)if(e.altKey)this.focusedOptionIndex()!==-1&&this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]),this.overlayVisible&&this.hide(),e.preventDefault();else{let t=this.focusedOptionIndex()!==-1?this.findPrevOptionIndex(this.focusedOptionIndex()):this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,t),e.preventDefault(),e.stopPropagation()}}onArrowLeftKey(e){let t=e.currentTarget;this.focusedOptionIndex.set(-1),this.multiple&&(de(t.value)&&this.hasSelectedOption()?(B(this.multiContainerEL?.nativeElement),this.focusedMultipleOptionIndex.set(this.modelValue().length)):e.stopPropagation())}onArrowRightKey(e){this.focusedOptionIndex.set(-1),this.multiple&&e.stopPropagation()}onHomeKey(e){let{currentTarget:t}=e,n=t.value.length;t.setSelectionRange(0,e.shiftKey?n:0),this.focusedOptionIndex.set(-1),e.preventDefault()}onEndKey(e){let{currentTarget:t}=e,n=t.value.length;t.setSelectionRange(e.shiftKey?0:n,n),this.focusedOptionIndex.set(-1),e.preventDefault()}onPageDownKey(e){this.scrollInView(this.visibleOptions().length-1),e.preventDefault()}onPageUpKey(e){this.scrollInView(0),e.preventDefault()}onEnterKey(e){if(!this.typeahead&&!this.forceSelection&&this.multiple){let t=e.target.value?.trim();t&&!this.isSelected(t)&&(this.updateModel([...this.modelValue()||[],t]),this.onAdd.emit({originalEvent:e,value:t}),this.inputEL?.nativeElement&&(this.inputEL.nativeElement.value=""))}if(this.overlayVisible)this.focusedOptionIndex()!==-1&&this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]),this.hide();else return;e.preventDefault()}onEscapeKey(e){this.overlayVisible&&this.hide(!0),e.preventDefault()}onTabKey(e){if(this.focusedOptionIndex()!==-1){this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]);return}if(this.multiple&&!this.typeahead){let t=(this.multiInputEl?.nativeElement?.value||this.inputEL?.nativeElement?.value||"").trim();if(this.addOnTab&&t&&!this.isSelected(t)){this.updateModel([...this.modelValue()||[],t]),this.onAdd.emit({originalEvent:e,value:t}),this.multiInputEl?.nativeElement?this.multiInputEl.nativeElement.value="":this.inputEL?.nativeElement&&(this.inputEL.nativeElement.value=""),this.updateInputValue(),e.preventDefault(),this.overlayVisible&&this.hide();return}}this.overlayVisible&&this.hide()}onBackspaceKey(e){if(this.multiple){if(U(this.modelValue())&&!this.inputEL?.nativeElement?.value){let t=this.modelValue()[this.modelValue().length-1],n=this.modelValue().slice(0,-1);this.updateModel(n),this.onUnselect.emit({originalEvent:e,value:t})}e.stopPropagation()}}onArrowLeftKeyOnMultiple(e){let t=this.focusedMultipleOptionIndex()<1?0:this.focusedMultipleOptionIndex()-1;this.focusedMultipleOptionIndex.set(t)}onArrowRightKeyOnMultiple(e){let t=this.focusedMultipleOptionIndex();t++,this.focusedMultipleOptionIndex.set(t),t>this.modelValue().length-1&&(this.focusedMultipleOptionIndex.set(-1),B(this.inputEL?.nativeElement))}onBackspaceKeyOnMultiple(e){this.focusedMultipleOptionIndex()!==-1&&this.removeOption(e,this.focusedMultipleOptionIndex())}onOptionSelect(e,t,n=!0){this.multiple?(this.inputEL?.nativeElement&&(this.inputEL.nativeElement.value=""),this.isSelected(t)||this.updateModel([...this.modelValue()||[],t])):this.updateModel(t),this.onSelect.emit({originalEvent:e,value:t}),n&&this.hide(!0)}onOptionMouseEnter(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)}search(e,t,n){t!=null&&(n==="input"&&t.trim().length===0||(this.loading=!0,this.completeMethod.emit({originalEvent:e,query:t})))}removeOption(e,t){e.stopPropagation();let n=this.modelValue()[t],o=this.modelValue().filter((r,C)=>C!==t);this.updateModel(o),this.onUnselect.emit({originalEvent:e,value:n}),B(this.inputEL?.nativeElement)}updateModel(e){let t=null;e&&(t=this.multiple?e.map(n=>this.getOptionValue(n)):this.getOptionValue(e)),this.value=t,this.writeModelValue(e),this.onModelChange(t),this.updateInputValue(),this.cd.markForCheck()}updateInputValue(){this.inputEL&&this.inputEL.nativeElement&&(this.multiple?this.inputEL.nativeElement.value="":this.inputEL.nativeElement.value=this.inputValue())}updateInputWithForceSelection(e){let t=this.inputEL?.nativeElement,n=!t?.value&&U(this.modelValue());if(!this.forceSelection||this.overlayVisible||!t?.value&&!n)return;let o=this.minQueryLength??this.minLength;if(!n&&t.value.length<o)return;let r=this.visibleOptions()?.find(C=>this.isOptionMatched(C,t.value));if(!r){t.value="",this.multiple||this.clear();return}r&&!this.isSelected(r)&&this.onOptionSelect(e,r)}autoUpdateModel(){if((this.selectOnFocus||this.autoHighlight)&&this.autoOptionFocus&&!this.hasSelectedOption()){let e=this.findFirstFocusedOptionIndex();this.focusedOptionIndex.set(e),this.onOptionSelect(null,this.visibleOptions()[this.focusedOptionIndex()],!1)}}scrollInView(e=-1){let t=e!==-1?`${this.id}_${e}`:this.focusedOptionId;if(this.itemsViewChild&&this.itemsViewChild.nativeElement){let n=ue(this.itemsViewChild.nativeElement,`li[id="${t}"]`);n?n.scrollIntoView&&n.scrollIntoView({block:"nearest",inline:"nearest"}):this.virtualScrollerDisabled||setTimeout(()=>{this.virtualScroll&&this.scroller?.scrollToIndex(e!==-1?e:this.focusedOptionIndex())},0)}}changeFocusedOptionIndex(e,t){this.focusedOptionIndex()!==t&&(this.focusedOptionIndex.set(t),this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions()[t],!1))}show(e=!1){this.dirty=!0,this.overlayVisible=!0;let t=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(t),e&&B(this.inputEL?.nativeElement),e&&B(this.inputEL?.nativeElement),this.onShow.emit(),this.cd.markForCheck()}hide(e=!1){let t=()=>{this.dirty=e,this.overlayVisible=!1,this.focusedOptionIndex.set(-1),e&&B(this.inputEL?.nativeElement),this.onHide.emit(),this.updateInputWithForceSelection(null),this.cd.markForCheck()};setTimeout(()=>{t()},0)}clear(){this.updateModel(null),this.inputEL?.nativeElement&&(this.inputEL.nativeElement.value=""),this.onClear.emit()}hasSelectedOption(){return U(this.modelValue())}getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions().slice(0,e).filter(t=>this.isOptionGroup(t)).length:e)+1}getOptionLabel(e){return this.optionLabel?j(e,this.optionLabel):e&&e.label!=null?e.label:e}getOptionValue(e){return this.optionValue?j(e,this.optionValue):e&&e.value!=null?e.value:e}getOptionIndex(e,t){return this.virtualScrollerDisabled?e:t&&t.getItemOptions(e).index}getOptionGroupLabel(e){return this.optionGroupLabel?j(e,this.optionGroupLabel):e&&e.label!=null?e.label:e}getOptionGroupChildren(e){return this.optionGroupChildren?j(e,this.optionGroupChildren):e.items}getPTOptions(e,t,n,o){return this.ptm(o,{context:{option:e,index:this.getOptionIndex(n,t),selected:this.isSelected(e),focused:this.focusedOptionIndex()===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})}onOverlayBeforeEnter(){if(this.itemsWrapper=ue(this.overlayViewChild.overlayViewChild?.nativeElement,this.virtualScroll?'[data-pc-name="virtualscroller"]':'[data-pc-name="pcoverlay"]'),this.virtualScroll&&(this.scroller?.setContentEl(this.itemsViewChild?.nativeElement),this.scroller?.viewInit()),this.visibleOptions()&&this.visibleOptions().length)if(this.virtualScroll){let e=this.modelValue()?this.focusedOptionIndex():-1;e!==-1&&this.scroller?.scrollToIndex(e)}else{let e=ue(this.itemsWrapper,'[data-pc-section="option"][data-p-selected="true"]');e&&e.scrollIntoView({block:"nearest",inline:"center"})}}get containerDataP(){return this.cn({fluid:this.hasFluid})}get overlayDataP(){return this.cn({[`overlay-${this.$appendTo()}`]:!0})}get inputMultipleDataP(){return this.cn({invalid:this.invalid(),disabled:this.$disabled(),focus:this.focused,fluid:this.hasFluid,filled:this.$variant()==="filled",empty:!this.$filled(),[this.size()]:this.size()})}writeControlValue(e,t){if(this.multiple){let n=(e||[]).map(o=>this.visibleOptions().find(C=>W(o,C,this.equalityKey()))??o);t(de(e)?e:n)}else{let n=this.visibleOptions().find(o=>W(e,o,this.equalityKey()));t(de(n)?e:n)}this.value=e,this.updateInputValue(),this.cd.markForCheck()}onDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null)}static \u0275fac=function(t){return new(t||i)(Ie(Ze),Ie(Le))};static \u0275cmp=H({type:i,selectors:[["p-autoComplete"],["p-autocomplete"],["p-auto-complete"]],contentQueries:function(t,n,o){if(t&1&&ie(o,dn,5)(o,un,5)(o,mn,5)(o,_n,5)(o,hn,5)(o,gn,5)(o,fn,5)(o,yn,5)(o,vn,5)(o,bn,5)(o,xn,5)(o,me,4),t&2){let r;v(r=b())&&(n.itemTemplate=r.first),v(r=b())&&(n.emptyTemplate=r.first),v(r=b())&&(n.headerTemplate=r.first),v(r=b())&&(n.footerTemplate=r.first),v(r=b())&&(n.selectedItemTemplate=r.first),v(r=b())&&(n.groupTemplate=r.first),v(r=b())&&(n.loaderTemplate=r.first),v(r=b())&&(n.removeIconTemplate=r.first),v(r=b())&&(n.loadingIconTemplate=r.first),v(r=b())&&(n.clearIconTemplate=r.first),v(r=b())&&(n.dropdownIconTemplate=r.first),v(r=b())&&(n.templates=r)}},viewQuery:function(t,n){if(t&1&&Be(Cn,5)(In,5)(wn,5)(Tn,5)(On,5)(Sn,5)(En,5),t&2){let o;v(o=b())&&(n.inputEL=o.first),v(o=b())&&(n.multiInputEl=o.first),v(o=b())&&(n.multiContainerEL=o.first),v(o=b())&&(n.dropdownButton=o.first),v(o=b())&&(n.itemsViewChild=o.first),v(o=b())&&(n.scroller=o.first),v(o=b())&&(n.overlayViewChild=o.first)}},hostVars:5,hostBindings:function(t,n){t&1&&x("click",function(r){return n.onHostClick(r)}),t&2&&(y("data-p",n.containerDataP),G(n.sx("root")),g(n.cn(n.cx("root"),n.styleClass)))},inputs:{minLength:[2,"minLength","minLength",$],minQueryLength:[2,"minQueryLength","minQueryLength",$],delay:[2,"delay","delay",$],panelStyle:"panelStyle",styleClass:"styleClass",panelStyleClass:"panelStyleClass",inputStyle:"inputStyle",inputId:"inputId",inputStyleClass:"inputStyleClass",placeholder:"placeholder",readonly:[2,"readonly","readonly",f],scrollHeight:"scrollHeight",lazy:[2,"lazy","lazy",f],virtualScroll:[2,"virtualScroll","virtualScroll",f],virtualScrollItemSize:[2,"virtualScrollItemSize","virtualScrollItemSize",$],virtualScrollOptions:"virtualScrollOptions",autoHighlight:[2,"autoHighlight","autoHighlight",f],forceSelection:[2,"forceSelection","forceSelection",f],type:"type",autoZIndex:[2,"autoZIndex","autoZIndex",f],baseZIndex:[2,"baseZIndex","baseZIndex",$],ariaLabel:"ariaLabel",dropdownAriaLabel:"dropdownAriaLabel",ariaLabelledBy:"ariaLabelledBy",dropdownIcon:"dropdownIcon",unique:[2,"unique","unique",f],group:[2,"group","group",f],completeOnFocus:[2,"completeOnFocus","completeOnFocus",f],showClear:[2,"showClear","showClear",f],dropdown:[2,"dropdown","dropdown",f],showEmptyMessage:[2,"showEmptyMessage","showEmptyMessage",f],dropdownMode:"dropdownMode",multiple:[2,"multiple","multiple",f],addOnTab:[2,"addOnTab","addOnTab",f],tabindex:[2,"tabindex","tabindex",$],dataKey:"dataKey",emptyMessage:"emptyMessage",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",autofocus:[2,"autofocus","autofocus",f],autocomplete:"autocomplete",optionGroupChildren:"optionGroupChildren",optionGroupLabel:"optionGroupLabel",overlayOptions:"overlayOptions",suggestions:"suggestions",optionLabel:"optionLabel",optionValue:"optionValue",id:"id",searchMessage:"searchMessage",emptySelectionMessage:"emptySelectionMessage",selectionMessage:"selectionMessage",autoOptionFocus:[2,"autoOptionFocus","autoOptionFocus",f],selectOnFocus:[2,"selectOnFocus","selectOnFocus",f],searchLocale:[2,"searchLocale","searchLocale",f],optionDisabled:"optionDisabled",focusOnHover:[2,"focusOnHover","focusOnHover",f],typeahead:[2,"typeahead","typeahead",f],addOnBlur:[2,"addOnBlur","addOnBlur",f],separator:"separator",appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"]},outputs:{completeMethod:"completeMethod",onSelect:"onSelect",onUnselect:"onUnselect",onAdd:"onAdd",onFocus:"onFocus",onBlur:"onBlur",onDropdownClick:"onDropdownClick",onClear:"onClear",onInputKeydown:"onInputKeydown",onKeyUp:"onKeyUp",onShow:"onShow",onHide:"onHide",onLazyLoad:"onLazyLoad"},features:[Q([ki,Rt,{provide:qt,useExisting:i},{provide:ge,useExisting:i}]),te([F]),ne],decls:9,vars:14,consts:[["overlay",""],["content",""],["focusInput",""],["multiContainer",""],["focusInput","","multiIn",""],["token",""],["removeicon",""],["ddBtn",""],["buildInItems",""],["scroller",""],["loader",""],["items",""],["empty",""],["pInputText","","aria-autocomplete","list","role","combobox",3,"pAutoFocus","pt","class","ngStyle","variant","invalid","pSize","fluid","pInputTextUnstyled","input","keydown","change","focus","blur","paste","keyup",4,"ngIf"],[4,"ngIf"],["role","listbox",3,"pBind","class","tabindex","focus","blur","keydown",4,"ngIf"],["type","button","pRipple","",3,"pBind","class","disabled","click",4,"ngIf"],[3,"visibleChange","onBeforeEnter","onHide","hostAttrSelector","visible","options","target","appendTo","unstyled","pt","motionOptions"],["pInputText","","aria-autocomplete","list","role","combobox",3,"input","keydown","change","focus","blur","paste","keyup","pAutoFocus","pt","ngStyle","variant","invalid","pSize","fluid","pInputTextUnstyled"],["data-p-icon","times",3,"pBind","class","click",4,"ngIf"],[3,"pBind","class","click",4,"ngIf"],["data-p-icon","times",3,"click","pBind"],[3,"click","pBind"],[4,"ngTemplateOutlet"],["role","listbox",3,"focus","blur","keydown","pBind","tabindex"],["role","option",3,"pBind","class",4,"ngFor","ngForOf"],["role","option",3,"pBind"],["role","combobox","aria-autocomplete","list",3,"input","keydown","change","focus","blur","paste","keyup","pAutoFocus","pBind","ngStyle"],[3,"onRemove","pt","label","disabled","removable","unstyled"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"pBind",4,"ngIf"],["data-p-icon","times-circle"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","class","spin",4,"ngIf"],[3,"pBind","class",4,"ngIf"],["data-p-icon","spinner",3,"pBind","spin"],["type","button","pRipple","",3,"click","pBind","disabled"],[3,"ngClass",4,"ngIf"],[3,"ngClass"],["data-p-icon","chevron-down",3,"pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind"],[3,"pBind","ngStyle"],[3,"pBind","tabindex"],[3,"tabindex","pt","items","style","itemSize","autoSize","lazy","options","onLazyLoad",4,"ngIf"],["role","status","aria-live","polite",1,"p-hidden-accessible"],[3,"onLazyLoad","tabindex","pt","items","itemSize","autoSize","lazy","options"],["role","listbox",3,"pBind"],["ngFor","",3,"ngForOf"],["role","option",3,"pBind","class","ngStyle",4,"ngIf"],["role","option",3,"pBind","ngStyle"],["pRipple","","role","option",3,"click","mouseenter","pBind","ngStyle"],[4,"ngIf","ngIfElse"]],template:function(t,n){if(t&1){let o=O();m(0,Dn,2,32,"input",13)(1,Kn,3,2,"ng-container",14)(2,jn,7,37,"ul",15)(3,Xn,3,2,"ng-container",14)(4,ai,4,8,"button",16),c(5,"p-overlay",17,0),Ke("visibleChange",function(C){return _(o),ze(n.overlayVisible,C)||(n.overlayVisible=C),h(C)}),x("onBeforeEnter",function(){return n.onOverlayBeforeEnter()})("onHide",function(){return n.hide()}),m(7,Si,10,15,"ng-template",null,1,K),d()}t&2&&(l("ngIf",!n.multiple),s(),l("ngIf",n.$filled()&&!n.$disabled()&&n.showClear&&!n.loading),s(),l("ngIf",n.multiple),s(),l("ngIf",n.loading),s(),l("ngIf",n.dropdown),s(),l("hostAttrSelector",n.$attrSelector),Ne("visible",n.overlayVisible),l("options",n.overlayOptions)("target","@parent")("appendTo",n.$appendTo())("unstyled",n.unstyled())("pt",n.ptm("pcOverlay"))("motionOptions",n.motionOptions()),y("data-p",n.overlayDataP))},dependencies:[ce,re,$e,pe,se,He,gt,fe,ft,Tt,dt,ye,_t,mt,zt,Z,ht,st,F],encapsulation:2,changeDetection:0})}return i})(),Gt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=we({type:i});static \u0275inj=Ce({imports:[xe,Z,Z]})}return i})();var Ai=()=>({standalone:!0});function Fi(i,a){if(i&1&&I(0,"p-message",4),i&2){let e=p();l("text",e.loadError())}}function Di(i,a){i&1&&(c(0,"div",11),u(1,"Customer is required."),d())}function Bi(i,a){i&1&&(c(0,"div",11),u(1,"Loan number is required."),d())}function Pi(i,a){i&1&&(c(0,"div",11),u(1,"Loan type is required."),d())}function Ni(i,a){i&1&&(c(0,"div",11),u(1,"Loan amount is required."),d())}function zi(i,a){i&1&&(c(0,"div",11),u(1,"Interest amount is required."),d())}function Ki(i,a){i&1&&(c(0,"div",11),u(1,"Line is required."),d())}function Ri(i,a){i&1&&(c(0,"div",11),u(1,"Issued date is required."),d())}function qi(i,a){if(i&1&&(c(0,"div",19)(1,"div",23)(2,"span",24),u(3,"Total to Collect"),d(),c(4,"span",25),u(5),le(6,"number"),d()(),c(7,"div",23)(8,"span",24),u(9,"Disbursed to Customer"),d(),c(10,"span",25),u(11),le(12,"number"),d()(),c(13,"div",23)(14,"span",24),u(15,"Interest %"),d(),c(16,"span",25),u(17),d()(),c(18,"div",23)(19,"span",24),u(20,"Daily Instalment"),d(),c(21,"span",25),u(22),le(23,"number"),d()(),c(24,"div",23)(25,"span",24),u(26,"Days to Pay"),d(),c(27,"span",25),u(28),d()()()),i&2){let e=p();s(5),z("\u20B9",Oe(6,5,e.loanSummary().total)),s(6),z("\u20B9",Oe(12,7,e.loanSummary().disbursed)),s(6),z("",e.loanSummary().interestPct,"%"),s(5),z("\u20B9",Re(23,9,e.loanSummary().dailyAmt,"1.0-0")),s(6),N(e.daysToPay)}}var Qt=class i{fb=w(at);router=w(Ue);route=w(Qe);data=w(wt);toastSvc=w(Me);destroyRef=w(ke);cdr=w(qe);bookCtx=w(Et);saving=S(!1);loadError=S(null);loanId=S(null);allCustomers=S([]);customerSuggestions=S([]);autocompleteCustomer=S(null);today=new Date;isEdit=q(()=>this.loanId()!==null);daysToPay=100;loanSummary=q(()=>{let a=this.form.get("loan_amount")?.value??0,e=this.form.get("interest_amount")?.value??0,t=a,n=a-e,o=a>0?+(e/a*100).toFixed(1):0,r=this.daysToPay>0?t/this.daysToPay:0;return{total:t,disbursed:n,interestPct:o,dailyAmt:r}});loanTypeOptions=[{label:"Daily",value:"daily"},{label:"Weekly",value:"weekly"},{label:"Monthly",value:"monthly"}];lines=S([]);form=this.fb.group({book_id:[this.bookCtx.bookId()??"",V.required],customer_id:[null,V.required],loan_number:["",V.required],loan_amount:[null,[V.required,V.min(1)]],interest_amount:[null,[V.required,V.min(0)]],loan_type:["",V.required],line:["",V.required],issued_date:[null,V.required]});ngOnInit(){this.form.get("loan_amount").valueChanges.pipe(ve(this.destroyRef)).subscribe(()=>{}),this.form.get("interest_amount").valueChanges.pipe(ve(this.destroyRef)).subscribe(()=>{});let a=this.bookCtx.bookId();this.form.patchValue({book_id:a??""}),a&&this.loadCustomers(a);let e=this.route.snapshot.paramMap.get("id");if(e)this.loanId.set(e),this.data.loans.getById(e).subscribe({next:t=>{let n=t.data;this.form.patchValue({book_id:n.book_id,customer_id:n.customer_id,loan_number:n.loan_number,loan_amount:n.loan_amount,interest_amount:n.interest_amount,loan_type:n.loan_type,line:n.line,issued_date:new Date(n.issued_date)}),this.loadCustomers(n.book_id),this.data.customers.getById(n.customer_id).subscribe(o=>{this.autocompleteCustomer.set(o.data),this.cdr.detectChanges()}),this.cdr.detectChanges()},error:()=>this.loadError.set("Loan not found.")});else{let t=new Date;this.form.patchValue({issued_date:t}),a&&this.applyAutoNumber(a,t),this.form.get("issued_date").valueChanges.pipe(ve(this.destroyRef)).subscribe(n=>{this.autoNumber&&n&&a&&n.getFullYear()!==this.lastNumberedYear&&this.applyAutoNumber(a,n)})}}autoNumber=!1;lastNumberedYear=null;applyAutoNumber(a,e){let t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;this.data.loans.getNextNumber(a,t).subscribe({next:n=>{this.autoNumber=n.data.mode==="auto",this.lastNumberedYear=e.getFullYear(),this.autoNumber&&this.form.patchValue({loan_number:n.data.next_number})},error:()=>{}})}loadCustomers(a){this.data.customers.getAll(a).subscribe(e=>this.allCustomers.set(e.data)),this.data.lines.getAll(a).subscribe(e=>this.lines.set(e.data))}searchCustomers(a){let e=a.query.toLowerCase();this.customerSuggestions.set(this.allCustomers().filter(t=>t.name.toLowerCase().includes(e)&&t.is_active))}onCustomerSelected(a){this.form.patchValue({customer_id:a.value.id}),this.form.get("customer_id")?.markAsTouched()}onCustomerCleared(){this.autocompleteCustomer.set(null),this.form.patchValue({customer_id:null})}onCustomerSelect(a){}isInvalid(a){let e=this.form.get(a);return!!(e?.invalid&&e?.touched)}onSubmit(){if(this.autocompleteCustomer()||this.form.get("customer_id")?.markAsTouched(),this.form.invalid){this.form.markAllAsTouched();return}this.saving.set(!0);let a=this.form.value,e=a.issued_date,t=e instanceof Date?e.toISOString().split("T")[0]:String(e??""),n={book_id:a.book_id,customer_id:a.customer_id,loan_number:a.loan_number,loan_amount:a.loan_amount,interest_amount:a.interest_amount,loan_type:a.loan_type,line:a.line,issued_date:t};(this.isEdit()?this.data.loans.update(this.loanId(),n):this.data.loans.create(n)).subscribe({next:r=>{this.toastSvc.add({severity:"success",summary:this.isEdit()?"Loan Updated":"Loan Created",detail:r.data.loan_number,life:2500}),setTimeout(()=>this.router.navigate(["/loans"]),800)},error:()=>{this.saving.set(!1),this.loadError.set("Failed to save. Please try again.")}})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=H({type:i,selectors:[["app-loan-form"]],features:[Q([Me])],decls:65,vars:43,consts:[[1,"page-header"],["icon","pi pi-arrow-left","severity","secondary","routerLink","/loans",3,"text","rounded"],[1,"page-title"],[1,"form-wrap"],["severity","error","styleClass","w-full mb-4",3,"text"],[3,"ngSubmit","formGroup"],[1,"form-grid"],[1,"section-title"],[1,"field","full-width"],[2,"color","var(--p-red-500)"],["name","customerSearch","field","name","optionLabel","name","placeholder","Type to search customer\u2026","styleClass","w-full","inputStyleClass","w-full",3,"ngModelChange","completeMethod","onSelect","onClear","suggestions","ngModel","ngModelOptions","forceSelection"],[1,"field-error"],[1,"field"],["pInputText","","formControlName","loan_number","placeholder","e.g. CHN-001",1,"w-full"],["formControlName","loan_type","optionLabel","label","optionValue","value","placeholder","Select type","styleClass","w-full",3,"options"],["formControlName","loan_amount","placeholder","e.g. 10000","mode","decimal","styleClass","w-full","inputStyleClass","w-full",3,"min"],["formControlName","interest_amount","placeholder","e.g. 2000","mode","decimal","styleClass","w-full","inputStyleClass","w-full",3,"min"],["formControlName","line","optionLabel","name","optionValue","name","placeholder","Select line","styleClass","w-full",3,"options"],["formControlName","issued_date","dateFormat","dd/mm/yy","styleClass","w-full","inputStyleClass","w-full",3,"showIcon","maxDate"],[1,"info-panel"],[1,"form-actions"],["type","submit","icon","pi pi-check",3,"label","loading","fluid"],["label","Cancel","icon","pi pi-times","severity","secondary","routerLink","/loans",3,"outlined","fluid"],[1,"info-item"],[1,"info-label"],[1,"info-value"]],template:function(e,t){if(e&1&&(I(0,"p-toast"),c(1,"div",0),I(2,"p-button",1),c(3,"h1",2),u(4),d()(),c(5,"div",3)(6,"p-card"),k(7,Fi,1,1,"p-message",4),c(8,"form",5),x("ngSubmit",function(){return t.onSubmit()}),c(9,"div",6)(10,"div",7),u(11,"Loan Details"),d(),c(12,"div",8)(13,"label"),u(14,"Customer "),c(15,"span",9),u(16,"*"),d()(),c(17,"p-autocomplete",10),x("ngModelChange",function(o){return t.autocompleteCustomer.set(o)})("completeMethod",function(o){return t.searchCustomers(o)})("onSelect",function(o){return t.onCustomerSelected(o)})("onClear",function(){return t.onCustomerCleared()}),d(),k(18,Di,2,0,"div",11),d(),c(19,"div",12)(20,"label"),u(21,"Loan Number "),c(22,"span",9),u(23,"*"),d()(),I(24,"input",13),k(25,Bi,2,0,"div",11),d(),c(26,"div",12)(27,"label"),u(28,"Loan Type "),c(29,"span",9),u(30,"*"),d()(),I(31,"p-select",14),k(32,Pi,2,0,"div",11),d(),c(33,"div",12)(34,"label"),u(35,"Loan Amount (\u20B9) "),c(36,"span",9),u(37,"*"),d()(),I(38,"p-inputnumber",15),k(39,Ni,2,0,"div",11),d(),c(40,"div",12)(41,"label"),u(42,"Interest Amount (\u20B9) "),c(43,"span",9),u(44,"*"),d()(),I(45,"p-inputnumber",16),k(46,zi,2,0,"div",11),d(),c(47,"div",12)(48,"label"),u(49,"Line "),c(50,"span",9),u(51,"*"),d()(),I(52,"p-select",17),k(53,Ki,2,0,"div",11),d(),c(54,"div",12)(55,"label"),u(56,"Issued Date "),c(57,"span",9),u(58,"*"),d()(),I(59,"p-datepicker",18),k(60,Ri,2,0,"div",11),d(),k(61,qi,29,12,"div",19),d(),c(62,"div",20),I(63,"p-button",21)(64,"p-button",22),d()()()()),e&2){let n,o;s(2),l("text",!0)("rounded",!0),s(2),N(t.isEdit()?"Edit Loan":"New Loan"),s(3),L(t.loadError()?7:-1),s(),l("formGroup",t.form),s(9),P("ng-invalid",((n=t.form.get("customer_id"))==null?null:n.invalid)&&((n=t.form.get("customer_id"))==null?null:n.touched)),l("suggestions",t.customerSuggestions())("ngModel",t.autocompleteCustomer())("ngModelOptions",oe(42,Ai))("forceSelection",!0),s(),L((o=t.form.get("customer_id"))!=null&&o.invalid&&((o=t.form.get("customer_id"))!=null&&o.touched)?18:-1),s(6),P("ng-invalid",t.isInvalid("loan_number")),s(),L(t.isInvalid("loan_number")?25:-1),s(6),P("ng-invalid",t.isInvalid("loan_type")),l("options",t.loanTypeOptions),s(),L(t.isInvalid("loan_type")?32:-1),s(6),P("ng-invalid",t.isInvalid("loan_amount")),l("min",1),s(),L(t.isInvalid("loan_amount")?39:-1),s(6),P("ng-invalid",t.isInvalid("interest_amount")),l("min",0),s(),L(t.isInvalid("interest_amount")?46:-1),s(6),P("ng-invalid",t.isInvalid("line")),l("options",t.lines()),s(),L(t.isInvalid("line")?53:-1),s(6),P("ng-invalid",t.isInvalid("issued_date")),l("showIcon",!0)("maxDate",t.today),s(),L(t.isInvalid("issued_date")?60:-1),s(),L(t.loanSummary().total>0?61:-1),s(2),l("label",t.isEdit()?"Save Changes":"Create Loan")("loading",t.saving())("fluid",!0),s(),l("outlined",!0)("fluid",!0)}},dependencies:[rt,nt,Je,Xe,et,ot,it,je,ct,fe,Ft,At,vt,yt,St,Ot,Gt,xe,Lt,kt,It,Ct,Vt,Mt,xt,bt,lt,tt,Ge],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:24px}.page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0}.form-wrap[_ngcontent-%COMP%]{max-width:760px}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:0 24px}@media(min-width:768px){.form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}}.field[_ngcontent-%COMP%]{margin-bottom:18px}.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:.875rem;font-weight:500;margin-bottom:6px}.field-error[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-red-500);margin-top:4px}.full-width[_ngcontent-%COMP%]{grid-column:1/-1}.section-title[_ngcontent-%COMP%]{font-size:.875rem;font-weight:600;color:var(--p-text-muted-color);text-transform:uppercase;letter-spacing:.05em;margin:20px 0 12px;padding-bottom:6px;border-bottom:1px solid var(--p-surface-border);grid-column:1/-1}.info-panel[_ngcontent-%COMP%]{background:var(--p-surface-50);border:1px solid var(--p-surface-border);border-radius:8px;padding:16px;display:flex;gap:24px;flex-wrap:wrap;grid-column:1/-1}.info-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px}.info-label[_ngcontent-%COMP%]{font-size:.75rem;color:var(--p-text-muted-color);text-transform:uppercase;letter-spacing:.05em}.info-value[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600}.form-actions[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap;padding-top:8px}.form-actions[_ngcontent-%COMP%]   p-button[_ngcontent-%COMP%]{flex:1;min-width:120px}"]})};export{Qt as LoanFormComponent};
