var odinjs;(()=>{"use strict";var t={886:(t,e)=>{function r(t,e){return new Error("Invalid control parameter: '".concat(t,"' ").concat(e))}function i(t,e){return void 0===t?e:t}Object.defineProperty(e,"__esModule",{value:!0}),e.dopriControl=void 0,e.dopriControl=function(t){void 0===t&&(t={});var e=1e-6,n=1e4,o=1e-6,s=1/0,a=1e-8,u=!1,h=0,l=1/0,f={atol:i(t.atol,e),maxSteps:i(t.maxSteps,n),rtol:i(t.rtol,o),stepSizeMax:i(t.stepSizeMax,s),stepSizeMin:i(t.stepSizeMin,a),stepSizeMinAllow:i(t.stepSizeMinAllow,u),stiffCheck:i(t.stiffCheck,h),tcrit:i(t.tcrit,l)};if(f.maxSteps<1)throw r("maxSteps","must be at least 1");if(f.atol<=0)throw r("atol","must be strictly positive");if(f.rtol<=0)throw r("rtol","must be strictly positive");return f}},742:function(t,e,r){var i,n=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.DDE=e.integrateDDE=void 0;var o=r(223),s=r(660);e.integrateDDE=function(t,e,r,i,n,o){void 0===n&&(n={}),void 0===o&&(o=null);var s=new a(t,e.length,n,o);return s.initialise(r,e),s.run(i)};var a=function(t){function e(e,r,i,n){void 0===i&&(i={}),void 0===n&&(n=null);var o=this,s=function(t){return o._interpolate(t)},a=null===n?null:function(t,e){return n(t,e,s)};return(o=t.call(this,(function(t,r,i){return e(t,r,i,s)}),r,i,a)||this)._y0=new Array(r),o}return n(e,t),e.prototype.initialise=function(e,r){return this._y0=r,t.prototype.initialise.call(this,e,r),this},e.prototype._interpolate=function(t){var e=this._findHistory(t);return e<0?this._y0.slice(0):this._stepper.interpolate(t,this._history[e])},e.prototype._findHistory=function(t){return(0,s.search)(this._history,(function(e){return e.t>t}))},e}(o.Dopri);e.DDE=a},223:function(t,e,r){var i=this&&this.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&i(e,t,r);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Dopri=e.integrateDopri=void 0;var s=r(886),a=o(r(922)),u=r(216),h=o(r(660)),l=Math.pow(2,-52);function f(t,e){return new Error("Integration failure: ".concat(t," at ").concat(e))}e.integrateDopri=function(t,e,r,i,n,o){void 0===n&&(n={}),void 0===o&&(o=null);var s=new c(t,e.length,n,o);return s.initialise(r,e),s.run(i)};var c=function(){function t(t,e,r,i){void 0===r&&(r={}),void 0===i&&(i=null),this._history=[],this._t=0,this._h=0,this._nSteps=0,this._nStepsAccepted=0,this._nStepsRejected=0,this._stiffNStiff=0,this._stiffNNonstiff=0,this._lastError=0,this._stepper=new a.Dopri5(t,e),this._control=(0,s.dopriControl)(r),this._output=i}return t.prototype.initialise=function(t,e){var r=this._stepper.n;if(e.length!==r)throw Error("Invalid size 'y' - expected a length ".concat(r," array"));return this._stepper.reset(t,e),this._reset(),this._h=function(t,e,r,i,n,o){var s=new Array(t.n),a=new Array(t.n),u=new Array(t.n);t.rhs(e,r,s),t.nEval++;var l=0,f=0,c=0;for(c=0;c<t.n;++c){var p=i+n*Math.abs(r[c]);l+=h.square(s[c]/p),f+=h.square(r[c]/p)}var d=l<=1e-10||f<=1e-10?1e-6:.01*Math.sqrt(f/l);for(d=Math.min(d,o),c=0;c<t.n;++c)u[c]=r[c]+d*s[c];t.rhs(e+d,u,a),t.nEval++;var _=0;for(c=0;c<t.n;++c)p=i+n*Math.abs(r[c]),_+=h.square((a[c]-s[c])/p);_=Math.sqrt(_)/d;var v=Math.max(Math.abs(_),Math.sqrt(l)),y=v<=1e-15?Math.max(1e-6,.001*Math.abs(d)):Math.pow(.01/v,1/t.order);return Math.min(Math.min(100*Math.abs(d),y),o)}(this._stepper,t,e,this._control.atol,this._control.rtol,this._control.stepSizeMax),this._t=t,this._history=[],this},t.prototype.run=function(t){for(;this._t<t;)this._step(),this._history.push(this._stepper.history.clone());return(0,u.interpolator)(this._history.slice(0),this._stepper,this._output)},t.prototype.statistics=function(){return{lastError:this._lastError,nEval:this._stepper.nEval,nSteps:this._nSteps,nStepsAccepted:this._nStepsAccepted,nStepsRejected:this._nStepsRejected,stiffNNonstiff:this._stiffNNonstiff,stiffNStiff:this._stiffNStiff}},t.prototype._reset=function(){this._nSteps=0,this._nStepsAccepted=0,this._nStepsRejected=0,this._stiffNStiff=0,this._stiffNNonstiff=0,this._lastError=0},t.prototype._step=function(){for(var t=this._t,e=this._h,r=!1,i=!1,n=Math.max(this._lastError,1e-4),o=this._stepper.stepControl,s=this._control;!r;){if(this._nSteps>s.maxSteps)throw f("too many steps",t);if(e<s.stepSizeMin){if(!s.stepSizeMinAllow)throw f("step too small",t);e=s.stepSizeMin}if(e<=Math.abs(t)*l)throw f("step size vanished",t);t+e>s.tcrit&&(e=s.tcrit-t),this._stepper.step(t,e),this._nSteps++;var a=this._stepper.error(s.atol,s.rtol),u=Math.pow(a,o.constant),c=1/o.factorMin,p=1/o.factorMax;if(a<=1){if(r=!0,this._nStepsAccepted++,this._isStiff(e))throw f("problem became stiff",t);this._stepper.stepComplete(t,e);var d=u/Math.pow(n,o.beta),_=e/(d=h.constrain(d/o.factorSafe,p,c));this._t+=e,this._h=i?Math.min(_,e):Math.min(_,s.stepSizeMax),this._lastError=a}else i=!0,this._nStepsAccepted>=1&&this._nStepsRejected++,e/=Math.min(c,u/o.factorSafe)}return this._t},t.prototype._isStiff=function(t){if(this._stiffNStiff>0||this._nStepsAccepted%this._control.stiffCheck==0)if(this._stepper.isStiff(t)){if(this._stiffNNonstiff=0,this._stiffNStiff++>=15)return!0}else this._stiffNStiff>0&&this._stiffNNonstiff++>=6&&(this._stiffNStiff=0,this._stiffNNonstiff=0);return!1},t}();e.Dopri=c},134:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Dopri5StepControl=void 0;e.Dopri5StepControl=function(){this.factorSafe=.9,this.factorMin=.2,this.factorMax=10,this.beta=.04,this.constant=.2-.75*this.beta}},922:function(t,e,r){var i=this&&this.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&i(e,t,r);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Dopri5=void 0;var s=o(r(660)),a=o(r(134)),u=r(430),h=function(){function t(t,e){this.order=5,this.stepControl=new a.Dopri5StepControl,this.nEval=0,this.rhs=t,this.n=e,this.y=new Array(e),this.yNext=new Array(e),this.yStiff=new Array(e),this.k1=new Array(e),this.k2=new Array(e),this.k3=new Array(e),this.k4=new Array(e),this.k5=new Array(e),this.k6=new Array(e),this.history=new u.HistoryElement(this.order*e)}return t.prototype.step=function(t,e){var r=this.n,i=this.y,n=this.yNext,o=this.k1,s=this.k2,a=this.k3,u=this.k4,h=this.k5,l=this.k6,f=this.history.data,c=0;for(c=0;c<r;++c)n[c]=i[c]+.2*e*o[c];for(this.rhs(t+.2*e,n,s),c=0;c<r;++c)n[c]=i[c]+e*(.075*o[c]+.225*s[c]);for(this.rhs(t+.3*e,n,a),c=0;c<r;++c)n[c]=i[c]+e*(.9777777777777777*o[c]+-3.7333333333333334*s[c]+3.5555555555555554*a[c]);for(this.rhs(t+.8*e,n,u),c=0;c<r;++c)n[c]=i[c]+e*(2.9525986892242035*o[c]+-11.595793324188385*s[c]+9.822892851699436*a[c]+-.2908093278463649*u[c]);for(this.rhs(t+.8888888888888888*e,n,h),c=0;c<r;++c)this.yStiff[c]=i[c]+e*(2.8462752525252526*o[c]+-10.757575757575758*s[c]+8.906422717743473*a[c]+.2784090909090909*u[c]+-.2735313036020583*h[c]);var p=t+e;for(this.rhs(p,this.yStiff,l),c=0;c<r;++c)n[c]=i[c]+e*(.09114583333333333*o[c]+.44923629829290207*a[c]+.6510416666666666*u[c]+-.322376179245283*h[c]+.13095238095238096*l[c]);this.rhs(p,n,s);var d=4*r;for(c=0;c<r;++c)f[d++]=e*(-1.1270175653862835*o[c]+2.675424484351598*a[c]+-5.685526961588504*u[c]+3.5219323679207912*h[c]+-1.7672812570757455*l[c]+2.382468931778144*s[c]);for(c=0;c<r;++c)u[c]=e*(.0012326388888888888*o[c]+-.0042527702905061394*a[c]+.03697916666666667*u[c]+-.05086379716981132*h[c]+.0419047619047619*l[c]+-.025*s[c]);this.nEval+=6},t.prototype.stepComplete=function(t,e){this.saveHistory(t,e),s.copyArray(this.k1,this.k2),s.copyArray(this.y,this.yNext)},t.prototype.error=function(t,e){var r=0,i=0;for(i=0;i<this.n;++i){var n=t+e*Math.max(Math.abs(this.y[i]),Math.abs(this.yNext[i]));r+=s.square(this.k4[i]/n)}return Math.sqrt(r/this.n)},t.prototype.interpolate=function(t,e){for(var r=e.data,i=(t-e.t)/e.h,n=1-i,o=this.n,s=new Array(o),a=0;a<o;++a)s[a]=r[a]+i*(r[o+a]+n*(r[2*o+a]+i*(r[3*o+a]+n*r[4*o+a])));return s},t.prototype.isStiff=function(t){for(var e=0,r=0,i=0;i<this.n;++i)e+=s.square(this.k2[i]-this.k6[i]),r+=s.square(this.yNext[i]-this.yStiff[i]);return r>0&&Math.abs(t)*Math.sqrt(e/r)>3.25},t.prototype.reset=function(t,e){for(var r=0;r<this.n;++r)this.y[r]=e[r];this.rhs(t,e,this.k1),this.nEval=1},t.prototype.saveHistory=function(t,e){for(var r=this.history,i=this.n,n=0;n<i;++n){var o=this.yNext[n]-this.y[n],s=e*this.k1[n]-o;r.data[n]=this.y[n],r.data[i+n]=o,r.data[2*i+n]=s,r.data[3*i+n]=-e*this.k2[n]+o-s}r.t=t,r.h=e},t}();e.Dopri5=h},606:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HistoryElement=void 0;var r=function(){function t(t){this.t=0,this.h=0,this.data=new Array(t)}return t.prototype.clone=function(){var e=new t(this.data.length);return e.t=this.t,e.h=this.h,e.data=this.data.slice(0),e},t}();e.HistoryElement=r},245:(t,e,r)=>{e.BJ=e.sN=void 0;var i=r(223);Object.defineProperty(e,"sN",{enumerable:!0,get:function(){return i.Dopri}});var n=r(742);Object.defineProperty(e,"BJ",{enumerable:!0,get:function(){return n.DDE}});r(961)},961:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.integrate=void 0;var i=r(742),n=r(223);e.integrate=function(t,e,r,o,s,a){if(void 0===s&&(s={}),void 0===a&&(a=null),function(t){return 3===t.length}(t)){if(!function(t){return null===t||2===t.length}(a))throw new Error("Can't used delayed output with non-delayed rhs");return(0,n.integrateDopri)(t,e,r,o,s,a)}if(!function(t){return null===t||3===t.length}(a))throw new Error("Can't used non-delayed output with delayed rhs");return(0,i.integrateDDE)(t,e,r,o,s,a)}},216:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.interpolator=void 0,e.interpolator=function(t,e,r){return function(i){return function(t,e,r,i){for(var n=[],o=e,s=0,a=0,u=t;a<u.length;a++){for(var h=u[a];o[s].t+o[s].h<h;)s++;var l=r.interpolate(h,o[s]);null!==i&&(l=l.concat(i(h,l))),n.push(l)}return n}(i,t,e,r)}}},430:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HistoryElement=void 0;var i=r(606);Object.defineProperty(e,"HistoryElement",{enumerable:!0,get:function(){return i.HistoryElement}})},660:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.search=e.seqLen=e.approxEqualArray=e.approxEqual=e.zeros=e.copyArray=e.constrain=e.square=void 0;var r=Math.pow(2,-26);e.square=function(t){return t*t},e.constrain=function(t,e,r){return Math.max(Math.min(t,r),e)},e.copyArray=function(t,e){for(var r=t.length,i=0;i<r;i++)t[i]=e[i]},e.zeros=function(t){for(var e=Array(t),r=0;r<t;++r)e[r]=0;return e},e.approxEqual=function(t,e,i){void 0===i&&(i=r);var n=Math.abs(t-e),o=Math.abs(t);return o>i&&(n/=o),n<i},e.approxEqualArray=function(t,e,i){if(void 0===i&&(i=r),e.length!==t.length)throw Error("Incompatible arrays");for(var n=0,o=0,s=0,a=0;a<t.length;++a)t[a]!==e[a]&&(n+=Math.abs(t[a]),o+=Math.abs(t[a]-e[a]),s++);return 0===s||(o/=s,(n/=s)>i&&(o/=n),o<i)},e.seqLen=function(t,e,r){for(var i=[],n=0;n<r;++n){var o=n/(r-1);i.push((1-o)*t+o*e)}return i},e.search=function(t,e){var r=0,i=t.length-1;if(0===t.length||e(t[r]))return-1;if(!e(t[i]))return i;for(;i-r>1;){var n=Math.floor((r+i)/2);e(t[n])?i=n:r=n}return r}}},e={};function r(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};(()=>{function t(t,e){return void 0===t?e:t}function e(t,e,r){for(var i=e.length,n=new Array(i),o=1+t,s=-t,a=0;a<n.length;++a)n[a]=o*e[a]+s*r[a];return n}r.r(i),r.d(i,{PkgWrapper:()=>w,base:()=>f,wodinFit:()=>g,wodinRun:()=>m});var n=function(){function r(e,r,i){void 0===i&&(i={}),this.rho=1,this.chi=2,this.psi=-.5,this.sigma=.5,this._iterations=0,this._id=0,this._converged=!1,this._target=e,this._control=function(e){void 0===e&&(e={});var r={deltaNonZero:t(e.deltaNonZero,.05),deltaZero:t(e.deltaZero,.001),errorOnFailure:t(e.errorOnFailure,!1),tolerance:t(e.tolerance,1e-5)};if(r.tolerance<=0)throw new Error("Invalid control parameter: 'tolerance' must be strictly positive");return r}(i),this._n=r.length,this._simplex=[],this._simplex.push(this._point(r.slice())),i.errorOnFailure||(this._target=function(t){return function(e){try{return t(e)}catch(t){return-1/0}}}(e));for(var n=0;n<this._n;++n){var o=r.slice();o[n]?o[n]*=1+this._control.deltaNonZero:o[n]=this._control.deltaZero,this._simplex.push(this._point(o))}this._sort()}return r.prototype.step=function(){if(this._iterations++,this._isConverged())return this._converged=!0,!0;var t=this._n,e=this._simplex[0],r=this._simplex[t],i=this._centroid(),n=this._reflect(r,i);if(n.value<e.value){var o=this._expand(r,i);this._update(o.value<n.value?o:n)}else if(n.value>=this._simplex[t-1].value){var s=n.value>r.value?this._contractInside(r,i):this._contractOutside(r,i);if(s.value<r.value)this._update(s);else{for(var a=1;a<=t;++a)this._simplex[a]=this._shrink(this._simplex[a],e.location);this._sort()}}else this._update(n);return!1},r.prototype.run=function(t){if(!this._converged)for(var e=0;e<t&&!this.step();++e);return this.result()},r.prototype.result=function(){var t=this._simplex[0];return{converged:this._converged,data:t.data,evaluations:this._id,iterations:this._iterations,location:t.location,value:t.value}},r.prototype.simplex=function(){return this._simplex.map((function(t){return{location:t.location,value:t.value}}))},r.prototype._point=function(t){var e,r="number"==typeof(e=this._target(t))?{data:null,value:e}:e;return{data:r.data,id:this._id++,location:t,value:r.value}},r.prototype._sort=function(){this._simplex.sort((function(t,e){return t.value-e.value}))},r.prototype._centroid=function(){for(var t=this._n,e=new Array(t),r=0;r<t;++r){e[r]=0;for(var i=0;i<t;++i)e[r]+=this._simplex[i].location[r];e[r]/=t}return e},r.prototype._update=function(t){this._simplex[this._n]=t,this._sort()},r.prototype._reflect=function(t,r){return this._point(e(this.rho,r,t.location))},r.prototype._expand=function(t,r){return this._point(e(this.chi,r,t.location))},r.prototype._contractInside=function(t,r){return this._point(e(this.psi,r,t.location))},r.prototype._contractOutside=function(t,r){return this._point(e(-this.psi*this.rho,r,t.location))},r.prototype._shrink=function(t,r){return this._point(e(-this.sigma,r,t.location))},r.prototype._isConverged=function(){for(var t=this._control.tolerance,e=this._simplex[0],r=this._simplex[this._n],i=r.value-e.value<t||1-e.value/r.value<t,n=0,o=0;o<this._n;++o)n=Math.max(n,Math.abs(e.location[o]-r.location[o]));return n<t&&i},r}();function o(t){return.5===s(t,1)?2*Math.round(t/2):Math.round(t)}function s(t,e){let r=t%e;return r*e<0&&(r+=e),r}function a(t,e){return Array.isArray(t)?t={data:t,dim:[t.length]}:"number"==typeof t&&(t={data:[t],dim:[1]}),t}function u(t,e,r){if(e.dim.length!==t)throw 1===t?Error(`Expected a numeric vector for '${r}'`):2===t?Error(`Expected a numeric matrix for '${r}'`):Error(`Expected a numeric array of rank ${t} for '${r}'`)}function h(t,e,r,i,n){for(const o of t.data){if(null===o)throw Error(`'${n}' must not contain any NA values`);l(o,e,r,i,n)}}function l(t,e,r,i,n){if("number"!=typeof t)throw Error(`Expected a number for '${n}'`);if(t<e)throw Error(`Expected '${n}' to be at least ${e}`);if(t>r)throw Error(`Expected '${n}' to be at most ${r}`);if(i&&!Number.isInteger(t))throw Error(`Expected '${n}' to be integer-like`)}const f={delay:function(t,e,r,i){const n=t(e);for(let t=0;t<r.length;++t)i[t]=n[r[t]]},maths:{intdivr:function(t,e){return Math.floor(t/e)},modr:s,odinSum1:function(t,e,r){let i=0;for(let n=e;n<r;++n)i+=t[n];return i},odinSum2:function(t,e,r,i,n,o){let s=0;for(let a=i;a<n;++a){const i=a*o;for(let n=e;n<r;++n)s+=t[n+i]}return s},odinSum3:function(t,e,r,i,n,o,s,a,u){let h=0;for(let l=o;l<s;++l){const o=l*u;for(let s=i;s<n;++s){const i=s*a+o;for(let n=e;n<r;++n)h+=t[n+i]}}return h},round2:function(t,e){if(void 0===e||0===e)return o(t);{const r=Math.pow(10,e);return o(t*r)/r}}},user:{checkUser:function(t,e,r){if("ignore"===r)return;const i=[];for(const r of t.keys())e.includes(r)||i.push(r);if(i.length>0){const t="Unknown user parameters: "+i.join(", ");if("message"===r)console.log(t);else{if("warning"!==r)throw"stop"===r?Error(t):Error(t+" (and invalid value for unusedUserAction)");console.warn(t)}}},setUserArrayFixed:function(t,e,r,i,n,o,s){let l=t.get(e);if(void 0===l){if(void 0!==r[e])return;throw Error(`Expected a value for '${e}'`)}{const t=i.length-1;l=a(l),u(t,l,e),function(t,e,r){const i=t.length-1;for(let n=0;n<i;++n){const o=t[n+1];if(e.dim[n]!==o)throw 1===i?Error(`Expected length ${o} value for '${r}'`):Error(`Incorrect size of dimension ${n+1} of '${r}' (expected ${o})`)}}(i,l,e),h(l,n,o,s,e),r[e]=l.data.slice()}},setUserArrayVariable:function(t,e,r,i,n,o,s){let l=t.get(e);if(void 0===l){if(void 0!==r[e])return;throw Error("Expected a value for '"+e+"'")}{const t=i.length-1;l=a(l),u(t,l,e),h(l,n,o,s,e),i[0]=l.data.length;for(let e=0;e<t;++e)i[e+1]=l.dim[e];r[e]=l.data.slice()}},setUserScalar:function(t,e,r,i,n,o,s){const a=t.get(e);if(void 0===a){if(void 0!==r[e])return;if(null===i)throw Error(`Expected a value for '${e}'`);r[e]=i}else{if("number"!=typeof a)throw Error(`Expected a number for '${e}'`);l(a,n,o,s,e),r[e]=a}}}};var c=r(245);function p(t,e,r,i,n){return function(t){return 4===t.rhs.length}(t)?function(t,e,r,i,n){let o=null;"function"==typeof t.output&&(o=(e,r,i)=>t.output(e,r,i)),null===e&&(e=t.initial(r)),t.getInternal().initial_t=r;const s=new c.BJ((function(e,r,i,n){t.rhs(e,r,i,n)}),e.length,n,o);return s.initialise(r,e),{solution:s.run(i),statistics:s.statistics()}}(t,e,r,i,n):function(t,e,r,i,n){let o=null;"function"==typeof t.output&&(o=(e,r)=>t.output(e,r)),null===e&&(e=t.initial(r));const s=new c.sN((function(e,r,i){t.rhs(e,r,i)}),e.length,n,o);return s.initialise(r,e),{solution:s.run(i),statistics:s.statistics()}}(t,e,r,i,n)}function d(t,e,r,i){return(n,o,s)=>{const a=v(Math.max(r,n),Math.min(i,o),s),u=t(a);return u[0].map(((t,r)=>({name:e[r],x:a,y:u.map((t=>t[r]))})))}}function _(t,e,r,i,n){return(o,s,a)=>{const u=v(Math.max(i,o),Math.min(n,s),a),h=t(u).map((t=>t[r]));return{name:e,x:u,y:h}}}function v(t,e,r){const i=(e-t)/(r-1),n=[];for(let e=0;e<r-1;++e)n.push(t+e*i);return n.push(e),n}function y(t,e){let r=0;for(let i=0;i<t.length;++i)r+=Math.pow(t[i]-e[i],2);return r}function m(t,e,r,i,n){const o=new t(f,e,"error");return d(p(o,null,r,i,n).solution,o.names(),r,i)}function g(t,e,r,i,o,s){const a=function(t,e,r,i,n){const o=e.time[0],s=e.time[e.time.length-1];return a=>{const u=function(t,e){const r=new Map(t.base);for(let i=0;i<t.vary.length;++i)r.set(t.vary[i],e[i]);return r}(r,a),h=new t(f,u,"error"),l=p(h,null,o,s,n).solution,c=h.names(),v=c.indexOf(i),m=l(e.time).map((t=>t[v]));return{data:{names:c,pars:u,solutionAll:d(l,c,o,s),solutionFit:_(l,i,v,o,s)},value:y(e.value,m)}}}(t,e,r,i,o),u=r.vary.map((t=>r.base.get(t)));return new n(a,u,s)}class w{constructor(t,e,r){this.model=new t(f,e,r)}initial(t){return this.model.initial(t)}rhs(t,e){const r=new Array(e.length).fill(0);let i=null;if(3!==this.model.rhs.length)throw Error("Can't use rhs() with delay models");return this.model,this.model.rhs(t,e,r),this.model.output&&(i=this.model.output(t,e)),{output:i,state:r}}getMetadata(){return this.model.getMetadata()}getInternal(){return this.model.getInternal()}setUser(t,e){this.model.setUser(t,e)}run(t,e,r){const i=t[0],n=t[t.length-1],o=p(this.model,e,i,n,r);return{names:this.model.names(),statistics:o.statistics,y:o.solution(t)}}}})(),odinjs=i})();