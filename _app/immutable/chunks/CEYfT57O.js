import{a8 as E,a1 as m,a9 as V,z as N,V as C,aa as W,W as B,C as H,ab as k,ac as P,ad as Y,ae as q,af as T,K as w,J as R,F as z,O as v,ag as $,ah as F,ai as G,aj as J,ak as K,al as U,am as x,M as Q,p as X,E as S,j as Z,c as ee}from"./u-GFdbaZ.js";import{b as te}from"./DsWamL37.js";function de(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const re=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function fe(e){return re.includes(e)}const ae={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function _e(e){return e=e.toLowerCase(),ae[e]??e}const ne=["touchstart","touchmove"];function oe(e){return ne.includes(e)}function ie(e){var t=V,a=N;E(null),m(null);try{return e()}finally{E(t),m(a)}}const D=new Set,L=new Set;function se(e,t,a,s){function o(r){if(s.capture||y.call(t,r),!r.cancelBubble)return ie(()=>a.call(this,r))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?W(()=>{t.addEventListener(e,o,s)}):t.addEventListener(e,o,s),o}function pe(e,t,a,s,o){var r={capture:s,passive:o},u=se(e,t,a,r);(t===document.body||t===window||t===document)&&C(()=>{t.removeEventListener(e,u,r)})}function he(e){for(var t=0;t<e.length;t++)D.add(e[t]);for(var a of L)a(e)}function y(e){var O;var t=this,a=t.ownerDocument,s=e.type,o=((O=e.composedPath)==null?void 0:O.call(e))||[],r=o[0]||e.target,u=0,_=e.__root;if(_){var d=o.indexOf(_);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var p=o.indexOf(t);if(p===-1)return;d<=p&&(u=d)}if(r=o[u]||e.target,r!==t){B(e,"currentTarget",{configurable:!0,get(){return r||a}});var b=V,c=N;E(null),m(null);try{for(var n,i=[];r!==null;){var l=r.assignedSlot||r.parentNode||r.host||null;try{var f=r["__"+s];if(f!==void 0&&!r.disabled)if(H(f)){var[M,...j]=f;M.apply(r,[e,...j])}else f.call(r,e)}catch(g){n?i.push(g):n=g}if(e.cancelBubble||l===t||l===null)break;r=l}if(n){for(let g of i)queueMicrotask(()=>{throw g});throw n}}finally{e.__root=t,delete e.currentTarget,E(b),m(c)}}}function ve(e,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=a,e.nodeValue=a==null?"":a+"")}function ue(e,t){return I(e,t)}function ye(e,t){k(),t.intro=t.intro??!1;const a=t.target,s=S,o=v;try{for(var r=P(a);r&&(r.nodeType!==8||r.data!==Y);)r=q(r);if(!r)throw T;w(!0),R(r),z();const u=I(e,{...t,anchor:r});if(v===null||v.nodeType!==8||v.data!==$)throw F(),T;return w(!1),u}catch(u){if(u===T)return t.recover===!1&&G(),k(),J(a),w(!1),ue(e,t);throw u}finally{w(s),R(o)}}const h=new Map;function I(e,{target:t,anchor:a,props:s={},events:o,context:r,intro:u=!0}){k();var _=new Set,d=c=>{for(var n=0;n<c.length;n++){var i=c[n];if(!_.has(i)){_.add(i);var l=oe(i);t.addEventListener(i,y,{passive:l});var f=h.get(i);f===void 0?(document.addEventListener(i,y,{passive:l}),h.set(i,1)):h.set(i,f+1)}}};d(K(D)),L.add(d);var p=void 0,b=U(()=>{var c=a??t.appendChild(x());return Q(()=>{if(r){X({});var n=ee;n.c=r}o&&(s.$$events=o),S&&te(c,null),p=e(c,s)||{},S&&(N.nodes_end=v),r&&Z()}),()=>{var l;for(var n of _){t.removeEventListener(n,y);var i=h.get(n);--i===0?(document.removeEventListener(n,y),h.delete(n)):h.set(n,i)}L.delete(d),c!==a&&((l=c.parentNode)==null||l.removeChild(c))}});return A.set(p,b),p}let A=new WeakMap;function ge(e,t){const a=A.get(e);return a?(A.delete(e),a(t)):Promise.resolve()}export{fe as a,se as c,he as d,pe as e,ye as h,de as i,ue as m,_e as n,ve as s,ge as u};
