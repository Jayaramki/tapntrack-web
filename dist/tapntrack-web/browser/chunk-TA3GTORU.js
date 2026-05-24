import{a as be,d as he}from"./chunk-BEM2LXKS.js";import{b as L,c as $,d as h,e as G,p as ye}from"./chunk-PPBMU5IY.js";import{A as ue,Ca as fe,Da as _e,Ea as H,Fa as C,Sa as V,g as ge,i as P,k as Q,p as q}from"./chunk-EC3CCHID.js";import{$a as v,Ab as g,Db as ae,Fb as re,Gb as ce,Hb as p,Ib as I,Jb as k,Ma as D,N as B,Na as O,O as E,Q as z,Qa as N,Qb as R,Ra as F,S as y,Sa as d,Sb as le,X,Y,Ya as _,Z,Za as ne,_a as oe,a as W,ab as T,bc as de,ca as ee,fb as o,gb as u,gc as pe,ha as S,hb as f,ib as M,kc as me,ma as x,mb as J,nb as K,ob as b,pb as se,sc as U,tb as ie,ub as c,vb as A,wa as te,wb as w,xb as j,za as i,zb as m}from"./chunk-LHJ6PDSB.js";var ve=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`;var Ee=["container"],ze=["icon"],Se=["closeicon"],De=["*"],Oe=t=>({closeCallback:t});function Ne(t,a){t&1&&b(0)}function Fe(t,a){if(t&1&&d(0,Ne,1,0,"ng-container",4),t&2){let e=c();o("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}function Ae(t,a){if(t&1&&M(0,"i",1),t&2){let e=c();p(e.cn(e.cx("icon"),e.icon)),o("pBind",e.ptm("icon")),_("data-p",e.dataP)}}function je(t,a){t&1&&b(0)}function Re(t,a){if(t&1&&d(0,je,1,0,"ng-container",5),t&2){let e=c();o("ngTemplateOutlet",e.containerTemplate||e._containerTemplate)("ngTemplateOutletContext",le(2,Oe,e.closeCallback))}}function Pe(t,a){if(t&1&&M(0,"span",9),t&2){let e=c(3);o("pBind",e.ptm("text"))("ngClass",e.cx("text"))("innerHTML",e.text,te),_("data-p",e.dataP)}}function Qe(t,a){if(t&1&&(u(0,"div"),d(1,Pe,1,4,"span",8),f()),t&2){let e=c(2);i(),o("ngIf",!e.escape)}}function qe(t,a){if(t&1&&(u(0,"span",7),I(1),f()),t&2){let e=c(3);o("pBind",e.ptm("text"))("ngClass",e.cx("text")),_("data-p",e.dataP),i(),k(e.text)}}function He(t,a){if(t&1&&d(0,qe,2,4,"span",10),t&2){let e=c(2);o("ngIf",e.escape&&e.text)}}function Ve(t,a){if(t&1&&(d(0,Qe,2,1,"div",6)(1,He,1,1,"ng-template",null,0,de),u(3,"span",7),w(4),f()),t&2){let e=ae(2),s=c();o("ngIf",!s.escape)("ngIfElse",e),i(3),o("pBind",s.ptm("text"))("ngClass",s.cx("text")),_("data-p",s.dataP)}}function Le(t,a){if(t&1&&M(0,"i",7),t&2){let e=c(2);p(e.cn(e.cx("closeIcon"),e.closeIcon)),o("pBind",e.ptm("closeIcon"))("ngClass",e.closeIcon),_("data-p",e.dataP)}}function $e(t,a){t&1&&b(0)}function Ge(t,a){if(t&1&&d(0,$e,1,0,"ng-container",4),t&2){let e=c(2);o("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function We(t,a){if(t&1&&(Z(),M(0,"svg",14)),t&2){let e=c(2);p(e.cx("closeIcon")),o("pBind",e.ptm("closeIcon")),_("data-p",e.dataP)}}function Je(t,a){if(t&1){let e=se();u(0,"button",11),ie("click",function(n){X(e);let l=c();return Y(l.close(n))}),v(1,Le,1,5,"i",12),v(2,Ge,1,1,"ng-container"),v(3,We,1,4,":svg:svg",13),f()}if(t&2){let e=c();p(e.cx("closeButton")),o("pBind",e.ptm("closeButton")),_("aria-label",e.closeAriaLabel)("data-p",e.dataP),i(),T(e.closeIcon?1:-1),i(),T(e.closeIconTemplate||e._closeIconTemplate?2:-1),i(),T(!e.closeIconTemplate&&!e._closeIconTemplate&&!e.closeIcon?3:-1)}}var Ke={root:({instance:t})=>["p-message p-component p-message-"+t.severity,t.variant&&"p-message-"+t.variant,{"p-message-sm":t.size==="small","p-message-lg":t.size==="large"}],contentWrapper:"p-message-content-wrapper",content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},Te=(()=>{class t extends V{name="message";style=ve;classes=Ke;static \u0275fac=(()=>{let e;return function(n){return(e||(e=x(t)))(n||t)}})();static \u0275prov=B({token:t,factory:t.\u0275fac})}return t})();var Ce=new z("MESSAGE_INSTANCE"),Ue=(()=>{class t extends ${componentName="Message";_componentStyle=y(Te);bindDirectiveInstance=y(h,{self:!0});$pcMessage=y(Ce,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}severity="info";text;escape=!0;style;styleClass;closable=!1;icon;closeIcon;life;showTransitionOptions="300ms ease-out";hideTransitionOptions="200ms cubic-bezier(0.86, 0, 0.07, 1)";size;variant;motionOptions=me(void 0);computedMotionOptions=pe(()=>W(W({},this.ptm("motion")),this.motionOptions()));onClose=new ee;get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}visible=S(!0);containerTemplate;iconTemplate;closeIconTemplate;templates;_containerTemplate;_iconTemplate;_closeIconTemplate;closeCallback=e=>{this.close(e)};onInit(){this.life&&setTimeout(()=>{this.visible.set(!1)},this.life)}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"container":this._containerTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break}})}close(e){this.visible.set(!1),this.onClose.emit({originalEvent:e})}get dataP(){return this.cn({outlined:this.variant==="outlined",simple:this.variant==="simple",[this.severity]:this.severity,[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=x(t)))(n||t)}})();static \u0275cmp=D({type:t,selectors:[["p-message"]],contentQueries:function(s,n,l){if(s&1&&j(l,Ee,4)(l,ze,4)(l,Se,4)(l,H,4),s&2){let r;m(r=g())&&(n.containerTemplate=r.first),m(r=g())&&(n.iconTemplate=r.first),m(r=g())&&(n.closeIconTemplate=r.first),m(r=g())&&(n.templates=r)}},hostAttrs:["role","alert","aria-live","polite"],hostVars:5,hostBindings:function(s,n){s&1&&(ne(function(){return"p-message-enter-active"}),oe(function(){return"p-message-leave-active"})),s&2&&(_("data-p",n.dataP),p(n.cn(n.cx("root"),n.styleClass)),re("p-message-leave-active",!n.visible()))},inputs:{severity:"severity",text:"text",escape:[2,"escape","escape",U],style:"style",styleClass:"styleClass",closable:[2,"closable","closable",U],icon:"icon",closeIcon:"closeIcon",life:"life",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",size:"size",variant:"variant",motionOptions:[1,"motionOptions"]},outputs:{onClose:"onClose"},features:[R([Te,{provide:Ce,useExisting:t},{provide:L,useExisting:t}]),N([h]),F],ngContentSelectors:De,decls:7,vars:12,consts:[["escapeOut",""],[3,"pBind"],[3,"pBind","class"],["pRipple","","type","button",3,"pBind","class"],[4,"ngTemplateOutlet"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","ngClass","innerHTML",4,"ngIf"],[3,"pBind","ngClass","innerHTML"],[3,"pBind","ngClass",4,"ngIf"],["pRipple","","type","button",3,"click","pBind"],[3,"pBind","class","ngClass"],["data-p-icon","times",3,"pBind","class"],["data-p-icon","times",3,"pBind"]],template:function(s,n){s&1&&(A(),u(0,"div",1)(1,"div",1),v(2,Fe,1,1,"ng-container"),v(3,Ae,1,4,"i",2),v(4,Re,1,4,"ng-container")(5,Ve,5,5),v(6,Je,4,8,"button",3),f()()),s&2&&(p(n.cx("contentWrapper")),o("pBind",n.ptm("contentWrapper")),_("data-p",n.dataP),i(),p(n.cx("content")),o("pBind",n.ptm("content")),_("data-p",n.dataP),i(),T(n.iconTemplate||n._iconTemplate?2:-1),i(),T(n.icon?3:-1),i(),T(n.containerTemplate||n._containerTemplate?4:5),i(2),T(n.closable?6:-1))},dependencies:[q,ge,P,Q,be,ye,C,h,he],encapsulation:2,changeDetection:0})}return t})(),Rt=(()=>{class t{static \u0275fac=function(s){return new(s||t)};static \u0275mod=O({type:t});static \u0275inj=E({imports:[Ue,C,C]})}return t})();var xe=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`;var Xe=["header"],Ye=["title"],Ze=["subtitle"],et=["content"],tt=["footer"],nt=["*",[["p-header"]],[["p-footer"]]],ot=["*","p-header","p-footer"];function st(t,a){t&1&&b(0)}function it(t,a){if(t&1&&(u(0,"div",1),w(1,1),d(2,st,1,0,"ng-container",2),f()),t&2){let e=c();p(e.cx("header")),o("pBind",e.ptm("header")),i(2),o("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function at(t,a){if(t&1&&(J(0),I(1),K()),t&2){let e=c(2);i(),k(e.header)}}function rt(t,a){t&1&&b(0)}function ct(t,a){if(t&1&&(u(0,"div",1),d(1,at,2,1,"ng-container",3)(2,rt,1,0,"ng-container",2),f()),t&2){let e=c();p(e.cx("title")),o("pBind",e.ptm("title")),i(),o("ngIf",e.header&&!e._titleTemplate&&!e.titleTemplate),i(),o("ngTemplateOutlet",e.titleTemplate||e._titleTemplate)}}function lt(t,a){if(t&1&&(J(0),I(1),K()),t&2){let e=c(2);i(),k(e.subheader)}}function dt(t,a){t&1&&b(0)}function pt(t,a){if(t&1&&(u(0,"div",1),d(1,lt,2,1,"ng-container",3)(2,dt,1,0,"ng-container",2),f()),t&2){let e=c();p(e.cx("subtitle")),o("pBind",e.ptm("subtitle")),i(),o("ngIf",e.subheader&&!e._subtitleTemplate&&!e.subtitleTemplate),i(),o("ngTemplateOutlet",e.subtitleTemplate||e._subtitleTemplate)}}function mt(t,a){t&1&&b(0)}function gt(t,a){t&1&&b(0)}function ut(t,a){if(t&1&&(u(0,"div",1),w(1,2),d(2,gt,1,0,"ng-container",2),f()),t&2){let e=c();p(e.cx("footer")),o("pBind",e.ptm("footer")),i(2),o("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var ft=`
    ${xe}

    .p-card {
        display: block;
    }
`,_t={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},we=(()=>{class t extends V{name="card";style=ft;classes=_t;static \u0275fac=(()=>{let e;return function(n){return(e||(e=x(t)))(n||t)}})();static \u0275prov=B({token:t,factory:t.\u0275fac})}return t})();var Me=new z("CARD_INSTANCE"),bt=(()=>{class t extends ${componentName="Card";$pcCard=y(Me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=y(h,{self:!0});_componentStyle=y(we);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}header;subheader;set style(e){ue(this._style(),e)||(this._style.set(e),this.el?.nativeElement&&e&&Object.keys(e).forEach(s=>{this.el.nativeElement.style[s]=e[s]}))}get style(){return this._style()}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=S(null);getBlockableElement(){return this.el.nativeElement}templates;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"title":this._titleTemplate=e.template;break;case"subtitle":this._subtitleTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=x(t)))(n||t)}})();static \u0275cmp=D({type:t,selectors:[["p-card"]],contentQueries:function(s,n,l){if(s&1&&j(l,fe,5)(l,_e,5)(l,Xe,4)(l,Ye,4)(l,Ze,4)(l,et,4)(l,tt,4)(l,H,4),s&2){let r;m(r=g())&&(n.headerFacet=r.first),m(r=g())&&(n.footerFacet=r.first),m(r=g())&&(n.headerTemplate=r.first),m(r=g())&&(n.titleTemplate=r.first),m(r=g())&&(n.subtitleTemplate=r.first),m(r=g())&&(n.contentTemplate=r.first),m(r=g())&&(n.footerTemplate=r.first),m(r=g())&&(n.templates=r)}},hostVars:4,hostBindings:function(s,n){s&2&&(ce(n._style()),p(n.cn(n.cx("root"),n.styleClass)))},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[R([we,{provide:Me,useExisting:t},{provide:L,useExisting:t}]),N([h]),F],ngContentSelectors:ot,decls:8,vars:11,consts:[[3,"pBind","class",4,"ngIf"],[3,"pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"]],template:function(s,n){s&1&&(A(nt),d(0,it,3,4,"div",0),u(1,"div",1),d(2,ct,3,5,"div",0)(3,pt,3,5,"div",0),u(4,"div",1),w(5),d(6,mt,1,0,"ng-container",2),f(),d(7,ut,3,4,"div",0),f()),s&2&&(o("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),i(),p(n.cx("body")),o("pBind",n.ptm("body")),i(),o("ngIf",n.header||n.titleTemplate||n._titleTemplate),i(),o("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),i(),p(n.cx("content")),o("pBind",n.ptm("content")),i(2),o("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),i(),o("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[q,P,Q,C,G,h],encapsulation:2,changeDetection:0})}return t})(),sn=(()=>{class t{static \u0275fac=function(s){return new(s||t)};static \u0275mod=O({type:t});static \u0275inj=E({imports:[bt,C,G,C,G]})}return t})();export{Ue as a,Rt as b,bt as c,sn as d};
