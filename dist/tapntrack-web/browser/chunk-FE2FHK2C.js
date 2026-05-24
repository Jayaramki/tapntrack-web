import{a as Ze,b as et,c as tt,d as nt}from"./chunk-ZPT5ECS2.js";import"./chunk-TSK3O6MQ.js";import{g as Xe,h as Ye}from"./chunk-BRZ2HHMO.js";import"./chunk-42XE7SLE.js";import"./chunk-ZBKRM33S.js";import"./chunk-BUL72MGN.js";import{a as Ge,b as Je}from"./chunk-ERF7Z377.js";import{a as je,b as $e}from"./chunk-EZJNN6V6.js";import"./chunk-7F5E6PV6.js";import"./chunk-GZYLPV4P.js";import{e as Ve,g as Re,n as ze}from"./chunk-VHMGZSWI.js";import{a as We,b as Ue}from"./chunk-GO27MXV7.js";import"./chunk-WPXHZDND.js";import{b as qe}from"./chunk-NXJB3XQV.js";import"./chunk-BEM2LXKS.js";import{a as Oe,b as j,c as $,d as v,e as k,p as me,q as He,s as Ke,t as Qe}from"./chunk-PPBMU5IY.js";import{h as Le}from"./chunk-CTKC6QMV.js";import{a as re}from"./chunk-OEZAFBUO.js";import{A as ce,Ea as oe,Fa as be,Sa as z,T as pe,W as Pe,ba as Fe,ca as Ae,da as X,ja as ue,k as R,ma as Y,n as Ne,p as J,t as ae}from"./chunk-EC3CCHID.js";import{$a as T,Ab as B,Bb as Be,Cb as Me,Db as ee,Gb as De,Hb as f,Ib as c,Jb as U,Kb as te,M as K,Ma as M,N,Na as Te,O as he,Q as L,Qa as P,Qb as V,Ra as F,Rb as de,S as d,Sa as _,Sb as G,X as Q,Y as q,Ya as I,Z as le,Zb as Se,_b as ke,ab as x,bc as ne,fb as p,gb as r,gc as m,ha as h,hb as s,ib as b,ka as _e,kc as S,lc as Ie,ma as y,mc as ie,oa as ye,ob as D,pb as W,qb as xe,sc as E,tb as C,tc as Ee,ub as g,vb as A,wb as O,xb as Ce,yb as we,za as l,zb as w}from"./chunk-LHJ6PDSB.js";var it=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`;var Z=["*"],_t=["previcon"],yt=["nexticon"],mt=["content"],Tt=["prevButton"],xt=["nextButton"],Ct=["inkbar"],wt=["tabs"];function Bt(t,a){t&1&&D(0)}function Mt(t,a){if(t&1&&_(0,Bt,1,0,"ng-container",11),t&2){let e=g(2);p("ngTemplateOutlet",e.prevIconTemplate||e._prevIconTemplate)}}function Dt(t,a){t&1&&(le(),b(0,"svg",10))}function St(t,a){if(t&1){let e=W();r(0,"button",9,3),C("click",function(){Q(e);let n=g();return q(n.onPrevButtonClick())}),T(2,Mt,1,1,"ng-container")(3,Dt,1,0,":svg:svg",10),s()}if(t&2){let e=g();f(e.cx("prevButton")),p("pBind",e.ptm("prevButton")),I("aria-label",e.prevButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),l(2),x(e.prevIconTemplate||e._prevIconTemplate?2:3)}}function kt(t,a){t&1&&D(0)}function It(t,a){if(t&1&&_(0,kt,1,0,"ng-container",11),t&2){let e=g(2);p("ngTemplateOutlet",e.nextIconTemplate||e._nextIconTemplate)}}function Et(t,a){t&1&&(le(),b(0,"svg",12))}function Nt(t,a){if(t&1){let e=W();r(0,"button",9,4),C("click",function(){Q(e);let n=g();return q(n.onNextButtonClick())}),T(2,It,1,1,"ng-container")(3,Et,1,0,":svg:svg",12),s()}if(t&2){let e=g();f(e.cx("nextButton")),p("pBind",e.ptm("nextButton")),I("aria-label",e.nextButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),l(2),x(e.nextIconTemplate||e._nextIconTemplate?2:3)}}function Lt(t,a){t&1&&O(0)}function Pt(t,a){t&1&&D(0)}function Ft(t,a){if(t&1&&_(0,Pt,1,0,"ng-container",1),t&2){let e=g(),i=ee(1);p("ngTemplateOutlet",e.content()?e.content():i)}}var At={root:({instance:t})=>["p-tabs p-component",{"p-tabs-scrollable":t.scrollable()}]},at=(()=>{class t extends z{name="tabs";style=it;classes=At;static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var ot=new L("TABS_INSTANCE"),H=(()=>{class t extends ${componentName="Tabs";$pcTabs=d(ot,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(v,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=ie(void 0);scrollable=S(!1,{transform:E});lazy=S(!1,{transform:E});selectOnFocus=S(!1,{transform:E});showNavigators=S(!0,{transform:E});tabindex=S(0,{transform:Ee});id=h(Oe("pn_id_"));_componentStyle=d(at);updateValue(e){this.value.update(()=>e)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275cmp=M({type:t,selectors:[["p-tabs"]],hostVars:3,hostBindings:function(i,n){i&2&&(I("id",n.id()),f(n.cx("root")))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[V([at,{provide:ot,useExisting:t},{provide:j,useExisting:t}]),P([v]),F],ngContentSelectors:Z,decls:1,vars:0,template:function(i,n){i&1&&(A(),O(0))},dependencies:[J,k],encapsulation:2,changeDetection:0})}return t})(),Ot={root:({instance:t})=>["p-tab",{"p-tab-active":t.active(),"p-disabled":t.disabled()}]},rt=(()=>{class t extends z{name="tab";classes=Ot;static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var Vt={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},st=(()=>{class t extends z{name="tablist";classes=Vt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var lt=new L("TABLIST_INSTANCE"),se=(()=>{class t extends ${componentName="TabList";$pcTabList=d(lt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(v,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=d(K(()=>H));isPrevButtonEnabled=h(!1);isNextButtonEnabled=h(!1);resizeObserver;showNavigators=m(()=>this.pcTabs.showNavigators());tabindex=m(()=>this.pcTabs.tabindex());scrollable=m(()=>this.pcTabs.scrollable());_componentStyle=d(st);constructor(){super(),_e(()=>{this.pcTabs.value(),ae(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config?.translation?.aria?.previous}get nextButtonAriaLabel(){return this.config?.translation?.aria?.next}onAfterViewInit(){this.showNavigators()&&ae(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"previcon":this._prevIconTemplate=e.template;break;case"nexticon":this._nextIconTemplate=e.template;break}})}onDestroy(){this.unbindResizeObserver()}onScroll(e){this.showNavigators()&&this.updateButtonState(),e.preventDefault()}onPrevButtonClick(){let e=this.content.nativeElement,i=Y(e),n=Math.abs(e.scrollLeft)-i,o=n<=0?0:n;e.scrollLeft=pe(e)?-1*o:o}onNextButtonClick(){let e=this.content.nativeElement,i=Y(e)-this.getVisibleButtonWidths(),n=e.scrollLeft+i,o=e.scrollWidth-i,u=n>=o?o:n;e.scrollLeft=pe(e)?-1*u:u}updateButtonState(){let e=this.content?.nativeElement,i=this.el?.nativeElement,{scrollWidth:n,offsetWidth:o}=e,u=Math.abs(e.scrollLeft),vt=Y(e);this.isPrevButtonEnabled.set(u!==0),this.isNextButtonEnabled.set(i.offsetWidth>=o&&Math.abs(u-n+vt)>1)}updateInkBar(){let e=this.content?.nativeElement,i=this.inkbar?.nativeElement,n=this.tabs?.nativeElement,o=Fe(e,'[data-pc-name="tab"][data-p-active="true"]');i&&(i.style.width=Pe(o)+"px",i.style.left=ue(o).left-ue(n).left+"px")}getVisibleButtonWidths(){let e=this.prevButton?.nativeElement,i=this.nextButton?.nativeElement;return[e,i].reduce((n,o)=>o?n+Y(o):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["p-tablist"]],contentQueries:function(i,n,o){if(i&1&&Ce(o,_t,4)(o,yt,4)(o,oe,4),i&2){let u;w(u=B())&&(n.prevIconTemplate=u.first),w(u=B())&&(n.nextIconTemplate=u.first),w(u=B())&&(n.templates=u)}},viewQuery:function(i,n){if(i&1&&we(mt,5)(Tt,5)(xt,5)(Ct,5)(wt,5),i&2){let o;w(o=B())&&(n.content=o.first),w(o=B())&&(n.prevButton=o.first),w(o=B())&&(n.nextButton=o.first),w(o=B())&&(n.inkbar=o.first),w(o=B())&&(n.tabs=o.first)}},hostVars:2,hostBindings:function(i,n){i&2&&f(n.cx("root"))},features:[V([st,{provide:lt,useExisting:t},{provide:j,useExisting:t}]),P([v]),F],ngContentSelectors:Z,decls:9,vars:11,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"pBind","class"],[3,"scroll","pBind"],["role","tablist",3,"pBind"],["role","presentation",3,"pBind"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(i,n){i&1&&(A(),T(0,St,4,7,"button",5),r(1,"div",6,0),C("scroll",function(u){return n.onScroll(u)}),r(3,"div",7,1),O(5),b(6,"span",8,2),s()(),T(8,Nt,4,7,"button",5)),i&2&&(x(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),l(),f(n.cx("content")),p("pBind",n.ptm("content")),l(2),f(n.cx("tabList")),p("pBind",n.ptm("tabList")),l(3),f(n.cx("activeBar")),p("pBind",n.ptm("activeBar")),l(2),x(n.showNavigators()&&n.isNextButtonEnabled()?8:-1))},dependencies:[J,R,je,$e,He,me,be,k,v],encapsulation:2,changeDetection:0})}return t})(),dt=new L("TAB_INSTANCE"),ge=(()=>{class t extends ${componentName="Tab";$pcTab=d(dt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(v,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=ie();disabled=S(!1,{transform:E});pcTabs=d(K(()=>H));pcTabList=d(K(()=>se));el=d(ye);_componentStyle=d(rt);ripple=m(()=>this.config.ripple());id=m(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=m(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=m(()=>ce(this.pcTabs.value(),this.value()));tabindex=m(()=>this.disabled()?-1:this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(e){this.disabled()||this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(e){this.disabled()||this.changeActiveValue()}onKeyDown(e){switch(e.code){case"ArrowRight":this.onArrowRightKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(e);break;default:break}e.stopPropagation()}onAfterViewInit(){this.bindMutationObserver()}onArrowRightKey(e){let i=this.findNextTab(e.currentTarget);i?this.changeFocusedTab(e,i):this.onHomeKey(e),e.preventDefault()}onArrowLeftKey(e){let i=this.findPrevTab(e.currentTarget);i?this.changeFocusedTab(e,i):this.onEndKey(e),e.preventDefault()}onHomeKey(e){let i=this.findFirstTab();this.changeFocusedTab(e,i),e.preventDefault()}onEndKey(e){let i=this.findLastTab();this.changeFocusedTab(e,i),e.preventDefault()}onPageDownKey(e){this.scrollInView(this.findLastTab()),e.preventDefault()}onPageUpKey(e){this.scrollInView(this.findFirstTab()),e.preventDefault()}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault()}findNextTab(e,i=!1){let n=i?e:e.nextElementSibling;return n?X(n,"data-p-disabled")||X(n,"data-pc-section")==="activebar"?this.findNextTab(n):n:null}findPrevTab(e,i=!1){let n=i?e:e.previousElementSibling;return n?X(n,"data-p-disabled")||X(n,"data-pc-section")==="activebar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(e,i){Ae(i),this.scrollInView(i)}scrollInView(e){e?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){ae(this.platformId)&&(this.mutationObserver=new MutationObserver(e=>{e.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver?.disconnect()}onDestroy(){this.mutationObserver&&this.unbindMutationObserver()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275cmp=M({type:t,selectors:[["p-tab"]],hostVars:10,hostBindings:function(i,n){i&1&&C("focus",function(u){return n.onFocus(u)})("click",function(u){return n.onClick(u)})("keydown",function(u){return n.onKeyDown(u)}),i&2&&(I("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("aria-disabled",n.disabled())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),f(n.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[V([rt,{provide:dt,useExisting:t},{provide:j,useExisting:t}]),P([me,v]),F],ngContentSelectors:Z,decls:1,vars:0,template:function(i,n){i&1&&(A(),O(0))},dependencies:[J,be,k],encapsulation:2,changeDetection:0})}return t})(),Rt={root:({instance:t})=>["p-tabpanel",{"p-tabpanel-active":t.active()}]},ct=(()=>{class t extends z{name="tabpanel";classes=Rt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var pt=new L("TABPANEL_INSTANCE"),fe=(()=>{class t extends ${componentName="TabPanel";$pcTabPanel=d(pt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(v,{self:!0});pcTabs=d(K(()=>H));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}lazy=S(!1,{transform:E});value=ie(void 0);content=Ie("content");id=m(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=m(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=m(()=>ce(this.pcTabs.value(),this.value()));isLazyEnabled=m(()=>this.pcTabs.lazy()||this.lazy());hasBeenRendered=!1;shouldRender=m(()=>!this.isLazyEnabled()||this.hasBeenRendered?!0:this.active()?(this.hasBeenRendered=!0,!0):!1);_componentStyle=d(ct);static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275cmp=M({type:t,selectors:[["p-tabpanel"]],contentQueries:function(i,n,o){i&1&&Be(o,n.content,mt,5),i&2&&Me()},hostVars:7,hostBindings:function(i,n){i&2&&(xe("hidden",!n.active()),I("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),f(n.cx("root")))},inputs:{lazy:[1,"lazy"],value:[1,"value"]},outputs:{value:"valueChange"},features:[V([ct,{provide:pt,useExisting:t},{provide:j,useExisting:t}]),P([v]),F],ngContentSelectors:Z,decls:3,vars:1,consts:[["defaultContent",""],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(A(),_(0,Lt,1,0,"ng-template",null,0,ne),T(2,Ft,1,1,"ng-container")),i&2&&(l(2),x(n.shouldRender()?2:-1))},dependencies:[R,k],encapsulation:2,changeDetection:0})}return t})(),zt={root:"p-tabpanels"},ut=(()=>{class t extends z{name="tabpanels";classes=zt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var bt=new L("TABPANELS_INSTANCE"),ve=(()=>{class t extends ${componentName="TabPanels";$pcTabPanels=d(bt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(v,{self:!0});_componentStyle=d(ut);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let e;return function(n){return(e||(e=y(t)))(n||t)}})();static \u0275cmp=M({type:t,selectors:[["p-tabpanels"]],hostVars:3,hostBindings:function(i,n){i&2&&(I("role","presentation"),f(n.cx("root")))},features:[V([ut,{provide:bt,useExisting:t},{provide:j,useExisting:t}]),P([v]),F],ngContentSelectors:Z,decls:1,vars:0,template:function(i,n){i&1&&(A(),O(0))},dependencies:[J,k],encapsulation:2,changeDetection:0})}return t})(),gt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=Te({type:t});static \u0275inj=he({imports:[H,ve,fe,se,ge,k,k]})}return t})();var $t=t=>({$implicit:t,threshold:3}),Ht=t=>({$implicit:t,threshold:14}),Kt=t=>({$implicit:t,threshold:60}),Qt=()=>[10,15,25],qt=()=>({"min-width":"700px"}),Wt=t=>["/loans",t];function Ut(t,a){if(t&1){let e=W();r(0,"div",3)(1,"p-select",19),C("ngModelChange",function(n){Q(e);let o=g();return q(o.onBookChange(n))}),s()()}if(t&2){let e=g();l(),p("options",e.books())("ngModel",e.selectedBookId())}}function Gt(t,a){t&1&&D(0)}function Jt(t,a){t&1&&D(0)}function Xt(t,a){t&1&&D(0)}function Yt(t,a){t&1&&(r(0,"tr")(1,"th",25),c(2,"Loan # "),b(3,"p-sortIcon",26),s(),r(4,"th",27),c(5,"Customer "),b(6,"p-sortIcon",28),s(),r(7,"th",29),c(8,"Line"),s(),r(9,"th",30),c(10,"Issued "),b(11,"p-sortIcon",31),s(),r(12,"th",32),c(13,"Days Pending "),b(14,"p-sortIcon",33),s(),r(15,"th",34),c(16,"Balance "),b(17,"p-sortIcon",35),s(),r(18,"th"),c(19,"Status"),s(),r(20,"th",29),c(21,"Action"),s()())}function Zt(t,a){t&1&&b(0,"p-tag",38)}function en(t,a){t&1&&b(0,"p-tag",39)}function tn(t,a){if(t&1&&(r(0,"tr")(1,"td")(2,"span",36),c(3),s()(),r(4,"td"),c(5),s(),r(6,"td",29),c(7),s(),r(8,"td",37),c(9),s(),r(10,"td")(11,"span"),c(12),s()(),r(13,"td"),c(14),Se(15,"number"),s(),r(16,"td"),T(17,Zt,1,0,"p-tag",38)(18,en,1,0,"p-tag",39),s(),r(19,"td",29),b(20,"p-button",40),s()()),t&2){let e=a.$implicit,i=g().threshold,n=g();f(n.rowClass(e,i)),l(3),U(e.loan_number),l(2),U(e.customer_name),l(2),U(e.line),l(2),U(e.issued_date),l(2),De(e.is_overdue?"color:var(--p-red-600);font-weight:700":""),l(),te(" ",e.act_pending_days,"d "),l(2),te("\u20B9",ke(15,14,e.remaining_balance??0)),l(3),x(e.is_overdue?17:18),l(3),p("text",!0)("rounded",!0)("routerLink",G(16,Wt,e.id))}}function nn(t,a){t&1&&(r(0,"tr")(1,"td",41),c(2," No pending loans for this type. \u{1F389} "),s()())}function an(t,a){if(t&1&&(r(0,"div",20)(1,"p-table",21),_(2,Yt,22,0,"ng-template",22)(3,tn,21,18,"ng-template",23)(4,nn,3,0,"ng-template",24),s()()),t&2){let e=a.$implicit,i=g();l(),p("value",e)("loading",i.loading())("paginator",!0)("rows",15)("rowsPerPageOptions",de(7,Qt))("tableStyle",de(8,qt))("sortOrder",-1)}}var ft=class t{data=d(qe);loading=h(!0);allPending=h([]);books=h([]);selectedBookId=h(re.bookId()??1);activeTab=h("daily");filterLine=h("");isSuperAdmin=m(()=>re.role()==="super_admin");lineOptions=["line1","line2","line3","line4","line5","line6"].map(a=>({label:a.replace("line","Line "),value:a}));activeTabLoans=m(()=>{let a=this.activeTab(),e=this.filterLine();return this.allPending().filter(i=>i.loan_type===a&&(!e||i.line===e))});onTabChange(a){a!=null&&this.activeTab.set(String(a))}countByType(a){return String(this.allPending().filter(e=>e.loan_type===a).length)}rowClass(a,e){return a.act_pending_days>e?"row-overdue":a.act_pending_days>e*.7?"row-warning":""}ngOnInit(){this.isSuperAdmin()?this.data.books.getAll().subscribe(a=>{this.books.set(a.data),a.data.length&&this.selectedBookId.set(a.data[0].id),this.loadPending()}):this.loadPending()}onBookChange(a){this.selectedBookId.set(a),this.loadPending()}loadPending(){this.loading.set(!0);let a=this.isSuperAdmin()?this.selectedBookId():re.bookId()??1;this.data.loans.getPending(a).subscribe(e=>{this.allPending.set(e.data),this.loading.set(!1)})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-pending-loans"]],decls:37,vars:21,consts:[["loanTable",""],[1,"page-header"],[1,"page-title"],[2,"margin-bottom","16px","max-width","280px"],[1,"filters"],["optionLabel","label","optionValue","value","placeholder","All Lines","styleClass","min-w-36",3,"ngModelChange","options","ngModel","showClear"],[2,"font-size","0.85rem","color","var(--p-text-muted-color)"],[1,"legend"],[1,"legend-item"],[1,"dot",2,"background","var(--p-red-200)"],[1,"dot",2,"background","var(--p-yellow-200)"],[3,"valueChange","value"],["value","daily"],["severity","info","styleClass","ml-2",3,"value"],["value","weekly"],["severity","success","styleClass","ml-2",3,"value"],["value","monthly"],["severity","warn","styleClass","ml-2",3,"value"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["optionLabel","name","optionValue","id","placeholder","Select Book","styleClass","w-full",3,"ngModelChange","options","ngModel"],[1,"table-wrap",2,"margin-top","8px"],["responsiveLayout","scroll","sortField","act_pending_days",3,"value","loading","paginator","rows","rowsPerPageOptions","tableStyle","sortOrder"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["pSortableColumn","loan_number"],["field","loan_number"],["pSortableColumn","customer_name"],["field","customer_name"],[1,"hidden","md:table-cell"],["pSortableColumn","issued_date",1,"hidden","lg:table-cell"],["field","issued_date"],["pSortableColumn","act_pending_days"],["field","act_pending_days"],["pSortableColumn","remaining_balance"],["field","remaining_balance"],[1,"font-mono","text-sm"],[1,"hidden","lg:table-cell"],["value","Overdue","severity","danger"],["value","Pending","severity","warn"],["icon","pi pi-eye","severity","info","pTooltip","View Loan",3,"text","rounded","routerLink"],["colspan","8",1,"text-center","py-8",2,"color","var(--p-text-muted-color)"]],template:function(e,i){if(e&1&&(r(0,"div",1)(1,"h1",2),c(2,"Pending Loans"),s()(),T(3,Ut,2,2,"div",3),r(4,"div",4)(5,"p-select",5),C("ngModelChange",function(o){return i.filterLine.set(o??"")}),s(),r(6,"span",6),c(7),s()(),r(8,"div",7)(9,"div",8),b(10,"div",9),r(11,"span"),c(12,"Overdue (daily >3d / weekly >14d / monthly >60d)"),s()(),r(13,"div",8),b(14,"div",10),r(15,"span"),c(16,"Approaching threshold"),s()()(),r(17,"p-tabs",11),C("valueChange",function(o){return i.onTabChange(o)}),r(18,"p-tablist")(19,"p-tab",12),c(20," Daily "),b(21,"p-tag",13),s(),r(22,"p-tab",14),c(23," Weekly "),b(24,"p-tag",15),s(),r(25,"p-tab",16),c(26," Monthly "),b(27,"p-tag",17),s()(),r(28,"p-tabpanels")(29,"p-tabpanel",12),_(30,Gt,1,0,"ng-container",18),s(),r(31,"p-tabpanel",14),_(32,Jt,1,0,"ng-container",18),s(),r(33,"p-tabpanel",16),_(34,Xt,1,0,"ng-container",18),s()()(),_(35,an,5,9,"ng-template",null,0,ne)),e&2){let n=ee(36);l(3),x(i.isSuperAdmin()?3:-1),l(2),p("options",i.lineOptions)("ngModel",i.filterLine())("showClear",!0),l(2),te(" ",i.activeTabLoans().length," loan(s) "),l(10),p("value",i.activeTab()),l(4),p("value",i.countByType("daily")),l(3),p("value",i.countByType("weekly")),l(3),p("value",i.countByType("monthly")),l(3),p("ngTemplateOutlet",n)("ngTemplateOutletContext",G(15,$t,i.activeTabLoans())),l(2),p("ngTemplateOutlet",n)("ngTemplateOutletContext",G(17,Ht,i.activeTabLoans())),l(2),p("ngTemplateOutlet",n)("ngTemplateOutletContext",G(19,Kt,i.activeTabLoans()))}},dependencies:[ze,Ve,Re,R,Le,nt,Ze,oe,et,tt,Qe,Ke,Ye,Xe,gt,H,ve,fe,se,ge,Je,Ge,Ue,We,Ne],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px}.page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0}.filters[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;align-items:center}.table-wrap[_ngcontent-%COMP%]{overflow-x:auto}.row-overdue[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background:var(--p-red-50)!important}.row-warning[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background:var(--p-yellow-50)!important}.legend[_ngcontent-%COMP%]{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px;font-size:.8rem}.legend-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.dot[_ngcontent-%COMP%]{width:12px;height:12px;border-radius:50%}"]})};export{ft as PendingLoansComponent};
