import{u as U,f as te,g as ae,h as M,i as se,P as le,t as re,j as ue,k as b,l as k,m as Ee,w as Y,n as a,p as ie,R as T,q as oe,s as ne,v as ce,C as ve,x as Ae,y as Be,z as he,A as pe,B as ye,D as ge,E as de,F as $,G as j,H as me,I as D,J as Ce}from"./app-Dyrs4r39.js";const Fe=["/","/%E4%BA%91%E5%8E%9F%E7%94%9F/etcd.html","/%E4%BA%91%E5%8E%9F%E7%94%9F/k8s.html","/%E4%BA%91%E5%8E%9F%E7%94%9F/kong.html","/%E4%BA%91%E5%8E%9F%E7%94%9F/kubeflow.html","/%E4%BA%91%E5%8E%9F%E7%94%9F/operator.html","/%E4%BB%8B%E7%BB%8D/%E4%BB%8B%E7%BB%8D.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%B7%A5%E5%85%B7.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C.html","/%E5%B7%A5%E5%85%B7/Clash%E8%BD%ACV2ray.html","/%E6%9D%82%E8%B0%88/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%BA%E6%96%87/MPress.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%BA%E6%96%87/nnScaler.html","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%BA%E6%96%87/","/404.html","/%E4%BA%91%E5%8E%9F%E7%94%9F/","/%E4%BB%8B%E7%BB%8D/","/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/","/%E5%B7%A5%E5%85%B7/","/%E6%9D%82%E8%B0%88/","/category/","/category/etcd/","/category/k8s/","/category/kong/","/category/%E4%BA%91%E5%8E%9F%E7%94%9F/","/category/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D/","/category/aigc/","/category/%E5%88%86%E5%B8%83%E5%BC%8F/","/category/%E5%B7%A5%E5%85%B7/","/category/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF/","/category/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/","/category/%E7%BD%91%E7%BB%9C/","/category/%E4%BB%A3%E7%90%86/","/category/%E6%9D%82%E8%B0%88/","/category/mpress/","/category/nnscaler/","/tag/","/tag/%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81/","/tag/%E7%AC%94%E8%AE%B0/","/tag/kong/","/tag/nginx/","/tag/html/","/tag/kubeflow/","/tag/operator/","/tag/%E4%B8%AA%E4%BA%BA/","/tag/fastgpt/","/tag/chatgpt-on-web/","/tag/pytorch/","/tag/c10d/","/tag/skill/","/tag/%E6%8E%A8%E7%90%86%E5%BC%95%E6%93%8E/","/tag/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/","/tag/http/","/tag/clash/","/tag/v2ray/","/tag/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85/","/tag/mpress/","/tag/gpu/","/tag/nnscaler/","/article/","/star/","/timeline/"],fe="SEARCH_PRO_QUERY_HISTORY",y=U(fe,[]),ke=()=>{const{queryHistoryCount:s}=D,l=s>0;return{enabled:l,queryHistory:y,addQueryHistory:r=>{l&&(y.value=Array.from(new Set([r,...y.value.slice(0,s-1)])))},removeQueryHistory:r=>{y.value=[...y.value.slice(0,r),...y.value.slice(r+1)]}}},L=s=>Fe[s.id]+("anchor"in s?`#${s.anchor}`:""),De="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:_}=D,g=U(De,[]),He=()=>{const s=_>0;return{enabled:s,resultHistory:g,addResultHistory:l=>{if(s){const r={link:L(l),display:l.display};"header"in l&&(r.header=l.header),g.value=[r,...g.value.slice(0,_-1)]}},removeResultHistory:l=>{g.value=[...g.value.slice(0,l),...g.value.slice(l+1)]}}},Re=s=>{const l=ve(),r=M(),H=Ae(),E=b(0),C=k(()=>E.value>0),B=Be([]);return he(()=>{const{search:h,terminate:R}=pe(),d=me(n=>{const m=n.join(" "),{searchFilter:w=A=>A,splitWord:Q,suggestionsFilter:P,...p}=l.value;m?(E.value+=1,h(n.join(" "),r.value,p).then(A=>w(A,m,r.value,H.value)).then(A=>{E.value-=1,B.value=A}).catch(A=>{console.warn(A),E.value-=1,E.value||(B.value=[])})):B.value=[]},D.searchDelay-D.suggestDelay);Y([s,r],([n])=>d(n),{immediate:!0}),ye(()=>{R()})}),{isSearching:C,results:B}};var Qe=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:l}){const r=ae(),H=M(),E=se(le),{enabled:C,addQueryHistory:B,queryHistory:h,removeQueryHistory:R}=ke(),{enabled:d,resultHistory:n,addResultHistory:m,removeResultHistory:w}=He(),Q=C||d,P=re(s,"queries"),{results:p,isSearching:A}=Re(P),u=ue({isQuery:!0,index:0}),c=b(0),v=b(0),I=k(()=>Q&&(h.value.length>0||n.value.length>0)),x=k(()=>p.value.length>0),q=k(()=>p.value[c.value]||null),V=()=>{const{isQuery:e,index:t}=u;t===0?(u.isQuery=!e,u.index=e?n.value.length-1:h.value.length-1):u.index=t-1},z=()=>{const{isQuery:e,index:t}=u;t===(e?h.value.length-1:n.value.length-1)?(u.isQuery=!e,u.index=0):u.index=t+1},G=()=>{c.value=c.value>0?c.value-1:p.value.length-1,v.value=q.value.contents.length-1},J=()=>{c.value=c.value<p.value.length-1?c.value+1:0,v.value=0},K=()=>{v.value<q.value.contents.length-1?v.value+=1:J()},N=()=>{v.value>0?v.value-=1:G()},S=e=>e.map(t=>Ce(t)?t:a(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=ge[e.index]||"$content",[i,f=""]=de(t)?t[H.value].split("$content"):t.split("$content");return e.display.map(o=>a("div",S([i,...o,f])))}return e.display.map(t=>a("div",S(t)))},F=()=>{c.value=0,v.value=0,l("updateQuery",""),l("close")},X=()=>C?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},E.value.queryHistory),h.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===t}],onClick:()=>{l("updateQuery",e)}},[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:i=>{i.preventDefault(),i.stopPropagation(),R(t)}})]))])):null,Z=()=>d?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},E.value.resultHistory),n.value.map((e,t)=>a(T,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===t}],onClick:()=>{F()}},()=>[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(i=>S(i)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:i=>{i.preventDefault(),i.stopPropagation(),w(t)}})]))])):null;return Ee("keydown",e=>{if(s.isFocusing){if(x.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")K();else if(e.key==="Enter"){const t=q.value.contents[v.value];B(s.queries.join(" ")),m(t),r.push(L(t)),F()}}else if(d){if(e.key==="ArrowUp")V();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:t}=u;u.isQuery?(l("updateQuery",h.value[t]),e.preventDefault()):(r.push(n.value[t].link),F())}}}}),Y([c,v],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!x.value:!I.value}],id:"search-pro-results"},s.queries.length?A.value?a(ie,{hint:E.value.searching}):x.value?a("ul",{class:"search-pro-result-list"},p.value.map(({title:e,contents:t},i)=>{const f=c.value===i;return a("li",{class:["search-pro-result-list-item",{active:f}]},[a("div",{class:"search-pro-result-title"},e||E.value.defaultTitle),t.map((o,ee)=>{const O=f&&v.value===ee;return a(T,{to:L(o),class:["search-pro-result-item",{active:O,"aria-selected":O}],onClick:()=>{B(s.queries.join(" ")),m(o),F()}},()=>[o.type==="text"?null:a(o.type==="title"?oe:o.type==="heading"?ne:ce,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[o.type==="text"&&o.header?a("div",{class:"content-header"},o.header):null,a("div",W(o))])])})])})):E.value.emptyResult:Q?I.value?[X(),Z()]:E.value.emptyHistory:E.value.emptyResult)}});export{Qe as default};