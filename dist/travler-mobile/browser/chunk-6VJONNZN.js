import{a as oe}from"./chunk-IOPHG2KH.js";import{a as ce}from"./chunk-H4ZN6NX2.js";import{L as J,M as W,V as Y,W as ee,Y as ne,ga as te}from"./chunk-ZGVWO2O4.js";import{a as X,e as Z}from"./chunk-RAZRMRQX.js";import{i as H,k as P,p as U,v as K}from"./chunk-GPQBVM7U.js";import{$ as z,Bc as $,Ec as q,Hb as s,Ob as a,Pb as w,Qb as V,Rb as C,Rc as R,Ub as O,Uc as B,Vb as M,Wb as T,Yb as L,_ as S,_a as d,bc as Q,bd as x,cd as G,db as g,dc as h,ea as E,gc as F,hc as j,ic as y,jc as I,ka as f,la as m,ma as p,pc as A,qb as _,qc as l,ua as D,ub as v,wb as k,ya as N,za as u}from"./chunk-45NCVV7C.js";var le=["data-p-icon","minus"],ie=(()=>{class n extends te{static \u0275fac=(()=>{let t;return function(e){return(t||(t=u(n)))(e||n)}})();static \u0275cmp=_({type:n,selectors:[["","data-p-icon","minus"]],features:[v],attrs:le,decls:1,vars:0,consts:[["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(o,e){o&1&&(p(),O(0,"path",0))},encapsulation:2})}return n})();var ae=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`;var se=["icon"],he=["input"],be=(n,r)=>({checked:n,class:r});function pe(n,r){if(n&1&&C(0,"span",7),n&2){let t=h(3);l(t.cx("icon")),a("ngClass",t.checkboxIcon),s("data-pc-section","icon")}}function ue(n,r){if(n&1&&(p(),C(0,"svg",8)),n&2){let t=h(3);l(t.cx("icon")),s("data-pc-section","icon")}}function ke(n,r){if(n&1&&(M(0),k(1,pe,1,4,"span",5)(2,ue,1,3,"svg",6),T()),n&2){let t=h(2);d(),a("ngIf",t.checkboxIcon),d(),a("ngIf",!t.checkboxIcon)}}function xe(n,r){if(n&1&&(p(),C(0,"svg",9)),n&2){let t=h(2);l(t.cx("icon")),s("data-pc-section","icon")}}function fe(n,r){if(n&1&&(M(0),k(1,ke,3,2,"ng-container",2)(2,xe,1,3,"svg",4),T()),n&2){let t=h();d(),a("ngIf",t.checked),d(),a("ngIf",t._indeterminate())}}function me(n,r){}function ge(n,r){n&1&&k(0,me,0,0,"ng-template")}var _e=`
    ${ae}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`,ve={root:({instance:n})=>["p-checkbox p-component",{"p-checkbox-checked p-highlight":n.checked,"p-disabled":n.$disabled(),"p-invalid":n.invalid(),"p-variant-filled":n.$variant()==="filled","p-checkbox-sm p-inputfield-sm":n.size()==="small","p-checkbox-lg p-inputfield-lg":n.size()==="large"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},re=(()=>{class n extends ne{name="checkbox";theme=_e;classes=ve;static \u0275fac=(()=>{let t;return function(e){return(t||(t=u(n)))(e||n)}})();static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var Ce={provide:X,useExisting:S(()=>ye),multi:!0},ye=(()=>{class n extends ce{value;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;inputStyle;styleClass;inputClass;indeterminate=!1;formControl;checkboxIcon;readonly;autofocus;trueValue=!0;falseValue=!1;variant=B();size=B();onChange=new g;onFocus=new g;onBlur=new g;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.modelValue()===this.trueValue:W(this.value,this.modelValue())}_indeterminate=D(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;focused=!1;_componentStyle=E(re);$variant=R(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"icon":this._checkboxIconTemplate=t.template;break;case"checkboxicon":this._checkboxIconTemplate=t.template;break}})}ngOnChanges(t){super.ngOnChanges(t),t.indeterminate&&this._indeterminate.set(t.indeterminate.currentValue)}updateModel(t){let o,e=this.injector.get(Z,null,{optional:!0,self:!0}),c=e&&!this.formControl?e.value:this.modelValue();this.binary?(o=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.writeModelValue(o),this.onModelChange(o)):(this.checked||this._indeterminate()?o=c.filter(i=>!J(i,this.value)):o=c?[...c,this.value]:[this.value],this.onModelChange(o),this.writeModelValue(o),this.formControl&&this.formControl.setValue(o)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:o,originalEvent:t})}handleChange(t){this.readonly||this.updateModel(t)}onInputFocus(t){this.focused=!0,this.onFocus.emit(t)}onInputBlur(t){this.focused=!1,this.onBlur.emit(t),this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeControlValue(t,o){o(t),this.cd.markForCheck()}static \u0275fac=(()=>{let t;return function(e){return(t||(t=u(n)))(e||n)}})();static \u0275cmp=_({type:n,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(o,e,c){if(o&1&&(F(c,se,4),F(c,Y,4)),o&2){let i;y(i=I())&&(e.checkboxIconTemplate=i.first),y(i=I())&&(e.templates=i)}},viewQuery:function(o,e){if(o&1&&j(he,5),o&2){let c;y(c=I())&&(e.inputViewChild=c.first)}},hostVars:6,hostBindings:function(o,e){o&2&&(s("data-pc-name","checkbox")("data-p-highlight",e.checked)("data-p-checked",e.checked)("data-p-disabled",e.$disabled()),l(e.cn(e.cx("root"),e.styleClass)))},inputs:{value:"value",binary:[2,"binary","binary",x],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",G],inputId:"inputId",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",x],formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",x],autofocus:[2,"autofocus","autofocus",x],trueValue:"trueValue",falseValue:"falseValue",variant:[1,"variant"],size:[1,"size"]},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[$([Ce,re]),v,N],decls:5,vars:22,consts:[["input",""],["type","checkbox",3,"focus","blur","change","checked"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","minus",3,"class",4,"ngIf"],[3,"class","ngClass",4,"ngIf"],["data-p-icon","check",3,"class",4,"ngIf"],[3,"ngClass"],["data-p-icon","check"],["data-p-icon","minus"]],template:function(o,e){if(o&1){let c=L();w(0,"input",1,0),Q("focus",function(b){return f(c),m(e.onInputFocus(b))})("blur",function(b){return f(c),m(e.onInputBlur(b))})("change",function(b){return f(c),m(e.handleChange(b))}),V(),w(2,"div"),k(3,fe,3,2,"ng-container",2)(4,ge,1,0,null,3),V()}o&2&&(A(e.inputStyle),l(e.cn(e.cx("input"),e.inputClass)),a("checked",e.checked),s("id",e.inputId)("value",e.value)("name",e.name())("tabindex",e.tabindex)("required",e.required()?"":void 0)("readonly",e.readonly?"":void 0)("disabled",e.$disabled()?"":void 0)("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel),d(2),l(e.cx("box")),d(),a("ngIf",!e.checkboxIconTemplate&&!e._checkboxIconTemplate),d(),a("ngTemplateOutlet",e.checkboxIconTemplate||e._checkboxIconTemplate)("ngTemplateOutletContext",q(19,be,e.checked,e.cx("icon"))))},dependencies:[K,H,P,U,ee,oe,ie],encapsulation:2,changeDetection:0})}return n})();export{ye as a};
