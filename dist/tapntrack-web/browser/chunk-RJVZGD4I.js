import{a as me,b as ce}from"./chunk-CEVCX3UX.js";import{a as le,b as pe}from"./chunk-JCCG4R6P.js";import{a as oe,b as se}from"./chunk-HW6WGFU4.js";import"./chunk-TL5TYRJJ.js";import{b as ae,c as re,d as f}from"./chunk-5SPKJUW2.js";import{b as de}from"./chunk-AZX3RPQO.js";import"./chunk-AS42D4TQ.js";import{Ha as te,Ia as C,Va as ie,i as X,k as Z,m as ee,p as ne}from"./chunk-6ABUFGDM.js";import{Ac as W,Ba as r,Bb as S,Cb as B,Hb as x,Ib as U,Jb as $,Kb as g,Lb as d,Mb as P,Nb as Y,Oa as v,Ob as h,P as N,Pa as A,Q as D,S as O,Sa as F,Ta as R,U as c,Ua as w,Ub as q,Vb as G,Wb as H,_a as u,bb as y,bc as L,cb as _,dc as J,fb as V,gb as j,hb as s,ib as l,ja as M,jb as o,kb as m,kc as k,oa as T,qb as z,wb as p,zb as Q,zc as K}from"./chunk-RVA67VUZ.js";var ue=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`;var _e=["content"],xe=n=>({$implicit:n});function he(n,t){if(n&1&&(l(0,"div"),d(1),o()),n&2){let e=p(2);x("display",e.value!=null&&e.value!==0?"flex":"none"),r(),h("",e.value,"",e.unit)}}function Ce(n,t){n&1&&z(0)}function Me(n,t){if(n&1&&(l(0,"div",2)(1,"div",2),w(2,he,2,4,"div",3)(3,Ce,1,0,"ng-container",4),o()()),n&2){let e=p();g(e.cn(e.cx("value"),e.valueStyleClass)),x("width",e.value+"%")("display","flex")("background",e.color),s("pBind",e.ptm("value")),u("data-p",e.dataP),r(),g(e.cx("label")),s("pBind",e.ptm("label")),u("data-p",e.dataP),r(),s("ngIf",e.showValue&&!e.contentTemplate&&!e._contentTemplate),r(),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",H(17,xe,e.value))}}function Te(n,t){if(n&1&&m(0,"div",2),n&2){let e=p();g(e.cn(e.cx("value"),e.valueStyleClass)),x("background",e.color),s("pBind",e.ptm("value")),u("data-p",e.dataP)}}var we={root:({instance:n})=>["p-progressbar p-component",{"p-progressbar-determinate":n.mode=="determinate","p-progressbar-indeterminate":n.mode=="indeterminate"}],value:"p-progressbar-value",label:"p-progressbar-label"},ge=(()=>{class n extends ie{name="progressbar";style=ue;classes=we;static \u0275fac=(()=>{let e;return function(a){return(e||(e=T(n)))(a||n)}})();static \u0275prov=N({token:n,factory:n.\u0275fac})}return n})();var fe=new O("PROGRESSBAR_INSTANCE"),I=(()=>{class n extends re{componentName="ProgressBar";$pcProgressBar=c(fe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(f,{self:!0});value;showValue=!0;styleClass;valueStyleClass;unit="%";mode="determinate";color;contentTemplate;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=c(ge);templates;_contentTemplate;onAfterContentInit(){this.templates?.forEach(e=>{e.getType()==="content"?this._contentTemplate=e.template:this._contentTemplate=e.template})}get dataP(){return this.cn({determinate:this.mode==="determinate",indeterminate:this.mode==="indeterminate"})}static \u0275fac=(()=>{let e;return function(a){return(e||(e=T(n)))(a||n)}})();static \u0275cmp=v({type:n,selectors:[["p-progressBar"],["p-progressbar"],["p-progress-bar"]],contentQueries:function(i,a,E){if(i&1&&Q(E,_e,4)(E,te,4),i&2){let b;S(b=B())&&(a.contentTemplate=b.first),S(b=B())&&(a.templates=b)}},hostAttrs:["role","progressbar"],hostVars:7,hostBindings:function(i,a){i&2&&(u("aria-valuemin",0)("aria-valuenow",a.value)("aria-valuemax",100)("aria-level",a.value+a.unit)("data-p",a.dataP),g(a.cn(a.cx("root"),a.styleClass)))},inputs:{value:[2,"value","value",W],showValue:[2,"showValue","showValue",K],styleClass:"styleClass",valueStyleClass:"valueStyleClass",unit:"unit",mode:"mode",color:"color"},features:[q([ge,{provide:fe,useExisting:n},{provide:ae,useExisting:n}]),F([f]),R],decls:2,vars:2,consts:[[3,"class","pBind","width","display","background",4,"ngIf"],[3,"class","pBind","background",4,"ngIf"],[3,"pBind"],[3,"display",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(i,a){i&1&&w(0,Me,4,19,"div",0)(1,Te,1,6,"div",1),i&2&&(s("ngIf",a.mode==="determinate"),r(),s("ngIf",a.mode==="indeterminate"))},dependencies:[ne,X,Z,C,f],encapsulation:2,changeDetection:0})}return n})(),be=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=A({type:n});static \u0275inj=D({imports:[I,C,C]})}return n})();var Be=()=>({height:"8px"}),Pe=(n,t)=>t.label;function ke(n,t){if(n&1&&(l(0,"div",1),d(1),L(2,"date"),o()),n&2){let e=p();r(),Y("Trial ends ",J(2,1,e.trial_ends_at,"dd MMM yyyy"),".")}}function Ie(n,t){if(n&1&&(l(0,"div")(1,"div",10)(2,"span"),d(3),o(),l(4,"span",11),d(5),o()(),m(6,"p-progressBar",12),o()),n&2){let e=t.$implicit,i=p(2);r(3),P(e.label),r(),U("near",i.isNear(e)),r(),h(" ",e.used," / ",e.max===null?"Unlimited":e.max," "),r(),$(G(9,Be)),s("value",i.pct(e))("showValue",!1)}}function Ee(n,t){n&1&&m(0,"p-message",8)}function Ne(n,t){n&1&&m(0,"p-message",9)}function De(n,t){if(n&1&&(l(0,"p-card")(1,"div",3)(2,"span",4),d(3),o(),m(4,"p-tag",5),o(),y(5,ke,3,4,"div",1),l(6,"div",6),V(7,Ie,7,10,"div",null,Pe),o(),l(9,"div",7),y(10,Ee,1,0,"p-message",8)(11,Ne,1,0,"p-message",9),o()()),n&2){let e=t,i=p();r(3),P(e.limits.label),r(),s("value",i.statusLabel(e.status))("severity",i.statusSeverity(e.status)),r(),_(e.status==="trial"&&e.trial_ends_at?5:-1),r(2),j(i.meters()),r(3),_(i.anyNear()?10:11)}}function Oe(n,t){if(n&1&&m(0,"p-message",2),n&2){let e=p();s("text",e.loadError())}}var Ae={active:"success",trial:"info",past_due:"warn",suspended:"danger"},ve=class n{api=c(de).subscription;sub=M(null);loadError=M(null);meters=k(()=>{let t=this.sub();return t?[{label:"Active loans",used:t.usage.active_loans,max:t.limits.max_active_loans},{label:"Users",used:t.usage.users,max:t.limits.max_users},{label:"Books",used:t.usage.books,max:t.limits.max_books}]:[]});anyNear=k(()=>this.meters().some(t=>this.isNear(t)));ngOnInit(){this.api.get().subscribe({next:t=>this.sub.set(t.data),error:()=>this.loadError.set("Could not load your subscription.")})}pct(t){return t.max===null||t.max===0?0:Math.min(100,Math.round(t.used/t.max*100))}isNear(t){return t.max!==null&&t.used>=t.max*.8}statusLabel(t){return t.replace("_"," ")}statusSeverity(t){return Ae[t]??"info"}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=v({type:n,selectors:[["app-billing"]],decls:6,vars:1,consts:[[1,"page-title"],[1,"page-sub"],["severity","error","styleClass","w-full",3,"text"],[1,"plan-row"],[1,"plan-name"],[3,"value","severity"],[1,"meters"],[1,"upgrade-note"],["severity","warn","styleClass","w-full","text","You're close to a limit. Upgrading unlocks more capacity \u2014 online upgrades are coming soon; contact us to change your plan."],["severity","info","styleClass","w-full","text","Need more capacity? Online plan upgrades are coming soon \u2014 contact us to change your plan."],[1,"meter-head"],[1,"val"],[3,"value","showValue"]],template:function(e,i){if(e&1&&(l(0,"h1",0),d(1,"Plan & Usage"),o(),l(2,"div",1),d(3,"Your subscription and how much of it you're using."),o(),y(4,De,12,5,"p-card")(5,Oe,1,1,"p-message",2)),e&2){let a;r(4),_((a=i.sub())?4:i.loadError()?5:-1,a)}},dependencies:[pe,le,ce,me,be,I,se,oe,ee],styles:[".page-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin:0 0 4px}.page-sub[_ngcontent-%COMP%]{font-size:.85rem;color:var(--p-text-muted-color);margin-bottom:20px}.plan-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:8px}.plan-name[_ngcontent-%COMP%]{font-size:1.4rem;font-weight:700}.meters[_ngcontent-%COMP%]{display:grid;gap:18px;margin-top:8px}.meter-head[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:6px}.meter-head[_ngcontent-%COMP%]   .val[_ngcontent-%COMP%]{color:var(--p-text-muted-color);font-variant-numeric:tabular-nums}.near[_ngcontent-%COMP%]{color:var(--p-orange-600);font-weight:600}.upgrade-note[_ngcontent-%COMP%]{margin-top:20px}"]})};export{ve as BillingComponent};
