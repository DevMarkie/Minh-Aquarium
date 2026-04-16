(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Qc=()=>{};var As={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},el=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=n[t++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=n[t++],l=n[t++],u=n[t++],d=((s&7)<<18|(a&63)<<12|(l&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const a=n[t++],l=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},zo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const a=n[s],l=s+1<n.length,u=l?n[s+1]:0,d=s+2<n.length,_=d?n[s+2]:0,T=a>>2,S=(a&3)<<4|u>>4;let E=(u&15)<<2|_>>6,R=_&63;d||(R=64,l||(E=64)),r.push(t[T],t[S],t[E],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(qo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):el(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const a=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const _=s<n.length?t[n.charAt(s)]:64;++s;const S=s<n.length?t[n.charAt(s)]:64;if(++s,a==null||u==null||_==null||S==null)throw new tl;const E=a<<2|u>>4;if(r.push(E),_!==64){const R=u<<4&240|_>>2;if(r.push(R),S!==64){const P=_<<6&192|S;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class tl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nl=function(n){const e=qo(n);return zo.encodeByteArray(e,!0)},Bn=function(n){return nl(n).replace(/\./g,"")},Wo=function(n){try{return zo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=()=>il().__FIREBASE_DEFAULTS__,sl=()=>{if(typeof process>"u"||typeof As>"u")return;const n=As.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ol=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Wo(n[1]);return e&&JSON.parse(e)},tr=()=>{try{return Qc()||rl()||sl()||ol()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Go=n=>{var e,t;return(t=(e=tr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},al=n=>{const e=Go(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ko=()=>{var n;return(n=tr())===null||n===void 0?void 0:n.config},Jo=n=>{var e;return(e=tr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Xo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,a=n.sub||n.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Bn(JSON.stringify(t)),Bn(JSON.stringify(l)),""].join(".")}const Gt={};function hl(){const n={prod:[],emulator:[]};for(const e of Object.keys(Gt))Gt[e]?n.emulator.push(e):n.prod.push(e);return n}function ul(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Cs=!1;function Yo(n,e){if(typeof window>"u"||typeof document>"u"||!sn(window.location.host)||Gt[n]===e||Gt[n]||Cs)return;Gt[n]=e;function t(E){return`__firebase__banner__${E}`}const r="__firebase__banner",a=hl().prod.length>0;function l(){const E=document.getElementById(r);E&&E.remove()}function u(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function d(E,R){E.setAttribute("width","24"),E.setAttribute("id",R),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function _(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Cs=!0,l()},E}function T(E,R){E.setAttribute("id",R),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function S(){const E=ul(r),R=t("text"),P=document.getElementById(R)||document.createElement("span"),F=t("learnmore"),L=document.getElementById(F)||document.createElement("a"),j=t("preprendIcon"),$=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const C=E.element;u(C),T(L,F);const O=_();d($,j),C.append($,P,L,O),document.body.appendChild(C)}a?(P.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",S):S()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function dl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(te())}function fl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function nr(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function pl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gl(){const n=te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ir(){try{return typeof indexedDB=="object"}catch{return!1}}function rr(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(t){e(t)}})}function Zo(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml="FirebaseError";class ge extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ml,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ht.prototype.create)}}class ht{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?yl(a,r):"Error",u=`${this.serviceName}: ${l} (${s}).`;return new ge(s,u,r)}}function yl(n,e){return n.replace(vl,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const vl=/\{\$([^}]+)}/g;function _l(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function We(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const a=n[s],l=e[s];if(ks(a)&&ks(l)){if(!We(a,l))return!1}else if(a!==l)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function ks(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function zt(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function Wt(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function wl(n,e){const t=new Il(n,e);return t.subscribe.bind(t)}class Il{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");bl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Oi),s.error===void 0&&(s.error=Oi),s.complete===void 0&&(s.complete=Oi);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Oi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=1e3,Tl=2,Sl=14400*1e3,Al=.5;function Ps(n,e=El,t=Tl){const r=e*Math.pow(t,n),s=Math.round(Al*r*(Math.random()-.5)*2);return Math.min(Sl,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}class fe{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new cl;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Pl(e))try{this.getOrInitializeService({instanceIdentifier:Qe})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=Qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qe){return this.instances.has(e)}getOptions(e=Qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[a,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(a);r===u&&l.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kl(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Qe){return this.component?this.component.multipleInstances?e:Qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kl(n){return n===Qe?void 0:n}function Pl(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Cl(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(U||(U={}));const Ol={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},xl=U.INFO,Nl={[U.DEBUG]:"log",[U.VERBOSE]:"log",[U.INFO]:"info",[U.WARN]:"warn",[U.ERROR]:"error"},Dl=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Nl[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Qn{constructor(e){this.name=e,this._logLevel=xl,this._logHandler=Dl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in U))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ol[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,U.DEBUG,...e),this._logHandler(this,U.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,U.VERBOSE,...e),this._logHandler(this,U.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,U.INFO,...e),this._logHandler(this,U.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,U.WARN,...e),this._logHandler(this,U.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,U.ERROR,...e),this._logHandler(this,U.ERROR,...e)}}const Ll=(n,e)=>e.some(t=>n instanceof t);let Rs,Os;function Ml(){return Rs||(Rs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ul(){return Os||(Os=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Qo=new WeakMap,Hi=new WeakMap,ea=new WeakMap,xi=new WeakMap,sr=new WeakMap;function Fl(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",a),n.removeEventListener("error",l)},a=()=>{t(qe(n.result)),s()},l=()=>{r(n.error),s()};n.addEventListener("success",a),n.addEventListener("error",l)});return e.then(t=>{t instanceof IDBCursor&&Qo.set(t,n)}).catch(()=>{}),sr.set(e,n),e}function jl(n){if(Hi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",l),n.removeEventListener("abort",l)},a=()=>{t(),s()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",a),n.addEventListener("error",l),n.addEventListener("abort",l)});Hi.set(n,e)}let qi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Hi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ea.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return qe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Bl(n){qi=n(qi)}function Vl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ni(this),e,...t);return ea.set(r,e.sort?e.sort():[e]),qe(r)}:Ul().includes(n)?function(...e){return n.apply(Ni(this),e),qe(Qo.get(this))}:function(...e){return qe(n.apply(Ni(this),e))}}function $l(n){return typeof n=="function"?Vl(n):(n instanceof IDBTransaction&&jl(n),Ll(n,Ml())?new Proxy(n,qi):n)}function qe(n){if(n instanceof IDBRequest)return Fl(n);if(xi.has(n))return xi.get(n);const e=$l(n);return e!==n&&(xi.set(n,e),sr.set(e,n)),e}const Ni=n=>sr.get(n);function ta(n,e,{blocked:t,upgrade:r,blocking:s,terminated:a}={}){const l=indexedDB.open(n,e),u=qe(l);return r&&l.addEventListener("upgradeneeded",d=>{r(qe(l.result),d.oldVersion,d.newVersion,qe(l.transaction),d)}),t&&l.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),u.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",_=>s(_.oldVersion,_.newVersion,_))}).catch(()=>{}),u}const Hl=["get","getKey","getAll","getAllKeys","count"],ql=["put","add","delete","clear"],Di=new Map;function xs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Di.get(e))return Di.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=ql.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Hl.includes(t)))return;const a=async function(l,...u){const d=this.transaction(l,s?"readwrite":"readonly");let _=d.store;return r&&(_=_.index(u.shift())),(await Promise.all([_[t](...u),s&&d.done]))[0]};return Di.set(e,a),a}Bl(n=>({...n,get:(e,t,r)=>xs(e,t)||n.get(e,t,r),has:(e,t)=>!!xs(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Wl(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Wl(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const zi="@firebase/app",Ns="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=new Qn("@firebase/app"),Gl="@firebase/app-compat",Kl="@firebase/analytics-compat",Jl="@firebase/analytics",Xl="@firebase/app-check-compat",Yl="@firebase/app-check",Zl="@firebase/auth",Ql="@firebase/auth-compat",eh="@firebase/database",th="@firebase/data-connect",nh="@firebase/database-compat",ih="@firebase/functions",rh="@firebase/functions-compat",sh="@firebase/installations",oh="@firebase/installations-compat",ah="@firebase/messaging",ch="@firebase/messaging-compat",lh="@firebase/performance",hh="@firebase/performance-compat",uh="@firebase/remote-config",dh="@firebase/remote-config-compat",fh="@firebase/storage",ph="@firebase/storage-compat",gh="@firebase/firestore",mh="@firebase/ai",yh="@firebase/firestore-compat",vh="firebase",_h="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi="[DEFAULT]",wh={[zi]:"fire-core",[Gl]:"fire-core-compat",[Jl]:"fire-analytics",[Kl]:"fire-analytics-compat",[Yl]:"fire-app-check",[Xl]:"fire-app-check-compat",[Zl]:"fire-auth",[Ql]:"fire-auth-compat",[eh]:"fire-rtdb",[th]:"fire-data-connect",[nh]:"fire-rtdb-compat",[ih]:"fire-fn",[rh]:"fire-fn-compat",[sh]:"fire-iid",[oh]:"fire-iid-compat",[ah]:"fire-fcm",[ch]:"fire-fcm-compat",[lh]:"fire-perf",[hh]:"fire-perf-compat",[uh]:"fire-rc",[dh]:"fire-rc-compat",[fh]:"fire-gcs",[ph]:"fire-gcs-compat",[gh]:"fire-fst",[yh]:"fire-fst-compat",[mh]:"fire-vertex","fire-js":"fire-js",[vh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new Map,Ih=new Map,Gi=new Map;function Ds(n,e){try{n.container.addComponent(e)}catch(t){xe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ee(n){const e=n.name;if(Gi.has(e))return xe.debug(`There were multiple attempts to register component ${e}.`),!1;Gi.set(e,n);for(const t of Vn.values())Ds(t,n);for(const t of Ih.values())Ds(t,n);return!0}function ut(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function oe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ze=new ht("app","Firebase",bh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=_h;function na(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Wi,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ze.create("bad-app-name",{appName:String(s)});if(t||(t=Ko()),!t)throw ze.create("no-options");const a=Vn.get(s);if(a){if(We(t,a.options)&&We(r,a.config))return a;throw ze.create("duplicate-app",{appName:s})}const l=new Rl(s);for(const d of Gi.values())l.addComponent(d);const u=new Eh(t,r,l);return Vn.set(s,u),u}function or(n=Wi){const e=Vn.get(n);if(!e&&n===Wi&&Ko())return na();if(!e)throw ze.create("no-app",{appName:n});return e}function ae(n,e,t){var r;let s=(r=wh[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const u=[`Unable to register library "${s}" with version "${e}":`];a&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xe.warn(u.join(" "));return}Ee(new fe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="firebase-heartbeat-database",Sh=1,en="firebase-heartbeat-store";let Li=null;function ia(){return Li||(Li=ta(Th,Sh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(en)}catch(t){console.warn(t)}}}}).catch(n=>{throw ze.create("idb-open",{originalErrorMessage:n.message})})),Li}async function Ah(n){try{const t=(await ia()).transaction(en),r=await t.objectStore(en).get(ra(n));return await t.done,r}catch(e){if(e instanceof ge)xe.warn(e.message);else{const t=ze.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});xe.warn(t.message)}}}async function Ls(n,e){try{const r=(await ia()).transaction(en,"readwrite");await r.objectStore(en).put(e,ra(n)),await r.done}catch(t){if(t instanceof ge)xe.warn(t.message);else{const r=ze.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});xe.warn(r.message)}}}function ra(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch=1024,kh=30;class Ph{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Oh(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Ms();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>kh){const l=xh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){xe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ms(),{heartbeatsToSend:r,unsentEntries:s}=Rh(this._heartbeatsCache.heartbeats),a=Bn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(t){return xe.warn(t),""}}}function Ms(){return new Date().toISOString().substring(0,10)}function Rh(n,e=Ch){const t=[];let r=n.slice();for(const s of n){const a=t.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),Us(t)>e){a.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Us(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Oh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ir()?rr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ah(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ls(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ls(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Us(n){return Bn(JSON.stringify({version:2,heartbeats:n})).length}function xh(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nh(n){Ee(new fe("platform-logger",e=>new zl(e),"PRIVATE")),Ee(new fe("heartbeat",e=>new Ph(e),"PRIVATE")),ae(zi,Ns,n),ae(zi,Ns,"esm2017"),ae("fire-js","")}Nh("");var Dh="firebase",Lh="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ae(Dh,Lh,"app");const sa="@firebase/installations",ar="0.6.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=1e4,aa=`w:${ar}`,ca="FIS_v2",Mh="https://firebaseinstallations.googleapis.com/v1",Uh=3600*1e3,Fh="installations",jh="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},st=new ht(Fh,jh,Bh);function la(n){return n instanceof ge&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha({projectId:n}){return`${Mh}/projects/${n}/installations`}function ua(n){return{token:n.token,requestStatus:2,expiresIn:$h(n.expiresIn),creationTime:Date.now()}}async function da(n,e){const r=(await e.json()).error;return st.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function fa({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Vh(n,{refreshToken:e}){const t=fa(n);return t.append("Authorization",Hh(e)),t}async function pa(n){const e=await n();return e.status>=500&&e.status<600?n():e}function $h(n){return Number(n.replace("s","000"))}function Hh(n){return`${ca} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qh({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=ha(n),s=fa(n),a=e.getImmediate({optional:!0});if(a){const _=await a.getHeartbeatsHeader();_&&s.append("x-firebase-client",_)}const l={fid:t,authVersion:ca,appId:n.appId,sdkVersion:aa},u={method:"POST",headers:s,body:JSON.stringify(l)},d=await pa(()=>fetch(r,u));if(d.ok){const _=await d.json();return{fid:_.fid||t,registrationStatus:2,refreshToken:_.refreshToken,authToken:ua(_.authToken)}}else throw await da("Create Installation",d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=/^[cdef][\w-]{21}$/,Ki="";function Gh(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Kh(n);return Wh.test(t)?t:Ki}catch{return Ki}}function Kh(n){return zh(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=new Map;function ya(n,e){const t=ei(n);va(t,e),Jh(t,e)}function va(n,e){const t=ma.get(n);if(t)for(const r of t)r(e)}function Jh(n,e){const t=Xh();t&&t.postMessage({key:n,fid:e}),Yh()}let tt=null;function Xh(){return!tt&&"BroadcastChannel"in self&&(tt=new BroadcastChannel("[Firebase] FID Change"),tt.onmessage=n=>{va(n.data.key,n.data.fid)}),tt}function Yh(){ma.size===0&&tt&&(tt.close(),tt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh="firebase-installations-database",Qh=1,ot="firebase-installations-store";let Mi=null;function cr(){return Mi||(Mi=ta(Zh,Qh,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(ot)}}})),Mi}async function $n(n,e){const t=ei(n),s=(await cr()).transaction(ot,"readwrite"),a=s.objectStore(ot),l=await a.get(t);return await a.put(e,t),await s.done,(!l||l.fid!==e.fid)&&ya(n,e.fid),e}async function _a(n){const e=ei(n),r=(await cr()).transaction(ot,"readwrite");await r.objectStore(ot).delete(e),await r.done}async function ti(n,e){const t=ei(n),s=(await cr()).transaction(ot,"readwrite"),a=s.objectStore(ot),l=await a.get(t),u=e(l);return u===void 0?await a.delete(t):await a.put(u,t),await s.done,u&&(!l||l.fid!==u.fid)&&ya(n,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(n){let e;const t=await ti(n.appConfig,r=>{const s=eu(r),a=tu(n,s);return e=a.registrationPromise,a.installationEntry});return t.fid===Ki?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function eu(n){const e=n||{fid:Gh(),registrationStatus:0};return wa(e)}function tu(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(st.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=nu(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:iu(n)}:{installationEntry:e}}async function nu(n,e){try{const t=await qh(n,e);return $n(n.appConfig,t)}catch(t){throw la(t)&&t.customData.serverCode===409?await _a(n.appConfig):await $n(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function iu(n){let e=await Fs(n.appConfig);for(;e.registrationStatus===1;)await ga(100),e=await Fs(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await lr(n);return r||t}return e}function Fs(n){return ti(n,e=>{if(!e)throw st.create("installation-not-found");return wa(e)})}function wa(n){return ru(n)?{fid:n.fid,registrationStatus:0}:n}function ru(n){return n.registrationStatus===1&&n.registrationTime+oa<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function su({appConfig:n,heartbeatServiceProvider:e},t){const r=ou(n,t),s=Vh(n,t),a=e.getImmediate({optional:!0});if(a){const _=await a.getHeartbeatsHeader();_&&s.append("x-firebase-client",_)}const l={installation:{sdkVersion:aa,appId:n.appId}},u={method:"POST",headers:s,body:JSON.stringify(l)},d=await pa(()=>fetch(r,u));if(d.ok){const _=await d.json();return ua(_)}else throw await da("Generate Auth Token",d)}function ou(n,{fid:e}){return`${ha(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(n,e=!1){let t;const r=await ti(n.appConfig,a=>{if(!Ia(a))throw st.create("not-registered");const l=a.authToken;if(!e&&lu(l))return a;if(l.requestStatus===1)return t=au(n,e),a;{if(!navigator.onLine)throw st.create("app-offline");const u=uu(a);return t=cu(n,u),u}});return t?await t:r.authToken}async function au(n,e){let t=await js(n.appConfig);for(;t.authToken.requestStatus===1;)await ga(100),t=await js(n.appConfig);const r=t.authToken;return r.requestStatus===0?hr(n,e):r}function js(n){return ti(n,e=>{if(!Ia(e))throw st.create("not-registered");const t=e.authToken;return du(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function cu(n,e){try{const t=await su(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await $n(n.appConfig,r),t}catch(t){if(la(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await _a(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await $n(n.appConfig,r)}throw t}}function Ia(n){return n!==void 0&&n.registrationStatus===2}function lu(n){return n.requestStatus===2&&!hu(n)}function hu(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+Uh}function uu(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function du(n){return n.requestStatus===1&&n.requestTime+oa<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fu(n){const e=n,{installationEntry:t,registrationPromise:r}=await lr(e);return r?r.catch(console.error):hr(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pu(n,e=!1){const t=n;return await gu(t),(await hr(t,e)).token}async function gu(n){const{registrationPromise:e}=await lr(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(n){if(!n||!n.options)throw Ui("App Configuration");if(!n.name)throw Ui("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Ui(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ui(n){return st.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba="installations",yu="installations-internal",vu=n=>{const e=n.getProvider("app").getImmediate(),t=mu(e),r=ut(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},_u=n=>{const e=n.getProvider("app").getImmediate(),t=ut(e,ba).getImmediate();return{getId:()=>fu(t),getToken:s=>pu(t,s)}};function wu(){Ee(new fe(ba,vu,"PUBLIC")),Ee(new fe(yu,_u,"PRIVATE"))}wu();ae(sa,ar);ae(sa,ar,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn="analytics",Iu="firebase_id",bu="origin",Eu=60*1e3,Tu="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ur="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne=new Qn("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ie=new ht("analytics","Analytics",Su);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(n){if(!n.startsWith(ur)){const e=ie.create("invalid-gtag-resource",{gtagURL:n});return ne.warn(e.message),""}return n}function Ea(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Cu(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function ku(n,e){const t=Cu("firebase-js-sdk-policy",{createScriptURL:Au}),r=document.createElement("script"),s=`${ur}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Pu(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Ru(n,e,t,r,s,a){const l=r[s];try{if(l)await e[l];else{const d=(await Ea(t)).find(_=>_.measurementId===s);d&&await e[d.appId]}}catch(u){ne.error(u)}n("config",s,a)}async function Ou(n,e,t,r,s){try{let a=[];if(s&&s.send_to){let l=s.send_to;Array.isArray(l)||(l=[l]);const u=await Ea(t);for(const d of l){const _=u.find(S=>S.measurementId===d),T=_&&e[_.appId];if(T)a.push(T);else{a=[];break}}}a.length===0&&(a=Object.values(e)),await Promise.all(a),n("event",r,s||{})}catch(a){ne.error(a)}}function xu(n,e,t,r){async function s(a,...l){try{if(a==="event"){const[u,d]=l;await Ou(n,e,t,u,d)}else if(a==="config"){const[u,d]=l;await Ru(n,e,t,r,u,d)}else if(a==="consent"){const[u,d]=l;n("consent",u,d)}else if(a==="get"){const[u,d,_]=l;n("get",u,d,_)}else if(a==="set"){const[u]=l;n("set",u)}else n(a,...l)}catch(u){ne.error(u)}}return s}function Nu(n,e,t,r,s){let a=function(...l){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(a=window[s]),window[s]=xu(a,n,e,t),{gtagCore:a,wrappedGtag:window[s]}}function Du(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(ur)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=30,Mu=1e3;class Uu{constructor(e={},t=Mu){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ta=new Uu;function Fu(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function ju(n){var e;const{appId:t,apiKey:r}=n,s={method:"GET",headers:Fu(r)},a=Tu.replace("{app-id}",t),l=await fetch(a,s);if(l.status!==200&&l.status!==304){let u="";try{const d=await l.json();!((e=d.error)===null||e===void 0)&&e.message&&(u=d.error.message)}catch{}throw ie.create("config-fetch-failed",{httpStatus:l.status,responseMessage:u})}return l.json()}async function Bu(n,e=Ta,t){const{appId:r,apiKey:s,measurementId:a}=n.options;if(!r)throw ie.create("no-app-id");if(!s){if(a)return{measurementId:a,appId:r};throw ie.create("no-api-key")}const l=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new Hu;return setTimeout(async()=>{u.abort()},Eu),Sa({appId:r,apiKey:s,measurementId:a},l,u,e)}async function Sa(n,{throttleEndTimeMillis:e,backoffCount:t},r,s=Ta){var a;const{appId:l,measurementId:u}=n;try{await Vu(r,e)}catch(d){if(u)return ne.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:l,measurementId:u};throw d}try{const d=await ju(n);return s.deleteThrottleMetadata(l),d}catch(d){const _=d;if(!$u(_)){if(s.deleteThrottleMetadata(l),u)return ne.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${_==null?void 0:_.message}]`),{appId:l,measurementId:u};throw d}const T=Number((a=_==null?void 0:_.customData)===null||a===void 0?void 0:a.httpStatus)===503?Ps(t,s.intervalMillis,Lu):Ps(t,s.intervalMillis),S={throttleEndTimeMillis:Date.now()+T,backoffCount:t+1};return s.setThrottleMetadata(l,S),ne.debug(`Calling attemptFetch again in ${T} millis`),Sa(n,S,r,s)}}function Vu(n,e){return new Promise((t,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(a),r(ie.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function $u(n){if(!(n instanceof ge)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Hu{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function qu(n,e,t,r,s){if(s&&s.global){n("event",t,r);return}else{const a=await e,l=Object.assign(Object.assign({},r),{send_to:a});n("event",t,l)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zu(){if(ir())try{await rr()}catch(n){return ne.warn(ie.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return ne.warn(ie.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Wu(n,e,t,r,s,a,l){var u;const d=Bu(n);d.then(R=>{t[R.measurementId]=R.appId,n.options.measurementId&&R.measurementId!==n.options.measurementId&&ne.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${R.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(R=>ne.error(R)),e.push(d);const _=zu().then(R=>{if(R)return r.getId()}),[T,S]=await Promise.all([d,_]);Du(a)||ku(a,T.measurementId),s("js",new Date);const E=(u=l==null?void 0:l.config)!==null&&u!==void 0?u:{};return E[bu]="firebase",E.update=!0,S!=null&&(E[Iu]=S),s("config",T.measurementId,E),T.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e){this.app=e}_delete(){return delete Kt[this.app.options.appId],Promise.resolve()}}let Kt={},Bs=[];const Vs={};let Fi="dataLayer",Ku="gtag",$s,Aa,Hs=!1;function Ju(){const n=[];if(nr()&&n.push("This is a browser extension environment."),Zo()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),t=ie.create("invalid-analytics-context",{errorInfo:e});ne.warn(t.message)}}function Xu(n,e,t){Ju();const r=n.options.appId;if(!r)throw ie.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)ne.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ie.create("no-api-key");if(Kt[r]!=null)throw ie.create("already-exists",{id:r});if(!Hs){Pu(Fi);const{wrappedGtag:a,gtagCore:l}=Nu(Kt,Bs,Vs,Fi,Ku);Aa=a,$s=l,Hs=!0}return Kt[r]=Wu(n,Bs,Vs,e,$s,Fi,t),new Gu(n)}function Yu(n=or()){n=me(n);const e=ut(n,Hn);return e.isInitialized()?e.getImmediate():Zu(n)}function Zu(n,e={}){const t=ut(n,Hn);if(t.isInitialized()){const s=t.getImmediate();if(We(e,t.getOptions()))return s;throw ie.create("already-initialized")}return t.initialize({options:e})}async function Qu(){if(nr()||!Zo()||!ir())return!1;try{return await rr()}catch{return!1}}function ed(n,e,t,r){n=me(n),qu(Aa,Kt[n.app.options.appId],e,t,r).catch(s=>ne.error(s))}const qs="@firebase/analytics",zs="0.10.17";function td(){Ee(new fe(Hn,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return Xu(r,s,t)},"PUBLIC")),Ee(new fe("analytics-internal",n,"PRIVATE")),ae(qs,zs),ae(qs,zs,"esm2017");function n(e){try{const t=e.getProvider(Hn).getImmediate();return{logEvent:(r,s,a)=>ed(t,r,s,a)}}catch(t){throw ie.create("interop-component-reg-failed",{reason:t})}}}td();var Ws=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dr;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,f){function p(){}p.prototype=f.prototype,v.D=f.prototype,v.prototype=new p,v.prototype.constructor=v,v.C=function(m,y,I){for(var g=Array(arguments.length-2),Te=2;Te<arguments.length;Te++)g[Te-2]=arguments[Te];return f.prototype[y].apply(m,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,f,p){p||(p=0);var m=Array(16);if(typeof f=="string")for(var y=0;16>y;++y)m[y]=f.charCodeAt(p++)|f.charCodeAt(p++)<<8|f.charCodeAt(p++)<<16|f.charCodeAt(p++)<<24;else for(y=0;16>y;++y)m[y]=f[p++]|f[p++]<<8|f[p++]<<16|f[p++]<<24;f=v.g[0],p=v.g[1],y=v.g[2];var I=v.g[3],g=f+(I^p&(y^I))+m[0]+3614090360&4294967295;f=p+(g<<7&4294967295|g>>>25),g=I+(y^f&(p^y))+m[1]+3905402710&4294967295,I=f+(g<<12&4294967295|g>>>20),g=y+(p^I&(f^p))+m[2]+606105819&4294967295,y=I+(g<<17&4294967295|g>>>15),g=p+(f^y&(I^f))+m[3]+3250441966&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(I^p&(y^I))+m[4]+4118548399&4294967295,f=p+(g<<7&4294967295|g>>>25),g=I+(y^f&(p^y))+m[5]+1200080426&4294967295,I=f+(g<<12&4294967295|g>>>20),g=y+(p^I&(f^p))+m[6]+2821735955&4294967295,y=I+(g<<17&4294967295|g>>>15),g=p+(f^y&(I^f))+m[7]+4249261313&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(I^p&(y^I))+m[8]+1770035416&4294967295,f=p+(g<<7&4294967295|g>>>25),g=I+(y^f&(p^y))+m[9]+2336552879&4294967295,I=f+(g<<12&4294967295|g>>>20),g=y+(p^I&(f^p))+m[10]+4294925233&4294967295,y=I+(g<<17&4294967295|g>>>15),g=p+(f^y&(I^f))+m[11]+2304563134&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(I^p&(y^I))+m[12]+1804603682&4294967295,f=p+(g<<7&4294967295|g>>>25),g=I+(y^f&(p^y))+m[13]+4254626195&4294967295,I=f+(g<<12&4294967295|g>>>20),g=y+(p^I&(f^p))+m[14]+2792965006&4294967295,y=I+(g<<17&4294967295|g>>>15),g=p+(f^y&(I^f))+m[15]+1236535329&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(y^I&(p^y))+m[1]+4129170786&4294967295,f=p+(g<<5&4294967295|g>>>27),g=I+(p^y&(f^p))+m[6]+3225465664&4294967295,I=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(I^f))+m[11]+643717713&4294967295,y=I+(g<<14&4294967295|g>>>18),g=p+(I^f&(y^I))+m[0]+3921069994&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^I&(p^y))+m[5]+3593408605&4294967295,f=p+(g<<5&4294967295|g>>>27),g=I+(p^y&(f^p))+m[10]+38016083&4294967295,I=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(I^f))+m[15]+3634488961&4294967295,y=I+(g<<14&4294967295|g>>>18),g=p+(I^f&(y^I))+m[4]+3889429448&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^I&(p^y))+m[9]+568446438&4294967295,f=p+(g<<5&4294967295|g>>>27),g=I+(p^y&(f^p))+m[14]+3275163606&4294967295,I=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(I^f))+m[3]+4107603335&4294967295,y=I+(g<<14&4294967295|g>>>18),g=p+(I^f&(y^I))+m[8]+1163531501&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^I&(p^y))+m[13]+2850285829&4294967295,f=p+(g<<5&4294967295|g>>>27),g=I+(p^y&(f^p))+m[2]+4243563512&4294967295,I=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(I^f))+m[7]+1735328473&4294967295,y=I+(g<<14&4294967295|g>>>18),g=p+(I^f&(y^I))+m[12]+2368359562&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(p^y^I)+m[5]+4294588738&4294967295,f=p+(g<<4&4294967295|g>>>28),g=I+(f^p^y)+m[8]+2272392833&4294967295,I=f+(g<<11&4294967295|g>>>21),g=y+(I^f^p)+m[11]+1839030562&4294967295,y=I+(g<<16&4294967295|g>>>16),g=p+(y^I^f)+m[14]+4259657740&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^I)+m[1]+2763975236&4294967295,f=p+(g<<4&4294967295|g>>>28),g=I+(f^p^y)+m[4]+1272893353&4294967295,I=f+(g<<11&4294967295|g>>>21),g=y+(I^f^p)+m[7]+4139469664&4294967295,y=I+(g<<16&4294967295|g>>>16),g=p+(y^I^f)+m[10]+3200236656&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^I)+m[13]+681279174&4294967295,f=p+(g<<4&4294967295|g>>>28),g=I+(f^p^y)+m[0]+3936430074&4294967295,I=f+(g<<11&4294967295|g>>>21),g=y+(I^f^p)+m[3]+3572445317&4294967295,y=I+(g<<16&4294967295|g>>>16),g=p+(y^I^f)+m[6]+76029189&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^I)+m[9]+3654602809&4294967295,f=p+(g<<4&4294967295|g>>>28),g=I+(f^p^y)+m[12]+3873151461&4294967295,I=f+(g<<11&4294967295|g>>>21),g=y+(I^f^p)+m[15]+530742520&4294967295,y=I+(g<<16&4294967295|g>>>16),g=p+(y^I^f)+m[2]+3299628645&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(y^(p|~I))+m[0]+4096336452&4294967295,f=p+(g<<6&4294967295|g>>>26),g=I+(p^(f|~y))+m[7]+1126891415&4294967295,I=f+(g<<10&4294967295|g>>>22),g=y+(f^(I|~p))+m[14]+2878612391&4294967295,y=I+(g<<15&4294967295|g>>>17),g=p+(I^(y|~f))+m[5]+4237533241&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~I))+m[12]+1700485571&4294967295,f=p+(g<<6&4294967295|g>>>26),g=I+(p^(f|~y))+m[3]+2399980690&4294967295,I=f+(g<<10&4294967295|g>>>22),g=y+(f^(I|~p))+m[10]+4293915773&4294967295,y=I+(g<<15&4294967295|g>>>17),g=p+(I^(y|~f))+m[1]+2240044497&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~I))+m[8]+1873313359&4294967295,f=p+(g<<6&4294967295|g>>>26),g=I+(p^(f|~y))+m[15]+4264355552&4294967295,I=f+(g<<10&4294967295|g>>>22),g=y+(f^(I|~p))+m[6]+2734768916&4294967295,y=I+(g<<15&4294967295|g>>>17),g=p+(I^(y|~f))+m[13]+1309151649&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~I))+m[4]+4149444226&4294967295,f=p+(g<<6&4294967295|g>>>26),g=I+(p^(f|~y))+m[11]+3174756917&4294967295,I=f+(g<<10&4294967295|g>>>22),g=y+(f^(I|~p))+m[2]+718787259&4294967295,y=I+(g<<15&4294967295|g>>>17),g=p+(I^(y|~f))+m[9]+3951481745&4294967295,v.g[0]=v.g[0]+f&4294967295,v.g[1]=v.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+y&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,f){f===void 0&&(f=v.length);for(var p=f-this.blockSize,m=this.B,y=this.h,I=0;I<f;){if(y==0)for(;I<=p;)s(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<f;)if(m[y++]=v.charCodeAt(I++),y==this.blockSize){s(this,m),y=0;break}}else for(;I<f;)if(m[y++]=v[I++],y==this.blockSize){s(this,m),y=0;break}}this.h=y,this.o+=f},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var f=1;f<v.length-8;++f)v[f]=0;var p=8*this.o;for(f=v.length-8;f<v.length;++f)v[f]=p&255,p/=256;for(this.u(v),v=Array(16),f=p=0;4>f;++f)for(var m=0;32>m;m+=8)v[p++]=this.g[f]>>>m&255;return v};function a(v,f){var p=u;return Object.prototype.hasOwnProperty.call(p,v)?p[v]:p[v]=f(v)}function l(v,f){this.h=f;for(var p=[],m=!0,y=v.length-1;0<=y;y--){var I=v[y]|0;m&&I==f||(p[y]=I,m=!1)}this.g=p}var u={};function d(v){return-128<=v&&128>v?a(v,function(f){return new l([f|0],0>f?-1:0)}):new l([v|0],0>v?-1:0)}function _(v){if(isNaN(v)||!isFinite(v))return S;if(0>v)return L(_(-v));for(var f=[],p=1,m=0;v>=p;m++)f[m]=v/p|0,p*=4294967296;return new l(f,0)}function T(v,f){if(v.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(v.charAt(0)=="-")return L(T(v.substring(1),f));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=_(Math.pow(f,8)),m=S,y=0;y<v.length;y+=8){var I=Math.min(8,v.length-y),g=parseInt(v.substring(y,y+I),f);8>I?(I=_(Math.pow(f,I)),m=m.j(I).add(_(g))):(m=m.j(p),m=m.add(_(g)))}return m}var S=d(0),E=d(1),R=d(16777216);n=l.prototype,n.m=function(){if(F(this))return-L(this).m();for(var v=0,f=1,p=0;p<this.g.length;p++){var m=this.i(p);v+=(0<=m?m:4294967296+m)*f,f*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(P(this))return"0";if(F(this))return"-"+L(this).toString(v);for(var f=_(Math.pow(v,6)),p=this,m="";;){var y=O(p,f).g;p=j(p,y.j(f));var I=((0<p.g.length?p.g[0]:p.h)>>>0).toString(v);if(p=y,P(p))return I+m;for(;6>I.length;)I="0"+I;m=I+m}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function P(v){if(v.h!=0)return!1;for(var f=0;f<v.g.length;f++)if(v.g[f]!=0)return!1;return!0}function F(v){return v.h==-1}n.l=function(v){return v=j(this,v),F(v)?-1:P(v)?0:1};function L(v){for(var f=v.g.length,p=[],m=0;m<f;m++)p[m]=~v.g[m];return new l(p,~v.h).add(E)}n.abs=function(){return F(this)?L(this):this},n.add=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0,y=0;y<=f;y++){var I=m+(this.i(y)&65535)+(v.i(y)&65535),g=(I>>>16)+(this.i(y)>>>16)+(v.i(y)>>>16);m=g>>>16,I&=65535,g&=65535,p[y]=g<<16|I}return new l(p,p[p.length-1]&-2147483648?-1:0)};function j(v,f){return v.add(L(f))}n.j=function(v){if(P(this)||P(v))return S;if(F(this))return F(v)?L(this).j(L(v)):L(L(this).j(v));if(F(v))return L(this.j(L(v)));if(0>this.l(R)&&0>v.l(R))return _(this.m()*v.m());for(var f=this.g.length+v.g.length,p=[],m=0;m<2*f;m++)p[m]=0;for(m=0;m<this.g.length;m++)for(var y=0;y<v.g.length;y++){var I=this.i(m)>>>16,g=this.i(m)&65535,Te=v.i(y)>>>16,Ct=v.i(y)&65535;p[2*m+2*y]+=g*Ct,$(p,2*m+2*y),p[2*m+2*y+1]+=I*Ct,$(p,2*m+2*y+1),p[2*m+2*y+1]+=g*Te,$(p,2*m+2*y+1),p[2*m+2*y+2]+=I*Te,$(p,2*m+2*y+2)}for(m=0;m<f;m++)p[m]=p[2*m+1]<<16|p[2*m];for(m=f;m<2*f;m++)p[m]=0;return new l(p,0)};function $(v,f){for(;(v[f]&65535)!=v[f];)v[f+1]+=v[f]>>>16,v[f]&=65535,f++}function C(v,f){this.g=v,this.h=f}function O(v,f){if(P(f))throw Error("division by zero");if(P(v))return new C(S,S);if(F(v))return f=O(L(v),f),new C(L(f.g),L(f.h));if(F(f))return f=O(v,L(f)),new C(L(f.g),f.h);if(30<v.g.length){if(F(v)||F(f))throw Error("slowDivide_ only works with positive integers.");for(var p=E,m=f;0>=m.l(v);)p=V(p),m=V(m);var y=G(p,1),I=G(m,1);for(m=G(m,2),p=G(p,2);!P(m);){var g=I.add(m);0>=g.l(v)&&(y=y.add(p),I=g),m=G(m,1),p=G(p,1)}return f=j(v,y.j(f)),new C(y,f)}for(y=S;0<=v.l(f);){for(p=Math.max(1,Math.floor(v.m()/f.m())),m=Math.ceil(Math.log(p)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),I=_(p),g=I.j(f);F(g)||0<g.l(v);)p-=m,I=_(p),g=I.j(f);P(I)&&(I=E),y=y.add(I),v=j(v,g)}return new C(y,v)}n.A=function(v){return O(this,v).h},n.and=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)&v.i(m);return new l(p,this.h&v.h)},n.or=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)|v.i(m);return new l(p,this.h|v.h)},n.xor=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)^v.i(m);return new l(p,this.h^v.h)};function V(v){for(var f=v.g.length+1,p=[],m=0;m<f;m++)p[m]=v.i(m)<<1|v.i(m-1)>>>31;return new l(p,v.h)}function G(v,f){var p=f>>5;f%=32;for(var m=v.g.length-p,y=[],I=0;I<m;I++)y[I]=0<f?v.i(I+p)>>>f|v.i(I+p+1)<<32-f:v.i(I+p);return new l(y,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=_,l.fromString=T,dr=l}).apply(typeof Ws<"u"?Ws:typeof self<"u"?self:typeof window<"u"?window:{});var Pn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,o,c){return i==Array.prototype||i==Object.prototype||(i[o]=c.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pn=="object"&&Pn];for(var o=0;o<i.length;++o){var c=i[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=t(this);function s(i,o){if(o)e:{var c=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var w=i[h];if(!(w in c))break e;c=c[w]}i=i[i.length-1],h=c[i],o=o(h),o!=h&&o!=null&&e(c,i,{configurable:!0,writable:!0,value:o})}}function a(i,o){i instanceof String&&(i+="");var c=0,h=!1,w={next:function(){if(!h&&c<i.length){var b=c++;return{value:o(b,i[b]),done:!1}}return h=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(i){return i||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},u=this||self;function d(i){var o=typeof i;return o=o!="object"?o:i?Array.isArray(i)?"array":o:"null",o=="array"||o=="object"&&typeof i.length=="number"}function _(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function T(i,o,c){return i.call.apply(i.bind,arguments)}function S(i,o,c){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,h),i.apply(o,w)}}return function(){return i.apply(o,arguments)}}function E(i,o,c){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?T:S,E.apply(null,arguments)}function R(i,o){var c=Array.prototype.slice.call(arguments,1);return function(){var h=c.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function P(i,o){function c(){}c.prototype=o.prototype,i.aa=o.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(h,w,b){for(var A=Array(arguments.length-2),B=2;B<arguments.length;B++)A[B-2]=arguments[B];return o.prototype[w].apply(h,A)}}function F(i){const o=i.length;if(0<o){const c=Array(o);for(let h=0;h<o;h++)c[h]=i[h];return c}return[]}function L(i,o){for(let c=1;c<arguments.length;c++){const h=arguments[c];if(d(h)){const w=i.length||0,b=h.length||0;i.length=w+b;for(let A=0;A<b;A++)i[w+A]=h[A]}else i.push(h)}}class j{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function $(i){return/^[\s\xa0]*$/.test(i)}function C(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function O(i){return O[" "](i),i}O[" "]=function(){};var V=C().indexOf("Gecko")!=-1&&!(C().toLowerCase().indexOf("webkit")!=-1&&C().indexOf("Edge")==-1)&&!(C().indexOf("Trident")!=-1||C().indexOf("MSIE")!=-1)&&C().indexOf("Edge")==-1;function G(i,o,c){for(const h in i)o.call(c,i[h],h,i)}function v(i,o){for(const c in i)o.call(void 0,i[c],c,i)}function f(i){const o={};for(const c in i)o[c]=i[c];return o}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(i,o){let c,h;for(let w=1;w<arguments.length;w++){h=arguments[w];for(c in h)i[c]=h[c];for(let b=0;b<p.length;b++)c=p[b],Object.prototype.hasOwnProperty.call(h,c)&&(i[c]=h[c])}}function y(i){var o=1;i=i.split(":");const c=[];for(;0<o&&i.length;)c.push(i.shift()),o--;return i.length&&c.push(i.join(":")),c}function I(i){u.setTimeout(()=>{throw i},0)}function g(){var i=si;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class Te{constructor(){this.h=this.g=null}add(o,c){const h=Ct.get();h.set(o,c),this.h?this.h.next=h:this.g=h,this.h=h}}var Ct=new j(()=>new mc,i=>i.reset());class mc{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let kt,Pt=!1,si=new Te,kr=()=>{const i=u.Promise.resolve(void 0);kt=()=>{i.then(yc)}};var yc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(c){I(c)}var o=Ct;o.j(i),100>o.h&&(o.h++,i.next=o.g,o.g=i)}Pt=!1};function De(){this.s=this.s,this.C=this.C}De.prototype.s=!1,De.prototype.ma=function(){this.s||(this.s=!0,this.N())},De.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function K(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}K.prototype.h=function(){this.defaultPrevented=!0};var vc=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};u.addEventListener("test",c,o),u.removeEventListener("test",c,o)}catch{}return i})();function Rt(i,o){if(K.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget){if(V){e:{try{O(o.nodeName);var w=!0;break e}catch{}w=!1}w||(o=null)}}else c=="mouseover"?o=i.fromElement:c=="mouseout"&&(o=i.toElement);this.relatedTarget=o,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:_c[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Rt.aa.h.call(this)}}P(Rt,K);var _c={2:"touch",3:"pen",4:"mouse"};Rt.prototype.h=function(){Rt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var fn="closure_listenable_"+(1e6*Math.random()|0),wc=0;function Ic(i,o,c,h,w){this.listener=i,this.proxy=null,this.src=o,this.type=c,this.capture=!!h,this.ha=w,this.key=++wc,this.da=this.fa=!1}function pn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function gn(i){this.src=i,this.g={},this.h=0}gn.prototype.add=function(i,o,c,h,w){var b=i.toString();i=this.g[b],i||(i=this.g[b]=[],this.h++);var A=ai(i,o,h,w);return-1<A?(o=i[A],c||(o.fa=!1)):(o=new Ic(o,this.src,b,!!h,w),o.fa=c,i.push(o)),o};function oi(i,o){var c=o.type;if(c in i.g){var h=i.g[c],w=Array.prototype.indexOf.call(h,o,void 0),b;(b=0<=w)&&Array.prototype.splice.call(h,w,1),b&&(pn(o),i.g[c].length==0&&(delete i.g[c],i.h--))}}function ai(i,o,c,h){for(var w=0;w<i.length;++w){var b=i[w];if(!b.da&&b.listener==o&&b.capture==!!c&&b.ha==h)return w}return-1}var ci="closure_lm_"+(1e6*Math.random()|0),li={};function Pr(i,o,c,h,w){if(Array.isArray(o)){for(var b=0;b<o.length;b++)Pr(i,o[b],c,h,w);return null}return c=xr(c),i&&i[fn]?i.K(o,c,_(h)?!!h.capture:!1,w):bc(i,o,c,!1,h,w)}function bc(i,o,c,h,w,b){if(!o)throw Error("Invalid event type");var A=_(w)?!!w.capture:!!w,B=ui(i);if(B||(i[ci]=B=new gn(i)),c=B.add(o,c,h,A,b),c.proxy)return c;if(h=Ec(),c.proxy=h,h.src=i,h.listener=c,i.addEventListener)vc||(w=A),w===void 0&&(w=!1),i.addEventListener(o.toString(),h,w);else if(i.attachEvent)i.attachEvent(Or(o.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Ec(){function i(c){return o.call(i.src,i.listener,c)}const o=Tc;return i}function Rr(i,o,c,h,w){if(Array.isArray(o))for(var b=0;b<o.length;b++)Rr(i,o[b],c,h,w);else h=_(h)?!!h.capture:!!h,c=xr(c),i&&i[fn]?(i=i.i,o=String(o).toString(),o in i.g&&(b=i.g[o],c=ai(b,c,h,w),-1<c&&(pn(b[c]),Array.prototype.splice.call(b,c,1),b.length==0&&(delete i.g[o],i.h--)))):i&&(i=ui(i))&&(o=i.g[o.toString()],i=-1,o&&(i=ai(o,c,h,w)),(c=-1<i?o[i]:null)&&hi(c))}function hi(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[fn])oi(o.i,i);else{var c=i.type,h=i.proxy;o.removeEventListener?o.removeEventListener(c,h,i.capture):o.detachEvent?o.detachEvent(Or(c),h):o.addListener&&o.removeListener&&o.removeListener(h),(c=ui(o))?(oi(c,i),c.h==0&&(c.src=null,o[ci]=null)):pn(i)}}}function Or(i){return i in li?li[i]:li[i]="on"+i}function Tc(i,o){if(i.da)i=!0;else{o=new Rt(o,this);var c=i.listener,h=i.ha||i.src;i.fa&&hi(i),i=c.call(h,o)}return i}function ui(i){return i=i[ci],i instanceof gn?i:null}var di="__closure_events_fn_"+(1e9*Math.random()>>>0);function xr(i){return typeof i=="function"?i:(i[di]||(i[di]=function(o){return i.handleEvent(o)}),i[di])}function J(){De.call(this),this.i=new gn(this),this.M=this,this.F=null}P(J,De),J.prototype[fn]=!0,J.prototype.removeEventListener=function(i,o,c,h){Rr(this,i,o,c,h)};function Z(i,o){var c,h=i.F;if(h)for(c=[];h;h=h.F)c.push(h);if(i=i.M,h=o.type||o,typeof o=="string")o=new K(o,i);else if(o instanceof K)o.target=o.target||i;else{var w=o;o=new K(h,i),m(o,w)}if(w=!0,c)for(var b=c.length-1;0<=b;b--){var A=o.g=c[b];w=mn(A,h,!0,o)&&w}if(A=o.g=i,w=mn(A,h,!0,o)&&w,w=mn(A,h,!1,o)&&w,c)for(b=0;b<c.length;b++)A=o.g=c[b],w=mn(A,h,!1,o)&&w}J.prototype.N=function(){if(J.aa.N.call(this),this.i){var i=this.i,o;for(o in i.g){for(var c=i.g[o],h=0;h<c.length;h++)pn(c[h]);delete i.g[o],i.h--}}this.F=null},J.prototype.K=function(i,o,c,h){return this.i.add(String(i),o,!1,c,h)},J.prototype.L=function(i,o,c,h){return this.i.add(String(i),o,!0,c,h)};function mn(i,o,c,h){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();for(var w=!0,b=0;b<o.length;++b){var A=o[b];if(A&&!A.da&&A.capture==c){var B=A.listener,W=A.ha||A.src;A.fa&&oi(i.i,A),w=B.call(W,h)!==!1&&w}}return w&&!h.defaultPrevented}function Nr(i,o,c){if(typeof i=="function")c&&(i=E(i,c));else if(i&&typeof i.handleEvent=="function")i=E(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:u.setTimeout(i,o||0)}function Dr(i){i.g=Nr(()=>{i.g=null,i.i&&(i.i=!1,Dr(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class Sc extends De{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:Dr(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ot(i){De.call(this),this.h=i,this.g={}}P(Ot,De);var Lr=[];function Mr(i){G(i.g,function(o,c){this.g.hasOwnProperty(c)&&hi(o)},i),i.g={}}Ot.prototype.N=function(){Ot.aa.N.call(this),Mr(this)},Ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fi=u.JSON.stringify,Ac=u.JSON.parse,Cc=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function pi(){}pi.prototype.h=null;function Ur(i){return i.h||(i.h=i.i())}function kc(){}var xt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gi(){K.call(this,"d")}P(gi,K);function mi(){K.call(this,"c")}P(mi,K);var ft={},Fr=null;function yi(){return Fr=Fr||new J}ft.La="serverreachability";function jr(i){K.call(this,ft.La,i)}P(jr,K);function Nt(i){const o=yi();Z(o,new jr(o))}ft.STAT_EVENT="statevent";function Br(i,o){K.call(this,ft.STAT_EVENT,i),this.stat=o}P(Br,K);function Q(i){const o=yi();Z(o,new Br(o,i))}ft.Ma="timingevent";function Vr(i,o){K.call(this,ft.Ma,i),this.size=o}P(Vr,K);function Dt(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},o)}function Lt(){this.g=!0}Lt.prototype.xa=function(){this.g=!1};function Pc(i,o,c,h,w,b){i.info(function(){if(i.g)if(b)for(var A="",B=b.split("&"),W=0;W<B.length;W++){var M=B[W].split("=");if(1<M.length){var X=M[0];M=M[1];var Y=X.split("_");A=2<=Y.length&&Y[1]=="type"?A+(X+"="+M+"&"):A+(X+"=redacted&")}}else A=null;else A=b;return"XMLHTTP REQ ("+h+") [attempt "+w+"]: "+o+`
`+c+`
`+A})}function Rc(i,o,c,h,w,b,A){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+w+"]: "+o+`
`+c+`
`+b+" "+A})}function pt(i,o,c,h){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+xc(i,c)+(h?" "+h:"")})}function Oc(i,o){i.info(function(){return"TIMEOUT: "+o})}Lt.prototype.info=function(){};function xc(i,o){if(!i.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var h=c[i];if(!(2>h.length)){var w=h[1];if(Array.isArray(w)&&!(1>w.length)){var b=w[0];if(b!="noop"&&b!="stop"&&b!="close")for(var A=1;A<w.length;A++)w[A]=""}}}}return fi(c)}catch{return o}}var vi={NO_ERROR:0,TIMEOUT:8},Nc={},_i;function yn(){}P(yn,pi),yn.prototype.g=function(){return new XMLHttpRequest},yn.prototype.i=function(){return{}},_i=new yn;function Le(i,o,c,h){this.j=i,this.i=o,this.l=c,this.R=h||1,this.U=new Ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $r}function $r(){this.i=null,this.g="",this.h=!1}var Hr={},wi={};function Ii(i,o,c){i.L=1,i.v=In(Se(o)),i.m=c,i.P=!0,qr(i,null)}function qr(i,o){i.F=Date.now(),vn(i),i.A=Se(i.v);var c=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),rs(c.i,"t",h),i.C=0,c=i.j.J,i.h=new $r,i.g=bs(i.j,c?o:null,!i.m),0<i.O&&(i.M=new Sc(E(i.Y,i,i.g),i.O)),o=i.U,c=i.g,h=i.ca;var w="readystatechange";Array.isArray(w)||(w&&(Lr[0]=w.toString()),w=Lr);for(var b=0;b<w.length;b++){var A=Pr(c,w[b],h||o.handleEvent,!1,o.h||o);if(!A)break;o.g[A.key]=A}o=i.H?f(i.H):{},i.m?(i.u||(i.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,o)):(i.u="GET",i.g.ea(i.A,i.u,null,o)),Nt(),Pc(i.i,i.u,i.A,i.l,i.R,i.m)}Le.prototype.ca=function(i){i=i.target;const o=this.M;o&&Ae(i)==3?o.j():this.Y(i)},Le.prototype.Y=function(i){try{if(i==this.g)e:{const Y=Ae(this.g);var o=this.g.Ba();const yt=this.g.Z();if(!(3>Y)&&(Y!=3||this.g&&(this.h.h||this.g.oa()||us(this.g)))){this.J||Y!=4||o==7||(o==8||0>=yt?Nt(3):Nt(2)),bi(this);var c=this.g.Z();this.X=c;t:if(zr(this)){var h=us(this.g);i="";var w=h.length,b=Ae(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Je(this),Mt(this);var A="";break t}this.h.i=new u.TextDecoder}for(o=0;o<w;o++)this.h.h=!0,i+=this.h.i.decode(h[o],{stream:!(b&&o==w-1)});h.length=0,this.h.g+=i,this.C=0,A=this.h.g}else A=this.g.oa();if(this.o=c==200,Rc(this.i,this.u,this.A,this.l,this.R,Y,c),this.o){if(this.T&&!this.K){t:{if(this.g){var B,W=this.g;if((B=W.g?W.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!$(B)){var M=B;break t}}M=null}if(c=M)pt(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ei(this,c);else{this.o=!1,this.s=3,Q(12),Je(this),Mt(this);break e}}if(this.P){c=!0;let ce;for(;!this.J&&this.C<A.length;)if(ce=Dc(this,A),ce==wi){Y==4&&(this.s=4,Q(14),c=!1),pt(this.i,this.l,null,"[Incomplete Response]");break}else if(ce==Hr){this.s=4,Q(15),pt(this.i,this.l,A,"[Invalid Chunk]"),c=!1;break}else pt(this.i,this.l,ce,null),Ei(this,ce);if(zr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||A.length!=0||this.h.h||(this.s=1,Q(16),c=!1),this.o=this.o&&c,!c)pt(this.i,this.l,A,"[Invalid Chunked Response]"),Je(this),Mt(this);else if(0<A.length&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.ba&&!X.M&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+A.length),Pi(X),X.M=!0,Q(11))}}else pt(this.i,this.l,A,null),Ei(this,A);Y==4&&Je(this),this.o&&!this.J&&(Y==4?vs(this.j,this):(this.o=!1,vn(this)))}else Yc(this.g),c==400&&0<A.indexOf("Unknown SID")?(this.s=3,Q(12)):(this.s=0,Q(13)),Je(this),Mt(this)}}}catch{}finally{}};function zr(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Dc(i,o){var c=i.C,h=o.indexOf(`
`,c);return h==-1?wi:(c=Number(o.substring(c,h)),isNaN(c)?Hr:(h+=1,h+c>o.length?wi:(o=o.slice(h,h+c),i.C=h+c,o)))}Le.prototype.cancel=function(){this.J=!0,Je(this)};function vn(i){i.S=Date.now()+i.I,Wr(i,i.I)}function Wr(i,o){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Dt(E(i.ba,i),o)}function bi(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Le.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Oc(this.i,this.A),this.L!=2&&(Nt(),Q(17)),Je(this),this.s=2,Mt(this)):Wr(this,this.S-i)};function Mt(i){i.j.G==0||i.J||vs(i.j,i)}function Je(i){bi(i);var o=i.M;o&&typeof o.ma=="function"&&o.ma(),i.M=null,Mr(i.U),i.g&&(o=i.g,i.g=null,o.abort(),o.ma())}function Ei(i,o){try{var c=i.j;if(c.G!=0&&(c.g==i||Ti(c.h,i))){if(!i.K&&Ti(c.h,i)&&c.G==3){try{var h=c.Da.g.parse(o)}catch{h=null}if(Array.isArray(h)&&h.length==3){var w=h;if(w[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)Cn(c),Sn(c);else break e;ki(c),Q(18)}}else c.za=w[1],0<c.za-c.T&&37500>w[2]&&c.F&&c.v==0&&!c.C&&(c.C=Dt(E(c.Za,c),6e3));if(1>=Jr(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else Ye(c,11)}else if((i.K||c.g==i)&&Cn(c),!$(o))for(w=c.Da.g.parse(o),o=0;o<w.length;o++){let M=w[o];if(c.T=M[0],M=M[1],c.G==2)if(M[0]=="c"){c.K=M[1],c.ia=M[2];const X=M[3];X!=null&&(c.la=X,c.j.info("VER="+c.la));const Y=M[4];Y!=null&&(c.Aa=Y,c.j.info("SVER="+c.Aa));const yt=M[5];yt!=null&&typeof yt=="number"&&0<yt&&(h=1.5*yt,c.L=h,c.j.info("backChannelRequestTimeoutMs_="+h)),h=c;const ce=i.g;if(ce){const kn=ce.g?ce.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(kn){var b=h.h;b.g||kn.indexOf("spdy")==-1&&kn.indexOf("quic")==-1&&kn.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Si(b,b.h),b.h=null))}if(h.D){const Ri=ce.g?ce.g.getResponseHeader("X-HTTP-Session-Id"):null;Ri&&(h.ya=Ri,H(h.I,h.D,Ri))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),h=c;var A=i;if(h.qa=Is(h,h.J?h.ia:null,h.W),A.K){Xr(h.h,A);var B=A,W=h.L;W&&(B.I=W),B.B&&(bi(B),vn(B)),h.g=A}else ms(h);0<c.i.length&&An(c)}else M[0]!="stop"&&M[0]!="close"||Ye(c,7);else c.G==3&&(M[0]=="stop"||M[0]=="close"?M[0]=="stop"?Ye(c,7):Ci(c):M[0]!="noop"&&c.l&&c.l.ta(M),c.v=0)}}Nt(4)}catch{}}var Lc=class{constructor(i,o){this.g=i,this.map=o}};function Gr(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Kr(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Jr(i){return i.h?1:i.g?i.g.size:0}function Ti(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function Si(i,o){i.g?i.g.add(o):i.h=o}function Xr(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}Gr.prototype.cancel=function(){if(this.i=Yr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Yr(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const c of i.g.values())o=o.concat(c.D);return o}return F(i.i)}function Mc(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(d(i)){for(var o=[],c=i.length,h=0;h<c;h++)o.push(i[h]);return o}o=[],c=0;for(h in i)o[c++]=i[h];return o}function Uc(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(d(i)||typeof i=="string"){var o=[];i=i.length;for(var c=0;c<i;c++)o.push(c);return o}o=[],c=0;for(const h in i)o[c++]=h;return o}}}function Zr(i,o){if(i.forEach&&typeof i.forEach=="function")i.forEach(o,void 0);else if(d(i)||typeof i=="string")Array.prototype.forEach.call(i,o,void 0);else for(var c=Uc(i),h=Mc(i),w=h.length,b=0;b<w;b++)o.call(void 0,h[b],c&&c[b],i)}var Qr=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Fc(i,o){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var h=i[c].indexOf("="),w=null;if(0<=h){var b=i[c].substring(0,h);w=i[c].substring(h+1)}else b=i[c];o(b,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Xe(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Xe){this.h=i.h,_n(this,i.j),this.o=i.o,this.g=i.g,wn(this,i.s),this.l=i.l;var o=i.i,c=new jt;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),es(this,c),this.m=i.m}else i&&(o=String(i).match(Qr))?(this.h=!1,_n(this,o[1]||"",!0),this.o=Ut(o[2]||""),this.g=Ut(o[3]||"",!0),wn(this,o[4]),this.l=Ut(o[5]||"",!0),es(this,o[6]||"",!0),this.m=Ut(o[7]||"")):(this.h=!1,this.i=new jt(null,this.h))}Xe.prototype.toString=function(){var i=[],o=this.j;o&&i.push(Ft(o,ts,!0),":");var c=this.g;return(c||o=="file")&&(i.push("//"),(o=this.o)&&i.push(Ft(o,ts,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Ft(c,c.charAt(0)=="/"?Vc:Bc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Ft(c,Hc)),i.join("")};function Se(i){return new Xe(i)}function _n(i,o,c){i.j=c?Ut(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function wn(i,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);i.s=o}else i.s=null}function es(i,o,c){o instanceof jt?(i.i=o,qc(i.i,i.h)):(c||(o=Ft(o,$c)),i.i=new jt(o,i.h))}function H(i,o,c){i.i.set(o,c)}function In(i){return H(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Ut(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ft(i,o,c){return typeof i=="string"?(i=encodeURI(i).replace(o,jc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function jc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var ts=/[#\/\?@]/g,Bc=/[#\?:]/g,Vc=/[#\?]/g,$c=/[#\?@]/g,Hc=/#/g;function jt(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function Me(i){i.g||(i.g=new Map,i.h=0,i.i&&Fc(i.i,function(o,c){i.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}n=jt.prototype,n.add=function(i,o){Me(this),this.i=null,i=gt(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(o),this.h+=1,this};function ns(i,o){Me(i),o=gt(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function is(i,o){return Me(i),o=gt(i,o),i.g.has(o)}n.forEach=function(i,o){Me(this),this.g.forEach(function(c,h){c.forEach(function(w){i.call(o,w,h,this)},this)},this)},n.na=function(){Me(this);const i=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let h=0;h<o.length;h++){const w=i[h];for(let b=0;b<w.length;b++)c.push(o[h])}return c},n.V=function(i){Me(this);let o=[];if(typeof i=="string")is(this,i)&&(o=o.concat(this.g.get(gt(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)o=o.concat(i[c])}return o},n.set=function(i,o){return Me(this),this.i=null,i=gt(this,i),is(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},n.get=function(i,o){return i?(i=this.V(i),0<i.length?String(i[0]):o):o};function rs(i,o,c){ns(i,o),0<c.length&&(i.i=null,i.g.set(gt(i,o),F(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var h=o[c];const b=encodeURIComponent(String(h)),A=this.V(h);for(h=0;h<A.length;h++){var w=b;A[h]!==""&&(w+="="+encodeURIComponent(String(A[h]))),i.push(w)}}return this.i=i.join("&")};function gt(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function qc(i,o){o&&!i.j&&(Me(i),i.i=null,i.g.forEach(function(c,h){var w=h.toLowerCase();h!=w&&(ns(this,h),rs(this,w,c))},i)),i.j=o}function zc(i,o){const c=new Lt;if(u.Image){const h=new Image;h.onload=R(Ue,c,"TestLoadImage: loaded",!0,o,h),h.onerror=R(Ue,c,"TestLoadImage: error",!1,o,h),h.onabort=R(Ue,c,"TestLoadImage: abort",!1,o,h),h.ontimeout=R(Ue,c,"TestLoadImage: timeout",!1,o,h),u.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else o(!1)}function Wc(i,o){const c=new Lt,h=new AbortController,w=setTimeout(()=>{h.abort(),Ue(c,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:h.signal}).then(b=>{clearTimeout(w),b.ok?Ue(c,"TestPingServer: ok",!0,o):Ue(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(w),Ue(c,"TestPingServer: error",!1,o)})}function Ue(i,o,c,h,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),h(c)}catch{}}function Gc(){this.g=new Cc}function Kc(i,o,c){const h=c||"";try{Zr(i,function(w,b){let A=w;_(w)&&(A=fi(w)),o.push(h+b+"="+encodeURIComponent(A))})}catch(w){throw o.push(h+"type="+encodeURIComponent("_badmap")),w}}function bn(i){this.l=i.Ub||null,this.j=i.eb||!1}P(bn,pi),bn.prototype.g=function(){return new En(this.l,this.j)},bn.prototype.i=(function(i){return function(){return i}})({});function En(i,o){J.call(this),this.D=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(En,J),n=En.prototype,n.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=o,this.readyState=1,Vt(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(o.body=i),(this.D||u).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Bt(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Vt(this)),this.g&&(this.readyState=3,Vt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ss(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function ss(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?Bt(this):Vt(this),this.readyState==3&&ss(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Bt(this))},n.Qa=function(i){this.g&&(this.response=i,Bt(this))},n.ga=function(){this.g&&Bt(this)};function Bt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Vt(i)}n.setRequestHeader=function(i,o){this.u.append(i,o)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=o.next();return i.join(`\r
`)};function Vt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(En.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function os(i){let o="";return G(i,function(c,h){o+=h,o+=":",o+=c,o+=`\r
`}),o}function Ai(i,o,c){e:{for(h in c){var h=!1;break e}h=!0}h||(c=os(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):H(i,o,c))}function q(i){J.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(q,J);var Jc=/^https?$/i,Xc=["POST","PUT"];n=q.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,o,c,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():_i.g(),this.v=this.o?Ur(this.o):Ur(_i),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(b){as(this,b);return}if(i=c||"",c=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var w in h)c.set(w,h[w]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const b of h.keys())c.set(b,h.get(b));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(c.keys()).find(b=>b.toLowerCase()=="content-type"),w=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Xc,o,void 0))||h||w||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,A]of c)this.g.setRequestHeader(b,A);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{hs(this),this.u=!0,this.g.send(i),this.u=!1}catch(b){as(this,b)}};function as(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.m=5,cs(i),Tn(i)}function cs(i){i.A||(i.A=!0,Z(i,"complete"),Z(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Z(this,"complete"),Z(this,"abort"),Tn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Tn(this,!0)),q.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ls(this):this.bb())},n.bb=function(){ls(this)};function ls(i){if(i.h&&typeof l<"u"&&(!i.v[1]||Ae(i)!=4||i.Z()!=2)){if(i.u&&Ae(i)==4)Nr(i.Ea,0,i);else if(Z(i,"readystatechange"),Ae(i)==4){i.h=!1;try{const A=i.Z();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var h;if(h=A===0){var w=String(i.D).match(Qr)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),h=!Jc.test(w?w.toLowerCase():"")}c=h}if(c)Z(i,"complete"),Z(i,"success");else{i.m=6;try{var b=2<Ae(i)?i.g.statusText:""}catch{b=""}i.l=b+" ["+i.Z()+"]",cs(i)}}finally{Tn(i)}}}}function Tn(i,o){if(i.g){hs(i);const c=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,o||Z(i,"ready");try{c.onreadystatechange=h}catch{}}}function hs(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ae(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ae(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),Ac(o)}};function us(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Yc(i){const o={};i=(i.g&&2<=Ae(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if($(i[h]))continue;var c=y(i[h]);const w=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const b=o[w]||[];o[w]=b,b.push(c)}v(o,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function $t(i,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||o}function ds(i){this.Aa=0,this.i=[],this.j=new Lt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=$t("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=$t("baseRetryDelayMs",5e3,i),this.cb=$t("retryDelaySeedMs",1e4,i),this.Wa=$t("forwardChannelMaxRetries",2,i),this.wa=$t("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Gr(i&&i.concurrentRequestLimit),this.Da=new Gc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ds.prototype,n.la=8,n.G=1,n.connect=function(i,o,c,h){Q(0),this.W=i,this.H=o||{},c&&h!==void 0&&(this.H.OSID=c,this.H.OAID=h),this.F=this.X,this.I=Is(this,null,this.W),An(this)};function Ci(i){if(fs(i),i.G==3){var o=i.U++,c=Se(i.I);if(H(c,"SID",i.K),H(c,"RID",o),H(c,"TYPE","terminate"),Ht(i,c),o=new Le(i,i.j,o),o.L=2,o.v=In(Se(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=o.v,c=!0),c||(o.g=bs(o.j,null),o.g.ea(o.v)),o.F=Date.now(),vn(o)}ws(i)}function Sn(i){i.g&&(Pi(i),i.g.cancel(),i.g=null)}function fs(i){Sn(i),i.u&&(u.clearTimeout(i.u),i.u=null),Cn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function An(i){if(!Kr(i.h)&&!i.s){i.s=!0;var o=i.Ga;kt||kr(),Pt||(kt(),Pt=!0),si.add(o,i),i.B=0}}function Zc(i,o){return Jr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=o.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Dt(E(i.Ga,i,o),_s(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const w=new Le(this,this.j,i);let b=this.o;if(this.S&&(b?(b=f(b),m(b,this.S)):b=this.S),this.m!==null||this.O||(w.H=b,b=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var h=this.i[c];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(o+=h,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=gs(this,w,o),c=Se(this.I),H(c,"RID",i),H(c,"CVER",22),this.D&&H(c,"X-HTTP-Session-Id",this.D),Ht(this,c),b&&(this.O?o="headers="+encodeURIComponent(String(os(b)))+"&"+o:this.m&&Ai(c,this.m,b)),Si(this.h,w),this.Ua&&H(c,"TYPE","init"),this.P?(H(c,"$req",o),H(c,"SID","null"),w.T=!0,Ii(w,c,null)):Ii(w,c,o),this.G=2}}else this.G==3&&(i?ps(this,i):this.i.length==0||Kr(this.h)||ps(this))};function ps(i,o){var c;o?c=o.l:c=i.U++;const h=Se(i.I);H(h,"SID",i.K),H(h,"RID",c),H(h,"AID",i.T),Ht(i,h),i.m&&i.o&&Ai(h,i.m,i.o),c=new Le(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),o&&(i.i=o.D.concat(i.i)),o=gs(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Si(i.h,c),Ii(c,h,o)}function Ht(i,o){i.H&&G(i.H,function(c,h){H(o,h,c)}),i.l&&Zr({},function(c,h){H(o,h,c)})}function gs(i,o,c){c=Math.min(i.i.length,c);var h=i.l?E(i.l.Na,i.l,i):null;e:{var w=i.i;let b=-1;for(;;){const A=["count="+c];b==-1?0<c?(b=w[0].g,A.push("ofs="+b)):b=0:A.push("ofs="+b);let B=!0;for(let W=0;W<c;W++){let M=w[W].g;const X=w[W].map;if(M-=b,0>M)b=Math.max(0,w[W].g-100),B=!1;else try{Kc(X,A,"req"+M+"_")}catch{h&&h(X)}}if(B){h=A.join("&");break e}}}return i=i.i.splice(0,c),o.D=i,h}function ms(i){if(!i.g&&!i.u){i.Y=1;var o=i.Fa;kt||kr(),Pt||(kt(),Pt=!0),si.add(o,i),i.v=0}}function ki(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Dt(E(i.Fa,i),_s(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,ys(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Dt(E(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Q(10),Sn(this),ys(this))};function Pi(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function ys(i){i.g=new Le(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var o=Se(i.qa);H(o,"RID","rpc"),H(o,"SID",i.K),H(o,"AID",i.T),H(o,"CI",i.F?"0":"1"),!i.F&&i.ja&&H(o,"TO",i.ja),H(o,"TYPE","xmlhttp"),Ht(i,o),i.m&&i.o&&Ai(o,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=In(Se(o)),c.m=null,c.P=!0,qr(c,i)}n.Za=function(){this.C!=null&&(this.C=null,Sn(this),ki(this),Q(19))};function Cn(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function vs(i,o){var c=null;if(i.g==o){Cn(i),Pi(i),i.g=null;var h=2}else if(Ti(i.h,o))c=o.D,Xr(i.h,o),h=1;else return;if(i.G!=0){if(o.o)if(h==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var w=i.B;h=yi(),Z(h,new Vr(h,c)),An(i)}else ms(i);else if(w=o.s,w==3||w==0&&0<o.X||!(h==1&&Zc(i,o)||h==2&&ki(i)))switch(c&&0<c.length&&(o=i.h,o.i=o.i.concat(c)),w){case 1:Ye(i,5);break;case 4:Ye(i,10);break;case 3:Ye(i,6);break;default:Ye(i,2)}}}function _s(i,o){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*o}function Ye(i,o){if(i.j.info("Error code "+o),o==2){var c=E(i.fb,i),h=i.Xa;const w=!h;h=new Xe(h||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||_n(h,"https"),In(h),w?zc(h.toString(),c):Wc(h.toString(),c)}else Q(2);i.G=0,i.l&&i.l.sa(o),ws(i),fs(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Q(2)):(this.j.info("Failed to ping google.com"),Q(1))};function ws(i){if(i.G=0,i.ka=[],i.l){const o=Yr(i.h);(o.length!=0||i.i.length!=0)&&(L(i.ka,o),L(i.ka,i.i),i.h.i.length=0,F(i.i),i.i.length=0),i.l.ra()}}function Is(i,o,c){var h=c instanceof Xe?Se(c):new Xe(c);if(h.g!="")o&&(h.g=o+"."+h.g),wn(h,h.s);else{var w=u.location;h=w.protocol,o=o?o+"."+w.hostname:w.hostname,w=+w.port;var b=new Xe(null);h&&_n(b,h),o&&(b.g=o),w&&wn(b,w),c&&(b.l=c),h=b}return c=i.D,o=i.ya,c&&o&&H(h,c,o),H(h,"VER",i.la),Ht(i,h),h}function bs(i,o,c){if(o&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Ca&&!i.pa?new q(new bn({eb:c})):new q(i.pa),o.Ha(i.J),o}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Es(){}n=Es.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function re(i,o){J.call(this),this.g=new ds(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(i?i["X-WebChannel-Client-Profile"]=o.va:i={"X-WebChannel-Client-Profile":o.va}),this.g.S=i,(i=o&&o.Sb)&&!$(i)&&(this.g.m=i),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!$(o)&&(this.g.D=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new mt(this)}P(re,J),re.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},re.prototype.close=function(){Ci(this.g)},re.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=fi(i),i=c);o.i.push(new Lc(o.Ya++,i)),o.G==3&&An(o)},re.prototype.N=function(){this.g.l=null,delete this.j,Ci(this.g),delete this.g,re.aa.N.call(this)};function Ts(i){gi.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const c in o){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}P(Ts,gi);function Ss(){mi.call(this),this.status=1}P(Ss,mi);function mt(i){this.g=i}P(mt,Es),mt.prototype.ua=function(){Z(this.g,"a")},mt.prototype.ta=function(i){Z(this.g,new Ts(i))},mt.prototype.sa=function(i){Z(this.g,new Ss)},mt.prototype.ra=function(){Z(this.g,"b")},re.prototype.send=re.prototype.o,re.prototype.open=re.prototype.m,re.prototype.close=re.prototype.close,vi.NO_ERROR=0,vi.TIMEOUT=8,vi.HTTP_ERROR=6,Nc.COMPLETE="complete",kc.EventType=xt,xt.OPEN="a",xt.CLOSE="b",xt.ERROR="c",xt.MESSAGE="d",J.prototype.listen=J.prototype.K,q.prototype.listenOnce=q.prototype.L,q.prototype.getLastError=q.prototype.Ka,q.prototype.getLastErrorCode=q.prototype.Ba,q.prototype.getStatus=q.prototype.Z,q.prototype.getResponseJson=q.prototype.Oa,q.prototype.getResponseText=q.prototype.oa,q.prototype.send=q.prototype.ea,q.prototype.setWithCredentials=q.prototype.Ha}).apply(typeof Pn<"u"?Pn:typeof self<"u"?self:typeof window<"u"?window:{});const Gs="@firebase/firestore",Ks="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ee.UNAUTHENTICATED=new ee(null),ee.GOOGLE_CREDENTIALS=new ee("google-credentials-uid"),ee.FIRST_PARTY=new ee("first-party-uid"),ee.MOCK_USER=new ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let an="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new Qn("@firebase/firestore");function he(n,...e){if(Tt.logLevel<=U.DEBUG){const t=e.map(fr);Tt.debug(`Firestore (${an}): ${n}`,...t)}}function Ca(n,...e){if(Tt.logLevel<=U.ERROR){const t=e.map(fr);Tt.error(`Firestore (${an}): ${n}`,...t)}}function nd(n,...e){if(Tt.logLevel<=U.WARN){const t=e.map(fr);Tt.warn(`Firestore (${an}): ${n}`,...t)}}function fr(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ka(n,r,t)}function ka(n,e,t){let r=`FIRESTORE (${an}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ca(r),new Error(r)}function Jt(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||ka(e,s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class D extends ge{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class id{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ee.UNAUTHENTICATED)))}shutdown(){}}class rd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class sd{constructor(e){this.t=e,this.currentUser=ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Jt(this.o===void 0,42304);let r=this.i;const s=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve();let a=new Xt;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Xt,e.enqueueRetryable((()=>s(this.currentUser)))};const l=()=>{const d=a;e.enqueueRetryable((async()=>{await d.promise,await s(this.currentUser)}))},u=d=>{he("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((d=>u(d))),setTimeout((()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?u(d):(he("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Xt)}}),0),l()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(he("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Jt(typeof r.accessToken=="string",31837,{l:r}),new Pa(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Jt(e===null||typeof e=="string",2055,{h:e}),new ee(e)}}class od{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ee.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class ad{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new od(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ee.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Js{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cd{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,oe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Jt(this.o===void 0,3512);const r=a=>{a.error!=null&&he("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.m;return this.m=a.token,he("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?t(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable((()=>r(a)))};const s=a=>{he("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((a=>s(a))),setTimeout((()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?s(a):he("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Js(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Jt(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Js(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ld(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=ld(40);for(let a=0;a<s.length;++a)r.length<20&&s[a]<t&&(r+=e.charAt(s[a]%62))}return r}}function de(n,e){return n<e?-1:n>e?1:0}function dd(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return de(r,s);{const a=hd(),l=fd(a.encode(Xs(n,t)),a.encode(Xs(e,t)));return l!==0?l:de(r,s)}}t+=r>65535?2:1}return de(n.length,e.length)}function Xs(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function fd(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return de(n[t],e[t]);return de(n.length,e.length)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys="__name__";class ye{constructor(e,t,r){t===void 0?t=0:t>e.length&&tn(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&tn(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ye.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ye?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const a=ye.compareSegments(e.get(s),t.get(s));if(a!==0)return a}return de(e.length,t.length)}static compareSegments(e,t){const r=ye.isNumericId(e),s=ye.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ye.extractNumericId(e).compare(ye.extractNumericId(t)):dd(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return dr.fromString(e.substring(4,e.length-2))}}class le extends ye{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new le(t)}static emptyPath(){return new le([])}}const pd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends ye{construct(e,t,r){return new et(e,t,r)}static isValidIdentifier(e){return pd.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ys}static keyField(){return new et([Ys])}static fromServerFormat(e){const t=[];let r="",s=0;const a=()=>{if(r.length===0)throw new D(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let l=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new D(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new D(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,s+=2}else u==="`"?(l=!l,s++):u!=="."||l?(r+=u,s++):(a(),s++)}if(a(),l)throw new D(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(t)}static emptyPath(){return new et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.path=e}static fromPath(e){return new nt(le.fromString(e))}static fromName(e){return new nt(le.fromString(e).popFirst(5))}static empty(){return new nt(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return le.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new nt(new le(e.slice()))}}function gd(n,e,t,r){if(e===!0&&r===!0)throw new D(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function md(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function yd(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":tn(12329,{type:typeof n})}function vd(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=yd(n);throw new D(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(n,e){const t={typeString:n};return e&&(t.value=e),t}function cn(n,e){if(!md(n))throw new D(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,a="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const l=n[r];if(s&&typeof l!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(a!==void 0&&l!==a.value){t=`Expected '${r}' field to equal '${a.value}'`;break}}if(t)throw new D(N.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs=-62135596800,Qs=1e6;class ve{static now(){return ve.fromMillis(Date.now())}static fromDate(e){return ve.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Qs);return new ve(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Zs)throw new D(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Qs}_compareTo(e){return this.seconds===e.seconds?de(this.nanoseconds,e.nanoseconds):de(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(cn(e,ve._jsonSchema))return new ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Zs;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ve._jsonSchemaVersion="firestore/timestamp/1.0",ve._jsonSchema={type:z("string",ve._jsonSchemaVersion),seconds:z("number"),nanoseconds:z("number")};function _d(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new wd("Invalid base64 string: "+a):a}})(e);return new at(t)}static fromUint8Array(e){const t=(function(s){let a="";for(let l=0;l<s.length;++l)a+=String.fromCharCode(s[l]);return a})(e);return new at(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return de(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const Ji="(default)";class qn{constructor(e,t){this.projectId=e,this.database=t||Ji}static empty(){return new qn("","")}get isDefaultDatabase(){return this.database===Ji}isEqual(e){return e instanceof qn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e,t=null,r=[],s=[],a=null,l="F",u=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=a,this.limitType=l,this.startAt=u,this.endAt=d,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function bd(n){return new Id(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var eo,x;(x=eo||(eo={}))[x.OK=0]="OK",x[x.CANCELLED=1]="CANCELLED",x[x.UNKNOWN=2]="UNKNOWN",x[x.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",x[x.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",x[x.NOT_FOUND=5]="NOT_FOUND",x[x.ALREADY_EXISTS=6]="ALREADY_EXISTS",x[x.PERMISSION_DENIED=7]="PERMISSION_DENIED",x[x.UNAUTHENTICATED=16]="UNAUTHENTICATED",x[x.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",x[x.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",x[x.ABORTED=10]="ABORTED",x[x.OUT_OF_RANGE=11]="OUT_OF_RANGE",x[x.UNIMPLEMENTED=12]="UNIMPLEMENTED",x[x.INTERNAL=13]="INTERNAL",x[x.UNAVAILABLE=14]="UNAVAILABLE",x[x.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new dr([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=1048576;function ji(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e,t,r=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&he("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t,r,s,a){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=a,this.deferred=new Xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,a){const l=Date.now()+r,u=new pr(e,t,l,s,a);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var to,no;(no=to||(to={})).Fa="default",no.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="firestore.googleapis.com",ro=!0;class so{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new D(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ra,this.ssl=ro}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ro;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ed;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Td)throw new D(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ad((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Oa{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new so({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new so(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new id;switch(r.type){case"firstParty":return new ad(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=io.get(t);r&&(he("ComponentProvider","Removing Datastore"),io.delete(t),r.terminate())})(this),Promise.resolve()}}function Cd(n,e,t,r={}){var s;n=vd(n,Oa);const a=sn(e),l=n._getSettings(),u=Object.assign(Object.assign({},l),{emulatorOptions:n._getEmulatorOptions()}),d=`${e}:${t}`;a&&(Xo(`https://${d}`),Yo("Firestore",!0)),l.host!==Ra&&l.host!==d&&nd("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const _=Object.assign(Object.assign({},l),{host:d,ssl:a,emulatorOptions:r});if(!We(_,u)&&(n._setSettings(_),r.mockUserToken)){let T,S;if(typeof r.mockUserToken=="string")T=r.mockUserToken,S=ee.MOCK_USER;else{T=ll(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new D(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");S=new ee(E)}n._authCredentials=new rd(new Pa(T,S))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new gr(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new mr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(cn(t,_e._jsonSchema))return new _e(e,r||null,new nt(le.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:z("string",_e._jsonSchemaVersion),referencePath:z("string")};class mr extends gr{constructor(e,t,r){super(e,t,bd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new nt(e))}withConverter(e){return new mr(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo="AsyncQueue";class ao{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Sd(this,"async_queue_retry"),this.oc=()=>{const r=ji();r&&he(oo,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ji();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ji();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const t=new Xt;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!_d(e))throw e;he(oo,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const t=this._c.then((()=>(this.nc=!0,e().catch((r=>{throw this.tc=r,this.nc=!1,Ca("INTERNAL UNHANDLED ERROR: ",co(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=pr.createAndSchedule(this,e,t,r,(a=>this.lc(a)));return this.ec.push(s),s}ac(){this.tc&&tn(47125,{hc:co(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function co(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class kd extends Oa{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new ao,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ao(e),this._firestoreClient=void 0,await e}}}function Pd(n,e){const t=typeof n=="object"?n:or(),r=typeof n=="string"?n:Ji,s=ut(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const a=al("firestore");a&&Cd(s,...a)}return s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ke(at.fromBase64String(e))}catch(t){throw new D(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ke(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ke._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(cn(e,ke._jsonSchema))return ke.fromBase64String(e.bytes)}}ke._jsonSchemaVersion="firestore/bytes/1.0",ke._jsonSchema={type:z("string",ke._jsonSchemaVersion),bytes:z("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return de(this._lat,e._lat)||de(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:it._jsonSchemaVersion}}static fromJSON(e){if(cn(e,it._jsonSchema))return new it(e.latitude,e.longitude)}}it._jsonSchemaVersion="firestore/geoPoint/1.0",it._jsonSchema={type:z("string",it._jsonSchemaVersion),latitude:z("number"),longitude:z("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let a=0;a<r.length;++a)if(r[a]!==s[a])return!1;return!0})(this._values,e._values)}toJSON(){return{type:rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(cn(e,rt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new rt(e.vectorValues);throw new D(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rt._jsonSchemaVersion="firestore/vectorValue/1.0",rt._jsonSchema={type:z("string",rt._jsonSchemaVersion),vectorValues:z("object")};const Rd=new RegExp("[~\\*/\\[\\]]");function Od(n,e,t){if(e.search(Rd)>=0)throw lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new xa(...e.split("."))._internalPath}catch{throw lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function lo(n,e,t,r,s){let a=`Function ${e}() called with invalid data`;a+=". ";let l="";return new D(N.INVALID_ARGUMENT,a+n+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e,t,r,s,a){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new xd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Da("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class xd extends Na{data(){return super.data()}}function Da(n,e){return typeof e=="string"?Od(n,e):e instanceof xa?e._internalPath:e._delegate._internalPath}class Rn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wt extends Na{constructor(e,t,r,s,a,l){super(e,t,r,s,l),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ln(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Da("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wt._jsonSchemaVersion="firestore/documentSnapshot/1.0",wt._jsonSchema={type:z("string",wt._jsonSchemaVersion),bundleSource:z("string","DocumentSnapshot"),bundleName:z("string"),bundle:z("string")};class Ln extends wt{data(e={}){return super.data(e)}}class Yt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Rn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Ln(this._firestore,this._userDataWriter,r.key,r,new Rn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,a){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map((u=>{const d=new Ln(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Rn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:d,oldIndex:-1,newIndex:l++}}))}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>a||u.type!==3)).map((u=>{const d=new Ln(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Rn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let _=-1,T=-1;return u.type!==0&&(_=l.indexOf(u.doc.key),l=l.delete(u.doc.key)),u.type!==1&&(l=l.add(u.doc),T=l.indexOf(u.doc.key)),{type:Nd(u.type),doc:d,oldIndex:_,newIndex:T}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Yt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ud.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((a=>{a._document!==null&&(t.push(a._document),r.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Nd(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return tn(61501,{type:n})}}Yt._jsonSchemaVersion="firestore/querySnapshot/1.0",Yt._jsonSchema={type:z("string",Yt._jsonSchemaVersion),bundleSource:z("string","QuerySnapshot"),bundleName:z("string"),bundle:z("string")};(function(e,t=!0){(function(s){an=s})(St),Ee(new fe("firestore",((r,{instanceIdentifier:s,options:a})=>{const l=r.getProvider("app").getImmediate(),u=new kd(new sd(r.getProvider("auth-internal")),new cd(l,r.getProvider("app-check-internal")),(function(_,T){if(!Object.prototype.hasOwnProperty.apply(_.options,["projectId"]))throw new D(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qn(_.options.projectId,T)})(l,s),l);return a=Object.assign({useFetchStreams:t},a),u._setSettings(a),u}),"PUBLIC").setMultipleInstances(!0)),ae(Gs,Ks,e),ae(Gs,Ks,"esm2017")})();function yr(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function La(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Dd=La,Ma=new ht("auth","Firebase",La());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn=new Qn("@firebase/auth");function Ld(n,...e){zn.logLevel<=U.WARN&&zn.warn(`Auth (${St}): ${n}`,...e)}function Mn(n,...e){zn.logLevel<=U.ERROR&&zn.error(`Auth (${St}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(n,...e){throw vr(n,...e)}function Ie(n,...e){return vr(n,...e)}function Ua(n,e,t){const r=Object.assign(Object.assign({},Dd()),{[e]:t});return new ht("auth","Firebase",r).create(e,{appName:n.name})}function Oe(n){return Ua(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vr(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ma.create(n,...e)}function k(n,e,...t){if(!n)throw vr(e,...t)}function Pe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Mn(e),new Error(e)}function Ne(n,e){n||Pe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Md(){return ho()==="http:"||ho()==="https:"}function ho(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Md()||nr()||"connection"in navigator)?navigator.onLine:!0}function Fd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ne(t>e,"Short delay should be less than long delay!"),this.isMobile=dl()||pl()}get(){return Ud()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _r(n,e){Ne(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vd=new ln(3e4,6e4);function Ge(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ke(n,e,t,r,s={}){return ja(n,s,async()=>{let a={},l={};r&&(e==="GET"?l=r:a={body:JSON.stringify(r)});const u=on(Object.assign({key:n.config.apiKey},l)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const _=Object.assign({method:e,headers:d},a);return fl()||(_.referrerPolicy="no-referrer"),n.emulatorConfig&&sn(n.emulatorConfig.host)&&(_.credentials="include"),Fa.fetch()(await Ba(n,n.config.apiHost,t,u),_)})}async function ja(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},jd),e);try{const s=new Hd(n),a=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw On(n,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const u=a.ok?l.errorMessage:l.error.message,[d,_]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw On(n,"credential-already-in-use",l);if(d==="EMAIL_EXISTS")throw On(n,"email-already-in-use",l);if(d==="USER_DISABLED")throw On(n,"user-disabled",l);const T=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(_)throw Ua(n,T,_);pe(n,T)}}catch(s){if(s instanceof ge)throw s;pe(n,"network-request-failed",{message:String(s)})}}async function hn(n,e,t,r,s={}){const a=await Ke(n,e,t,r,s);return"mfaPendingCredential"in a&&pe(n,"multi-factor-auth-required",{_serverResponse:a}),a}async function Ba(n,e,t,r){const s=`${e}${t}?${r}`,a=n,l=a.config.emulator?_r(n.config,s):`${n.config.apiScheme}://${s}`;return Bd.includes(t)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(l).toString():l}function $d(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Hd{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ie(this.auth,"network-request-failed")),Vd.get())})}}function On(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ie(n,e,r);return s.customData._tokenResponse=t,s}function uo(n){return n!==void 0&&n.enterprise!==void 0}class qd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return $d(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function zd(n,e){return Ke(n,"GET","/v2/recaptchaConfig",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wd(n,e){return Ke(n,"POST","/v1/accounts:delete",e)}async function Wn(n,e){return Ke(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Gd(n,e=!1){const t=me(n),r=await t.getIdToken(e),s=wr(r);k(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a==null?void 0:a.sign_in_provider;return{claims:s,token:r,authTime:Zt(Bi(s.auth_time)),issuedAtTime:Zt(Bi(s.iat)),expirationTime:Zt(Bi(s.exp)),signInProvider:l||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function Bi(n){return Number(n)*1e3}function wr(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Mn("JWT malformed, contained fewer than 3 sections"),null;try{const s=Wo(t);return s?JSON.parse(s):(Mn("Failed to decode base64 JWT payload"),null)}catch(s){return Mn("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function fo(n){const e=wr(n);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ge&&Kd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Kd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zt(this.lastLoginAt),this.creationTime=Zt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gn(n){var e;const t=n.auth,r=await n.getIdToken(),s=await nn(n,Wn(t,{idToken:r}));k(s==null?void 0:s.users.length,t,"internal-error");const a=s.users[0];n._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Va(a.providerUserInfo):[],u=Yd(n.providerData,l),d=n.isAnonymous,_=!(n.email&&a.passwordHash)&&!(u!=null&&u.length),T=d?_:!1,S={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:u,metadata:new Yi(a.createdAt,a.lastLoginAt),isAnonymous:T};Object.assign(n,S)}async function Xd(n){const e=me(n);await Gn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yd(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Va(n){return n.map(e=>{var{providerId:t}=e,r=yr(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zd(n,e){const t=await ja(n,{},async()=>{const r=on({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=n.config,l=await Ba(n,s,"/v1/token",`key=${a}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const d={method:"POST",headers:u,body:r};return n.emulatorConfig&&sn(n.emulatorConfig.host)&&(d.credentials="include"),Fa.fetch()(l,d)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qd(n,e){return Ke(n,"POST","/v2/accounts:revokeToken",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){k(e.length!==0,"internal-error");const t=fo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:a}=await Zd(e,t);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:a}=t,l=new It;return r&&(k(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(k(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(k(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new It,this.toJSON())}_performRefresh(){return Pe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(n,e){k(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ue{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,a=yr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Jd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Yi(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await nn(this,this.stsTokenManager.getToken(this.auth,e));return k(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Gd(this,e)}reload(){return Xd(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Gn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(oe(this.auth.app))return Promise.reject(Oe(this.auth));const e=await this.getIdToken();return await nn(this,Wd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,a,l,u,d,_,T;const S=(r=t.displayName)!==null&&r!==void 0?r:void 0,E=(s=t.email)!==null&&s!==void 0?s:void 0,R=(a=t.phoneNumber)!==null&&a!==void 0?a:void 0,P=(l=t.photoURL)!==null&&l!==void 0?l:void 0,F=(u=t.tenantId)!==null&&u!==void 0?u:void 0,L=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,j=(_=t.createdAt)!==null&&_!==void 0?_:void 0,$=(T=t.lastLoginAt)!==null&&T!==void 0?T:void 0,{uid:C,emailVerified:O,isAnonymous:V,providerData:G,stsTokenManager:v}=t;k(C&&v,e,"internal-error");const f=It.fromJSON(this.name,v);k(typeof C=="string",e,"internal-error"),Fe(S,e.name),Fe(E,e.name),k(typeof O=="boolean",e,"internal-error"),k(typeof V=="boolean",e,"internal-error"),Fe(R,e.name),Fe(P,e.name),Fe(F,e.name),Fe(L,e.name),Fe(j,e.name),Fe($,e.name);const p=new ue({uid:C,auth:e,email:E,emailVerified:O,displayName:S,isAnonymous:V,photoURL:P,phoneNumber:R,tenantId:F,stsTokenManager:f,createdAt:j,lastLoginAt:$});return G&&Array.isArray(G)&&(p.providerData=G.map(m=>Object.assign({},m))),L&&(p._redirectEventId=L),p}static async _fromIdTokenResponse(e,t,r=!1){const s=new It;s.updateFromServerResponse(t);const a=new ue({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Gn(a),a}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];k(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?Va(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!(a!=null&&a.length),u=new It;u.updateFromIdToken(r);const d=new ue({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:l}),_={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(a!=null&&a.length)};return Object.assign(d,_),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po=new Map;function Re(n){Ne(n instanceof Function,"Expected a class definition");let e=po.get(n);return e?(Ne(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,po.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}$a.type="NONE";const go=$a;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(n,e,t){return`firebase:${n}:${e}:${t}`}class bt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=Un(this.userKey,s.apiKey,a),this.fullPersistenceKey=Un("persistence",s.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Wn(this.auth,{idToken:e}).catch(()=>{});return t?ue._fromGetAccountInfoResponse(this.auth,t,e):null}return ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new bt(Re(go),e,r);const s=(await Promise.all(t.map(async _=>{if(await _._isAvailable())return _}))).filter(_=>_);let a=s[0]||Re(go);const l=Un(r,e.config.apiKey,e.name);let u=null;for(const _ of t)try{const T=await _._get(l);if(T){let S;if(typeof T=="string"){const E=await Wn(e,{idToken:T}).catch(()=>{});if(!E)break;S=await ue._fromGetAccountInfoResponse(e,E,T)}else S=ue._fromJSON(e,T);_!==a&&(u=S),a=_;break}}catch{}const d=s.filter(_=>_._shouldAllowMigration);return!a._shouldAllowMigration||!d.length?new bt(a,e,r):(a=d[0],u&&await a._set(l,u.toJSON()),await Promise.all(t.map(async _=>{if(_!==a)try{await _._remove(l)}catch{}})),new bt(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wa(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ha(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ka(e))return"Blackberry";if(Ja(e))return"Webos";if(qa(e))return"Safari";if((e.includes("chrome/")||za(e))&&!e.includes("edge/"))return"Chrome";if(Ga(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ha(n=te()){return/firefox\//i.test(n)}function qa(n=te()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function za(n=te()){return/crios\//i.test(n)}function Wa(n=te()){return/iemobile/i.test(n)}function Ga(n=te()){return/android/i.test(n)}function Ka(n=te()){return/blackberry/i.test(n)}function Ja(n=te()){return/webos/i.test(n)}function Ir(n=te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ef(n=te()){var e;return Ir(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function tf(){return gl()&&document.documentMode===10}function Xa(n=te()){return Ir(n)||Ga(n)||Ja(n)||Ka(n)||/windows phone/i.test(n)||Wa(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n,e=[]){let t;switch(n){case"Browser":t=mo(te());break;case"Worker":t=`${mo(te())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${St}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=a=>new Promise((l,u)=>{try{const d=e(a);l(d)}catch(d){u(d)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rf(n,e={}){return Ke(n,"GET","/v2/passwordPolicy",Ge(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf=6;class of{constructor(e){var t,r,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=l.minPasswordLength)!==null&&t!==void 0?t:sf,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,a,l,u;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(a=d.containsUppercaseLetter)!==null&&a!==void 0?a:!0),d.isValid&&(d.isValid=(l=d.containsNumericCharacter)!==null&&l!==void 0?l:!0),d.isValid&&(d.isValid=(u=d.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),d}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yo(this),this.idTokenSubscription=new yo(this),this.beforeStateQueue=new nf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ma,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Re(t)),this._initializationPromise=this.queue(async()=>{var r,s,a;if(!this._deleted&&(this.persistenceManager=await bt.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Wn(this,{idToken:e}),r=await ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(oe(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=s==null?void 0:s._redirectEventId,d=await this.tryRedirectSignIn(e);(!l||l===u)&&(d!=null&&d.user)&&(s=d.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Gn(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(oe(this.app))return Promise.reject(Oe(this));const t=e?me(e):null;return t&&k(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return oe(this.app)?Promise.reject(Oe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return oe(this.app)?Promise.reject(Oe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Re(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rf(this),t=new of(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ht("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Qd(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Re(e)||this._popupRedirectResolver;k(t,this,"argument-error"),this.redirectPersistenceManager=await bt.create(this,[Re(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let l=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(u,this,"internal-error"),u.then(()=>{l||a(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,s);return()=>{l=!0,d()}}else{const d=e.addObserver(t);return()=>{l=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ya(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Ld(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function dt(n){return me(n)}class yo{constructor(e){this.auth=e,this.observer=null,this.addObserver=wl(t=>this.observer=t)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function cf(n){ni=n}function Za(n){return ni.loadJS(n)}function lf(){return ni.recaptchaEnterpriseScript}function hf(){return ni.gapiScript}function uf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class df{constructor(){this.enterprise=new ff}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ff{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const pf="recaptcha-enterprise",Qa="NO_RECAPTCHA";class gf{constructor(e){this.type=pf,this.auth=dt(e)}async verify(e="verify",t=!1){async function r(a){if(!t){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,u)=>{zd(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const _=new qd(d);return a.tenantId==null?a._agentRecaptchaConfig=_:a._tenantRecaptchaConfigs[a.tenantId]=_,l(_.siteKey)}}).catch(d=>{u(d)})})}function s(a,l,u){const d=window.grecaptcha;uo(d)?d.enterprise.ready(()=>{d.enterprise.execute(a,{action:e}).then(_=>{l(_)}).catch(()=>{l(Qa)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new df().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{r(this.auth).then(u=>{if(!t&&uo(window.grecaptcha))s(u,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let d=lf();d.length!==0&&(d+=u),Za(d).then(()=>{s(u,a,l)}).catch(_=>{l(_)})}}).catch(u=>{l(u)})})}}async function vo(n,e,t,r=!1,s=!1){const a=new gf(n);let l;if(s)l=Qa;else try{l=await a.verify(t)}catch{l=await a.verify(t,!0)}const u=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const d=u.phoneEnrollmentInfo.phoneNumber,_=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:d,recaptchaToken:_,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const d=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:d,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:l}):Object.assign(u,{captchaResponse:l}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Zi(n,e,t,r,s){var a;if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await vo(n,e,t,t==="getOobCode");return r(n,l)}else return r(n,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await vo(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(l)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(n,e){const t=ut(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),a=t.getOptions();if(We(a,e??{}))return s;pe(s,"already-initialized")}return t.initialize({options:e})}function yf(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Re);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function vf(n,e,t){const r=dt(n);k(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=ec(e),{host:l,port:u}=_f(e),d=u===null?"":`:${u}`,_={url:`${a}//${l}${d}/`},T=Object.freeze({host:l,port:u,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){k(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),k(We(_,r.config.emulator)&&We(T,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=_,r.emulatorConfig=T,r.settings.appVerificationDisabledForTesting=!0,sn(l)?(Xo(`${a}//${l}${d}`),Yo("Auth",!0)):wf()}function ec(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function _f(n){const e=ec(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:_o(r.substr(a.length+1))}}else{const[a,l]=r.split(":");return{host:a,port:_o(l)}}}function _o(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function wf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pe("not implemented")}_getIdTokenResponse(e){return Pe("not implemented")}_linkToIdToken(e,t){return Pe("not implemented")}_getReauthenticationResolver(e){return Pe("not implemented")}}async function If(n,e){return Ke(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bf(n,e){return hn(n,"POST","/v1/accounts:signInWithPassword",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ef(n,e){return hn(n,"POST","/v1/accounts:signInWithEmailLink",Ge(n,e))}async function Tf(n,e){return hn(n,"POST","/v1/accounts:signInWithEmailLink",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends br{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new rn(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new rn(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zi(e,t,"signInWithPassword",bf);case"emailLink":return Ef(e,{email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zi(e,r,"signUpPassword",If);case"emailLink":return Tf(e,{idToken:t,email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Et(n,e){return hn(n,"POST","/v1/accounts:signInWithIdp",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="http://localhost";class ct extends br{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ct(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,a=yr(t,["providerId","signInMethod"]);if(!r||!s)return null;const l=new ct(r,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const t=this.buildRequest();return Et(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Et(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Et(e,t)}buildRequest(){const e={requestUri:Sf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=on(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Cf(n){const e=zt(Wt(n)).link,t=e?zt(Wt(e)).deep_link_id:null,r=zt(Wt(n)).deep_link_id;return(r?zt(Wt(r)).link:null)||r||t||e||n}class Er{constructor(e){var t,r,s,a,l,u;const d=zt(Wt(e)),_=(t=d.apiKey)!==null&&t!==void 0?t:null,T=(r=d.oobCode)!==null&&r!==void 0?r:null,S=Af((s=d.mode)!==null&&s!==void 0?s:null);k(_&&T&&S,"argument-error"),this.apiKey=_,this.operation=S,this.code=T,this.continueUrl=(a=d.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=d.lang)!==null&&l!==void 0?l:null,this.tenantId=(u=d.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const t=Cf(e);try{return new Er(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(){this.providerId=At.PROVIDER_ID}static credential(e,t){return rn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Er.parseLink(t);return k(r,"argument-error"),rn._fromEmailAndCode(e,r.code,r.tenantId)}}At.PROVIDER_ID="password";At.EMAIL_PASSWORD_SIGN_IN_METHOD="password";At.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends tc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends un{constructor(){super("facebook.com")}static credential(e){return ct._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Be.credential(e.oauthAccessToken)}catch{return null}}}Be.FACEBOOK_SIGN_IN_METHOD="facebook.com";Be.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends un{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ct._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ve.credential(t,r)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e extends un{constructor(){super("github.com")}static credential(e){return ct._fromParams({providerId:$e.PROVIDER_ID,signInMethod:$e.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $e.credentialFromTaggedObject(e)}static credentialFromError(e){return $e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $e.credential(e.oauthAccessToken)}catch{return null}}}$e.GITHUB_SIGN_IN_METHOD="github.com";$e.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He extends un{constructor(){super("twitter.com")}static credential(e,t){return ct._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return He.credential(t,r)}catch{return null}}}He.TWITTER_SIGN_IN_METHOD="twitter.com";He.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e){return hn(n,"POST","/v1/accounts:signUp",Ge(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const a=await ue._fromIdTokenResponse(e,r,s),l=wo(r);return new lt({user:a,providerId:l,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=wo(r);return new lt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function wo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends ge{constructor(e,t,r,s){var a;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Kn.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Kn(e,t,r,s)}}function nc(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Kn._fromErrorAndOperation(n,a,e,r):a})}async function Pf(n,e,t=!1){const r=await nn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return lt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rf(n,e,t=!1){const{auth:r}=n;if(oe(r.app))return Promise.reject(Oe(r));const s="reauthenticate";try{const a=await nn(n,nc(r,s,e,n),t);k(a.idToken,r,"internal-error");const l=wr(a.idToken);k(l,r,"internal-error");const{sub:u}=l;return k(n.uid===u,r,"user-mismatch"),lt._forOperation(n,s,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&pe(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ic(n,e,t=!1){if(oe(n.app))return Promise.reject(Oe(n));const r="signIn",s=await nc(n,r,e),a=await lt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(a.user),a}async function Of(n,e){return ic(dt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rc(n){const e=dt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function xf(n,e,t){if(oe(n.app))return Promise.reject(Oe(n));const r=dt(n),l=await Zi(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",kf).catch(d=>{throw d.code==="auth/password-does-not-meet-requirements"&&rc(n),d}),u=await lt._fromIdTokenResponse(r,"signIn",l);return await r._updateCurrentUser(u.user),u}function Nf(n,e,t){return oe(n.app)?Promise.reject(Oe(n)):Of(me(n),At.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rc(n),r})}function Df(n,e,t,r){return me(n).onIdTokenChanged(e,t,r)}function Lf(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function Mf(n,e,t,r){return me(n).onAuthStateChanged(e,t,r)}function Uf(n){return me(n).signOut()}const Jn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Jn,"1"),this.storage.removeItem(Jn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff=1e3,jf=10;class oc extends sc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Xa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((l,u,d)=>{this.notifyListeners(l,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!t&&this.localCache[r]===l||this.notifyListeners(r,l)},a=this.storage.getItem(r);tf()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,jf):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ff)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}oc.type="LOCAL";const Bf=oc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac extends sc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ac.type="SESSION";const cc=ac;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ii(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:a}=t.data,l=this.handlersMap[s];if(!(l!=null&&l.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(l).map(async _=>_(t.origin,a)),d=await Vf(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ii.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((u,d)=>{const _=Tr("",20);s.port1.start();const T=setTimeout(()=>{d(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(S){const E=S;if(E.data.eventId===_)switch(E.data.status){case"ack":clearTimeout(T),a=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),u(E.data.response);break;default:clearTimeout(T),clearTimeout(a),d(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:_,data:t},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return window}function Hf(n){be().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(){return typeof be().WorkerGlobalScope<"u"&&typeof be().importScripts=="function"}async function qf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function zf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Wf(){return lc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc="firebaseLocalStorageDb",Gf=1,Xn="firebaseLocalStorage",uc="fbase_key";class dn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ri(n,e){return n.transaction([Xn],e?"readwrite":"readonly").objectStore(Xn)}function Kf(){const n=indexedDB.deleteDatabase(hc);return new dn(n).toPromise()}function Qi(){const n=indexedDB.open(hc,Gf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xn,{keyPath:uc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xn)?e(r):(r.close(),await Kf(),e(await Qi()))})})}async function Io(n,e,t){const r=ri(n,!0).put({[uc]:e,value:t});return new dn(r).toPromise()}async function Jf(n,e){const t=ri(n,!1).get(e),r=await new dn(t).toPromise();return r===void 0?null:r.value}function bo(n,e){const t=ri(n,!0).delete(e);return new dn(t).toPromise()}const Xf=800,Yf=3;class dc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Yf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ii._getInstance(Wf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await qf(),!this.activeServiceWorker)return;this.sender=new $f(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||zf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qi();return await Io(e,Jn,"1"),await bo(e,Jn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Io(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Jf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>bo(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=ri(s,!1).getAll();return new dn(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dc.type="LOCAL";const Zf=dc;new ln(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(n,e){return e?Re(e):(k(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr extends br{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Et(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Et(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Et(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ep(n){return ic(n.auth,new Sr(n),n.bypassAuthState)}function tp(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),Rf(t,new Sr(n),n.bypassAuthState)}async function np(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),Pf(t,new Sr(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:a,error:l,type:u}=e;if(l){this.reject(l);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(d))}catch(_){this.reject(_)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ep;case"linkViaPopup":case"linkViaRedirect":return np;case"reauthViaPopup":case"reauthViaRedirect":return tp;default:pe(this.auth,"internal-error")}}resolve(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=new ln(2e3,1e4);class _t extends fc{constructor(e,t,r,s,a){super(e,t,s,a),this.provider=r,this.authWindow=null,this.pollId=null,_t.currentPopupAction&&_t.currentPopupAction.cancel(),_t.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){Ne(this.filter.length===1,"Popup operations only handle one event");const e=Tr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,_t.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ip.get())};e()}}_t.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp="pendingRedirect",Fn=new Map;class sp extends fc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Fn.get(this.auth._key());if(!e){try{const r=await op(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Fn.set(this.auth._key(),e)}return this.bypassAuthState||Fn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function op(n,e){const t=lp(e),r=cp(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function ap(n,e){Fn.set(n._key(),e)}function cp(n){return Re(n._redirectPersistence)}function lp(n){return Un(rp,n.config.apiKey,n.name)}async function hp(n,e,t=!1){if(oe(n.app))return Promise.reject(Oe(n));const r=dt(n),s=Qf(r,e),l=await new sp(r,s,t).execute();return l&&!t&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up=600*1e3;class dp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!pc(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ie(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=up&&this.cachedEventUids.clear(),this.cachedEventUids.has(Eo(e))}saveEventToCache(e){this.cachedEventUids.add(Eo(e)),this.lastProcessedEventTime=Date.now()}}function Eo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function pc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function fp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pc(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pp(n,e={}){return Ke(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mp=/^https?/;async function yp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await pp(n);for(const t of e)try{if(vp(t))return}catch{}pe(n,"unauthorized-domain")}function vp(n){const e=Xi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const l=new URL(n);return l.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&l.hostname===r}if(!mp.test(t))return!1;if(gp.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=new ln(3e4,6e4);function To(){const n=be().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function wp(n){return new Promise((e,t)=>{var r,s,a;function l(){To(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{To(),t(Ie(n,"network-request-failed"))},timeout:_p.get()})}if(!((s=(r=be().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=be().gapi)===null||a===void 0)&&a.load)l();else{const u=uf("iframefcb");return be()[u]=()=>{gapi.load?l():t(Ie(n,"network-request-failed"))},Za(`${hf()}?onload=${u}`).catch(d=>t(d))}}).catch(e=>{throw jn=null,e})}let jn=null;function Ip(n){return jn=jn||wp(n),jn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=new ln(5e3,15e3),Ep="__/auth/iframe",Tp="emulator/auth/iframe",Sp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ap=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Cp(n){const e=n.config;k(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?_r(e,Tp):`https://${n.config.authDomain}/${Ep}`,r={apiKey:e.apiKey,appName:n.name,v:St},s=Ap.get(n.config.apiHost);s&&(r.eid=s);const a=n._getFrameworks();return a.length&&(r.fw=a.join(",")),`${t}?${on(r).slice(1)}`}async function kp(n){const e=await Ip(n),t=be().gapi;return k(t,n,"internal-error"),e.open({where:document.body,url:Cp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Sp,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const l=Ie(n,"network-request-failed"),u=be().setTimeout(()=>{a(l)},bp.get());function d(){be().clearTimeout(u),s(r)}r.ping(d).then(d,()=>{a(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rp=500,Op=600,xp="_blank",Np="http://localhost";class So{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Dp(n,e,t,r=Rp,s=Op){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const d=Object.assign(Object.assign({},Pp),{width:r.toString(),height:s.toString(),top:a,left:l}),_=te().toLowerCase();t&&(u=za(_)?xp:t),Ha(_)&&(e=e||Np,d.scrollbars="yes");const T=Object.entries(d).reduce((E,[R,P])=>`${E}${R}=${P},`,"");if(ef(_)&&u!=="_self")return Lp(e||"",u),new So(null);const S=window.open(e||"",u,T);k(S,n,"popup-blocked");try{S.focus()}catch{}return new So(S)}function Lp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="__/auth/handler",Up="emulator/auth/handler",Fp=encodeURIComponent("fac");async function Ao(n,e,t,r,s,a){k(n.config.authDomain,n,"auth-domain-config-required"),k(n.config.apiKey,n,"invalid-api-key");const l={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:St,eventId:s};if(e instanceof tc){e.setDefaultLanguage(n.languageCode),l.providerId=e.providerId||"",_l(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[T,S]of Object.entries({}))l[T]=S}if(e instanceof un){const T=e.getScopes().filter(S=>S!=="");T.length>0&&(l.scopes=T.join(","))}n.tenantId&&(l.tid=n.tenantId);const u=l;for(const T of Object.keys(u))u[T]===void 0&&delete u[T];const d=await n._getAppCheckToken(),_=d?`#${Fp}=${encodeURIComponent(d)}`:"";return`${jp(n)}?${on(u).slice(1)}${_}`}function jp({config:n}){return n.emulator?_r(n,Up):`https://${n.authDomain}/${Mp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi="webStorageSupport";class Bp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cc,this._completeRedirectFn=hp,this._overrideRedirectResult=ap}async _openPopup(e,t,r,s){var a;Ne((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await Ao(e,t,r,Xi(),s);return Dp(e,l,Tr())}async _openRedirect(e,t,r,s){await this._originValidation(e);const a=await Ao(e,t,r,Xi(),s);return Hf(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:a}=this.eventManagers[t];return s?Promise.resolve(s):(Ne(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await kp(e),r=new dp(e);return t.register("authEvent",s=>(k(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vi,{type:Vi},s=>{var a;const l=(a=s==null?void 0:s[0])===null||a===void 0?void 0:a[Vi];l!==void 0&&t(!!l),pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=yp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Xa()||qa()||Ir()}}const Vp=Bp;var Co="@firebase/auth",ko="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qp(n){Ee(new fe("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:u}=r.options;k(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:l,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ya(n)},_=new af(r,s,a,d);return yf(_,t),_},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ee(new fe("auth-internal",e=>{const t=dt(e.getProvider("auth").getImmediate());return(r=>new $p(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ae(Co,ko,Hp(n)),ae(Co,ko,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp=300,Wp=Jo("authIdTokenMaxAge")||zp;let Po=null;const Gp=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Wp)return;const s=t==null?void 0:t.token;Po!==s&&(Po=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Kp(n=or()){const e=ut(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mf(n,{popupRedirectResolver:Vp,persistence:[Zf,Bf,cc]}),r=Jo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const l=Gp(a.toString());Lf(t,l,()=>l(t.currentUser)),Df(t,u=>l(u))}}const s=Go("auth");return s&&vf(t,`http://${s}`),t}function Jp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}cf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const a=Ie("internal-error");a.customData=s,t(a)},r.type="text/javascript",r.charset="UTF-8",Jp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qp("Browser");const Xp={apiKey:"AIzaSyAI-c_HDkJIxgTN5xTg_EA0kbTAWMzOLUw",authDomain:"minh-aquarium.firebaseapp.com",projectId:"minh-aquarium",storageBucket:"minh-aquarium.firebasestorage.app",messagingSenderId:"340492499732",appId:"1:340492499732:web:d6d30168d8d27e1618a001",measurementId:"G-ZWFZJCQJ3P"},Ar=na(Xp);Pd(Ar);const Yn=Kp(Ar);Qu().then(n=>{n&&Yu(Ar)}).catch(()=>{});window.addEventListener("scroll",()=>{const n=document.querySelector(".site-header");n&&(window.scrollY>50?n.style.boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)":n.style.boxShadow="0 2px 10px rgba(0,0,0,0.05)")});function Yp(){try{const n=JSON.parse(localStorage.getItem("minhaq_cart"))||[];return Array.isArray(n)?n.map(e=>({name:typeof(e==null?void 0:e.name)=="string"?e.name:"Sản phẩm",priceText:typeof(e==null?void 0:e.priceText)=="string"?e.priceText:"0đ",imgUrl:typeof(e==null?void 0:e.imgUrl)=="string"?e.imgUrl:"",quantity:Math.max(1,parseInt(e==null?void 0:e.quantity,10)||1)})).filter(e=>e.name.trim().length>0):[]}catch{return[]}}let se=Yp();function Qt(){let n=se.reduce((t,r)=>t+(parseInt(r.quantity,10)||0),0);document.querySelectorAll(".cart-btn").forEach(t=>{let r=t.querySelector(".cart-count-badge");r||(r=document.createElement("span"),r.className="cart-count-badge",r.style.position="absolute",r.style.top="-8px",r.style.right="-8px",r.style.background="var(--accent-red)",r.style.color="#fff",r.style.borderRadius="50%",r.style.padding="3px 6px",r.style.fontSize="12px",r.style.fontWeight="bold",t.style.position="relative",t.appendChild(r)),r.textContent=n,r.style.display=n>0?"inline-block":"none",r.style.transform="scale(1.5)",setTimeout(()=>r.style.transform="scale(1)",300)})}function gc(n){return parseInt((n||"").replace(/[^0-9]/g,""),10)||0}function Zp(n){const e=n.querySelector(".product-image.real-image");if(!e)return"";const t=e.style.backgroundImage,r=window.getComputedStyle(e).backgroundImage,s=t&&t!=="none"?t:r,a=s?s.match(/url\(["']?(.*?)["']?\)/):null;return a&&a[1]?a[1]:""}Qt();let Ze;function Qp(n,e){if(!Ze){Ze=document.createElement("div"),Ze.className="custom-cart-modal-overlay",Ze.innerHTML=`
            <div class="custom-cart-modal">
                <div class="modal-header">
                    <h3 class="modal-title">Thêm vào giỏ hàng</h3>
                    <button id="modal-btn-close" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <p class="modal-desc">Số lượng <strong id="modal-product-name" style="color:var(--primary-dark)"></strong>:</p>
                <div class="quantity-controls">
                    <button id="modal-qty-minus"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" id="modal-qty-input" value="1" min="1">
                    <button id="modal-qty-plus"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div class="modal-actions">
                    <button id="modal-btn-cancel" class="btn btn-outline">Hủy</button>
                    <button id="modal-btn-confirm" class="btn btn-cart-black">Xác nhận</button>
                </div>
            </div>
        `,document.body.appendChild(Ze);const _=document.createElement("style");_.innerHTML=`
            .custom-cart-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 999999; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
            .custom-cart-modal-overlay.active { opacity: 1; pointer-events: auto; }
            .custom-cart-modal { background: #fff; padding: 25px; border-radius: 16px; width: 90%; max-width: 380px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.9) translateY(20px); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .custom-cart-modal-overlay.active .custom-cart-modal { transform: scale(1) translateY(0); }
            .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .modal-title { font-size: 18px; font-weight: 700; color: #0f172a; margin:0;}
            .modal-close { background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer; transition: color 0.2s;}
            .modal-close:hover { color: #ef4444; }
            .modal-desc { font-size: 15px; color: #475569; margin-bottom: 25px; line-height: 1.4;}
            .quantity-controls { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 30px; }
            .quantity-controls button { width: 45px; height: 45px; border-radius: 50%; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 16px; color: #0f172a; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
            .quantity-controls button:hover { background: #e0f2fe; color: #0ea5e9; border-color: #bae6fd; }
            .quantity-controls input { width: 80px; height: 50px; text-align: center; font-size: 20px; font-weight: 700; border: 2px solid #e2e8f0; border-radius: 12px; color: #0f172a; outline: none; transition: border-color 0.2s;}
            .quantity-controls input:focus { border-color: #0ea5e9; }
            .quantity-controls input::-webkit-outer-spin-button, .quantity-controls input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            .modal-actions { display: flex; gap: 12px; }
            .modal-actions button { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; border: none; }
            #modal-btn-cancel { background: #f1f5f9; color: #475569; }
            #modal-btn-cancel:hover { background: #e2e8f0; }
        `,document.head.appendChild(_);const T=document.getElementById("modal-qty-input");document.getElementById("modal-qty-minus").addEventListener("click",()=>{let S=parseInt(T.value)||1;S>1&&(T.value=S-1)}),document.getElementById("modal-qty-plus").addEventListener("click",()=>{let S=parseInt(T.value)||1;T.value=S+1})}const t=document.getElementById("modal-product-name"),r=document.getElementById("modal-qty-input"),s=document.getElementById("modal-btn-cancel"),a=document.getElementById("modal-btn-confirm"),l=document.getElementById("modal-btn-close");t.textContent=n,r.value="1";const u=()=>{Ze.classList.remove("active");const _=s.cloneNode(!0);s.parentNode.replaceChild(_,s);const T=a.cloneNode(!0);a.parentNode.replaceChild(T,a);const S=l.cloneNode(!0);l.parentNode.replaceChild(S,l)},d=(_,T)=>_.addEventListener("click",()=>{u(),T()});d(document.getElementById("modal-btn-cancel"),()=>e(null)),d(document.getElementById("modal-btn-close"),()=>e(null)),d(document.getElementById("modal-btn-confirm"),()=>{const _=parseInt(r.value);e(_>0?_:null)}),Ze.classList.add("active")}const eg=document.querySelectorAll(".btn-add-cart");eg.forEach(n=>{n.addEventListener("click",function(){const e=this.closest(".product-card");if(!e)return;const t=e.querySelector(".product-name"),r=e.querySelector(".price-current");if(!t||!r){alert("Sản phẩm này chưa đủ thông tin để thêm vào giỏ hàng.");return}const s=t.textContent.trim(),a=r.textContent.trim(),l=Zp(e);Qp(s,u=>{if(!u)return;const d=se.find(S=>S.name===s),_=parseInt(u,10);if(!_||_<1)return;d?d.quantity+=_:se.push({name:s,priceText:a,imgUrl:l,quantity:_}),localStorage.setItem("minhaq_cart",JSON.stringify(se)),Qt();const T=n.innerHTML;n.innerHTML=`<i class="fa-solid fa-check"></i> Đã thêm ${_}`,n.style.background="var(--accent-red)",n.style.color="white",n.style.borderColor="var(--accent-red)",setTimeout(()=>{n.innerHTML=T,n.style.background="",n.style.color="",n.style.borderColor=""},2e3)})})});let qt=!1,vt="",je="standard",xn=0;const Cr=5e5,tg=["ha noi","hanoi","hai phong","quang ninh","bac ninh","bac giang","hai duong","hung yen","vinh phuc","phu tho","thai nguyen","lang son","cao bang","bac kan","tuyen quang","yen bai","lao cai","dien bien","lai chau","son la","hoa binh","ha giang","nam dinh","thai binh","ninh binh","ha nam","nam dinh","quang ninh"],ng=["thanh hoa","nghe an","ha tinh","quang binh","quang tri","thua thien hue","hue","da nang","quang nam","quang ngai","binh dinh","phu yen","khanh hoa","ninh thuan","binh thuan","kon tum","gia lai","dak lak","dak nong","lam dong"],ig=["ho chi minh","hcm","tp hcm","can tho","ba ria","vung tau","dong nai","binh duong","binh phuoc","tay ninh","long an","tien giang","ben tre","tra vinh","vinh long","dong thap","an giang","kien giang","hau giang","soc trang","bac lieu","ca mau"];function rg(n){const e=we(n);return e?tg.some(t=>e.includes(t))?"north":ng.some(t=>e.includes(t))?"central":ig.some(t=>e.includes(t))?"south":"":""}function sg(n){return n==="north"?15e3:n==="central"?2e4:n==="south"?25e3:0}function og(n=se){return n.reduce((e,t)=>e+gc(t.priceText)*(t.quantity||0),0)}function Ro(n,e){const t=rg(n);let r=sg(t);return e>=Cr&&(r=0),{region:t,shippingCost:r}}function Zn(n){return`${n.toLocaleString("vi-VN")}đ`}function Oo(n,e,t){return e>=Cr?"Miễn phí":n>0?Zn(n):t?"Chưa xác định":"Nhập địa chỉ để tính"}function xo(n,e){return e>=Cr?"Miễn phí":n>0?Zn(n):"-"}function No(n){return n==="north"?"Miền Bắc":n==="central"?"Miền Trung":n==="south"?"Miền Nam":"Chưa xác định"}function Do(n){const e=parseFloat(n)||0;return e>0&&e<=20}if(window.location.pathname.includes("cart.html")||document.querySelector(".empty-cart-container")){let e=function(){if(se.length===0){n.style.display="flex",n.innerHTML=`
                <div class="empty-cart-container text-center">
                    <div style="font-size: 80px; color: #cbd5e1; margin-bottom: 20px;">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Giỏ hàng trống</h2>
                    <p style="color: var(--text-muted); margin-bottom: 30px;">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a href="products.html" class="btn btn-cart-black" style="display: inline-flex; width: auto; padding: 12px 30px; border-radius: 6px;">Tiếp tục mua sắm</a>
                </div>
            `;return}let r=0,s=se.map((a,l)=>{const u=gc(a.priceText);return r+=u*a.quantity,`
                <div style="display: flex; align-items: center; border-bottom: 1px solid #e2e8f0; padding: 15px 0; gap: 15px;">
                    <img src="${a.imgUrl||"./assets/images/anh/logo_transparent.png"}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; font-size: 16px;">${a.name}</h4>
                        <div style="color: var(--primary); font-weight: bold;">${a.priceText}</div>
                    </div>
                    ${qt?`
                    <div style="font-weight: bold;">SL: ${a.quantity}</div>
                    `:`
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" value="${a.quantity}" min="1" onchange="window.updateQuantity(${l}, this.value)" style="width: 50px; padding: 5px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <button onclick="window.removeCartItem(${l})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>`}
                </div>
            `}).join("");if(n.style.display="block",!qt)n.innerHTML=`
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 350px; gap: 30px; align-items: start;">
                    <div class="checkout-card">
                        <h2 style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f1f5f9;">Giỏ hàng của bạn</h2>
                        ${s}
                    </div>
                    <div class="checkout-card">
                        <h3 style="margin-bottom: 20px;">Tổng đơn hàng</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
                            <span>Tạm tính:</span>
                            <strong>${r.toLocaleString("vi-VN")}đ</strong>
                        </div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Miễn phí ship cho đơn hàng từ 500.000đ (Báo giá phí ship ở bước sau)</div>
                        <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                            <b>Tổng cộng:</b>
                            <b style="color: var(--primary);">${r.toLocaleString("vi-VN")}đ</b>
                        </div>
                        <button onclick="window.goToCheckout()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            Tiến hành thanh toán <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
                        </button>
                    </div>
                </div>
            `;else{const a=we(vt).length>0,{region:l,shippingCost:u}=Ro(vt,r),d=Do(xn);je==="express"&&!d&&(je="standard");const _=r+u,T=Oo(u,r,a),S=xo(u,r);n.innerHTML=`
                <h1 style="font-size: 28px; margin-bottom: 30px;">Thanh toán</h1>
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 380px; gap: 30px; align-items: start;">
                    <div>
                        <!-- Customer Info -->
                        <div class="checkout-card">
                            <h3 style="margin-bottom: 20px; font-size: 18px;">Thông tin khách hàng</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div class="form-group"><label>Họ và tên *</label><input type="text" class="form-input"></div>
                                <div class="form-group"><label>Số điện thoại *</label><input type="text" class="form-input"></div>
                            </div>
                            <div class="form-group"><label>Email *</label><input type="email" class="form-input"></div>
                            <div class="form-group"><label>Địa chỉ nhận hàng *</label><input type="text" class="form-input" id="checkout-address-input" value="${vt}" oninput="window.updateCheckoutAddress(this.value)" placeholder="Ví dụ: Hà Nội, Đà Nẵng, TP HCM..."></div>
                            <div class="form-group" style="margin-bottom: 0;"><label>Ghi chú (không bắt buộc)</label><textarea class="form-input" rows="3" placeholder="Yêu cầu đặc biệt về đơn hàng..."></textarea></div>
                        </div>

                        <!-- Shipping Method -->
                        <div class="checkout-card">
                            <h3 style="margin-bottom: 20px; font-size: 18px;">Phí vận chuyển theo khu vực</h3>
                            <div class="form-group">
                              <label style="display:block; margin-bottom:10px;">Bảng phí vận chuyển cố định theo khu vực</label>
                              <div style="font-size:14px; color:#334155; line-height:1.8;">
                                <div>Miền Bắc: <strong>15.000đ</strong></div>
                                <div>Miền Trung: <strong>20.000đ</strong></div>
                                <div>Miền Nam: <strong>25.000đ</strong></div>
                              </div>
                              <div style="margin-top:10px; font-size:14px; color:#0f172a;">Khu vực hiện tại: <strong id="checkout-region-label">${No(l)}</strong></div>
                              <div style="font-size:12px; color:#64748b; margin-top:4px;">Nhập tỉnh/thành trong địa chỉ để hệ thống tự tính phí ship.</div>
                            </div>

                            <div class="form-group" style="margin-top:10px;">
                              <label style="display:block; margin-bottom:10px;">Khoảng cách giao hàng (km) để xét ship hỏa tốc</label>
                              <input type="number" min="0" class="form-input" style="max-width:180px;" value="${xn}" oninput="window.updateShippingDistance(this.value)" placeholder="Nhập số km">
                              <div style="font-size:12px; color:#64748b; margin-top:6px;">Ship hỏa tốc chỉ áp dụng trong bán kính <strong>20km</strong>.</div>
                            </div>

                            <div class="shipping-option ${je==="standard"?"active":""}" onclick="window.setShippingMethod('standard')">
                              <div style="display:flex; align-items:center;">
                                <input type="radio" name="shipping-method" ${je==="standard"?"checked":""}>
                                <strong>Giao tiêu chuẩn</strong>
                              </div>
                              <strong id="checkout-ship-standard">${S}</strong>
                            </div>

                            <div class="shipping-option ${je==="express"?"active":""}" style="${d?"":"opacity:0.6; cursor:not-allowed;"}" onclick="window.setShippingMethod('express')">
                              <div style="display:flex; align-items:center;">
                                <input type="radio" name="shipping-method" ${je==="express"?"checked":""} ${d?"":"disabled"}>
                                <strong>Giao hỏa tốc (≤ 20km)</strong>
                              </div>
                              <strong id="checkout-ship-express">${S}</strong>
                            </div>

                            ${d?"":'<div style="font-size:12px; color:#ef4444; margin-top:8px;">Không thể chọn hỏa tốc vì khoảng cách lớn hơn 20km.</div>'}
                        </div>

                        <!-- Payment Method -->
                        <div class="checkout-card">
                            <h3 style="margin-bottom: 20px; font-size: 18px;">Phương thức thanh toán</h3>
                            <div class="shipping-option active">
                                <div style="display:flex; align-items:center;">
                                    <input type="radio" name="payment" checked>
                                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                                </div>
                            </div>
                            <div class="shipping-option">
                                <div style="display:flex; align-items:center;">
                                    <input type="radio" name="payment">
                                    <strong>Chuyển khoản ngân hàng</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Order Summary -->
                    <div>
                        <div class="checkout-card">
                            <h3 style="margin-bottom: 20px;">Đơn hàng của bạn</h3>
                            <div style="border-bottom: 1px solid #e2e8f0; margin-bottom: 15px; padding-bottom:10px;">
                                ${s}
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                                <span>Tạm tính:</span>
                                <strong>${r.toLocaleString("vi-VN")}đ</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                                <span>Phí vận chuyển:</span>
                              <strong id="checkout-shipping-cost">${T}</strong>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                                <b>Tổng cộng:</b>
                                <b id="checkout-total-amount" style="color: var(--primary); font-size: 22px;">${Zn(_)}</b>
                            </div>
                            <button onclick="window.submitOrder()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            `}},t=function(){if(!qt)return;const r=we(vt).length>0,s=og(),{region:a,shippingCost:l}=Ro(vt,s),u=s+l,d=document.getElementById("checkout-region-label");d&&(d.textContent=No(a));const _=document.getElementById("checkout-shipping-cost");_&&(_.textContent=Oo(l,s,r));const T=document.getElementById("checkout-ship-standard"),S=document.getElementById("checkout-ship-express"),E=xo(l,s);T&&(T.textContent=E),S&&(S.textContent=E);const R=document.getElementById("checkout-total-amount");R&&(R.textContent=Zn(u))};var dg=e,fg=t;const n=document.querySelector(".page-container");if(!document.getElementById("checkout-styles")){const r=document.createElement("style");r.id="checkout-styles",r.innerHTML=`
            .form-input { width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 5px; outline: none; transition: border 0.3s; }
            .form-input:focus { border-color: var(--primary); }
            .form-group { margin-bottom: 20px; }
            .checkout-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
            .shipping-option { display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 10px; cursor: pointer; }
            .shipping-option.active { border-color: var(--primary); background: #f0f9ff; }
            .shipping-option input { margin-right: 15px; transform: scale(1.2); }
        `,document.head.appendChild(r)}window.updateQuantity=function(r,s){s<1&&(s=1),se[r].quantity=parseInt(s),localStorage.setItem("minhaq_cart",JSON.stringify(se)),Qt(),e()},window.removeCartItem=function(r){se.splice(r,1),localStorage.setItem("minhaq_cart",JSON.stringify(se)),Qt(),e()},window.goToCheckout=function(){qt=!0,e(),window.scrollTo(0,0)},window.updateCheckoutAddress=function(r){vt=r||"",t()},window.setShippingMethod=function(r){if(r==="express"&&!Do(xn)){alert("Ship hỏa tốc chỉ áp dụng trong bán kính 20km."),je="standard",e();return}je=r,e()},window.updateShippingDistance=function(r){xn=Math.max(0,parseFloat(r)||0),e()},window.submitOrder=function(){alert("🎉 Chúc mừng bạn đã đặt hàng thành công! Nhân viên Minh Aquarium sẽ đóng gói hỏa tốc gửi đi ngay bây giờ."),se=[],localStorage.removeItem("minhaq_cart"),qt=!1,Qt(),e(),window.scrollTo(0,0)},e()}const Lo="minhaq_chat_session_id";function Mo(){if(document.getElementById("ma-chat-widget-root"))return;if(!document.getElementById("ma-chat-widget-style")){const C=document.createElement("style");C.id="ma-chat-widget-style",C.innerHTML=`
      .ma-chat-root { position: fixed; right: 18px; bottom: 18px; z-index: 100000; font-family: 'Outfit', sans-serif; }
      .ma-chat-toggle { width: 58px; height: 58px; border-radius: 50%; border: none; background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; box-shadow: 0 12px 30px rgba(2, 132, 199, 0.35); cursor: pointer; font-size: 22px; }
      .ma-chat-panel { position: absolute; right: 0; bottom: 72px; width: min(380px, calc(100vw - 24px)); height: 520px; background: #fff; border-radius: 16px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22); border: 1px solid #e2e8f0; display: none; overflow: hidden; }
      .ma-chat-panel.open { display: flex; flex-direction: column; }
      .ma-chat-header { padding: 14px 16px; color: #fff; background: linear-gradient(135deg, #0ea5e9, #0369a1); display: flex; justify-content: space-between; align-items: center; }
      .ma-chat-title { font-size: 16px; font-weight: 700; }
      .ma-chat-sub { font-size: 12px; opacity: 0.95; margin-top: 2px; }
      .ma-chat-close { border: none; background: transparent; color: #fff; cursor: pointer; font-size: 18px; }
      .ma-chat-body { flex: 1; overflow-y: auto; background: #f8fafc; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
      .ma-chat-message { max-width: 86%; font-size: 14px; line-height: 1.45; padding: 10px 12px; border-radius: 12px; white-space: pre-wrap; word-break: break-word; }
      .ma-chat-message.bot { align-self: flex-start; background: #fff; border: 1px solid #e2e8f0; color: #0f172a; }
      .ma-chat-message.user { align-self: flex-end; background: #0ea5e9; color: #fff; }
      .ma-chat-handoff { margin: 0 12px 10px; padding: 10px; border-radius: 10px; background: #fff7ed; border: 1px solid #fed7aa; display: none; }
      .ma-chat-handoff p { margin: 0 0 8px; font-size: 13px; color: #9a3412; }
      .ma-chat-handoff .row { display: flex; gap: 8px; flex-wrap: wrap; }
      .ma-chat-handoff a { text-decoration: none; font-size: 13px; font-weight: 600; padding: 8px 10px; border-radius: 8px; background: #f97316; color: #fff; }
      .ma-chat-compose { border-top: 1px solid #e2e8f0; background: #fff; padding: 10px; display: flex; gap: 8px; }
      .ma-chat-input { flex: 1; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 12px; font-size: 14px; outline: none; }
      .ma-chat-input:focus { border-color: #0ea5e9; }
      .ma-chat-send { border: none; border-radius: 10px; padding: 0 14px; background: #0f172a; color: #fff; font-weight: 700; cursor: pointer; }
      .ma-chat-send:disabled, .ma-chat-input:disabled { opacity: 0.65; cursor: not-allowed; }
      @media (max-width: 480px) {
        .ma-chat-root { right: 10px; bottom: 10px; }
        .ma-chat-panel { right: -2px; bottom: 68px; width: calc(100vw - 20px); height: 70vh; }
      }
    `,document.head.appendChild(C)}const n=document.createElement("div");n.id="ma-chat-widget-root",n.className="ma-chat-root",n.innerHTML=`
    <button class="ma-chat-toggle" id="ma-chat-toggle" aria-label="Mở chatbot">
      <i class="fa-solid fa-comments"></i>
    </button>
    <div class="ma-chat-panel" id="ma-chat-panel">
      <div class="ma-chat-header">
        <div>
          <div class="ma-chat-title">Tư vấn Minh Aquarium</div>
          <div class="ma-chat-sub">Gợi ý sản phẩm, setup, chăm sóc bể</div>
        </div>
        <button class="ma-chat-close" id="ma-chat-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="ma-chat-body" id="ma-chat-body"></div>
      <div class="ma-chat-handoff" id="ma-chat-handoff">
        <p>Bot gợi ý bạn liên hệ nhân viên để hỗ trợ nhanh hơn:</p>
        <div class="row" id="ma-chat-handoff-row"></div>
      </div>
      <div class="ma-chat-compose">
        <input id="ma-chat-input" class="ma-chat-input" type="text" maxlength="500" placeholder="Nhập câu hỏi..." />
        <button id="ma-chat-send" class="ma-chat-send">Gửi</button>
      </div>
    </div>
  `,document.body.appendChild(n);const e=document.getElementById("ma-chat-panel"),t=document.getElementById("ma-chat-body"),r=document.getElementById("ma-chat-handoff"),s=document.getElementById("ma-chat-handoff-row"),a=document.getElementById("ma-chat-input"),l=document.getElementById("ma-chat-send"),u=document.getElementById("ma-chat-toggle"),d=document.getElementById("ma-chat-close");let _=localStorage.getItem(Lo)||"",T=!1,S=!1;function E(C,O){const V=document.createElement("div");V.className=`ma-chat-message ${C==="user"?"user":"bot"}`,V.textContent=O,t.appendChild(V),t.scrollTop=t.scrollHeight}function R(C){S=C,a.disabled=C,l.disabled=C,l.textContent=C?"...":"Gửi"}function P(C){if(!(C!=null&&C.required)){r.style.display="none",s.innerHTML="";return}if(s.innerHTML="",C.phone){const O=document.createElement("a");O.href=`tel:${C.phone}`,O.textContent=`Gọi ${C.phone}`,s.appendChild(O)}if(C.zaloLink){const O=document.createElement("a");O.href=C.zaloLink,O.target="_blank",O.rel="noopener noreferrer",O.textContent="Nhắn Zalo nhân viên",s.appendChild(O)}r.style.display="block"}async function F(){if(!(!_||T))try{const C=await fetch(`/api/chatbot/history/${_}`),O=await C.json();C.ok&&O.success&&Array.isArray(O.messages)&&O.messages.forEach(V=>{E(V.role==="user"?"user":"assistant",V.content)})}catch{}finally{T=!0}}async function L(){if(S)return;const C=(a.value||"").trim();if(C){a.value="",E("user",C),P(null),R(!0);try{const O=await fetch("/api/chatbot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:C,sessionId:_})}),V=await O.json();if(!O.ok||!V.success)throw new Error((V==null?void 0:V.error)||"Chatbot đang bận.");V.sessionId&&(_=String(V.sessionId),localStorage.setItem(Lo,_)),E("assistant",V.answer||"Mình chưa có phản hồi phù hợp."),P(V.handoff)}catch(O){E("assistant",O.message||"Hiện bot đang bận. Bạn vui lòng gọi 0123456789 để được nhân viên hỗ trợ."),P({required:!0,phone:"0123456789"})}finally{R(!1)}}}function j(){e.classList.add("open"),t.children.length===0&&E("assistant","Chào bạn, mình là trợ lý Minh Aquarium. Bạn đang cần tư vấn cá, tép, cây, thiết bị hay setup bể?"),F(),a.focus()}function $(){e.classList.remove("open")}u.addEventListener("click",()=>{e.classList.contains("open")?$():j()}),d.addEventListener("click",$),l.addEventListener("click",L),a.addEventListener("keydown",C=>{C.key==="Enter"&&(C.preventDefault(),L())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Mo):Mo();document.querySelectorAll(".cart-btn").forEach(n=>{n.addEventListener("click",()=>{window.location.href="cart.html"})});document.querySelectorAll(".btn-login").forEach(n=>{n.addEventListener("click",()=>{if((n.dataset.authAction||"login")==="logout"){confirm("Bạn muốn đăng xuất?")&&Uf(Yn);return}window.location.href="login.html"})});const Uo=document.querySelector(".carousel-track"),Nn=Array.from(document.querySelectorAll(".carousel-slide")||[]),Fo=document.querySelector(".carousel-nav.next"),jo=document.querySelector(".carousel-nav.prev"),Dn=Array.from(document.querySelectorAll(".dot")||[]);if(Uo&&Nn.length>0){let n=0,e;const t=l=>{Uo.style.transform=`translateX(-${l*(100/Nn.length)}%)`,Dn.forEach(u=>u.classList.remove("active")),Dn[l]&&Dn[l].classList.add("active"),n=l},r=()=>{let l=n+1;l>=Nn.length&&(l=0),t(l)},s=()=>{let l=n-1;l<0&&(l=Nn.length-1),t(l)},a=()=>{e&&clearInterval(e),e=setInterval(r,5e3)};a(),Fo&&Fo.addEventListener("click",()=>{r(),a()}),jo&&jo.addEventListener("click",()=>{s(),a()}),Dn.forEach((l,u)=>{l.addEventListener("click",()=>{t(u),a()})})}function ag(){return document.querySelectorAll(".search-input")}function we(n){return(n||"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^\w\s&-]/g," ").replace(/\s+/g," ").trim()}function er(n){if(window.location.pathname.includes("products.html")){const a=document.querySelector(".sidebar-filter"),l=a==null?void 0:a.querySelector(".filter-input");if(l&&l.value!==n&&(l.value=n),typeof window.applyAdvancedFilters=="function"){window.applyAdvancedFilters();return}}const t=we(n);document.querySelectorAll(".product-card").forEach(a=>{const l=a.querySelector(".product-name"),u=a.querySelector(".product-cat");if(l||u){const d=l?we(l.textContent).includes(t):!1,_=u?we(u.textContent).includes(t):!1;t===""||d||_?a.style.display="block":a.style.display="none"}});const s=document.querySelectorAll(".sidebar-menu a");s.length>0&&s.forEach(a=>{a.classList.remove("active");const l=a.childNodes[0].textContent.trim().toLowerCase();(t!==""&&l.includes(t)||t===""&&l==="tất cả sản phẩm")&&a.classList.add("active")})}function Bo(){ag().forEach(e=>{if(e.dataset.searchBound==="1")return;e.dataset.searchBound="1";const r=new URLSearchParams(window.location.search).get("q");r&&!e.value&&(e.value=r,window.location.pathname.includes("products.html")&&er(r)),e.addEventListener("input",s=>{window.location.pathname.includes("products.html")&&er(s.target.value)}),e.addEventListener("keydown",s=>{s.key==="Enter"&&!window.location.pathname.includes("products.html")&&(window.location.href=`products.html?q=${encodeURIComponent(s.target.value.trim())}`)})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Bo):Bo();document.querySelectorAll(".search-icon").forEach(n=>{n.style.cursor="pointer",n.addEventListener("click",()=>{const e=n.nextElementSibling;e&&e.classList.contains("search-input")&&(window.location.pathname.includes("products.html")?er(e.value):e.value.trim()?window.location.href=`products.html?q=${encodeURIComponent(e.value.trim())}`:window.location.href="products.html")})});document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".sort-select"),e=document.querySelector(".product-grid");if(n&&e){let t=Array.from(e.querySelectorAll(".product-card"));n.addEventListener("change",r=>{const s=r.target.value;let a=Array.from(e.querySelectorAll(".product-card"));s==="featured"||s==="newest"?(s==="newest"?[...t].reverse():t).forEach(u=>e.appendChild(u)):(s==="price-asc"||s==="price-desc")&&(a.sort((l,u)=>{var E,R;const d=((E=l.querySelector(".price-current"))==null?void 0:E.textContent)||"0",_=((R=u.querySelector(".price-current"))==null?void 0:R.textContent)||"0",T=parseInt(d.replace(/[^0-9]/g,""))||0,S=parseInt(_.replace(/[^0-9]/g,""))||0;return s==="price-asc"?T-S:S-T}),a.forEach(l=>e.appendChild(l)))})}});function Vo(){const n=document.querySelector(".sidebar-filter");if(!n)return;const e=document.querySelector(".header-main .search-input"),t=n.querySelector(".filter-input"),r=n.querySelectorAll('.checkbox-list input[type="checkbox"]'),s=n.querySelectorAll(".price-inputs .price-input"),a=n.querySelector(".btn-clear-filter"),l=document.querySelector(".product-grid"),u=document.querySelector(".page-subtitle");function d(){const S=Array.from(l.querySelectorAll(".product-card")),E=we((t==null?void 0:t.value)||(e==null?void 0:e.value)||""),R=Array.from(r).filter(j=>j.checked).map(j=>{const $=j.dataset.category||j.parentElement.textContent;return we($)});let P=parseInt(s[0].value)||0,F=parseInt(s[1].value)||999999999;if(P>F){let j=P;P=F,F=j}let L=0;S.forEach(j=>{var p,m,y;const $=we(((p=j.querySelector(".product-name"))==null?void 0:p.textContent)||""),C=we(((m=j.querySelector(".product-cat"))==null?void 0:m.textContent)||""),O=((y=j.querySelector(".price-current"))==null?void 0:y.textContent)||"0",V=parseInt(O.replace(/[^0-9]/g,""))||0,G=E===""||$.includes(E)||C.includes(E),v=R.length===0||R.some(I=>C.includes(I)||I.includes(C)),f=V>=P&&V<=F;G&&v&&f?(j.style.display="block",L++):j.style.display="none"}),u&&(u.textContent=`Tìm thấy ${L} sản phẩm`)}window.applyAdvancedFilters=d,t&&t.addEventListener("input",d),e&&e.addEventListener("input",d),r.forEach(S=>{S.addEventListener("change",d)}),s.forEach(S=>{S.addEventListener("change",d),S.addEventListener("keyup",E=>{E.key==="Enter"&&d()})}),a&&a.addEventListener("click",()=>{t&&(t.value=""),e&&(e.value=""),r.forEach(S=>S.checked=!1),s.length===2&&(s[0].value=0,s[1].value=1e7),d()});const T=new URLSearchParams(window.location.search).get("q")||"";T&&(t&&(t.value=T),e&&(e.value=T)),d()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Vo):Vo();document.addEventListener("DOMContentLoaded",()=>{const n=window.location.pathname.toLowerCase();if(!(n.endsWith("/index.html")||n==="/"||n.endsWith("/")||n==="index.html"))return;document.body.style.background="linear-gradient(to bottom right, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)",document.body.style.backgroundAttachment="fixed";const t=document.createElement("div");t.className="aqua-bubbles-container",Object.assign(t.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",zIndex:"-1",overflow:"hidden",pointerEvents:"none"});for(let r=0;r<30;r++){const s=document.createElement("div"),a=Math.random()*35+5,l=Math.random()*100,u=Math.random()*10+5,d=Math.random()*5;Object.assign(s.style,{position:"absolute",bottom:"-60px",left:`${l}%`,width:`${a}px`,height:`${a}px`,background:"rgba(255, 255, 255, 0.4)",border:"1px solid rgba(255, 255, 255, 0.7)",borderRadius:"50%",boxShadow:"inset 0 0 10px rgba(255,255,255,0.4)",animation:`aquaRise ${u}s infinite ease-in-out ${d}s`}),t.appendChild(s)}if(document.body.appendChild(t),!document.getElementById("aqua-bubble-css")){const r=document.createElement("style");r.id="aqua-bubble-css",r.innerHTML=`
            @keyframes aquaRise {
                0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                50% { transform: translateY(-50vh) scale(1.1) translateX(15px); }
                90% { opacity: 0.8; }
                100% { transform: translateY(-110vh) scale(1.4) translateX(-15px); opacity: 0; }
            }
        `,document.head.appendChild(r)}});const $o=document.getElementById("auth-form"),$i=document.getElementById("auth-toggle-link"),cg=document.getElementById("auth-title"),lg=document.getElementById("auth-subtitle"),hg=document.getElementById("auth-submit-btn"),ug=document.getElementById("auth-toggle-text"),Ho=document.getElementById("auth-remember-row");let Ce=!0;$i&&$i.addEventListener("click",()=>{Ce=!Ce,cg.textContent=Ce?"Đăng nhập":"Đăng ký",lg.textContent=Ce?"Đăng nhập để theo dõi đơn hàng và tích điểm":"Tạo tài khoản mới để hưởng ưu đãi thành viên",hg.textContent=Ce?"Đăng nhập ngay":"Đăng ký tài khoản",ug.textContent=Ce?"Chưa có tài khoản?":"Đã có tài khoản?",$i.textContent=Ce?"Đăng ký ngay":"Đăng nhập ngay",Ho&&(Ho.style.display=Ce?"flex":"none")});$o&&$o.addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("auth-email").value,t=document.getElementById("auth-password").value;try{Ce?(await Nf(Yn,e,t),alert("🎉 Đăng nhập thành công!")):(await xf(Yn,e,t),alert("🎉 Đăng ký thành công! Chào mừng thành viên mới.")),window.location.href="index.html"}catch(r){console.error(r),alert(`❌ Lỗi: ${r.message}`)}});Mf(Yn,n=>{document.querySelectorAll(".btn-login").forEach(t=>{n?(t.innerHTML=`<i class="fa-solid fa-user"></i> ${n.email.split("@")[0]}`,t.dataset.authAction="logout"):(t.innerHTML="Đăng nhập",t.dataset.authAction="login")})});
