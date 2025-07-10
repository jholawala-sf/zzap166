var Ms=Object.defineProperty,As=Object.defineProperties;var Fs=Object.getOwnPropertyDescriptors;var $n=Object.getOwnPropertySymbols;var jr=Object.prototype.hasOwnProperty,Wr=Object.prototype.propertyIsEnumerable;var Un=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),Ts=e=>{throw TypeError(e)};var Vn=(e,t,n)=>t in e?Ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,te=(e,t)=>{for(var n in t||(t={}))jr.call(t,n)&&Vn(e,n,t[n]);if($n)for(var n of $n(t))Wr.call(t,n)&&Vn(e,n,t[n]);return e},be=(e,t)=>As(e,Fs(t));var en=(e,t)=>{var n={};for(var r in e)jr.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&$n)for(var r of $n(e))t.indexOf(r)<0&&Wr.call(e,r)&&(n[r]=e[r]);return n};var ze=(e,t,n)=>Vn(e,typeof t!="symbol"?t+"":t,n);var Re=(e,t,n)=>new Promise((r,o)=>{var l=i=>{try{a(n.next(i))}catch(c){o(c)}},s=i=>{try{a(n.throw(i))}catch(c){o(c)}},a=i=>i.done?r(i.value):Promise.resolve(i.value).then(l,s);a((n=n.apply(e,t)).next())}),Is=function(e,t){this[0]=e,this[1]=t};var Qr=e=>{var t=e[Un("asyncIterator")],n=!1,r,o={};return t==null?(t=e[Un("iterator")](),r=l=>o[l]=s=>t[l](s)):(t=t.call(e),r=l=>o[l]=s=>{if(n){if(n=!1,l==="throw")throw s;return s}return n=!0,{done:!1,value:new Is(new Promise(a=>{var i=t[l](s);i instanceof Object||Ts("Object expected"),a(i)}),1)}}),o[Un("iterator")]=()=>o,r("next"),"throw"in t?r("throw"):o.throw=l=>{throw l},"return"in t&&r("return"),o};import{b as Se,d as B,o as Pt,e as V,c as M,a as v,P as jo,S as U,t as _,i as k,f as H,h as I,s as Xn,m as Zn,j as gt,k as T,l as Ps,n as cr,u as ke,p as j,q as Ls,r as fn,v as Ge,w as Os,x as Rt,y as Nt,z as _s,A as qs,B as En,F as zs,C as Yr,D as Ut,$ as Wo,E as Rs,G as Ks,H as W,I as Xr,J as Bs,K as Ns,L as dr,M as Us,N as Vs,O as Gn,Q as Gs,R as Hs,T as ie,U as js,V as Ws}from"./production.js";var Qs=e=>e!=null,Ys=e=>e.filter(Qs);function Xs(e){return(...t)=>{for(const n of e)n&&n(...t)}}var D=e=>typeof e=="function"&&!e.length?e():e,Jn=e=>Array.isArray(e)?e:e?[e]:[];function Zs(e,...t){return typeof e=="function"?e(...t):e}var Js=j;function el(e,t,n,r){const o=e.length,l=t.length;let s=0;if(!l){for(;s<o;s++)n(e[s]);return}if(!o){for(;s<l;s++)r(t[s]);return}for(;s<l&&t[s]===e[s];s++);let a,i;t=t.slice(s),e=e.slice(s);for(a of t)e.includes(a)||r(a);for(i of e)t.includes(i)||n(i)}function tl(e){const[t,n]=B(),r=e!=null&&e.throw?(u,f)=>{throw n(u instanceof Error?u:new Error(f)),u}:(u,f)=>{n(u instanceof Error?u:new Error(f))},o=e!=null&&e.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),l=e!=null&&e.prefix?`${e.prefix}.`:"",s=new Map,a=new Proxy({},{get(u,f){let h=s.get(f);h||(h=B(void 0,{equals:!1}),s.set(f,h)),h[0]();const y=o.reduce((m,b)=>{if(m!==null||!b)return m;try{return b.getItem(`${l}${f}`)}catch(p){return r(p,`Error reading ${l}${f} from ${b.name}`),null}},null);return y!==null&&(e!=null&&e.deserializer)?e.deserializer(y,f,e.options):y}}),i=(u,f,h)=>{const y=e!=null&&e.serializer?e.serializer(f,u,h!=null?h:e.options):f,m=`${l}${u}`;o.forEach(p=>{try{p.getItem(m)!==y&&p.setItem(m,y)}catch(w){r(w,`Error setting ${l}${u} to ${y} in ${p.name}`)}});const b=s.get(u);b&&b[1]()},c=u=>o.forEach(f=>{try{f.removeItem(`${l}${u}`)}catch(h){r(h,`Error removing ${l}${u} from ${f.name}`)}}),g=()=>o.forEach(u=>{try{u.clear()}catch(f){r(f,`Error clearing ${u.name}`)}}),d=()=>{const u={},f=(h,y)=>{if(!u.hasOwnProperty(h)){const m=y&&(e!=null&&e.deserializer)?e.deserializer(y,h,e.options):y;m&&(u[h]=m)}};return o.forEach(h=>{if(typeof h.getAll=="function"){let y;try{y=h.getAll()}catch(m){r(m,`Error getting all values from in ${h.name}`)}for(const m of y)f(m,y[m])}else{let y=0,m;try{for(;m=h.key(y++);)u.hasOwnProperty(m)||f(m,h.getItem(m))}catch(b){r(b,`Error getting all values from ${h.name}`)}}}),u};return(e==null?void 0:e.sync)!==!1&&Pt(()=>{const u=f=>{var y;let h=!1;o.forEach(m=>{try{m!==f.storageArea&&f.key&&f.newValue!==m.getItem(f.key)&&(f.newValue?m.setItem(f.key,f.newValue):m.removeItem(f.key),h=!0)}catch(b){r(b,`Error synching api ${m.name} from storage event (${f.key}=${f.newValue})`)}}),h&&f.key&&((y=s.get(f.key))==null||y[1]())};"addEventListener"in globalThis?(globalThis.addEventListener("storage",u),j(()=>globalThis.removeEventListener("storage",u))):(o.forEach(f=>{var h;return(h=f.addEventListener)==null?void 0:h.call(f,"storage",u)}),j(()=>o.forEach(f=>{var h;return(h=f.removeEventListener)==null?void 0:h.call(f,"storage",u)})))}),[a,i,{clear:g,error:t,remove:c,toJSON:d}]}var mf=tl,nl=e=>(typeof e.clear=="function"||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),Zr=e=>{if(!e)return"";let t="";for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r=="boolean"?`; ${n}`:`; ${n}=${r}`}return t},Ke=nl({_cookies:[globalThis.document,"cookie"],getItem:e=>{var t,n;return(n=(t=Ke._cookies[0][Ke._cookies[1]].match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))==null?void 0:t.pop())!=null?n:null},setItem:(e,t,n)=>{const r=Ke.getItem(e);Ke._cookies[0][Ke._cookies[1]]=`${e}=${t}${Zr(n)}`;const o=Object.assign(new Event("storage"),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:Ke});window.dispatchEvent(o)},removeItem:e=>{Ke._cookies[0][Ke._cookies[1]]=`${e}=deleted${Zr({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return Ke._cookies[0][Ke._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,o)=>(!t&&o&&n++===e&&(t=o),"")),t},get length(){let e=0;return Ke._cookies[0][Ke._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=t?1:0,"")),e}}),rl=1024,Ft=796,fr=700,ol="bottom-right",er="bottom",bf="system",il=!1,Qo=500,sl=500,Yo=500,ll=Object.keys(Xn)[0],Jr=1,al=Object.keys(Zn)[0],ul=Se({client:void 0,onlineManager:void 0,queryFlavor:"",version:"",shadowDOMTarget:void 0});function N(){return ke(ul)}var Xo=Se(void 0),vf=e=>{const[t,n]=B(null),r=()=>{const s=t();s!=null&&(s.close(),n(null))},o=(s,a)=>{if(t()!=null)return;const i=window.open("","TSQD-Devtools-Panel",`width=${s},height=${a},popup`);if(!i)throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");i.document.head.innerHTML="",i.document.body.innerHTML="",Ps(i.document),i.document.title="TanStack Query Devtools",i.document.body.style.margin="0",i.addEventListener("pagehide",()=>{e.setLocalStore("pip_open","false"),n(null)}),[...(N().shadowDOMTarget||document).styleSheets].forEach(c=>{try{const g=[...c.cssRules].map(h=>h.cssText).join(""),d=document.createElement("style"),u=c.ownerNode;let f="";u&&"id"in u&&(f=u.id),f&&d.setAttribute("id",f),d.textContent=g,i.document.head.appendChild(d)}catch(g){const d=document.createElement("link");if(c.href==null)return;d.rel="stylesheet",d.type=c.type,d.media=c.media.toString(),d.href=c.href,i.document.head.appendChild(d)}}),cr(["focusin","focusout","pointermove","keydown","pointerdown","pointerup","click","mousedown","input"],i.document),e.setLocalStore("pip_open","true"),n(i)};V(()=>{var a;((a=e.localStore.pip_open)!=null?a:"false")==="true"&&!e.disabled&&o(Number(window.innerWidth),Number(e.localStore.height||sl))}),V(()=>{const s=(N().shadowDOMTarget||document).querySelector("#_goober"),a=t();if(s&&a){const i=new MutationObserver(()=>{const c=(N().shadowDOMTarget||a.document).querySelector("#_goober");c&&(c.textContent=s.textContent)});i.observe(s,{childList:!0,subtree:!0,characterDataOldValue:!0}),j(()=>{i.disconnect()})}});const l=M(()=>{var s;return{pipWindow:t(),requestPipWindow:o,closePipWindow:r,disabled:(s=e.disabled)!=null?s:!1}});return v(Xo.Provider,{value:l,get children(){return e.children}})},gr=()=>M(()=>{const t=ke(Xo);if(!t)throw new Error("usePiPWindow must be used within a PiPProvider");return t()}),cl=Se(()=>"dark");function $e(){return ke(cl)}var Zo={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",Ấ:"A",Ắ:"A",Ẳ:"A",Ẵ:"A",Ặ:"A",Æ:"AE",Ầ:"A",Ằ:"A",Ȃ:"A",Ç:"C",Ḉ:"C",È:"E",É:"E",Ê:"E",Ë:"E",Ế:"E",Ḗ:"E",Ề:"E",Ḕ:"E",Ḝ:"E",Ȇ:"E",Ì:"I",Í:"I",Î:"I",Ï:"I",Ḯ:"I",Ȋ:"I",Ð:"D",Ñ:"N",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",Ố:"O",Ṍ:"O",Ṓ:"O",Ȏ:"O",Ù:"U",Ú:"U",Û:"U",Ü:"U",Ý:"Y",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",ấ:"a",ắ:"a",ẳ:"a",ẵ:"a",ặ:"a",æ:"ae",ầ:"a",ằ:"a",ȃ:"a",ç:"c",ḉ:"c",è:"e",é:"e",ê:"e",ë:"e",ế:"e",ḗ:"e",ề:"e",ḕ:"e",ḝ:"e",ȇ:"e",ì:"i",í:"i",î:"i",ï:"i",ḯ:"i",ȋ:"i",ð:"d",ñ:"n",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",ố:"o",ṍ:"o",ṓ:"o",ȏ:"o",ù:"u",ú:"u",û:"u",ü:"u",ý:"y",ÿ:"y",Ā:"A",ā:"a",Ă:"A",ă:"a",Ą:"A",ą:"a",Ć:"C",ć:"c",Ĉ:"C",ĉ:"c",Ċ:"C",ċ:"c",Č:"C",č:"c",C̆:"C",c̆:"c",Ď:"D",ď:"d",Đ:"D",đ:"d",Ē:"E",ē:"e",Ĕ:"E",ĕ:"e",Ė:"E",ė:"e",Ę:"E",ę:"e",Ě:"E",ě:"e",Ĝ:"G",Ǵ:"G",ĝ:"g",ǵ:"g",Ğ:"G",ğ:"g",Ġ:"G",ġ:"g",Ģ:"G",ģ:"g",Ĥ:"H",ĥ:"h",Ħ:"H",ħ:"h",Ḫ:"H",ḫ:"h",Ĩ:"I",ĩ:"i",Ī:"I",ī:"i",Ĭ:"I",ĭ:"i",Į:"I",į:"i",İ:"I",ı:"i",Ĳ:"IJ",ĳ:"ij",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",Ḱ:"K",ḱ:"k",K̆:"K",k̆:"k",Ĺ:"L",ĺ:"l",Ļ:"L",ļ:"l",Ľ:"L",ľ:"l",Ŀ:"L",ŀ:"l",Ł:"l",ł:"l",Ḿ:"M",ḿ:"m",M̆:"M",m̆:"m",Ń:"N",ń:"n",Ņ:"N",ņ:"n",Ň:"N",ň:"n",ŉ:"n",N̆:"N",n̆:"n",Ō:"O",ō:"o",Ŏ:"O",ŏ:"o",Ő:"O",ő:"o",Œ:"OE",œ:"oe",P̆:"P",p̆:"p",Ŕ:"R",ŕ:"r",Ŗ:"R",ŗ:"r",Ř:"R",ř:"r",R̆:"R",r̆:"r",Ȓ:"R",ȓ:"r",Ś:"S",ś:"s",Ŝ:"S",ŝ:"s",Ş:"S",Ș:"S",ș:"s",ş:"s",Š:"S",š:"s",Ţ:"T",ţ:"t",ț:"t",Ț:"T",Ť:"T",ť:"t",Ŧ:"T",ŧ:"t",T̆:"T",t̆:"t",Ũ:"U",ũ:"u",Ū:"U",ū:"u",Ŭ:"U",ŭ:"u",Ů:"U",ů:"u",Ű:"U",ű:"u",Ų:"U",ų:"u",Ȗ:"U",ȗ:"u",V̆:"V",v̆:"v",Ŵ:"W",ŵ:"w",Ẃ:"W",ẃ:"w",X̆:"X",x̆:"x",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Y̆:"Y",y̆:"y",Ź:"Z",ź:"z",Ż:"Z",ż:"z",Ž:"Z",ž:"z",ſ:"s",ƒ:"f",Ơ:"O",ơ:"o",Ư:"U",ư:"u",Ǎ:"A",ǎ:"a",Ǐ:"I",ǐ:"i",Ǒ:"O",ǒ:"o",Ǔ:"U",ǔ:"u",Ǖ:"U",ǖ:"u",Ǘ:"U",ǘ:"u",Ǚ:"U",ǚ:"u",Ǜ:"U",ǜ:"u",Ứ:"U",ứ:"u",Ṹ:"U",ṹ:"u",Ǻ:"A",ǻ:"a",Ǽ:"AE",ǽ:"ae",Ǿ:"O",ǿ:"o",Þ:"TH",þ:"th",Ṕ:"P",ṕ:"p",Ṥ:"S",ṥ:"s",X́:"X",x́:"x",Ѓ:"Г",ѓ:"г",Ќ:"К",ќ:"к",A̋:"A",a̋:"a",E̋:"E",e̋:"e",I̋:"I",i̋:"i",Ǹ:"N",ǹ:"n",Ồ:"O",ồ:"o",Ṑ:"O",ṑ:"o",Ừ:"U",ừ:"u",Ẁ:"W",ẁ:"w",Ỳ:"Y",ỳ:"y",Ȁ:"A",ȁ:"a",Ȅ:"E",ȅ:"e",Ȉ:"I",ȉ:"i",Ȍ:"O",ȍ:"o",Ȑ:"R",ȑ:"r",Ȕ:"U",ȕ:"u",B̌:"B",b̌:"b",Č̣:"C",č̣:"c",Ê̌:"E",ê̌:"e",F̌:"F",f̌:"f",Ǧ:"G",ǧ:"g",Ȟ:"H",ȟ:"h",J̌:"J",ǰ:"j",Ǩ:"K",ǩ:"k",M̌:"M",m̌:"m",P̌:"P",p̌:"p",Q̌:"Q",q̌:"q",Ř̩:"R",ř̩:"r",Ṧ:"S",ṧ:"s",V̌:"V",v̌:"v",W̌:"W",w̌:"w",X̌:"X",x̌:"x",Y̌:"Y",y̌:"y",A̧:"A",a̧:"a",B̧:"B",b̧:"b",Ḑ:"D",ḑ:"d",Ȩ:"E",ȩ:"e",Ɛ̧:"E",ɛ̧:"e",Ḩ:"H",ḩ:"h",I̧:"I",i̧:"i",Ɨ̧:"I",ɨ̧:"i",M̧:"M",m̧:"m",O̧:"O",o̧:"o",Q̧:"Q",q̧:"q",U̧:"U",u̧:"u",X̧:"X",x̧:"x",Z̧:"Z",z̧:"z"},dl=Object.keys(Zo).join("|"),fl=new RegExp(dl,"g");function gl(e){return e.replace(fl,t=>Zo[t])}var Ie={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function eo(e,t,n){var r;if(n=n||{},n.threshold=(r=n.threshold)!=null?r:Ie.MATCHES,!n.accessors){const s=to(e,t,n);return{rankedValue:e,rank:s,accessorIndex:-1,accessorThreshold:n.threshold,passed:s>=n.threshold}}const o=bl(e,n.accessors),l={rankedValue:e,rank:Ie.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let s=0;s<o.length;s++){const a=o[s];let i=to(a.itemValue,t,n);const{minRanking:c,maxRanking:g,threshold:d=n.threshold}=a.attributes;i<c&&i>=Ie.MATCHES?i=c:i>g&&(i=g),i=Math.min(i,g),i>=d&&i>l.rank&&(l.rank=i,l.passed=!0,l.accessorIndex=s,l.accessorThreshold=d,l.rankedValue=a.itemValue)}return l}function to(e,t,n){return e=no(e,n),t=no(t,n),t.length>e.length?Ie.NO_MATCH:e===t?Ie.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?Ie.EQUAL:e.startsWith(t)?Ie.STARTS_WITH:e.includes(` ${t}`)?Ie.WORD_STARTS_WITH:e.includes(t)?Ie.CONTAINS:t.length===1?Ie.NO_MATCH:hl(e).includes(t)?Ie.ACRONYM:yl(e,t))}function hl(e){let t="";return e.split(" ").forEach(r=>{r.split("-").forEach(l=>{t+=l.substr(0,1)})}),t}function yl(e,t){let n=0,r=0;function o(i,c,g){for(let d=g,u=c.length;d<u;d++)if(c[d]===i)return n+=1,d+1;return-1}function l(i){const c=1/i,g=n/t.length;return Ie.MATCHES+g*c}const s=o(t[0],e,0);if(s<0)return Ie.NO_MATCH;r=s;for(let i=1,c=t.length;i<c;i++){const g=t[i];if(r=o(g,e,r),!(r>-1))return Ie.NO_MATCH}const a=r-s;return l(a)}function no(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=gl(e)),e}function ml(e,t){let n=t;typeof t=="object"&&(n=t.accessor);const r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function bl(e,t){const n=[];for(let r=0,o=t.length;r<o;r++){const l=t[r],s=vl(l),a=ml(e,l);for(let i=0,c=a.length;i<c;i++)n.push({itemValue:a[i],attributes:s})}return n}var ro={maxRanking:1/0,minRanking:-1/0};function vl(e){return typeof e=="function"?ro:te(te({},ro),e)}var pl={data:""},wl=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||pl,xl=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,$l=/\/\*[^]*?\*\/|  +/g,oo=/\n+/g,At=(e,t)=>{let n="",r="",o="";for(let l in e){let s=e[l];l[0]=="@"?l[1]=="i"?n=l+" "+s+";":r+=l[1]=="f"?At(s,l):l+"{"+At(s,l[1]=="k"?"":t)+"}":typeof s=="object"?r+=At(s,t?t.replace(/([^,])+/g,a=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,a):a?a+" "+i:i)):l):s!=null&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=At.p?At.p(l,s):l+":"+s+";")}return n+(t&&o?t+"{"+o+"}":o)+r},ct={},Jo=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Jo(e[n]);return t}return e},Cl=(e,t,n,r,o)=>{let l=Jo(e),s=ct[l]||(ct[l]=(i=>{let c=0,g=11;for(;c<i.length;)g=101*g+i.charCodeAt(c++)>>>0;return"go"+g})(l));if(!ct[s]){let i=l!==e?e:(c=>{let g,d,u=[{}];for(;g=xl.exec(c.replace($l,""));)g[4]?u.shift():g[3]?(d=g[3].replace(oo," ").trim(),u.unshift(u[0][d]=u[0][d]||{})):u[0][g[1]]=g[2].replace(oo," ").trim();return u[0]})(e);ct[s]=At(o?{["@keyframes "+s]:i}:i,n?"":"."+s)}let a=n&&ct.g?ct.g:null;return n&&(ct.g=ct[s]),((i,c,g,d)=>{d?c.data=c.data.replace(d,i):c.data.indexOf(i)===-1&&(c.data=g?i+c.data:c.data+i)})(ct[s],t,r,a),s},Sl=(e,t,n)=>e.reduce((r,o,l)=>{let s=t[l];if(s&&s.call){let a=s(n),i=a&&a.props&&a.props.className||/^go/.test(a)&&a;s=i?"."+i:a&&typeof a=="object"?a.props?"":At(a,""):a===!1?"":a}return r+o+(s==null?"":s)},"");function Q(e){let t=this||{},n=e.call?e(t.p):e;return Cl(n.unshift?n.raw?Sl(n,[].slice.call(arguments,1),t.p):n.reduce((r,o)=>Object.assign(r,o&&o.call?o(t.p):o),{}):n,wl(t.target),t.g,t.o,t.k)}Q.bind({g:1});Q.bind({k:1});function ei(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=ei(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function L(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=ei(e))&&(r&&(r+=" "),r+=t);return r}function kl(e,t){const n=Ut(e),{onChange:r}=t;let o=new Set(t.appear?void 0:n);const l=new WeakSet,[s,a]=B([],{equals:!1}),[i]=Rs(),c=d=>{a(u=>(u.push.apply(u,d),u));for(const u of d)l.delete(u)},g=(d,u,f)=>d.splice(f,0,u);return M(d=>{const u=s(),f=e();if(f[Wo],Ut(i))return i(),d;if(u.length){const h=d.filter(y=>!u.includes(y));return u.length=0,r({list:h,added:[],removed:[],unchanged:h,finishRemoved:c}),h}return Ut(()=>{const h=new Set(f),y=f.slice(),m=[],b=[],p=[];for(const x of f)(o.has(x)?p:m).push(x);let w=!m.length;for(let x=0;x<d.length;x++){const $=d[x];h.has($)||(l.has($)||(b.push($),l.add($)),g(y,$,x)),w&&$!==y[x]&&(w=!1)}return!b.length&&w?d:(r({list:y,added:m,removed:b,unchanged:p,finishRemoved:c}),o=h,y)})},t.appear?[]:n.slice())}function Te(...e){return Xs(e)}var io=e=>e instanceof Element;function tr(e,t){if(t(e))return e;if(typeof e=="function"&&!e.length)return tr(e(),t);if(Array.isArray(e)){const n=[];for(const r of e){const o=tr(r,t);o&&(Array.isArray(o)?n.push.apply(n,o):n.push(o))}return n.length?n:null}return null}function El(e,t=io,n=io){const r=M(e),o=M(()=>tr(r(),t));return o.toArray=()=>{const l=o();return Array.isArray(l)?l:l?[l]:[]},o}function Dl(e){return M(()=>{const t=e.name||"s";return{enterActive:(e.enterActiveClass||t+"-enter-active").split(" "),enter:(e.enterClass||t+"-enter").split(" "),enterTo:(e.enterToClass||t+"-enter-to").split(" "),exitActive:(e.exitActiveClass||t+"-exit-active").split(" "),exit:(e.exitClass||t+"-exit").split(" "),exitTo:(e.exitToClass||t+"-exit-to").split(" "),move:(e.moveClass||t+"-move").split(" ")}})}function ti(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function Ml(e,t,n,r){const{onBeforeEnter:o,onEnter:l,onAfterEnter:s}=t;o==null||o(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r==null?void 0:r();l==null||l(n,()=>a())}),ti(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!l||l.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))});function a(i){(!i||i.target===n)&&(n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),s==null||s(n))}}function Al(e,t,n,r){const{onBeforeExit:o,onExit:l,onAfterExit:s}=t;if(!n.parentNode)return r==null?void 0:r();o==null||o(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),l==null||l(n,()=>a()),ti(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!l||l.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))});function a(i){(!i||i.target===n)&&(r==null||r(),n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),s==null||s(n))}}var so=e=>{const t=Dl(e);return kl(El(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:o,list:l}){const s=t();for(const i of n)Ml(s,e,i);const a=[];for(const i of l)i.isConnected&&(i instanceof HTMLElement||i instanceof SVGElement)&&a.push({el:i,rect:i.getBoundingClientRect()});queueMicrotask(()=>{const i=[];for(const{el:c,rect:g}of a)if(c.isConnected){const d=c.getBoundingClientRect(),u=g.left-d.left,f=g.top-d.top;(u||f)&&(c.style.transform=`translate(${u}px, ${f}px)`,c.style.transitionDuration="0s",i.push(c))}document.body.offsetHeight;for(const c of i){let g=function(d){(d.target===c||/transform$/.test(d.propertyName))&&(c.removeEventListener("transitionend",g),c.classList.remove(...s.move))};c.classList.add(...s.move),c.style.transform=c.style.transitionDuration="",c.addEventListener("transitionend",g)}});for(const i of r)Al(s,e,i,()=>o([i]))}})},Hn=Symbol("fallback");function lo(e){for(const t of e)t.dispose()}function Fl(e,t,n,r={}){const o=new Map;return j(()=>lo(o.values())),()=>{const s=e()||[];return s[Wo],Ut(()=>{var g,d;if(!s.length)return lo(o.values()),o.clear(),r.fallback?[Xr(f=>(o.set(Hn,{dispose:f}),r.fallback()))]:[];const a=new Array(s.length),i=o.get(Hn);if(!o.size||i){i==null||i.dispose(),o.delete(Hn);for(let u=0;u<s.length;u++){const f=s[u],h=t(f,u);l(a,f,u,h)}return a}const c=new Set(o.keys());for(let u=0;u<s.length;u++){const f=s[u],h=t(f,u);c.delete(h);const y=o.get(h);y?(a[u]=y.mapped,(g=y.setIndex)==null||g.call(y,u),y.setItem(()=>f)):l(a,f,u,h)}for(const u of c)(d=o.get(u))==null||d.dispose(),o.delete(u);return a})};function l(s,a,i,c){Xr(g=>{const[d,u]=B(a),f={setItem:u,dispose:g};if(n.length>1){const[h,y]=B(i);f.setIndex=y,f.mapped=n(d,h)}else f.mapped=n(d);o.set(c,f),s[i]=f.mapped})}}function Dn(e){const{by:t}=e;return M(Fl(()=>e.each,typeof t=="function"?t:n=>n[t],e.children,"fallback"in e?{fallback:()=>e.fallback}:void 0))}function Tl(e,t,n,r){return e.addEventListener(t,n,r),Js(e.removeEventListener.bind(e,t,n,r))}function Il(e,t,n,r){const o=()=>{Jn(D(e)).forEach(l=>{l&&Jn(D(t)).forEach(s=>Tl(l,s,n,r))})};typeof e=="function"?V(o):H(o)}function Pl(e,t){const n=new ResizeObserver(e);return j(n.disconnect.bind(n)),{observe:r=>n.observe(r,t),unobserve:n.unobserve.bind(n)}}function ni(e,t,n){const r=new WeakMap,{observe:o,unobserve:l}=Pl(s=>{for(const a of s){const{contentRect:i,target:c}=a,g=Math.round(i.width),d=Math.round(i.height),u=r.get(c);(!u||u.width!==g||u.height!==d)&&(t(i,c,a),r.set(c,{width:g,height:d}))}},n);V(s=>{const a=Ys(Jn(D(e)));return el(a,s,o,l),a},[])}var Ll=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function ao(e){const t={};let n;for(;n=Ll.exec(e);)t[n[1]]=n[2];return t}function Ln(e,t){if(typeof e=="string"){if(typeof t=="string")return`${e};${t}`;e=ao(e)}else typeof t=="string"&&(t=ao(t));return te(te({},e),t)}function Ol(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function nr(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function _l(e){return typeof e=="number"}function Kt(e){return Object.prototype.toString.call(e)==="[object String]"}function ql(e){return typeof e=="function"}function gn(e){return t=>`${e()}-${t}`}function Ue(e,t){return e?e===t||e.contains(t):!1}function on(e,t=!1){const{activeElement:n}=tt(e);if(!(n!=null&&n.nodeName))return null;if(ri(n)&&n.contentDocument)return on(n.contentDocument.body,t);if(t){const r=n.getAttribute("aria-activedescendant");if(r){const o=tt(n).getElementById(r);if(o)return o}}return n}function zl(e){return tt(e).defaultView||window}function tt(e){return e?e.ownerDocument||e:document}function ri(e){return e.tagName==="IFRAME"}var hr=(e=>(e.Escape="Escape",e.Enter="Enter",e.Tab="Tab",e.Space=" ",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e))(hr||{});function yr(e){var t;return typeof window!="undefined"&&window.navigator!=null?e.test(((t=window.navigator.userAgentData)==null?void 0:t.platform)||window.navigator.platform):!1}function On(){return yr(/^Mac/i)}function Rl(){return yr(/^iPhone/i)}function Kl(){return yr(/^iPad/i)||On()&&navigator.maxTouchPoints>1}function Bl(){return Rl()||Kl()}function Nl(){return On()||Bl()}function de(e,t){return t&&(ql(t)?t(e):t[0](t[1],e)),e==null?void 0:e.defaultPrevented}function xe(e){return t=>{for(const n of e)de(t,n)}}function Ul(e){return On()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Ae(e){if(e)if(Vl())e.focus({preventScroll:!0});else{const t=Gl(e);e.focus(),Hl(t)}}var Cn=null;function Vl(){if(Cn==null){Cn=!1;try{document.createElement("div").focus({get preventScroll(){return Cn=!0,!0}})}catch(e){}}return Cn}function Gl(e){let t=e.parentNode;const n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Hl(e){for(const{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var oi=["input:not([type='hidden']):not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","[tabindex]","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]:not([contenteditable='false'])"],jl=[...oi,'[tabindex]:not([tabindex="-1"]):not([disabled])'],mr=oi.join(":not([hidden]),")+",[tabindex]:not([disabled]):not([hidden])",Wl=jl.join(':not([hidden]):not([tabindex="-1"]),');function ii(e,t){const r=Array.from(e.querySelectorAll(mr)).filter(uo);return t&&uo(e)&&r.unshift(e),r.forEach((o,l)=>{if(ri(o)&&o.contentDocument){const s=o.contentDocument.body,a=ii(s,!1);r.splice(l,1,...a)}}),r}function uo(e){return si(e)&&!Ql(e)}function si(e){return e.matches(mr)&&br(e)}function Ql(e){return parseInt(e.getAttribute("tabindex")||"0",10)<0}function br(e,t){return e.nodeName!=="#comment"&&Yl(e)&&Xl(e,t)&&(!e.parentElement||br(e.parentElement,e))}function Yl(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;const{display:t,visibility:n}=e.style;let r=t!=="none"&&n!=="hidden"&&n!=="collapse";if(r){if(!e.ownerDocument.defaultView)return r;const{getComputedStyle:o}=e.ownerDocument.defaultView,{display:l,visibility:s}=o(e);r=l!=="none"&&s!=="hidden"&&s!=="collapse"}return r}function Xl(e,t){return!e.hasAttribute("hidden")&&(e.nodeName==="DETAILS"&&t&&t.nodeName!=="SUMMARY"?e.hasAttribute("open"):!0)}function Zl(e,t,n){const r=t!=null&&t.tabbable?Wl:mr,o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(l){var s;return(s=t==null?void 0:t.from)!=null&&s.contains(l)?NodeFilter.FILTER_REJECT:l.matches(r)&&br(l)&&(!(t!=null&&t.accept)||t.accept(l))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t!=null&&t.from&&(o.currentNode=t.from),o}function co(e){for(;e&&!Jl(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}function Jl(e){const t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function ea(){}function ta(e,t){const[n,r]=e;let o=!1;const l=t.length;for(let s=l,a=0,i=s-1;a<s;i=a++){const[c,g]=t[a],[d,u]=t[i],[,f]=t[i===0?s-1:i-1]||[0,0],h=(g-u)*(n-c)-(c-d)*(r-g);if(u<g){if(r>=u&&r<g){if(h===0)return!0;h>0&&(r===u?r>f&&(o=!o):o=!o)}}else if(g<u){if(r>g&&r<=u){if(h===0)return!0;h<0&&(r===u?r<f&&(o=!o):o=!o)}}else if(r==g&&(n>=d&&n<=c||n>=c&&n<=d))return!0}return o}function Z(e,t){return W(e,t)}var tn=new Map,fo=new Set;function go(){if(typeof window=="undefined")return;const e=n=>{if(!n.target)return;let r=tn.get(n.target);r||(r=new Set,tn.set(n.target,r),n.target.addEventListener("transitioncancel",t)),r.add(n.propertyName)},t=n=>{if(!n.target)return;const r=tn.get(n.target);if(r&&(r.delete(n.propertyName),r.size===0&&(n.target.removeEventListener("transitioncancel",t),tn.delete(n.target)),tn.size===0)){for(const o of fo)o();fo.clear()}};document.body.addEventListener("transitionrun",e),document.body.addEventListener("transitionend",t)}typeof document!="undefined"&&(document.readyState!=="loading"?go():document.addEventListener("DOMContentLoaded",go));function rr(e,t){const n=ho(e,t,"left"),r=ho(e,t,"top"),o=t.offsetWidth,l=t.offsetHeight;let s=e.scrollLeft,a=e.scrollTop;const i=s+e.offsetWidth,c=a+e.offsetHeight;n<=s?s=n:n+o>i&&(s+=n+o-i),r<=a?a=r:r+l>c&&(a+=r+l-c),e.scrollLeft=s,e.scrollTop=a}function ho(e,t,n){const r=n==="left"?"offsetLeft":"offsetTop";let o=0;for(;t.offsetParent&&(o+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){o-=e[r];break}t=t.offsetParent}return o}function na(e,t){var n,r;if(document.contains(e)){const o=document.scrollingElement||document.documentElement;if(window.getComputedStyle(o).overflow==="hidden"){let s=co(e);for(;e&&s&&e!==o&&s!==o;)rr(s,e),e=s,s=co(e)}else{const{left:s,top:a}=e.getBoundingClientRect();(n=e==null?void 0:e.scrollIntoView)==null||n.call(e,{block:"nearest"});const{left:i,top:c}=e.getBoundingClientRect();(Math.abs(s-i)>1||Math.abs(a-c)>1)&&((r=e.scrollIntoView)==null||r.call(e,{block:"nearest"}))}}}var li={border:"0",clip:"rect(0 0 0 0)","clip-path":"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:"0",position:"absolute",width:"1px","white-space":"nowrap"};function Ve(e){return t=>(e(t),()=>e(void 0))}function _n(e,t){const[n,r]=B(yo(t==null?void 0:t()));return V(()=>{var o;r(((o=e())==null?void 0:o.tagName.toLowerCase())||yo(t==null?void 0:t()))}),n}function yo(e){return Kt(e)?e:void 0}function fe(e){const[t,n]=ie(e,["as"]);if(!t.as)throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");return v(js,W(n,{get component(){return t.as}}))}var ra=["id","name","validationState","required","disabled","readOnly"];function oa(e){const t=`form-control-${Ge()}`,n=Z({id:t},e),[r,o]=B(),[l,s]=B(),[a,i]=B(),[c,g]=B(),d=(y,m,b)=>{const p=b!=null||r()!=null;return[b,r(),p&&m!=null?y:void 0].filter(Boolean).join(" ")||void 0},u=y=>[a(),c(),y].filter(Boolean).join(" ")||void 0,f=M(()=>({"data-valid":D(n.validationState)==="valid"?"":void 0,"data-invalid":D(n.validationState)==="invalid"?"":void 0,"data-required":D(n.required)?"":void 0,"data-disabled":D(n.disabled)?"":void 0,"data-readonly":D(n.readOnly)?"":void 0}));return{formControlContext:{name:()=>{var y;return(y=D(n.name))!=null?y:D(n.id)},dataset:f,validationState:()=>D(n.validationState),isRequired:()=>D(n.required),isDisabled:()=>D(n.disabled),isReadOnly:()=>D(n.readOnly),labelId:r,fieldId:l,descriptionId:a,errorMessageId:c,getAriaLabelledBy:d,getAriaDescribedBy:u,generateId:gn(()=>D(n.id)),registerLabel:Ve(o),registerField:Ve(s),registerDescription:Ve(i),registerErrorMessage:Ve(g)}}}var ai=Se();function hn(){const e=ke(ai);if(e===void 0)throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function ui(e){const t=hn(),n=Z({id:t.generateId("description")},e);return V(()=>j(t.registerDescription(n.id))),v(fe,W({as:"div"},()=>t.dataset(),n))}function ci(e){const t=hn(),n=Z({id:t.generateId("error-message")},e),[r,o]=ie(n,["forceMount"]),l=()=>t.validationState()==="invalid";return V(()=>{l()&&j(t.registerErrorMessage(o.id))}),v(U,{get when(){return r.forceMount||l()},get children(){return v(fe,W({as:"div"},()=>t.dataset(),o))}})}function ia(e){let t;const n=hn(),r=Z({id:n.generateId("label")},e),[o,l]=ie(r,["ref"]),s=_n(()=>t,()=>"label");return V(()=>j(n.registerLabel(l.id))),v(fe,W({as:"label",ref(a){const i=Te(c=>t=c,o.ref);typeof i=="function"&&i(a)},get for(){return M(()=>s()==="label")()?n.fieldId():void 0}},()=>n.dataset(),l))}function sa(e,t){V(gt(e,n=>{if(n==null)return;const r=la(n);r!=null&&(r.addEventListener("reset",t,{passive:!0}),j(()=>{r.removeEventListener("reset",t)}))}))}function la(e){return aa(e)?e.form:e.closest("form")}function aa(e){return e.matches("textarea, input, select, button")}function yn(e){var s;const[t,n]=B((s=e.defaultValue)==null?void 0:s.call(e)),r=M(()=>{var a;return((a=e.value)==null?void 0:a.call(e))!==void 0}),o=M(()=>{var a;return r()?(a=e.value)==null?void 0:a.call(e):t()});return[o,a=>{Ut(()=>{var c;const i=Zs(a,o());return Object.is(i,o())||(r()||n(i),(c=e.onChange)==null||c.call(e,i)),i})}]}function di(e){const[t,n]=yn(e);return[()=>{var o;return(o=t())!=null?o:!1},n]}function ua(e){const[t,n]=yn(e);return[()=>{var o;return(o=t())!=null?o:[]},n]}function ca(e={}){const[t,n]=di({value:()=>D(e.isSelected),defaultValue:()=>!!D(e.defaultIsSelected),onChange:l=>{var s;return(s=e.onSelectedChange)==null?void 0:s.call(e,l)}});return{isSelected:t,setIsSelected:l=>{!D(e.isReadOnly)&&!D(e.isDisabled)&&n(l)},toggle:()=>{!D(e.isReadOnly)&&!D(e.isDisabled)&&n(!t())}}}var da=Object.defineProperty,qn=(e,t)=>{for(var n in t)da(e,n,{get:t[n],enumerable:!0})},fi=Se();function gi(){return ke(fi)}function fa(){const e=gi();if(e===void 0)throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function hi(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function ga(e,t){var o;const n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){const l=(o=e[r])==null?void 0:o.ref();if(l&&hi(l,n))return r+1}return 0}function ha(e){const t=e.map((r,o)=>[o,r]);let n=!1;return t.sort(([r,o],[l,s])=>{const a=o.ref(),i=s.ref();return a===i||!a||!i?0:hi(a,i)?(r>l&&(n=!0),-1):(r<l&&(n=!0),1)}),n?t.map(([r,o])=>o):e}function yi(e,t){const n=ha(e);e!==n&&t(n)}function ya(e){var o,l;const t=e[0],n=(o=e[e.length-1])==null?void 0:o.ref();let r=(l=t==null?void 0:t.ref())==null?void 0:l.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return tt(r).body}function ma(e,t){V(()=>{const n=setTimeout(()=>{yi(e(),t)});j(()=>clearTimeout(n))})}function ba(e,t){if(typeof IntersectionObserver!="function"){ma(e,t);return}let n=[];V(()=>{const r=()=>{const s=!!n.length;n=e(),s&&yi(e(),t)},o=ya(e()),l=new IntersectionObserver(r,{root:o});for(const s of e()){const a=s.ref();a&&l.observe(a)}j(()=>l.disconnect())})}function va(e={}){const[t,n]=ua({value:()=>D(e.items),onChange:l=>{var s;return(s=e.onItemsChange)==null?void 0:s.call(e,l)}});ba(t,n);const r=l=>(n(s=>{const a=ga(s,l);return Ol(s,l,a)}),()=>{n(s=>{const a=s.filter(i=>i.ref()!==l.ref());return s.length===a.length?s:a})});return{DomCollectionProvider:l=>v(fi.Provider,{value:{registerItem:r},get children(){return l.children}})}}function pa(e){const t=fa(),n=Z({shouldRegisterItem:!0},e);V(()=>{if(!n.shouldRegisterItem)return;const r=t.registerItem(n.getItem());j(r)})}function mi(e){var i,c,g;let t=(i=e.startIndex)!=null?i:0;const n=(c=e.startLevel)!=null?c:0,r=[],o=d=>{var h;if(d==null)return"";const u=(h=e.getKey)!=null?h:"key",f=Kt(u)?d[u]:u(d);return f!=null?String(f):""},l=d=>{var h;if(d==null)return"";const u=(h=e.getTextValue)!=null?h:"textValue",f=Kt(u)?d[u]:u(d);return f!=null?String(f):""},s=d=>{var f,h;if(d==null)return!1;const u=(f=e.getDisabled)!=null?f:"disabled";return(h=Kt(u)?d[u]:u(d))!=null?h:!1},a=d=>{var u;if(d!=null)return Kt(e.getSectionChildren)?d[e.getSectionChildren]:(u=e.getSectionChildren)==null?void 0:u.call(e,d)};for(const d of e.dataSource){if(Kt(d)||_l(d)){r.push({type:"item",rawValue:d,key:String(d),textValue:String(d),disabled:s(d),level:n,index:t}),t++;continue}if(a(d)!=null){r.push({type:"section",rawValue:d,key:"",textValue:"",disabled:!1,level:n,index:t}),t++;const u=(g=a(d))!=null?g:[];if(u.length>0){const f=mi({dataSource:u,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...f),t+=f.length}}else r.push({type:"item",rawValue:d,key:o(d),textValue:l(d),disabled:s(d),level:n,index:t}),t++}return r}function wa(e,t=[]){return M(()=>{const n=mi({dataSource:D(e.dataSource),getKey:D(e.getKey),getTextValue:D(e.getTextValue),getDisabled:D(e.getDisabled),getSectionChildren:D(e.getSectionChildren)});for(let r=0;r<t.length;r++)t[r]();return e.factory(n)})}var xa=new Set(["Avst","Arab","Armi","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),$a=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function Ca(e){var n;if(Intl.Locale){const r=(n=new Intl.Locale(e).maximize().script)!=null?n:"";return xa.has(r)}const t=e.split("-")[0];return $a.has(t)}function Sa(e){return Ca(e)?"rtl":"ltr"}function bi(){let e=typeof navigator!="undefined"&&(navigator.language||navigator.userLanguage)||"en-US";return{locale:e,direction:Sa(e)}}var or=bi(),sn=new Set;function mo(){or=bi();for(const e of sn)e(or)}function ka(){const[e,t]=B(or),n=M(()=>e());return Pt(()=>{sn.size===0&&window.addEventListener("languagechange",mo),sn.add(t),j(()=>{sn.delete(t),sn.size===0&&window.removeEventListener("languagechange",mo)})}),{locale:()=>n().locale,direction:()=>n().direction}}var Ea=Se();function kt(){const e=ka();return ke(Ea)||e}var jn=new Map;function Da(e){const{locale:t}=kt(),n=M(()=>t()+Object.entries(e).sort((r,o)=>r[0]<o[0]?-1:1).join());return M(()=>{const r=n();let o;return jn.has(r)&&(o=jn.get(r)),o||(o=new Intl.Collator(t(),e),jn.set(r,o)),o})}var dt=class vi extends Set{constructor(n,r,o){super(n);ze(this,"anchorKey");ze(this,"currentKey");n instanceof vi?(this.anchorKey=r||n.anchorKey,this.currentKey=o||n.currentKey):(this.anchorKey=r,this.currentKey=o)}};function Ma(e){const[t,n]=yn(e);return[()=>{var o;return(o=t())!=null?o:new dt},n]}function pi(e){return Nl()?e.altKey:e.ctrlKey}function Bt(e){return On()?e.metaKey:e.ctrlKey}function bo(e){return new dt(e)}function Aa(e,t){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}function Fa(e){const t=Z({selectionMode:"none",selectionBehavior:"toggle"},e),[n,r]=B(!1),[o,l]=B(),s=M(()=>{const y=D(t.selectedKeys);return y!=null?bo(y):y}),a=M(()=>{const y=D(t.defaultSelectedKeys);return y!=null?bo(y):new dt}),[i,c]=Ma({value:s,defaultValue:a,onChange:y=>{var m;return(m=t.onSelectionChange)==null?void 0:m.call(t,y)}}),[g,d]=B(D(t.selectionBehavior)),u=()=>D(t.selectionMode),f=()=>{var y;return(y=D(t.disallowEmptySelection))!=null?y:!1},h=y=>{(D(t.allowDuplicateSelectionEvents)||!Aa(y,i()))&&c(y)};return V(()=>{const y=i();D(t.selectionBehavior)==="replace"&&g()==="toggle"&&typeof y=="object"&&y.size===0&&d("replace")}),V(()=>{var y;d((y=D(t.selectionBehavior))!=null?y:"toggle")}),{selectionMode:u,disallowEmptySelection:f,selectionBehavior:g,setSelectionBehavior:d,isFocused:n,setFocused:r,focusedKey:o,setFocusedKey:l,selectedKeys:i,setSelectedKeys:h}}function Ta(e){const[t,n]=B(""),[r,o]=B(-1);return{typeSelectHandlers:{onKeyDown:s=>{var u,f,h;if(D(e.isDisabled))return;const a=D(e.keyboardDelegate),i=D(e.selectionManager);if(!a.getKeyForSearch)return;const c=Ia(s.key);if(!c||s.ctrlKey||s.metaKey)return;c===" "&&t().trim().length>0&&(s.preventDefault(),s.stopPropagation());let g=n(y=>y+c),d=(u=a.getKeyForSearch(g,i.focusedKey()))!=null?u:a.getKeyForSearch(g);d==null&&Pa(g)&&(g=g[0],d=(f=a.getKeyForSearch(g,i.focusedKey()))!=null?f:a.getKeyForSearch(g)),d!=null&&(i.setFocusedKey(d),(h=e.onTypeSelect)==null||h.call(e,d)),clearTimeout(r()),o(window.setTimeout(()=>n(""),500))}}}}function Ia(e){return e.length===1||!/^[A-Z]/i.test(e)?e:""}function Pa(e){return e.split("").every(t=>t===e[0])}function La(e,t,n){const o=W({selectOnFocus:()=>D(e.selectionManager).selectionBehavior()==="replace"},e),l=()=>t(),{direction:s}=kt();let a={top:0,left:0};Il(()=>D(o.isVirtualized)?void 0:l(),"scroll",()=>{const m=l();m&&(a={top:m.scrollTop,left:m.scrollLeft})});const{typeSelectHandlers:i}=Ta({isDisabled:()=>D(o.disallowTypeAhead),keyboardDelegate:()=>D(o.keyboardDelegate),selectionManager:()=>D(o.selectionManager)}),c=()=>{var m;return(m=D(o.orientation))!=null?m:"vertical"},g=m=>{var K,C,E,O,z,Y,me,J;de(m,i.onKeyDown),m.altKey&&m.key==="Tab"&&m.preventDefault();const b=t();if(!(b!=null&&b.contains(m.target)))return;const p=D(o.selectionManager),w=D(o.selectOnFocus),x=R=>{R!=null&&(p.setFocusedKey(R),m.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&!pi(m)&&p.replaceSelection(R))},$=D(o.keyboardDelegate),q=D(o.shouldFocusWrap),A=p.focusedKey();switch(m.key){case(c()==="vertical"?"ArrowDown":"ArrowRight"):{if($.getKeyBelow){m.preventDefault();let R;A!=null?R=$.getKeyBelow(A):R=(K=$.getFirstKey)==null?void 0:K.call($),R==null&&q&&(R=(C=$.getFirstKey)==null?void 0:C.call($,A)),x(R)}break}case(c()==="vertical"?"ArrowUp":"ArrowLeft"):{if($.getKeyAbove){m.preventDefault();let R;A!=null?R=$.getKeyAbove(A):R=(E=$.getLastKey)==null?void 0:E.call($),R==null&&q&&(R=(O=$.getLastKey)==null?void 0:O.call($,A)),x(R)}break}case(c()==="vertical"?"ArrowLeft":"ArrowUp"):{if($.getKeyLeftOf){m.preventDefault();const R=s()==="rtl";let X;A!=null?X=$.getKeyLeftOf(A):X=R?(z=$.getFirstKey)==null?void 0:z.call($):(Y=$.getLastKey)==null?void 0:Y.call($),x(X)}break}case(c()==="vertical"?"ArrowRight":"ArrowDown"):{if($.getKeyRightOf){m.preventDefault();const R=s()==="rtl";let X;A!=null?X=$.getKeyRightOf(A):X=R?(me=$.getLastKey)==null?void 0:me.call($):(J=$.getFirstKey)==null?void 0:J.call($),x(X)}break}case"Home":if($.getFirstKey){m.preventDefault();const R=$.getFirstKey(A,Bt(m));R!=null&&(p.setFocusedKey(R),Bt(m)&&m.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&p.replaceSelection(R))}break;case"End":if($.getLastKey){m.preventDefault();const R=$.getLastKey(A,Bt(m));R!=null&&(p.setFocusedKey(R),Bt(m)&&m.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&p.replaceSelection(R))}break;case"PageDown":if($.getKeyPageBelow&&A!=null){m.preventDefault();const R=$.getKeyPageBelow(A);x(R)}break;case"PageUp":if($.getKeyPageAbove&&A!=null){m.preventDefault();const R=$.getKeyPageAbove(A);x(R)}break;case"a":Bt(m)&&p.selectionMode()==="multiple"&&D(o.disallowSelectAll)!==!0&&(m.preventDefault(),p.selectAll());break;case"Escape":m.defaultPrevented||(m.preventDefault(),D(o.disallowEmptySelection)||p.clearSelection());break;case"Tab":if(!D(o.allowsTabNavigation)){if(m.shiftKey)b.focus();else{const R=Zl(b,{tabbable:!0});let X,ee;do ee=R.lastChild(),ee&&(X=ee);while(ee);X&&!X.contains(document.activeElement)&&Ae(X)}break}}},d=m=>{var x,$,q,A;const b=D(o.selectionManager),p=D(o.keyboardDelegate),w=D(o.selectOnFocus);if(b.isFocused()){m.currentTarget.contains(m.target)||b.setFocused(!1);return}if(m.currentTarget.contains(m.target)){if(b.setFocused(!0),b.focusedKey()==null){const K=E=>{E!=null&&(b.setFocusedKey(E),w&&b.replaceSelection(E))},C=m.relatedTarget;C&&m.currentTarget.compareDocumentPosition(C)&Node.DOCUMENT_POSITION_FOLLOWING?K(($=b.lastSelectedKey())!=null?$:(x=p.getLastKey)==null?void 0:x.call(p)):K((A=b.firstSelectedKey())!=null?A:(q=p.getFirstKey)==null?void 0:q.call(p))}else if(!D(o.isVirtualized)){const K=l();if(K){K.scrollTop=a.top,K.scrollLeft=a.left;const C=K.querySelector(`[data-key="${b.focusedKey()}"]`);C&&(Ae(C),rr(K,C))}}}},u=m=>{const b=D(o.selectionManager);m.currentTarget.contains(m.relatedTarget)||b.setFocused(!1)},f=m=>{l()===m.target&&m.preventDefault()},h=()=>{var q,A;const m=D(o.autoFocus);if(!m)return;const b=D(o.selectionManager),p=D(o.keyboardDelegate);let w;m==="first"&&(w=(q=p.getFirstKey)==null?void 0:q.call(p)),m==="last"&&(w=(A=p.getLastKey)==null?void 0:A.call(p));const x=b.selectedKeys();x.size&&(w=x.values().next().value),b.setFocused(!0),b.setFocusedKey(w);const $=t();$&&w==null&&!D(o.shouldUseVirtualFocus)&&Ae($)};return Pt(()=>{o.deferAutoFocus?setTimeout(h,0):h()}),V(gt([l,()=>D(o.isVirtualized),()=>D(o.selectionManager).focusedKey()],m=>{var x;const[b,p,w]=m;if(p)w&&((x=o.scrollToKey)==null||x.call(o,w));else if(w&&b){const $=b.querySelector(`[data-key="${w}"]`);$&&rr(b,$)}})),{tabIndex:M(()=>{if(!D(o.shouldUseVirtualFocus))return D(o.selectionManager).focusedKey()==null?0:-1}),onKeyDown:g,onMouseDown:f,onFocusIn:d,onFocusOut:u}}function wi(e,t){const n=()=>D(e.selectionManager),r=()=>D(e.key),o=()=>D(e.shouldUseVirtualFocus),l=p=>{n().selectionMode()!=="none"&&(n().selectionMode()==="single"?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):p!=null&&p.shiftKey?n().extendSelection(r()):n().selectionBehavior()==="toggle"||Bt(p)||"pointerType"in p&&p.pointerType==="touch"?n().toggleSelection(r()):n().replaceSelection(r()))},s=()=>n().isSelected(r()),a=()=>D(e.disabled)||n().isDisabled(r()),i=()=>!a()&&n().canSelectItem(r());let c=null;const g=p=>{i()&&(c=p.pointerType,p.pointerType==="mouse"&&p.button===0&&!D(e.shouldSelectOnPressUp)&&l(p))},d=p=>{i()&&p.pointerType==="mouse"&&p.button===0&&D(e.shouldSelectOnPressUp)&&D(e.allowsDifferentPressOrigin)&&l(p)},u=p=>{i()&&(D(e.shouldSelectOnPressUp)&&!D(e.allowsDifferentPressOrigin)||c!=="mouse")&&l(p)},f=p=>{!i()||!["Enter"," "].includes(p.key)||(pi(p)?n().toggleSelection(r()):l(p))},h=p=>{a()&&p.preventDefault()},y=p=>{const w=t();o()||a()||!w||p.target===w&&n().setFocusedKey(r())},m=M(()=>{if(!(o()||a()))return r()===n().focusedKey()?0:-1}),b=M(()=>D(e.virtualized)?void 0:r());return V(gt([t,r,o,()=>n().focusedKey(),()=>n().isFocused()],([p,w,x,$,q])=>{p&&w===$&&q&&!x&&document.activeElement!==p&&(e.focus?e.focus():Ae(p))})),{isSelected:s,isDisabled:a,allowsSelection:i,tabIndex:m,dataKey:b,onPointerDown:g,onPointerUp:d,onClick:u,onKeyDown:f,onMouseDown:h,onFocus:y}}var Oa=class{constructor(e,t){ze(this,"collection");ze(this,"state");this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()==="none")return!1;const t=this.getKey(e);return t==null?!1:this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;const e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=(n==null?void 0:n.index)!=null&&(e==null?void 0:e.index)!=null&&n.index<e.index;(!e||r)&&(e=n)}return e==null?void 0:e.key}lastSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=(n==null?void 0:n.index)!=null&&(e==null?void 0:e.index)!=null&&n.index>e.index;(!e||r)&&(e=n)}return e==null?void 0:e.key}extendSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"){this.replaceSelection(e);return}const t=this.getKey(e);if(t==null)return;const n=this.state.selectedKeys(),r=n.anchorKey||t,o=new dt(n,r,t);for(const l of this.getKeyRange(r,n.currentKey||t))o.delete(l);for(const l of this.getKeyRange(t,r))this.canSelectItem(l)&&o.add(l);this.state.setSelectedKeys(o)}getKeyRange(e,t){const n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){const n=[];let r=e;for(;r!=null;){const o=this.collection().getItem(r);if(o&&o.type==="item"&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){const t=this.collection().getItem(e);return t?!t||t.type!=="item"?null:t.key:e}toggleSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"&&!this.isSelected(e)){this.replaceSelection(e);return}const t=this.getKey(e);if(t==null)return;const n=new dt(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()==="none")return;const t=this.getKey(e);if(t==null)return;const n=this.canSelectItem(t)?new dt([t],t,t):new dt;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()==="none")return;const t=new dt;for(const n of e){const r=this.getKey(n);if(r!=null&&(t.add(r),this.selectionMode()==="single"))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()==="multiple"&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){const e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new dt)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!=="none"&&(this.selectionMode()==="single"?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()==="toggle"||t&&t.pointerType==="touch"?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;const t=this.selectedKeys();if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;for(const n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()==="none")return!1;const t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){const t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){const e=[];return(n=>{for(;n!=null;){if(this.canSelectItem(n)){const r=this.collection().getItem(n);if(!r)continue;r.type==="item"&&e.push(n)}n=this.collection().getKeyAfter(n)}})(this.collection().getFirstKey()),e}},vo=class{constructor(e){ze(this,"keyMap",new Map);ze(this,"iterable");ze(this,"firstKey");ze(this,"lastKey");this.iterable=e;for(const r of e)this.keyMap.set(r.key,r);if(this.keyMap.size===0)return;let t,n=0;for(const[r,o]of this.keyMap)t?(t.nextKey=r,o.prevKey=t.key):(this.firstKey=r,o.prevKey=void 0),o.type==="item"&&(o.index=n++),t=o,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*Qr(this.iterable)}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){var t;return(t=this.keyMap.get(e))==null?void 0:t.prevKey}getKeyAfter(e){var t;return(t=this.keyMap.get(e))==null?void 0:t.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}};function _a(e){const t=Fa(e),r=wa({dataSource:()=>D(e.dataSource),getKey:()=>D(e.getKey),getTextValue:()=>D(e.getTextValue),getDisabled:()=>D(e.getDisabled),getSectionChildren:()=>D(e.getSectionChildren),factory:l=>e.filter?new vo(e.filter(l)):new vo(l)},[()=>e.filter]),o=new Oa(r,t);return Ws(()=>{const l=t.focusedKey();l!=null&&!r().getItem(l)&&t.setFocusedKey(void 0)}),{collection:r,selectionManager:()=>o}}var Me=e=>typeof e=="function"?e():e,qa=e=>{const t=M(()=>{const s=Me(e.element);if(s)return getComputedStyle(s)}),n=()=>{var s,a;return(a=(s=t())==null?void 0:s.animationName)!=null?a:"none"},[r,o]=B(Me(e.show)?"present":"hidden");let l="none";return V(s=>{const a=Me(e.show);return Ut(()=>{var g;if(s===a)return a;const i=l,c=n();a?o("present"):c==="none"||((g=t())==null?void 0:g.display)==="none"?o("hidden"):o(s===!0&&i!==c?"hiding":"hidden")}),a}),V(()=>{const s=Me(e.element);if(!s)return;const a=c=>{c.target===s&&(l=n())},i=c=>{const d=n().includes(c.animationName);c.target===s&&d&&r()==="hiding"&&o("hidden")};s.addEventListener("animationstart",a),s.addEventListener("animationcancel",i),s.addEventListener("animationend",i),j(()=>{s.removeEventListener("animationstart",a),s.removeEventListener("animationcancel",i),s.removeEventListener("animationend",i)})}),{present:()=>r()==="present"||r()==="hiding",state:r}},za=qa,xi=za,Mn="data-kb-top-layer",$i,ir=!1,ht=[];function an(e){return ht.findIndex(t=>t.node===e)}function Ra(e){return ht[an(e)]}function Ka(e){return ht[ht.length-1].node===e}function Ci(){return ht.filter(e=>e.isPointerBlocking)}function Ba(){return[...Ci()].slice(-1)[0]}function vr(){return Ci().length>0}function Si(e){var n;const t=an((n=Ba())==null?void 0:n.node);return an(e)<t}function Na(e){ht.push(e)}function Ua(e){const t=an(e);t<0||ht.splice(t,1)}function Va(){for(const{node:e}of ht)e.style.pointerEvents=Si(e)?"none":"auto"}function Ga(e){if(vr()&&!ir){const t=tt(e);$i=document.body.style.pointerEvents,t.body.style.pointerEvents="none",ir=!0}}function Ha(e){if(vr())return;const t=tt(e);t.body.style.pointerEvents=$i,t.body.style.length===0&&t.body.removeAttribute("style"),ir=!1}var Pe={layers:ht,isTopMostLayer:Ka,hasPointerBlockingLayer:vr,isBelowPointerBlockingLayer:Si,addLayer:Na,removeLayer:Ua,indexOf:an,find:Ra,assignPointerEventToLayers:Va,disableBodyPointerEvents:Ga,restoreBodyPointerEvents:Ha},ja={};qn(ja,{Button:()=>Ya,Root:()=>pr});var Wa=["button","color","file","image","reset","submit"];function Qa(e){const t=e.tagName.toLowerCase();return t==="button"?!0:t==="input"&&e.type?Wa.indexOf(e.type)!==-1:!1}function pr(e){let t;const n=Z({type:"button"},e),[r,o]=ie(n,["ref","type","disabled"]),l=_n(()=>t,()=>"button"),s=M(()=>{const c=l();return c==null?!1:Qa({tagName:c,type:r.type})}),a=M(()=>l()==="input"),i=M(()=>l()==="a"&&(t==null?void 0:t.getAttribute("href"))!=null);return v(fe,W({as:"button",ref(c){const g=Te(d=>t=d,r.ref);typeof g=="function"&&g(c)},get type(){return s()||a()?r.type:void 0},get role(){return!s()&&!i()?"button":void 0},get tabIndex(){return!s()&&!i()&&!r.disabled?0:void 0},get disabled(){return s()||a()?r.disabled:void 0},get"aria-disabled"(){return!s()&&!a()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?"":void 0}},o))}var Ya=pr,Xa=["top","right","bottom","left"],et=Math.min,Oe=Math.max,An=Math.round,Sn=Math.floor,$t=e=>({x:e,y:e}),Za={left:"right",right:"left",bottom:"top",top:"bottom"},Ja={start:"end",end:"start"};function sr(e,t,n){return Oe(e,et(t,n))}function Lt(e,t){return typeof e=="function"?e(t):e}function Ct(e){return e.split("-")[0]}function Ht(e){return e.split("-")[1]}function ki(e){return e==="x"?"y":"x"}function wr(e){return e==="y"?"height":"width"}function Tt(e){return["top","bottom"].includes(Ct(e))?"y":"x"}function xr(e){return ki(Tt(e))}function eu(e,t,n){n===void 0&&(n=!1);const r=Ht(e),o=xr(e),l=wr(o);let s=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[l]>t.floating[l]&&(s=Fn(s)),[s,Fn(s)]}function tu(e){const t=Fn(e);return[lr(e),t,lr(t)]}function lr(e){return e.replace(/start|end/g,t=>Ja[t])}function nu(e,t,n){const r=["left","right"],o=["right","left"],l=["top","bottom"],s=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?l:s;default:return[]}}function ru(e,t,n,r){const o=Ht(e);let l=nu(Ct(e),n==="start",r);return o&&(l=l.map(s=>s+"-"+o),t&&(l=l.concat(l.map(lr)))),l}function Fn(e){return e.replace(/left|right|bottom|top/g,t=>Za[t])}function ou(e){return te({top:0,right:0,bottom:0,left:0},e)}function Ei(e){return typeof e!="number"?ou(e):{top:e,right:e,bottom:e,left:e}}function Tn(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function po(e,t,n){let{reference:r,floating:o}=e;const l=Tt(t),s=xr(t),a=wr(s),i=Ct(t),c=l==="y",g=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,u=r[a]/2-o[a]/2;let f;switch(i){case"top":f={x:g,y:r.y-o.height};break;case"bottom":f={x:g,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:d};break;case"left":f={x:r.x-o.width,y:d};break;default:f={x:r.x,y:r.y}}switch(Ht(t)){case"start":f[s]-=u*(n&&c?-1:1);break;case"end":f[s]+=u*(n&&c?-1:1);break}return f}var iu=(e,t,n)=>Re(void 0,null,function*(){const{placement:r="bottom",strategy:o="absolute",middleware:l=[],platform:s}=n,a=l.filter(Boolean),i=yield s.isRTL==null?void 0:s.isRTL(t);let c=yield s.getElementRects({reference:e,floating:t,strategy:o}),{x:g,y:d}=po(c,r,i),u=r,f={},h=0;for(let y=0;y<a.length;y++){const{name:m,fn:b}=a[y],{x:p,y:w,data:x,reset:$}=yield b({x:g,y:d,initialPlacement:r,placement:u,strategy:o,middlewareData:f,rects:c,platform:s,elements:{reference:e,floating:t}});g=p!=null?p:g,d=w!=null?w:d,f=be(te({},f),{[m]:te(te({},f[m]),x)}),$&&h<=50&&(h++,typeof $=="object"&&($.placement&&(u=$.placement),$.rects&&(c=$.rects===!0?yield s.getElementRects({reference:e,floating:t,strategy:o}):$.rects),{x:g,y:d}=po(c,u,i)),y=-1)}return{x:g,y:d,placement:u,strategy:o,middlewareData:f}});function un(e,t){return Re(this,null,function*(){var n;t===void 0&&(t={});const{x:r,y:o,platform:l,rects:s,elements:a,strategy:i}=e,{boundary:c="clippingAncestors",rootBoundary:g="viewport",elementContext:d="floating",altBoundary:u=!1,padding:f=0}=Lt(t,e),h=Ei(f),m=a[u?d==="floating"?"reference":"floating":d],b=Tn(yield l.getClippingRect({element:(n=yield l.isElement==null?void 0:l.isElement(m))==null||n?m:m.contextElement||(yield l.getDocumentElement==null?void 0:l.getDocumentElement(a.floating)),boundary:c,rootBoundary:g,strategy:i})),p=d==="floating"?{x:r,y:o,width:s.floating.width,height:s.floating.height}:s.reference,w=yield l.getOffsetParent==null?void 0:l.getOffsetParent(a.floating),x=(yield l.isElement==null?void 0:l.isElement(w))?(yield l.getScale==null?void 0:l.getScale(w))||{x:1,y:1}:{x:1,y:1},$=Tn(l.convertOffsetParentRelativeRectToViewportRelativeRect?yield l.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:p,offsetParent:w,strategy:i}):p);return{top:(b.top-$.top+h.top)/x.y,bottom:($.bottom-b.bottom+h.bottom)/x.y,left:(b.left-$.left+h.left)/x.x,right:($.right-b.right+h.right)/x.x}})}var su=e=>({name:"arrow",options:e,fn(n){return Re(this,null,function*(){const{x:r,y:o,placement:l,rects:s,platform:a,elements:i,middlewareData:c}=n,{element:g,padding:d=0}=Lt(e,n)||{};if(g==null)return{};const u=Ei(d),f={x:r,y:o},h=xr(l),y=wr(h),m=yield a.getDimensions(g),b=h==="y",p=b?"top":"left",w=b?"bottom":"right",x=b?"clientHeight":"clientWidth",$=s.reference[y]+s.reference[h]-f[h]-s.floating[y],q=f[h]-s.reference[h],A=yield a.getOffsetParent==null?void 0:a.getOffsetParent(g);let K=A?A[x]:0;(!K||!(yield a.isElement==null?void 0:a.isElement(A)))&&(K=i.floating[x]||s.floating[y]);const C=$/2-q/2,E=K/2-m[y]/2-1,O=et(u[p],E),z=et(u[w],E),Y=O,me=K-m[y]-z,J=K/2-m[y]/2+C,R=sr(Y,J,me),X=!c.arrow&&Ht(l)!=null&&J!==R&&s.reference[y]/2-(J<Y?O:z)-m[y]/2<0,ee=X?J<Y?J-Y:J-me:0;return{[h]:f[h]+ee,data:te({[h]:R,centerOffset:J-R-ee},X&&{alignmentOffset:ee}),reset:X}})}}),lu=function(e){return e===void 0&&(e={}),{name:"flip",options:e,fn(n){return Re(this,null,function*(){var r,o;const{placement:l,middlewareData:s,rects:a,initialPlacement:i,platform:c,elements:g}=n,J=Lt(e,n),{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:y="none",flipAlignment:m=!0}=J,b=en(J,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","fallbackAxisSideDirection","flipAlignment"]);if((r=s.arrow)!=null&&r.alignmentOffset)return{};const p=Ct(l),w=Tt(i),x=Ct(i)===i,$=yield c.isRTL==null?void 0:c.isRTL(g.floating),q=f||(x||!m?[Fn(i)]:tu(i)),A=y!=="none";!f&&A&&q.push(...ru(i,m,y,$));const K=[i,...q],C=yield un(n,b),E=[];let O=((o=s.flip)==null?void 0:o.overflows)||[];if(d&&E.push(C[p]),u){const R=eu(l,a,$);E.push(C[R[0]],C[R[1]])}if(O=[...O,{placement:l,overflows:E}],!E.every(R=>R<=0)){var z,Y;const R=(((z=s.flip)==null?void 0:z.index)||0)+1,X=K[R];if(X)return{data:{index:R,overflows:O},reset:{placement:X}};let ee=(Y=O.filter(ye=>ye.overflows[0]<=0).sort((ye,le)=>ye.overflows[1]-le.overflows[1])[0])==null?void 0:Y.placement;if(!ee)switch(h){case"bestFit":{var me;const ye=(me=O.filter(le=>{if(A){const ge=Tt(le.placement);return ge===w||ge==="y"}return!0}).map(le=>[le.placement,le.overflows.filter(ge=>ge>0).reduce((ge,he)=>ge+he,0)]).sort((le,ge)=>le[1]-ge[1])[0])==null?void 0:me[0];ye&&(ee=ye);break}case"initialPlacement":ee=i;break}if(l!==ee)return{reset:{placement:ee}}}return{}})}}};function wo(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function xo(e){return Xa.some(t=>e[t]>=0)}var au=function(e){return e===void 0&&(e={}),{name:"hide",options:e,fn(n){return Re(this,null,function*(){const{rects:r}=n,s=Lt(e,n),{strategy:o="referenceHidden"}=s,l=en(s,["strategy"]);switch(o){case"referenceHidden":{const a=yield un(n,be(te({},l),{elementContext:"reference"})),i=wo(a,r.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:xo(i)}}}case"escaped":{const a=yield un(n,be(te({},l),{altBoundary:!0})),i=wo(a,r.floating);return{data:{escapedOffsets:i,escaped:xo(i)}}}default:return{}}})}}};function uu(e,t){return Re(this,null,function*(){const{placement:n,platform:r,elements:o}=e,l=yield r.isRTL==null?void 0:r.isRTL(o.floating),s=Ct(n),a=Ht(n),i=Tt(n)==="y",c=["left","top"].includes(s)?-1:1,g=l&&i?-1:1,d=Lt(t,e);let{mainAxis:u,crossAxis:f,alignmentAxis:h}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:te({mainAxis:0,crossAxis:0,alignmentAxis:null},d);return a&&typeof h=="number"&&(f=a==="end"?h*-1:h),i?{x:f*g,y:u*c}:{x:u*c,y:f*g}})}var cu=function(e){return e===void 0&&(e=0),{name:"offset",options:e,fn(n){return Re(this,null,function*(){var r,o;const{x:l,y:s,placement:a,middlewareData:i}=n,c=yield uu(n,e);return a===((r=i.offset)==null?void 0:r.placement)&&(o=i.arrow)!=null&&o.alignmentOffset?{}:{x:l+c.x,y:s+c.y,data:be(te({},c),{placement:a})}})}}},du=function(e){return e===void 0&&(e={}),{name:"shift",options:e,fn(n){return Re(this,null,function*(){const{x:r,y:o,placement:l}=n,b=Lt(e,n),{mainAxis:s=!0,crossAxis:a=!1,limiter:i={fn:p=>{let{x:w,y:x}=p;return{x:w,y:x}}}}=b,c=en(b,["mainAxis","crossAxis","limiter"]),g={x:r,y:o},d=yield un(n,c),u=Tt(Ct(l)),f=ki(u);let h=g[f],y=g[u];if(s){const p=f==="y"?"top":"left",w=f==="y"?"bottom":"right",x=h+d[p],$=h-d[w];h=sr(x,h,$)}if(a){const p=u==="y"?"top":"left",w=u==="y"?"bottom":"right",x=y+d[p],$=y-d[w];y=sr(x,y,$)}const m=i.fn(be(te({},n),{[f]:h,[u]:y}));return be(te({},m),{data:{x:m.x-r,y:m.y-o}})})}}},fu=function(e){return e===void 0&&(e={}),{name:"size",options:e,fn(n){return Re(this,null,function*(){const{placement:r,rects:o,platform:l,elements:s}=n,C=Lt(e,n),{apply:a=()=>{}}=C,i=en(C,["apply"]),c=yield un(n,i),g=Ct(r),d=Ht(r),u=Tt(r)==="y",{width:f,height:h}=o.floating;let y,m;g==="top"||g==="bottom"?(y=g,m=d===((yield l.isRTL==null?void 0:l.isRTL(s.floating))?"start":"end")?"left":"right"):(m=g,y=d==="end"?"top":"bottom");const b=h-c.top-c.bottom,p=f-c.left-c.right,w=et(h-c[y],b),x=et(f-c[m],p),$=!n.middlewareData.shift;let q=w,A=x;if(u?A=d||$?et(x,p):p:q=d||$?et(w,b):b,$&&!d){const E=Oe(c.left,0),O=Oe(c.right,0),z=Oe(c.top,0),Y=Oe(c.bottom,0);u?A=f-2*(E!==0||O!==0?E+O:Oe(c.left,c.right)):q=h-2*(z!==0||Y!==0?z+Y:Oe(c.top,c.bottom))}yield a(be(te({},n),{availableWidth:A,availableHeight:q}));const K=yield l.getDimensions(s.floating);return f!==K.width||h!==K.height?{reset:{rects:!0}}:{}})}}};function jt(e){return Di(e)?(e.nodeName||"").toLowerCase():"#document"}function _e(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function yt(e){var t;return(t=(Di(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Di(e){return e instanceof Node||e instanceof _e(e).Node}function Xe(e){return e instanceof Element||e instanceof _e(e).Element}function nt(e){return e instanceof HTMLElement||e instanceof _e(e).HTMLElement}function $o(e){return typeof ShadowRoot=="undefined"?!1:e instanceof ShadowRoot||e instanceof _e(e).ShadowRoot}function mn(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=Ze(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function gu(e){return["table","td","th"].includes(jt(e))}function zn(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch(n){return!1}})}function $r(e){const t=Cr(),n=Xe(e)?Ze(e):e;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(n.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(n.contain||"").includes(r))}function hu(e){let t=St(e);for(;nt(t)&&!Gt(t);){if($r(t))return t;if(zn(t))return null;t=St(t)}return null}function Cr(){return typeof CSS=="undefined"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Gt(e){return["html","body","#document"].includes(jt(e))}function Ze(e){return _e(e).getComputedStyle(e)}function Rn(e){return Xe(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function St(e){if(jt(e)==="html")return e;const t=e.assignedSlot||e.parentNode||$o(e)&&e.host||yt(e);return $o(t)?t.host:t}function Mi(e){const t=St(e);return Gt(t)?e.ownerDocument?e.ownerDocument.body:e.body:nt(t)&&mn(t)?t:Mi(t)}function cn(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=Mi(e),l=o===((r=e.ownerDocument)==null?void 0:r.body),s=_e(o);return l?t.concat(s,s.visualViewport||[],mn(o)?o:[],s.frameElement&&n?cn(s.frameElement):[]):t.concat(o,cn(o,[],n))}function Ai(e){const t=Ze(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=nt(e),l=o?e.offsetWidth:n,s=o?e.offsetHeight:r,a=An(n)!==l||An(r)!==s;return a&&(n=l,r=s),{width:n,height:r,$:a}}function Sr(e){return Xe(e)?e:e.contextElement}function Vt(e){const t=Sr(e);if(!nt(t))return $t(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:l}=Ai(t);let s=(l?An(n.width):n.width)/r,a=(l?An(n.height):n.height)/o;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}var yu=$t(0);function Fi(e){const t=_e(e);return!Cr()||!t.visualViewport?yu:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function mu(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==_e(e)?!1:t}function It(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),l=Sr(e);let s=$t(1);t&&(r?Xe(r)&&(s=Vt(r)):s=Vt(e));const a=mu(l,n,r)?Fi(l):$t(0);let i=(o.left+a.x)/s.x,c=(o.top+a.y)/s.y,g=o.width/s.x,d=o.height/s.y;if(l){const u=_e(l),f=r&&Xe(r)?_e(r):r;let h=u,y=h.frameElement;for(;y&&r&&f!==h;){const m=Vt(y),b=y.getBoundingClientRect(),p=Ze(y),w=b.left+(y.clientLeft+parseFloat(p.paddingLeft))*m.x,x=b.top+(y.clientTop+parseFloat(p.paddingTop))*m.y;i*=m.x,c*=m.y,g*=m.x,d*=m.y,i+=w,c+=x,h=_e(y),y=h.frameElement}}return Tn({width:g,height:d,x:i,y:c})}function bu(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const l=o==="fixed",s=yt(r),a=t?zn(t.floating):!1;if(r===s||a&&l)return n;let i={scrollLeft:0,scrollTop:0},c=$t(1);const g=$t(0),d=nt(r);if((d||!d&&!l)&&((jt(r)!=="body"||mn(s))&&(i=Rn(r)),nt(r))){const u=It(r);c=Vt(r),g.x=u.x+r.clientLeft,g.y=u.y+r.clientTop}return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-i.scrollLeft*c.x+g.x,y:n.y*c.y-i.scrollTop*c.y+g.y}}function vu(e){return Array.from(e.getClientRects())}function Ti(e){return It(yt(e)).left+Rn(e).scrollLeft}function pu(e){const t=yt(e),n=Rn(e),r=e.ownerDocument.body,o=Oe(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),l=Oe(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let s=-n.scrollLeft+Ti(e);const a=-n.scrollTop;return Ze(r).direction==="rtl"&&(s+=Oe(t.clientWidth,r.clientWidth)-o),{width:o,height:l,x:s,y:a}}function wu(e,t){const n=_e(e),r=yt(e),o=n.visualViewport;let l=r.clientWidth,s=r.clientHeight,a=0,i=0;if(o){l=o.width,s=o.height;const c=Cr();(!c||c&&t==="fixed")&&(a=o.offsetLeft,i=o.offsetTop)}return{width:l,height:s,x:a,y:i}}function xu(e,t){const n=It(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,l=nt(e)?Vt(e):$t(1),s=e.clientWidth*l.x,a=e.clientHeight*l.y,i=o*l.x,c=r*l.y;return{width:s,height:a,x:i,y:c}}function Co(e,t,n){let r;if(t==="viewport")r=wu(e,n);else if(t==="document")r=pu(yt(e));else if(Xe(t))r=xu(t,n);else{const o=Fi(e);r=be(te({},t),{x:t.x-o.x,y:t.y-o.y})}return Tn(r)}function Ii(e,t){const n=St(e);return n===t||!Xe(n)||Gt(n)?!1:Ze(n).position==="fixed"||Ii(n,t)}function $u(e,t){const n=t.get(e);if(n)return n;let r=cn(e,[],!1).filter(a=>Xe(a)&&jt(a)!=="body"),o=null;const l=Ze(e).position==="fixed";let s=l?St(e):e;for(;Xe(s)&&!Gt(s);){const a=Ze(s),i=$r(s);!i&&a.position==="fixed"&&(o=null),(l?!i&&!o:!i&&a.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||mn(s)&&!i&&Ii(e,s))?r=r.filter(g=>g!==s):o=a,s=St(s)}return t.set(e,r),r}function Cu(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const s=[...n==="clippingAncestors"?zn(t)?[]:$u(t,this._c):[].concat(n),r],a=s[0],i=s.reduce((c,g)=>{const d=Co(t,g,o);return c.top=Oe(d.top,c.top),c.right=et(d.right,c.right),c.bottom=et(d.bottom,c.bottom),c.left=Oe(d.left,c.left),c},Co(t,a,o));return{width:i.right-i.left,height:i.bottom-i.top,x:i.left,y:i.top}}function Su(e){const{width:t,height:n}=Ai(e);return{width:t,height:n}}function ku(e,t,n){const r=nt(t),o=yt(t),l=n==="fixed",s=It(e,!0,l,t);let a={scrollLeft:0,scrollTop:0};const i=$t(0);if(r||!r&&!l)if((jt(t)!=="body"||mn(o))&&(a=Rn(t)),r){const d=It(t,!0,l,t);i.x=d.x+t.clientLeft,i.y=d.y+t.clientTop}else o&&(i.x=Ti(o));const c=s.left+a.scrollLeft-i.x,g=s.top+a.scrollTop-i.y;return{x:c,y:g,width:s.width,height:s.height}}function Wn(e){return Ze(e).position==="static"}function So(e,t){return!nt(e)||Ze(e).position==="fixed"?null:t?t(e):e.offsetParent}function Pi(e,t){const n=_e(e);if(zn(e))return n;if(!nt(e)){let o=St(e);for(;o&&!Gt(o);){if(Xe(o)&&!Wn(o))return o;o=St(o)}return n}let r=So(e,t);for(;r&&gu(r)&&Wn(r);)r=So(r,t);return r&&Gt(r)&&Wn(r)&&!$r(r)?n:r||hu(e)||n}var Eu=function(e){return Re(this,null,function*(){const t=this.getOffsetParent||Pi,n=this.getDimensions,r=yield n(e.floating);return{reference:ku(e.reference,yield t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}})};function Du(e){return Ze(e).direction==="rtl"}var Li={convertOffsetParentRelativeRectToViewportRelativeRect:bu,getDocumentElement:yt,getClippingRect:Cu,getOffsetParent:Pi,getElementRects:Eu,getClientRects:vu,getDimensions:Su,getScale:Vt,isElement:Xe,isRTL:Du};function Mu(e,t){let n=null,r;const o=yt(e);function l(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function s(a,i){a===void 0&&(a=!1),i===void 0&&(i=1),l();const{left:c,top:g,width:d,height:u}=e.getBoundingClientRect();if(a||t(),!d||!u)return;const f=Sn(g),h=Sn(o.clientWidth-(c+d)),y=Sn(o.clientHeight-(g+u)),m=Sn(c),p={rootMargin:-f+"px "+-h+"px "+-y+"px "+-m+"px",threshold:Oe(0,et(1,i))||1};let w=!0;function x($){const q=$[0].intersectionRatio;if(q!==i){if(!w)return s();q?s(!1,q):r=setTimeout(()=>{s(!1,1e-7)},1e3)}w=!1}try{n=new IntersectionObserver(x,be(te({},p),{root:o.ownerDocument}))}catch($){n=new IntersectionObserver(x,p)}n.observe(e)}return s(!0),l}function Au(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:l=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:i=!1}=r,c=Sr(e),g=o||l?[...c?cn(c):[],...cn(t)]:[];g.forEach(b=>{o&&b.addEventListener("scroll",n,{passive:!0}),l&&b.addEventListener("resize",n)});const d=c&&a?Mu(c,n):null;let u=-1,f=null;s&&(f=new ResizeObserver(b=>{let[p]=b;p&&p.target===c&&f&&(f.unobserve(t),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var w;(w=f)==null||w.observe(t)})),n()}),c&&!i&&f.observe(c),f.observe(t));let h,y=i?It(e):null;i&&m();function m(){const b=It(e);y&&(b.x!==y.x||b.y!==y.y||b.width!==y.width||b.height!==y.height)&&n(),y=b,h=requestAnimationFrame(m)}return n(),()=>{var b;g.forEach(p=>{o&&p.removeEventListener("scroll",n),l&&p.removeEventListener("resize",n)}),d==null||d(),(b=f)==null||b.disconnect(),f=null,i&&cancelAnimationFrame(h)}}var Fu=cu,Tu=du,Iu=lu,Pu=fu,Lu=au,Ou=su,_u=(e,t,n)=>{const r=new Map,o=te({platform:Li},n),l=be(te({},o.platform),{_c:r});return iu(e,t,be(te({},o),{platform:l}))},kr=Se();function Er(){const e=ke(kr);if(e===void 0)throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var qu=_('<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">'),ar=30,ko=ar/2,zu={top:180,right:-90,bottom:0,left:90};function Dr(e){const t=Er(),n=Z({size:ar},e),[r,o]=ie(n,["ref","style","size"]),l=()=>t.currentPlacement().split("-")[0],s=Ru(t.contentRef),a=()=>{var u;return((u=s())==null?void 0:u.getPropertyValue("background-color"))||"none"},i=()=>{var u;return((u=s())==null?void 0:u.getPropertyValue(`border-${l()}-color`))||"none"},c=()=>{var u;return((u=s())==null?void 0:u.getPropertyValue(`border-${l()}-width`))||"0px"},g=()=>Number.parseInt(c())*2*(ar/r.size),d=()=>`rotate(${zu[l()]} ${ko} ${ko}) translate(0 2)`;return v(fe,W({as:"div",ref(u){const f=Te(t.setArrowRef,r.ref);typeof f=="function"&&f(u)},"aria-hidden":"true",get style(){return Ln({position:"absolute","font-size":`${r.size}px`,width:"1em",height:"1em","pointer-events":"none",fill:a(),stroke:i(),"stroke-width":g()},r.style)}},o,{get children(){const u=qu(),f=u.firstChild;return H(()=>T(f,"transform",d())),u}}))}function Ru(e){const[t,n]=B();return V(()=>{const r=e();r&&n(zl(r).getComputedStyle(r))}),t}function Ku(e){const t=Er(),[n,r]=ie(e,["ref","style"]);return v(fe,W({as:"div",ref(o){const l=Te(t.setPositionerRef,n.ref);typeof l=="function"&&l(o)},"data-popper-positioner":"",get style(){return Ln({position:"absolute",top:0,left:0,"min-width":"max-content"},n.style)}},r))}function Eo(e){const{x:t=0,y:n=0,width:r=0,height:o=0}=e!=null?e:{};if(typeof DOMRect=="function")return new DOMRect(t,n,r,o);const l={x:t,y:n,width:r,height:o,top:n,right:t+r,bottom:n+o,left:t};return be(te({},l),{toJSON:()=>l})}function Bu(e,t){return{contextElement:e,getBoundingClientRect:()=>{const r=t(e);return r?Eo(r):e?e.getBoundingClientRect():Eo()}}}function Nu(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Uu={top:"bottom",right:"left",bottom:"top",left:"right"};function Vu(e,t){const[n,r]=e.split("-"),o=Uu[n];return r?n==="left"||n==="right"?`${o} ${r==="start"?"top":"bottom"}`:r==="start"?`${o} ${t==="rtl"?"right":"left"}`:`${o} ${t==="rtl"?"left":"right"}`:`${o} center`}function Gu(e){const t=Z({getAnchorRect:u=>u==null?void 0:u.getBoundingClientRect(),placement:"bottom",gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,r]=B(),[o,l]=B(),[s,a]=B(t.placement),i=()=>{var u;return Bu((u=t.anchorRef)==null?void 0:u.call(t),t.getAnchorRect)},{direction:c}=kt();function g(){return Re(this,null,function*(){var q,A,K;const u=i(),f=n(),h=o();if(!u||!f)return;const y=((h==null?void 0:h.clientHeight)||0)/2,m=typeof t.gutter=="number"?t.gutter+y:(q=t.gutter)!=null?q:y;f.style.setProperty("--kb-popper-content-overflow-padding",`${t.overflowPadding}px`),u.getBoundingClientRect();const b=[Fu(({placement:C})=>{const E=!!C.split("-")[1];return{mainAxis:m,crossAxis:E?void 0:t.shift,alignmentAxis:t.shift}})];if(t.flip!==!1){const C=typeof t.flip=="string"?t.flip.split(" "):void 0;if(C!==void 0&&!C.every(Nu))throw new Error("`flip` expects a spaced-delimited list of placements");b.push(Iu({padding:t.overflowPadding,fallbackPlacements:C}))}(t.slide||t.overlap)&&b.push(Tu({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),b.push(Pu({padding:t.overflowPadding,apply({availableWidth:C,availableHeight:E,rects:O}){const z=Math.round(O.reference.width);C=Math.floor(C),E=Math.floor(E),f.style.setProperty("--kb-popper-anchor-width",`${z}px`),f.style.setProperty("--kb-popper-content-available-width",`${C}px`),f.style.setProperty("--kb-popper-content-available-height",`${E}px`),t.sameWidth&&(f.style.width=`${z}px`),t.fitViewport&&(f.style.maxWidth=`${C}px`,f.style.maxHeight=`${E}px`)}})),t.hideWhenDetached&&b.push(Lu({padding:t.detachedPadding})),h&&b.push(Ou({element:h,padding:t.arrowPadding}));const p=yield _u(u,f,{placement:t.placement,strategy:"absolute",middleware:b,platform:be(te({},Li),{isRTL:()=>c()==="rtl"})});if(a(p.placement),(A=t.onCurrentPlacementChange)==null||A.call(t,p.placement),!f)return;f.style.setProperty("--kb-popper-content-transform-origin",Vu(p.placement,c()));const w=Math.round(p.x),x=Math.round(p.y);let $;if(t.hideWhenDetached&&($=(K=p.middlewareData.hide)!=null&&K.referenceHidden?"hidden":"visible"),Object.assign(f.style,{top:"0",left:"0",transform:`translate3d(${w}px, ${x}px, 0)`,visibility:$}),h&&p.middlewareData.arrow){const{x:C,y:E}=p.middlewareData.arrow,O=p.placement.split("-")[0];Object.assign(h.style,{left:C!=null?`${C}px`:"",top:E!=null?`${E}px`:"",[O]:"100%"})}})}V(()=>{const u=i(),f=n();if(!u||!f)return;const h=Au(u,f,g,{elementResize:typeof ResizeObserver=="function"});j(h)}),V(()=>{var h;const u=n(),f=(h=t.contentRef)==null?void 0:h.call(t);!u||!f||queueMicrotask(()=>{u.style.zIndex=getComputedStyle(f).zIndex})});const d={currentPlacement:s,contentRef:()=>{var u;return(u=t.contentRef)==null?void 0:u.call(t)},setPositionerRef:r,setArrowRef:l};return v(kr.Provider,{value:d,get children(){return t.children}})}var Oi=Object.assign(Gu,{Arrow:Dr,Context:kr,usePopperContext:Er,Positioner:Ku});function Hu(e){const t=n=>{var r;n.key===hr.Escape&&((r=e.onEscapeKeyDown)==null||r.call(e,n))};V(()=>{var r,o;if(D(e.isDisabled))return;const n=(o=(r=e.ownerDocument)==null?void 0:r.call(e))!=null?o:tt();n.addEventListener("keydown",t),j(()=>{n.removeEventListener("keydown",t)})})}var Do="interactOutside.pointerDownOutside",Mo="interactOutside.focusOutside";function ju(e,t){let n,r=ea;const o=()=>tt(t()),l=d=>{var u;return(u=e.onPointerDownOutside)==null?void 0:u.call(e,d)},s=d=>{var u;return(u=e.onFocusOutside)==null?void 0:u.call(e,d)},a=d=>{var u;return(u=e.onInteractOutside)==null?void 0:u.call(e,d)},i=d=>{var f;const u=d.target;return!(u instanceof HTMLElement)||u.closest(`[${Mn}]`)||!Ue(o(),u)||Ue(t(),u)?!1:!((f=e.shouldExcludeElement)!=null&&f.call(e,u))},c=d=>{function u(){const f=t(),h=d.target;if(!f||!h||!i(d))return;const y=xe([l,a]);h.addEventListener(Do,y,{once:!0});const m=new CustomEvent(Do,{bubbles:!1,cancelable:!0,detail:{originalEvent:d,isContextMenu:d.button===2||Ul(d)&&d.button===0}});h.dispatchEvent(m)}d.pointerType==="touch"?(o().removeEventListener("click",u),r=u,o().addEventListener("click",u,{once:!0})):u()},g=d=>{const u=t(),f=d.target;if(!u||!f||!i(d))return;const h=xe([s,a]);f.addEventListener(Mo,h,{once:!0});const y=new CustomEvent(Mo,{bubbles:!1,cancelable:!0,detail:{originalEvent:d,isContextMenu:!1}});f.dispatchEvent(y)};V(()=>{D(e.isDisabled)||(n=window.setTimeout(()=>{o().addEventListener("pointerdown",c,!0)},0),o().addEventListener("focusin",g,!0),j(()=>{window.clearTimeout(n),o().removeEventListener("click",r),o().removeEventListener("pointerdown",c,!0),o().removeEventListener("focusin",g,!0)}))})}var _i=Se();function Wu(){return ke(_i)}function Qu(e){let t;const n=Wu(),[r,o]=ie(e,["ref","disableOutsidePointerEvents","excludedElements","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","bypassTopMostLayerCheck"]),l=new Set([]),s=d=>{l.add(d);const u=n==null?void 0:n.registerNestedLayer(d);return()=>{l.delete(d),u==null||u()}};ju({shouldExcludeElement:d=>{var u;return t?((u=r.excludedElements)==null?void 0:u.some(f=>Ue(f(),d)))||[...l].some(f=>Ue(f,d)):!1},onPointerDownOutside:d=>{var u,f,h;!t||Pe.isBelowPointerBlockingLayer(t)||!r.bypassTopMostLayerCheck&&!Pe.isTopMostLayer(t)||((u=r.onPointerDownOutside)==null||u.call(r,d),(f=r.onInteractOutside)==null||f.call(r,d),d.defaultPrevented||(h=r.onDismiss)==null||h.call(r))},onFocusOutside:d=>{var u,f,h;(u=r.onFocusOutside)==null||u.call(r,d),(f=r.onInteractOutside)==null||f.call(r,d),d.defaultPrevented||(h=r.onDismiss)==null||h.call(r)}},()=>t),Hu({ownerDocument:()=>tt(t),onEscapeKeyDown:d=>{var u;!t||!Pe.isTopMostLayer(t)||((u=r.onEscapeKeyDown)==null||u.call(r,d),!d.defaultPrevented&&r.onDismiss&&(d.preventDefault(),r.onDismiss()))}}),Pt(()=>{if(!t)return;Pe.addLayer({node:t,isPointerBlocking:r.disableOutsidePointerEvents,dismiss:r.onDismiss});const d=n==null?void 0:n.registerNestedLayer(t);Pe.assignPointerEventToLayers(),Pe.disableBodyPointerEvents(t),j(()=>{t&&(Pe.removeLayer(t),d==null||d(),Pe.assignPointerEventToLayers(),Pe.restoreBodyPointerEvents(t))})}),V(gt([()=>t,()=>r.disableOutsidePointerEvents],([d,u])=>{if(!d)return;const f=Pe.find(d);f&&f.isPointerBlocking!==u&&(f.isPointerBlocking=u,Pe.assignPointerEventToLayers()),u&&Pe.disableBodyPointerEvents(d),j(()=>{Pe.restoreBodyPointerEvents(d)})},{defer:!0}));const g={registerNestedLayer:s};return v(_i.Provider,{value:g,get children(){return v(fe,W({as:"div",ref(d){const u=Te(f=>t=f,r.ref);typeof u=="function"&&u(d)}},o))}})}function qi(e={}){const[t,n]=di({value:()=>D(e.open),defaultValue:()=>!!D(e.defaultOpen),onChange:s=>{var a;return(a=e.onOpenChange)==null?void 0:a.call(e,s)}}),r=()=>{n(!0)},o=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:o,toggle:()=>{t()?o():r()}}}var Ne={};qn(Ne,{Description:()=>ui,ErrorMessage:()=>ci,Item:()=>Bi,ItemControl:()=>Ni,ItemDescription:()=>Ui,ItemIndicator:()=>Vi,ItemInput:()=>Gi,ItemLabel:()=>Hi,Label:()=>ji,RadioGroup:()=>Yu,Root:()=>Wi});var zi=Se();function Ri(){const e=ke(zi);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Ki=Se();function bn(){const e=ke(Ki);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Bi(e){const t=hn(),n=Ri(),r=`${t.generateId("item")}-${Ge()}`,o=Z({id:r},e),[l,s]=ie(o,["value","disabled","onPointerDown"]),[a,i]=B(),[c,g]=B(),[d,u]=B(),[f,h]=B(),[y,m]=B(!1),b=M(()=>n.isSelectedValue(l.value)),p=M(()=>l.disabled||t.isDisabled()||!1),w=q=>{de(q,l.onPointerDown),y()&&q.preventDefault()},x=M(()=>be(te({},t.dataset()),{"data-disabled":p()?"":void 0,"data-checked":b()?"":void 0})),$={value:()=>l.value,dataset:x,isSelected:b,isDisabled:p,inputId:a,labelId:c,descriptionId:d,inputRef:f,select:()=>n.setSelectedValue(l.value),generateId:gn(()=>s.id),registerInput:Ve(i),registerLabel:Ve(g),registerDescription:Ve(u),setIsFocused:m,setInputRef:h};return v(Ki.Provider,{value:$,get children(){return v(fe,W({as:"div",role:"group",onPointerDown:w},x,s))}})}function Ni(e){const t=bn(),n=Z({id:t.generateId("control")},e),[r,o]=ie(n,["onClick","onKeyDown"]);return v(fe,W({as:"div",onClick:a=>{var i;de(a,r.onClick),t.select(),(i=t.inputRef())==null||i.focus()},onKeyDown:a=>{var i;de(a,r.onKeyDown),a.key===hr.Space&&(t.select(),(i=t.inputRef())==null||i.focus())}},()=>t.dataset(),o))}function Ui(e){const t=bn(),n=Z({id:t.generateId("description")},e);return V(()=>j(t.registerDescription(n.id))),v(fe,W({as:"div"},()=>t.dataset(),n))}function Vi(e){const t=bn(),n=Z({id:t.generateId("indicator")},e),[r,o]=ie(n,["ref","forceMount"]),[l,s]=B(),{present:a}=xi({show:()=>r.forceMount||t.isSelected(),element:()=>{var i;return(i=l())!=null?i:null}});return v(U,{get when(){return a()},get children(){return v(fe,W({as:"div",ref(i){const c=Te(s,r.ref);typeof c=="function"&&c(i)}},()=>t.dataset(),o))}})}function Gi(e){const t=hn(),n=Ri(),r=bn(),o=Z({id:r.generateId("input")},e),[l,s]=ie(o,["ref","style","aria-labelledby","aria-describedby","onChange","onFocus","onBlur"]),a=()=>[l["aria-labelledby"],r.labelId(),l["aria-labelledby"]!=null&&s["aria-label"]!=null?s.id:void 0].filter(Boolean).join(" ")||void 0,i=()=>[l["aria-describedby"],r.descriptionId(),n.ariaDescribedBy()].filter(Boolean).join(" ")||void 0,[c,g]=B(!1),d=h=>{if(de(h,l.onChange),h.stopPropagation(),!c()){n.setSelectedValue(r.value());const y=h.target;y.checked=r.isSelected()}g(!1)},u=h=>{de(h,l.onFocus),r.setIsFocused(!0)},f=h=>{de(h,l.onBlur),r.setIsFocused(!1)};return V(gt([()=>r.isSelected(),()=>r.value()],h=>{if(!h[0]&&h[1]===r.value())return;g(!0);const y=r.inputRef();y==null||y.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),y==null||y.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))},{defer:!0})),V(()=>j(r.registerInput(s.id))),v(fe,W({as:"input",ref(h){const y=Te(r.setInputRef,l.ref);typeof y=="function"&&y(h)},type:"radio",get name(){return t.name()},get value(){return r.value()},get checked(){return r.isSelected()},get required(){return t.isRequired()},get disabled(){return r.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return Ln(te({},li),l.style)},get"aria-labelledby"(){return a()},get"aria-describedby"(){return i()},onChange:d,onFocus:u,onBlur:f},()=>r.dataset(),s))}function Hi(e){const t=bn(),n=Z({id:t.generateId("label")},e);return V(()=>j(t.registerLabel(n.id))),v(fe,W({as:"label",get for(){return t.inputId()}},()=>t.dataset(),n))}function ji(e){return v(ia,W({as:"span"},e))}function Wi(e){let t;const n=`radiogroup-${Ge()}`,r=Z({id:n,orientation:"vertical"},e),[o,l,s]=ie(r,["ref","value","defaultValue","onChange","orientation","aria-labelledby","aria-describedby"],ra),[a,i]=yn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:h=>{var y;return(y=o.onChange)==null?void 0:y.call(o,h)}}),{formControlContext:c}=oa(l);sa(()=>t,()=>{var h;return i((h=o.defaultValue)!=null?h:"")});const g=()=>c.getAriaLabelledBy(D(l.id),s["aria-label"],o["aria-labelledby"]),d=()=>c.getAriaDescribedBy(o["aria-describedby"]),u=h=>h===a(),f={ariaDescribedBy:d,isSelectedValue:u,setSelectedValue:h=>{if(!(c.isReadOnly()||c.isDisabled())&&(i(h),t))for(const y of t.querySelectorAll("[type='radio']")){const m=y;m.checked=u(m.value)}}};return v(ai.Provider,{value:c,get children(){return v(zi.Provider,{value:f,get children(){return v(fe,W({as:"div",ref(h){const y=Te(m=>t=m,o.ref);typeof y=="function"&&y(h)},role:"radiogroup",get id(){return D(l.id)},get"aria-invalid"(){return c.validationState()==="invalid"||void 0},get"aria-required"(){return c.isRequired()||void 0},get"aria-disabled"(){return c.isDisabled()||void 0},get"aria-readonly"(){return c.isReadOnly()||void 0},get"aria-orientation"(){return o.orientation},get"aria-labelledby"(){return g()},get"aria-describedby"(){return d()}},()=>c.dataset(),s))}})}})}var Yu=Object.assign(Wi,{Description:ui,ErrorMessage:ci,Item:Bi,ItemControl:Ni,ItemDescription:Ui,ItemIndicator:Vi,ItemInput:Gi,ItemLabel:Hi,Label:ji}),Xu=class{constructor(e,t,n){ze(this,"collection");ze(this,"ref");ze(this,"collator");this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){const n=this.collection().getItem(t);if(n&&n.type==="item"&&!n.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){const n=this.collection().getItem(t);if(n&&n.type==="item"&&!n.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){const t=this.collection().getItem(e);if(t&&t.type==="item"&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){const t=this.collection().getItem(e);if(t&&t.type==="item"&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){var t,n,r;return(r=(n=(t=this.ref)==null?void 0:t.call(this))==null?void 0:n.querySelector(`[data-key="${e}"]`))!=null?r:null}getKeyPageAbove(e){var l;const t=(l=this.ref)==null?void 0:l.call(this);let n=this.getItem(e);if(!t||!n)return;const r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop>r;)o=this.getKeyAbove(o),n=o!=null?this.getItem(o):null;return o}getKeyPageBelow(e){var l;const t=(l=this.ref)==null?void 0:l.call(this);let n=this.getItem(e);if(!t||!n)return;const r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop<r;)o=this.getKeyBelow(o),n=o!=null?this.getItem(o):null;return o}getKeyForSearch(e,t){var o;const n=(o=this.collator)==null?void 0:o.call(this);if(!n)return;let r=t!=null?this.getKeyBelow(t):this.getFirstKey();for(;r!=null;){const l=this.collection().getItem(r);if(l){const s=l.textValue.slice(0,e.length);if(l.textValue&&n.compare(s,e)===0)return r}r=this.getKeyBelow(r)}}};function Zu(e,t,n){const r=Da({usage:"search",sensitivity:"base"}),o=M(()=>{const l=D(e.keyboardDelegate);return l||new Xu(e.collection,t,r)});return La({selectionManager:()=>D(e.selectionManager),keyboardDelegate:o,autoFocus:()=>D(e.autoFocus),deferAutoFocus:()=>D(e.deferAutoFocus),shouldFocusWrap:()=>D(e.shouldFocusWrap),disallowEmptySelection:()=>D(e.disallowEmptySelection),selectOnFocus:()=>D(e.selectOnFocus),disallowTypeAhead:()=>D(e.disallowTypeAhead),shouldUseVirtualFocus:()=>D(e.shouldUseVirtualFocus),allowsTabNavigation:()=>D(e.allowsTabNavigation),isVirtualized:()=>D(e.isVirtualized),scrollToKey:l=>{var s;return(s=D(e.scrollToKey))==null?void 0:s(l)},orientation:()=>D(e.orientation)},t)}var Qn="focusScope.autoFocusOnMount",Yn="focusScope.autoFocusOnUnmount",Ao={bubbles:!1,cancelable:!0},Fo={stack:[],active(){return this.stack[0]},add(e){var t;e!==this.active()&&((t=this.active())==null||t.pause()),this.stack=nr(this.stack,e),this.stack.unshift(e)},remove(e){var t;this.stack=nr(this.stack,e),(t=this.active())==null||t.resume()}};function Ju(e,t){const[n,r]=B(!1),o={pause(){r(!0)},resume(){r(!1)}};let l=null;const s=h=>{var y;return(y=e.onMountAutoFocus)==null?void 0:y.call(e,h)},a=h=>{var y;return(y=e.onUnmountAutoFocus)==null?void 0:y.call(e,h)},i=()=>tt(t()),c=()=>{const h=i().createElement("span");return h.setAttribute("data-focus-trap",""),h.tabIndex=0,Object.assign(h.style,li),h},g=()=>{const h=t();return h?ii(h,!0).filter(y=>!y.hasAttribute("data-focus-trap")):[]},d=()=>{const h=g();return h.length>0?h[0]:null},u=()=>{const h=g();return h.length>0?h[h.length-1]:null},f=()=>{const h=t();if(!h)return!1;const y=on(h);return!y||Ue(h,y)?!1:si(y)};V(()=>{const h=t();if(!h)return;Fo.add(o);const y=on(h);if(!Ue(h,y)){const b=new CustomEvent(Qn,Ao);h.addEventListener(Qn,s),h.dispatchEvent(b),b.defaultPrevented||setTimeout(()=>{Ae(d()),on(h)===y&&Ae(h)},0)}j(()=>{h.removeEventListener(Qn,s),setTimeout(()=>{const b=new CustomEvent(Yn,Ao);f()&&b.preventDefault(),h.addEventListener(Yn,a),h.dispatchEvent(b),b.defaultPrevented||Ae(y!=null?y:i().body),h.removeEventListener(Yn,a),Fo.remove(o)},0)})}),V(()=>{const h=t();if(!h||!D(e.trapFocus)||n())return;const y=b=>{const p=b.target;p!=null&&p.closest(`[${Mn}]`)||(Ue(h,p)?l=p:Ae(l))},m=b=>{const p=b.relatedTarget,w=p!=null?p:on(h);w!=null&&w.closest(`[${Mn}]`)||Ue(h,w)||Ae(l)};i().addEventListener("focusin",y),i().addEventListener("focusout",m),j(()=>{i().removeEventListener("focusin",y),i().removeEventListener("focusout",m)})}),V(()=>{const h=t();if(!h||!D(e.trapFocus)||n())return;const y=c();h.insertAdjacentElement("afterbegin",y);const m=c();h.insertAdjacentElement("beforeend",m);function b(w){const x=d(),$=u();w.relatedTarget===x?Ae($):Ae(x)}y.addEventListener("focusin",b),m.addEventListener("focusin",b);const p=new MutationObserver(w=>{for(const x of w)x.previousSibling===m&&(m.remove(),h.insertAdjacentElement("beforeend",m)),x.nextSibling===y&&(y.remove(),h.insertAdjacentElement("afterbegin",y))});p.observe(h,{childList:!0,subtree:!1}),j(()=>{y.removeEventListener("focusin",b),m.removeEventListener("focusin",b),y.remove(),m.remove(),p.disconnect()})})}var ec="data-live-announcer";function tc(e){V(()=>{D(e.isDisabled)||j(nc(D(e.targets),D(e.root)))})}var nn=new WeakMap,Be=[];function nc(e,t=document.body){const n=new Set(e),r=new Set,o=i=>{for(const u of i.querySelectorAll(`[${ec}], [${Mn}]`))n.add(u);const c=u=>{if(n.has(u)||u.parentElement&&r.has(u.parentElement)&&u.parentElement.getAttribute("role")!=="row")return NodeFilter.FILTER_REJECT;for(const f of n)if(u.contains(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},g=document.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,{acceptNode:c}),d=c(i);if(d===NodeFilter.FILTER_ACCEPT&&l(i),d!==NodeFilter.FILTER_REJECT){let u=g.nextNode();for(;u!=null;)l(u),u=g.nextNode()}},l=i=>{var g;const c=(g=nn.get(i))!=null?g:0;i.getAttribute("aria-hidden")==="true"&&c===0||(c===0&&i.setAttribute("aria-hidden","true"),r.add(i),nn.set(i,c+1))};Be.length&&Be[Be.length-1].disconnect(),o(t);const s=new MutationObserver(i=>{for(const c of i)if(!(c.type!=="childList"||c.addedNodes.length===0)&&![...n,...r].some(g=>g.contains(c.target))){for(const g of c.removedNodes)g instanceof Element&&(n.delete(g),r.delete(g));for(const g of c.addedNodes)(g instanceof HTMLElement||g instanceof SVGElement)&&(g.dataset.liveAnnouncer==="true"||g.dataset.reactAriaTopLayer==="true")?n.add(g):g instanceof Element&&o(g)}});s.observe(t,{childList:!0,subtree:!0});const a={observe(){s.observe(t,{childList:!0,subtree:!0})},disconnect(){s.disconnect()}};return Be.push(a),()=>{s.disconnect();for(const i of r){const c=nn.get(i);if(c==null)return;c===1?(i.removeAttribute("aria-hidden"),nn.delete(i)):nn.set(i,c-1)}a===Be[Be.length-1]?(Be.pop(),Be.length&&Be[Be.length-1].observe()):Be.splice(Be.indexOf(a),1)}}var kn=new Map,rc=e=>{V(()=>{var l,s;const t=(l=Me(e.style))!=null?l:{},n=(s=Me(e.properties))!=null?s:[],r={};for(const a in t)r[a]=e.element.style[a];const o=kn.get(e.key);o?o.activeCount++:kn.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(a=>a.key)}),Object.assign(e.element.style,e.style);for(const a of n)e.element.style.setProperty(a.key,a.value);j(()=>{var i;const a=kn.get(e.key);if(a){if(a.activeCount!==1){a.activeCount--;return}kn.delete(e.key);for(const[c,g]of Object.entries(a.originalStyles))e.element.style[c]=g;for(const c of a.properties)e.element.style.removeProperty(c);e.element.style.length===0&&e.element.removeAttribute("style"),(i=e.cleanup)==null||i.call(e)}})})},To=rc,oc=(e,t)=>{switch(t){case"x":return[e.clientWidth,e.scrollLeft,e.scrollWidth];case"y":return[e.clientHeight,e.scrollTop,e.scrollHeight]}},ic=(e,t)=>{const n=getComputedStyle(e),r=t==="x"?n.overflowX:n.overflowY;return r==="auto"||r==="scroll"||e.tagName==="HTML"&&r==="visible"},sc=(e,t,n)=>{var i;const r=t==="x"&&window.getComputedStyle(e).direction==="rtl"?-1:1;let o=e,l=0,s=0,a=!1;do{const[c,g,d]=oc(o,t),u=d-c-r*g;(g!==0||u!==0)&&ic(o,t)&&(l+=u,s+=g),o===(n!=null?n:document.documentElement)?a=!0:o=(i=o._$host)!=null?i:o.parentElement}while(o&&!a);return[l,s]},[Io,Po]=B([]),lc=e=>Io().indexOf(e)===Io().length-1,ac=e=>{const t=W({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:"padding",restoreScrollPosition:!0,allowPinchZoom:!1},e),n=Ge();let r=[0,0],o=null,l=null;V(()=>{Me(t.enabled)&&(Po(c=>[...c,n]),j(()=>{Po(c=>c.filter(g=>g!==n))}))}),V(()=>{if(!Me(t.enabled)||!Me(t.hideScrollbar))return;const{body:c}=document,g=window.innerWidth-c.offsetWidth;if(Me(t.preventScrollbarShift)){const d={overflow:"hidden"},u=[];g>0&&(Me(t.preventScrollbarShiftMode)==="padding"?d.paddingRight=`calc(${window.getComputedStyle(c).paddingRight} + ${g}px)`:d.marginRight=`calc(${window.getComputedStyle(c).marginRight} + ${g}px)`,u.push({key:"--scrollbar-width",value:`${g}px`}));const f=window.scrollY,h=window.scrollX;To({key:"prevent-scroll",element:c,style:d,properties:u,cleanup:()=>{Me(t.restoreScrollPosition)&&g>0&&window.scrollTo(h,f)}})}else To({key:"prevent-scroll",element:c,style:{overflow:"hidden"}})}),V(()=>{!lc(n)||!Me(t.enabled)||(document.addEventListener("wheel",a,{passive:!1}),document.addEventListener("touchstart",s,{passive:!1}),document.addEventListener("touchmove",i,{passive:!1}),j(()=>{document.removeEventListener("wheel",a),document.removeEventListener("touchstart",s),document.removeEventListener("touchmove",i)}))});const s=c=>{r=Lo(c),o=null,l=null},a=c=>{const g=c.target,d=Me(t.element),u=uc(c),f=Math.abs(u[0])>Math.abs(u[1])?"x":"y",h=f==="x"?u[0]:u[1],y=Oo(g,f,h,d);let m;d&&ur(d,g)?m=!y:m=!0,m&&c.cancelable&&c.preventDefault()},i=c=>{const g=Me(t.element),d=c.target;let u;if(c.touches.length===2)u=!Me(t.allowPinchZoom);else{if(o==null||l===null){const f=Lo(c).map((y,m)=>r[m]-y),h=Math.abs(f[0])>Math.abs(f[1])?"x":"y";o=h,l=h==="x"?f[0]:f[1]}if(d.type==="range")u=!1;else{const f=Oo(d,o,l,g);g&&ur(g,d)?u=!f:u=!0}}u&&c.cancelable&&c.preventDefault()}},uc=e=>[e.deltaX,e.deltaY],Lo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Oo=(e,t,n,r)=>{const o=r!==null&&ur(r,e),[l,s]=sc(e,t,o?r:void 0);return!(n>0&&Math.abs(l)<=1||n<0&&Math.abs(s)<1)},ur=(e,t)=>{var r;if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=(r=n._$host)!=null?r:n.parentElement}return!1},cc=ac,dc=cc,Qi=Se();function Yi(){return ke(Qi)}function mt(){const e=Yi();if(e===void 0)throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var Xi=Se();function Mr(){const e=ke(Xi);if(e===void 0)throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var Zi=Se();function rt(){const e=ke(Zi);if(e===void 0)throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function Ar(e){let t;const n=rt(),r=mt(),o=Z({id:n.generateId(`item-${Ge()}`)},e),[l,s]=ie(o,["ref","textValue","disabled","closeOnSelect","checked","indeterminate","onSelect","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),[a,i]=B(),[c,g]=B(),[d,u]=B(),f=()=>r.listState().selectionManager(),h=()=>s.id,y=()=>f().focusedKey()===h(),m=()=>{var C;(C=l.onSelect)==null||C.call(l),l.closeOnSelect&&setTimeout(()=>{r.close(!0)})};pa({getItem:()=>{var C,E,O,z,Y;return{ref:()=>t,type:"item",key:h(),textValue:(z=(O=(E=l.textValue)!=null?E:(C=d())==null?void 0:C.textContent)!=null?O:t==null?void 0:t.textContent)!=null?z:"",disabled:(Y=l.disabled)!=null?Y:!1}}});const b=wi({key:h,selectionManager:f,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>t),p=C=>{de(C,l.onPointerMove),C.pointerType==="mouse"&&(l.disabled?r.onItemLeave(C):(r.onItemEnter(C),C.defaultPrevented||(Ae(C.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(h()))))},w=C=>{de(C,l.onPointerLeave),C.pointerType==="mouse"&&r.onItemLeave(C)},x=C=>{de(C,l.onPointerUp),!l.disabled&&C.button===0&&m()},$=C=>{if(de(C,l.onKeyDown),!C.repeat&&!l.disabled)switch(C.key){case"Enter":case" ":m();break}},q=M(()=>{if(l.indeterminate)return"mixed";if(l.checked!=null)return l.checked}),A=M(()=>({"data-indeterminate":l.indeterminate?"":void 0,"data-checked":l.checked&&!l.indeterminate?"":void 0,"data-disabled":l.disabled?"":void 0,"data-highlighted":y()?"":void 0})),K={isChecked:()=>l.checked,dataset:A,setLabelRef:u,generateId:gn(()=>s.id),registerLabel:Ve(i),registerDescription:Ve(g)};return v(Xi.Provider,{value:K,get children(){return v(fe,W({as:"div",ref(C){const E=Te(O=>t=O,l.ref);typeof E=="function"&&E(C)},get tabIndex(){return b.tabIndex()},get"aria-checked"(){return q()},get"aria-disabled"(){return l.disabled},get"aria-labelledby"(){return a()},get"aria-describedby"(){return c()},get"data-key"(){return b.dataKey()},get onPointerDown(){return xe([l.onPointerDown,b.onPointerDown])},get onPointerUp(){return xe([x,b.onPointerUp])},get onClick(){return xe([l.onClick,b.onClick])},get onKeyDown(){return xe([$,b.onKeyDown])},get onMouseDown(){return xe([l.onMouseDown,b.onMouseDown])},get onFocus(){return xe([l.onFocus,b.onFocus])},onPointerMove:p,onPointerLeave:w},A,s))}})}function Ji(e){const t=Z({closeOnSelect:!1},e),[n,r]=ie(t,["checked","defaultChecked","onChange","onSelect"]),o=ca({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:s=>{var a;return(a=n.onChange)==null?void 0:a.call(n,s)},isDisabled:()=>r.disabled});return v(Ar,W({role:"menuitemcheckbox",get checked(){return o.isSelected()},onSelect:()=>{var s;(s=n.onSelect)==null||s.call(n),o.toggle()}},r))}var fc=Se();function Kn(){return ke(fc)}var dn={next:(e,t)=>e==="ltr"?t==="horizontal"?"ArrowRight":"ArrowDown":t==="horizontal"?"ArrowLeft":"ArrowUp",previous:(e,t)=>dn.next(e==="ltr"?"rtl":"ltr",t)},_o={first:e=>e==="horizontal"?"ArrowDown":"ArrowRight",last:e=>e==="horizontal"?"ArrowUp":"ArrowLeft"};function es(e){const t=rt(),n=mt(),r=Kn(),{direction:o}=kt(),l=Z({id:t.generateId("trigger")},e),[s,a]=ie(l,["ref","id","disabled","onPointerDown","onClick","onKeyDown","onMouseOver","onFocus"]);let i=()=>t.value();r!==void 0&&(i=()=>{var b;return(b=t.value())!=null?b:s.id},r.lastValue()===void 0&&r.setLastValue(i));const c=_n(()=>n.triggerRef(),()=>"button"),g=M(()=>{var b;return c()==="a"&&((b=n.triggerRef())==null?void 0:b.getAttribute("href"))!=null});V(gt(()=>r==null?void 0:r.value(),b=>{var p;g()&&b===i()&&((p=n.triggerRef())==null||p.focus())}));const d=()=>{r!==void 0?n.isOpen()?r.value()===i()&&r.closeMenu():(r.autoFocusMenu()||r.setAutoFocusMenu(!0),n.open(!1)):n.toggle(!0)},u=b=>{de(b,s.onPointerDown),b.currentTarget.dataset.pointerType=b.pointerType,!s.disabled&&b.pointerType!=="touch"&&b.button===0&&d()},f=b=>{de(b,s.onClick),s.disabled||b.currentTarget.dataset.pointerType==="touch"&&d()},h=b=>{if(de(b,s.onKeyDown),!s.disabled){if(g())switch(b.key){case"Enter":case" ":return}switch(b.key){case"Enter":case" ":case _o.first(t.orientation()):b.stopPropagation(),b.preventDefault(),na(b.currentTarget),n.open("first"),r==null||r.setAutoFocusMenu(!0),r==null||r.setValue(i);break;case _o.last(t.orientation()):b.stopPropagation(),b.preventDefault(),n.open("last");break;case dn.next(o(),t.orientation()):if(r===void 0)break;b.stopPropagation(),b.preventDefault(),r.nextMenu();break;case dn.previous(o(),t.orientation()):if(r===void 0)break;b.stopPropagation(),b.preventDefault(),r.previousMenu();break}}},y=b=>{var p;de(b,s.onMouseOver),((p=n.triggerRef())==null?void 0:p.dataset.pointerType)!=="touch"&&!s.disabled&&r!==void 0&&r.value()!==void 0&&r.setValue(i)},m=b=>{de(b,s.onFocus),r!==void 0&&b.currentTarget.dataset.pointerType!=="touch"&&r.setValue(i)};return V(()=>j(n.registerTriggerId(s.id))),v(pr,W({ref(b){const p=Te(n.setTriggerRef,s.ref);typeof p=="function"&&p(b)},get"data-kb-menu-value-trigger"(){return t.value()},get id(){return s.id},get disabled(){return s.disabled},"aria-haspopup":"true",get"aria-expanded"(){return n.isOpen()},get"aria-controls"(){return M(()=>!!n.isOpen())()?n.contentId():void 0},get"data-highlighted"(){return i()!==void 0&&(r==null?void 0:r.value())===i()?!0:void 0},get tabIndex(){return r!==void 0?r.value()===i()||r.lastValue()===i()?0:-1:void 0},onPointerDown:u,onMouseOver:y,onClick:f,onKeyDown:h,onFocus:m,role:r!==void 0?"menuitem":void 0},()=>n.dataset(),a))}var gc=Se();function ts(){return ke(gc)}function ns(e){let t;const n=rt(),r=mt(),o=Kn(),l=ts(),{direction:s}=kt(),a=Z({id:n.generateId(`content-${Ge()}`)},e),[i,c]=ie(a,["ref","id","style","onOpenAutoFocus","onCloseAutoFocus","onEscapeKeyDown","onFocusOutside","onPointerEnter","onPointerMove","onKeyDown","onMouseDown","onFocusIn","onFocusOut"]);let g=0;const d=()=>r.parentMenuContext()==null&&o===void 0&&n.isModal(),u=Zu({selectionManager:r.listState().selectionManager,collection:r.listState().collection,autoFocus:r.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!r.listState().selectionManager().isFocused(),orientation:()=>n.orientation()==="horizontal"?"vertical":"horizontal"},()=>t);Ju({trapFocus:()=>d()&&r.isOpen(),onMountAutoFocus:w=>{var x;o===void 0&&((x=i.onOpenAutoFocus)==null||x.call(i,w))},onUnmountAutoFocus:i.onCloseAutoFocus},()=>t);const f=w=>{if(Ue(w.currentTarget,w.target)&&(w.key==="Tab"&&r.isOpen()&&w.preventDefault(),o!==void 0&&w.currentTarget.getAttribute("aria-haspopup")!=="true"))switch(w.key){case dn.next(s(),n.orientation()):w.stopPropagation(),w.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case dn.previous(s(),n.orientation()):if(w.currentTarget.hasAttribute("data-closed"))break;w.stopPropagation(),w.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.previousMenu();break}},h=w=>{var x;(x=i.onEscapeKeyDown)==null||x.call(i,w),o==null||o.setAutoFocusMenu(!1),r.close(!0)},y=w=>{var x;(x=i.onFocusOutside)==null||x.call(i,w),n.isModal()&&w.preventDefault()},m=w=>{var x,$;de(w,i.onPointerEnter),r.isOpen()&&((x=r.parentMenuContext())==null||x.listState().selectionManager().setFocused(!1),($=r.parentMenuContext())==null||$.listState().selectionManager().setFocusedKey(void 0))},b=w=>{if(de(w,i.onPointerMove),w.pointerType!=="mouse")return;const x=w.target,$=g!==w.clientX;Ue(w.currentTarget,x)&&$&&(r.setPointerDir(w.clientX>g?"right":"left"),g=w.clientX)};V(()=>j(r.registerContentId(i.id)));const p={ref:Te(w=>{r.setContentRef(w),t=w},i.ref),role:"menu",get id(){return i.id},get tabIndex(){return u.tabIndex()},get"aria-labelledby"(){return r.triggerId()},onKeyDown:xe([i.onKeyDown,u.onKeyDown,f]),onMouseDown:xe([i.onMouseDown,u.onMouseDown]),onFocusIn:xe([i.onFocusIn,u.onFocusIn]),onFocusOut:xe([i.onFocusOut,u.onFocusOut]),onPointerEnter:m,onPointerMove:b,get"data-orientation"(){return n.orientation()}};return v(U,{get when(){return r.contentPresent()},get children(){return v(U,{get when(){return l===void 0||r.parentMenuContext()!=null},get fallback(){return v(fe,W({as:"div"},()=>r.dataset(),p,c))},get children(){return v(Oi.Positioner,{get children(){return v(Qu,W({get disableOutsidePointerEvents(){return M(()=>!!d())()&&r.isOpen()},get excludedElements(){return[r.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return Ln({"--kb-menu-content-transform-origin":"var(--kb-popper-content-transform-origin)",position:"relative"},i.style)},onEscapeKeyDown:h,onFocusOutside:y,get onDismiss(){return r.close}},()=>r.dataset(),p,c))}})}})}})}function hc(e){let t;const n=rt(),r=mt(),[o,l]=ie(e,["ref"]);return dc({element:()=>t!=null?t:null,enabled:()=>r.contentPresent()&&n.preventScroll()}),v(ns,W({ref(s){const a=Te(i=>{t=i},o.ref);typeof a=="function"&&a(s)}},l))}var rs=Se();function yc(){const e=ke(rs);if(e===void 0)throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Fr(e){const t=rt(),n=Z({id:t.generateId(`group-${Ge()}`)},e),[r,o]=B(),l={generateId:gn(()=>n.id),registerLabelId:Ve(o)};return v(rs.Provider,{value:l,get children(){return v(fe,W({as:"div",role:"group",get"aria-labelledby"(){return r()}},n))}})}function os(e){const t=yc(),n=Z({id:t.generateId("label")},e),[r,o]=ie(n,["id"]);return V(()=>j(t.registerLabelId(r.id))),v(fe,W({as:"span",get id(){return r.id},"aria-hidden":"true"},o))}function is(e){const t=mt(),n=Z({children:"▼"},e);return v(fe,W({as:"span","aria-hidden":"true"},()=>t.dataset(),n))}function ss(e){return v(Ar,W({role:"menuitem",closeOnSelect:!0},e))}function ls(e){const t=Mr(),n=Z({id:t.generateId("description")},e),[r,o]=ie(n,["id"]);return V(()=>j(t.registerDescription(r.id))),v(fe,W({as:"div",get id(){return r.id}},()=>t.dataset(),o))}function as(e){const t=Mr(),n=Z({id:t.generateId("indicator")},e),[r,o]=ie(n,["forceMount"]);return v(U,{get when(){return r.forceMount||t.isChecked()},get children(){return v(fe,W({as:"div"},()=>t.dataset(),o))}})}function us(e){const t=Mr(),n=Z({id:t.generateId("label")},e),[r,o]=ie(n,["ref","id"]);return V(()=>j(t.registerLabel(r.id))),v(fe,W({as:"div",ref(l){const s=Te(t.setLabelRef,r.ref);typeof s=="function"&&s(l)},get id(){return r.id}},()=>t.dataset(),o))}function cs(e){const t=mt();return v(U,{get when(){return t.contentPresent()},get children(){return v(jo,e)}})}var ds=Se();function mc(){const e=ke(ds);if(e===void 0)throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function fs(e){const n=rt().generateId(`radiogroup-${Ge()}`),r=Z({id:n},e),[o,l]=ie(r,["value","defaultValue","onChange","disabled"]),[s,a]=yn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:c=>{var g;return(g=o.onChange)==null?void 0:g.call(o,c)}}),i={isDisabled:()=>o.disabled,isSelectedValue:c=>c===s(),setSelectedValue:a};return v(ds.Provider,{value:i,get children(){return v(Fr,l)}})}function gs(e){const t=mc(),n=Z({closeOnSelect:!1},e),[r,o]=ie(n,["value","onSelect"]);return v(Ar,W({role:"menuitemradio",get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{var s;(s=r.onSelect)==null||s.call(r),t.setSelectedValue(r.value)}},o))}function bc(e,t,n){const r=e.split("-")[0],o=n.getBoundingClientRect(),l=[],s=t.clientX,a=t.clientY;switch(r){case"top":l.push([s,a+5]),l.push([o.left,o.bottom]),l.push([o.left,o.top]),l.push([o.right,o.top]),l.push([o.right,o.bottom]);break;case"right":l.push([s-5,a]),l.push([o.left,o.top]),l.push([o.right,o.top]),l.push([o.right,o.bottom]),l.push([o.left,o.bottom]);break;case"bottom":l.push([s,a-5]),l.push([o.right,o.top]),l.push([o.right,o.bottom]),l.push([o.left,o.bottom]),l.push([o.left,o.top]);break;case"left":l.push([s+5,a]),l.push([o.right,o.bottom]),l.push([o.left,o.bottom]),l.push([o.left,o.top]),l.push([o.right,o.top]);break}return l}function vc(e,t){return t?ta([e.clientX,e.clientY],t):!1}function hs(e){const t=rt(),n=gi(),r=Yi(),o=Kn(),l=ts(),s=Z({placement:t.orientation()==="horizontal"?"bottom-start":"right-start"},e),[a,i]=ie(s,["open","defaultOpen","onOpenChange"]);let c=0,g=null,d="right";const[u,f]=B(),[h,y]=B(),[m,b]=B(),[p,w]=B(),[x,$]=B(!0),[q,A]=B(i.placement),[K,C]=B([]),[E,O]=B([]),{DomCollectionProvider:z}=va({items:E,onItemsChange:O}),Y=qi({open:()=>a.open,defaultOpen:()=>a.defaultOpen,onOpenChange:G=>{var Ee;return(Ee=a.onOpenChange)==null?void 0:Ee.call(a,G)}}),{present:me}=xi({show:()=>t.forceMount()||Y.isOpen(),element:()=>{var G;return(G=p())!=null?G:null}}),J=_a({selectionMode:"none",dataSource:E}),R=G=>{$(G),Y.open()},X=(G=!1)=>{Y.close(),G&&r&&r.close(!0)},ee=G=>{$(G),Y.toggle()},ye=()=>{const G=p();G&&(Ae(G),J.selectionManager().setFocused(!0),J.selectionManager().setFocusedKey(void 0))},le=()=>{l!=null?setTimeout(()=>ye()):ye()},ge=G=>{C(De=>[...De,G]);const Ee=r==null?void 0:r.registerNestedMenu(G);return()=>{C(De=>nr(De,G)),Ee==null||Ee()}},he=G=>d===(g==null?void 0:g.side)&&vc(G,g==null?void 0:g.area),Fe=G=>{he(G)&&G.preventDefault()},F=G=>{he(G)||le()},ae=G=>{he(G)&&G.preventDefault()};tc({isDisabled:()=>!(r==null&&Y.isOpen()&&t.isModal()),targets:()=>[p(),...K()].filter(Boolean)}),V(()=>{const G=p();if(!G||!r)return;const Ee=r.registerNestedMenu(G);j(()=>{Ee()})}),V(()=>{r===void 0&&(o==null||o.registerMenu(t.value(),[p(),...K()]))}),V(()=>{var G;r!==void 0||o===void 0||(o.value()===t.value()?((G=m())==null||G.focus(),o.autoFocusMenu()&&R(!0)):X())}),V(()=>{r!==void 0||o===void 0||Y.isOpen()&&o.setValue(t.value())}),j(()=>{r===void 0&&(o==null||o.unregisterMenu(t.value()))});const bt={dataset:M(()=>({"data-expanded":Y.isOpen()?"":void 0,"data-closed":Y.isOpen()?void 0:""})),isOpen:Y.isOpen,contentPresent:me,nestedMenus:K,currentPlacement:q,pointerGraceTimeoutId:()=>c,autoFocus:x,listState:()=>J,parentMenuContext:()=>r,triggerRef:m,contentRef:p,triggerId:u,contentId:h,setTriggerRef:b,setContentRef:w,open:R,close:X,toggle:ee,focusContent:le,onItemEnter:Fe,onItemLeave:F,onTriggerLeave:ae,setPointerDir:G=>d=G,setPointerGraceTimeoutId:G=>c=G,setPointerGraceIntent:G=>g=G,registerNestedMenu:ge,registerItemToParentDomCollection:n==null?void 0:n.registerItem,registerTriggerId:Ve(f),registerContentId:Ve(y)};return v(z,{get children(){return v(Qi.Provider,{value:bt,get children(){return v(U,{when:l===void 0,get fallback(){return i.children},get children(){return v(Oi,W({anchorRef:m,contentRef:p,onCurrentPlacementChange:A},i))}})}})}})}function ys(e){const{direction:t}=kt();return v(hs,W({get placement(){return t()==="rtl"?"left-start":"right-start"},flip:!0},e))}var pc={close:(e,t)=>e==="ltr"?[t==="horizontal"?"ArrowLeft":"ArrowUp"]:[t==="horizontal"?"ArrowRight":"ArrowDown"]};function ms(e){const t=mt(),n=rt(),[r,o]=ie(e,["onFocusOutside","onKeyDown"]),{direction:l}=kt();return v(ns,W({onOpenAutoFocus:g=>{g.preventDefault()},onCloseAutoFocus:g=>{g.preventDefault()},onFocusOutside:g=>{var u;(u=r.onFocusOutside)==null||u.call(r,g);const d=g.target;Ue(t.triggerRef(),d)||t.close()},onKeyDown:g=>{de(g,r.onKeyDown);const d=Ue(g.currentTarget,g.target),u=pc.close(l(),n.orientation()).includes(g.key),f=t.parentMenuContext()!=null;d&&u&&f&&(t.close(),Ae(t.triggerRef()))}},o))}var qo=["Enter"," "],wc={open:(e,t)=>e==="ltr"?[...qo,t==="horizontal"?"ArrowRight":"ArrowDown"]:[...qo,t==="horizontal"?"ArrowLeft":"ArrowUp"]};function bs(e){let t;const n=rt(),r=mt(),o=Z({id:n.generateId(`sub-trigger-${Ge()}`)},e),[l,s]=ie(o,["ref","id","textValue","disabled","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]);let a=null;const i=()=>{a&&window.clearTimeout(a),a=null},{direction:c}=kt(),g=()=>l.id,d=()=>{const w=r.parentMenuContext();if(w==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return w.listState().selectionManager()},u=()=>r.listState().collection(),f=()=>d().focusedKey()===g(),h=wi({key:g,selectionManager:d,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>t),y=w=>{de(w,l.onClick),!r.isOpen()&&!l.disabled&&r.open(!0)},m=w=>{var $;if(de(w,l.onPointerMove),w.pointerType!=="mouse")return;const x=r.parentMenuContext();if(x==null||x.onItemEnter(w),!w.defaultPrevented){if(l.disabled){x==null||x.onItemLeave(w);return}!r.isOpen()&&!a&&(($=r.parentMenuContext())==null||$.setPointerGraceIntent(null),a=window.setTimeout(()=>{r.open(!1),i()},100)),x==null||x.onItemEnter(w),w.defaultPrevented||(r.listState().selectionManager().isFocused()&&(r.listState().selectionManager().setFocused(!1),r.listState().selectionManager().setFocusedKey(void 0)),Ae(w.currentTarget),x==null||x.listState().selectionManager().setFocused(!0),x==null||x.listState().selectionManager().setFocusedKey(g()))}},b=w=>{if(de(w,l.onPointerLeave),w.pointerType!=="mouse")return;i();const x=r.parentMenuContext(),$=r.contentRef();if($){x==null||x.setPointerGraceIntent({area:bc(r.currentPlacement(),w,$),side:r.currentPlacement().split("-")[0]}),window.clearTimeout(x==null?void 0:x.pointerGraceTimeoutId());const q=window.setTimeout(()=>{x==null||x.setPointerGraceIntent(null)},300);x==null||x.setPointerGraceTimeoutId(q)}else{if(x==null||x.onTriggerLeave(w),w.defaultPrevented)return;x==null||x.setPointerGraceIntent(null)}x==null||x.onItemLeave(w)},p=w=>{de(w,l.onKeyDown),!w.repeat&&(l.disabled||wc.open(c(),n.orientation()).includes(w.key)&&(w.stopPropagation(),w.preventDefault(),d().setFocused(!1),d().setFocusedKey(void 0),r.isOpen()||r.open("first"),r.focusContent(),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(u().getFirstKey())))};return V(()=>{var x,$,q;if(r.registerItemToParentDomCollection==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");const w=r.registerItemToParentDomCollection({ref:()=>t,type:"item",key:g(),textValue:($=(x=l.textValue)!=null?x:t==null?void 0:t.textContent)!=null?$:"",disabled:(q=l.disabled)!=null?q:!1});j(w)}),V(gt(()=>{var w;return(w=r.parentMenuContext())==null?void 0:w.pointerGraceTimeoutId()},w=>{j(()=>{var x;window.clearTimeout(w),(x=r.parentMenuContext())==null||x.setPointerGraceIntent(null)})})),V(()=>j(r.registerTriggerId(l.id))),j(()=>{i()}),v(fe,W({as:"div",ref(w){const x=Te($=>{r.setTriggerRef($),t=$},l.ref);typeof x=="function"&&x(w)},get id(){return l.id},role:"menuitem",get tabIndex(){return h.tabIndex()},"aria-haspopup":"true",get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return M(()=>!!r.isOpen())()?r.contentId():void 0},get"aria-disabled"(){return l.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return f()?"":void 0},get"data-disabled"(){return l.disabled?"":void 0},get onPointerDown(){return xe([l.onPointerDown,h.onPointerDown])},get onPointerUp(){return xe([l.onPointerUp,h.onPointerUp])},get onClick(){return xe([y,h.onClick])},get onKeyDown(){return xe([p,h.onKeyDown])},get onMouseDown(){return xe([l.onMouseDown,h.onMouseDown])},get onFocus(){return xe([l.onFocus,h.onFocus])},onPointerMove:m,onPointerLeave:b},()=>r.dataset(),s))}function xc(e){const t=Kn(),n=`menu-${Ge()}`,r=Z({id:n,modal:!0},e),[o,l]=ie(r,["id","modal","preventScroll","forceMount","open","defaultOpen","onOpenChange","value","orientation"]),s=qi({open:()=>o.open,defaultOpen:()=>o.defaultOpen,onOpenChange:i=>{var c;return(c=o.onOpenChange)==null?void 0:c.call(o,i)}}),a={isModal:()=>{var i;return(i=o.modal)!=null?i:!0},preventScroll:()=>{var i;return(i=o.preventScroll)!=null?i:a.isModal()},forceMount:()=>{var i;return(i=o.forceMount)!=null?i:!1},generateId:gn(()=>o.id),value:()=>o.value,orientation:()=>{var i,c;return(c=(i=o.orientation)!=null?i:t==null?void 0:t.orientation())!=null?c:"horizontal"}};return v(Zi.Provider,{value:a,get children(){return v(hs,W({get open(){return s.isOpen()},get onOpenChange(){return s.setIsOpen}},l))}})}var $c={};qn($c,{Root:()=>Bn,Separator:()=>Cc});function Bn(e){let t;const n=Z({orientation:"horizontal"},e),[r,o]=ie(n,["ref","orientation"]),l=_n(()=>t,()=>"hr");return v(fe,W({as:"hr",ref(s){const a=Te(i=>t=i,r.ref);typeof a=="function"&&a(s)},get role(){return l()!=="hr"?"separator":void 0},get"aria-orientation"(){return r.orientation==="vertical"?"vertical":void 0},get"data-orientation"(){return r.orientation}},o))}var Cc=Bn,ve={};qn(ve,{Arrow:()=>Dr,CheckboxItem:()=>Ji,Content:()=>vs,DropdownMenu:()=>Sc,Group:()=>Fr,GroupLabel:()=>os,Icon:()=>is,Item:()=>ss,ItemDescription:()=>ls,ItemIndicator:()=>as,ItemLabel:()=>us,Portal:()=>cs,RadioGroup:()=>fs,RadioItem:()=>gs,Root:()=>ps,Separator:()=>Bn,Sub:()=>ys,SubContent:()=>ms,SubTrigger:()=>bs,Trigger:()=>es});function vs(e){const t=rt(),n=mt(),[r,o]=ie(e,["onCloseAutoFocus","onInteractOutside"]);let l=!1;return v(hc,W({onCloseAutoFocus:i=>{var c;(c=r.onCloseAutoFocus)==null||c.call(r,i),l||Ae(n.triggerRef()),l=!1,i.preventDefault()},onInteractOutside:i=>{var c;(c=r.onInteractOutside)==null||c.call(r,i),(!t.isModal()||i.detail.isContextMenu)&&(l=!0)}},o))}function ps(e){const t=`dropdownmenu-${Ge()}`,n=Z({id:t},e);return v(xc,n)}var Sc=Object.assign(ps,{Arrow:Dr,CheckboxItem:Ji,Content:vs,Group:Fr,GroupLabel:os,Icon:is,Item:ss,ItemDescription:ls,ItemIndicator:as,ItemLabel:us,Portal:cs,RadioGroup:fs,RadioItem:gs,Separator:Bn,Sub:ys,SubContent:ms,SubTrigger:bs,Trigger:es}),S={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{90:"e5",80:"cc"},font:{size:{xs:"calc(var(--tsqd-font-size) * 0.75)",sm:"calc(var(--tsqd-font-size) * 0.875)",md:"var(--tsqd-font-size)"},lineHeight:{xs:"calc(var(--tsqd-font-size) * 1)",sm:"calc(var(--tsqd-font-size) * 1.25)",md:"calc(var(--tsqd-font-size) * 1.5)"},weight:{medium:"500",semibold:"600",bold:"700"}},border:{radius:{xs:"calc(var(--tsqd-font-size) * 0.125)",sm:"calc(var(--tsqd-font-size) * 0.25)",full:"9999px"}},size:{.25:"calc(var(--tsqd-font-size) * 0.0625)",.5:"calc(var(--tsqd-font-size) * 0.125)",1:"calc(var(--tsqd-font-size) * 0.25)",1.5:"calc(var(--tsqd-font-size) * 0.375)",2:"calc(var(--tsqd-font-size) * 0.5)",2.5:"calc(var(--tsqd-font-size) * 0.625)",3:"calc(var(--tsqd-font-size) * 0.75)",3.5:"calc(var(--tsqd-font-size) * 0.875)",4:"calc(var(--tsqd-font-size) * 1)",4.5:"calc(var(--tsqd-font-size) * 1.125)",5:"calc(var(--tsqd-font-size) * 1.25)",6:"calc(var(--tsqd-font-size) * 1.5)",6.5:"calc(var(--tsqd-font-size) * 1.625)",14:"calc(var(--tsqd-font-size) * 3.5)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"}},kc=_('<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Ec=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Dc=_('<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Mc=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Tr=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Ac=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Fc=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Tc=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ic=_('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">'),Pc=_('<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">'),Lc=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Oc=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),_c=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>'),qc=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ws=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),zc=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Rc=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>'),Kc=_('<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Bc=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Nc=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>'),Uc=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Vc=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Gc=_('<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>');function Hc(){return kc()}function xs(){return Ec()}function ln(){return Dc()}function zo(){return Mc()}function Ro(){return Tr()}function jc(){return(()=>{var e=Tr();return e.style.setProperty("transform","rotate(90deg)"),e})()}function Wc(){return(()=>{var e=Tr();return e.style.setProperty("transform","rotate(-90deg)"),e})()}function Qc(){return Ac()}function Yc(){return Fc()}function Xc(){return Tc()}function Zc(){return Ic()}function Jc(){return Pc()}function ed(){return Lc()}function td(){return Oc()}function nd(){return _c()}function rd(){return qc()}function od(e){return(()=>{var t=ws(),n=t.firstChild;return H(()=>T(n,"stroke",e.theme==="dark"?"#12B76A":"#027A48")),t})()}function id(){return zc()}function sd(){return Rc()}function ld(e){return[v(U,{get when(){return e.checked},get children(){var t=ws(),n=t.firstChild;return H(()=>T(n,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),t}}),v(U,{get when(){return!e.checked},get children(){var t=Kc(),n=t.firstChild;return H(()=>T(n,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),t}})]}function ad(){return Bc()}function ud(){return Nc()}function cd(){return Uc()}function dd(){return Vc()}function Ko(){const e=Ge();return(()=>{var t=Gc(),n=t.firstChild,r=n.nextSibling,o=r.nextSibling,l=o.firstChild,s=o.nextSibling,a=s.firstChild,i=s.nextSibling,c=i.nextSibling,g=c.firstChild,d=c.nextSibling,u=d.firstChild,f=d.nextSibling,h=f.nextSibling,y=h.firstChild,m=h.nextSibling,b=m.firstChild,p=m.nextSibling,w=p.nextSibling,x=w.firstChild,$=w.nextSibling,q=$.firstChild,A=$.nextSibling,K=A.nextSibling,C=K.firstChild,E=K.nextSibling,O=E.firstChild,z=E.nextSibling,Y=z.nextSibling,me=Y.firstChild,J=Y.nextSibling,R=J.firstChild,X=J.nextSibling,ee=X.nextSibling,ye=ee.firstChild,le=ee.nextSibling,ge=le.firstChild,he=le.nextSibling,Fe=he.firstChild,F=Fe.nextSibling,ae=F.nextSibling,ne=ae.nextSibling,bt=ne.nextSibling,G=he.nextSibling,Ee=G.firstChild,De=G.nextSibling,Ot=De.firstChild,qe=De.nextSibling,vt=qe.firstChild,Et=vt.nextSibling,ot=Et.nextSibling,Je=ot.firstChild,it=Je.nextSibling,P=it.nextSibling,re=P.nextSibling,pe=re.nextSibling,ue=pe.nextSibling,se=ue.nextSibling,ce=se.nextSibling,we=ce.nextSibling,oe=we.nextSibling,st=oe.nextSibling,lt=st.nextSibling,We=qe.nextSibling,Dt=We.firstChild,at=We.nextSibling,Mt=at.firstChild,ut=at.nextSibling,pt=ut.firstChild,pn=pt.nextSibling,Yt=ut.nextSibling,wn=Yt.firstChild,_t=Yt.nextSibling,xn=_t.firstChild,Xt=_t.nextSibling,Zt=Xt.firstChild,Jt=Zt.nextSibling,qt=Jt.nextSibling,Pr=qt.nextSibling,Lr=Pr.nextSibling,Or=Lr.nextSibling,_r=Or.nextSibling,qr=_r.nextSibling,zr=qr.nextSibling,Rr=zr.nextSibling,Kr=Rr.nextSibling,Br=Kr.nextSibling,Nr=Br.nextSibling,Ur=Nr.nextSibling,Vr=Ur.nextSibling,Gr=Vr.nextSibling,Hr=Gr.nextSibling,Ds=Hr.nextSibling;return T(n,"id",`a-${e}`),T(r,"fill",`url(#a-${e})`),T(l,"id",`am-${e}`),T(s,"id",`b-${e}`),T(a,"filter",`url(#am-${e})`),T(i,"mask",`url(#b-${e})`),T(g,"id",`ah-${e}`),T(d,"id",`k-${e}`),T(u,"filter",`url(#ah-${e})`),T(f,"mask",`url(#k-${e})`),T(y,"id",`ae-${e}`),T(m,"id",`j-${e}`),T(b,"filter",`url(#ae-${e})`),T(p,"mask",`url(#j-${e})`),T(x,"id",`ai-${e}`),T($,"id",`i-${e}`),T(q,"filter",`url(#ai-${e})`),T(A,"mask",`url(#i-${e})`),T(C,"id",`aj-${e}`),T(E,"id",`h-${e}`),T(O,"filter",`url(#aj-${e})`),T(z,"mask",`url(#h-${e})`),T(me,"id",`ag-${e}`),T(J,"id",`g-${e}`),T(R,"filter",`url(#ag-${e})`),T(X,"mask",`url(#g-${e})`),T(ye,"id",`af-${e}`),T(le,"id",`f-${e}`),T(ge,"filter",`url(#af-${e})`),T(he,"mask",`url(#f-${e})`),T(ne,"id",`m-${e}`),T(bt,"fill",`url(#m-${e})`),T(Ee,"id",`ak-${e}`),T(De,"id",`e-${e}`),T(Ot,"filter",`url(#ak-${e})`),T(qe,"mask",`url(#e-${e})`),T(vt,"id",`n-${e}`),T(Et,"fill",`url(#n-${e})`),T(Je,"id",`r-${e}`),T(it,"fill",`url(#r-${e})`),T(P,"id",`s-${e}`),T(re,"fill",`url(#s-${e})`),T(pe,"id",`q-${e}`),T(ue,"fill",`url(#q-${e})`),T(se,"id",`p-${e}`),T(ce,"fill",`url(#p-${e})`),T(we,"id",`o-${e}`),T(oe,"fill",`url(#o-${e})`),T(st,"id",`l-${e}`),T(lt,"fill",`url(#l-${e})`),T(Dt,"id",`al-${e}`),T(at,"id",`d-${e}`),T(Mt,"filter",`url(#al-${e})`),T(ut,"mask",`url(#d-${e})`),T(pt,"id",`u-${e}`),T(pn,"fill",`url(#u-${e})`),T(wn,"id",`ad-${e}`),T(_t,"id",`c-${e}`),T(xn,"filter",`url(#ad-${e})`),T(Xt,"mask",`url(#c-${e})`),T(Zt,"id",`t-${e}`),T(Jt,"fill",`url(#t-${e})`),T(qt,"id",`v-${e}`),T(Pr,"stroke",`url(#v-${e})`),T(Lr,"id",`aa-${e}`),T(Or,"stroke",`url(#aa-${e})`),T(_r,"id",`w-${e}`),T(qr,"stroke",`url(#w-${e})`),T(zr,"id",`ac-${e}`),T(Rr,"stroke",`url(#ac-${e})`),T(Kr,"id",`ab-${e}`),T(Br,"stroke",`url(#ab-${e})`),T(Nr,"id",`y-${e}`),T(Ur,"stroke",`url(#y-${e})`),T(Vr,"id",`x-${e}`),T(Gr,"stroke",`url(#x-${e})`),T(Hr,"id",`z-${e}`),T(Ds,"stroke",`url(#z-${e})`),t})()}var fd=_('<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),gd=_('<button title="Copy object to clipboard">'),hd=_('<button title="Remove all items"aria-label="Remove all items">'),yd=_('<button title="Delete item"aria-label="Delete item">'),md=_('<button title="Toggle value"aria-label="Toggle value">'),bd=_('<button title="Bulk Edit Data"aria-label="Bulk Edit Data">'),rn=_("<div>"),vd=_("<div><button> <span></span> <span> "),pd=_("<input>"),Bo=_("<span>"),wd=_("<div><span>:"),xd=_("<div><div><button> [<!>...<!>]");function $d(e,t){let n=0;const r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n=n+t;return r}var No=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n));return(()=>{var o=fd();return H(()=>I(o,L(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),o})()},Cd=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n)),[o,l]=B("NoCopy");return(()=>{var s=gd();return Us(s,"click",o()==="NoCopy"?()=>{navigator.clipboard.writeText(Vs(e.value)).then(()=>{l("SuccessCopy"),setTimeout(()=>{l("NoCopy")},1500)},a=>{l("ErrorCopy"),setTimeout(()=>{l("NoCopy")},1500)})}:void 0,!0),k(s,v(Gs,{get children(){return[v(Gn,{get when(){return o()==="NoCopy"},get children(){return v(nd,{})}}),v(Gn,{get when(){return o()==="SuccessCopy"},get children(){return v(od,{get theme(){return t()}})}}),v(Gn,{get when(){return o()==="ErrorCopy"},get children(){return v(id,{})}})]}})),H(a=>{var i=r().actionButton,c=`${o()==="NoCopy"?"Copy object to clipboard":o()==="SuccessCopy"?"Object copied to clipboard":"Error copying object to clipboard"}`;return i!==a.e&&I(s,a.e=i),c!==a.t&&T(s,"aria-label",a.t=c),a},{e:void 0,t:void 0}),s})()},Sd=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n)),o=N().client;return(()=>{var l=hd();return l.$$click=()=>{const s=e.activeQuery.state.data,a=dr(s,e.dataPath,[]);o.setQueryData(e.activeQuery.queryKey,a)},k(l,v(sd,{})),H(()=>I(l,r().actionButton)),l})()},Uo=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n)),o=N().client;return(()=>{var l=yd();return l.$$click=()=>{const s=e.activeQuery.state.data,a=Hs(s,e.dataPath);o.setQueryData(e.activeQuery.queryKey,a)},k(l,v(xs,{})),H(()=>I(l,L(r().actionButton))),l})()},kd=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n)),o=N().client;return(()=>{var l=md();return l.$$click=()=>{const s=e.activeQuery.state.data,a=dr(s,e.dataPath,!e.value);o.setQueryData(e.activeQuery.queryKey,a)},k(l,v(ld,{get theme(){return t()},get checked(){return e.value}})),H(()=>I(l,L(r().actionButton,n`
          width: ${S.size[3.5]};
          height: ${S.size[3.5]};
        `))),l})()};function Vo(e){return Symbol.iterator in e}function wt(e){var h;const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?Qt(n):Wt(n)),o=N().client,[l,s]=B((e.defaultExpanded||[]).includes(e.label)),a=()=>s(y=>!y),[i,c]=B([]),g=M(()=>Array.isArray(e.value)?e.value.map((y,m)=>({label:m.toString(),value:y})):e.value!==null&&typeof e.value=="object"&&Vo(e.value)&&typeof e.value[Symbol.iterator]=="function"?e.value instanceof Map?Array.from(e.value,([y,m])=>({label:y,value:m})):Array.from(e.value,(y,m)=>({label:m.toString(),value:y})):typeof e.value=="object"&&e.value!==null?Object.entries(e.value).map(([y,m])=>({label:y,value:m})):[]),d=M(()=>Array.isArray(e.value)?"array":e.value!==null&&typeof e.value=="object"&&Vo(e.value)&&typeof e.value[Symbol.iterator]=="function"?"Iterable":typeof e.value=="object"&&e.value!==null?"object":typeof e.value),u=M(()=>$d(g(),100)),f=(h=e.dataPath)!=null?h:[];return(()=>{var y=rn();return k(y,v(U,{get when(){return u().length},get children(){return[(()=>{var m=vd(),b=m.firstChild,p=b.firstChild,w=p.nextSibling,x=w.nextSibling,$=x.nextSibling,q=$.firstChild;return b.$$click=()=>a(),k(b,v(No,{get expanded(){return l()}}),p),k(w,()=>e.label),k($,()=>String(d()).toLowerCase()==="iterable"?"(Iterable) ":"",q),k($,()=>g().length,q),k($,()=>g().length>1?"items":"item",null),k(m,v(U,{get when(){return e.editable},get children(){var A=rn();return k(A,v(Cd,{get value(){return e.value}}),null),k(A,v(U,{get when(){return e.itemsDeletable&&e.activeQuery!==void 0},get children(){return v(Uo,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),k(A,v(U,{get when(){return d()==="array"&&e.activeQuery!==void 0},get children(){return v(Sd,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),k(A,v(U,{get when(){return M(()=>!!e.onEdit)()&&!Bs(e.value).meta},get children(){var K=bd();return K.$$click=()=>{var C;(C=e.onEdit)==null||C.call(e)},k(K,v(rd,{})),H(()=>I(K,r().actionButton)),K}}),null),H(()=>I(A,r().actions)),A}}),null),H(A=>{var K=r().expanderButtonContainer,C=r().expanderButton,E=r().info;return K!==A.e&&I(m,A.e=K),C!==A.t&&I(b,A.t=C),E!==A.a&&I($,A.a=E),A},{e:void 0,t:void 0,a:void 0}),m})(),v(U,{get when(){return l()},get children(){return[v(U,{get when(){return u().length===1},get children(){var m=rn();return k(m,v(Dn,{get each(){return g()},by:b=>b.label,children:b=>v(wt,{get defaultExpanded(){return e.defaultExpanded},get label(){return b().label},get value(){return b().value},get editable(){return e.editable},get dataPath(){return[...f,b().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return d()==="array"||d()==="Iterable"||d()==="object"}})})),H(()=>I(m,r().subEntry)),m}}),v(U,{get when(){return u().length>1},get children(){var m=rn();return k(m,v(Ns,{get each(){return u()},children:(b,p)=>(()=>{var w=xd(),x=w.firstChild,$=x.firstChild,q=$.firstChild,A=q.nextSibling,K=A.nextSibling,C=K.nextSibling;return C.nextSibling,$.$$click=()=>c(E=>E.includes(p)?E.filter(O=>O!==p):[...E,p]),k($,v(No,{get expanded(){return i().includes(p)}}),q),k($,p*100,A),k($,p*100+100-1,C),k(x,v(U,{get when(){return i().includes(p)},get children(){var E=rn();return k(E,v(Dn,{get each(){return b()},by:O=>O.label,children:O=>v(wt,{get defaultExpanded(){return e.defaultExpanded},get label(){return O().label},get value(){return O().value},get editable(){return e.editable},get dataPath(){return[...f,O().label]},get activeQuery(){return e.activeQuery}})})),H(()=>I(E,r().subEntry)),E}}),null),H(E=>{var O=r().entry,z=r().expanderButton;return O!==E.e&&I(x,E.e=O),z!==E.t&&I($,E.t=z),E},{e:void 0,t:void 0}),w})()})),H(()=>I(m,r().subEntry)),m}})]}})]}}),null),k(y,v(U,{get when(){return u().length===0},get children(){var m=wd(),b=m.firstChild,p=b.firstChild;return k(b,()=>e.label,p),k(m,v(U,{get when(){return M(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(d()==="string"||d()==="number"||d()==="boolean")},get fallback(){return(()=>{var w=Bo();return k(w,()=>En(e.value)),H(()=>I(w,r().value)),w})()},get children(){return[v(U,{get when(){return M(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(d()==="string"||d()==="number")},get children(){var w=pd();return w.addEventListener("change",x=>{const $=e.activeQuery.state.data,q=dr($,f,d()==="number"?x.target.valueAsNumber:x.target.value);o.setQueryData(e.activeQuery.queryKey,q)}),H(x=>{var $=d()==="number"?"number":"text",q=L(r().value,r().editableInput);return $!==x.e&&T(w,"type",x.e=$),q!==x.t&&I(w,x.t=q),x},{e:void 0,t:void 0}),H(()=>w.value=e.value),w}}),v(U,{get when(){return d()==="boolean"},get children(){var w=Bo();return k(w,v(kd,{get activeQuery(){return e.activeQuery},dataPath:f,get value(){return e.value}}),null),k(w,()=>En(e.value),null),H(()=>I(w,L(r().value,r().actions,r().editableInput))),w}})]}}),null),k(m,v(U,{get when(){return e.editable&&e.itemsDeletable&&e.activeQuery!==void 0},get children(){return v(Uo,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),H(w=>{var x=r().row,$=r().label;return x!==w.e&&I(m,w.e=x),$!==w.t&&I(b,w.t=$),w},{e:void 0,t:void 0}),m}}),null),H(()=>I(y,r().entry)),y})()}var $s=(e,t)=>{const{colors:n,font:r,size:o,border:l}=S,s=(a,i)=>e==="light"?a:i;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${s(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${o[4]};
      min-height: ${o[4]};
      gap: ${o[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${o[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${o[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${l.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${s(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${o[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${s(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${s(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${o[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${o[2]};
      width: 100%;
      margin: ${o[.25]} 0px;
      line-height: ${o[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${o[.5]} ${o[1]} ${o[.5]} ${o[1.5]};
      flex-grow: 1;
      border-radius: ${l.radius.xs};
      background-color: ${s(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${s(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${s(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${o[3]};
      height: ${o[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${s(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${l.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},Wt=e=>$s("light",e),Qt=e=>$s("dark",e);cr(["click"]);var Ed=_('<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>'),vn=_("<div>"),Dd=_('<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">'),Md=_("<select name=tsqd-queries-filter-sort>"),Ad=_("<select name=tsqd-mutations-filter-sort>"),Fd=_("<span>Asc"),Td=_("<span>Desc"),Id=_('<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">'),Pd=_("<div>Settings"),Ld=_("<span>Position"),Od=_("<span>Top"),_d=_("<span>Bottom"),qd=_("<span>Left"),zd=_("<span>Right"),Rd=_("<span>Theme"),Kd=_("<span>Light"),Bd=_("<span>Dark"),Nd=_("<span>System"),Ud=_("<div><div class=tsqd-queries-container>"),Vd=_("<div><div class=tsqd-mutations-container>"),Gd=_('<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>'),Go=_("<option>Sort by "),Hd=_("<div class=tsqd-query-disabled-indicator>disabled"),Cs=_("<button><div></div><code class=tsqd-query-hash>"),jd=_("<div role=tooltip id=tsqd-status-tooltip>"),Wd=_("<span>"),Qd=_("<button><span></span><span>"),Yd=_("<button><span></span> Error"),Xd=_('<div><span></span>Trigger Error<select><option value=""disabled selected>'),Zd=_('<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">'),Jd=_("<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save"),ef=_('<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),tf=_("<option>"),nf=_('<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),[Le,Nn]=B(null),[xt,Ss]=B(null),[Ye,Ir]=B(0),[zt,Ho]=B(!1),pf=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n)),o=gr(),l=M(()=>N().buttonPosition||ol),s=M(()=>e.localStore.open==="true"?!0:e.localStore.open==="false"?!1:N().initialIsOpen||il),a=M(()=>e.localStore.position||N().position||er);let i;V(()=>{const g=i.parentElement,d=e.localStore.height||Qo,u=e.localStore.width||Yo,f=a();g.style.setProperty("--tsqd-panel-height",`${f==="top"?"-":""}${d}px`),g.style.setProperty("--tsqd-panel-width",`${f==="left"?"-":""}${u}px`)}),Pt(()=>{const g=()=>{const d=i.parentElement,u=getComputedStyle(d).fontSize;d.style.setProperty("--tsqd-font-size",u)};g(),window.addEventListener("focus",g),j(()=>{window.removeEventListener("focus",g)})});const c=M(()=>{var g;return(g=e.localStore.pip_open)!=null?g:"false"});return[v(U,{get when(){return M(()=>!!o().pipWindow)()&&c()=="true"},get children(){return v(jo,{get mount(){var g;return(g=o().pipWindow)==null?void 0:g.document.body},get children(){return v(rf,{get children(){return v(ks,e)}})}})}}),(()=>{var g=vn(),d=i;return typeof d=="function"?fn(d,g):i=g,k(g,v(so,{name:"tsqd-panel-transition",get children(){return v(U,{get when(){return M(()=>!!(s()&&!o().pipWindow))()&&c()=="false"},get children(){return v(of,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),k(g,v(so,{name:"tsqd-button-transition",get children(){return v(U,{get when(){return!s()},get children(){var u=Ed(),f=u.firstChild,h=f.nextSibling;return k(f,v(Ko,{})),h.$$click=()=>e.setLocalStore("open","true"),k(h,v(Ko,{})),H(()=>I(u,L(r().devtoolsBtn,r()[`devtoolsBtn-position-${l()}`],"tsqd-open-btn-container"))),u}})}}),null),H(()=>I(g,L(n`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${a()==="top"||a()==="bottom"?"transform: translateY(var(--tsqd-panel-height));":"transform: translateX(var(--tsqd-panel-width));"}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${l()==="relative"?"none;":l()==="top-left"?"translateX(-72px);":l()==="top-right"?"translateX(72px);":"translateY(72px);"};
              opacity: 0;
            }
          `,"tsqd-transitions-container"))),g})()]},rf=e=>{const t=gr(),n=$e(),r=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,o=M(()=>n()==="dark"?je(r):He(r)),l=()=>{const{colors:s}=S,a=(i,c)=>n()==="dark"?c:i;return Ye()<Ft?r`
        flex-direction: column;
        background-color: ${a(s.gray[300],s.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${a(s.gray[200],s.darkGray[900])};
    `};return V(()=>{const s=t().pipWindow,a=()=>{s&&Ir(s.innerWidth)};s&&(s.addEventListener("resize",a),a()),j(()=>{s&&s.removeEventListener("resize",a)})}),(()=>{var s=vn();return s.style.setProperty("--tsqd-font-size","16px"),s.style.setProperty("max-height","100vh"),s.style.setProperty("height","100vh"),s.style.setProperty("width","100vw"),k(s,()=>e.children),H(()=>I(s,L(o().panel,l(),{[r`
            min-width: min-content;
          `]:Ye()<fr},"tsqd-main-panel"))),s})()},wf=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n));let o;Pt(()=>{ni(o,({width:s},a)=>{a===o&&Ir(s)})});const l=()=>{const{colors:s}=S,a=(i,c)=>t()==="dark"?c:i;return Ye()<Ft?n`
        flex-direction: column;
        background-color: ${a(s.gray[300],s.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${a(s.gray[200],s.darkGray[900])};
    `};return(()=>{var s=vn(),a=o;return typeof a=="function"?fn(a,s):o=s,s.style.setProperty("--tsqd-font-size","16px"),k(s,()=>e.children),H(()=>I(s,L(r().parentPanel,l(),{[n`
            min-width: min-content;
          `]:Ye()<fr},"tsqd-main-panel"))),s})()},of=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n)),[o,l]=B(!1),s=M(()=>e.localStore.position||N().position||er),a=g=>{const d=g.currentTarget.parentElement;if(!d)return;l(!0);const{height:u,width:f}=d.getBoundingClientRect(),h=g.clientX,y=g.clientY;let m=0;const b=Yr(3.5),p=Yr(12),w=$=>{if($.preventDefault(),s()==="left"||s()==="right"){const q=s()==="right"?h-$.clientX:$.clientX-h;m=Math.round(f+q),m<p&&(m=p),e.setLocalStore("width",String(Math.round(m)));const A=d.getBoundingClientRect().width;Number(e.localStore.width)<A&&e.setLocalStore("width",String(A))}else{const q=s()==="bottom"?y-$.clientY:$.clientY-y;m=Math.round(u+q),m<b&&(m=b,Nn(null)),e.setLocalStore("height",String(Math.round(m)))}},x=()=>{o()&&l(!1),document.removeEventListener("mousemove",w,!1),document.removeEventListener("mouseUp",x,!1)};document.addEventListener("mousemove",w,!1),document.addEventListener("mouseup",x,!1)};let i;Pt(()=>{ni(i,({width:g},d)=>{d===i&&Ir(g)})}),V(()=>{var y,m;const g=(m=(y=i.parentElement)==null?void 0:y.parentElement)==null?void 0:m.parentElement;if(!g)return;const d=e.localStore.position||er,u=Ls("padding",d),f=e.localStore.position==="left"||e.localStore.position==="right",h=(({padding:b,paddingTop:p,paddingBottom:w,paddingLeft:x,paddingRight:$})=>({padding:b,paddingTop:p,paddingBottom:w,paddingLeft:x,paddingRight:$}))(g.style);g.style[u]=`${f?e.localStore.width:e.localStore.height}px`,j(()=>{Object.entries(h).forEach(([b,p])=>{g.style[b]=p})})});const c=()=>{const{colors:g}=S,d=(u,f)=>t()==="dark"?f:u;return Ye()<Ft?n`
        flex-direction: column;
        background-color: ${d(g.gray[300],g.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${d(g.gray[200],g.darkGray[900])};
    `};return(()=>{var g=Dd(),d=g.firstChild,u=d.nextSibling,f=i;return typeof f=="function"?fn(f,g):i=g,d.$$mousedown=a,u.$$click=()=>e.setLocalStore("open","false"),k(u,v(ln,{})),k(g,v(ks,e),null),H(h=>{var y=L(r().panel,r()[`panel-position-${s()}`],c(),{[n`
            min-width: min-content;
          `]:Ye()<fr&&(s()==="right"||s()==="left")},"tsqd-main-panel"),m=s()==="bottom"||s()==="top"?`${e.localStore.height||Qo}px`:"auto",b=s()==="right"||s()==="left"?`${e.localStore.width||Yo}px`:"auto",p=L(r().dragHandle,r()[`dragHandle-position-${s()}`],"tsqd-drag-handle"),w=L(r().closeBtn,r()[`closeBtn-position-${s()}`],"tsqd-minimize-btn");return y!==h.e&&I(g,h.e=y),m!==h.t&&((h.t=m)!=null?g.style.setProperty("height",m):g.style.removeProperty("height")),b!==h.a&&((h.a=b)!=null?g.style.setProperty("width",b):g.style.removeProperty("width")),p!==h.o&&I(d,h.o=p),w!==h.i&&I(u,h.i=w),h},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),g})()},ks=e=>{ff(),gf();let t;const n=$e(),r=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,o=M(()=>n()==="dark"?je(r):He(r)),l=gr(),[s,a]=B("queries"),i=M(()=>e.localStore.sort||ll),c=M(()=>Number(e.localStore.sortOrder)||Jr),g=M(()=>e.localStore.mutationSort||al),d=M(()=>Number(e.localStore.mutationSortOrder)||Jr),u=M(()=>Xn[i()]),f=M(()=>Zn[g()]),h=M(()=>N().onlineManager),y=M(()=>N().client.getQueryCache()),m=M(()=>N().client.getMutationCache()),b=Ce(A=>A().getAll().length,!1),p=M(gt(()=>[b(),e.localStore.filter,i(),c()],()=>{const A=y().getAll(),K=e.localStore.filter?A.filter(E=>eo(E.queryHash,e.localStore.filter||"").passed):[...A];return u()?K.sort((E,O)=>u()(E,O)*c()):K})),w=Qe(A=>A().getAll().length,!1),x=M(gt(()=>[w(),e.localStore.mutationFilter,g(),d()],()=>{const A=m().getAll(),K=e.localStore.mutationFilter?A.filter(E=>{const O=`${E.options.mutationKey?JSON.stringify(E.options.mutationKey)+" - ":""}${new Date(E.state.submittedAt).toLocaleString()}`;return eo(O,e.localStore.mutationFilter||"").passed}):[...A];return f()?K.sort((E,O)=>f()(E,O)*d()):K})),$=A=>{e.setLocalStore("position",A)},q=A=>{const C=getComputedStyle(t).getPropertyValue("--tsqd-font-size");A.style.setProperty("--tsqd-font-size",C)};return[(()=>{var A=Gd(),K=A.firstChild,C=K.firstChild,E=C.firstChild,O=E.firstChild,z=O.nextSibling,Y=z.firstChild,me=K.nextSibling,J=me.firstChild,R=J.firstChild,X=R.firstChild,ee=R.nextSibling,ye=ee.nextSibling,le=J.nextSibling,ge=le.firstChild,he=ge.nextSibling,Fe=t;return typeof Fe=="function"?fn(Fe,A):t=A,E.$$click=()=>{if(!l().pipWindow&&!e.showPanelViewOnly){e.setLocalStore("open","false");return}e.onClose&&e.onClose()},k(z,()=>N().queryFlavor,Y),k(z,()=>N().version,null),k(C,v(Ne.Root,{get class(){return L(o().viewToggle)},get value(){return s()},onChange:F=>{a(F),Nn(null),Ss(null)},get children(){return[v(Ne.Item,{value:"queries",class:"tsqd-radio-toggle",get children(){return[v(Ne.ItemInput,{}),v(Ne.ItemControl,{get children(){return v(Ne.ItemIndicator,{})}}),v(Ne.ItemLabel,{title:"Toggle Queries View",children:"Queries"})]}}),v(Ne.Item,{value:"mutations",class:"tsqd-radio-toggle",get children(){return[v(Ne.ItemInput,{}),v(Ne.ItemControl,{get children(){return v(Ne.ItemIndicator,{})}}),v(Ne.ItemLabel,{title:"Toggle Mutations View",children:"Mutations"})]}})]}}),null),k(K,v(U,{get when(){return s()==="queries"},get children(){return v(af,{})}}),null),k(K,v(U,{get when(){return s()==="mutations"},get children(){return v(uf,{})}}),null),k(R,v(Hc,{}),X),X.$$input=F=>{s()==="queries"?e.setLocalStore("filter",F.currentTarget.value):e.setLocalStore("mutationFilter",F.currentTarget.value)},k(ee,v(U,{get when(){return s()==="queries"},get children(){var F=Md();return F.addEventListener("change",ae=>{e.setLocalStore("sort",ae.currentTarget.value)}),k(F,()=>Object.keys(Xn).map(ae=>(()=>{var ne=Go();return ne.firstChild,ne.value=ae,k(ne,ae,null),ne})())),H(()=>F.value=i()),F}}),null),k(ee,v(U,{get when(){return s()==="mutations"},get children(){var F=Ad();return F.addEventListener("change",ae=>{e.setLocalStore("mutationSort",ae.currentTarget.value)}),k(F,()=>Object.keys(Zn).map(ae=>(()=>{var ne=Go();return ne.firstChild,ne.value=ae,k(ne,ae,null),ne})())),H(()=>F.value=g()),F}}),null),k(ee,v(ln,{}),null),ye.$$click=()=>{s()==="queries"?e.setLocalStore("sortOrder",String(c()*-1)):e.setLocalStore("mutationSortOrder",String(d()*-1))},k(ye,v(U,{get when(){return(s()==="queries"?c():d())===1},get children(){return[Fd(),v(zo,{})]}}),null),k(ye,v(U,{get when(){return(s()==="queries"?c():d())===-1},get children(){return[Td(),v(Ro,{})]}}),null),ge.$$click=()=>{s()==="queries"?y().clear():m().clear()},k(ge,v(xs,{})),he.$$click=()=>{zt()?(h().setOnline(!0),Ho(!1)):(h().setOnline(!1),Ho(!0))},k(he,(()=>{var F=M(()=>!!zt());return()=>F()?v(Jc,{}):v(Zc,{})})()),k(le,v(U,{get when(){return M(()=>!l().pipWindow)()&&!l().disabled},get children(){var F=Id();return F.$$click=()=>{var ae;l().requestPipWindow(Number(window.innerWidth),Number((ae=e.localStore.height)!=null?ae:500))},k(F,v(td,{})),H(()=>I(F,L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-open-pip"))),F}}),null),k(le,v(ve.Root,{gutter:4,get children(){return[v(ve.Trigger,{get class(){return L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-settings")},get children(){return v(ed,{})}}),v(ve.Portal,{ref:F=>q(F),get mount(){return M(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return v(ve.Content,{get class(){return L(o().settingsMenu,"tsqd-settings-menu")},get children(){return[(()=>{var F=Pd();return H(()=>I(F,L(o().settingsMenuHeader,"tsqd-settings-menu-header"))),F})(),v(U,{get when(){return!e.showPanelViewOnly},get children(){return v(ve.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[v(ve.SubTrigger,{get class(){return L(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Ld(),v(ln,{})]}}),v(ve.Portal,{ref:F=>q(F),get mount(){return M(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return v(ve.SubContent,{get class(){return L(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[v(ve.Item,{onSelect:()=>{$("top")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Od(),v(zo,{})]}}),v(ve.Item,{onSelect:()=>{$("bottom")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[_d(),v(Ro,{})]}}),v(ve.Item,{onSelect:()=>{$("left")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[qd(),v(jc,{})]}}),v(ve.Item,{onSelect:()=>{$("right")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-right")},get children(){return[zd(),v(Wc,{})]}})]}})}})]}})}}),v(ve.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[v(ve.SubTrigger,{get class(){return L(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Rd(),v(ln,{})]}}),v(ve.Portal,{ref:F=>q(F),get mount(){return M(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return v(ve.SubContent,{get class(){return L(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[v(ve.Item,{onSelect:()=>{e.setLocalStore("theme_preference","light")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="light"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Kd(),v(Qc,{})]}}),v(ve.Item,{onSelect:()=>{e.setLocalStore("theme_preference","dark")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="dark"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[Bd(),v(Yc,{})]}}),v(ve.Item,{onSelect:()=>{e.setLocalStore("theme_preference","system")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="system"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Nd(),v(Xc,{})]}})]}})}})]}})]}})}})]}}),null),k(A,v(U,{get when(){return s()==="queries"},get children(){var F=Ud(),ae=F.firstChild;return k(ae,v(Dn,{by:ne=>ne.queryHash,get each(){return p()},children:ne=>v(sf,{get query(){return ne()}})})),H(()=>I(F,L(o().overflowQueryContainer,"tsqd-queries-overflow-container"))),F}}),null),k(A,v(U,{get when(){return s()==="mutations"},get children(){var F=Vd(),ae=F.firstChild;return k(ae,v(Dn,{by:ne=>ne.mutationId,get each(){return x()},children:ne=>v(lf,{get mutation(){return ne()}})})),H(()=>I(F,L(o().overflowQueryContainer,"tsqd-mutations-overflow-container"))),F}}),null),H(F=>{var ae=L(o().queriesContainer,Ye()<Ft&&(Le()||xt())&&r`
              height: 50%;
              max-height: 50%;
            `,Ye()<Ft&&!(Le()||xt())&&r`
              height: 100%;
              max-height: 100%;
            `,"tsqd-queries-container"),ne=L(o().row,"tsqd-header"),bt=o().logoAndToggleContainer,G=L(o().logo,"tsqd-text-logo-container"),Ee=L(o().tanstackLogo,"tsqd-text-logo-tanstack"),De=L(o().queryFlavorLogo,"tsqd-text-logo-query-flavor"),Ot=L(o().row,"tsqd-filters-actions-container"),qe=L(o().filtersContainer,"tsqd-filters-container"),vt=L(o().filterInput,"tsqd-query-filter-textfield-container"),Et=L("tsqd-query-filter-textfield"),ot=L(o().filterSelect,"tsqd-query-filter-sort-container"),Je=`Sort order ${(s()==="queries"?c():d())===-1?"descending":"ascending"}`,it=(s()==="queries"?c():d())===-1,P=L(o().actionsContainer,"tsqd-actions-container"),re=L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-clear-cache"),pe=`Clear ${s()} cache`,ue=L(o().actionsBtn,zt()&&o().actionsBtnOffline,"tsqd-actions-btn","tsqd-action-mock-offline-behavior"),se=`${zt()?"Unset offline mocking behavior":"Mock offline behavior"}`,ce=zt(),we=`${zt()?"Unset offline mocking behavior":"Mock offline behavior"}`;return ae!==F.e&&I(A,F.e=ae),ne!==F.t&&I(K,F.t=ne),bt!==F.a&&I(C,F.a=bt),G!==F.o&&I(E,F.o=G),Ee!==F.i&&I(O,F.i=Ee),De!==F.n&&I(z,F.n=De),Ot!==F.s&&I(me,F.s=Ot),qe!==F.h&&I(J,F.h=qe),vt!==F.r&&I(R,F.r=vt),Et!==F.d&&I(X,F.d=Et),ot!==F.l&&I(ee,F.l=ot),Je!==F.u&&T(ye,"aria-label",F.u=Je),it!==F.c&&T(ye,"aria-pressed",F.c=it),P!==F.w&&I(le,F.w=P),re!==F.m&&I(ge,F.m=re),pe!==F.f&&T(ge,"title",F.f=pe),ue!==F.y&&I(he,F.y=ue),se!==F.g&&T(he,"aria-label",F.g=se),ce!==F.p&&T(he,"aria-pressed",F.p=ce),we!==F.b&&T(he,"title",F.b=we),F},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),H(()=>X.value=s()==="queries"?e.localStore.filter||"":e.localStore.mutationFilter||""),A})(),v(U,{get when(){return M(()=>s()==="queries")()&&Le()},get children(){return v(cf,{})}}),v(U,{get when(){return M(()=>s()==="mutations")()&&xt()},get children(){return v(df,{})}})]},sf=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n)),{colors:o,alpha:l}=S,s=(f,h)=>t()==="dark"?h:f,a=Ce(f=>{var h;return(h=f().find({queryKey:e.query.queryKey}))==null?void 0:h.state},!0,f=>f.query.queryHash===e.query.queryHash),i=Ce(f=>{var h,y;return(y=(h=f().find({queryKey:e.query.queryKey}))==null?void 0:h.isDisabled())!=null?y:!1},!0,f=>f.query.queryHash===e.query.queryHash),c=Ce(f=>{var h,y;return(y=(h=f().find({queryKey:e.query.queryKey}))==null?void 0:h.isStale())!=null?y:!1},!0,f=>f.query.queryHash===e.query.queryHash),g=Ce(f=>{var h,y;return(y=(h=f().find({queryKey:e.query.queryKey}))==null?void 0:h.getObserversCount())!=null?y:0},!0,f=>f.query.queryHash===e.query.queryHash),d=M(()=>_s({queryState:a(),observerCount:g(),isStale:c()})),u=()=>d()==="gray"?n`
        background-color: ${s(o[d()][200],o[d()][700])};
        color: ${s(o[d()][700],o[d()][300])};
      `:n`
      background-color: ${s(o[d()][200]+l[80],o[d()][900])};
      color: ${s(o[d()][800],o[d()][300])};
    `;return v(U,{get when(){return a()},get children(){var f=Cs(),h=f.firstChild,y=h.nextSibling;return f.$$click=()=>Nn(e.query.queryHash===Le()?null:e.query.queryHash),k(h,g),k(y,()=>e.query.queryHash),k(f,v(U,{get when(){return i()},get children(){return Hd()}}),null),H(m=>{var b=L(r().queryRow,Le()===e.query.queryHash&&r().selectedQueryRow,"tsqd-query-row"),p=`Query key ${e.query.queryHash}`,w=L(u(),"tsqd-query-observer-count");return b!==m.e&&I(f,m.e=b),p!==m.t&&T(f,"aria-label",m.t=p),w!==m.a&&I(h,m.a=w),m},{e:void 0,t:void 0,a:void 0}),f}})},lf=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n)),{colors:o,alpha:l}=S,s=(u,f)=>t()==="dark"?f:u,a=Qe(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h==null?void 0:h.state}),i=Qe(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h?h.state.isPaused:!1}),c=Qe(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h?h.state.status:"idle"}),g=M(()=>Nt({isPaused:i(),status:c()})),d=()=>g()==="gray"?n`
        background-color: ${s(o[g()][200],o[g()][700])};
        color: ${s(o[g()][700],o[g()][300])};
      `:n`
      background-color: ${s(o[g()][200]+l[80],o[g()][900])};
      color: ${s(o[g()][800],o[g()][300])};
    `;return v(U,{get when(){return a()},get children(){var u=Cs(),f=u.firstChild,h=f.nextSibling;return u.$$click=()=>{Ss(e.mutation.mutationId===xt()?null:e.mutation.mutationId)},k(f,v(U,{get when(){return g()==="purple"},get children(){return v(dd,{})}}),null),k(f,v(U,{get when(){return g()==="green"},get children(){return v(ad,{})}}),null),k(f,v(U,{get when(){return g()==="red"},get children(){return v(cd,{})}}),null),k(f,v(U,{get when(){return g()==="yellow"},get children(){return v(ud,{})}}),null),k(h,v(U,{get when(){return e.mutation.options.mutationKey},get children(){return[M(()=>JSON.stringify(e.mutation.options.mutationKey))," -"," "]}}),null),k(h,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),H(y=>{var m=L(r().queryRow,xt()===e.mutation.mutationId&&r().selectedQueryRow,"tsqd-query-row"),b=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,p=L(d(),"tsqd-query-observer-count");return m!==y.e&&I(u,y.e=m),b!==y.t&&T(u,"aria-label",y.t=b),p!==y.a&&I(f,y.a=p),y},{e:void 0,t:void 0,a:void 0}),u}})},af=()=>{const e=Ce(i=>i().getAll().filter(c=>Rt(c)==="stale").length),t=Ce(i=>i().getAll().filter(c=>Rt(c)==="fresh").length),n=Ce(i=>i().getAll().filter(c=>Rt(c)==="fetching").length),r=Ce(i=>i().getAll().filter(c=>Rt(c)==="paused").length),o=Ce(i=>i().getAll().filter(c=>Rt(c)==="inactive").length),l=$e(),s=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,a=M(()=>l()==="dark"?je(s):He(s));return(()=>{var i=vn();return k(i,v(ft,{label:"Fresh",color:"green",get count(){return t()}}),null),k(i,v(ft,{label:"Fetching",color:"blue",get count(){return n()}}),null),k(i,v(ft,{label:"Paused",color:"purple",get count(){return r()}}),null),k(i,v(ft,{label:"Stale",color:"yellow",get count(){return e()}}),null),k(i,v(ft,{label:"Inactive",color:"gray",get count(){return o()}}),null),H(()=>I(i,L(a().queryStatusContainer,"tsqd-query-status-container"))),i})()},uf=()=>{const e=Qe(a=>a().getAll().filter(i=>Nt({isPaused:i.state.isPaused,status:i.state.status})==="green").length),t=Qe(a=>a().getAll().filter(i=>Nt({isPaused:i.state.isPaused,status:i.state.status})==="yellow").length),n=Qe(a=>a().getAll().filter(i=>Nt({isPaused:i.state.isPaused,status:i.state.status})==="purple").length),r=Qe(a=>a().getAll().filter(i=>Nt({isPaused:i.state.isPaused,status:i.state.status})==="red").length),o=$e(),l=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,s=M(()=>o()==="dark"?je(l):He(l));return(()=>{var a=vn();return k(a,v(ft,{label:"Paused",color:"purple",get count(){return n()}}),null),k(a,v(ft,{label:"Pending",color:"yellow",get count(){return t()}}),null),k(a,v(ft,{label:"Success",color:"green",get count(){return e()}}),null),k(a,v(ft,{label:"Error",color:"red",get count(){return r()}}),null),H(()=>I(a,L(s().queryStatusContainer,"tsqd-query-status-container"))),a})()},ft=e=>{const t=$e(),n=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,r=M(()=>t()==="dark"?je(n):He(n)),{colors:o,alpha:l}=S,s=(f,h)=>t()==="dark"?h:f;let a;const[i,c]=B(!1),[g,d]=B(!1),u=M(()=>!(Le()&&Ye()<rl&&Ye()>Ft||Ye()<Ft));return(()=>{var f=Qd(),h=f.firstChild,y=h.nextSibling,m=a;return typeof m=="function"?fn(m,f):a=f,f.addEventListener("mouseleave",()=>{c(!1),d(!1)}),f.addEventListener("mouseenter",()=>c(!0)),f.addEventListener("blur",()=>d(!1)),f.addEventListener("focus",()=>d(!0)),Ks(f,W({get disabled(){return u()},get class(){return L(r().queryStatusTag,!u()&&n`
            cursor: pointer;
            &:hover {
              background: ${s(o.gray[200],o.darkGray[400])}${l[80]};
            }
          `,"tsqd-query-status-tag",`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>i()||g()?{"aria-describedby":"tsqd-status-tooltip"}:{}),!1,!0),k(f,v(U,{get when(){return M(()=>!u())()&&(i()||g())},get children(){var b=jd();return k(b,()=>e.label),H(()=>I(b,L(r().statusTooltip,"tsqd-query-status-tooltip"))),b}}),h),k(f,v(U,{get when(){return u()},get children(){var b=Wd();return k(b,()=>e.label),H(()=>I(b,L(r().queryStatusTagLabel,"tsqd-query-status-tag-label"))),b}}),y),k(y,()=>e.count),H(b=>{var p=L(n`
            width: ${S.size[1.5]};
            height: ${S.size[1.5]};
            border-radius: ${S.border.radius.full};
            background-color: ${S.colors[e.color][500]};
          `,"tsqd-query-status-tag-dot"),w=L(r().queryStatusCount,e.count>0&&e.color!=="gray"&&n`
              background-color: ${s(o[e.color][100],o[e.color][900])};
              color: ${s(o[e.color][700],o[e.color][300])};
            `,"tsqd-query-status-tag-count");return p!==b.e&&I(h,b.e=p),w!==b.t&&I(y,b.t=w),b},{e:void 0,t:void 0}),f})()},cf=()=>{const e=$e(),t=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,n=M(()=>e()==="dark"?je(t):He(t)),{colors:r}=S,o=(C,E)=>e()==="dark"?E:C,l=N().client,[s,a]=B(!1),[i,c]=B("view"),[g,d]=B(!1),u=M(()=>N().errorTypes||[]),f=Ce(C=>C().getAll().find(E=>E.queryHash===Le()),!1),h=Ce(C=>C().getAll().find(E=>E.queryHash===Le()),!1),y=Ce(C=>{var E;return(E=C().getAll().find(O=>O.queryHash===Le()))==null?void 0:E.state},!1),m=Ce(C=>{var E;return(E=C().getAll().find(O=>O.queryHash===Le()))==null?void 0:E.state.data},!1),b=Ce(C=>{const E=C().getAll().find(O=>O.queryHash===Le());return E?Rt(E):"inactive"}),p=Ce(C=>{const E=C().getAll().find(O=>O.queryHash===Le());return E?E.state.status:"pending"}),w=Ce(C=>{var E,O;return(O=(E=C().getAll().find(z=>z.queryHash===Le()))==null?void 0:E.getObserversCount())!=null?O:0}),x=M(()=>qs(b())),$=()=>{var E;const C=(E=f())==null?void 0:E.fetch();C==null||C.catch(()=>{})},q=C=>{var z;const E=(z=C==null?void 0:C.initializer(f()))!=null?z:new Error("Unknown error from devtools"),O=f().options;f().setState({status:"error",error:E,fetchMeta:be(te({},f().state.fetchMeta),{__previousQueryOptions:O})})},A=()=>{const C=f(),E=C.state,O=C.state.fetchMeta?C.state.fetchMeta.__previousQueryOptions:null;C.cancel({silent:!0}),C.setState(be(te({},E),{fetchStatus:"idle",fetchMeta:null})),O&&C.fetch(O)};V(()=>{b()!=="fetching"&&a(!1)});const K=()=>x()==="gray"?t`
        background-color: ${o(r[x()][200],r[x()][700])};
        color: ${o(r[x()][700],r[x()][300])};
        border-color: ${o(r[x()][400],r[x()][600])};
      `:t`
      background-color: ${o(r[x()][100],r[x()][900])};
      color: ${o(r[x()][700],r[x()][300])};
      border-color: ${o(r[x()][400],r[x()][600])};
    `;return v(U,{get when(){return M(()=>!!f())()&&y()},get children(){var C=ef(),E=C.firstChild,O=E.nextSibling,z=O.firstChild,Y=z.firstChild,me=Y.firstChild,J=Y.nextSibling,R=z.nextSibling,X=R.firstChild,ee=X.nextSibling,ye=R.nextSibling,le=ye.firstChild,ge=le.nextSibling,he=O.nextSibling,Fe=he.nextSibling,F=Fe.firstChild,ae=F.firstChild,ne=F.nextSibling,bt=ne.firstChild,G=ne.nextSibling,Ee=G.firstChild,De=G.nextSibling,Ot=De.firstChild,qe=De.nextSibling,vt=qe.firstChild,Et=vt.nextSibling,ot=Fe.nextSibling;ot.firstChild;var Je=ot.nextSibling,it=Je.nextSibling;return k(me,()=>En(f().queryKey,!0)),k(J,b),k(ee,w),k(ge,()=>new Date(y().dataUpdatedAt).toLocaleTimeString()),F.$$click=$,ne.$$click=()=>l.invalidateQueries(f()),G.$$click=()=>l.resetQueries(f()),De.$$click=()=>{l.removeQueries(f()),Nn(null)},qe.$$click=()=>{var P;if(((P=f())==null?void 0:P.state.data)===void 0)a(!0),A();else{const re=f();if(!re)return;const pe=re.options;re.fetch(be(te({},pe),{queryFn:()=>new Promise(()=>{}),gcTime:-1})),re.setState({data:void 0,status:"pending",fetchMeta:be(te({},re.state.fetchMeta),{__previousQueryOptions:pe})})}},k(qe,()=>p()==="pending"?"Restore":"Trigger",Et),k(Fe,v(U,{get when(){return u().length===0||p()==="error"},get children(){var P=Yd(),re=P.firstChild,pe=re.nextSibling;return P.$$click=()=>{f().state.error?l.resetQueries(f()):q()},k(P,()=>p()==="error"?"Restore":"Trigger",pe),H(ue=>{var se=L(t`
                  color: ${o(r.red[500],r.red[400])};
                `,"tsqd-query-details-actions-btn","tsqd-query-details-action-error"),ce=p()==="pending",we=t`
                  background-color: ${o(r.red[500],r.red[400])};
                `;return se!==ue.e&&I(P,ue.e=se),ce!==ue.t&&(P.disabled=ue.t=ce),we!==ue.a&&I(re,ue.a=we),ue},{e:void 0,t:void 0,a:void 0}),P}}),null),k(Fe,v(U,{get when(){return!(u().length===0||p()==="error")},get children(){var P=Xd(),re=P.firstChild,pe=re.nextSibling,ue=pe.nextSibling;return ue.firstChild,ue.addEventListener("change",se=>{const ce=u().find(we=>we.name===se.currentTarget.value);q(ce)}),k(ue,v(zs,{get each(){return u()},children:se=>(()=>{var ce=tf();return k(ce,()=>se.name),H(()=>ce.value=se.name),ce})()}),null),k(P,v(ln,{}),null),H(se=>{var ce=L(n().actionsSelect,"tsqd-query-details-actions-btn","tsqd-query-details-action-error-multiple"),we=t`
                  background-color: ${S.colors.red[400]};
                `,oe=p()==="pending";return ce!==se.e&&I(P,se.e=ce),we!==se.t&&I(re,se.t=we),oe!==se.a&&(ue.disabled=se.a=oe),se},{e:void 0,t:void 0,a:void 0}),P}}),null),k(ot,()=>i()==="view"?"Explorer":"Editor",null),k(C,v(U,{get when(){return i()==="view"},get children(){var P=Zd();return k(P,v(wt,{label:"Data",defaultExpanded:["Data"],get value(){return m()},editable:!0,onEdit:()=>c("edit"),get activeQuery(){return f()}})),H(re=>(re=S.size[2])!=null?P.style.setProperty("padding",re):P.style.removeProperty("padding")),P}}),Je),k(C,v(U,{get when(){return i()==="edit"},get children(){var P=Jd(),re=P.firstChild,pe=re.nextSibling,ue=pe.firstChild,se=ue.nextSibling,ce=se.firstChild,we=ce.nextSibling;return P.addEventListener("submit",oe=>{oe.preventDefault();const lt=new FormData(oe.currentTarget).get("data");try{const We=JSON.parse(lt);f().setState(be(te({},f().state),{data:We})),c("view")}catch(We){d(!0)}}),re.addEventListener("focus",()=>d(!1)),k(ue,()=>g()?"Invalid Value":""),ce.$$click=()=>c("view"),H(oe=>{var st=L(n().devtoolsEditForm,"tsqd-query-details-data-editor"),lt=n().devtoolsEditTextarea,We=g(),Dt=n().devtoolsEditFormActions,at=n().devtoolsEditFormError,Mt=n().devtoolsEditFormActionContainer,ut=L(n().devtoolsEditFormAction,t`
                      color: ${o(r.gray[600],r.gray[300])};
                    `),pt=L(n().devtoolsEditFormAction,t`
                      color: ${o(r.blue[600],r.blue[400])};
                    `);return st!==oe.e&&I(P,oe.e=st),lt!==oe.t&&I(re,oe.t=lt),We!==oe.a&&T(re,"data-error",oe.a=We),Dt!==oe.o&&I(pe,oe.o=Dt),at!==oe.i&&I(ue,oe.i=at),Mt!==oe.n&&I(se,oe.n=Mt),ut!==oe.s&&I(ce,oe.s=ut),pt!==oe.h&&I(we,oe.h=pt),oe},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),H(()=>re.value=JSON.stringify(m(),null,2)),P}}),Je),k(it,v(wt,{label:"Query",defaultExpanded:["Query","queryKey"],get value(){return h()}})),H(P=>{var re=L(n().detailsContainer,"tsqd-query-details-container"),pe=L(n().detailsHeader,"tsqd-query-details-header"),ue=L(n().detailsBody,"tsqd-query-details-summary-container"),se=L(n().queryDetailsStatus,K()),ce=L(n().detailsHeader,"tsqd-query-details-header"),we=L(n().actionsBody,"tsqd-query-details-actions-container"),oe=L(t`
                color: ${o(r.blue[600],r.blue[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-refetch"),st=b()==="fetching",lt=t`
                background-color: ${o(r.blue[600],r.blue[400])};
              `,We=L(t`
                color: ${o(r.yellow[600],r.yellow[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-invalidate"),Dt=p()==="pending",at=t`
                background-color: ${o(r.yellow[600],r.yellow[400])};
              `,Mt=L(t`
                color: ${o(r.gray[600],r.gray[300])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-reset"),ut=p()==="pending",pt=t`
                background-color: ${o(r.gray[600],r.gray[400])};
              `,pn=L(t`
                color: ${o(r.pink[500],r.pink[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-remove"),Yt=b()==="fetching",wn=t`
                background-color: ${o(r.pink[500],r.pink[400])};
              `,_t=L(t`
                color: ${o(r.cyan[500],r.cyan[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-loading"),xn=s(),Xt=t`
                background-color: ${o(r.cyan[500],r.cyan[400])};
              `,Zt=L(n().detailsHeader,"tsqd-query-details-header"),Jt=L(n().detailsHeader,"tsqd-query-details-header"),qt=S.size[2];return re!==P.e&&I(C,P.e=re),pe!==P.t&&I(E,P.t=pe),ue!==P.a&&I(O,P.a=ue),se!==P.o&&I(J,P.o=se),ce!==P.i&&I(he,P.i=ce),we!==P.n&&I(Fe,P.n=we),oe!==P.s&&I(F,P.s=oe),st!==P.h&&(F.disabled=P.h=st),lt!==P.r&&I(ae,P.r=lt),We!==P.d&&I(ne,P.d=We),Dt!==P.l&&(ne.disabled=P.l=Dt),at!==P.u&&I(bt,P.u=at),Mt!==P.c&&I(G,P.c=Mt),ut!==P.w&&(G.disabled=P.w=ut),pt!==P.m&&I(Ee,P.m=pt),pn!==P.f&&I(De,P.f=pn),Yt!==P.y&&(De.disabled=P.y=Yt),wn!==P.g&&I(Ot,P.g=wn),_t!==P.p&&I(qe,P.p=_t),xn!==P.b&&(qe.disabled=P.b=xn),Xt!==P.T&&I(vt,P.T=Xt),Zt!==P.A&&I(ot,P.A=Zt),Jt!==P.O&&I(Je,P.O=Jt),qt!==P.I&&((P.I=qt)!=null?it.style.setProperty("padding",qt):it.style.removeProperty("padding")),P},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),C}})},df=()=>{const e=$e(),t=N().shadowDOMTarget?Q.bind({target:N().shadowDOMTarget}):Q,n=M(()=>e()==="dark"?je(t):He(t)),{colors:r}=S,o=(g,d)=>e()==="dark"?d:g,l=Qe(g=>{const u=g().getAll().find(f=>f.mutationId===xt());return u?u.state.isPaused:!1}),s=Qe(g=>{const u=g().getAll().find(f=>f.mutationId===xt());return u?u.state.status:"idle"}),a=M(()=>Nt({isPaused:l(),status:s()})),i=Qe(g=>g().getAll().find(d=>d.mutationId===xt()),!1),c=()=>a()==="gray"?t`
        background-color: ${o(r[a()][200],r[a()][700])};
        color: ${o(r[a()][700],r[a()][300])};
        border-color: ${o(r[a()][400],r[a()][600])};
      `:t`
      background-color: ${o(r[a()][100],r[a()][900])};
      color: ${o(r[a()][700],r[a()][300])};
      border-color: ${o(r[a()][400],r[a()][600])};
    `;return v(U,{get when(){return i()},get children(){var g=nf(),d=g.firstChild,u=d.nextSibling,f=u.firstChild,h=f.firstChild,y=h.firstChild,m=h.nextSibling,b=f.nextSibling,p=b.firstChild,w=p.nextSibling,x=u.nextSibling,$=x.nextSibling,q=$.nextSibling,A=q.nextSibling,K=A.nextSibling,C=K.nextSibling,E=C.nextSibling,O=E.nextSibling;return k(y,v(U,{get when(){return i().options.mutationKey},fallback:"No mutationKey found",get children(){return En(i().options.mutationKey,!0)}})),k(m,v(U,{get when(){return a()==="purple"},children:"pending"}),null),k(m,v(U,{get when(){return a()!=="purple"},get children(){return s()}}),null),k(w,()=>new Date(i().state.submittedAt).toLocaleTimeString()),k($,v(wt,{label:"Variables",defaultExpanded:["Variables"],get value(){return i().state.variables}})),k(A,v(wt,{label:"Context",defaultExpanded:["Context"],get value(){return i().state.context}})),k(C,v(wt,{label:"Data",defaultExpanded:["Data"],get value(){return i().state.data}})),k(O,v(wt,{label:"Mutation",defaultExpanded:["Mutation"],get value(){return i()}})),H(z=>{var Y=L(n().detailsContainer,"tsqd-query-details-container"),me=L(n().detailsHeader,"tsqd-query-details-header"),J=L(n().detailsBody,"tsqd-query-details-summary-container"),R=L(n().queryDetailsStatus,c()),X=L(n().detailsHeader,"tsqd-query-details-header"),ee=S.size[2],ye=L(n().detailsHeader,"tsqd-query-details-header"),le=S.size[2],ge=L(n().detailsHeader,"tsqd-query-details-header"),he=S.size[2],Fe=L(n().detailsHeader,"tsqd-query-details-header"),F=S.size[2];return Y!==z.e&&I(g,z.e=Y),me!==z.t&&I(d,z.t=me),J!==z.a&&I(u,z.a=J),R!==z.o&&I(m,z.o=R),X!==z.i&&I(x,z.i=X),ee!==z.n&&((z.n=ee)!=null?$.style.setProperty("padding",ee):$.style.removeProperty("padding")),ye!==z.s&&I(q,z.s=ye),le!==z.h&&((z.h=le)!=null?A.style.setProperty("padding",le):A.style.removeProperty("padding")),ge!==z.r&&I(K,z.r=ge),he!==z.d&&((z.d=he)!=null?C.style.setProperty("padding",he):C.style.removeProperty("padding")),Fe!==z.l&&I(E,z.l=Fe),F!==z.u&&((z.u=F)!=null?O.style.setProperty("padding",F):O.style.removeProperty("padding")),z},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),g}})},In=new Map,ff=()=>{const e=M(()=>N().client.getQueryCache()),t=e().subscribe(n=>{Os(()=>{for(const[r,o]of In.entries())o.shouldUpdate(n)&&o.setter(r(e))})});return j(()=>{In.clear(),t()}),t},Ce=(e,t=!0,n=()=>!0)=>{const r=M(()=>N().client.getQueryCache()),[o,l]=B(e(r),t?void 0:{equals:!1});return V(()=>{l(e(r))}),In.set(e,{setter:l,shouldUpdate:n}),j(()=>{In.delete(e)}),o},Pn=new Map,gf=()=>{const e=M(()=>N().client.getMutationCache()),t=e().subscribe(()=>{for(const[n,r]of Pn.entries())queueMicrotask(()=>{r(n(e))})});return j(()=>{Pn.clear(),t()}),t},Qe=(e,t=!0)=>{const n=M(()=>N().client.getMutationCache()),[r,o]=B(e(n),t?void 0:{equals:!1});return V(()=>{o(e(n))}),Pn.set(e,o),j(()=>{Pn.delete(e)}),r},Es=(e,t)=>{const{colors:n,font:r,size:o,alpha:l,shadow:s,border:a}=S,i=(c,g)=>e==="light"?c:g;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${s.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${S.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${S.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
        width: ${o[2]};
        height: ${o[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${o[2]};
      transform: translate(0, 100%);
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${a.radius.sm} ${a.radius.sm};
      padding: ${o[.5]} ${o[1.5]} ${o[1]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${o[2]};
      transform: translate(0, -100%);
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${a.radius.sm} ${a.radius.sm} 0px 0px;
      padding: ${o[1]} ${o[1.5]} ${o[.5]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${o[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${a.radius.sm} 0px 0px ${a.radius.sm};
      padding: ${o[1.5]} ${o[.5]} ${o[1.5]} ${o[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${o[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${a.radius.sm} ${a.radius.sm} 0px;
      padding: ${o[1.5]} ${o[1]} ${o[1.5]} ${o[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${i("",l[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${S.size[2]} ${S.size[2.5]};
      gap: ${S.size[2.5]};
      border-bottom: ${i(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${o[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${S.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${S.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${i(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${i("#ea4037, #ff9b11","#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${S.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${S.size[1.5]};
      box-sizing: border-box;
      height: ${S.size[6.5]};
      background: ${i(n.gray[50],n.darkGray[500])};
      color: ${i(n.gray[700],n.gray[300])};
      border-radius: ${S.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${S.size[1]};
      padding-left: ${S.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${i("1px solid "+n.gray[300],"1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${i(n.gray[500],n.gray[400])};
      background-color: ${i(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${S.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${i(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${S.size[2]}));
      padding: ${S.size[.5]} ${S.size[2]};
      border-radius: ${S.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${i(n.gray[400],n.gray[600])};
      color: ${i(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${i(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${i(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${S.size[2]};
      & > button {
        cursor: pointer;
        padding: ${S.size[.5]} ${S.size[1.5]} ${S.size[.5]}
          ${S.size[2]};
        border-radius: ${S.border.radius.sm};
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: 1px solid ${i(n.gray[300],n.darkGray[200])};
        color: ${i(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${S.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${S.size[3]};
          height: ${S.size[3]};
          color: ${i(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${o[.5]} ${o[2]};
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${S.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${i(n.gray[600],n.gray[400])};
      & > svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${i(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${i(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${S.size[.5]} ${S.size[2]};
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${S.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${i(n.gray[600],n.gray[400])};
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
      & > select {
        appearance: none;
        color: ${i(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${S.size[2]};
    `,actionsBtn:t`
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      width: ${S.size[6.5]};
      height: ${S.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${S.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${i(n.gray[700],n.gray[300])};
        width: ${S.size[3]};
        height: ${S.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${i(n.yellow[700],n.yellow[500])};
        fill: ${i(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${i(n.gray[700],n.gray[300])};
      background-color: ${i(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${i(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${S.size[1]};
        user-select: none;
        min-width: ${S.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${S.size[6]};
        flex: 1;
        padding: ${S.size[1]} ${S.size[2]};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${S.size[2]};
        color: ${i(n.gray[800],n.gray[300])};
        background-color: ${i(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${i(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      color: ${i(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${i(n.gray[200],n.darkGray[600])};
      padding: ${S.size[1.5]} ${S.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${S.size[1.5]} 0px ${S.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${S.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${S.size[1.5]};
      }

      & code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${S.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${S.size[1]} ${S.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${S.size[2]} 0px ${S.size[2]} 0px;
      display: flex;
      gap: ${S.size[2]};
      padding: 0px ${S.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${S.size[1]} ${S.size[2]};
        display: flex;
        border-radius: ${S.border.radius.sm};
        background-color: ${i(n.gray[100],n.darkGray[600])};
        border: 1px solid ${i(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${S.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${i(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${o[1.5]};
          height: ${o[1.5]};
          border-radius: ${S.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${S.size[.5]} ${S.size[2]};
      display: flex;
      border-radius: ${S.border.radius.sm};
      overflow: hidden;
      background-color: ${i(n.gray[100],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${S.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${i(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${o[1.5]};
        height: ${o[1.5]};
        border-radius: ${S.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${S.colors.red[400]};
      }
      & svg {
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${o[.5]};
      border-radius: ${S.border.radius.sm};
      border: 1px solid ${i(n.gray[300],n.gray[700])};
      background-color: ${i(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${i(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${o[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${S.border.radius.xs};
      padding: ${S.size[1]} ${S.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${i(n.gray[700],n.gray[300])};
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${S.size[1]} ${S.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
      color: ${i(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${i(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${S.border.radius.xs};
      padding: ${S.size[1]} ${S.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,themeSelectedButton:t`
      background-color: ${i(n.purple[100],n.purple[900])};
      color: ${i(n.purple[700],n.purple[300])};
      & svg {
        color: ${i(n.purple[700],n.purple[300])};
      }
      &:hover {
        background-color: ${i(n.purple[100],n.purple[900])};
      }
    `,viewToggle:t`
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[200],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${i(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${i(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${i(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${i(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${S.size[1.5]} 0 ${S.size[2]};
        }
        border-right: 1px solid ${i(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${S.size[2]} 0 ${S.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${o[2]};
      & > [data-error='true'] {
        outline: 2px solid ${i(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${a.radius.sm};
      field-sizing: content;
      padding: ${o[2]};
      background-color: ${i(n.gray[100],n.darkGray[800])};
      color: ${i(n.gray[900],n.gray[100])};
      border: 1px solid ${i(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${i(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${o[2]};
      align-items: center;
      padding-top: ${o[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${i(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${o[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${o[1]} ${S.size[2]};
      display: flex;
      border-radius: ${a.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${o[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},He=e=>Es("light",e),je=e=>Es("dark",e);cr(["click","mousedown","input"]);export{ks as C,pf as D,vf as P,ul as Q,bf as T,cl as a,wf as b,mf as c};
//# sourceMappingURL=B4MFY5CR.js.map
