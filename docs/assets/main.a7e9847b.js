var H=(r,t,n)=>{if(!t.has(r))throw TypeError("Cannot "+n)};var e=(r,t,n)=>(H(r,t,"read from private field"),n?n.call(r):t.get(r)),o=(r,t,n)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,n)},s=(r,t,n,u)=>(H(r,t,"write to private field"),u?u.call(r,n):t.set(r,n),n);var d=(r,t,n)=>(H(r,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))u(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function u(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();var h,m,b,P,x,g,v,B,T,y,E,w,L,k,I,M,S,N,V,$;class q{constructor({trigger:t,onEnter:n,onLeaveBack:u,onLeave:i,onEnterBack:l,startViewPortPoint:a,startTriggerPoint:p,endViewPortPoint:c,endTriggerPoint:f}){o(this,I);o(this,S);o(this,V);o(this,h,null);o(this,m,void 0);o(this,b,void 0);o(this,P,void 0);o(this,x,void 0);o(this,g,null);o(this,v,null);o(this,B,0);o(this,T,0);o(this,y,void 0);o(this,E,void 0);o(this,w,!1);o(this,L,!1);o(this,k,!1);if(!t){console.warn("Trigger element is Null");return}s(this,h,t),s(this,m,n),s(this,b,u),s(this,P,i),s(this,x,l),a&&s(this,B,a),p&&s(this,T,p),s(this,y,c),s(this,E,f),d(this,V,$).call(this),window.addEventListener("resize",()=>{e(this,w)||(s(this,w,!0),this.disconnectObserve(),s(this,g,null),s(this,v,null),d(this,V,$).call(this),setTimeout(()=>{s(this,w,!1)},200))})}disconnectObserve(){var t,n;(t=e(this,g))==null||t.disconnect(),(n=e(this,v))==null||n.disconnect()}}h=new WeakMap,m=new WeakMap,b=new WeakMap,P=new WeakMap,x=new WeakMap,g=new WeakMap,v=new WeakMap,B=new WeakMap,T=new WeakMap,y=new WeakMap,E=new WeakMap,w=new WeakMap,L=new WeakMap,k=new WeakMap,I=new WeakSet,M=function(t){const n=window.innerHeight;return t===void 0?n:typeof t=="number"?n-t:t.unit==="px"?n-t.value:n*(100-t.value)/100},S=new WeakSet,N=function(t){if(!e(this,h))return;const n=e(this,h).clientHeight;return t===void 0?0:typeof t=="number"?t:t.unit==="px"?t.value:n*t.value/100},V=new WeakSet,$=function(){if(!e(this,h))return;const t=[0,1],n=c=>{var O,C;const f=((C=(O=c[0].rootBounds)==null?void 0:O.y)!=null?C:0)-c[0].boundingClientRect.y;c[0].isIntersecting&&f<0&&(e(this,L)||s(this,L,!0),e(this,m)&&e(this,m).call(this)),!c[0].isIntersecting&&f<0&&e(this,L)&&e(this,b)&&e(this,b).call(this)},u=c=>{var O,C;const f=((C=(O=c[0].rootBounds)==null?void 0:O.y)!=null?C:0)-c[0].boundingClientRect.y;c[0].isIntersecting&&f<0&&(e(this,k)||s(this,k,!0),e(this,P)&&e(this,P).call(this)),!c[0].isIntersecting&&f<0&&e(this,k)&&e(this,x)&&e(this,x).call(this)},i=d(this,I,M).call(this,e(this,B)),l=d(this,S,N).call(this,e(this,T));if(!l||(s(this,g,new IntersectionObserver(n,{rootMargin:`${l+i}px 0px ${-(l+i)}px`,threshold:t})),e(this,g).observe(e(this,h)),!e(this,y)&&!e(this,E)))return;const a=d(this,I,M).call(this,e(this,y)),p=d(this,S,N).call(this,e(this,E));!p||(s(this,v,new IntersectionObserver(u,{rootMargin:`${a+p}px 0px ${-(a+p)}px`,threshold:t})),e(this,v).observe(e(this,h)))};document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".trigger"),t=document.querySelector(".callbackText");!t||new q({trigger:r,onEnter:()=>{console.log("onEnter"),t.textContent="onEnter"},onLeaveBack:()=>{console.log("onLeaveBack"),t.textContent="onLeaveBack"},onLeave:()=>{console.log("onLeave"),t.textContent="onLeave"},onEnterBack:()=>{console.log("onEnterBack"),t.textContent="onEnterBack"},startViewPortPoint:{value:90,unit:"%"},startTriggerPoint:{value:200,unit:"px"},endViewPortPoint:{value:50,unit:"%"},endTriggerPoint:{value:100,unit:"%"}})});