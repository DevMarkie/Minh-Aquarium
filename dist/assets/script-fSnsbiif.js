(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const qc=()=>{};var Ts={};/**
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
 */const Mo=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},zc=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=n[t++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=n[t++],l=n[t++],h=n[t++],d=((s&7)<<18|(a&63)<<12|(l&63)<<6|h&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const a=n[t++],l=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},Uo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const a=n[s],l=s+1<n.length,h=l?n[s+1]:0,d=s+2<n.length,I=d?n[s+2]:0,T=a>>2,A=(a&3)<<4|h>>4;let b=(h&15)<<2|I>>6,P=I&63;d||(P=64,l||(b=64)),r.push(t[T],t[A],t[b],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Mo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):zc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const a=t[n.charAt(s++)],h=s<n.length?t[n.charAt(s)]:0;++s;const I=s<n.length?t[n.charAt(s)]:64;++s;const A=s<n.length?t[n.charAt(s)]:64;if(++s,a==null||h==null||I==null||A==null)throw new Wc;const b=a<<2|h>>4;if(r.push(b),I!==64){const P=h<<4&240|I>>2;if(r.push(P),A!==64){const k=I<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Wc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gc=function(n){const e=Mo(n);return Uo.encodeByteArray(e,!0)},jn=function(n){return Gc(n).replace(/\./g,"")},Fo=function(n){try{return Uo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Kc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Jc=()=>Kc().__FIREBASE_DEFAULTS__,Xc=()=>{if(typeof process>"u"||typeof Ts>"u")return;const n=Ts.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Yc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Fo(n[1]);return e&&JSON.parse(e)},er=()=>{try{return qc()||Jc()||Xc()||Yc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jo=n=>{var e,t;return(t=(e=er())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Zc=n=>{const e=jo(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Vo=()=>{var n;return(n=er())===null||n===void 0?void 0:n.config},Bo=n=>{var e;return(e=er())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Qc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function nn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $o(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function el(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,a=n.sub||n.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},n);return[jn(JSON.stringify(t)),jn(JSON.stringify(l)),""].join(".")}const zt={};function tl(){const n={prod:[],emulator:[]};for(const e of Object.keys(zt))zt[e]?n.emulator.push(e):n.prod.push(e);return n}function nl(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ss=!1;function Ho(n,e){if(typeof window>"u"||typeof document>"u"||!nn(window.location.host)||zt[n]===e||zt[n]||Ss)return;zt[n]=e;function t(b){return`__firebase__banner__${b}`}const r="__firebase__banner",a=tl().prod.length>0;function l(){const b=document.getElementById(r);b&&b.remove()}function h(b){b.style.display="flex",b.style.background="#7faaf0",b.style.position="fixed",b.style.bottom="5px",b.style.left="5px",b.style.padding=".5em",b.style.borderRadius="5px",b.style.alignItems="center"}function d(b,P){b.setAttribute("width","24"),b.setAttribute("id",P),b.setAttribute("height","24"),b.setAttribute("viewBox","0 0 24 24"),b.setAttribute("fill","none"),b.style.marginLeft="-6px"}function I(){const b=document.createElement("span");return b.style.cursor="pointer",b.style.marginLeft="16px",b.style.fontSize="24px",b.innerHTML=" &times;",b.onclick=()=>{Ss=!0,l()},b}function T(b,P){b.setAttribute("id",P),b.innerText="Learn more",b.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",b.setAttribute("target","__blank"),b.style.paddingLeft="5px",b.style.textDecoration="underline"}function A(){const b=nl(r),P=t("text"),k=document.getElementById(P)||document.createElement("span"),M=t("learnmore"),L=document.getElementById(M)||document.createElement("a"),j=t("preprendIcon"),$=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(b.created){const V=b.element;h(V),T(L,M);const X=I();d($,j),V.append($,k,L,X),document.body.appendChild(V)}a?(k.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",A):A()}/**
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
 */function ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function il(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ee())}function rl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function tr(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function sl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ol(){const n=ee();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function nr(){try{return typeof indexedDB=="object"}catch{return!1}}function ir(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(t){e(t)}})}function qo(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const al="FirebaseError";class pe extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=al,Object.setPrototypeOf(this,pe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ut.prototype.create)}}class ut{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?cl(a,r):"Error",h=`${this.serviceName}: ${l} (${s}).`;return new pe(s,h,r)}}function cl(n,e){return n.replace(ll,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ll=/\{\$([^}]+)}/g;function ul(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function We(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const a=n[s],l=e[s];if(As(a)&&As(l)){if(!We(a,l))return!1}else if(a!==l)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function As(n){return n!==null&&typeof n=="object"}/**
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
 */function rn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ht(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function qt(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function hl(n,e){const t=new dl(n,e);return t.subscribe.bind(t)}class dl{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");fl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Pi),s.error===void 0&&(s.error=Pi),s.complete===void 0&&(s.complete=Pi);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Pi(){}/**
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
 */const pl=1e3,gl=2,ml=14400*1e3,yl=.5;function Cs(n,e=pl,t=gl){const r=e*Math.pow(t,n),s=Math.round(yl*r*(Math.random()-.5)*2);return Math.min(ml,r+s)}/**
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
 */function ge(n){return n&&n._delegate?n._delegate:n}class de{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class vl{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Qc;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wl(e))try{this.getOrInitializeService({instanceIdentifier:Qe})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=Qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qe){return this.instances.has(e)}getOptions(e=Qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[a,l]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(a);r===h&&l.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_l(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Qe){return this.component?this.component.multipleInstances?e:Qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _l(n){return n===Qe?void 0:n}function wl(n){return n.instantiationMode==="EAGER"}/**
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
 */class Il{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vl(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var x;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(x||(x={}));const El={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},bl=x.INFO,Tl={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Sl=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Tl[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yn{constructor(e){this.name=e,this._logLevel=bl,this._logHandler=Sl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?El[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const Al=(n,e)=>e.some(t=>n instanceof t);let ks,Ps;function Cl(){return ks||(ks=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kl(){return Ps||(Ps=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zo=new WeakMap,$i=new WeakMap,Wo=new WeakMap,Ri=new WeakMap,rr=new WeakMap;function Pl(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",a),n.removeEventListener("error",l)},a=()=>{t(qe(n.result)),s()},l=()=>{r(n.error),s()};n.addEventListener("success",a),n.addEventListener("error",l)});return e.then(t=>{t instanceof IDBCursor&&zo.set(t,n)}).catch(()=>{}),rr.set(e,n),e}function Rl(n){if($i.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",l),n.removeEventListener("abort",l)},a=()=>{t(),s()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",a),n.addEventListener("error",l),n.addEventListener("abort",l)});$i.set(n,e)}let Hi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $i.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Wo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return qe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ol(n){Hi=n(Hi)}function Nl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Oi(this),e,...t);return Wo.set(r,e.sort?e.sort():[e]),qe(r)}:kl().includes(n)?function(...e){return n.apply(Oi(this),e),qe(zo.get(this))}:function(...e){return qe(n.apply(Oi(this),e))}}function Dl(n){return typeof n=="function"?Nl(n):(n instanceof IDBTransaction&&Rl(n),Al(n,Cl())?new Proxy(n,Hi):n)}function qe(n){if(n instanceof IDBRequest)return Pl(n);if(Ri.has(n))return Ri.get(n);const e=Dl(n);return e!==n&&(Ri.set(n,e),rr.set(e,n)),e}const Oi=n=>rr.get(n);function Go(n,e,{blocked:t,upgrade:r,blocking:s,terminated:a}={}){const l=indexedDB.open(n,e),h=qe(l);return r&&l.addEventListener("upgradeneeded",d=>{r(qe(l.result),d.oldVersion,d.newVersion,qe(l.transaction),d)}),t&&l.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),h.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",I=>s(I.oldVersion,I.newVersion,I))}).catch(()=>{}),h}const Ll=["get","getKey","getAll","getAllKeys","count"],xl=["put","add","delete","clear"],Ni=new Map;function Rs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ni.get(e))return Ni.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=xl.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ll.includes(t)))return;const a=async function(l,...h){const d=this.transaction(l,s?"readwrite":"readonly");let I=d.store;return r&&(I=I.index(h.shift())),(await Promise.all([I[t](...h),s&&d.done]))[0]};return Ni.set(e,a),a}Ol(n=>({...n,get:(e,t,r)=>Rs(e,t)||n.get(e,t,r),has:(e,t)=>!!Rs(e,t)||n.has(e,t)}));/**
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
 */class Ml{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ul(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Ul(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qi="@firebase/app",Os="0.13.2";/**
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
 */const Oe=new Yn("@firebase/app"),Fl="@firebase/app-compat",jl="@firebase/analytics-compat",Vl="@firebase/analytics",Bl="@firebase/app-check-compat",$l="@firebase/app-check",Hl="@firebase/auth",ql="@firebase/auth-compat",zl="@firebase/database",Wl="@firebase/data-connect",Gl="@firebase/database-compat",Kl="@firebase/functions",Jl="@firebase/functions-compat",Xl="@firebase/installations",Yl="@firebase/installations-compat",Zl="@firebase/messaging",Ql="@firebase/messaging-compat",eu="@firebase/performance",tu="@firebase/performance-compat",nu="@firebase/remote-config",iu="@firebase/remote-config-compat",ru="@firebase/storage",su="@firebase/storage-compat",ou="@firebase/firestore",au="@firebase/ai",cu="@firebase/firestore-compat",lu="firebase",uu="11.10.0";/**
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
 */const zi="[DEFAULT]",hu={[qi]:"fire-core",[Fl]:"fire-core-compat",[Vl]:"fire-analytics",[jl]:"fire-analytics-compat",[$l]:"fire-app-check",[Bl]:"fire-app-check-compat",[Hl]:"fire-auth",[ql]:"fire-auth-compat",[zl]:"fire-rtdb",[Wl]:"fire-data-connect",[Gl]:"fire-rtdb-compat",[Kl]:"fire-fn",[Jl]:"fire-fn-compat",[Xl]:"fire-iid",[Yl]:"fire-iid-compat",[Zl]:"fire-fcm",[Ql]:"fire-fcm-compat",[eu]:"fire-perf",[tu]:"fire-perf-compat",[nu]:"fire-rc",[iu]:"fire-rc-compat",[ru]:"fire-gcs",[su]:"fire-gcs-compat",[ou]:"fire-fst",[cu]:"fire-fst-compat",[au]:"fire-vertex","fire-js":"fire-js",[lu]:"fire-js-all"};/**
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
 */const Vn=new Map,du=new Map,Wi=new Map;function Ns(n,e){try{n.container.addComponent(e)}catch(t){Oe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ee(n){const e=n.name;if(Wi.has(e))return Oe.debug(`There were multiple attempts to register component ${e}.`),!1;Wi.set(e,n);for(const t of Vn.values())Ns(t,n);for(const t of du.values())Ns(t,n);return!0}function ht(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function re(n){return n==null?!1:n.settings!==void 0}/**
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
 */const fu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ze=new ut("app","Firebase",fu);/**
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
 */class pu{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new de("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}/**
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
 */const Tt=uu;function Ko(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:zi,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ze.create("bad-app-name",{appName:String(s)});if(t||(t=Vo()),!t)throw ze.create("no-options");const a=Vn.get(s);if(a){if(We(t,a.options)&&We(r,a.config))return a;throw ze.create("duplicate-app",{appName:s})}const l=new Il(s);for(const d of Wi.values())l.addComponent(d);const h=new pu(t,r,l);return Vn.set(s,h),h}function sr(n=zi){const e=Vn.get(n);if(!e&&n===zi&&Vo())return Ko();if(!e)throw ze.create("no-app",{appName:n});return e}function se(n,e,t){var r;let s=(r=hu[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const h=[`Unable to register library "${s}" with version "${e}":`];a&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Oe.warn(h.join(" "));return}Ee(new de(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const gu="firebase-heartbeat-database",mu=1,Zt="firebase-heartbeat-store";let Di=null;function Jo(){return Di||(Di=Go(gu,mu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Zt)}catch(t){console.warn(t)}}}}).catch(n=>{throw ze.create("idb-open",{originalErrorMessage:n.message})})),Di}async function yu(n){try{const t=(await Jo()).transaction(Zt),r=await t.objectStore(Zt).get(Xo(n));return await t.done,r}catch(e){if(e instanceof pe)Oe.warn(e.message);else{const t=ze.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Oe.warn(t.message)}}}async function Ds(n,e){try{const r=(await Jo()).transaction(Zt,"readwrite");await r.objectStore(Zt).put(e,Xo(n)),await r.done}catch(t){if(t instanceof pe)Oe.warn(t.message);else{const r=ze.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Oe.warn(r.message)}}}function Xo(n){return`${n.name}!${n.options.appId}`}/**
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
 */const vu=1024,_u=30;class wu{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Eu(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Ls();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>_u){const l=bu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Oe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ls(),{heartbeatsToSend:r,unsentEntries:s}=Iu(this._heartbeatsCache.heartbeats),a=jn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(t){return Oe.warn(t),""}}}function Ls(){return new Date().toISOString().substring(0,10)}function Iu(n,e=vu){const t=[];let r=n.slice();for(const s of n){const a=t.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),xs(t)>e){a.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),xs(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Eu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nr()?ir().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await yu(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ds(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ds(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function xs(n){return jn(JSON.stringify({version:2,heartbeats:n})).length}function bu(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Tu(n){Ee(new de("platform-logger",e=>new Ml(e),"PRIVATE")),Ee(new de("heartbeat",e=>new wu(e),"PRIVATE")),se(qi,Os,n),se(qi,Os,"esm2017"),se("fire-js","")}Tu("");var Su="firebase",Au="11.10.0";/**
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
 */se(Su,Au,"app");const Yo="@firebase/installations",or="0.6.18";/**
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
 */const Zo=1e4,Qo=`w:${or}`,ea="FIS_v2",Cu="https://firebaseinstallations.googleapis.com/v1",ku=3600*1e3,Pu="installations",Ru="Installations";/**
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
 */const Ou={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},st=new ut(Pu,Ru,Ou);function ta(n){return n instanceof pe&&n.code.includes("request-failed")}/**
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
 */function na({projectId:n}){return`${Cu}/projects/${n}/installations`}function ia(n){return{token:n.token,requestStatus:2,expiresIn:Du(n.expiresIn),creationTime:Date.now()}}async function ra(n,e){const r=(await e.json()).error;return st.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function sa({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Nu(n,{refreshToken:e}){const t=sa(n);return t.append("Authorization",Lu(e)),t}async function oa(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Du(n){return Number(n.replace("s","000"))}function Lu(n){return`${ea} ${n}`}/**
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
 */async function xu({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=na(n),s=sa(n),a=e.getImmediate({optional:!0});if(a){const I=await a.getHeartbeatsHeader();I&&s.append("x-firebase-client",I)}const l={fid:t,authVersion:ea,appId:n.appId,sdkVersion:Qo},h={method:"POST",headers:s,body:JSON.stringify(l)},d=await oa(()=>fetch(r,h));if(d.ok){const I=await d.json();return{fid:I.fid||t,registrationStatus:2,refreshToken:I.refreshToken,authToken:ia(I.authToken)}}else throw await ra("Create Installation",d)}/**
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
 */function aa(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function Mu(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Uu=/^[cdef][\w-]{21}$/,Gi="";function Fu(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=ju(n);return Uu.test(t)?t:Gi}catch{return Gi}}function ju(n){return Mu(n).substr(0,22)}/**
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
 */function Zn(n){return`${n.appName}!${n.appId}`}/**
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
 */const ca=new Map;function la(n,e){const t=Zn(n);ua(t,e),Vu(t,e)}function ua(n,e){const t=ca.get(n);if(t)for(const r of t)r(e)}function Vu(n,e){const t=Bu();t&&t.postMessage({key:n,fid:e}),$u()}let tt=null;function Bu(){return!tt&&"BroadcastChannel"in self&&(tt=new BroadcastChannel("[Firebase] FID Change"),tt.onmessage=n=>{ua(n.data.key,n.data.fid)}),tt}function $u(){ca.size===0&&tt&&(tt.close(),tt=null)}/**
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
 */const Hu="firebase-installations-database",qu=1,ot="firebase-installations-store";let Li=null;function ar(){return Li||(Li=Go(Hu,qu,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(ot)}}})),Li}async function Bn(n,e){const t=Zn(n),s=(await ar()).transaction(ot,"readwrite"),a=s.objectStore(ot),l=await a.get(t);return await a.put(e,t),await s.done,(!l||l.fid!==e.fid)&&la(n,e.fid),e}async function ha(n){const e=Zn(n),r=(await ar()).transaction(ot,"readwrite");await r.objectStore(ot).delete(e),await r.done}async function Qn(n,e){const t=Zn(n),s=(await ar()).transaction(ot,"readwrite"),a=s.objectStore(ot),l=await a.get(t),h=e(l);return h===void 0?await a.delete(t):await a.put(h,t),await s.done,h&&(!l||l.fid!==h.fid)&&la(n,h.fid),h}/**
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
 */async function cr(n){let e;const t=await Qn(n.appConfig,r=>{const s=zu(r),a=Wu(n,s);return e=a.registrationPromise,a.installationEntry});return t.fid===Gi?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function zu(n){const e=n||{fid:Fu(),registrationStatus:0};return da(e)}function Wu(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(st.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Gu(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ku(n)}:{installationEntry:e}}async function Gu(n,e){try{const t=await xu(n,e);return Bn(n.appConfig,t)}catch(t){throw ta(t)&&t.customData.serverCode===409?await ha(n.appConfig):await Bn(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Ku(n){let e=await Ms(n.appConfig);for(;e.registrationStatus===1;)await aa(100),e=await Ms(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await cr(n);return r||t}return e}function Ms(n){return Qn(n,e=>{if(!e)throw st.create("installation-not-found");return da(e)})}function da(n){return Ju(n)?{fid:n.fid,registrationStatus:0}:n}function Ju(n){return n.registrationStatus===1&&n.registrationTime+Zo<Date.now()}/**
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
 */async function Xu({appConfig:n,heartbeatServiceProvider:e},t){const r=Yu(n,t),s=Nu(n,t),a=e.getImmediate({optional:!0});if(a){const I=await a.getHeartbeatsHeader();I&&s.append("x-firebase-client",I)}const l={installation:{sdkVersion:Qo,appId:n.appId}},h={method:"POST",headers:s,body:JSON.stringify(l)},d=await oa(()=>fetch(r,h));if(d.ok){const I=await d.json();return ia(I)}else throw await ra("Generate Auth Token",d)}function Yu(n,{fid:e}){return`${na(n)}/${e}/authTokens:generate`}/**
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
 */async function lr(n,e=!1){let t;const r=await Qn(n.appConfig,a=>{if(!fa(a))throw st.create("not-registered");const l=a.authToken;if(!e&&eh(l))return a;if(l.requestStatus===1)return t=Zu(n,e),a;{if(!navigator.onLine)throw st.create("app-offline");const h=nh(a);return t=Qu(n,h),h}});return t?await t:r.authToken}async function Zu(n,e){let t=await Us(n.appConfig);for(;t.authToken.requestStatus===1;)await aa(100),t=await Us(n.appConfig);const r=t.authToken;return r.requestStatus===0?lr(n,e):r}function Us(n){return Qn(n,e=>{if(!fa(e))throw st.create("not-registered");const t=e.authToken;return ih(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Qu(n,e){try{const t=await Xu(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await Bn(n.appConfig,r),t}catch(t){if(ta(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await ha(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Bn(n.appConfig,r)}throw t}}function fa(n){return n!==void 0&&n.registrationStatus===2}function eh(n){return n.requestStatus===2&&!th(n)}function th(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ku}function nh(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function ih(n){return n.requestStatus===1&&n.requestTime+Zo<Date.now()}/**
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
 */async function rh(n){const e=n,{installationEntry:t,registrationPromise:r}=await cr(e);return r?r.catch(console.error):lr(e).catch(console.error),t.fid}/**
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
 */async function sh(n,e=!1){const t=n;return await oh(t),(await lr(t,e)).token}async function oh(n){const{registrationPromise:e}=await cr(n);e&&await e}/**
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
 */function ah(n){if(!n||!n.options)throw xi("App Configuration");if(!n.name)throw xi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw xi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function xi(n){return st.create("missing-app-config-values",{valueName:n})}/**
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
 */const pa="installations",ch="installations-internal",lh=n=>{const e=n.getProvider("app").getImmediate(),t=ah(e),r=ht(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},uh=n=>{const e=n.getProvider("app").getImmediate(),t=ht(e,pa).getImmediate();return{getId:()=>rh(t),getToken:s=>sh(t,s)}};function hh(){Ee(new de(pa,lh,"PUBLIC")),Ee(new de(ch,uh,"PRIVATE"))}hh();se(Yo,or);se(Yo,or,"esm2017");/**
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
 */const $n="analytics",dh="firebase_id",fh="origin",ph=60*1e3,gh="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ur="https://www.googletagmanager.com/gtag/js";/**
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
 */const te=new Yn("@firebase/analytics");/**
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
 */const mh={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ne=new ut("analytics","Analytics",mh);/**
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
 */function yh(n){if(!n.startsWith(ur)){const e=ne.create("invalid-gtag-resource",{gtagURL:n});return te.warn(e.message),""}return n}function ga(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function vh(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function _h(n,e){const t=vh("firebase-js-sdk-policy",{createScriptURL:yh}),r=document.createElement("script"),s=`${ur}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function wh(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Ih(n,e,t,r,s,a){const l=r[s];try{if(l)await e[l];else{const d=(await ga(t)).find(I=>I.measurementId===s);d&&await e[d.appId]}}catch(h){te.error(h)}n("config",s,a)}async function Eh(n,e,t,r,s){try{let a=[];if(s&&s.send_to){let l=s.send_to;Array.isArray(l)||(l=[l]);const h=await ga(t);for(const d of l){const I=h.find(A=>A.measurementId===d),T=I&&e[I.appId];if(T)a.push(T);else{a=[];break}}}a.length===0&&(a=Object.values(e)),await Promise.all(a),n("event",r,s||{})}catch(a){te.error(a)}}function bh(n,e,t,r){async function s(a,...l){try{if(a==="event"){const[h,d]=l;await Eh(n,e,t,h,d)}else if(a==="config"){const[h,d]=l;await Ih(n,e,t,r,h,d)}else if(a==="consent"){const[h,d]=l;n("consent",h,d)}else if(a==="get"){const[h,d,I]=l;n("get",h,d,I)}else if(a==="set"){const[h]=l;n("set",h)}else n(a,...l)}catch(h){te.error(h)}}return s}function Th(n,e,t,r,s){let a=function(...l){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(a=window[s]),window[s]=bh(a,n,e,t),{gtagCore:a,wrappedGtag:window[s]}}function Sh(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(ur)&&t.src.includes(n))return t;return null}/**
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
 */const Ah=30,Ch=1e3;class kh{constructor(e={},t=Ch){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const ma=new kh;function Ph(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Rh(n){var e;const{appId:t,apiKey:r}=n,s={method:"GET",headers:Ph(r)},a=gh.replace("{app-id}",t),l=await fetch(a,s);if(l.status!==200&&l.status!==304){let h="";try{const d=await l.json();!((e=d.error)===null||e===void 0)&&e.message&&(h=d.error.message)}catch{}throw ne.create("config-fetch-failed",{httpStatus:l.status,responseMessage:h})}return l.json()}async function Oh(n,e=ma,t){const{appId:r,apiKey:s,measurementId:a}=n.options;if(!r)throw ne.create("no-app-id");if(!s){if(a)return{measurementId:a,appId:r};throw ne.create("no-api-key")}const l=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new Lh;return setTimeout(async()=>{h.abort()},ph),ya({appId:r,apiKey:s,measurementId:a},l,h,e)}async function ya(n,{throttleEndTimeMillis:e,backoffCount:t},r,s=ma){var a;const{appId:l,measurementId:h}=n;try{await Nh(r,e)}catch(d){if(h)return te.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:l,measurementId:h};throw d}try{const d=await Rh(n);return s.deleteThrottleMetadata(l),d}catch(d){const I=d;if(!Dh(I)){if(s.deleteThrottleMetadata(l),h)return te.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${I==null?void 0:I.message}]`),{appId:l,measurementId:h};throw d}const T=Number((a=I==null?void 0:I.customData)===null||a===void 0?void 0:a.httpStatus)===503?Cs(t,s.intervalMillis,Ah):Cs(t,s.intervalMillis),A={throttleEndTimeMillis:Date.now()+T,backoffCount:t+1};return s.setThrottleMetadata(l,A),te.debug(`Calling attemptFetch again in ${T} millis`),ya(n,A,r,s)}}function Nh(n,e){return new Promise((t,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(a),r(ne.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Dh(n){if(!(n instanceof pe)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Lh{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function xh(n,e,t,r,s){if(s&&s.global){n("event",t,r);return}else{const a=await e,l=Object.assign(Object.assign({},r),{send_to:a});n("event",t,l)}}/**
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
 */async function Mh(){if(nr())try{await ir()}catch(n){return te.warn(ne.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return te.warn(ne.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Uh(n,e,t,r,s,a,l){var h;const d=Oh(n);d.then(P=>{t[P.measurementId]=P.appId,n.options.measurementId&&P.measurementId!==n.options.measurementId&&te.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${P.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(P=>te.error(P)),e.push(d);const I=Mh().then(P=>{if(P)return r.getId()}),[T,A]=await Promise.all([d,I]);Sh(a)||_h(a,T.measurementId),s("js",new Date);const b=(h=l==null?void 0:l.config)!==null&&h!==void 0?h:{};return b[fh]="firebase",b.update=!0,A!=null&&(b[dh]=A),s("config",T.measurementId,b),T.measurementId}/**
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
 */class Fh{constructor(e){this.app=e}_delete(){return delete Wt[this.app.options.appId],Promise.resolve()}}let Wt={},Fs=[];const js={};let Mi="dataLayer",jh="gtag",Vs,va,Bs=!1;function Vh(){const n=[];if(tr()&&n.push("This is a browser extension environment."),qo()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),t=ne.create("invalid-analytics-context",{errorInfo:e});te.warn(t.message)}}function Bh(n,e,t){Vh();const r=n.options.appId;if(!r)throw ne.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)te.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ne.create("no-api-key");if(Wt[r]!=null)throw ne.create("already-exists",{id:r});if(!Bs){wh(Mi);const{wrappedGtag:a,gtagCore:l}=Th(Wt,Fs,js,Mi,jh);va=a,Vs=l,Bs=!0}return Wt[r]=Uh(n,Fs,js,e,Vs,Mi,t),new Fh(n)}function $h(n=sr()){n=ge(n);const e=ht(n,$n);return e.isInitialized()?e.getImmediate():Hh(n)}function Hh(n,e={}){const t=ht(n,$n);if(t.isInitialized()){const s=t.getImmediate();if(We(e,t.getOptions()))return s;throw ne.create("already-initialized")}return t.initialize({options:e})}async function qh(){if(tr()||!qo()||!nr())return!1;try{return await ir()}catch{return!1}}function zh(n,e,t,r){n=ge(n),xh(va,Wt[n.app.options.appId],e,t,r).catch(s=>te.error(s))}const $s="@firebase/analytics",Hs="0.10.17";function Wh(){Ee(new de($n,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return Bh(r,s,t)},"PUBLIC")),Ee(new de("analytics-internal",n,"PRIVATE")),se($s,Hs),se($s,Hs,"esm2017");function n(e){try{const t=e.getProvider($n).getImmediate();return{logEvent:(r,s,a)=>zh(t,r,s,a)}}catch(t){throw ne.create("interop-component-reg-failed",{reason:t})}}}Wh();var qs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hr;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,f){function p(){}p.prototype=f.prototype,v.D=f.prototype,v.prototype=new p,v.prototype.constructor=v,v.C=function(m,y,w){for(var g=Array(arguments.length-2),be=2;be<arguments.length;be++)g[be-2]=arguments[be];return f.prototype[y].apply(m,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,f,p){p||(p=0);var m=Array(16);if(typeof f=="string")for(var y=0;16>y;++y)m[y]=f.charCodeAt(p++)|f.charCodeAt(p++)<<8|f.charCodeAt(p++)<<16|f.charCodeAt(p++)<<24;else for(y=0;16>y;++y)m[y]=f[p++]|f[p++]<<8|f[p++]<<16|f[p++]<<24;f=v.g[0],p=v.g[1],y=v.g[2];var w=v.g[3],g=f+(w^p&(y^w))+m[0]+3614090360&4294967295;f=p+(g<<7&4294967295|g>>>25),g=w+(y^f&(p^y))+m[1]+3905402710&4294967295,w=f+(g<<12&4294967295|g>>>20),g=y+(p^w&(f^p))+m[2]+606105819&4294967295,y=w+(g<<17&4294967295|g>>>15),g=p+(f^y&(w^f))+m[3]+3250441966&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(w^p&(y^w))+m[4]+4118548399&4294967295,f=p+(g<<7&4294967295|g>>>25),g=w+(y^f&(p^y))+m[5]+1200080426&4294967295,w=f+(g<<12&4294967295|g>>>20),g=y+(p^w&(f^p))+m[6]+2821735955&4294967295,y=w+(g<<17&4294967295|g>>>15),g=p+(f^y&(w^f))+m[7]+4249261313&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(w^p&(y^w))+m[8]+1770035416&4294967295,f=p+(g<<7&4294967295|g>>>25),g=w+(y^f&(p^y))+m[9]+2336552879&4294967295,w=f+(g<<12&4294967295|g>>>20),g=y+(p^w&(f^p))+m[10]+4294925233&4294967295,y=w+(g<<17&4294967295|g>>>15),g=p+(f^y&(w^f))+m[11]+2304563134&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(w^p&(y^w))+m[12]+1804603682&4294967295,f=p+(g<<7&4294967295|g>>>25),g=w+(y^f&(p^y))+m[13]+4254626195&4294967295,w=f+(g<<12&4294967295|g>>>20),g=y+(p^w&(f^p))+m[14]+2792965006&4294967295,y=w+(g<<17&4294967295|g>>>15),g=p+(f^y&(w^f))+m[15]+1236535329&4294967295,p=y+(g<<22&4294967295|g>>>10),g=f+(y^w&(p^y))+m[1]+4129170786&4294967295,f=p+(g<<5&4294967295|g>>>27),g=w+(p^y&(f^p))+m[6]+3225465664&4294967295,w=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(w^f))+m[11]+643717713&4294967295,y=w+(g<<14&4294967295|g>>>18),g=p+(w^f&(y^w))+m[0]+3921069994&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^w&(p^y))+m[5]+3593408605&4294967295,f=p+(g<<5&4294967295|g>>>27),g=w+(p^y&(f^p))+m[10]+38016083&4294967295,w=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(w^f))+m[15]+3634488961&4294967295,y=w+(g<<14&4294967295|g>>>18),g=p+(w^f&(y^w))+m[4]+3889429448&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^w&(p^y))+m[9]+568446438&4294967295,f=p+(g<<5&4294967295|g>>>27),g=w+(p^y&(f^p))+m[14]+3275163606&4294967295,w=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(w^f))+m[3]+4107603335&4294967295,y=w+(g<<14&4294967295|g>>>18),g=p+(w^f&(y^w))+m[8]+1163531501&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(y^w&(p^y))+m[13]+2850285829&4294967295,f=p+(g<<5&4294967295|g>>>27),g=w+(p^y&(f^p))+m[2]+4243563512&4294967295,w=f+(g<<9&4294967295|g>>>23),g=y+(f^p&(w^f))+m[7]+1735328473&4294967295,y=w+(g<<14&4294967295|g>>>18),g=p+(w^f&(y^w))+m[12]+2368359562&4294967295,p=y+(g<<20&4294967295|g>>>12),g=f+(p^y^w)+m[5]+4294588738&4294967295,f=p+(g<<4&4294967295|g>>>28),g=w+(f^p^y)+m[8]+2272392833&4294967295,w=f+(g<<11&4294967295|g>>>21),g=y+(w^f^p)+m[11]+1839030562&4294967295,y=w+(g<<16&4294967295|g>>>16),g=p+(y^w^f)+m[14]+4259657740&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^w)+m[1]+2763975236&4294967295,f=p+(g<<4&4294967295|g>>>28),g=w+(f^p^y)+m[4]+1272893353&4294967295,w=f+(g<<11&4294967295|g>>>21),g=y+(w^f^p)+m[7]+4139469664&4294967295,y=w+(g<<16&4294967295|g>>>16),g=p+(y^w^f)+m[10]+3200236656&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^w)+m[13]+681279174&4294967295,f=p+(g<<4&4294967295|g>>>28),g=w+(f^p^y)+m[0]+3936430074&4294967295,w=f+(g<<11&4294967295|g>>>21),g=y+(w^f^p)+m[3]+3572445317&4294967295,y=w+(g<<16&4294967295|g>>>16),g=p+(y^w^f)+m[6]+76029189&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(p^y^w)+m[9]+3654602809&4294967295,f=p+(g<<4&4294967295|g>>>28),g=w+(f^p^y)+m[12]+3873151461&4294967295,w=f+(g<<11&4294967295|g>>>21),g=y+(w^f^p)+m[15]+530742520&4294967295,y=w+(g<<16&4294967295|g>>>16),g=p+(y^w^f)+m[2]+3299628645&4294967295,p=y+(g<<23&4294967295|g>>>9),g=f+(y^(p|~w))+m[0]+4096336452&4294967295,f=p+(g<<6&4294967295|g>>>26),g=w+(p^(f|~y))+m[7]+1126891415&4294967295,w=f+(g<<10&4294967295|g>>>22),g=y+(f^(w|~p))+m[14]+2878612391&4294967295,y=w+(g<<15&4294967295|g>>>17),g=p+(w^(y|~f))+m[5]+4237533241&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~w))+m[12]+1700485571&4294967295,f=p+(g<<6&4294967295|g>>>26),g=w+(p^(f|~y))+m[3]+2399980690&4294967295,w=f+(g<<10&4294967295|g>>>22),g=y+(f^(w|~p))+m[10]+4293915773&4294967295,y=w+(g<<15&4294967295|g>>>17),g=p+(w^(y|~f))+m[1]+2240044497&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~w))+m[8]+1873313359&4294967295,f=p+(g<<6&4294967295|g>>>26),g=w+(p^(f|~y))+m[15]+4264355552&4294967295,w=f+(g<<10&4294967295|g>>>22),g=y+(f^(w|~p))+m[6]+2734768916&4294967295,y=w+(g<<15&4294967295|g>>>17),g=p+(w^(y|~f))+m[13]+1309151649&4294967295,p=y+(g<<21&4294967295|g>>>11),g=f+(y^(p|~w))+m[4]+4149444226&4294967295,f=p+(g<<6&4294967295|g>>>26),g=w+(p^(f|~y))+m[11]+3174756917&4294967295,w=f+(g<<10&4294967295|g>>>22),g=y+(f^(w|~p))+m[2]+718787259&4294967295,y=w+(g<<15&4294967295|g>>>17),g=p+(w^(y|~f))+m[9]+3951481745&4294967295,v.g[0]=v.g[0]+f&4294967295,v.g[1]=v.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+y&4294967295,v.g[3]=v.g[3]+w&4294967295}r.prototype.u=function(v,f){f===void 0&&(f=v.length);for(var p=f-this.blockSize,m=this.B,y=this.h,w=0;w<f;){if(y==0)for(;w<=p;)s(this,v,w),w+=this.blockSize;if(typeof v=="string"){for(;w<f;)if(m[y++]=v.charCodeAt(w++),y==this.blockSize){s(this,m),y=0;break}}else for(;w<f;)if(m[y++]=v[w++],y==this.blockSize){s(this,m),y=0;break}}this.h=y,this.o+=f},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var f=1;f<v.length-8;++f)v[f]=0;var p=8*this.o;for(f=v.length-8;f<v.length;++f)v[f]=p&255,p/=256;for(this.u(v),v=Array(16),f=p=0;4>f;++f)for(var m=0;32>m;m+=8)v[p++]=this.g[f]>>>m&255;return v};function a(v,f){var p=h;return Object.prototype.hasOwnProperty.call(p,v)?p[v]:p[v]=f(v)}function l(v,f){this.h=f;for(var p=[],m=!0,y=v.length-1;0<=y;y--){var w=v[y]|0;m&&w==f||(p[y]=w,m=!1)}this.g=p}var h={};function d(v){return-128<=v&&128>v?a(v,function(f){return new l([f|0],0>f?-1:0)}):new l([v|0],0>v?-1:0)}function I(v){if(isNaN(v)||!isFinite(v))return A;if(0>v)return L(I(-v));for(var f=[],p=1,m=0;v>=p;m++)f[m]=v/p|0,p*=4294967296;return new l(f,0)}function T(v,f){if(v.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(v.charAt(0)=="-")return L(T(v.substring(1),f));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=I(Math.pow(f,8)),m=A,y=0;y<v.length;y+=8){var w=Math.min(8,v.length-y),g=parseInt(v.substring(y,y+w),f);8>w?(w=I(Math.pow(f,w)),m=m.j(w).add(I(g))):(m=m.j(p),m=m.add(I(g)))}return m}var A=d(0),b=d(1),P=d(16777216);n=l.prototype,n.m=function(){if(M(this))return-L(this).m();for(var v=0,f=1,p=0;p<this.g.length;p++){var m=this.i(p);v+=(0<=m?m:4294967296+m)*f,f*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(M(this))return"-"+L(this).toString(v);for(var f=I(Math.pow(v,6)),p=this,m="";;){var y=X(p,f).g;p=j(p,y.j(f));var w=((0<p.g.length?p.g[0]:p.h)>>>0).toString(v);if(p=y,k(p))return w+m;for(;6>w.length;)w="0"+w;m=w+m}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var f=0;f<v.g.length;f++)if(v.g[f]!=0)return!1;return!0}function M(v){return v.h==-1}n.l=function(v){return v=j(this,v),M(v)?-1:k(v)?0:1};function L(v){for(var f=v.g.length,p=[],m=0;m<f;m++)p[m]=~v.g[m];return new l(p,~v.h).add(b)}n.abs=function(){return M(this)?L(this):this},n.add=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0,y=0;y<=f;y++){var w=m+(this.i(y)&65535)+(v.i(y)&65535),g=(w>>>16)+(this.i(y)>>>16)+(v.i(y)>>>16);m=g>>>16,w&=65535,g&=65535,p[y]=g<<16|w}return new l(p,p[p.length-1]&-2147483648?-1:0)};function j(v,f){return v.add(L(f))}n.j=function(v){if(k(this)||k(v))return A;if(M(this))return M(v)?L(this).j(L(v)):L(L(this).j(v));if(M(v))return L(this.j(L(v)));if(0>this.l(P)&&0>v.l(P))return I(this.m()*v.m());for(var f=this.g.length+v.g.length,p=[],m=0;m<2*f;m++)p[m]=0;for(m=0;m<this.g.length;m++)for(var y=0;y<v.g.length;y++){var w=this.i(m)>>>16,g=this.i(m)&65535,be=v.i(y)>>>16,At=v.i(y)&65535;p[2*m+2*y]+=g*At,$(p,2*m+2*y),p[2*m+2*y+1]+=w*At,$(p,2*m+2*y+1),p[2*m+2*y+1]+=g*be,$(p,2*m+2*y+1),p[2*m+2*y+2]+=w*be,$(p,2*m+2*y+2)}for(m=0;m<f;m++)p[m]=p[2*m+1]<<16|p[2*m];for(m=f;m<2*f;m++)p[m]=0;return new l(p,0)};function $(v,f){for(;(v[f]&65535)!=v[f];)v[f+1]+=v[f]>>>16,v[f]&=65535,f++}function V(v,f){this.g=v,this.h=f}function X(v,f){if(k(f))throw Error("division by zero");if(k(v))return new V(A,A);if(M(v))return f=X(L(v),f),new V(L(f.g),L(f.h));if(M(f))return f=X(v,L(f)),new V(L(f.g),f.h);if(30<v.g.length){if(M(v)||M(f))throw Error("slowDivide_ only works with positive integers.");for(var p=b,m=f;0>=m.l(v);)p=me(p),m=me(m);var y=z(p,1),w=z(m,1);for(m=z(m,2),p=z(p,2);!k(m);){var g=w.add(m);0>=g.l(v)&&(y=y.add(p),w=g),m=z(m,1),p=z(p,1)}return f=j(v,y.j(f)),new V(y,f)}for(y=A;0<=v.l(f);){for(p=Math.max(1,Math.floor(v.m()/f.m())),m=Math.ceil(Math.log(p)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),w=I(p),g=w.j(f);M(g)||0<g.l(v);)p-=m,w=I(p),g=w.j(f);k(w)&&(w=b),y=y.add(w),v=j(v,g)}return new V(y,v)}n.A=function(v){return X(this,v).h},n.and=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)&v.i(m);return new l(p,this.h&v.h)},n.or=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)|v.i(m);return new l(p,this.h|v.h)},n.xor=function(v){for(var f=Math.max(this.g.length,v.g.length),p=[],m=0;m<f;m++)p[m]=this.i(m)^v.i(m);return new l(p,this.h^v.h)};function me(v){for(var f=v.g.length+1,p=[],m=0;m<f;m++)p[m]=v.i(m)<<1|v.i(m-1)>>>31;return new l(p,v.h)}function z(v,f){var p=f>>5;f%=32;for(var m=v.g.length-p,y=[],w=0;w<m;w++)y[w]=0<f?v.i(w+p)>>>f|v.i(w+p+1)<<32-f:v.i(w+p);return new l(y,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=I,l.fromString=T,hr=l}).apply(typeof qs<"u"?qs:typeof self<"u"?self:typeof window<"u"?window:{});var Cn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,o,c){return i==Array.prototype||i==Object.prototype||(i[o]=c.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Cn=="object"&&Cn];for(var o=0;o<i.length;++o){var c=i[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=t(this);function s(i,o){if(o)e:{var c=r;i=i.split(".");for(var u=0;u<i.length-1;u++){var _=i[u];if(!(_ in c))break e;c=c[_]}i=i[i.length-1],u=c[i],o=o(u),o!=u&&o!=null&&e(c,i,{configurable:!0,writable:!0,value:o})}}function a(i,o){i instanceof String&&(i+="");var c=0,u=!1,_={next:function(){if(!u&&c<i.length){var E=c++;return{value:o(E,i[E]),done:!1}}return u=!0,{done:!0,value:void 0}}};return _[Symbol.iterator]=function(){return _},_}s("Array.prototype.values",function(i){return i||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function d(i){var o=typeof i;return o=o!="object"?o:i?Array.isArray(i)?"array":o:"null",o=="array"||o=="object"&&typeof i.length=="number"}function I(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function T(i,o,c){return i.call.apply(i.bind,arguments)}function A(i,o,c){if(!i)throw Error();if(2<arguments.length){var u=Array.prototype.slice.call(arguments,2);return function(){var _=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(_,u),i.apply(o,_)}}return function(){return i.apply(o,arguments)}}function b(i,o,c){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?T:A,b.apply(null,arguments)}function P(i,o){var c=Array.prototype.slice.call(arguments,1);return function(){var u=c.slice();return u.push.apply(u,arguments),i.apply(this,u)}}function k(i,o){function c(){}c.prototype=o.prototype,i.aa=o.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(u,_,E){for(var S=Array(arguments.length-2),U=2;U<arguments.length;U++)S[U-2]=arguments[U];return o.prototype[_].apply(u,S)}}function M(i){const o=i.length;if(0<o){const c=Array(o);for(let u=0;u<o;u++)c[u]=i[u];return c}return[]}function L(i,o){for(let c=1;c<arguments.length;c++){const u=arguments[c];if(d(u)){const _=i.length||0,E=u.length||0;i.length=_+E;for(let S=0;S<E;S++)i[_+S]=u[S]}else i.push(u)}}class j{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function $(i){return/^[\s\xa0]*$/.test(i)}function V(){var i=h.navigator;return i&&(i=i.userAgent)?i:""}function X(i){return X[" "](i),i}X[" "]=function(){};var me=V().indexOf("Gecko")!=-1&&!(V().toLowerCase().indexOf("webkit")!=-1&&V().indexOf("Edge")==-1)&&!(V().indexOf("Trident")!=-1||V().indexOf("MSIE")!=-1)&&V().indexOf("Edge")==-1;function z(i,o,c){for(const u in i)o.call(c,i[u],u,i)}function v(i,o){for(const c in i)o.call(void 0,i[c],c,i)}function f(i){const o={};for(const c in i)o[c]=i[c];return o}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(i,o){let c,u;for(let _=1;_<arguments.length;_++){u=arguments[_];for(c in u)i[c]=u[c];for(let E=0;E<p.length;E++)c=p[E],Object.prototype.hasOwnProperty.call(u,c)&&(i[c]=u[c])}}function y(i){var o=1;i=i.split(":");const c=[];for(;0<o&&i.length;)c.push(i.shift()),o--;return i.length&&c.push(i.join(":")),c}function w(i){h.setTimeout(()=>{throw i},0)}function g(){var i=ii;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class be{constructor(){this.h=this.g=null}add(o,c){const u=At.get();u.set(o,c),this.h?this.h.next=u:this.g=u,this.h=u}}var At=new j(()=>new ac,i=>i.reset());class ac{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let Ct,kt=!1,ii=new be,Ar=()=>{const i=h.Promise.resolve(void 0);Ct=()=>{i.then(cc)}};var cc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(c){w(c)}var o=At;o.j(i),100>o.h&&(o.h++,i.next=o.g,o.g=i)}kt=!1};function De(){this.s=this.s,this.C=this.C}De.prototype.s=!1,De.prototype.ma=function(){this.s||(this.s=!0,this.N())},De.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function W(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}W.prototype.h=function(){this.defaultPrevented=!0};var lc=(function(){if(!h.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};h.addEventListener("test",c,o),h.removeEventListener("test",c,o)}catch{}return i})();function Pt(i,o){if(W.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,u=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget){if(me){e:{try{X(o.nodeName);var _=!0;break e}catch{}_=!1}_||(o=null)}}else c=="mouseover"?o=i.fromElement:c=="mouseout"&&(o=i.toElement);this.relatedTarget=o,u?(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:uc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Pt.aa.h.call(this)}}k(Pt,W);var uc={2:"touch",3:"pen",4:"mouse"};Pt.prototype.h=function(){Pt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var hn="closure_listenable_"+(1e6*Math.random()|0),hc=0;function dc(i,o,c,u,_){this.listener=i,this.proxy=null,this.src=o,this.type=c,this.capture=!!u,this.ha=_,this.key=++hc,this.da=this.fa=!1}function dn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function fn(i){this.src=i,this.g={},this.h=0}fn.prototype.add=function(i,o,c,u,_){var E=i.toString();i=this.g[E],i||(i=this.g[E]=[],this.h++);var S=si(i,o,u,_);return-1<S?(o=i[S],c||(o.fa=!1)):(o=new dc(o,this.src,E,!!u,_),o.fa=c,i.push(o)),o};function ri(i,o){var c=o.type;if(c in i.g){var u=i.g[c],_=Array.prototype.indexOf.call(u,o,void 0),E;(E=0<=_)&&Array.prototype.splice.call(u,_,1),E&&(dn(o),i.g[c].length==0&&(delete i.g[c],i.h--))}}function si(i,o,c,u){for(var _=0;_<i.length;++_){var E=i[_];if(!E.da&&E.listener==o&&E.capture==!!c&&E.ha==u)return _}return-1}var oi="closure_lm_"+(1e6*Math.random()|0),ai={};function Cr(i,o,c,u,_){if(Array.isArray(o)){for(var E=0;E<o.length;E++)Cr(i,o[E],c,u,_);return null}return c=Rr(c),i&&i[hn]?i.K(o,c,I(u)?!!u.capture:!1,_):fc(i,o,c,!1,u,_)}function fc(i,o,c,u,_,E){if(!o)throw Error("Invalid event type");var S=I(_)?!!_.capture:!!_,U=li(i);if(U||(i[oi]=U=new fn(i)),c=U.add(o,c,u,S,E),c.proxy)return c;if(u=pc(),c.proxy=u,u.src=i,u.listener=c,i.addEventListener)lc||(_=S),_===void 0&&(_=!1),i.addEventListener(o.toString(),u,_);else if(i.attachEvent)i.attachEvent(Pr(o.toString()),u);else if(i.addListener&&i.removeListener)i.addListener(u);else throw Error("addEventListener and attachEvent are unavailable.");return c}function pc(){function i(c){return o.call(i.src,i.listener,c)}const o=gc;return i}function kr(i,o,c,u,_){if(Array.isArray(o))for(var E=0;E<o.length;E++)kr(i,o[E],c,u,_);else u=I(u)?!!u.capture:!!u,c=Rr(c),i&&i[hn]?(i=i.i,o=String(o).toString(),o in i.g&&(E=i.g[o],c=si(E,c,u,_),-1<c&&(dn(E[c]),Array.prototype.splice.call(E,c,1),E.length==0&&(delete i.g[o],i.h--)))):i&&(i=li(i))&&(o=i.g[o.toString()],i=-1,o&&(i=si(o,c,u,_)),(c=-1<i?o[i]:null)&&ci(c))}function ci(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[hn])ri(o.i,i);else{var c=i.type,u=i.proxy;o.removeEventListener?o.removeEventListener(c,u,i.capture):o.detachEvent?o.detachEvent(Pr(c),u):o.addListener&&o.removeListener&&o.removeListener(u),(c=li(o))?(ri(c,i),c.h==0&&(c.src=null,o[oi]=null)):dn(i)}}}function Pr(i){return i in ai?ai[i]:ai[i]="on"+i}function gc(i,o){if(i.da)i=!0;else{o=new Pt(o,this);var c=i.listener,u=i.ha||i.src;i.fa&&ci(i),i=c.call(u,o)}return i}function li(i){return i=i[oi],i instanceof fn?i:null}var ui="__closure_events_fn_"+(1e9*Math.random()>>>0);function Rr(i){return typeof i=="function"?i:(i[ui]||(i[ui]=function(o){return i.handleEvent(o)}),i[ui])}function G(){De.call(this),this.i=new fn(this),this.M=this,this.F=null}k(G,De),G.prototype[hn]=!0,G.prototype.removeEventListener=function(i,o,c,u){kr(this,i,o,c,u)};function Y(i,o){var c,u=i.F;if(u)for(c=[];u;u=u.F)c.push(u);if(i=i.M,u=o.type||o,typeof o=="string")o=new W(o,i);else if(o instanceof W)o.target=o.target||i;else{var _=o;o=new W(u,i),m(o,_)}if(_=!0,c)for(var E=c.length-1;0<=E;E--){var S=o.g=c[E];_=pn(S,u,!0,o)&&_}if(S=o.g=i,_=pn(S,u,!0,o)&&_,_=pn(S,u,!1,o)&&_,c)for(E=0;E<c.length;E++)S=o.g=c[E],_=pn(S,u,!1,o)&&_}G.prototype.N=function(){if(G.aa.N.call(this),this.i){var i=this.i,o;for(o in i.g){for(var c=i.g[o],u=0;u<c.length;u++)dn(c[u]);delete i.g[o],i.h--}}this.F=null},G.prototype.K=function(i,o,c,u){return this.i.add(String(i),o,!1,c,u)},G.prototype.L=function(i,o,c,u){return this.i.add(String(i),o,!0,c,u)};function pn(i,o,c,u){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();for(var _=!0,E=0;E<o.length;++E){var S=o[E];if(S&&!S.da&&S.capture==c){var U=S.listener,q=S.ha||S.src;S.fa&&ri(i.i,S),_=U.call(q,u)!==!1&&_}}return _&&!u.defaultPrevented}function Or(i,o,c){if(typeof i=="function")c&&(i=b(i,c));else if(i&&typeof i.handleEvent=="function")i=b(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:h.setTimeout(i,o||0)}function Nr(i){i.g=Or(()=>{i.g=null,i.i&&(i.i=!1,Nr(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class mc extends De{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:Nr(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rt(i){De.call(this),this.h=i,this.g={}}k(Rt,De);var Dr=[];function Lr(i){z(i.g,function(o,c){this.g.hasOwnProperty(c)&&ci(o)},i),i.g={}}Rt.prototype.N=function(){Rt.aa.N.call(this),Lr(this)},Rt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var hi=h.JSON.stringify,yc=h.JSON.parse,vc=class{stringify(i){return h.JSON.stringify(i,void 0)}parse(i){return h.JSON.parse(i,void 0)}};function di(){}di.prototype.h=null;function xr(i){return i.h||(i.h=i.i())}function _c(){}var Ot={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function fi(){W.call(this,"d")}k(fi,W);function pi(){W.call(this,"c")}k(pi,W);var ft={},Mr=null;function gi(){return Mr=Mr||new G}ft.La="serverreachability";function Ur(i){W.call(this,ft.La,i)}k(Ur,W);function Nt(i){const o=gi();Y(o,new Ur(o))}ft.STAT_EVENT="statevent";function Fr(i,o){W.call(this,ft.STAT_EVENT,i),this.stat=o}k(Fr,W);function Z(i){const o=gi();Y(o,new Fr(o,i))}ft.Ma="timingevent";function jr(i,o){W.call(this,ft.Ma,i),this.size=o}k(jr,W);function Dt(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){i()},o)}function Lt(){this.g=!0}Lt.prototype.xa=function(){this.g=!1};function wc(i,o,c,u,_,E){i.info(function(){if(i.g)if(E)for(var S="",U=E.split("&"),q=0;q<U.length;q++){var D=U[q].split("=");if(1<D.length){var K=D[0];D=D[1];var J=K.split("_");S=2<=J.length&&J[1]=="type"?S+(K+"="+D+"&"):S+(K+"=redacted&")}}else S=null;else S=E;return"XMLHTTP REQ ("+u+") [attempt "+_+"]: "+o+`
`+c+`
`+S})}function Ic(i,o,c,u,_,E,S){i.info(function(){return"XMLHTTP RESP ("+u+") [ attempt "+_+"]: "+o+`
`+c+`
`+E+" "+S})}function pt(i,o,c,u){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+bc(i,c)+(u?" "+u:"")})}function Ec(i,o){i.info(function(){return"TIMEOUT: "+o})}Lt.prototype.info=function(){};function bc(i,o){if(!i.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var u=c[i];if(!(2>u.length)){var _=u[1];if(Array.isArray(_)&&!(1>_.length)){var E=_[0];if(E!="noop"&&E!="stop"&&E!="close")for(var S=1;S<_.length;S++)_[S]=""}}}}return hi(c)}catch{return o}}var mi={NO_ERROR:0,TIMEOUT:8},Tc={},yi;function gn(){}k(gn,di),gn.prototype.g=function(){return new XMLHttpRequest},gn.prototype.i=function(){return{}},yi=new gn;function Le(i,o,c,u){this.j=i,this.i=o,this.l=c,this.R=u||1,this.U=new Rt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vr}function Vr(){this.i=null,this.g="",this.h=!1}var Br={},vi={};function _i(i,o,c){i.L=1,i.v=_n(Te(o)),i.m=c,i.P=!0,$r(i,null)}function $r(i,o){i.F=Date.now(),mn(i),i.A=Te(i.v);var c=i.A,u=i.R;Array.isArray(u)||(u=[String(u)]),ns(c.i,"t",u),i.C=0,c=i.j.J,i.h=new Vr,i.g=ws(i.j,c?o:null,!i.m),0<i.O&&(i.M=new mc(b(i.Y,i,i.g),i.O)),o=i.U,c=i.g,u=i.ca;var _="readystatechange";Array.isArray(_)||(_&&(Dr[0]=_.toString()),_=Dr);for(var E=0;E<_.length;E++){var S=Cr(c,_[E],u||o.handleEvent,!1,o.h||o);if(!S)break;o.g[S.key]=S}o=i.H?f(i.H):{},i.m?(i.u||(i.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,o)):(i.u="GET",i.g.ea(i.A,i.u,null,o)),Nt(),wc(i.i,i.u,i.A,i.l,i.R,i.m)}Le.prototype.ca=function(i){i=i.target;const o=this.M;o&&Se(i)==3?o.j():this.Y(i)},Le.prototype.Y=function(i){try{if(i==this.g)e:{const J=Se(this.g);var o=this.g.Ba();const yt=this.g.Z();if(!(3>J)&&(J!=3||this.g&&(this.h.h||this.g.oa()||ls(this.g)))){this.J||J!=4||o==7||(o==8||0>=yt?Nt(3):Nt(2)),wi(this);var c=this.g.Z();this.X=c;t:if(Hr(this)){var u=ls(this.g);i="";var _=u.length,E=Se(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Je(this),xt(this);var S="";break t}this.h.i=new h.TextDecoder}for(o=0;o<_;o++)this.h.h=!0,i+=this.h.i.decode(u[o],{stream:!(E&&o==_-1)});u.length=0,this.h.g+=i,this.C=0,S=this.h.g}else S=this.g.oa();if(this.o=c==200,Ic(this.i,this.u,this.A,this.l,this.R,J,c),this.o){if(this.T&&!this.K){t:{if(this.g){var U,q=this.g;if((U=q.g?q.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!$(U)){var D=U;break t}}D=null}if(c=D)pt(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ii(this,c);else{this.o=!1,this.s=3,Z(12),Je(this),xt(this);break e}}if(this.P){c=!0;let oe;for(;!this.J&&this.C<S.length;)if(oe=Sc(this,S),oe==vi){J==4&&(this.s=4,Z(14),c=!1),pt(this.i,this.l,null,"[Incomplete Response]");break}else if(oe==Br){this.s=4,Z(15),pt(this.i,this.l,S,"[Invalid Chunk]"),c=!1;break}else pt(this.i,this.l,oe,null),Ii(this,oe);if(Hr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||S.length!=0||this.h.h||(this.s=1,Z(16),c=!1),this.o=this.o&&c,!c)pt(this.i,this.l,S,"[Invalid Chunked Response]"),Je(this),xt(this);else if(0<S.length&&!this.W){this.W=!0;var K=this.j;K.g==this&&K.ba&&!K.M&&(K.j.info("Great, no buffering proxy detected. Bytes received: "+S.length),Ci(K),K.M=!0,Z(11))}}else pt(this.i,this.l,S,null),Ii(this,S);J==4&&Je(this),this.o&&!this.J&&(J==4?ms(this.j,this):(this.o=!1,mn(this)))}else $c(this.g),c==400&&0<S.indexOf("Unknown SID")?(this.s=3,Z(12)):(this.s=0,Z(13)),Je(this),xt(this)}}}catch{}finally{}};function Hr(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Sc(i,o){var c=i.C,u=o.indexOf(`
`,c);return u==-1?vi:(c=Number(o.substring(c,u)),isNaN(c)?Br:(u+=1,u+c>o.length?vi:(o=o.slice(u,u+c),i.C=u+c,o)))}Le.prototype.cancel=function(){this.J=!0,Je(this)};function mn(i){i.S=Date.now()+i.I,qr(i,i.I)}function qr(i,o){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Dt(b(i.ba,i),o)}function wi(i){i.B&&(h.clearTimeout(i.B),i.B=null)}Le.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Ec(this.i,this.A),this.L!=2&&(Nt(),Z(17)),Je(this),this.s=2,xt(this)):qr(this,this.S-i)};function xt(i){i.j.G==0||i.J||ms(i.j,i)}function Je(i){wi(i);var o=i.M;o&&typeof o.ma=="function"&&o.ma(),i.M=null,Lr(i.U),i.g&&(o=i.g,i.g=null,o.abort(),o.ma())}function Ii(i,o){try{var c=i.j;if(c.G!=0&&(c.g==i||Ei(c.h,i))){if(!i.K&&Ei(c.h,i)&&c.G==3){try{var u=c.Da.g.parse(o)}catch{u=null}if(Array.isArray(u)&&u.length==3){var _=u;if(_[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)Sn(c),bn(c);else break e;Ai(c),Z(18)}}else c.za=_[1],0<c.za-c.T&&37500>_[2]&&c.F&&c.v==0&&!c.C&&(c.C=Dt(b(c.Za,c),6e3));if(1>=Gr(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else Ye(c,11)}else if((i.K||c.g==i)&&Sn(c),!$(o))for(_=c.Da.g.parse(o),o=0;o<_.length;o++){let D=_[o];if(c.T=D[0],D=D[1],c.G==2)if(D[0]=="c"){c.K=D[1],c.ia=D[2];const K=D[3];K!=null&&(c.la=K,c.j.info("VER="+c.la));const J=D[4];J!=null&&(c.Aa=J,c.j.info("SVER="+c.Aa));const yt=D[5];yt!=null&&typeof yt=="number"&&0<yt&&(u=1.5*yt,c.L=u,c.j.info("backChannelRequestTimeoutMs_="+u)),u=c;const oe=i.g;if(oe){const An=oe.g?oe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(An){var E=u.h;E.g||An.indexOf("spdy")==-1&&An.indexOf("quic")==-1&&An.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(bi(E,E.h),E.h=null))}if(u.D){const ki=oe.g?oe.g.getResponseHeader("X-HTTP-Session-Id"):null;ki&&(u.ya=ki,F(u.I,u.D,ki))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),u=c;var S=i;if(u.qa=_s(u,u.J?u.ia:null,u.W),S.K){Kr(u.h,S);var U=S,q=u.L;q&&(U.I=q),U.B&&(wi(U),mn(U)),u.g=S}else ps(u);0<c.i.length&&Tn(c)}else D[0]!="stop"&&D[0]!="close"||Ye(c,7);else c.G==3&&(D[0]=="stop"||D[0]=="close"?D[0]=="stop"?Ye(c,7):Si(c):D[0]!="noop"&&c.l&&c.l.ta(D),c.v=0)}}Nt(4)}catch{}}var Ac=class{constructor(i,o){this.g=i,this.map=o}};function zr(i){this.l=i||10,h.PerformanceNavigationTiming?(i=h.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wr(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Gr(i){return i.h?1:i.g?i.g.size:0}function Ei(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function bi(i,o){i.g?i.g.add(o):i.h=o}function Kr(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}zr.prototype.cancel=function(){if(this.i=Jr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Jr(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const c of i.g.values())o=o.concat(c.D);return o}return M(i.i)}function Cc(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(d(i)){for(var o=[],c=i.length,u=0;u<c;u++)o.push(i[u]);return o}o=[],c=0;for(u in i)o[c++]=i[u];return o}function kc(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(d(i)||typeof i=="string"){var o=[];i=i.length;for(var c=0;c<i;c++)o.push(c);return o}o=[],c=0;for(const u in i)o[c++]=u;return o}}}function Xr(i,o){if(i.forEach&&typeof i.forEach=="function")i.forEach(o,void 0);else if(d(i)||typeof i=="string")Array.prototype.forEach.call(i,o,void 0);else for(var c=kc(i),u=Cc(i),_=u.length,E=0;E<_;E++)o.call(void 0,u[E],c&&c[E],i)}var Yr=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pc(i,o){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var u=i[c].indexOf("="),_=null;if(0<=u){var E=i[c].substring(0,u);_=i[c].substring(u+1)}else E=i[c];o(E,_?decodeURIComponent(_.replace(/\+/g," ")):"")}}}function Xe(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Xe){this.h=i.h,yn(this,i.j),this.o=i.o,this.g=i.g,vn(this,i.s),this.l=i.l;var o=i.i,c=new Ft;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),Zr(this,c),this.m=i.m}else i&&(o=String(i).match(Yr))?(this.h=!1,yn(this,o[1]||"",!0),this.o=Mt(o[2]||""),this.g=Mt(o[3]||"",!0),vn(this,o[4]),this.l=Mt(o[5]||"",!0),Zr(this,o[6]||"",!0),this.m=Mt(o[7]||"")):(this.h=!1,this.i=new Ft(null,this.h))}Xe.prototype.toString=function(){var i=[],o=this.j;o&&i.push(Ut(o,Qr,!0),":");var c=this.g;return(c||o=="file")&&(i.push("//"),(o=this.o)&&i.push(Ut(o,Qr,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Ut(c,c.charAt(0)=="/"?Nc:Oc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Ut(c,Lc)),i.join("")};function Te(i){return new Xe(i)}function yn(i,o,c){i.j=c?Mt(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function vn(i,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);i.s=o}else i.s=null}function Zr(i,o,c){o instanceof Ft?(i.i=o,xc(i.i,i.h)):(c||(o=Ut(o,Dc)),i.i=new Ft(o,i.h))}function F(i,o,c){i.i.set(o,c)}function _n(i){return F(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Mt(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ut(i,o,c){return typeof i=="string"?(i=encodeURI(i).replace(o,Rc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Rc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Qr=/[#\/\?@]/g,Oc=/[#\?:]/g,Nc=/[#\?]/g,Dc=/[#\?@]/g,Lc=/#/g;function Ft(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function xe(i){i.g||(i.g=new Map,i.h=0,i.i&&Pc(i.i,function(o,c){i.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}n=Ft.prototype,n.add=function(i,o){xe(this),this.i=null,i=gt(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(o),this.h+=1,this};function es(i,o){xe(i),o=gt(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function ts(i,o){return xe(i),o=gt(i,o),i.g.has(o)}n.forEach=function(i,o){xe(this),this.g.forEach(function(c,u){c.forEach(function(_){i.call(o,_,u,this)},this)},this)},n.na=function(){xe(this);const i=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let u=0;u<o.length;u++){const _=i[u];for(let E=0;E<_.length;E++)c.push(o[u])}return c},n.V=function(i){xe(this);let o=[];if(typeof i=="string")ts(this,i)&&(o=o.concat(this.g.get(gt(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)o=o.concat(i[c])}return o},n.set=function(i,o){return xe(this),this.i=null,i=gt(this,i),ts(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},n.get=function(i,o){return i?(i=this.V(i),0<i.length?String(i[0]):o):o};function ns(i,o,c){es(i,o),0<c.length&&(i.i=null,i.g.set(gt(i,o),M(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var u=o[c];const E=encodeURIComponent(String(u)),S=this.V(u);for(u=0;u<S.length;u++){var _=E;S[u]!==""&&(_+="="+encodeURIComponent(String(S[u]))),i.push(_)}}return this.i=i.join("&")};function gt(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function xc(i,o){o&&!i.j&&(xe(i),i.i=null,i.g.forEach(function(c,u){var _=u.toLowerCase();u!=_&&(es(this,u),ns(this,_,c))},i)),i.j=o}function Mc(i,o){const c=new Lt;if(h.Image){const u=new Image;u.onload=P(Me,c,"TestLoadImage: loaded",!0,o,u),u.onerror=P(Me,c,"TestLoadImage: error",!1,o,u),u.onabort=P(Me,c,"TestLoadImage: abort",!1,o,u),u.ontimeout=P(Me,c,"TestLoadImage: timeout",!1,o,u),h.setTimeout(function(){u.ontimeout&&u.ontimeout()},1e4),u.src=i}else o(!1)}function Uc(i,o){const c=new Lt,u=new AbortController,_=setTimeout(()=>{u.abort(),Me(c,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:u.signal}).then(E=>{clearTimeout(_),E.ok?Me(c,"TestPingServer: ok",!0,o):Me(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(_),Me(c,"TestPingServer: error",!1,o)})}function Me(i,o,c,u,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),u(c)}catch{}}function Fc(){this.g=new vc}function jc(i,o,c){const u=c||"";try{Xr(i,function(_,E){let S=_;I(_)&&(S=hi(_)),o.push(u+E+"="+encodeURIComponent(S))})}catch(_){throw o.push(u+"type="+encodeURIComponent("_badmap")),_}}function wn(i){this.l=i.Ub||null,this.j=i.eb||!1}k(wn,di),wn.prototype.g=function(){return new In(this.l,this.j)},wn.prototype.i=(function(i){return function(){return i}})({});function In(i,o){G.call(this),this.D=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(In,G),n=In.prototype,n.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=o,this.readyState=1,Vt(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(o.body=i),(this.D||h).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,jt(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Vt(this)),this.g&&(this.readyState=3,Vt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;is(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function is(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?jt(this):Vt(this),this.readyState==3&&is(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,jt(this))},n.Qa=function(i){this.g&&(this.response=i,jt(this))},n.ga=function(){this.g&&jt(this)};function jt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Vt(i)}n.setRequestHeader=function(i,o){this.u.append(i,o)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=o.next();return i.join(`\r
`)};function Vt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(In.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function rs(i){let o="";return z(i,function(c,u){o+=u,o+=":",o+=c,o+=`\r
`}),o}function Ti(i,o,c){e:{for(u in c){var u=!1;break e}u=!0}u||(c=rs(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):F(i,o,c))}function B(i){G.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(B,G);var Vc=/^https?$/i,Bc=["POST","PUT"];n=B.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,o,c,u){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():yi.g(),this.v=this.o?xr(this.o):xr(yi),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(E){ss(this,E);return}if(i=c||"",c=new Map(this.headers),u)if(Object.getPrototypeOf(u)===Object.prototype)for(var _ in u)c.set(_,u[_]);else if(typeof u.keys=="function"&&typeof u.get=="function")for(const E of u.keys())c.set(E,u.get(E));else throw Error("Unknown input type for opt_headers: "+String(u));u=Array.from(c.keys()).find(E=>E.toLowerCase()=="content-type"),_=h.FormData&&i instanceof h.FormData,!(0<=Array.prototype.indexOf.call(Bc,o,void 0))||u||_||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[E,S]of c)this.g.setRequestHeader(E,S);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{cs(this),this.u=!0,this.g.send(i),this.u=!1}catch(E){ss(this,E)}};function ss(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.m=5,os(i),En(i)}function os(i){i.A||(i.A=!0,Y(i,"complete"),Y(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Y(this,"complete"),Y(this,"abort"),En(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),En(this,!0)),B.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?as(this):this.bb())},n.bb=function(){as(this)};function as(i){if(i.h&&typeof l<"u"&&(!i.v[1]||Se(i)!=4||i.Z()!=2)){if(i.u&&Se(i)==4)Or(i.Ea,0,i);else if(Y(i,"readystatechange"),Se(i)==4){i.h=!1;try{const S=i.Z();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var u;if(u=S===0){var _=String(i.D).match(Yr)[1]||null;!_&&h.self&&h.self.location&&(_=h.self.location.protocol.slice(0,-1)),u=!Vc.test(_?_.toLowerCase():"")}c=u}if(c)Y(i,"complete"),Y(i,"success");else{i.m=6;try{var E=2<Se(i)?i.g.statusText:""}catch{E=""}i.l=E+" ["+i.Z()+"]",os(i)}}finally{En(i)}}}}function En(i,o){if(i.g){cs(i);const c=i.g,u=i.v[0]?()=>{}:null;i.g=null,i.v=null,o||Y(i,"ready");try{c.onreadystatechange=u}catch{}}}function cs(i){i.I&&(h.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Se(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Se(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),yc(o)}};function ls(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function $c(i){const o={};i=(i.g&&2<=Se(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let u=0;u<i.length;u++){if($(i[u]))continue;var c=y(i[u]);const _=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const E=o[_]||[];o[_]=E,E.push(c)}v(o,function(u){return u.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bt(i,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||o}function us(i){this.Aa=0,this.i=[],this.j=new Lt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bt("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bt("baseRetryDelayMs",5e3,i),this.cb=Bt("retryDelaySeedMs",1e4,i),this.Wa=Bt("forwardChannelMaxRetries",2,i),this.wa=Bt("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new zr(i&&i.concurrentRequestLimit),this.Da=new Fc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=us.prototype,n.la=8,n.G=1,n.connect=function(i,o,c,u){Z(0),this.W=i,this.H=o||{},c&&u!==void 0&&(this.H.OSID=c,this.H.OAID=u),this.F=this.X,this.I=_s(this,null,this.W),Tn(this)};function Si(i){if(hs(i),i.G==3){var o=i.U++,c=Te(i.I);if(F(c,"SID",i.K),F(c,"RID",o),F(c,"TYPE","terminate"),$t(i,c),o=new Le(i,i.j,o),o.L=2,o.v=_n(Te(c)),c=!1,h.navigator&&h.navigator.sendBeacon)try{c=h.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&h.Image&&(new Image().src=o.v,c=!0),c||(o.g=ws(o.j,null),o.g.ea(o.v)),o.F=Date.now(),mn(o)}vs(i)}function bn(i){i.g&&(Ci(i),i.g.cancel(),i.g=null)}function hs(i){bn(i),i.u&&(h.clearTimeout(i.u),i.u=null),Sn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&h.clearTimeout(i.s),i.s=null)}function Tn(i){if(!Wr(i.h)&&!i.s){i.s=!0;var o=i.Ga;Ct||Ar(),kt||(Ct(),kt=!0),ii.add(o,i),i.B=0}}function Hc(i,o){return Gr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=o.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Dt(b(i.Ga,i,o),ys(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const _=new Le(this,this.j,i);let E=this.o;if(this.S&&(E?(E=f(E),m(E,this.S)):E=this.S),this.m!==null||this.O||(_.H=E,E=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var u=this.i[c];if("__data__"in u.map&&(u=u.map.__data__,typeof u=="string")){u=u.length;break t}u=void 0}if(u===void 0)break;if(o+=u,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=fs(this,_,o),c=Te(this.I),F(c,"RID",i),F(c,"CVER",22),this.D&&F(c,"X-HTTP-Session-Id",this.D),$t(this,c),E&&(this.O?o="headers="+encodeURIComponent(String(rs(E)))+"&"+o:this.m&&Ti(c,this.m,E)),bi(this.h,_),this.Ua&&F(c,"TYPE","init"),this.P?(F(c,"$req",o),F(c,"SID","null"),_.T=!0,_i(_,c,null)):_i(_,c,o),this.G=2}}else this.G==3&&(i?ds(this,i):this.i.length==0||Wr(this.h)||ds(this))};function ds(i,o){var c;o?c=o.l:c=i.U++;const u=Te(i.I);F(u,"SID",i.K),F(u,"RID",c),F(u,"AID",i.T),$t(i,u),i.m&&i.o&&Ti(u,i.m,i.o),c=new Le(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),o&&(i.i=o.D.concat(i.i)),o=fs(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),bi(i.h,c),_i(c,u,o)}function $t(i,o){i.H&&z(i.H,function(c,u){F(o,u,c)}),i.l&&Xr({},function(c,u){F(o,u,c)})}function fs(i,o,c){c=Math.min(i.i.length,c);var u=i.l?b(i.l.Na,i.l,i):null;e:{var _=i.i;let E=-1;for(;;){const S=["count="+c];E==-1?0<c?(E=_[0].g,S.push("ofs="+E)):E=0:S.push("ofs="+E);let U=!0;for(let q=0;q<c;q++){let D=_[q].g;const K=_[q].map;if(D-=E,0>D)E=Math.max(0,_[q].g-100),U=!1;else try{jc(K,S,"req"+D+"_")}catch{u&&u(K)}}if(U){u=S.join("&");break e}}}return i=i.i.splice(0,c),o.D=i,u}function ps(i){if(!i.g&&!i.u){i.Y=1;var o=i.Fa;Ct||Ar(),kt||(Ct(),kt=!0),ii.add(o,i),i.v=0}}function Ai(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Dt(b(i.Fa,i),ys(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,gs(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Dt(b(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Z(10),bn(this),gs(this))};function Ci(i){i.A!=null&&(h.clearTimeout(i.A),i.A=null)}function gs(i){i.g=new Le(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var o=Te(i.qa);F(o,"RID","rpc"),F(o,"SID",i.K),F(o,"AID",i.T),F(o,"CI",i.F?"0":"1"),!i.F&&i.ja&&F(o,"TO",i.ja),F(o,"TYPE","xmlhttp"),$t(i,o),i.m&&i.o&&Ti(o,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=_n(Te(o)),c.m=null,c.P=!0,$r(c,i)}n.Za=function(){this.C!=null&&(this.C=null,bn(this),Ai(this),Z(19))};function Sn(i){i.C!=null&&(h.clearTimeout(i.C),i.C=null)}function ms(i,o){var c=null;if(i.g==o){Sn(i),Ci(i),i.g=null;var u=2}else if(Ei(i.h,o))c=o.D,Kr(i.h,o),u=1;else return;if(i.G!=0){if(o.o)if(u==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var _=i.B;u=gi(),Y(u,new jr(u,c)),Tn(i)}else ps(i);else if(_=o.s,_==3||_==0&&0<o.X||!(u==1&&Hc(i,o)||u==2&&Ai(i)))switch(c&&0<c.length&&(o=i.h,o.i=o.i.concat(c)),_){case 1:Ye(i,5);break;case 4:Ye(i,10);break;case 3:Ye(i,6);break;default:Ye(i,2)}}}function ys(i,o){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*o}function Ye(i,o){if(i.j.info("Error code "+o),o==2){var c=b(i.fb,i),u=i.Xa;const _=!u;u=new Xe(u||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||yn(u,"https"),_n(u),_?Mc(u.toString(),c):Uc(u.toString(),c)}else Z(2);i.G=0,i.l&&i.l.sa(o),vs(i),hs(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Z(2)):(this.j.info("Failed to ping google.com"),Z(1))};function vs(i){if(i.G=0,i.ka=[],i.l){const o=Jr(i.h);(o.length!=0||i.i.length!=0)&&(L(i.ka,o),L(i.ka,i.i),i.h.i.length=0,M(i.i),i.i.length=0),i.l.ra()}}function _s(i,o,c){var u=c instanceof Xe?Te(c):new Xe(c);if(u.g!="")o&&(u.g=o+"."+u.g),vn(u,u.s);else{var _=h.location;u=_.protocol,o=o?o+"."+_.hostname:_.hostname,_=+_.port;var E=new Xe(null);u&&yn(E,u),o&&(E.g=o),_&&vn(E,_),c&&(E.l=c),u=E}return c=i.D,o=i.ya,c&&o&&F(u,c,o),F(u,"VER",i.la),$t(i,u),u}function ws(i,o,c){if(o&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Ca&&!i.pa?new B(new wn({eb:c})):new B(i.pa),o.Ha(i.J),o}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Is(){}n=Is.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ie(i,o){G.call(this),this.g=new us(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(i?i["X-WebChannel-Client-Profile"]=o.va:i={"X-WebChannel-Client-Profile":o.va}),this.g.S=i,(i=o&&o.Sb)&&!$(i)&&(this.g.m=i),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!$(o)&&(this.g.D=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new mt(this)}k(ie,G),ie.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ie.prototype.close=function(){Si(this.g)},ie.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=hi(i),i=c);o.i.push(new Ac(o.Ya++,i)),o.G==3&&Tn(o)},ie.prototype.N=function(){this.g.l=null,delete this.j,Si(this.g),delete this.g,ie.aa.N.call(this)};function Es(i){fi.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const c in o){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}k(Es,fi);function bs(){pi.call(this),this.status=1}k(bs,pi);function mt(i){this.g=i}k(mt,Is),mt.prototype.ua=function(){Y(this.g,"a")},mt.prototype.ta=function(i){Y(this.g,new Es(i))},mt.prototype.sa=function(i){Y(this.g,new bs)},mt.prototype.ra=function(){Y(this.g,"b")},ie.prototype.send=ie.prototype.o,ie.prototype.open=ie.prototype.m,ie.prototype.close=ie.prototype.close,mi.NO_ERROR=0,mi.TIMEOUT=8,mi.HTTP_ERROR=6,Tc.COMPLETE="complete",_c.EventType=Ot,Ot.OPEN="a",Ot.CLOSE="b",Ot.ERROR="c",Ot.MESSAGE="d",G.prototype.listen=G.prototype.K,B.prototype.listenOnce=B.prototype.L,B.prototype.getLastError=B.prototype.Ka,B.prototype.getLastErrorCode=B.prototype.Ba,B.prototype.getStatus=B.prototype.Z,B.prototype.getResponseJson=B.prototype.Oa,B.prototype.getResponseText=B.prototype.oa,B.prototype.send=B.prototype.ea,B.prototype.setWithCredentials=B.prototype.Ha}).apply(typeof Cn<"u"?Cn:typeof self<"u"?self:typeof window<"u"?window:{});const zs="@firebase/firestore",Ws="4.8.0";/**
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
 */class Q{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Q.UNAUTHENTICATED=new Q(null),Q.GOOGLE_CREDENTIALS=new Q("google-credentials-uid"),Q.FIRST_PARTY=new Q("first-party-uid"),Q.MOCK_USER=new Q("mock-user");/**
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
 */let sn="11.10.0";/**
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
 */const bt=new Yn("@firebase/firestore");function le(n,...e){if(bt.logLevel<=x.DEBUG){const t=e.map(dr);bt.debug(`Firestore (${sn}): ${n}`,...t)}}function _a(n,...e){if(bt.logLevel<=x.ERROR){const t=e.map(dr);bt.error(`Firestore (${sn}): ${n}`,...t)}}function Gh(n,...e){if(bt.logLevel<=x.WARN){const t=e.map(dr);bt.warn(`Firestore (${sn}): ${n}`,...t)}}function dr(n){if(typeof n=="string")return n;try{/**
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
 */function Qt(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,wa(n,r,t)}function wa(n,e,t){let r=`FIRESTORE (${sn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw _a(r),new Error(r)}function Gt(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||wa(e,s,r)}/**
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
 */const O={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class N extends pe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Kt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class Ia{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Kh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Q.UNAUTHENTICATED)))}shutdown(){}}class Jh{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Xh{constructor(e){this.t=e,this.currentUser=Q.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Gt(this.o===void 0,42304);let r=this.i;const s=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve();let a=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Kt,e.enqueueRetryable((()=>s(this.currentUser)))};const l=()=>{const d=a;e.enqueueRetryable((async()=>{await d.promise,await s(this.currentUser)}))},h=d=>{le("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((d=>h(d))),setTimeout((()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?h(d):(le("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Kt)}}),0),l()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(le("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Gt(typeof r.accessToken=="string",31837,{l:r}),new Ia(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Gt(e===null||typeof e=="string",2055,{h:e}),new Q(e)}}class Yh{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Q.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Zh{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Yh(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Q.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Gs{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Qh{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,re(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Gt(this.o===void 0,3512);const r=a=>{a.error!=null&&le("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.m;return this.m=a.token,le("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?t(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable((()=>r(a)))};const s=a=>{le("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((a=>s(a))),setTimeout((()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?s(a):le("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Gs(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Gt(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Gs(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function ed(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function td(){return new TextEncoder}/**
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
 */class nd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=ed(40);for(let a=0;a<s.length;++a)r.length<20&&s[a]<t&&(r+=e.charAt(s[a]%62))}return r}}function he(n,e){return n<e?-1:n>e?1:0}function id(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return he(r,s);{const a=td(),l=rd(a.encode(Ks(n,t)),a.encode(Ks(e,t)));return l!==0?l:he(r,s)}}t+=r>65535?2:1}return he(n.length,e.length)}function Ks(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function rd(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return he(n[t],e[t]);return he(n.length,e.length)}/**
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
 */const Js="__name__";class ye{constructor(e,t,r){t===void 0?t=0:t>e.length&&Qt(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Qt(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ye.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ye?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const a=ye.compareSegments(e.get(s),t.get(s));if(a!==0)return a}return he(e.length,t.length)}static compareSegments(e,t){const r=ye.isNumericId(e),s=ye.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ye.extractNumericId(e).compare(ye.extractNumericId(t)):id(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return hr.fromString(e.substring(4,e.length-2))}}class ce extends ye{construct(e,t,r){return new ce(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new ce(t)}static emptyPath(){return new ce([])}}const sd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends ye{construct(e,t,r){return new et(e,t,r)}static isValidIdentifier(e){return sd.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Js}static keyField(){return new et([Js])}static fromServerFormat(e){const t=[];let r="",s=0;const a=()=>{if(r.length===0)throw new N(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let l=!1;for(;s<e.length;){const h=e[s];if(h==="\\"){if(s+1===e.length)throw new N(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new N(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,s+=2}else h==="`"?(l=!l,s++):h!=="."||l?(r+=h,s++):(a(),s++)}if(a(),l)throw new N(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(t)}static emptyPath(){return new et([])}}/**
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
 */class nt{constructor(e){this.path=e}static fromPath(e){return new nt(ce.fromString(e))}static fromName(e){return new nt(ce.fromString(e).popFirst(5))}static empty(){return new nt(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new nt(new ce(e.slice()))}}function od(n,e,t,r){if(e===!0&&r===!0)throw new N(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ad(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function cd(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Qt(12329,{type:typeof n})}function ld(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=cd(n);throw new N(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function H(n,e){const t={typeString:n};return e&&(t.value=e),t}function on(n,e){if(!ad(n))throw new N(O.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,a="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const l=n[r];if(s&&typeof l!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(a!==void 0&&l!==a.value){t=`Expected '${r}' field to equal '${a.value}'`;break}}if(t)throw new N(O.INVALID_ARGUMENT,t);return!0}/**
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
 */const Xs=-62135596800,Ys=1e6;class ve{static now(){return ve.fromMillis(Date.now())}static fromDate(e){return ve.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ys);return new ve(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Xs)throw new N(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ys}_compareTo(e){return this.seconds===e.seconds?he(this.nanoseconds,e.nanoseconds):he(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(on(e,ve._jsonSchema))return new ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Xs;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ve._jsonSchemaVersion="firestore/timestamp/1.0",ve._jsonSchema={type:H("string",ve._jsonSchemaVersion),seconds:H("number"),nanoseconds:H("number")};function ud(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class hd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new hd("Invalid base64 string: "+a):a}})(e);return new at(t)}static fromUint8Array(e){const t=(function(s){let a="";for(let l=0;l<s.length;++l)a+=String.fromCharCode(s[l]);return a})(e);return new at(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return he(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const Ki="(default)";class Hn{constructor(e,t){this.projectId=e,this.database=t||Ki}static empty(){return new Hn("","")}get isDefaultDatabase(){return this.database===Ki}isEqual(e){return e instanceof Hn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */class dd{constructor(e,t=null,r=[],s=[],a=null,l="F",h=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=a,this.limitType=l,this.startAt=h,this.endAt=d,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function fd(n){return new dd(n)}/**
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
 */var Zs,R;(R=Zs||(Zs={}))[R.OK=0]="OK",R[R.CANCELLED=1]="CANCELLED",R[R.UNKNOWN=2]="UNKNOWN",R[R.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",R[R.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",R[R.NOT_FOUND=5]="NOT_FOUND",R[R.ALREADY_EXISTS=6]="ALREADY_EXISTS",R[R.PERMISSION_DENIED=7]="PERMISSION_DENIED",R[R.UNAUTHENTICATED=16]="UNAUTHENTICATED",R[R.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",R[R.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",R[R.ABORTED=10]="ABORTED",R[R.OUT_OF_RANGE=11]="OUT_OF_RANGE",R[R.UNIMPLEMENTED=12]="UNIMPLEMENTED",R[R.INTERNAL=13]="INTERNAL",R[R.UNAVAILABLE=14]="UNAVAILABLE",R[R.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new hr([4294967295,4294967295],0);/**
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
 */const pd=41943040;/**
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
 */const gd=1048576;function Ui(){return typeof document<"u"?document:null}/**
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
 */class md{constructor(e,t,r=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&le("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */class fr{constructor(e,t,r,s,a){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=a,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,a){const l=Date.now()+r,h=new fr(e,t,l,s,a);return h.start(r),h}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Qs,eo;(eo=Qs||(Qs={})).Fa="default",eo.Cache="cache";/**
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
 */function yd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const to=new Map;/**
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
 */const Ea="firestore.googleapis.com",no=!0;class io{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ea,this.ssl=no}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:no;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=pd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<gd)throw new N(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}od("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new N(O.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new N(O.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new N(O.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ba{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new io({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new io(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Kh;switch(r.type){case"firstParty":return new Zh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=to.get(t);r&&(le("ComponentProvider","Removing Datastore"),to.delete(t),r.terminate())})(this),Promise.resolve()}}function vd(n,e,t,r={}){var s;n=ld(n,ba);const a=nn(e),l=n._getSettings(),h=Object.assign(Object.assign({},l),{emulatorOptions:n._getEmulatorOptions()}),d=`${e}:${t}`;a&&($o(`https://${d}`),Ho("Firestore",!0)),l.host!==Ea&&l.host!==d&&Gh("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const I=Object.assign(Object.assign({},l),{host:d,ssl:a,emulatorOptions:r});if(!We(I,h)&&(n._setSettings(I),r.mockUserToken)){let T,A;if(typeof r.mockUserToken=="string")T=r.mockUserToken,A=Q.MOCK_USER;else{T=el(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const b=r.mockUserToken.sub||r.mockUserToken.user_id;if(!b)throw new N(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new Q(b)}n._authCredentials=new Jh(new Ia(T,A))}}/**
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
 */class pr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new pr(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new gr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(on(t,_e._jsonSchema))return new _e(e,r||null,new nt(ce.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:H("string",_e._jsonSchemaVersion),referencePath:H("string")};class gr extends pr{constructor(e,t,r){super(e,t,fd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new nt(e))}withConverter(e){return new gr(this.firestore,e,this._path)}}/**
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
 */const ro="AsyncQueue";class so{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new md(this,"async_queue_retry"),this.oc=()=>{const r=Ui();r&&le(ro,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Ui();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Ui();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const t=new Kt;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ud(e))throw e;le(ro,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const t=this._c.then((()=>(this.nc=!0,e().catch((r=>{throw this.tc=r,this.nc=!1,_a("INTERNAL UNHANDLED ERROR: ",oo(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=fr.createAndSchedule(this,e,t,r,(a=>this.lc(a)));return this.ec.push(s),s}ac(){this.tc&&Qt(47125,{hc:oo(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function oo(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class _d extends ba{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new so,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new so(e),this._firestoreClient=void 0,await e}}}function wd(n,e){const t=typeof n=="object"?n:sr(),r=typeof n=="string"?n:Ki,s=ht(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const a=Zc("firestore");a&&vd(s,...a)}return s}/**
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
 */class Ce{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ce(at.fromBase64String(e))}catch(t){throw new N(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ce(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ce._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(on(e,Ce._jsonSchema))return Ce.fromBase64String(e.bytes)}}Ce._jsonSchemaVersion="firestore/bytes/1.0",Ce._jsonSchema={type:H("string",Ce._jsonSchemaVersion),bytes:H("string")};/**
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
 */class Ta{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class it{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return he(this._lat,e._lat)||he(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:it._jsonSchemaVersion}}static fromJSON(e){if(on(e,it._jsonSchema))return new it(e.latitude,e.longitude)}}it._jsonSchemaVersion="firestore/geoPoint/1.0",it._jsonSchema={type:H("string",it._jsonSchemaVersion),latitude:H("number"),longitude:H("number")};/**
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
 */class rt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let a=0;a<r.length;++a)if(r[a]!==s[a])return!1;return!0})(this._values,e._values)}toJSON(){return{type:rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(on(e,rt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new rt(e.vectorValues);throw new N(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rt._jsonSchemaVersion="firestore/vectorValue/1.0",rt._jsonSchema={type:H("string",rt._jsonSchemaVersion),vectorValues:H("object")};const Id=new RegExp("[~\\*/\\[\\]]");function Ed(n,e,t){if(e.search(Id)>=0)throw ao(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Ta(...e.split("."))._internalPath}catch{throw ao(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function ao(n,e,t,r,s){let a=`Function ${e}() called with invalid data`;a+=". ";let l="";return new N(O.INVALID_ARGUMENT,a+n+l)}/**
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
 */class Sa{constructor(e,t,r,s,a){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new bd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Aa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class bd extends Sa{data(){return super.data()}}function Aa(n,e){return typeof e=="string"?Ed(n,e):e instanceof Ta?e._internalPath:e._delegate._internalPath}class kn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class _t extends Sa{constructor(e,t,r,s,a,l){super(e,t,r,s,l),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ln(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Aa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=_t._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}_t._jsonSchemaVersion="firestore/documentSnapshot/1.0",_t._jsonSchema={type:H("string",_t._jsonSchemaVersion),bundleSource:H("string","DocumentSnapshot"),bundleName:H("string"),bundle:H("string")};class Ln extends _t{data(e={}){return super.data(e)}}class Jt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new kn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Ln(this._firestore,this._userDataWriter,r.key,r,new kn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,a){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map((h=>{const d=new Ln(s._firestore,s._userDataWriter,h.doc.key,h.doc,new kn(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);return h.doc,{type:"added",doc:d,oldIndex:-1,newIndex:l++}}))}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((h=>a||h.type!==3)).map((h=>{const d=new Ln(s._firestore,s._userDataWriter,h.doc.key,h.doc,new kn(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);let I=-1,T=-1;return h.type!==0&&(I=l.indexOf(h.doc.key),l=l.delete(h.doc.key)),h.type!==1&&(l=l.add(h.doc),T=l.indexOf(h.doc.key)),{type:Td(h.type),doc:d,oldIndex:I,newIndex:T}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Jt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=nd.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((a=>{a._document!==null&&(t.push(a._document),r.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Td(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Qt(61501,{type:n})}}Jt._jsonSchemaVersion="firestore/querySnapshot/1.0",Jt._jsonSchema={type:H("string",Jt._jsonSchemaVersion),bundleSource:H("string","QuerySnapshot"),bundleName:H("string"),bundle:H("string")};(function(e,t=!0){(function(s){sn=s})(Tt),Ee(new de("firestore",((r,{instanceIdentifier:s,options:a})=>{const l=r.getProvider("app").getImmediate(),h=new _d(new Xh(r.getProvider("auth-internal")),new Qh(l,r.getProvider("app-check-internal")),(function(I,T){if(!Object.prototype.hasOwnProperty.apply(I.options,["projectId"]))throw new N(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hn(I.options.projectId,T)})(l,s),l);return a=Object.assign({useFetchStreams:t},a),h._setSettings(a),h}),"PUBLIC").setMultipleInstances(!0)),se(zs,Ws,e),se(zs,Ws,"esm2017")})();function mr(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Ca(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sd=Ca,ka=new ut("auth","Firebase",Ca());/**
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
 */const qn=new Yn("@firebase/auth");function Ad(n,...e){qn.logLevel<=x.WARN&&qn.warn(`Auth (${Tt}): ${n}`,...e)}function xn(n,...e){qn.logLevel<=x.ERROR&&qn.error(`Auth (${Tt}): ${n}`,...e)}/**
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
 */function fe(n,...e){throw yr(n,...e)}function we(n,...e){return yr(n,...e)}function Pa(n,e,t){const r=Object.assign(Object.assign({},Sd()),{[e]:t});return new ut("auth","Firebase",r).create(e,{appName:n.name})}function Re(n){return Pa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yr(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ka.create(n,...e)}function C(n,e,...t){if(!n)throw yr(e,...t)}function ke(n){const e="INTERNAL ASSERTION FAILED: "+n;throw xn(e),new Error(e)}function Ne(n,e){n||ke(e)}/**
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
 */function Ji(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Cd(){return co()==="http:"||co()==="https:"}function co(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function kd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Cd()||tr()||"connection"in navigator)?navigator.onLine:!0}function Pd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class an{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ne(t>e,"Short delay should be less than long delay!"),this.isMobile=il()||sl()}get(){return kd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function vr(n,e){Ne(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ra{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Rd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Od=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Nd=new an(3e4,6e4);function Ge(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ke(n,e,t,r,s={}){return Oa(n,s,async()=>{let a={},l={};r&&(e==="GET"?l=r:a={body:JSON.stringify(r)});const h=rn(Object.assign({key:n.config.apiKey},l)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const I=Object.assign({method:e,headers:d},a);return rl()||(I.referrerPolicy="no-referrer"),n.emulatorConfig&&nn(n.emulatorConfig.host)&&(I.credentials="include"),Ra.fetch()(await Na(n,n.config.apiHost,t,h),I)})}async function Oa(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Rd),e);try{const s=new Ld(n),a=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw Pn(n,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const h=a.ok?l.errorMessage:l.error.message,[d,I]=h.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pn(n,"credential-already-in-use",l);if(d==="EMAIL_EXISTS")throw Pn(n,"email-already-in-use",l);if(d==="USER_DISABLED")throw Pn(n,"user-disabled",l);const T=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(I)throw Pa(n,T,I);fe(n,T)}}catch(s){if(s instanceof pe)throw s;fe(n,"network-request-failed",{message:String(s)})}}async function cn(n,e,t,r,s={}){const a=await Ke(n,e,t,r,s);return"mfaPendingCredential"in a&&fe(n,"multi-factor-auth-required",{_serverResponse:a}),a}async function Na(n,e,t,r){const s=`${e}${t}?${r}`,a=n,l=a.config.emulator?vr(n.config,s):`${n.config.apiScheme}://${s}`;return Od.includes(t)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(l).toString():l}function Dd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ld{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(we(this.auth,"network-request-failed")),Nd.get())})}}function Pn(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=we(n,e,r);return s.customData._tokenResponse=t,s}function lo(n){return n!==void 0&&n.enterprise!==void 0}class xd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Dd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Md(n,e){return Ke(n,"GET","/v2/recaptchaConfig",Ge(n,e))}/**
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
 */async function Ud(n,e){return Ke(n,"POST","/v1/accounts:delete",e)}async function zn(n,e){return Ke(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Xt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fd(n,e=!1){const t=ge(n),r=await t.getIdToken(e),s=_r(r);C(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a==null?void 0:a.sign_in_provider;return{claims:s,token:r,authTime:Xt(Fi(s.auth_time)),issuedAtTime:Xt(Fi(s.iat)),expirationTime:Xt(Fi(s.exp)),signInProvider:l||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function Fi(n){return Number(n)*1e3}function _r(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return xn("JWT malformed, contained fewer than 3 sections"),null;try{const s=Fo(t);return s?JSON.parse(s):(xn("Failed to decode base64 JWT payload"),null)}catch(s){return xn("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function uo(n){const e=_r(n);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function en(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof pe&&jd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function jd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Vd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Xi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xt(this.lastLoginAt),this.creationTime=Xt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Wn(n){var e;const t=n.auth,r=await n.getIdToken(),s=await en(n,zn(t,{idToken:r}));C(s==null?void 0:s.users.length,t,"internal-error");const a=s.users[0];n._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Da(a.providerUserInfo):[],h=$d(n.providerData,l),d=n.isAnonymous,I=!(n.email&&a.passwordHash)&&!(h!=null&&h.length),T=d?I:!1,A={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:h,metadata:new Xi(a.createdAt,a.lastLoginAt),isAnonymous:T};Object.assign(n,A)}async function Bd(n){const e=ge(n);await Wn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $d(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Da(n){return n.map(e=>{var{providerId:t}=e,r=mr(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Hd(n,e){const t=await Oa(n,{},async()=>{const r=rn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=n.config,l=await Na(n,s,"/v1/token",`key=${a}`),h=await n._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const d={method:"POST",headers:h,body:r};return n.emulatorConfig&&nn(n.emulatorConfig.host)&&(d.credentials="include"),Ra.fetch()(l,d)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function qd(n,e){return Ke(n,"POST","/v2/accounts:revokeToken",Ge(n,e))}/**
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
 */class wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):uo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=uo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:a}=await Hd(e,t);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:a}=t,l=new wt;return r&&(C(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(C(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(C(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wt,this.toJSON())}_performRefresh(){return ke("not implemented")}}/**
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
 */function Ue(n,e){C(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ue{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,a=mr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Vd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Xi(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await en(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Fd(this,e)}reload(){return Bd(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Wn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(re(this.auth.app))return Promise.reject(Re(this.auth));const e=await this.getIdToken();return await en(this,Ud(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,a,l,h,d,I,T;const A=(r=t.displayName)!==null&&r!==void 0?r:void 0,b=(s=t.email)!==null&&s!==void 0?s:void 0,P=(a=t.phoneNumber)!==null&&a!==void 0?a:void 0,k=(l=t.photoURL)!==null&&l!==void 0?l:void 0,M=(h=t.tenantId)!==null&&h!==void 0?h:void 0,L=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,j=(I=t.createdAt)!==null&&I!==void 0?I:void 0,$=(T=t.lastLoginAt)!==null&&T!==void 0?T:void 0,{uid:V,emailVerified:X,isAnonymous:me,providerData:z,stsTokenManager:v}=t;C(V&&v,e,"internal-error");const f=wt.fromJSON(this.name,v);C(typeof V=="string",e,"internal-error"),Ue(A,e.name),Ue(b,e.name),C(typeof X=="boolean",e,"internal-error"),C(typeof me=="boolean",e,"internal-error"),Ue(P,e.name),Ue(k,e.name),Ue(M,e.name),Ue(L,e.name),Ue(j,e.name),Ue($,e.name);const p=new ue({uid:V,auth:e,email:b,emailVerified:X,displayName:A,isAnonymous:me,photoURL:k,phoneNumber:P,tenantId:M,stsTokenManager:f,createdAt:j,lastLoginAt:$});return z&&Array.isArray(z)&&(p.providerData=z.map(m=>Object.assign({},m))),L&&(p._redirectEventId=L),p}static async _fromIdTokenResponse(e,t,r=!1){const s=new wt;s.updateFromServerResponse(t);const a=new ue({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Wn(a),a}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];C(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?Da(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!(a!=null&&a.length),h=new wt;h.updateFromIdToken(r);const d=new ue({uid:s.localId,auth:e,stsTokenManager:h,isAnonymous:l}),I={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Xi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(a!=null&&a.length)};return Object.assign(d,I),d}}/**
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
 */const ho=new Map;function Pe(n){Ne(n instanceof Function,"Expected a class definition");let e=ho.get(n);return e?(Ne(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ho.set(n,e),e)}/**
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
 */class La{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}La.type="NONE";const fo=La;/**
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
 */function Mn(n,e,t){return`firebase:${n}:${e}:${t}`}class It{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=Mn(this.userKey,s.apiKey,a),this.fullPersistenceKey=Mn("persistence",s.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await zn(this.auth,{idToken:e}).catch(()=>{});return t?ue._fromGetAccountInfoResponse(this.auth,t,e):null}return ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new It(Pe(fo),e,r);const s=(await Promise.all(t.map(async I=>{if(await I._isAvailable())return I}))).filter(I=>I);let a=s[0]||Pe(fo);const l=Mn(r,e.config.apiKey,e.name);let h=null;for(const I of t)try{const T=await I._get(l);if(T){let A;if(typeof T=="string"){const b=await zn(e,{idToken:T}).catch(()=>{});if(!b)break;A=await ue._fromGetAccountInfoResponse(e,b,T)}else A=ue._fromJSON(e,T);I!==a&&(h=A),a=I;break}}catch{}const d=s.filter(I=>I._shouldAllowMigration);return!a._shouldAllowMigration||!d.length?new It(a,e,r):(a=d[0],h&&await a._set(l,h.toJSON()),await Promise.all(t.map(async I=>{if(I!==a)try{await I._remove(l)}catch{}})),new It(a,e,r))}}/**
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
 */function po(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fa(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Va(e))return"Blackberry";if(Ba(e))return"Webos";if(Ma(e))return"Safari";if((e.includes("chrome/")||Ua(e))&&!e.includes("edge/"))return"Chrome";if(ja(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function xa(n=ee()){return/firefox\//i.test(n)}function Ma(n=ee()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ua(n=ee()){return/crios\//i.test(n)}function Fa(n=ee()){return/iemobile/i.test(n)}function ja(n=ee()){return/android/i.test(n)}function Va(n=ee()){return/blackberry/i.test(n)}function Ba(n=ee()){return/webos/i.test(n)}function wr(n=ee()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function zd(n=ee()){var e;return wr(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Wd(){return ol()&&document.documentMode===10}function $a(n=ee()){return wr(n)||ja(n)||Ba(n)||Va(n)||/windows phone/i.test(n)||Fa(n)}/**
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
 */function Ha(n,e=[]){let t;switch(n){case"Browser":t=po(ee());break;case"Worker":t=`${po(ee())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Tt}/${r}`}/**
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
 */class Gd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=a=>new Promise((l,h)=>{try{const d=e(a);l(d)}catch(d){h(d)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Kd(n,e={}){return Ke(n,"GET","/v2/passwordPolicy",Ge(n,e))}/**
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
 */const Jd=6;class Xd{constructor(e){var t,r,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=l.minPasswordLength)!==null&&t!==void 0?t:Jd,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,a,l,h;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(a=d.containsUppercaseLetter)!==null&&a!==void 0?a:!0),d.isValid&&(d.isValid=(l=d.containsNumericCharacter)!==null&&l!==void 0?l:!0),d.isValid&&(d.isValid=(h=d.containsNonAlphanumericCharacter)!==null&&h!==void 0?h:!0),d}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
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
 */class Yd{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new go(this),this.idTokenSubscription=new go(this),this.beforeStateQueue=new Gd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ka,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pe(t)),this._initializationPromise=this.queue(async()=>{var r,s,a;if(!this._deleted&&(this.persistenceManager=await It.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await zn(this,{idToken:e}),r=await ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(re(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(h,h))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,h=s==null?void 0:s._redirectEventId,d=await this.tryRedirectSignIn(e);(!l||l===h)&&(d!=null&&d.user)&&(s=d.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Wn(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Pd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(re(this.app))return Promise.reject(Re(this));const t=e?ge(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return re(this.app)?Promise.reject(Re(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return re(this.app)?Promise.reject(Re(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Kd(this),t=new Xd(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ut("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await qd(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Pe(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await It.create(this,[Pe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let l=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(h,this,"internal-error"),h.then(()=>{l||a(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,s);return()=>{l=!0,d()}}else{const d=e.addObserver(t);return()=>{l=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ha(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(re(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Ad(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function dt(n){return ge(n)}class go{constructor(e){this.auth=e,this.observer=null,this.addObserver=hl(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ei={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Zd(n){ei=n}function qa(n){return ei.loadJS(n)}function Qd(){return ei.recaptchaEnterpriseScript}function ef(){return ei.gapiScript}function tf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class nf{constructor(){this.enterprise=new rf}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class rf{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const sf="recaptcha-enterprise",za="NO_RECAPTCHA";class of{constructor(e){this.type=sf,this.auth=dt(e)}async verify(e="verify",t=!1){async function r(a){if(!t){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,h)=>{Md(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const I=new xd(d);return a.tenantId==null?a._agentRecaptchaConfig=I:a._tenantRecaptchaConfigs[a.tenantId]=I,l(I.siteKey)}}).catch(d=>{h(d)})})}function s(a,l,h){const d=window.grecaptcha;lo(d)?d.enterprise.ready(()=>{d.enterprise.execute(a,{action:e}).then(I=>{l(I)}).catch(()=>{l(za)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new nf().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{r(this.auth).then(h=>{if(!t&&lo(window.grecaptcha))s(h,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let d=Qd();d.length!==0&&(d+=h),qa(d).then(()=>{s(h,a,l)}).catch(I=>{l(I)})}}).catch(h=>{l(h)})})}}async function mo(n,e,t,r=!1,s=!1){const a=new of(n);let l;if(s)l=za;else try{l=await a.verify(t)}catch{l=await a.verify(t,!0)}const h=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const d=h.phoneEnrollmentInfo.phoneNumber,I=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:d,recaptchaToken:I,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const d=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:d,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return r?Object.assign(h,{captchaResp:l}):Object.assign(h,{captchaResponse:l}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Yi(n,e,t,r,s){var a;if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await mo(n,e,t,t==="getOobCode");return r(n,l)}else return r(n,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await mo(n,e,t,t==="getOobCode");return r(n,h)}else return Promise.reject(l)})}/**
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
 */function af(n,e){const t=ht(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),a=t.getOptions();if(We(a,e??{}))return s;fe(s,"already-initialized")}return t.initialize({options:e})}function cf(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Pe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function lf(n,e,t){const r=dt(n);C(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=Wa(e),{host:l,port:h}=uf(e),d=h===null?"":`:${h}`,I={url:`${a}//${l}${d}/`},T=Object.freeze({host:l,port:h,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){C(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),C(We(I,r.config.emulator)&&We(T,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=I,r.emulatorConfig=T,r.settings.appVerificationDisabledForTesting=!0,nn(l)?($o(`${a}//${l}${d}`),Ho("Auth",!0)):hf()}function Wa(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function uf(n){const e=Wa(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:yo(r.substr(a.length+1))}}else{const[a,l]=r.split(":");return{host:a,port:yo(l)}}}function yo(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function hf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ir{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ke("not implemented")}_getIdTokenResponse(e){return ke("not implemented")}_linkToIdToken(e,t){return ke("not implemented")}_getReauthenticationResolver(e){return ke("not implemented")}}async function df(n,e){return Ke(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function ff(n,e){return cn(n,"POST","/v1/accounts:signInWithPassword",Ge(n,e))}/**
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
 */async function pf(n,e){return cn(n,"POST","/v1/accounts:signInWithEmailLink",Ge(n,e))}async function gf(n,e){return cn(n,"POST","/v1/accounts:signInWithEmailLink",Ge(n,e))}/**
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
 */class tn extends Ir{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new tn(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new tn(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yi(e,t,"signInWithPassword",ff);case"emailLink":return pf(e,{email:this._email,oobCode:this._password});default:fe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yi(e,r,"signUpPassword",df);case"emailLink":return gf(e,{idToken:t,email:this._email,oobCode:this._password});default:fe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Et(n,e){return cn(n,"POST","/v1/accounts:signInWithIdp",Ge(n,e))}/**
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
 */const mf="http://localhost";class ct extends Ir{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ct(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):fe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,a=mr(t,["providerId","signInMethod"]);if(!r||!s)return null;const l=new ct(r,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const t=this.buildRequest();return Et(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Et(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Et(e,t)}buildRequest(){const e={requestUri:mf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=rn(t)}return e}}/**
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
 */function yf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function vf(n){const e=Ht(qt(n)).link,t=e?Ht(qt(e)).deep_link_id:null,r=Ht(qt(n)).deep_link_id;return(r?Ht(qt(r)).link:null)||r||t||e||n}class Er{constructor(e){var t,r,s,a,l,h;const d=Ht(qt(e)),I=(t=d.apiKey)!==null&&t!==void 0?t:null,T=(r=d.oobCode)!==null&&r!==void 0?r:null,A=yf((s=d.mode)!==null&&s!==void 0?s:null);C(I&&T&&A,"argument-error"),this.apiKey=I,this.operation=A,this.code=T,this.continueUrl=(a=d.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=d.lang)!==null&&l!==void 0?l:null,this.tenantId=(h=d.tenantId)!==null&&h!==void 0?h:null}static parseLink(e){const t=vf(e);try{return new Er(t)}catch{return null}}}/**
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
 */class St{constructor(){this.providerId=St.PROVIDER_ID}static credential(e,t){return tn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Er.parseLink(t);return C(r,"argument-error"),tn._fromEmailAndCode(e,r.code,r.tenantId)}}St.PROVIDER_ID="password";St.EMAIL_PASSWORD_SIGN_IN_METHOD="password";St.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ga{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ln extends Ga{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class je extends ln{constructor(){super("facebook.com")}static credential(e){return ct._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return je.credential(e.oauthAccessToken)}catch{return null}}}je.FACEBOOK_SIGN_IN_METHOD="facebook.com";je.PROVIDER_ID="facebook.com";/**
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
 */class Ve extends ln{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ct._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ve.credential(t,r)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
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
 */class Be extends ln{constructor(){super("github.com")}static credential(e){return ct._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Be.credential(e.oauthAccessToken)}catch{return null}}}Be.GITHUB_SIGN_IN_METHOD="github.com";Be.PROVIDER_ID="github.com";/**
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
 */class $e extends ln{constructor(){super("twitter.com")}static credential(e,t){return ct._fromParams({providerId:$e.PROVIDER_ID,signInMethod:$e.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $e.credentialFromTaggedObject(e)}static credentialFromError(e){return $e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return $e.credential(t,r)}catch{return null}}}$e.TWITTER_SIGN_IN_METHOD="twitter.com";$e.PROVIDER_ID="twitter.com";/**
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
 */async function _f(n,e){return cn(n,"POST","/v1/accounts:signUp",Ge(n,e))}/**
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
 */class lt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const a=await ue._fromIdTokenResponse(e,r,s),l=vo(r);return new lt({user:a,providerId:l,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=vo(r);return new lt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function vo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Gn extends pe{constructor(e,t,r,s){var a;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Gn.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Gn(e,t,r,s)}}function Ka(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Gn._fromErrorAndOperation(n,a,e,r):a})}async function wf(n,e,t=!1){const r=await en(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return lt._forOperation(n,"link",r)}/**
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
 */async function If(n,e,t=!1){const{auth:r}=n;if(re(r.app))return Promise.reject(Re(r));const s="reauthenticate";try{const a=await en(n,Ka(r,s,e,n),t);C(a.idToken,r,"internal-error");const l=_r(a.idToken);C(l,r,"internal-error");const{sub:h}=l;return C(n.uid===h,r,"user-mismatch"),lt._forOperation(n,s,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&fe(r,"user-mismatch"),a}}/**
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
 */async function Ja(n,e,t=!1){if(re(n.app))return Promise.reject(Re(n));const r="signIn",s=await Ka(n,r,e),a=await lt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(a.user),a}async function Ef(n,e){return Ja(dt(n),e)}/**
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
 */async function Xa(n){const e=dt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function bf(n,e,t){if(re(n.app))return Promise.reject(Re(n));const r=dt(n),l=await Yi(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",_f).catch(d=>{throw d.code==="auth/password-does-not-meet-requirements"&&Xa(n),d}),h=await lt._fromIdTokenResponse(r,"signIn",l);return await r._updateCurrentUser(h.user),h}function Tf(n,e,t){return re(n.app)?Promise.reject(Re(n)):Ef(ge(n),St.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Xa(n),r})}function Sf(n,e,t,r){return ge(n).onIdTokenChanged(e,t,r)}function Af(n,e,t){return ge(n).beforeAuthStateChanged(e,t)}function Cf(n,e,t,r){return ge(n).onAuthStateChanged(e,t,r)}function kf(n){return ge(n).signOut()}const Kn="__sak";/**
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
 */class Ya{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Kn,"1"),this.storage.removeItem(Kn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Pf=1e3,Rf=10;class Za extends Ya{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$a(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((l,h,d)=>{this.notifyListeners(l,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!t&&this.localCache[r]===l||this.notifyListeners(r,l)},a=this.storage.getItem(r);Wd()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Rf):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Pf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Za.type="LOCAL";const Of=Za;/**
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
 */class Qa extends Ya{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Qa.type="SESSION";const ec=Qa;/**
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
 */function Nf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ti{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ti(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:a}=t.data,l=this.handlersMap[s];if(!(l!=null&&l.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const h=Array.from(l).map(async I=>I(t.origin,a)),d=await Nf(h);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ti.receivers=[];/**
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
 */function br(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Df{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((h,d)=>{const I=br("",20);s.port1.start();const T=setTimeout(()=>{d(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(A){const b=A;if(b.data.eventId===I)switch(b.data.status){case"ack":clearTimeout(T),a=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),h(b.data.response);break;default:clearTimeout(T),clearTimeout(a),d(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:I,data:t},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
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
 */function Ie(){return window}function Lf(n){Ie().location.href=n}/**
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
 */function tc(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function xf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Mf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Uf(){return tc()?self:null}/**
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
 */const nc="firebaseLocalStorageDb",Ff=1,Jn="firebaseLocalStorage",ic="fbase_key";class un{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ni(n,e){return n.transaction([Jn],e?"readwrite":"readonly").objectStore(Jn)}function jf(){const n=indexedDB.deleteDatabase(nc);return new un(n).toPromise()}function Zi(){const n=indexedDB.open(nc,Ff);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Jn,{keyPath:ic})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Jn)?e(r):(r.close(),await jf(),e(await Zi()))})})}async function _o(n,e,t){const r=ni(n,!0).put({[ic]:e,value:t});return new un(r).toPromise()}async function Vf(n,e){const t=ni(n,!1).get(e),r=await new un(t).toPromise();return r===void 0?null:r.value}function wo(n,e){const t=ni(n,!0).delete(e);return new un(t).toPromise()}const Bf=800,$f=3;class rc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>$f)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ti._getInstance(Uf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await xf(),!this.activeServiceWorker)return;this.sender=new Df(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Mf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zi();return await _o(e,Kn,"1"),await wo(e,Kn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>_o(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Vf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wo(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=ni(s,!1).getAll();return new un(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Bf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rc.type="LOCAL";const Hf=rc;new an(3e4,6e4);/**
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
 */function qf(n,e){return e?Pe(e):(C(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Tr extends Ir{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Et(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Et(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Et(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zf(n){return Ja(n.auth,new Tr(n),n.bypassAuthState)}function Wf(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),If(t,new Tr(n),n.bypassAuthState)}async function Gf(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),wf(t,new Tr(n),n.bypassAuthState)}/**
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
 */class sc{constructor(e,t,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:a,error:l,type:h}=e;if(l){this.reject(l);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(d))}catch(I){this.reject(I)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zf;case"linkViaPopup":case"linkViaRedirect":return Gf;case"reauthViaPopup":case"reauthViaRedirect":return Wf;default:fe(this.auth,"internal-error")}}resolve(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Kf=new an(2e3,1e4);class vt extends sc{constructor(e,t,r,s,a){super(e,t,s,a),this.provider=r,this.authWindow=null,this.pollId=null,vt.currentPopupAction&&vt.currentPopupAction.cancel(),vt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Ne(this.filter.length===1,"Popup operations only handle one event");const e=br();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(we(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(we(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(we(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Kf.get())};e()}}vt.currentPopupAction=null;/**
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
 */const Jf="pendingRedirect",Un=new Map;class Xf extends sc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Un.get(this.auth._key());if(!e){try{const r=await Yf(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Un.set(this.auth._key(),e)}return this.bypassAuthState||Un.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yf(n,e){const t=ep(e),r=Qf(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Zf(n,e){Un.set(n._key(),e)}function Qf(n){return Pe(n._redirectPersistence)}function ep(n){return Mn(Jf,n.config.apiKey,n.name)}async function tp(n,e,t=!1){if(re(n.app))return Promise.reject(Re(n));const r=dt(n),s=qf(r,e),l=await new Xf(r,s,t).execute();return l&&!t&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
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
 */const np=600*1e3;class ip{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!rp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!oc(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(we(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=np&&this.cachedEventUids.clear(),this.cachedEventUids.has(Io(e))}saveEventToCache(e){this.cachedEventUids.add(Io(e)),this.lastProcessedEventTime=Date.now()}}function Io(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function oc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function rp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oc(n);default:return!1}}/**
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
 */async function sp(n,e={}){return Ke(n,"GET","/v1/projects",e)}/**
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
 */const op=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ap=/^https?/;async function cp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await sp(n);for(const t of e)try{if(lp(t))return}catch{}fe(n,"unauthorized-domain")}function lp(n){const e=Ji(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const l=new URL(n);return l.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&l.hostname===r}if(!ap.test(t))return!1;if(op.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const up=new an(3e4,6e4);function Eo(){const n=Ie().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function hp(n){return new Promise((e,t)=>{var r,s,a;function l(){Eo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Eo(),t(we(n,"network-request-failed"))},timeout:up.get()})}if(!((s=(r=Ie().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=Ie().gapi)===null||a===void 0)&&a.load)l();else{const h=tf("iframefcb");return Ie()[h]=()=>{gapi.load?l():t(we(n,"network-request-failed"))},qa(`${ef()}?onload=${h}`).catch(d=>t(d))}}).catch(e=>{throw Fn=null,e})}let Fn=null;function dp(n){return Fn=Fn||hp(n),Fn}/**
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
 */const fp=new an(5e3,15e3),pp="__/auth/iframe",gp="emulator/auth/iframe",mp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},yp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vp(n){const e=n.config;C(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?vr(e,gp):`https://${n.config.authDomain}/${pp}`,r={apiKey:e.apiKey,appName:n.name,v:Tt},s=yp.get(n.config.apiHost);s&&(r.eid=s);const a=n._getFrameworks();return a.length&&(r.fw=a.join(",")),`${t}?${rn(r).slice(1)}`}async function _p(n){const e=await dp(n),t=Ie().gapi;return C(t,n,"internal-error"),e.open({where:document.body,url:vp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:mp,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const l=we(n,"network-request-failed"),h=Ie().setTimeout(()=>{a(l)},fp.get());function d(){Ie().clearTimeout(h),s(r)}r.ping(d).then(d,()=>{a(l)})}))}/**
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
 */const wp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ip=500,Ep=600,bp="_blank",Tp="http://localhost";class bo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Sp(n,e,t,r=Ip,s=Ep){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let h="";const d=Object.assign(Object.assign({},wp),{width:r.toString(),height:s.toString(),top:a,left:l}),I=ee().toLowerCase();t&&(h=Ua(I)?bp:t),xa(I)&&(e=e||Tp,d.scrollbars="yes");const T=Object.entries(d).reduce((b,[P,k])=>`${b}${P}=${k},`,"");if(zd(I)&&h!=="_self")return Ap(e||"",h),new bo(null);const A=window.open(e||"",h,T);C(A,n,"popup-blocked");try{A.focus()}catch{}return new bo(A)}function Ap(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Cp="__/auth/handler",kp="emulator/auth/handler",Pp=encodeURIComponent("fac");async function To(n,e,t,r,s,a){C(n.config.authDomain,n,"auth-domain-config-required"),C(n.config.apiKey,n,"invalid-api-key");const l={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Tt,eventId:s};if(e instanceof Ga){e.setDefaultLanguage(n.languageCode),l.providerId=e.providerId||"",ul(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[T,A]of Object.entries({}))l[T]=A}if(e instanceof ln){const T=e.getScopes().filter(A=>A!=="");T.length>0&&(l.scopes=T.join(","))}n.tenantId&&(l.tid=n.tenantId);const h=l;for(const T of Object.keys(h))h[T]===void 0&&delete h[T];const d=await n._getAppCheckToken(),I=d?`#${Pp}=${encodeURIComponent(d)}`:"";return`${Rp(n)}?${rn(h).slice(1)}${I}`}function Rp({config:n}){return n.emulator?vr(n,kp):`https://${n.authDomain}/${Cp}`}/**
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
 */const ji="webStorageSupport";class Op{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ec,this._completeRedirectFn=tp,this._overrideRedirectResult=Zf}async _openPopup(e,t,r,s){var a;Ne((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await To(e,t,r,Ji(),s);return Sp(e,l,br())}async _openRedirect(e,t,r,s){await this._originValidation(e);const a=await To(e,t,r,Ji(),s);return Lf(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:a}=this.eventManagers[t];return s?Promise.resolve(s):(Ne(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await _p(e),r=new ip(e);return t.register("authEvent",s=>(C(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ji,{type:ji},s=>{var a;const l=(a=s==null?void 0:s[0])===null||a===void 0?void 0:a[ji];l!==void 0&&t(!!l),fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=cp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return $a()||Ma()||wr()}}const Np=Op;var So="@firebase/auth",Ao="1.10.8";/**
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
 */class Dp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Lp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function xp(n){Ee(new de("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:h}=r.options;C(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:l,authDomain:h,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ha(n)},I=new Yd(r,s,a,d);return cf(I,t),I},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ee(new de("auth-internal",e=>{const t=dt(e.getProvider("auth").getImmediate());return(r=>new Dp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),se(So,Ao,Lp(n)),se(So,Ao,"esm2017")}/**
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
 */const Mp=300,Up=Bo("authIdTokenMaxAge")||Mp;let Co=null;const Fp=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Up)return;const s=t==null?void 0:t.token;Co!==s&&(Co=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function jp(n=sr()){const e=ht(n,"auth");if(e.isInitialized())return e.getImmediate();const t=af(n,{popupRedirectResolver:Np,persistence:[Hf,Of,ec]}),r=Bo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const l=Fp(a.toString());Af(t,l,()=>l(t.currentUser)),Sf(t,h=>l(h))}}const s=jo("auth");return s&&lf(t,`http://${s}`),t}function Vp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Zd({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const a=we("internal-error");a.customData=s,t(a)},r.type="text/javascript",r.charset="UTF-8",Vp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});xp("Browser");const Bp={apiKey:"AIzaSyAI-c_HDkJIxgTN5xTg_EA0kbTAWMzOLUw",authDomain:"minh-aquarium.firebaseapp.com",projectId:"minh-aquarium",storageBucket:"minh-aquarium.firebasestorage.app",messagingSenderId:"340492499732",appId:"1:340492499732:web:d6d30168d8d27e1618a001",measurementId:"G-ZWFZJCQJ3P"},Sr=Ko(Bp);wd(Sr);const Xn=jp(Sr);qh().then(n=>{n&&$h(Sr)}).catch(()=>{});window.addEventListener("scroll",()=>{const n=document.querySelector(".site-header");n&&(window.scrollY>50?n.style.boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)":n.style.boxShadow="0 2px 10px rgba(0,0,0,0.05)")});function $p(){try{const n=JSON.parse(localStorage.getItem("minhaq_cart"))||[];return Array.isArray(n)?n.map(e=>({name:typeof(e==null?void 0:e.name)=="string"?e.name:"Sản phẩm",priceText:typeof(e==null?void 0:e.priceText)=="string"?e.priceText:"0đ",imgUrl:typeof(e==null?void 0:e.imgUrl)=="string"?e.imgUrl:"",quantity:Math.max(1,parseInt(e==null?void 0:e.quantity,10)||1)})).filter(e=>e.name.trim().length>0):[]}catch{return[]}}let ae=$p();function Yt(){let n=ae.reduce((t,r)=>t+(parseInt(r.quantity,10)||0),0);document.querySelectorAll(".cart-btn").forEach(t=>{let r=t.querySelector(".cart-count-badge");r||(r=document.createElement("span"),r.className="cart-count-badge",r.style.position="absolute",r.style.top="-8px",r.style.right="-8px",r.style.background="var(--accent-red)",r.style.color="#fff",r.style.borderRadius="50%",r.style.padding="3px 6px",r.style.fontSize="12px",r.style.fontWeight="bold",t.style.position="relative",t.appendChild(r)),r.textContent=n,r.style.display=n>0?"inline-block":"none",r.style.transform="scale(1.5)",setTimeout(()=>r.style.transform="scale(1)",300)})}function Hp(n){return parseInt((n||"").replace(/[^0-9]/g,""),10)||0}function qp(n){const e=n.querySelector(".product-image.real-image");if(!e)return"";const t=e.style.backgroundImage,r=window.getComputedStyle(e).backgroundImage,s=t&&t!=="none"?t:r,a=s?s.match(/url\(["']?(.*?)["']?\)/):null;return a&&a[1]?a[1]:""}Yt();let Ze;function zp(n,e){if(!Ze){Ze=document.createElement("div"),Ze.className="custom-cart-modal-overlay",Ze.innerHTML=`
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
        `,document.body.appendChild(Ze);const I=document.createElement("style");I.innerHTML=`
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
        `,document.head.appendChild(I);const T=document.getElementById("modal-qty-input");document.getElementById("modal-qty-minus").addEventListener("click",()=>{let A=parseInt(T.value)||1;A>1&&(T.value=A-1)}),document.getElementById("modal-qty-plus").addEventListener("click",()=>{let A=parseInt(T.value)||1;T.value=A+1})}const t=document.getElementById("modal-product-name"),r=document.getElementById("modal-qty-input"),s=document.getElementById("modal-btn-cancel"),a=document.getElementById("modal-btn-confirm"),l=document.getElementById("modal-btn-close");t.textContent=n,r.value="1";const h=()=>{Ze.classList.remove("active");const I=s.cloneNode(!0);s.parentNode.replaceChild(I,s);const T=a.cloneNode(!0);a.parentNode.replaceChild(T,a);const A=l.cloneNode(!0);l.parentNode.replaceChild(A,l)},d=(I,T)=>I.addEventListener("click",()=>{h(),T()});d(document.getElementById("modal-btn-cancel"),()=>e(null)),d(document.getElementById("modal-btn-close"),()=>e(null)),d(document.getElementById("modal-btn-confirm"),()=>{const I=parseInt(r.value);e(I>0?I:null)}),Ze.classList.add("active")}const Wp=document.querySelectorAll(".btn-add-cart");Wp.forEach(n=>{n.addEventListener("click",function(){const e=this.closest(".product-card");if(!e)return;const t=e.querySelector(".product-name"),r=e.querySelector(".price-current");if(!t||!r){alert("Sản phẩm này chưa đủ thông tin để thêm vào giỏ hàng.");return}const s=t.textContent.trim(),a=r.textContent.trim(),l=qp(e);zp(s,h=>{if(!h)return;const d=ae.find(A=>A.name===s),I=parseInt(h,10);if(!I||I<1)return;d?d.quantity+=I:ae.push({name:s,priceText:a,imgUrl:l,quantity:I}),localStorage.setItem("minhaq_cart",JSON.stringify(ae)),Yt();const T=n.innerHTML;n.innerHTML=`<i class="fa-solid fa-check"></i> Đã thêm ${I}`,n.style.background="var(--accent-red)",n.style.color="white",n.style.borderColor="var(--accent-red)",setTimeout(()=>{n.innerHTML=T,n.style.background="",n.style.color="",n.style.borderColor=""},2e3)})})});let Rn=!1,Vi="",Fe="standard",On=0;const Gp=["ha noi","hanoi","hai phong","quang ninh","bac ninh","bac giang","hai duong","hung yen","vinh phuc","phu tho","thai nguyen","lang son","cao bang","bac kan","tuyen quang","yen bai","lao cai","dien bien","lai chau","son la","hoa binh","ha giang","nam dinh","thai binh","ninh binh","ha nam","nam dinh","quang ninh"],Kp=["thanh hoa","nghe an","ha tinh","quang binh","quang tri","thua thien hue","hue","da nang","quang nam","quang ngai","binh dinh","phu yen","khanh hoa","ninh thuan","binh thuan","kon tum","gia lai","dak lak","dak nong","lam dong"],Jp=["ho chi minh","hcm","tp hcm","can tho","ba ria","vung tau","dong nai","binh duong","binh phuoc","tay ninh","long an","tien giang","ben tre","tra vinh","vinh long","dong thap","an giang","kien giang","hau giang","soc trang","bac lieu","ca mau"];function Xp(n){const e=He(n);return e?Gp.some(t=>e.includes(t))?"north":Kp.some(t=>e.includes(t))?"central":Jp.some(t=>e.includes(t))?"south":"":""}function Yp(n){return n==="north"?15e3:n==="central"?2e4:n==="south"?25e3:0}function Zp(n){return n==="north"?"Miền Bắc":n==="central"?"Miền Trung":n==="south"?"Miền Nam":"Chưa xác định"}function ko(n){const e=parseFloat(n)||0;return e>0&&e<=20}if(window.location.pathname.includes("cart.html")||document.querySelector(".empty-cart-container")){let e=function(){if(ae.length===0){n.style.display="flex",n.innerHTML=`
                <div class="empty-cart-container text-center">
                    <div style="font-size: 80px; color: #cbd5e1; margin-bottom: 20px;">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Giỏ hàng trống</h2>
                    <p style="color: var(--text-muted); margin-bottom: 30px;">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a href="products.html" class="btn btn-cart-black" style="display: inline-flex; width: auto; padding: 12px 30px; border-radius: 6px;">Tiếp tục mua sắm</a>
                </div>
            `;return}let t=0,r=ae.map((s,a)=>{const l=Hp(s.priceText);return t+=l*s.quantity,`
                <div style="display: flex; align-items: center; border-bottom: 1px solid #e2e8f0; padding: 15px 0; gap: 15px;">
                    <img src="${s.imgUrl||"anh/logo_transparent.png"}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; font-size: 16px;">${s.name}</h4>
                        <div style="color: var(--primary); font-weight: bold;">${s.priceText}</div>
                    </div>
                    ${Rn?`
                    <div style="font-weight: bold;">SL: ${s.quantity}</div>
                    `:`
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="number" value="${s.quantity}" min="1" onchange="window.updateQuantity(${a}, this.value)" style="width: 50px; padding: 5px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <button onclick="window.removeCartItem(${a})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>`}
                </div>
            `}).join("");if(n.style.display="block",!Rn)n.innerHTML=`
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 350px; gap: 30px; align-items: start;">
                    <div class="checkout-card">
                        <h2 style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f1f5f9;">Giỏ hàng của bạn</h2>
                        ${r}
                    </div>
                    <div class="checkout-card">
                        <h3 style="margin-bottom: 20px;">Tổng đơn hàng</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
                            <span>Tạm tính:</span>
                            <strong>${t.toLocaleString("vi-VN")}đ</strong>
                        </div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Miễn phí ship cho đơn hàng từ 500.000đ (Báo giá phí ship ở bước sau)</div>
                        <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                            <b>Tổng cộng:</b>
                            <b style="color: var(--primary);">${t.toLocaleString("vi-VN")}đ</b>
                        </div>
                        <button onclick="window.goToCheckout()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            Tiến hành thanh toán <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
                        </button>
                    </div>
                </div>
            `;else{const s=Xp(Vi),a=ko(On);Fe==="express"&&!a&&(Fe="standard");let l=Yp(s),h=t+l;n.innerHTML=`
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
                            <div class="form-group"><label>Địa chỉ nhận hàng *</label><input type="text" class="form-input" id="checkout-address-input" value="${Vi}" oninput="window.updateCheckoutAddress(this.value)" placeholder="Ví dụ: Hà Nội, Đà Nẵng, TP HCM..."></div>
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
                              <div style="margin-top:10px; font-size:14px; color:#0f172a;">Khu vực hiện tại: <strong>${Zp(s)}</strong></div>
                              <div style="font-size:12px; color:#64748b; margin-top:4px;">Nhập tỉnh/thành trong địa chỉ để hệ thống tự tính phí ship.</div>
                            </div>

                            <div class="form-group" style="margin-top:10px;">
                              <label style="display:block; margin-bottom:10px;">Khoảng cách giao hàng (km) để xét ship hỏa tốc</label>
                              <input type="number" min="0" class="form-input" style="max-width:180px;" value="${On}" oninput="window.updateShippingDistance(this.value)" placeholder="Nhập số km">
                              <div style="font-size:12px; color:#64748b; margin-top:6px;">Ship hỏa tốc chỉ áp dụng trong bán kính <strong>20km</strong>.</div>
                            </div>

                            <div class="shipping-option ${Fe==="standard"?"active":""}" onclick="window.setShippingMethod('standard')">
                              <div style="display:flex; align-items:center;">
                                <input type="radio" name="shipping-method" ${Fe==="standard"?"checked":""}>
                                <strong>Giao tiêu chuẩn</strong>
                              </div>
                              <strong>${l>0?l.toLocaleString("vi-VN")+"đ":"-"}</strong>
                            </div>

                            <div class="shipping-option ${Fe==="express"?"active":""}" style="${a?"":"opacity:0.6; cursor:not-allowed;"}" onclick="window.setShippingMethod('express')">
                              <div style="display:flex; align-items:center;">
                                <input type="radio" name="shipping-method" ${Fe==="express"?"checked":""} ${a?"":"disabled"}>
                                <strong>Giao hỏa tốc (≤ 20km)</strong>
                              </div>
                              <strong>${l>0?l.toLocaleString("vi-VN")+"đ":"-"}</strong>
                            </div>

                            ${a?"":'<div style="font-size:12px; color:#ef4444; margin-top:8px;">Không thể chọn hỏa tốc vì khoảng cách lớn hơn 20km.</div>'}
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
                                ${r}
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                                <span>Tạm tính:</span>
                                <strong>${t.toLocaleString("vi-VN")}đ</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                                <span>Phí vận chuyển:</span>
                              <strong>${l>0?l.toLocaleString("vi-VN")+"đ":'<span style="color:#f59e0b;">Nhập địa chỉ để tính</span>'}</strong>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                                <b>Tổng cộng:</b>
                                <b style="color: var(--primary); font-size: 22px;">${h.toLocaleString("vi-VN")}đ</b>
                            </div>
                            <button onclick="window.submitOrder()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            `}};var rg=e;const n=document.querySelector(".page-container");if(!document.getElementById("checkout-styles")){const t=document.createElement("style");t.id="checkout-styles",t.innerHTML=`
            .form-input { width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 5px; outline: none; transition: border 0.3s; }
            .form-input:focus { border-color: var(--primary); }
            .form-group { margin-bottom: 20px; }
            .checkout-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
            .shipping-option { display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 10px; cursor: pointer; }
            .shipping-option.active { border-color: var(--primary); background: #f0f9ff; }
            .shipping-option input { margin-right: 15px; transform: scale(1.2); }
        `,document.head.appendChild(t)}window.updateQuantity=function(t,r){r<1&&(r=1),ae[t].quantity=parseInt(r),localStorage.setItem("minhaq_cart",JSON.stringify(ae)),Yt(),e()},window.removeCartItem=function(t){ae.splice(t,1),localStorage.setItem("minhaq_cart",JSON.stringify(ae)),Yt(),e()},window.goToCheckout=function(){Rn=!0,e(),window.scrollTo(0,0)},window.updateCheckoutAddress=function(t){Vi=t||"",e()},window.setShippingMethod=function(t){if(t==="express"&&!ko(On)){alert("Ship hỏa tốc chỉ áp dụng trong bán kính 20km."),Fe="standard",e();return}Fe=t,e()},window.updateShippingDistance=function(t){On=Math.max(0,parseFloat(t)||0),e()},window.submitOrder=function(){alert("🎉 Chúc mừng bạn đã đặt hàng thành công! Nhân viên Minh Aquarium sẽ đóng gói hỏa tốc gửi đi ngay bây giờ."),ae=[],localStorage.removeItem("minhaq_cart"),Rn=!1,Yt(),e(),window.scrollTo(0,0)},e()}const Po=document.querySelector(".chat-btn");Po&&Po.addEventListener("click",()=>{alert("Chào mừng bạn đến với Minh Aquarium! Vui lòng để lại lời nhắn, nhân viên của chúng tôi sẽ phản hồi trong giây lát.")});document.querySelectorAll(".cart-btn").forEach(n=>{n.addEventListener("click",()=>{window.location.href="cart.html"})});document.querySelectorAll(".btn-login").forEach(n=>{n.addEventListener("click",()=>{if((n.dataset.authAction||"login")==="logout"){confirm("Bạn muốn đăng xuất?")&&kf(Xn);return}window.location.href="login.html"})});const Ro=document.querySelector(".carousel-track"),Nn=Array.from(document.querySelectorAll(".carousel-slide")||[]),Oo=document.querySelector(".carousel-nav.next"),No=document.querySelector(".carousel-nav.prev"),Dn=Array.from(document.querySelectorAll(".dot")||[]);if(Ro&&Nn.length>0){let n=0,e;const t=l=>{Ro.style.transform=`translateX(-${l*(100/Nn.length)}%)`,Dn.forEach(h=>h.classList.remove("active")),Dn[l]&&Dn[l].classList.add("active"),n=l},r=()=>{let l=n+1;l>=Nn.length&&(l=0),t(l)},s=()=>{let l=n-1;l<0&&(l=Nn.length-1),t(l)},a=()=>{e&&clearInterval(e),e=setInterval(r,5e3)};a(),Oo&&Oo.addEventListener("click",()=>{r(),a()}),No&&No.addEventListener("click",()=>{s(),a()}),Dn.forEach((l,h)=>{l.addEventListener("click",()=>{t(h),a()})})}function Qp(){return document.querySelectorAll(".search-input")}function He(n){return(n||"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^\w\s&-]/g," ").replace(/\s+/g," ").trim()}function Qi(n){if(window.location.pathname.includes("products.html")){const a=document.querySelector(".sidebar-filter"),l=a==null?void 0:a.querySelector(".filter-input");if(l&&l.value!==n&&(l.value=n),typeof window.applyAdvancedFilters=="function"){window.applyAdvancedFilters();return}}const t=He(n);document.querySelectorAll(".product-card").forEach(a=>{const l=a.querySelector(".product-name"),h=a.querySelector(".product-cat");if(l||h){const d=l?He(l.textContent).includes(t):!1,I=h?He(h.textContent).includes(t):!1;t===""||d||I?a.style.display="block":a.style.display="none"}});const s=document.querySelectorAll(".sidebar-menu a");s.length>0&&s.forEach(a=>{a.classList.remove("active");const l=a.childNodes[0].textContent.trim().toLowerCase();(t!==""&&l.includes(t)||t===""&&l==="tất cả sản phẩm")&&a.classList.add("active")})}function Do(){Qp().forEach(e=>{if(e.dataset.searchBound==="1")return;e.dataset.searchBound="1";const r=new URLSearchParams(window.location.search).get("q");r&&!e.value&&(e.value=r,window.location.pathname.includes("products.html")&&Qi(r)),e.addEventListener("input",s=>{window.location.pathname.includes("products.html")&&Qi(s.target.value)}),e.addEventListener("keydown",s=>{s.key==="Enter"&&!window.location.pathname.includes("products.html")&&(window.location.href=`products.html?q=${encodeURIComponent(s.target.value.trim())}`)})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Do):Do();document.querySelectorAll(".search-icon").forEach(n=>{n.style.cursor="pointer",n.addEventListener("click",()=>{const e=n.nextElementSibling;e&&e.classList.contains("search-input")&&(window.location.pathname.includes("products.html")?Qi(e.value):e.value.trim()?window.location.href=`products.html?q=${encodeURIComponent(e.value.trim())}`:window.location.href="products.html")})});document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".sort-select"),e=document.querySelector(".product-grid");if(n&&e){let t=Array.from(e.querySelectorAll(".product-card"));n.addEventListener("change",r=>{const s=r.target.value;let a=Array.from(e.querySelectorAll(".product-card"));s==="featured"||s==="newest"?(s==="newest"?[...t].reverse():t).forEach(h=>e.appendChild(h)):(s==="price-asc"||s==="price-desc")&&(a.sort((l,h)=>{var b,P;const d=((b=l.querySelector(".price-current"))==null?void 0:b.textContent)||"0",I=((P=h.querySelector(".price-current"))==null?void 0:P.textContent)||"0",T=parseInt(d.replace(/[^0-9]/g,""))||0,A=parseInt(I.replace(/[^0-9]/g,""))||0;return s==="price-asc"?T-A:A-T}),a.forEach(l=>e.appendChild(l)))})}});document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".sidebar-filter");if(!n)return;const e=document.querySelector(".header-main .search-input"),t=n.querySelector(".filter-input"),r=n.querySelectorAll('.checkbox-list input[type="checkbox"]'),s=n.querySelectorAll(".price-inputs .price-input"),a=n.querySelector(".btn-clear-filter"),l=document.querySelector(".product-grid"),h=document.querySelector(".page-subtitle");function d(){const A=Array.from(l.querySelectorAll(".product-card")),b=He((t==null?void 0:t.value)||(e==null?void 0:e.value)||""),P=Array.from(r).filter(j=>j.checked).map(j=>He(j.parentElement.textContent));let k=parseInt(s[0].value)||0,M=parseInt(s[1].value)||999999999;if(k>M){let j=k;k=M,M=j}let L=0;A.forEach(j=>{var p,m,y;const $=He(((p=j.querySelector(".product-name"))==null?void 0:p.textContent)||""),V=He(((m=j.querySelector(".product-cat"))==null?void 0:m.textContent)||""),X=((y=j.querySelector(".price-current"))==null?void 0:y.textContent)||"0",me=parseInt(X.replace(/[^0-9]/g,""))||0,z=b===""||$.includes(b)||V.includes(b),v=P.length===0||P.some(w=>V.includes(w)||w.includes(V)),f=me>=k&&me<=M;z&&v&&f?(j.style.display="block",L++):j.style.display="none"}),h&&(h.textContent=`Tìm thấy ${L} sản phẩm`)}window.applyAdvancedFilters=d,t&&t.addEventListener("input",d),e&&e.addEventListener("input",d),r.forEach(A=>{A.addEventListener("change",d)}),s.forEach(A=>{A.addEventListener("change",d),A.addEventListener("keyup",b=>{b.key==="Enter"&&d()})}),a&&a.addEventListener("click",()=>{t&&(t.value=""),e&&(e.value=""),r.forEach(A=>A.checked=!1),s.length===2&&(s[0].value=0,s[1].value=1e7),d()});const T=new URLSearchParams(window.location.search).get("q")||"";T&&(t&&(t.value=T),e&&(e.value=T)),d()});document.addEventListener("DOMContentLoaded",()=>{const n=window.location.pathname.toLowerCase();if(!(n.endsWith("/index.html")||n==="/"||n.endsWith("/")||n==="index.html"))return;document.body.style.background="linear-gradient(to bottom right, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)",document.body.style.backgroundAttachment="fixed";const t=document.createElement("div");t.className="aqua-bubbles-container",Object.assign(t.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",zIndex:"-1",overflow:"hidden",pointerEvents:"none"});for(let r=0;r<30;r++){const s=document.createElement("div"),a=Math.random()*35+5,l=Math.random()*100,h=Math.random()*10+5,d=Math.random()*5;Object.assign(s.style,{position:"absolute",bottom:"-60px",left:`${l}%`,width:`${a}px`,height:`${a}px`,background:"rgba(255, 255, 255, 0.4)",border:"1px solid rgba(255, 255, 255, 0.7)",borderRadius:"50%",boxShadow:"inset 0 0 10px rgba(255,255,255,0.4)",animation:`aquaRise ${h}s infinite ease-in-out ${d}s`}),t.appendChild(s)}if(document.body.appendChild(t),!document.getElementById("aqua-bubble-css")){const r=document.createElement("style");r.id="aqua-bubble-css",r.innerHTML=`
            @keyframes aquaRise {
                0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                50% { transform: translateY(-50vh) scale(1.1) translateX(15px); }
                90% { opacity: 0.8; }
                100% { transform: translateY(-110vh) scale(1.4) translateX(-15px); opacity: 0; }
            }
        `,document.head.appendChild(r)}});const Lo=document.getElementById("auth-form"),Bi=document.getElementById("auth-toggle-link"),eg=document.getElementById("auth-title"),tg=document.getElementById("auth-subtitle"),ng=document.getElementById("auth-submit-btn"),ig=document.getElementById("auth-toggle-text"),xo=document.getElementById("auth-remember-row");let Ae=!0;Bi&&Bi.addEventListener("click",()=>{Ae=!Ae,eg.textContent=Ae?"Đăng nhập":"Đăng ký",tg.textContent=Ae?"Đăng nhập để theo dõi đơn hàng và tích điểm":"Tạo tài khoản mới để hưởng ưu đãi thành viên",ng.textContent=Ae?"Đăng nhập ngay":"Đăng ký tài khoản",ig.textContent=Ae?"Chưa có tài khoản?":"Đã có tài khoản?",Bi.textContent=Ae?"Đăng ký ngay":"Đăng nhập ngay",xo&&(xo.style.display=Ae?"flex":"none")});Lo&&Lo.addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("auth-email").value,t=document.getElementById("auth-password").value;try{Ae?(await Tf(Xn,e,t),alert("🎉 Đăng nhập thành công!")):(await bf(Xn,e,t),alert("🎉 Đăng ký thành công! Chào mừng thành viên mới.")),window.location.href="index.html"}catch(r){console.error(r),alert(`❌ Lỗi: ${r.message}`)}});Cf(Xn,n=>{document.querySelectorAll(".btn-login").forEach(t=>{n?(t.innerHTML=`<i class="fa-solid fa-user"></i> ${n.email.split("@")[0]}`,t.dataset.authAction="logout"):(t.innerHTML="Đăng nhập",t.dataset.authAction="login")})});
