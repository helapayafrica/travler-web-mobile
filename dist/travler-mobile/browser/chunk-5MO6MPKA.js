import{a as it,b as nt}from"./chunk-VBQ6VRJ5.js";import{c as tt}from"./chunk-DNQPFKDS.js";import{a as Ze}from"./chunk-6THMQCJO.js";import{a as We}from"./chunk-IOPHG2KH.js";import{b as Xe,c as et}from"./chunk-H4ZN6NX2.js";import{b as Je}from"./chunk-ZRTNA5AZ.js";import{$ as j,F as Re,H as be,I as He,J as ie,K as N,L as Ge,N as xe,P as qe,Q as ne,R as Ne,V as $e,W as Z,X as oe,Y as $,ca as je,ea as Ue,ga as le,ha as Ye,q,r as A,t as Be,u as Qe,x as Ke}from"./chunk-ZGVWO2O4.js";import{a as Pe}from"./chunk-RAZRMRQX.js";import{j as Ae,k as he,o as ge,p as ye,v as K}from"./chunk-GPQBVM7U.js";import{$ as R,Bc as Q,Cc as Le,Dc as O,Ec as _e,Hb as I,Ib as ce,Jb as pe,Lc as z,Ob as r,Pb as m,Qb as _,Rb as D,Rc as ee,Sb as de,Sc as De,Tb as ue,Ub as U,Uc as ze,Vb as S,Wb as T,Xb as w,Yb as E,Zb as Ve,_ as we,_a as c,bc as v,bd as y,cd as te,db as V,dc as a,ea as P,eb as Oe,ec as J,fc as X,gc as b,hc as L,ic as u,jc as f,ka as h,la as g,lb as re,ma as M,mc as G,nc as Fe,pc as fe,qb as F,qc as d,rc as B,sc as W,tc as me,ua as H,ub as k,wb as p,wc as ke,xc as Ee,yc as Me,za as C}from"./chunk-45NCVV7C.js";import{a as Se,b as Te}from"./chunk-TWZW5B45.js";var ot=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`;var bt=["*"],xt={root:({instance:t})=>["p-iconfield",{"p-iconfield-left":t.iconPosition=="left","p-iconfield-right":t.iconPosition=="right"}]},lt=(()=>{class t extends ${name="iconfield";theme=ot;classes=xt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275prov=R({token:t,factory:t.\u0275fac})}return t})();var rt=(()=>{class t extends j{iconPosition="left";styleClass;_componentStyle=P(lt);static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275cmp=F({type:t,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostVars:2,hostBindings:function(n,i){n&2&&d(i.cn(i.cx("root"),i.styleClass))},inputs:{iconPosition:"iconPosition",styleClass:"styleClass"},features:[Q([lt]),k],ngContentSelectors:bt,decls:1,vars:0,template:function(n,i){n&1&&(J(),X(0))},dependencies:[K],encapsulation:2,changeDetection:0})}return t})();var It=["data-p-icon","blank"],ct=(()=>{class t extends le{static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275cmp=F({type:t,selectors:[["","data-p-icon","blank"]],features:[k],attrs:It,decls:1,vars:0,consts:[["width","1","height","1","fill","currentColor","fill-opacity","0"]],template:function(n,i){n&1&&(M(),U(0,"rect",0))},encapsulation:2})}return t})();var vt=["data-p-icon","search"],pt=(()=>{class t extends le{pathId;ngOnInit(){super.ngOnInit(),this.pathId="url(#"+ne()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275cmp=F({type:t,selectors:[["","data-p-icon","search"]],features:[k],attrs:vt,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(M(),de(0,"g"),U(1,"path",0),ue(),de(2,"defs")(3,"clipPath",1),U(4,"rect",2),ue()()),n&2&&(I("clip-path",i.pathId),c(3),Ve("id",i.pathId))},encapsulation:2})}return t})();var Ct=["*"],St={root:"p-inputicon"},dt=(()=>{class t extends ${name="inputicon";classes=St;static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275prov=R({token:t,factory:t.\u0275fac})}return t})(),ut=(()=>{class t extends j{styleClass;_componentStyle=P(dt);static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275cmp=F({type:t,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:2,hostBindings:function(n,i){n&2&&d(i.cn(i.cx("root"),i.styleClass))},inputs:{styleClass:"styleClass"},features:[Q([dt]),k],ngContentSelectors:Ct,decls:1,vars:0,template:function(n,i){n&1&&(J(),X(0))},dependencies:[K,Z],encapsulation:2,changeDetection:0})}return t})();var ft=`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }

    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`;var Y=t=>({height:t}),Ie=t=>({$implicit:t});function Tt(t,s){if(t&1&&(M(),D(0,"svg",5)),t&2){let e=a(2);d(e.cx("optionCheckIcon"))}}function wt(t,s){if(t&1&&(M(),D(0,"svg",6)),t&2){let e=a(2);d(e.cx("optionBlankIcon"))}}function Ot(t,s){if(t&1&&(S(0),p(1,Tt,1,2,"svg",3)(2,wt,1,2,"svg",4),T()),t&2){let e=a();c(),r("ngIf",e.selected),c(),r("ngIf",!e.selected)}}function Vt(t,s){if(t&1&&(m(0,"span"),B(1),_()),t&2){let e=a();c(),W(e.label??"empty")}}function Ft(t,s){t&1&&w(0)}var kt=["item"],Et=["group"],Mt=["loader"],Lt=["selectedItem"],Dt=["header"],mt=["filter"],zt=["footer"],At=["emptyfilter"],Pt=["empty"],Bt=["dropdownicon"],Qt=["loadingicon"],Kt=["clearicon"],Rt=["filtericon"],Ht=["onicon"],Gt=["officon"],qt=["cancelicon"],Nt=["focusInput"],$t=["editableInput"],jt=["items"],Ut=["scroller"],Wt=["overlay"],Zt=["firstHiddenFocusableEl"],Yt=["lastHiddenFocusableEl"],_t=t=>({class:t}),ht=t=>({options:t}),gt=(t,s)=>({$implicit:t,options:s}),Jt=()=>({});function Xt(t,s){if(t&1&&(S(0),B(1),T()),t&2){let e=a(2);c(),W(e.label()==="p-emptylabel"?"\xA0":e.label())}}function ei(t,s){if(t&1&&w(0,24),t&2){let e=a(2);r("ngTemplateOutlet",e.selectedItemTemplate||e._selectedItemTemplate)("ngTemplateOutletContext",O(2,Ie,e.selectedOption))}}function ti(t,s){if(t&1&&(m(0,"span"),B(1),_()),t&2){let e=a(3);c(),W(e.label()==="p-emptylabel"?"\xA0":e.label())}}function ii(t,s){if(t&1&&p(0,ti,2,1,"span",18),t&2){let e=a(2);r("ngIf",e.isSelectedOptionEmpty())}}function ni(t,s){if(t&1){let e=E();m(0,"span",22,3),v("focus",function(i){h(e);let o=a();return g(o.onInputFocus(i))})("blur",function(i){h(e);let o=a();return g(o.onInputBlur(i))})("keydown",function(i){h(e);let o=a();return g(o.onKeyDown(i))}),p(2,Xt,2,1,"ng-container",20)(3,ei,1,4,"ng-container",23)(4,ii,1,1,"ng-template",null,4,z),_()}if(t&2){let e=G(5),n=a();d(n.cx("label")),r("pTooltip",n.tooltip)("tooltipPosition",n.tooltipPosition)("positionStyle",n.tooltipPositionStyle)("tooltipStyleClass",n.tooltipStyleClass)("pAutoFocus",n.autofocus),I("aria-disabled",n.$disabled())("id",n.inputId)("aria-label",n.ariaLabel||(n.label()==="p-emptylabel"?void 0:n.label()))("aria-labelledby",n.ariaLabelledBy)("aria-haspopup","listbox")("aria-expanded",n.overlayVisible??!1)("aria-controls",n.overlayVisible?n.id+"_list":null)("tabindex",n.$disabled()?-1:n.tabindex)("aria-activedescendant",n.focused?n.focusedOptionId:void 0)("aria-required",n.required())("required",n.required()?"":void 0)("disabled",n.$disabled()?"":void 0),c(2),r("ngIf",!n.selectedItemTemplate&&!n._selectedItemTemplate)("ngIfElse",e),c(),r("ngIf",(n.selectedItemTemplate||n._selectedItemTemplate)&&!n.isSelectedOptionEmpty())}}function oi(t,s){if(t&1){let e=E();m(0,"input",25,5),v("input",function(i){h(e);let o=a();return g(o.onEditableInput(i))})("keydown",function(i){h(e);let o=a();return g(o.onKeyDown(i))})("focus",function(i){h(e);let o=a();return g(o.onInputFocus(i))})("blur",function(i){h(e);let o=a();return g(o.onInputBlur(i))}),_()}if(t&2){let e=a();d(e.cx("label")),r("pAutoFocus",e.autofocus),I("id",e.inputId)("aria-haspopup","listbox")("placeholder",e.modelValue()===void 0||e.modelValue()===null?e.placeholder():void 0)("aria-label",e.ariaLabel||(e.label()==="p-emptylabel"?void 0:e.label()))("aria-activedescendant",e.focused?e.focusedOptionId:void 0)("name",e.name())("minlength",e.minlength())("min",e.min())("max",e.max())("pattern",e.pattern())("size",e.inputSize())("maxlength",e.maxlength())("required",e.required()?"":void 0)("readonly",e.readonly?"":void 0)("disabled",e.$disabled()?"":void 0)}}function li(t,s){if(t&1){let e=E();M(),m(0,"svg",28),v("click",function(i){h(e);let o=a(2);return g(o.clear(i))}),_()}if(t&2){let e=a(2);d(e.cx("clearIcon")),I("data-pc-section","clearicon")}}function ai(t,s){}function si(t,s){t&1&&p(0,ai,0,0,"ng-template")}function ri(t,s){if(t&1){let e=E();m(0,"span",29),v("click",function(i){h(e);let o=a(2);return g(o.clear(i))}),p(1,si,1,0,null,30),_()}if(t&2){let e=a(2);d(e.cx("clearIcon")),I("data-pc-section","clearicon"),c(),r("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)("ngTemplateOutletContext",O(5,_t,e.cx("clearIcon")))}}function ci(t,s){if(t&1&&(S(0),p(1,li,1,3,"svg",26)(2,ri,2,7,"span",27),T()),t&2){let e=a();c(),r("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),c(),r("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function pi(t,s){t&1&&w(0)}function di(t,s){if(t&1&&(S(0),p(1,pi,1,0,"ng-container",31),T()),t&2){let e=a(2);c(),r("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)}}function ui(t,s){if(t&1&&D(0,"span",33),t&2){let e=a(3);d(e.cn(e.cx("loadingIcon"),"pi-spin"+e.loadingIcon))}}function fi(t,s){if(t&1&&D(0,"span",33),t&2){let e=a(3);d(e.cn(e.cx("loadingIcon"),"pi pi-spinner pi-spin"))}}function mi(t,s){if(t&1&&(S(0),p(1,ui,1,2,"span",32)(2,fi,1,2,"span",32),T()),t&2){let e=a(2);c(),r("ngIf",e.loadingIcon),c(),r("ngIf",!e.loadingIcon)}}function _i(t,s){if(t&1&&(S(0),p(1,di,2,1,"ng-container",18)(2,mi,3,2,"ng-container",18),T()),t&2){let e=a();c(),r("ngIf",e.loadingIconTemplate||e._loadingIconTemplate),c(),r("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate)}}function hi(t,s){if(t&1&&D(0,"span"),t&2){let e=a(3);d(e.cn(e.cx("dropdownIcon"),e.dropdownIcon))}}function gi(t,s){if(t&1&&(M(),D(0,"svg",36)),t&2){let e=a(3);d(e.cx("dropdownIcon"))}}function yi(t,s){if(t&1&&(S(0),p(1,hi,1,2,"span",34)(2,gi,1,2,"svg",35),T()),t&2){let e=a(2);c(),r("ngIf",e.dropdownIcon),c(),r("ngIf",!e.dropdownIcon)}}function bi(t,s){}function xi(t,s){t&1&&p(0,bi,0,0,"ng-template")}function Ii(t,s){if(t&1&&(m(0,"span"),p(1,xi,1,0,null,30),_()),t&2){let e=a(2);d(e.cx("dropdownIcon")),c(),r("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)("ngTemplateOutletContext",O(4,_t,e.cx("dropdownIcon")))}}function vi(t,s){if(t&1&&p(0,yi,3,2,"ng-container",18)(1,Ii,2,6,"span",34),t&2){let e=a();r("ngIf",!e.dropdownIconTemplate&&!e._dropdownIconTemplate),c(),r("ngIf",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function Ci(t,s){t&1&&w(0)}function Si(t,s){t&1&&w(0)}function Ti(t,s){if(t&1&&(S(0),p(1,Si,1,0,"ng-container",30),T()),t&2){let e=a(3);c(),r("ngTemplateOutlet",e.filterTemplate||e._filterTemplate)("ngTemplateOutletContext",O(2,ht,e.filterOptions))}}function wi(t,s){t&1&&(M(),D(0,"svg",42))}function Oi(t,s){}function Vi(t,s){t&1&&p(0,Oi,0,0,"ng-template")}function Fi(t,s){if(t&1&&(m(0,"span"),p(1,Vi,1,0,null,31),_()),t&2){let e=a(4);c(),r("ngTemplateOutlet",e.filterIconTemplate||e._filterIconTemplate)}}function ki(t,s){if(t&1){let e=E();m(0,"p-iconfield")(1,"input",40,10),v("input",function(i){h(e);let o=a(3);return g(o.onFilterInputChange(i))})("keydown",function(i){h(e);let o=a(3);return g(o.onFilterKeyDown(i))})("blur",function(i){h(e);let o=a(3);return g(o.onFilterBlur(i))}),_(),m(3,"p-inputicon"),p(4,wi,1,0,"svg",41)(5,Fi,2,1,"span",18),_()()}if(t&2){let e=a(3);c(),d(e.cx("pcFilter")),r("pSize",e.size())("value",e._filterValue()||"")("variant",e.$variant()),I("placeholder",e.filterPlaceholder)("aria-owns",e.id+"_list")("aria-label",e.ariaFilterLabel)("aria-activedescendant",e.focusedOptionId),c(3),r("ngIf",!e.filterIconTemplate&&!e._filterIconTemplate),c(),r("ngIf",e.filterIconTemplate||e._filterIconTemplate)}}function Ei(t,s){if(t&1){let e=E();m(0,"div",29),v("click",function(i){return h(e),g(i.stopPropagation())}),p(1,Ti,2,4,"ng-container",20)(2,ki,6,11,"ng-template",null,9,z),_()}if(t&2){let e=G(3),n=a(2);d(n.cx("header")),c(),r("ngIf",n.filterTemplate||n._filterTemplate)("ngIfElse",e)}}function Mi(t,s){t&1&&w(0)}function Li(t,s){if(t&1&&p(0,Mi,1,0,"ng-container",30),t&2){let e=s.$implicit,n=s.options;a(2);let i=G(9);r("ngTemplateOutlet",i)("ngTemplateOutletContext",_e(2,gt,e,n))}}function Di(t,s){t&1&&w(0)}function zi(t,s){if(t&1&&p(0,Di,1,0,"ng-container",30),t&2){let e=s.options,n=a(4);r("ngTemplateOutlet",n.loaderTemplate||n._loaderTemplate)("ngTemplateOutletContext",O(2,ht,e))}}function Ai(t,s){t&1&&(S(0),p(1,zi,1,4,"ng-template",null,12,z),T())}function Pi(t,s){if(t&1){let e=E();m(0,"p-scroller",43,11),v("onLazyLoad",function(i){h(e);let o=a(2);return g(o.onLazyLoad.emit(i))}),p(2,Li,1,5,"ng-template",null,2,z)(4,Ai,3,0,"ng-container",18),_()}if(t&2){let e=a(2);fe(O(8,Y,e.scrollHeight)),r("items",e.visibleOptions())("itemSize",e.virtualScrollItemSize)("autoSize",!0)("lazy",e.lazy)("options",e.virtualScrollOptions),c(4),r("ngIf",e.loaderTemplate||e._loaderTemplate)}}function Bi(t,s){t&1&&w(0)}function Qi(t,s){if(t&1&&(S(0),p(1,Bi,1,0,"ng-container",30),T()),t&2){a();let e=G(9),n=a();c(),r("ngTemplateOutlet",e)("ngTemplateOutletContext",_e(3,gt,n.visibleOptions(),Le(2,Jt)))}}function Ki(t,s){if(t&1&&(m(0,"span"),B(1),_()),t&2){let e=a(2).$implicit,n=a(3);c(),W(n.getOptionGroupLabel(e.optionGroup))}}function Ri(t,s){t&1&&w(0)}function Hi(t,s){if(t&1&&(S(0),m(1,"li",47),p(2,Ki,2,1,"span",18)(3,Ri,1,0,"ng-container",30),_(),T()),t&2){let e=a(),n=e.$implicit,i=e.index,o=a().options,l=a(2);c(),d(l.cx("optionGroup")),r("ngStyle",O(7,Y,o.itemSize+"px")),I("id",l.id+"_"+l.getOptionIndex(i,o)),c(),r("ngIf",!l.groupTemplate&&!l._groupTemplate),c(),r("ngTemplateOutlet",l.groupTemplate||l._groupTemplate)("ngTemplateOutletContext",O(9,Ie,n.optionGroup))}}function Gi(t,s){if(t&1){let e=E();S(0),m(1,"p-selectItem",48),v("onClick",function(i){h(e);let o=a().$implicit,l=a(3);return g(l.onOptionSelect(i,o))})("onMouseEnter",function(i){h(e);let o=a().index,l=a().options,x=a(2);return g(x.onOptionMouseEnter(i,x.getOptionIndex(o,l)))}),_(),T()}if(t&2){let e=a(),n=e.$implicit,i=e.index,o=a().options,l=a(2);c(),r("id",l.id+"_"+l.getOptionIndex(i,o))("option",n)("checkmark",l.checkmark)("selected",l.isSelected(n))("label",l.getOptionLabel(n))("disabled",l.isOptionDisabled(n))("template",l.itemTemplate||l._itemTemplate)("focused",l.focusedOptionIndex()===l.getOptionIndex(i,o))("ariaPosInset",l.getAriaPosInset(l.getOptionIndex(i,o)))("ariaSetSize",l.ariaSetSize)}}function qi(t,s){if(t&1&&p(0,Hi,4,11,"ng-container",18)(1,Gi,2,10,"ng-container",18),t&2){let e=s.$implicit,n=a(3);r("ngIf",n.isOptionGroup(e)),c(),r("ngIf",!n.isOptionGroup(e))}}function Ni(t,s){if(t&1&&B(0),t&2){let e=a(4);me(" ",e.emptyFilterMessageLabel," ")}}function $i(t,s){t&1&&w(0,null,14)}function ji(t,s){if(t&1&&p(0,$i,2,0,"ng-container",31),t&2){let e=a(4);r("ngTemplateOutlet",e.emptyFilterTemplate||e._emptyFilterTemplate||e.emptyTemplate||e._emptyTemplate)}}function Ui(t,s){if(t&1&&(m(0,"li",47),ce(1,Ni,1,1)(2,ji,1,1,"ng-container"),_()),t&2){let e=a().options,n=a(2);d(n.cx("emptyMessage")),r("ngStyle",O(4,Y,e.itemSize+"px")),c(),pe(!n.emptyFilterTemplate&&!n._emptyFilterTemplate&&!n.emptyTemplate?1:2)}}function Wi(t,s){if(t&1&&B(0),t&2){let e=a(4);me(" ",e.emptyMessageLabel||e.emptyFilterMessageLabel," ")}}function Zi(t,s){t&1&&w(0,null,15)}function Yi(t,s){if(t&1&&p(0,Zi,2,0,"ng-container",31),t&2){let e=a(4);r("ngTemplateOutlet",e.emptyTemplate||e._emptyTemplate)}}function Ji(t,s){if(t&1&&(m(0,"li",47),ce(1,Wi,1,1)(2,Yi,1,1,"ng-container"),_()),t&2){let e=a().options,n=a(2);d(n.cx("emptyMessage")),r("ngStyle",O(4,Y,e.itemSize+"px")),c(),pe(!n.emptyTemplate&&!n._emptyTemplate?1:2)}}function Xi(t,s){if(t&1&&(m(0,"ul",44,13),p(2,qi,2,2,"ng-template",45)(3,Ui,3,6,"li",46)(4,Ji,3,6,"li",46),_()),t&2){let e=s.$implicit,n=s.options,i=a(2);fe(n.contentStyle),d(i.cn(i.cx("list"),n.contentStyleClass)),I("id",i.id+"_list")("aria-label",i.listLabel),c(2),r("ngForOf",e),c(),r("ngIf",i.filterValue&&i.isEmpty()),c(),r("ngIf",!i.filterValue&&i.isEmpty())}}function en(t,s){t&1&&w(0)}function tn(t,s){if(t&1){let e=E();m(0,"div",37)(1,"span",38,6),v("focus",function(i){h(e);let o=a();return g(o.onFirstHiddenFocus(i))}),_(),p(3,Ci,1,0,"ng-container",31)(4,Ei,4,4,"div",27),m(5,"div"),p(6,Pi,5,10,"p-scroller",39)(7,Qi,2,6,"ng-container",18)(8,Xi,5,9,"ng-template",null,7,z),_(),p(10,en,1,0,"ng-container",31),m(11,"span",38,8),v("focus",function(i){h(e);let o=a();return g(o.onLastHiddenFocus(i))}),_()()}if(t&2){let e=a();d(e.cn(e.cx("overlay"),e.panelStyleClass)),r("ngStyle",e.panelStyle),c(),I("tabindex",0)("data-p-hidden-accessible",!0)("data-p-hidden-focusable",!0),c(2),r("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),c(),r("ngIf",e.filter),c(),d(e.cx("listContainer")),Fe("max-height",e.virtualScroll?"auto":e.scrollHeight||"auto"),c(),r("ngIf",e.virtualScroll),c(),r("ngIf",!e.virtualScroll),c(3),r("ngTemplateOutlet",e.footerTemplate||e._footerTemplate),c(),I("tabindex",0)("data-p-hidden-accessible",!0)("data-p-hidden-focusable",!0)}}var nn=`
    ${ft}

    /* For PrimeNG */
    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.ng-invalid.ng-dirty {
        border-color: dt('select.invalid.border.color');
    }

    .p-dropdown.ng-invalid.ng-dirty .p-dropdown-label.p-placeholder,
    .p-select.ng-invalid.ng-dirty .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }
