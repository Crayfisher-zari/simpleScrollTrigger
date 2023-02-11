var T=(i,e,n)=>{if(!e.has(i))throw TypeError("Cannot "+n)};var t=(i,e,n)=>(T(i,e,"read from private field"),n?n.call(i):e.get(i)),o=(i,e,n)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,n)},s=(i,e,n,c)=>(T(i,e,"write to private field"),c?c.call(i,n):e.set(i,n),n);var A=(i,e,n)=>(T(i,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();var C,u,h,g,b,P;class V{constructor({forwardCallback:e,backCallback:n,isOnce:c}){o(this,C,!1);o(this,u,void 0);o(this,h,void 0);o(this,g,null);o(this,b,null);o(this,P,!1);s(this,u,e),s(this,h,n),s(this,P,c),e!==void 0&&s(this,g,!1),n!==void 0&&s(this,b,!1)}get callback(){return e=>{var c,r;const n=((r=(c=e[0].rootBounds)==null?void 0:c.y)!=null?r:0)-e[0].boundingClientRect.y;t(this,g)||e[0].isIntersecting&&n<0&&(t(this,C)===!1&&s(this,C,!0),t(this,u)&&(t(this,P)&&s(this,g,!0),t(this,u).call(this))),t(this,b)||!e[0].isIntersecting&&n<0&&t(this,C)&&t(this,h)&&(t(this,P)&&s(this,b,!0),t(this,h).call(this))}}get isAllCalled(){return I(t(this,u),t(this,h))==="forward"?Boolean(t(this,g)):I(t(this,u),t(this,h))==="back"?Boolean(t(this,b)):I(t(this,u),t(this,h))==="both"?Boolean(t(this,g))&&Boolean(t(this,b)):!1}}C=new WeakMap,u=new WeakMap,h=new WeakMap,g=new WeakMap,b=new WeakMap,P=new WeakMap;const I=(i,e)=>i!==void 0&&e==null?"forward":i==null&&e!==void 0?"back":i!==void 0&&e!==void 0?"both":"nothing",H=(i,e)=>{if(!i)return;const n=i.clientHeight;return e===void 0?0:typeof e=="number"?e:e.unit==="px"?e.value:n*e.value/100},M=i=>{const e=window.innerHeight;return i===void 0?e:typeof i=="number"?e-i:i.unit==="px"?e-i.value:e*(100-i.value)/100};var d,w,m,k,x,y,B,p,O,f,E,S,L,N;class z{constructor({trigger:e,onEnter:n,onLeaveBack:c,onLeave:r,onEnterBack:l,startViewPortPoint:a,startTriggerPoint:v,endViewPortPoint:$,endTriggerPoint:q,once:F}){o(this,E);o(this,L);o(this,d,null);o(this,w,null);o(this,m,null);o(this,k,null);o(this,x,null);o(this,y,0);o(this,B,0);o(this,p,void 0);o(this,O,void 0);o(this,f,!1);if(!e){console.warn("Trigger element is Null");return}s(this,d,e),s(this,f,Boolean(F)),a!==void 0&&s(this,y,a),v!==void 0&&s(this,B,v),s(this,p,$),s(this,O,q),s(this,w,new V({forwardCallback:n,backCallback:c,isOnce:t(this,f)})),s(this,m,new V({forwardCallback:r,backCallback:l,isOnce:t(this,f)})),A(this,E,S).call(this),window.addEventListener("resize",()=>{this.disconnectObserve(),s(this,k,null),s(this,x,null),t(this,L,N)||A(this,E,S).call(this)})}disconnectObserve(){var e,n;(e=t(this,k))==null||e.disconnect(),(n=t(this,x))==null||n.disconnect()}}d=new WeakMap,w=new WeakMap,m=new WeakMap,k=new WeakMap,x=new WeakMap,y=new WeakMap,B=new WeakMap,p=new WeakMap,O=new WeakMap,f=new WeakMap,E=new WeakSet,S=function(){if(!t(this,d))return;const e=[0,1],n=M(t(this,y)),c=H(t(this,d),t(this,B));if(c===void 0||(s(this,k,new IntersectionObserver(a=>{var v;!t(this,w)||(t(this,w).callback(a),t(this,f)&&t(this,w).isAllCalled&&((v=t(this,k))==null||v.disconnect()))},{rootMargin:`${c+n}px 0px ${-(c+n)}px`,threshold:e})),t(this,k).observe(t(this,d)),t(this,p)===void 0&&t(this,O)===void 0))return;const r=M(t(this,p)),l=H(t(this,d),t(this,O));l!==void 0&&(s(this,x,new IntersectionObserver(a=>{var v;!t(this,m)||(t(this,m).callback(a),t(this,f)&&t(this,m).isAllCalled&&((v=t(this,x))==null||v.disconnect()))},{rootMargin:`${r+l}px 0px ${-(r+l)}px`,threshold:e})),t(this,x).observe(t(this,d)))},L=new WeakSet,N=function(){var e,n;return t(this,f)&&Boolean((e=t(this,w))==null?void 0:e.isAllCalled)&&Boolean((n=t(this,m))==null?void 0:n.isAllCalled)};document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector(".trigger"),e=document.querySelector(".callbackText");!e||new z({trigger:i,onEnter:()=>{console.log("onEnter"),e.textContent="onEnter"},onLeaveBack:()=>{console.log("onLeaveBack"),e.textContent="onLeaveBack"},onLeave:()=>{console.log("onLeave"),e.textContent="onLeave"},onEnterBack:()=>{console.log("onEnterBack"),e.textContent="onEnterBack"},startViewPortPoint:{value:90,unit:"%"},startTriggerPoint:{value:200,unit:"px"},endViewPortPoint:{value:50,unit:"%"},endTriggerPoint:{value:100,unit:"%"}})});