import{$ as N,A as f,D as O,Q as A,Y as B,b as x,c as o,ga as j,j as F,v as m,y as L,z as S}from"./chunk-ZGVWO2O4.js";import{z as M}from"./chunk-GPQBVM7U.js";import{$ as h,Bc as E,Hb as D,Sb as p,Sc as b,Tb as d,Ub as c,Zb as w,_a as v,aa as u,ea as l,eb as y,ma as g,qb as C,rb as k,sb as I,ub as a,za as s}from"./chunk-45NCVV7C.js";var G=["data-p-icon","spinner"],Y=(()=>{class i extends j{pathId;ngOnInit(){super.ngOnInit(),this.pathId="url(#"+A()+")"}static \u0275fac=(()=>{let e;return function(n){return(e||(e=s(i)))(n||i)}})();static \u0275cmp=C({type:i,selectors:[["","data-p-icon","spinner"]],features:[a],attrs:G,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(t,n){t&1&&(g(),p(0,"g"),c(1,"path",0),d(),p(2,"defs")(3,"clipPath",1),c(4,"rect",2),d()()),t&2&&(D("clip-path",n.pathId),v(3),w("id",n.pathId))},encapsulation:2})}return i})();var P=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var H=`
    ${P}
    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,W={root:"p-ink"},T=(()=>{class i extends B{name="ripple";theme=H;classes=W;static \u0275fac=(()=>{let e;return function(n){return(e||(e=s(i)))(n||i)}})();static \u0275prov=h({token:i,factory:i.\u0275fac})}return i})();var re=(()=>{class i extends N{zone=l(y);_componentStyle=l(T);animationListener;mouseDownListener;timeout;constructor(){super(),b(()=>{M(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}ngAfterViewInit(){super.ngAfterViewInit()}onMouseDown(e){let t=this.getInk();if(!t||this.document.defaultView?.getComputedStyle(t,null).display==="none")return;if(o(t,"p-ink-active"),!m(t)&&!f(t)){let r=Math.max(F(this.el.nativeElement),S(this.el.nativeElement));t.style.height=r+"px",t.style.width=r+"px"}let n=L(this.el.nativeElement),V=e.pageX-n.left+this.document.body.scrollTop-f(t)/2,R=e.pageY-n.top+this.document.body.scrollLeft-m(t)/2;this.renderer.setStyle(t,"top",R+"px"),this.renderer.setStyle(t,"left",V+"px"),x(t,"p-ink-active"),this.timeout=setTimeout(()=>{let r=this.getInk();r&&o(r,"p-ink-active")},401)}getInk(){let e=this.el.nativeElement.children;for(let t=0;t<e.length;t++)if(typeof e[t].className=="string"&&e[t].className.indexOf("p-ink")!==-1)return e[t];return null}resetInk(){let e=this.getInk();e&&o(e,"p-ink-active")}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),o(e.currentTarget,"p-ink-active")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,O(e))}ngOnDestroy(){this.config&&this.config.ripple()&&this.remove(),super.ngOnDestroy()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=I({type:i,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[E([T]),a]})}return i})(),oe=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=k({type:i});static \u0275inj=u({})}return i})();export{Y as a,re as b,oe as c};
