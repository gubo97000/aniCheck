var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,l=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,i=(e,i)=>{for(var n in i||(i={}))t.call(i,n)&&l(e,n,i[n]);if(a)for(var n of a(i))s.call(i,n)&&l(e,n,i[n]);return e};import{c as n,W as r,r as o,a as c,k as m,d as u,p as d,G as p,S as g,B as h,g as E,u as y,A as f,F as v,I as O,b,C,e as S,E as A,f as N,l as k,h as M,M as T,i as w,N as V,j as x,m as I,n as L,T as W,D,o as R,L as P,q as j,s as U,t as z,v as _,w as H,x as $,y as B,z as G,H as F,J,P as K,K as Y,O as q,Q,R as X,U as Z,V as ee,X as te,Y as ae,Z as se,_ as le}from"./vendor.d44a1cb7.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,i)=>{const n=new URL(e,s);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const r=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){i(new Error(`Failed to import: ${e}`)),l(o)},onload(){a(self[t].moduleMap[n]),l(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/aniCheck/assets/");const ie={cy:n({headless:!0}),userOptions:{sort:{type:"alphabetical",inverted:!1},smartCompletition:!0,completition:[],animeComposition:["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC"],mangaComposition:["MANGA","ONE_SHOT"]},seriesDict:{}},{Provider:ne,useTracked:re}=r((()=>o.useState(ie)));function oe(){const[e,t]=re();let a=o.useRef(null);o.useEffect((()=>{n.use(c),n.use(m),n.use(u);try{n.use(d)}catch(o){}let e=n({container:a.current,elements:[{data:{id:"a",title:"Ani"}},{data:{id:"b",title:"Check"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{label:"data(title)"}},{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:'node[status="CURRENT"]',style:{"background-color":"cyan"}},{selector:"edge",style:{"curve-style":"unbundled-bezier",width:5,"target-arrow-shape":"triangle","target-label":"data(relation)","target-text-offset":80}},{selector:'node[format="MANGA"]',style:{"border-width":"1px",shape:"polygon","shape-polygon-points":"0.846 -0.923 -0.602 -0.923 -0.923 -0.806 -0.923 0.846 -0.692 0.923 0.692 0.923 0.692 -0.692 -0.692 -0.692 -0.692 0.923 -0.692 -0.692 -0.769 -0.769 -0.538 -0.846 0.846 -0.846 0.846 0.769 "}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});e.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),e.on("tap","node,edge",(e=>{console.log(e.target.data())}));let s=e.nodes().first();console.log(s);let l=s.popper({content:()=>{let e=document.createElement("div");return e.innerHTML="Sticky Popper content",document.body.appendChild(e),e}}),r=()=>{l.update()};s.on("position",r),e.on("pan zoom resize",r),t((t=>i(i({},t),{cyViz:e})))}),[]);return o.createElement(p,{sx:{position:"relative"},item:!0,xs:9},o.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}),o.createElement(g,{sx:{position:"absolute",top:"20%",right:"3%"},spacing:2},o.createElement(h,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"breadthfirst",animate:!0}).run()}},"Breathfirst"),o.createElement(h,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"klay",animate:!0,nodeDimensionsIncludeLabels:!0,klay:{layoutHierarchy:!1}}).run()}},"Klay"),o.createElement(h,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"dagre",animate:!0,nodeDimensionsIncludeLabels:!0}).run()}},"Dagre")))}const ce=E`
query ($user: String!, $type: MediaType){
  MediaListCollection(userName: $user, type: $type) {
    lists {
      entries {
        id
        status
        media {
          id
          title {
            userPreferred
            romaji
            english
          }
          synonyms
          startDate {
            year
            month
            day
          }
          format
          coverImage {
            medium
            color
          }
          bannerImage
          popularity
          siteUrl
          chapters
          volumes
          episodes
          duration
          nextAiringEpisode {
            episode
          }
          status(version: 2)
          relations {
            nodes {
              id
              title {
                userPreferred
                romaji
                english
              }
              synonyms
              startDate {
                year
                month
                day
              }
              format
              coverImage {
                medium
                color
              }
              bannerImage
              popularity
              siteUrl
              chapters
              volumes
              episodes
              duration
              nextAiringEpisode {
                episode
              }
              status(version: 2)
            }
            edges {
              id
              relationType(version: 2)
              node {
                id
              }
            }
          }
        }
      }
      name
      isCustomList
      isSplitCompletedList
    }

  }
}
`;function me(e,t=null){var a,s;try{JSON.parse(null!=(a=localStorage.getItem(e))?a:JSON.stringify(t))}catch(n){console.log("Old Data found, trying to reset"),localStorage.removeItem(e)}const[l,i]=o.useState(JSON.parse(null!=(s=localStorage.getItem(e))?s:JSON.stringify(t)));return o.useEffect((()=>{localStorage.setItem(e,JSON.stringify(l))}),[l]),[l,i]}function ue(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.missWeight-a.item.stats.selected.missWeight:a.item.stats.selected.missWeight-e.item.stats.selected.missWeight))}function de(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.perWeight-a.item.stats.selected.perWeight:a.item.stats.selected.perWeight-e.item.stats.selected.perWeight))}function pe(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.per-a.item.stats.selected.per:a.item.stats.selected.per-e.item.stats.selected.per))}function ge(e,t){return e.sort(((e,a)=>(console.log(e),t?e.rankedValue[0].localeCompare(a.rankedValue):a.rankedValue[0].localeCompare(e.rankedValue))))}function he(e,t){return e.sort(((e,a)=>t?e.item.stats.serieMiss+e.item.stats.serieTot-(a.item.stats.serieMiss+a.item.stats.serieTot):a.item.stats.serieMiss+a.item.stats.serieTot-(e.item.stats.serieMiss+e.item.stats.serieTot)))}const Ee=["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC","MANGA","NOVEL","ONE_SHOT"],ye=[{id:"TV",label:"TV",tooltip:"Anime broadcast on television"},{id:"TV_SHORT",label:"TV Short",tooltip:"Anime which are under 15 minutes in length and broadcast on television"},{id:"MOVIE",label:"Movie",tooltip:"Anime movies with a theatrical release"},{id:"SPECIAL",label:"Special",tooltip:"Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc"},{id:"OVA",label:"OVA",tooltip:"(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast"},{id:"ONA",label:"ONA",tooltip:"(Original Net Animation) Anime that have been originally released online or are only available through streaming services."},{id:"MUSIC",label:"Music",tooltip:"Short anime released as a music video"},{id:"MANGA",label:"Manga",tooltip:"Professionally published manga with more than one chapter"},{id:"NOVEL",label:"Novel",tooltip:"Written books released as a series of light novels"},{id:"ONE_SHOT",label:"One Shot",tooltip:"Manga with just one chapter"}];function fe(e,t){switch(e){case"anime":return t.animeComposition;case"manga":return t.mangaComposition;default:return[e]}}function ve(e,t){var a,s,l,i,n;let r=0,o=0,c=0,m=0,u=0,d=0;for(const p of e)r+=null!=(a=t[p].tot)?a:0,o+=null!=(s=t[p].miss)?s:0,c+=t[p].tot-t[p].miss,m+=null!=(l=t[p].totWeight)?l:0,u+=null!=(i=t[p].missWeight)?i:0,d+=null!=(n=t[p].gotWeight)?n:0;return{tot:r,miss:o,got:c,totWeight:m,missWeight:u,gotWeight:d}}function Oe(e){e((e=>{if(e.userOptions.smartCompletition)for(const[t,a]of Object.entries(e.seriesDict)){let s=0,l=0,i=0,n=0,r=0,o=0;for(const t of["anime","manga","NOVEL"]){let{got:c,miss:m,tot:u,totWeight:d,missWeight:p,gotWeight:g}=ve(fe(t,e.userOptions),a.stats);0!=c&&(s+=u,l+=m,i+=c,n+=d,r+=p,o+=g)}e.seriesDict[t].stats.selected={tot:s,miss:l,got:i,per:Math.floor(i/s*100),totWeight:n,missWeight:r,gotWeight:o,perWeight:Math.floor(o/n*100)}}else for(const[t,a]of Object.entries(e.seriesDict)){let{got:s,miss:l,tot:i,totWeight:n,missWeight:r,gotWeight:o}=ve(e.userOptions.completition,a.stats);e.seriesDict[t].stats.selected={tot:i,got:s,miss:l,per:Math.floor(s/i*100),totWeight:n,gotWeight:o,missWeight:r,perWeight:Math.floor(o/n*100)}}return i({},e)}))}const be={CHARACTER:1,SEQUEL:2,SIDE_STORY:3,SOURCE:4,ADAPTATION:5,ALTERNATIVE:6,SPIN_OFF:7,SUMMARY:8,COMPILATION:9,CONTAINS:10,PREQUEL:11,PARENT:12,OTHER:13},Ce=()=>{const[e,t]=re();let[a,s]=o.useState(!1),[l,n]=o.useState(""),[r,c]=me("usr","");const m=()=>{d({variables:{user:r,type:"ANIME"}})},u=e=>({id:e.id,status:"NO",airStatus:e.status,format:e.format,title:e.title.userPreferred,titles:[...Object.values(e.title),...e.synonyms].filter((e=>!["MediaTitle",null].includes(e))),siteUrl:e.siteUrl,bannerImage:e.bannerImage,popularity:e.popularity,compWeight:(e=>{var t,a;if("NOT_YET_RELEASED"==e.status)return 0;if(e.chapters)return 5*e.chapters;if(e.volumes)return 50*e.volumes;if(e.episodes&&e.duration)return e.episodes*e.duration;if((null==(t=e.nextAiringEpisode)?void 0:t.episode)&&e.duration)return(null==(a=e.nextAiringEpisode)?void 0:a.episode)*e.duration;let s=[e.startDate.year,e.startDate.month,e.startDate.day].join("-"),l=(Date.now()-Date.parse(s))/864e5;return"MANGA"==e.format?5*k.round(l/8.2):(e.format,20*k.round(l/8.2))})(e),startDate:[e.startDate.year,e.startDate.month,e.startDate.day].join("-")}),[d,g]=y(ce,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{h({variables:{user:r,type:"MANGA"}})}}),[h,E]=y(ce,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{let a=e.cy;const[s,l]=(e=>{let t=new Map,a=new Map;console.log(e);for(let s of e)for(let e of s.entries){t.set(e.media.id,{data:i(i({},u(e.media)),{status:e.status})});for(let a of e.media.relations.nodes)t.get(a.id)||t.set(a.id,{data:i(i({},u(a)),{status:"NO"})});for(let t of e.media.relations.edges)a.set(t.id,{data:{id:"l"+t.id,source:e.media.id,target:t.node.id,relation:t.relationType}})}return[t,a]})([].concat(g.data.MediaListCollection.lists,E.data.MediaListCollection.lists));console.log(s,l),a.elements().remove(),a.add(Array.from(s.values()).concat(Array.from(l.values())));let n=a.elements().components(),r=[];n.map((e=>{let t=e.edges().map((e=>e.parallelEdges().sort(((e,t)=>be[e.data("relation")]-be[t.data("relation")]))[0]));e.edges().remove(),t.map((e=>{e.restore()})),e.filter("edge[relation!='CHARACTER'],node").components().map((t=>{t.nodes().length!=t.filter("node[status='NO']").length&&r.push({series:t,serieComplete:e})}))}));let o=r.map((e=>{let t=e.series.sort(((e,t)=>{let a=parseInt(e.data("popularity")),s=parseInt(t.data("popularity"));return isNaN(a)?999:isNaN(s)?-1:s-a}));return{seriesPrime:t.nodes()[0],series:t,serieComplete:e.serieComplete}})).map((e=>{var t,a,s,l,n,r,o,c,m;let u={};for(let i of["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC","MANGA","NOVEL","ONE_SHOT"]){let d=e.series.nodes().filter(`node[format='${i}']`);u[i]={tot:null!=(t=d.length)?t:0,miss:null!=(a=d.filter("node[status='NO']").length)?a:0,got:null!=(s=d.filter("node[status!='NO']").length)?s:0,totWeight:null==(n=null==(l=d.map((e=>e.data("compWeight"))))?void 0:l.reduce)?void 0:n.call(l,((e,t)=>e+t),0),missWeight:null==(o=null==(r=d.filter("node[status='NO']").map((e=>e.data("compWeight"))))?void 0:r.reduce)?void 0:o.call(r,((e,t)=>e+t),0),gotWeight:null==(m=null==(c=d.filter("node[status!='NO']").map((e=>e.data("compWeight"))))?void 0:c.reduce)?void 0:m.call(c,((e,t)=>e+t),0)}}return i(i({},e),{stats:u})})),c={};o.map((e=>{c[e.seriesPrime.data("id")]=e})),t((e=>i(i({},e),{seriesList:o,seriesDict:c}))),Oe(t),console.log(e)}});return o.useEffect((()=>{g.loading||E.loading?s(!0):s(!1),g.error?n(g.error.message):E.error?n(E.error.message):n(" ")}),[g,E]),o.createElement("div",null,o.createElement(p,{container:!0,direction:"row",justifyContent:"flex-start",alignItems:"center"},o.createElement(p,{item:!0},o.createElement(f,{variant:"rounded"})),o.createElement(p,{item:!0},o.createElement(v,{sx:{m:1,width:"100%"},variant:"standard"},o.createElement(O,{id:"standard-adornment-password",placeholder:"AniList Nick",value:r,onChange:e=>{c(e.target.value)},onKeyPress:e=>{"Enter"==e.key&&m()},endAdornment:o.createElement(b,{position:"end"},a?o.createElement(C,null):o.createElement(S,{"aria-label":"get user anime",onClick:m},o.createElement(A,null)))}),o.createElement(N,{id:"standard-weight-helper-text"},l)))))},Se=()=>{const[e,t]=re(),[a,s]=me("sort",e.userOptions.sort);o.useEffect((()=>{t((e=>i(i({},e),{userOptions:i(i({},e.userOptions),{sort:a})})))}),[a]);const[l,n]=o.useState(null),r=Boolean(l),c=()=>{n(null)},m=e=>{a.type==e?s({type:e,inverted:!a.inverted}):s(i(i({},a),{type:e}))};return o.createElement("span",null,o.createElement(S,{id:"sort-button","aria-controls":"sort-menu","aria-haspopup":"true","aria-expanded":r?"true":void 0,onClick:e=>{n(e.currentTarget)}},o.createElement(M,null)),o.createElement(T,{id:"sort-menu",anchorEl:l,open:r,onClose:c,MenuListProps:{"aria-labelledby":"sort-button"}},o.createElement(w,{selected:"complete%"==a.type,onClick:()=>m("complete%")},a.inverted?o.createElement(V,null):o.createElement(x,null),"Complete %"),o.createElement(w,{selected:"weight%"==a.type,onClick:()=>m("weight%")},a.inverted?o.createElement(V,null):o.createElement(x,null),"Weighted Complete %"),o.createElement(w,{selected:"alphabetical"==a.type,onClick:()=>m("alphabetical")},a.inverted?o.createElement(V,null):o.createElement(x,null),"Alphabetical"),o.createElement(w,{selected:"missWeight"==a.type,onClick:()=>m("missWeight")},a.inverted?o.createElement(V,null):o.createElement(x,null),"Easy To Complete"),o.createElement(w,{onClick:c},"Easy Complete"),o.createElement(w,{onClick:c},"Alphabetical"),o.createElement(w,{selected:"size"==a.type,onClick:()=>m("size")},a.inverted?"Up":"Do"," Size")))},Ae=({children:e})=>{const[t,a]=re();let[s,l]=o.useState(""),[i,n]=o.useState([]);return o.useEffect((()=>{var e;console.log(t.userOptions),n(I(Object.values(null!=(e=t.seriesDict)?e:[]),"",{keys:[e=>e.series.map((e=>e.data("titles")))],sorter:e=>(console.log(e),function(e){switch(e){case"weight%":return de;case"complete%":return pe;case"alphabetical":return ge;case"size":return he;case"missWeight":return ue;default:return ge}}(t.userOptions.sort.type)(e,t.userOptions.sort.inverted))}))}),[t.seriesList,t.userOptions.sort]),o.createElement(L,null,o.createElement(W,{value:s,onChange:e=>{var a;l(e.target.value),n(I(Object.values(null!=(a=t.seriesDict)?a:[]),e.target.value,{keys:[e=>e.series.map((e=>e.data("titles")))]}))}}),o.createElement(S,{onClick:()=>{var e;null==(e=t.modalOpenState)||e[1](!0)}},o.createElement(D,null)),o.createElement(Se,null),o.createElement(S,null,o.createElement(M,null)),o.createElement(S,null,o.createElement(R,null)),o.isValidElement(e)?o.cloneElement(e,{seriesToRender:i}):o.createElement("p",null,"Shouldn't display"))},Ne=({index:e,style:t,data:a})=>{var s,l,n;re();const[r,c]=o.useState(!1);let{addState:m,remState:u,handleToggle:d,seriesList:p,test:g}=a,h=null==(s=p[e])?void 0:s.series,E=null==(l=p[e])?void 0:l.seriesPrime,y=null==(n=p[e])?void 0:n.seriesPrime.data("id");return o.useLayoutEffect((()=>(m({id:y,state:[r,c],series:h}),()=>{u(y)})),[]),o.createElement(L,{style:i({},t),sx:{},key:y},o.createElement(P,{sx:{marginBottom:"10px",border:"1px solid",borderColor:"grey.500",background:`url(${E.data("bannerImage")}) no-repeat center center`,backgroundSize:"cover",color:"white",height:"calc(100% - 10px)",width:"calc(100% - 10px)",borderRadius:"5px",boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"},selected:r,key:y,button:!0,onClick:()=>{m({id:y,state:[r,c],series:h}),d(y)}},o.createElement(j,{sx:{fontSize:"19px"},id:y,primary:E.data("title")+p[e].stats.selected.missWeight}),o.createElement(L,{sx:{position:"relative",display:"inline-flex"}},o.createElement(C,{size:80,variant:"determinate",color:"primary",value:p[e].stats.selected.per}),o.createElement(L,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(U,null,p[e].stats.selected.per))),o.createElement(L,{sx:{position:"relative",display:"inline-flex"}},o.createElement(C,{variant:"determinate",color:"secondary",value:p[e].stats.selected.perWeight}),o.createElement(L,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(U,null,p[e].stats.selected.perWeight)))))},ke=({seriesToRender:e})=>{const[t,a]=re();let[s,l]=o.useState([]);o.useEffect((()=>{var a;l(null!=(a=null!=e?e:t.seriesList)?a:[])}),[e,t.seriesList]);let[n,r]=o.useState("Very Stupid Fix"),c=o.useMemo((()=>""),[n]);var m=o.useMemo((()=>({})),[n]);const u=e=>{m[e.id]={id:e.id,state:e.state,series:e.series},c==e.id&&e.state[1](!0)},d=e=>{delete m[e]},p=e=>{var s,l,n,r,o,u,d,p;c&&(null==(l=null==(s=null==m?void 0:m[c])?void 0:s.state)||l[1](!1)),c=e,m[e].state[1](!0),a((t=>i(i({},t),{seriesSelected:m[e].series}))),console.log(t.cyViz),console.log(null!=(r=null==(n=t.seriesDict)?void 0:n[e])?r:0),null==(o=t.cyViz)||o.elements().remove(),null==(u=t.cyViz)||u.add(m[e].series),null==(d=t.cyViz)||d.elements().makeLayout({name:"breadthfirst",roots:[c]}).run(),null==(p=t.cyViz)||p.center()};function g(e){var a,s;return null!=(s=null==(a=t.seriesList)?void 0:a[e].seriesPrime.data("id"))?s:"1"}return o.createElement(L,{sx:{height:"calc(100vh - 200px)"}},t.seriesList?o.createElement(z,null,(({height:e,width:t})=>{var a;return o.createElement(_,{height:e,itemSize:140,width:t,itemCount:null!=(a=null==s?void 0:s.length)?a:0,itemData:{addState:u,remState:d,handleToggle:p,seriesList:s},itemKey:g},Ne)})):o.createElement("p",null,"None"))},Me=()=>{const[e,t]=re();function a(e){t((t=>{switch(e){case"smart":return i(i({},t),{userOptions:i(i({},t.userOptions),{smartCompletition:!t.userOptions.smartCompletition})});case"all":return i(i({},t),{userOptions:i(i({},t.userOptions),{completition:Ee})});default:return i(i({},t),{userOptions:i(i({},t.userOptions),{completition:F(t.userOptions.completition,[e])})})}}))}return o.useEffect((()=>{Oe(t)}),[e.userOptions.completition,e.userOptions.smartCompletition,e.userOptions.mangaComposition,e.userOptions.animeComposition]),o.createElement("div",null,o.createElement(H,{control:o.createElement($,{checked:e.userOptions.smartCompletition,onClick:()=>a("smart")}),label:"Smart Completition"}),"What is anime? ",ye.map((a=>{if(["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC"].includes(a.id))return o.createElement(B,{key:a.label,title:a.tooltip},o.createElement(G,{variant:(s=a.id,e.userOptions.animeComposition.includes(s)?void 0:"outlined"),disabled:!e.userOptions.smartCompletition,label:a.label,onClick:()=>function(e){t((t=>i(i({},t),{userOptions:i(i({},t.userOptions),{animeComposition:F(t.userOptions.animeComposition,[e])})})))}(a.id)}));var s})),"What is Manga? ",ye.map((a=>{if(["MANGA","ONE_SHOT"].includes(a.id))return o.createElement(B,{key:a.label,title:a.tooltip},o.createElement(G,{variant:(s=a.id,e.userOptions.mangaComposition.includes(s)?void 0:"outlined"),disabled:!e.userOptions.smartCompletition,label:a.label,onClick:()=>function(e){t((t=>i(i({},t),{userOptions:i(i({},t.userOptions),{mangaComposition:F(t.userOptions.mangaComposition,[e])})})))}(a.id)}));var s})),o.createElement(H,{control:o.createElement($,{checked:!e.userOptions.smartCompletition,onClick:()=>a("smart")}),label:"Custom"}),o.createElement(h,{disabled:e.userOptions.smartCompletition,onClick:()=>a("all")},"Select All"),ye.map((t=>{return o.createElement(B,{key:t.label,title:t.tooltip},o.createElement(G,{variant:(s=t.id,e.userOptions.completition.includes(s)?void 0:"outlined"),disabled:e.userOptions.smartCompletition,label:t.label,onClick:()=>a(t.id)}));var s})))},Te={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4};function we(){const[e,t]=re(),[a,s]=o.useState("1"),[l,n]=o.useState(!1);o.useEffect((()=>{t((e=>i(i({},e),{modalOpenState:[l,n]})))}),[]);return o.createElement("div",null,o.createElement(J,{open:l,onClose:()=>{var t;return null==(t=e.modalOpenState)?void 0:t[1](!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description"},o.createElement(K,{sx:Te},o.createElement(Y,{value:a},o.createElement(L,{sx:{borderBottom:1,borderColor:"divider"}},o.createElement(q,{onChange:(e,t)=>{s(t)},"aria-label":"options"},o.createElement(Q,{label:"Completition Options",value:"1"}),o.createElement(Q,{label:"Sort",value:"2"}),o.createElement(Q,{label:"Filter",value:"3"}))),o.createElement(X,{value:"1"},o.createElement(Me,null)),o.createElement(X,{value:"2"},"Item Two"),o.createElement(X,{value:"3"},"Item Three")))))}function Ve(){re();let[e,t]=o.useState("Very Stupid Fix"),a=o.useMemo((()=>""),[e]);var s=o.useMemo((()=>({})),[e]);return o.createElement(p,{sx:{height:"100vh"},item:!0,xs:3},o.createElement(Ce,null),o.createElement("p",null,a," ",Object.keys(s).length),o.createElement(we,null),o.createElement(Ae,null,o.createElement(ke,null)))}const xe=new Z({uri:"https://graphql.anilist.co",cache:new ee}),Ie=te({palette:{mode:"light"}});ae.render(o.createElement(o.StrictMode,null,o.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),o.createElement(ne,null,o.createElement(se,{client:xe},o.createElement(le,{theme:Ie},o.createElement(p,{container:!0},o.createElement(oe,null),o.createElement(Ve,null)))))),document.getElementById("root"));