`,on={root:({instance:t})=>["p-select p-component p-inputwrapper",{"p-disabled":t.$disabled(),"p-variant-filled":t.$variant()==="filled","p-focus":t.focused,"p-invalid":t.invalid(),"p-inputwrapper-filled":t.$filled(),"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-select-open":t.overlayVisible,"p-select-fluid":t.hasFluid,"p-select-sm p-inputfield-sm":t.size()==="small","p-select-lg p-inputfield-lg":t.size()==="large"}],label:({instance:t})=>["p-select-label",{"p-placeholder":t.placeholder()&&t.label()===t.placeholder(),"p-select-label-empty":!t.editable&&!t.selectedItemTemplate&&(t.label()===void 0||t.label()===null||t.label()==="p-emptylabel"||t.label().length===0)}],clearIcon:"p-select-clear-icon",dropdown:"p-select-dropdown",loadingIcon:"p-select-loading-icon",dropdownIcon:"p-select-dropdown-icon",overlay:"p-select-overlay p-component-overlay p-component",header:"p-select-header",pcFilter:"p-select-filter",listContainer:"p-select-list-container",list:"p-select-list",optionGroup:"p-select-option-group",optionGroupLabel:"p-select-option-group-label",option:({instance:t})=>["p-select-option",{"p-select-option-selected":t.selected&&!t.checkmark,"p-disabled":t.disabled,"p-focus":t.focused}],optionLabel:"p-select-option-label",optionCheckIcon:"p-select-option-check-icon",optionBlankIcon:"p-select-option-blank-icon",emptyMessage:"p-select-empty-message"},se=(()=>{class t extends ${name="select";theme=nn;classes=on;static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275prov=R({token:t,factory:t.\u0275fac})}return t})();var ln={provide:Pe,useExisting:we(()=>sn),multi:!0},an=(()=>{class t extends j{id;option;selected;focused;label;disabled;visible;itemSize;ariaPosInset;ariaSetSize;template;checkmark;onClick=new V;onMouseEnter=new V;_componentStyle=P(se);onOptionClick(e){this.onClick.emit(e)}onOptionMouseEnter(e){this.onMouseEnter.emit(e)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=C(t)))(i||t)}})();static \u0275cmp=F({type:t,selectors:[["p-selectItem"]],inputs:{id:"id",option:"option",selected:[2,"selected","selected",y],focused:[2,"focused","focused",y],label:"label",disabled:[2,"disabled","disabled",y],visible:[2,"visible","visible",y],itemSize:[2,"itemSize","itemSize",te],ariaPosInset:"ariaPosInset",ariaSetSize:"ariaSetSize",template:"template",checkmark:[2,"checkmark","checkmark",y]},outputs:{onClick:"onClick",onMouseEnter:"onMouseEnter"},features:[Q([se]),k],decls:4,vars:19,consts:[["role","option","pRipple","",3,"click","mouseenter","id","ngStyle"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","check",3,"class",4,"ngIf"],["data-p-icon","blank",3,"class",4,"ngIf"],["data-p-icon","check"],["data-p-icon","blank"]],template:function(n,i){n&1&&(m(0,"li",0),v("click",function(l){return i.onOptionClick(l)})("mouseenter",function(l){return i.onOptionMouseEnter(l)}),p(1,Ot,3,2,"ng-container",1)(2,Vt,2,1,"span",1)(3,Ft,1,0,"ng-container",2),_()),n&2&&(d(i.cx("option")),r("id",i.id)("ngStyle",O(15,Y,i.itemSize+"px")),I("aria-label",i.label)("aria-setsize",i.ariaSetSize)("aria-posinset",i.ariaPosInset)("aria-selected",i.selected)("data-p-focused",i.focused)("data-p-highlight",i.selected)("data-p-disabled",i.disabled),c(),r("ngIf",i.checkmark),c(),r("ngIf",!i.template),c(),r("ngTemplateOutlet",i.template)("ngTemplateOutletContext",O(17,Ie,i.option)))},dependencies:[K,he,ye,ge,Z,Je,We,ct],encapsulation:2})}return t})(),sn=(()=>{class t extends Xe{zone;filterService;id;scrollHeight="200px";filter;panelStyle;styleClass;panelStyleClass;readonly;editable;tabindex=0;set placeholder(e){this._placeholder.set(e)}get placeholder(){return this._placeholder.asReadonly()}loadingIcon;filterPlaceholder;filterLocale;inputId;dataKey;filterBy;filterFields;autofocus;resetFilterOnHide=!1;checkmark=!1;dropdownIcon;loading=!1;optionLabel;optionValue;optionDisabled;optionGroupLabel="label";optionGroupChildren="items";group;showClear;emptyFilterMessage="";emptyMessage="";lazy=!1;virtualScroll;virtualScrollItemSize;virtualScrollOptions;overlayOptions;ariaFilterLabel;ariaLabel;ariaLabelledBy;filterMatchMode="contains";tooltip="";tooltipPosition="right";tooltipPositionStyle="absolute";tooltipStyleClass;focusOnHover=!0;selectOnFocus=!1;autoOptionFocus=!1;autofocusFilter=!0;get filterValue(){return this._filterValue()}set filterValue(e){setTimeout(()=>{this._filterValue.set(e)})}get options(){return this._options()}set options(e){He(e,this._options())||this._options.set(e)}appendTo=ze(void 0);onChange=new V;onFilter=new V;onFocus=new V;onBlur=new V;onClick=new V;onShow=new V;onHide=new V;onClear=new V;onLazyLoad=new V;_componentStyle=P(se);filterViewChild;focusInputViewChild;editableInputViewChild;itemsViewChild;scroller;overlayViewChild;firstHiddenFocusableElementOnOverlay;lastHiddenFocusableElementOnOverlay;itemsWrapper;$appendTo=ee(()=>this.appendTo()||this.config.overlayAppendTo());itemTemplate;groupTemplate;loaderTemplate;selectedItemTemplate;headerTemplate;filterTemplate;footerTemplate;emptyFilterTemplate;emptyTemplate;dropdownIconTemplate;loadingIconTemplate;clearIconTemplate;filterIconTemplate;onIconTemplate;offIconTemplate;cancelIconTemplate;templates;_itemTemplate;_selectedItemTemplate;_headerTemplate;_filterTemplate;_footerTemplate;_emptyFilterTemplate;_emptyTemplate;_groupTemplate;_loaderTemplate;_dropdownIconTemplate;_loadingIconTemplate;_clearIconTemplate;_filterIconTemplate;_cancelIconTemplate;_onIconTemplate;_offIconTemplate;filterOptions;_options=H(null);_placeholder=H(void 0);value;hover;focused;overlayVisible;optionsChanged;panel;dimensionsUpdated;hoveredItem;selectedOptionUpdated;_filterValue=H(null);searchValue;searchIndex;searchTimeout;previousSearchChar;currentSearchChar;preventModelTouched;focusedOptionIndex=H(-1);labelId;listId;clicked=H(!1);get emptyMessageLabel(){return this.emptyMessage||this.config.getTranslation(oe.EMPTY_MESSAGE)}get emptyFilterMessageLabel(){return this.emptyFilterMessage||this.config.getTranslation(oe.EMPTY_FILTER_MESSAGE)}get isVisibleClearIcon(){return this.modelValue()!=null&&this.hasSelectedOption()&&this.showClear&&!this.$disabled()}get listLabel(){return this.config.getTranslation(oe.ARIA).listLabel}get focusedOptionId(){return this.focusedOptionIndex()!==-1?`${this.id}_${this.focusedOptionIndex()}`:null}visibleOptions=ee(()=>{let e=this.getAllVisibleAndNonVisibleOptions();if(this._filterValue()){let i=!(this.filterBy||this.optionLabel)&&!this.filterFields&&!this.optionValue?this.options?.filter(o=>o.label?o.label.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim())!==-1:o.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim())!==-1):this.filterService.filter(e,this.searchFields(),this._filterValue().trim(),this.filterMatchMode,this.filterLocale);if(this.group){let o=this.options||[],l=[];return o.forEach(x=>{let Ce=this.getOptionGroupChildren(x).filter(yt=>i?.includes(yt));Ce.length>0&&l.push(Te(Se({},x),{[typeof this.optionGroupChildren=="string"?this.optionGroupChildren:"items"]:[...Ce]}))}),this.flatOptions(l)}return i}return e});label=ee(()=>{let e=this.getAllVisibleAndNonVisibleOptions(),n=e.findIndex(i=>this.isOptionValueEqualsModelValue(i));if(n!==-1){let i=e[n];return this.getOptionLabel(i)}return this.placeholder()||"p-emptylabel"});selectedOption;constructor(e,n){super(),this.zone=e,this.filterService=n,De(()=>{let i=this.modelValue(),o=this.visibleOptions();if(o&&ie(o)){let l=this.findSelectedOptionIndex();if(l!==-1||i===void 0||typeof i=="string"&&i.length===0||this.isModelValueNotSet()||this.editable)this.selectedOption=o[l];else{let x=o.findIndex(ve=>this.isSelected(ve));x!==-1&&(this.selectedOption=o[x])}}be(o)&&(i===void 0||this.isModelValueNotSet())&&ie(this.selectedOption)&&(this.selectedOption=null),i!==void 0&&this.editable&&this.updateEditableLabel(),this.cd.markForCheck()})}isModelValueNotSet(){return this.modelValue()===null&&!this.isOptionValueEqualsModelValue(this.selectedOption)}getAllVisibleAndNonVisibleOptions(){return this.group?this.flatOptions(this.options):this.options||[]}ngOnInit(){super.ngOnInit(),this.id=this.id||ne("pn_id_"),this.autoUpdateModel(),this.filterBy&&(this.filterOptions={filter:e=>this.onFilterInputChange(e),reset:()=>this.resetFilter()})}ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"selectedItem":this._selectedItemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"filter":this._filterTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"emptyfilter":this._emptyFilterTemplate=e.template;break;case"empty":this._emptyTemplate=e.template;break;case"group":this._groupTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"dropdownicon":this._dropdownIconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;case"clearicon":this._clearIconTemplate=e.template;break;case"filtericon":this._filterIconTemplate=e.template;break;case"cancelicon":this._cancelIconTemplate=e.template;break;case"onicon":this._onIconTemplate=e.template;break;case"officon":this._offIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}ngAfterViewChecked(){if(this.optionsChanged&&this.overlayVisible&&(this.optionsChanged=!1,this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.overlayViewChild&&this.overlayViewChild.alignOverlay()},1)})),this.selectedOptionUpdated&&this.itemsWrapper){let e=q(this.overlayViewChild?.overlayViewChild?.nativeElement,"li.p-select-option-selected");e&&Re(this.itemsWrapper,e),this.selectedOptionUpdated=!1}}flatOptions(e){return(e||[]).reduce((n,i,o)=>{n.push({optionGroup:i,group:!0,index:o});let l=this.getOptionGroupChildren(i);return l&&l.forEach(x=>n.push(x)),n},[])}autoUpdateModel(){this.selectOnFocus&&this.autoOptionFocus&&!this.hasSelectedOption()&&(this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex()),this.onOptionSelect(null,this.visibleOptions()[this.focusedOptionIndex()],!1))}onOptionSelect(e,n,i=!0,o=!1){if(!this.isOptionDisabled(n)){if(!this.isSelected(n)){let l=this.getOptionValue(n);this.updateModel(l,e),this.focusedOptionIndex.set(this.findSelectedOptionIndex()),o===!1&&this.onChange.emit({originalEvent:e,value:l})}i&&this.hide(!0)}}onOptionMouseEnter(e,n){this.focusOnHover&&this.changeFocusedOptionIndex(e,n)}updateModel(e,n){this.value=e,this.onModelChange(e),this.writeModelValue(e),this.selectedOptionUpdated=!0}allowModelChange(){return!!this.modelValue()&&!this.placeholder()&&(this.modelValue()===void 0||this.modelValue()===null)&&!this.editable&&this.options&&this.options.length}isSelected(e){return this.isOptionValueEqualsModelValue(e)}isOptionValueEqualsModelValue(e){return e!=null&&!this.isOptionGroup(e)&&Ge(this.modelValue(),this.getOptionValue(e),this.equalityKey())}ngAfterViewInit(){super.ngAfterViewInit(),this.editable&&this.updateEditableLabel(),this.updatePlaceHolderForFloatingLabel()}updatePlaceHolderForFloatingLabel(){let e=this.el.nativeElement.parentElement,n=e?.classList.contains("p-float-label");if(e&&n&&!this.selectedOption){let i=e.querySelector("label");i&&this._placeholder.set(i.textContent)}}updateEditableLabel(){this.editableInputViewChild&&(this.editableInputViewChild.nativeElement.value=this.getOptionLabel(this.selectedOption)||this.modelValue()||"")}clearEditableLabel(){this.editableInputViewChild&&(this.editableInputViewChild.nativeElement.value="")}getOptionIndex(e,n){return this.virtualScrollerDisabled?e:n&&n.getItemOptions(e).index}getOptionLabel(e){return this.optionLabel!==void 0&&this.optionLabel!==null?N(e,this.optionLabel):e&&e.label!==void 0?e.label:e}getOptionValue(e){return this.optionValue&&this.optionValue!==null?N(e,this.optionValue):!this.optionLabel&&e&&e.value!==void 0?e.value:e}isSelectedOptionEmpty(){return be(this.selectedOption)}isOptionDisabled(e){return this.optionDisabled?N(e,this.optionDisabled):e&&e.disabled!==void 0?e.disabled:!1}getOptionGroupLabel(e){return this.optionGroupLabel!==void 0&&this.optionGroupLabel!==null?N(e,this.optionGroupLabel):e&&e.label!==void 0?e.label:e}getOptionGroupChildren(e){return this.optionGroupChildren!==void 0&&this.optionGroupChildren!==null?N(e,this.optionGroupChildren):e.items}getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions().slice(0,e).filter(n=>this.isOptionGroup(n)).length:e)+1}get ariaSetSize(){return this.visibleOptions().filter(e=>!this.isOptionGroup(e)).length}resetFilter(){this._filterValue.set(null),this.filterViewChild&&this.filterViewChild.nativeElement&&(this.filterViewChild.nativeElement.value="")}onContainerClick(e){this.$disabled()||this.readonly||this.loading||(this.focusInputViewChild?.nativeElement.focus({preventScroll:!0}),!(e.target.tagName==="INPUT"||e.target.getAttribute("data-pc-section")==="clearicon"||e.target.closest('[data-pc-section="clearicon"]'))&&((!this.overlayViewChild||!this.overlayViewChild.el.nativeElement.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.onClick.emit(e),this.clicked.set(!0),this.cd.detectChanges()))}isEmpty(){return!this._options()||this.visibleOptions()&&this.visibleOptions().length===0}onEditableInput(e){let n=e.target.value;this.searchValue="",!this.searchOptions(e,n)&&this.focusedOptionIndex.set(-1),this.onModelChange(n),this.updateModel(n||null,e),setTimeout(()=>{this.onChange.emit({originalEvent:e,value:n})},1),!this.overlayVisible&&ie(n)&&this.show()}show(e){this.overlayVisible=!0,this.focusedOptionIndex.set(this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex()),e&&A(this.focusInputViewChild?.nativeElement),this.cd.markForCheck()}onOverlayAnimationStart(e){if(e.toState==="visible"){if(this.itemsWrapper=q(this.overlayViewChild?.overlayViewChild?.nativeElement,this.virtualScroll?".p-scroller":".p-select-list-container"),this.virtualScroll&&this.scroller?.setContentEl(this.itemsViewChild?.nativeElement),this.options&&this.options.length)if(this.virtualScroll){let n=this.modelValue()?this.focusedOptionIndex():-1;n!==-1&&this.scroller?.scrollToIndex(n)}else{let n=q(this.itemsWrapper,".p-select-option.p-select-option-selected");n&&n.scrollIntoView({block:"nearest",inline:"nearest"})}this.filterViewChild&&this.filterViewChild.nativeElement&&(this.preventModelTouched=!0,this.autofocusFilter&&!this.editable&&this.filterViewChild.nativeElement.focus()),this.onShow.emit(e)}e.toState==="void"&&(this.itemsWrapper=null,this.onModelTouched(),this.onHide.emit(e))}hide(e){this.overlayVisible=!1,this.focusedOptionIndex.set(-1),this.clicked.set(!1),this.searchValue="",this.overlayOptions?.mode==="modal"&&je(),this.filter&&this.resetFilterOnHide&&this.resetFilter(),e&&(this.focusInputViewChild&&A(this.focusInputViewChild?.nativeElement),this.editable&&this.editableInputViewChild&&A(this.editableInputViewChild?.nativeElement)),this.cd.markForCheck()}onInputFocus(e){if(this.$disabled())return;this.focused=!0;let n=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(n),this.overlayVisible&&this.scrollInView(this.focusedOptionIndex()),this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),!this.preventModelTouched&&!this.overlayVisible&&this.onModelTouched(),this.preventModelTouched=!1}onKeyDown(e,n=!1){if(!(this.$disabled()||this.readonly||this.loading)){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,this.editable);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,this.editable);break;case"Delete":this.onDeleteKey(e);break;case"Home":this.onHomeKey(e,this.editable);break;case"End":this.onEndKey(e,this.editable);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Space":this.onSpaceKey(e,n);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e,this.editable);break;case"ShiftLeft":case"ShiftRight":break;default:!e.metaKey&&qe(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key));break}this.clicked.set(!1)}}onFilterKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,!0);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,!0);break;case"Home":this.onHomeKey(e,!0);break;case"End":this.onEndKey(e,!0);break;case"Enter":case"NumpadEnter":this.onEnterKey(e,!0);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e,!0);break;default:break}}onFilterBlur(e){this.focusedOptionIndex.set(-1)}onArrowDownKey(e){if(!this.overlayVisible)this.show(),this.editable&&this.changeFocusedOptionIndex(e,this.findSelectedOptionIndex());else{let n=this.focusedOptionIndex()!==-1?this.findNextOptionIndex(this.focusedOptionIndex()):this.clicked()?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,n)}e.preventDefault(),e.stopPropagation()}changeFocusedOptionIndex(e,n){if(this.focusedOptionIndex()!==n&&(this.focusedOptionIndex.set(n),this.scrollInView(),this.selectOnFocus)){let i=this.visibleOptions()[n];this.onOptionSelect(e,i,!1)}}get virtualScrollerDisabled(){return!this.virtualScroll}scrollInView(e=-1){let n=e!==-1?`${this.id}_${e}`:this.focusedOptionId;if(this.itemsViewChild&&this.itemsViewChild.nativeElement){let i=q(this.itemsViewChild.nativeElement,`li[id="${n}"]`);i?i.scrollIntoView&&i.scrollIntoView({block:"nearest",inline:"nearest"}):this.virtualScrollerDisabled||setTimeout(()=>{this.virtualScroll&&this.scroller?.scrollToIndex(e!==-1?e:this.focusedOptionIndex())},0)}}hasSelectedOption(){return this.modelValue()!==void 0}isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)}equalityKey(){return this.optionValue?void 0:this.dataKey}findFirstFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e}findFirstOptionIndex(){return this.visibleOptions().findIndex(e=>this.isValidOption(e))}findSelectedOptionIndex(){return this.hasSelectedOption()?this.visibleOptions().findIndex(e=>this.isValidSelectedOption(e)):-1}findNextOptionIndex(e){let n=e<this.visibleOptions().length-1?this.visibleOptions().slice(e+1).findIndex(i=>this.isValidOption(i)):-1;return n>-1?n+e+1:e}findPrevOptionIndex(e){let n=e>0?xe(this.visibleOptions().slice(0,e),i=>this.isValidOption(i)):-1;return n>-1?n:e}findLastOptionIndex(){return xe(this.visibleOptions(),e=>this.isValidOption(e))}findLastFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e}isValidOption(e){return e!=null&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))}isOptionGroup(e){return this.optionGroupLabel!==void 0&&this.optionGroupLabel!==null&&e.optionGroup!==void 0&&e.optionGroup!==null&&e.group}onArrowUpKey(e,n=!1){if(e.altKey&&!n){if(this.focusedOptionIndex()!==-1){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}this.overlayVisible&&this.hide()}else{let i=this.focusedOptionIndex()!==-1?this.findPrevOptionIndex(this.focusedOptionIndex()):this.clicked()?this.findLastOptionIndex():this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,i),!this.overlayVisible&&this.show()}e.preventDefault(),e.stopPropagation()}onArrowLeftKey(e,n=!1){n&&this.focusedOptionIndex.set(-1)}onDeleteKey(e){this.showClear&&(this.clear(e),e.preventDefault())}onHomeKey(e,n=!1){if(n&&e.currentTarget&&e.currentTarget.setSelectionRange){let i=e.currentTarget;e.shiftKey?i.setSelectionRange(0,i.value.length):(i.setSelectionRange(0,0),this.focusedOptionIndex.set(-1))}else this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()}onEndKey(e,n=!1){if(n&&e.currentTarget&&e.currentTarget.setSelectionRange){let i=e.currentTarget;if(e.shiftKey)i.setSelectionRange(0,i.value.length);else{let o=i.value.length;i.setSelectionRange(o,o),this.focusedOptionIndex.set(-1)}}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()}onPageDownKey(e){this.scrollInView(this.visibleOptions().length-1),e.preventDefault()}onPageUpKey(e){this.scrollInView(0),e.preventDefault()}onSpaceKey(e,n=!1){!this.editable&&!n&&this.onEnterKey(e)}onEnterKey(e,n=!1){if(!this.overlayVisible)this.focusedOptionIndex.set(-1),this.onArrowDownKey(e);else{if(this.focusedOptionIndex()!==-1){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}!n&&this.hide()}e.preventDefault()}onEscapeKey(e){this.overlayVisible&&(this.hide(!0),e.preventDefault(),e.stopPropagation())}onTabKey(e,n=!1){if(!n)if(this.overlayVisible&&this.hasFocusableElements())A(e.shiftKey?this.lastHiddenFocusableElementOnOverlay?.nativeElement:this.firstHiddenFocusableElementOnOverlay?.nativeElement),e.preventDefault();else{if(this.focusedOptionIndex()!==-1&&this.overlayVisible){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}this.overlayVisible&&this.hide(this.filter)}e.stopPropagation()}onFirstHiddenFocus(e){let n=e.relatedTarget===this.focusInputViewChild?.nativeElement?Qe(this.overlayViewChild?.el?.nativeElement,":not(.p-hidden-focusable)"):this.focusInputViewChild?.nativeElement;A(n)}onLastHiddenFocus(e){let n=e.relatedTarget===this.focusInputViewChild?.nativeElement?Ke(this.overlayViewChild?.overlayViewChild?.nativeElement,':not([data-p-hidden-focusable="true"])'):this.focusInputViewChild?.nativeElement;A(n)}hasFocusableElements(){return Be(this.overlayViewChild?.overlayViewChild?.nativeElement,':not([data-p-hidden-focusable="true"])').length>0}onBackspaceKey(e,n=!1){n&&!this.overlayVisible&&this.show()}searchFields(){return this.filterBy?.split(",")||this.filterFields||[this.optionLabel]}searchOptions(e,n){this.searchValue=(this.searchValue||"")+n;let i=-1,o=!1;return i=this.visibleOptions().findIndex(l=>this.isOptionMatched(l)),i!==-1&&(o=!0),i===-1&&this.focusedOptionIndex()===-1&&(i=this.findFirstFocusedOptionIndex()),i!==-1&&setTimeout(()=>{this.changeFocusedOptionIndex(e,i)}),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.searchValue="",this.searchTimeout=null},500),o}isOptionMatched(e){return this.isValidOption(e)&&this.getOptionLabel(e).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale))}onFilterInputChange(e){let n=e.target.value;this._filterValue.set(n),this.focusedOptionIndex.set(-1),this.onFilter.emit({originalEvent:e,filter:this._filterValue()}),!this.virtualScrollerDisabled&&this.scroller?.scrollToIndex(0),setTimeout(()=>{this.overlayViewChild?.alignOverlay()}),this.cd.markForCheck()}applyFocus(){this.editable?q(this.el.nativeElement,".p-dropdown-label.p-inputtext").focus():A(this.focusInputViewChild?.nativeElement)}focus(){this.applyFocus()}clear(e){this.updateModel(null,e),this.clearEditableLabel(),this.onModelTouched(),this.onChange.emit({originalEvent:e,value:this.value}),this.onClear.emit(e),this.resetFilter()}writeControlValue(e,n){this.filter&&this.resetFilter(),this.value=e,this.allowModelChange()&&this.onModelChange(e),n(this.value),this.updateEditableLabel(),this.cd.markForCheck()}static \u0275fac=function(n){return new(n||t)(re(Oe),re(Ne))};static \u0275cmp=F({type:t,selectors:[["p-select"]],contentQueries:function(n,i,o){if(n&1&&(b(o,kt,4),b(o,Et,4),b(o,Mt,4),b(o,Lt,4),b(o,Dt,4),b(o,mt,4),b(o,zt,4),b(o,At,4),b(o,Pt,4),b(o,Bt,4),b(o,Qt,4),b(o,Kt,4),b(o,Rt,4),b(o,Ht,4),b(o,Gt,4),b(o,qt,4),b(o,$e,4)),n&2){let l;u(l=f())&&(i.itemTemplate=l.first),u(l=f())&&(i.groupTemplate=l.first),u(l=f())&&(i.loaderTemplate=l.first),u(l=f())&&(i.selectedItemTemplate=l.first),u(l=f())&&(i.headerTemplate=l.first),u(l=f())&&(i.filterTemplate=l.first),u(l=f())&&(i.footerTemplate=l.first),u(l=f())&&(i.emptyFilterTemplate=l.first),u(l=f())&&(i.emptyTemplate=l.first),u(l=f())&&(i.dropdownIconTemplate=l.first),u(l=f())&&(i.loadingIconTemplate=l.first),u(l=f())&&(i.clearIconTemplate=l.first),u(l=f())&&(i.filterIconTemplate=l.first),u(l=f())&&(i.onIconTemplate=l.first),u(l=f())&&(i.offIconTemplate=l.first),u(l=f())&&(i.cancelIconTemplate=l.first),u(l=f())&&(i.templates=l)}},viewQuery:function(n,i){if(n&1&&(L(mt,5),L(Nt,5),L($t,5),L(jt,5),L(Ut,5),L(Wt,5),L(Zt,5),L(Yt,5)),n&2){let o;u(o=f())&&(i.filterViewChild=o.first),u(o=f())&&(i.focusInputViewChild=o.first),u(o=f())&&(i.editableInputViewChild=o.first),u(o=f())&&(i.itemsViewChild=o.first),u(o=f())&&(i.scroller=o.first),u(o=f())&&(i.overlayViewChild=o.first),u(o=f())&&(i.firstHiddenFocusableElementOnOverlay=o.first),u(o=f())&&(i.lastHiddenFocusableElementOnOverlay=o.first)}},hostVars:3,hostBindings:function(n,i){n&1&&v("click",function(l){return i.onContainerClick(l)}),n&2&&(I("id",i.id),d(i.cn(i.cx("root"),i.styleClass)))},inputs:{id:"id",scrollHeight:"scrollHeight",filter:[2,"filter","filter",y],panelStyle:"panelStyle",styleClass:"styleClass",panelStyleClass:"panelStyleClass",readonly:[2,"readonly","readonly",y],editable:[2,"editable","editable",y],tabindex:[2,"tabindex","tabindex",te],placeholder:"placeholder",loadingIcon:"loadingIcon",filterPlaceholder:"filterPlaceholder",filterLocale:"filterLocale",inputId:"inputId",dataKey:"dataKey",filterBy:"filterBy",filterFields:"filterFields",autofocus:[2,"autofocus","autofocus",y],resetFilterOnHide:[2,"resetFilterOnHide","resetFilterOnHide",y],checkmark:[2,"checkmark","checkmark",y],dropdownIcon:"dropdownIcon",loading:[2,"loading","loading",y],optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",optionGroupLabel:"optionGroupLabel",optionGroupChildren:"optionGroupChildren",group:[2,"group","group",y],showClear:[2,"showClear","showClear",y],emptyFilterMessage:"emptyFilterMessage",emptyMessage:"emptyMessage",lazy:[2,"lazy","lazy",y],virtualScroll:[2,"virtualScroll","virtualScroll",y],virtualScrollItemSize:[2,"virtualScrollItemSize","virtualScrollItemSize",te],virtualScrollOptions:"virtualScrollOptions",overlayOptions:"overlayOptions",ariaFilterLabel:"ariaFilterLabel",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",filterMatchMode:"filterMatchMode",tooltip:"tooltip",tooltipPosition:"tooltipPosition",tooltipPositionStyle:"tooltipPositionStyle",tooltipStyleClass:"tooltipStyleClass",focusOnHover:[2,"focusOnHover","focusOnHover",y],selectOnFocus:[2,"selectOnFocus","selectOnFocus",y],autoOptionFocus:[2,"autoOptionFocus","autoOptionFocus",y],autofocusFilter:[2,"autofocusFilter","autofocusFilter",y],filterValue:"filterValue",options:"options",appendTo:[1,"appendTo"]},outputs:{onChange:"onChange",onFilter:"onFilter",onFocus:"onFocus",onBlur:"onBlur",onClick:"onClick",onShow:"onShow",onHide:"onHide",onClear:"onClear",onLazyLoad:"onLazyLoad"},features:[Q([ln,se]),k],decls:11,vars:14,consts:[["elseBlock",""],["overlay",""],["content",""],["focusInput",""],["defaultPlaceholder",""],["editableInput",""],["firstHiddenFocusableEl",""],["buildInItems",""],["lastHiddenFocusableEl",""],["builtInFilterElement",""],["filter",""],["scroller",""],["loader",""],["items",""],["emptyFilter",""],["empty",""],["role","combobox",3,"class","pTooltip","tooltipPosition","positionStyle","tooltipStyleClass","pAutoFocus","focus","blur","keydown",4,"ngIf"],["type","text",3,"class","pAutoFocus","input","keydown","focus","blur",4,"ngIf"],[4,"ngIf"],["role","button","aria-label","dropdown trigger","aria-haspopup","listbox"],[4,"ngIf","ngIfElse"],[3,"visibleChange","onAnimationStart","onHide","hostAttrSelector","visible","options","target","appendTo"],["role","combobox",3,"focus","blur","keydown","pTooltip","tooltipPosition","positionStyle","tooltipStyleClass","pAutoFocus"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["type","text",3,"input","keydown","focus","blur","pAutoFocus"],["data-p-icon","times",3,"class","click",4,"ngIf"],[3,"class","click",4,"ngIf"],["data-p-icon","times",3,"click"],[3,"click"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngTemplateOutlet"],["aria-hidden","true",3,"class",4,"ngIf"],["aria-hidden","true"],[3,"class",4,"ngIf"],["data-p-icon","chevron-down",3,"class",4,"ngIf"],["data-p-icon","chevron-down"],[3,"ngStyle"],["role","presentation",1,"p-hidden-accessible","p-hidden-focusable",3,"focus"],[3,"items","style","itemSize","autoSize","lazy","options","onLazyLoad",4,"ngIf"],["pInputText","","type","text","role","searchbox","autocomplete","off",3,"input","keydown","blur","pSize","value","variant"],["data-p-icon","search",4,"ngIf"],["data-p-icon","search"],[3,"onLazyLoad","items","itemSize","autoSize","lazy","options"],["role","listbox"],["ngFor","",3,"ngForOf"],["role","option",3,"class","ngStyle",4,"ngIf"],["role","option",3,"ngStyle"],[3,"onClick","onMouseEnter","id","option","checkmark","selected","label","disabled","template","focused","ariaPosInset","ariaSetSize"]],template:function(n,i){if(n&1){let o=E();p(0,ni,6,22,"span",16)(1,oi,2,18,"input",17)(2,ci,3,2,"ng-container",18),m(3,"div",19),p(4,_i,3,2,"ng-container",20)(5,vi,2,2,"ng-template",null,0,z),_(),m(7,"p-overlay",21,1),Me("visibleChange",function(x){return h(o),Ee(i.overlayVisible,x)||(i.overlayVisible=x),g(x)}),v("onAnimationStart",function(x){return h(o),g(i.onOverlayAnimationStart(x))})("onHide",function(){return h(o),g(i.hide())}),p(9,tn,13,18,"ng-template",null,2,z),_()}if(n&2){let o=G(6);r("ngIf",!i.editable),c(),r("ngIf",i.editable),c(),r("ngIf",i.isVisibleClearIcon),c(),d(i.cx("dropdown")),I("aria-expanded",i.overlayVisible??!1)("data-pc-section","trigger"),c(),r("ngIf",i.loading)("ngIfElse",o),c(3),r("hostAttrSelector",i.attrSelector),ke("visible",i.overlayVisible),r("options",i.overlayOptions)("target","@parent")("appendTo",i.$appendTo())}},dependencies:[K,Ae,he,ye,ge,an,it,tt,Ue,Ye,Ze,pt,et,rt,ut,nt,Z],encapsulation:2,changeDetection:0})}return t})();export{sn as a};
