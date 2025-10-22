import{$ as y,J as M,Y as D,fa as f}from"./chunk-ZGVWO2O4.js";import{e as x}from"./chunk-RAZRMRQX.js";import{$ as m,Bc as h,Rc as l,Uc as n,bc as v,bd as o,ea as s,qc as b,sb as a,ua as p,ub as u,za as d}from"./chunk-45NCVV7C.js";var c=(()=>{class e extends y{modelValue=p(void 0);$filled=l(()=>M(this.modelValue()));writeModelValue(t){this.modelValue.set(t)}static \u0275fac=(()=>{let t;return function(i){return(t||(t=d(e)))(i||e)}})();static \u0275dir=a({type:e,features:[u]})}return e})();var F=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`;var w=`
    ${F}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,z={root:({instance:e})=>["p-inputtext p-component",{"p-filled":e.$filled(),"p-inputtext-sm":e.pSize==="small","p-inputtext-lg":e.pSize==="large","p-invalid":e.invalid(),"p-variant-filled":e.$variant()==="filled","p-inputtext-fluid":e.hasFluid}]},N=(()=>{class e extends D{name="inputtext";theme=w;classes=z;static \u0275fac=(()=>{let t;return function(i){return(t||(t=d(e)))(i||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var U=(()=>{class e extends c{ngControl=s(x,{optional:!0,self:!0});pcFluid=s(f,{optional:!0,host:!0,skipSelf:!0});pSize;variant=n();fluid=n(void 0,{transform:o});invalid=n(void 0,{transform:o});$variant=l(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());_componentStyle=s(N);ngAfterViewInit(){super.ngAfterViewInit(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value),this.cd.detectChanges()}ngDoCheck(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let t;return function(i){return(t||(t=d(e)))(i||e)}})();static \u0275dir=a({type:e,selectors:[["","pInputText",""]],hostVars:2,hostBindings:function(r,i){r&1&&v("input",function(k){return i.onInput(k)}),r&2&&b(i.cx("root"))},inputs:{pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},features:[h([N]),u]})}return e})();var I=(()=>{class e extends c{required=n(void 0,{transform:o});invalid=n(void 0,{transform:o});disabled=n(void 0,{transform:o});name=n();_disabled=p(!1);$disabled=l(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(t){this._disabled.set(t)}writeControlValue(t,r){}writeValue(t){this.writeControlValue(t,this.writeModelValue.bind(this))}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.writeDisabledState(t),this.cd.markForCheck()}static \u0275fac=(()=>{let t;return function(i){return(t||(t=d(e)))(i||e)}})();static \u0275dir=a({type:e,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[u]})}return e})();var oe=(()=>{class e extends I{pcFluid=s(f,{optional:!0,host:!0,skipSelf:!0});fluid=n(void 0,{transform:o});variant=n();size=n();inputSize=n();pattern=n();min=n();max=n();step=n();minlength=n();maxlength=n();$variant=l(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let t;return function(i){return(t||(t=d(e)))(i||e)}})();static \u0275dir=a({type:e,inputs:{fluid:[1,"fluid"],variant:[1,"variant"],size:[1,"size"],inputSize:[1,"inputSize"],pattern:[1,"pattern"],min:[1,"min"],max:[1,"max"],step:[1,"step"],minlength:[1,"minlength"],maxlength:[1,"maxlength"]},features:[u]})}return e})();export{I as a,oe as b,U as c};
