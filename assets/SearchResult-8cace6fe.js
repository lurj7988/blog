import{u as G,f as J,n as K,p as E,q as M,v as O,t as V,g as w,h as k,x as W,y as P,l as t,R as A,z as N,A as T,B as X,C as Y,D as Z,E as _,s as ee,F as te,L as se,H as ae,G as le,I as ue,J as q,K as re}from"./app-5c4f6e48.js";const ne="search-pro-result-history",o=G(ne,[]),oe=()=>{const{resultHistoryCount:u}=q,c=u>0;return{enabled:c,resultHistory:o,addResultHistory:l=>{c&&(o.value.length<u?o.value=[l,...o.value]:o.value=[l,...o.value.slice(0,u-1)])},removeResultHistory:l=>{o.value=[...o.value.slice(0,l),...o.value.slice(l+1)]}}},ce=u=>{const c=E(),l=w(!1),h=ee([]);let i;const v=ue(y=>{l.value=!0,i==null||i.terminate(),y?(i=new Worker(`/blog/${q.worker}`,{}),i.addEventListener("message",({data:g})=>{h.value=g,l.value=!1}),i.postMessage({query:y,routeLocale:c.value})):(h.value=[],l.value=!1)},q.delay);return P([u,c],()=>v(u.value),{immediate:!0}),{searching:l,results:h}};var ve=J({name:"SearchResult",props:{query:{type:String,required:!0}},emits:["close","updateQuery"],setup(u,{emit:c}){const l=te(),h=K(),i=E(),v=M(O),{addQueryHistory:y}=se(),{enabled:g,resultHistory:L,addResultHistory:b,removeResultHistory:Q}=oe(),f=V(u,"query"),{results:d,searching:j}=ce(f),r=w(0),a=w(0),C=k(()=>L.value.length>0),R=k(()=>d.value.length>0),$=k(()=>d.value[r.value]||null),F=()=>{r.value=r.value>0?r.value-1:d.value.length-1,a.value=$.value.contents.length-1},I=()=>{r.value=r.value<d.value.length-1?r.value+1:0,a.value=0},U=()=>{a.value<$.value.contents.length-1?a.value=a.value+1:I()},z=()=>{a.value>0?a.value=a.value-1:F()},D=e=>e.map(s=>re(s)?s:t(s[0],s[1])),S=e=>{if(e.type==="custom"){const s=ae[e.index]||"$content",[p,m=""]=le(s)?s[i.value].split("$content"):s.split("$content");return D([p,...e.display,m])}return D(e.display)},H=()=>{r.value=0,a.value=0,c("updateQuery",""),c("close")};return W("keydown",e=>{if(R.value){if(e.key==="ArrowUp")z();else if(e.key==="ArrowDown")U();else if(e.key==="Enter"){const s=$.value.contents[a.value];l.value.path!==s.path&&(y(u.query),b(s),h.push(s.path),H())}}}),P([r,a],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["search-pro-result",{empty:f.value?!R.value:!C.value}],id:"search-pro-results"},f.value===""?C.value?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},v.value.history),L.value.map((e,s)=>t(A,{to:e.path,class:["search-pro-result-item",{active:a.value===s}],onClick:()=>{H()}},()=>[t(N,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[e.type==="content"&&e.header?t("div",{class:"content-header"},e.header):null,t("div",S(e))]),t("button",{class:"search-pro-close-icon",onClick:p=>{p.preventDefault(),p.stopPropagation(),Q(s)}},t(T))]))])):g?v.value.emptyHistory:v.value.emptyResult:j.value?t(X,{hint:v.value.searching}):R.value?t("ul",{class:"search-pro-result-list"},d.value.map(({title:e,contents:s},p)=>{const m=r.value===p;return t("li",{class:["search-pro-result-list-item",{active:m}]},[t("div",{class:"search-pro-result-title"},e||"Documentation"),s.map((n,B)=>{const x=m&&a.value===B;return t(A,{to:n.path,class:["search-pro-result-item",{active:x,"aria-selected":x}],onClick:()=>{y(u.query),b(n),H()}},()=>[n.type==="content"?null:t(n.type==="title"?Y:n.type==="heading"?Z:_,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[n.type==="content"&&n.header?t("div",{class:"content-header"},n.header):null,t("div",S(n))])])})])})):v.value.emptyResult)}});export{ve as default};