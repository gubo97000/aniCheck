var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,r=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,l=(e,l)=>{for(var i in l||(l={}))t.call(l,i)&&r(e,i,l[i]);if(a)for(var i of a(l))s.call(l,i)&&r(e,i,l[i]);return e};import{c as i,W as n,r as o,P as c,G as m,T as u,B as d,I as p,a as g,M as E,b as h,d as O,e as f,f as y,g as v,k as b,h as C,p as S,i as A,S as T,j as x,s as N,l as M,m as w,u as k,A as L,F as I,n as V,o as D,C as R,q as W,E as P,t as z,v as j,w as U,x as _,N as H,y as F,z as $,D as B,H as G,L as J,J as Q,K,O as Y,Q as q,R as X,U as Z,V as ee,X as te,Y as ae,Z as se,_ as re,$ as le,a0 as ie,a1 as ne,a2 as oe,a3 as ce,a4 as me,a5 as ue,a6 as de,a7 as pe,a8 as ge,a9 as Ee}from"./vendor.2aad1c2c.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const i=new URL(e,s);if(self[t].moduleMap[i])return a(self[t].moduleMap[i]);const n=new Blob([`import * as m from '${i}';`,`${t}.moduleMap['${i}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){l(new Error(`Failed to import: ${e}`)),r(o)},onload(){a(self[t].moduleMap[i]),r(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/aniCheck/assets/");const he={cy:i({headless:!0}),userOptions:{sort:{type:"alphabetical",inverted:!1},smartCompletition:!0,completition:[],animeComposition:["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC"],mangaComposition:["MANGA","ONE_SHOT"],statusFilter:["COMPLETE","ERR"]},seriesDict:{},globalStats:{tot:0,miss:0,got:0}},{Provider:Oe,useTracked:fe}=n((()=>o.useState(he)));function ye(e){switch(e){case"NO":return"red";case"COMPLETED":return"green";default:return"grey.500"}}const ve=({data:e})=>o.createElement(c,{sx:{width:200,height:60,border:"1px solid",borderColor:ye(e.status),position:"relative"}},o.createElement(m,{container:!0,sx:{height:"100%"}},o.createElement(m,{item:!0,xs:12,sx:{height:"70%"}},o.createElement(u,null,e.title)),o.createElement(m,{item:!0,xs:6,sx:{borderTop:"solid 1px",borderColor:"grey.500",height:"30%",fontSize:13}},o.createElement(u,{sx:{marginRight:"22px",textAlign:"center",fontSize:13}},e.startDate)),o.createElement(m,{item:!0,xs:6,sx:{borderTop:"solid 1px",borderColor:"grey.500",height:"30%",textAlign:"center"}},o.createElement(u,{sx:{marginLeft:"22px",textAlign:"center",fontSize:13,textTransform:"capitalize"}},e.format.toLowerCase()))),o.createElement(d,{sx:{position:"absolute",width:50,height:50,borderRadius:20,border:"1px solid transparent",borderTopColor:"inherit",borderRightColor:"inherit",right:"35%",top:"58%",backgroundColor:"white",transform:"rotate(315deg)"}}," ",o.createElement(p,{sx:{margin:"auto",width:"100%",transform:"rotate(45deg)",position:"absolute",right:"-3px",top:"9px"}},function(e){switch(e){case"TV":case"TV_SHORT":return o.createElement(O,null);case"MOVIE":return o.createElement(f,null);case"SPECIAL":case"OVA":case"ONA":return o.createElement(O,null);case"MUSIC":return o.createElement(h,null);case"MANGA":case"ONE_SHOT":return o.createElement(E,null);case"NOVEL":return o.createElement(g,null);default:return""}}(e.format))));function be(){const[e,t]=fe();let a=o.useRef(null);o.useEffect((()=>{try{i.use(y),i.use(v),i.use(b),i.use(C),i.use(S),i.use(A)}catch(s){}let e=i({container:a.current,wheelSensitivity:.3,elements:[{data:{id:"a",title:"Welcome to AniCheck!",startDate:"2020-02-01",format:"helo"}},{data:{id:"b",title:"Check",startDate:"2020-02-01",format:"HELO"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{width:200,height:60,"background-color":"white",shape:"rectangle"}},{selector:"edge",style:{"curve-style":"unbundled-bezier",width:2,"target-arrow-shape":"triangle","target-label":"data(relation)","target-text-offset":80}},{selector:'edge[relation= "SEQUEL"]',style:{width:5,"line-color":"blue","target-arrow-color":"blue"}},{selector:'edge[relation= "ADAPTATION"],edge[relation= "SOURCE"]',style:{"line-style":"dashed","line-dash-pattern":[10],width:1,"line-color":"cyan","target-arrow-color":"cyan"}}],layout:{name:"cose"}});e.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),e.on("tap","node,edge",(e=>{console.log(e.target.data())})),e.nodeHtmlLabel([{query:"node",halign:"center",valign:"center",halignBox:"center",valignBox:"center",cssClass:"",tpl:e=>N.renderToString(o.createElement(ve,{data:e}))}]),t((t=>l(l({},t),{cyViz:e})))}),[]);return o.createElement(m,{sx:{position:"relative"},item:!0,xs:12,sm:9},o.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}),o.createElement(T,{sx:{position:"absolute",top:"20%",right:"3%"},spacing:2},o.createElement(x,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"breadthfirst",animate:!0}).run()}},"Breathfirst"),o.createElement(x,{onClick:()=>{var t,a;(null==(t=e.cyViz)?void 0:t.style()).selector("edge").style("curve-style","bezier"),null==(a=e.cyViz)||a.elements().makeLayout({name:"klay",animate:!0,nodeDimensionsIncludeLabels:!0,klay:{edgeRouting:"POLYLINE",layoutHierarchy:!1,spacing:40,nodeLayering:"NETWORK_SIMPLEX",mergeEdges:!0,thoroughness:50}}).run()}},"Klay"),o.createElement(x,{onClick:()=>{var t,a;(null==(t=e.cyViz)?void 0:t.style()).selector("edge").style("curve-style","bezier"),null==(a=e.cyViz)||a.elements().makeLayout({name:"dagre",animate:!0,nodeDimensionsIncludeLabels:!0}).run()}},"Dagre"),o.createElement(x,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"cola",animate:!0,nodeSpacing:()=>50,randomize:!0}).run()}},"Cola"),o.createElement(x,{onClick:()=>{var t;null==(t=e.cyViz)||t.elements().makeLayout({name:"fcose",animate:!0,nodeSeparation:2e3,nodeRepulsion:()=>45e6}).run()}},"Cose")))}const Ce=M`
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
`;function Se(e,t=null){var a,s;try{JSON.parse(null!=(a=localStorage.getItem(e))?a:JSON.stringify(t))}catch(i){console.log("Old Data found, trying to reset"),localStorage.removeItem(e)}const[r,l]=o.useState(JSON.parse(null!=(s=localStorage.getItem(e))?s:JSON.stringify(t)));return o.useEffect((()=>{localStorage.setItem(e,JSON.stringify(r))}),[r]),[r,l]}function Ae(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.missWeight-a.item.stats.selected.missWeight:a.item.stats.selected.missWeight-e.item.stats.selected.missWeight))}function Te(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.perWeight-a.item.stats.selected.perWeight:a.item.stats.selected.perWeight-e.item.stats.selected.perWeight))}function xe(e,t){return e.sort(((e,a)=>t?e.item.stats.selected.per-a.item.stats.selected.per:a.item.stats.selected.per-e.item.stats.selected.per))}function Ne(e,t){return console.log(e),e.sort(((e,a)=>t?e.rankedValue[0].localeCompare(a.rankedValue):a.rankedValue[0].localeCompare(e.rankedValue)))}function Me(e,t){return e.sort(((e,a)=>t?e.item.stats.serieMiss+e.item.stats.serieTot-(a.item.stats.serieMiss+a.item.stats.serieTot):a.item.stats.serieMiss+a.item.stats.serieTot-(e.item.stats.serieMiss+e.item.stats.serieTot)))}const we=["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC","MANGA","NOVEL","ONE_SHOT"],ke=[{id:"TV",label:"TV",tooltip:"Anime broadcast on television"},{id:"TV_SHORT",label:"TV Short",tooltip:"Anime which are under 15 minutes in length and broadcast on television"},{id:"MOVIE",label:"Movie",tooltip:"Anime movies with a theatrical release"},{id:"SPECIAL",label:"Special",tooltip:"Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc"},{id:"OVA",label:"OVA",tooltip:"(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast"},{id:"ONA",label:"ONA",tooltip:"(Original Net Animation) Anime that have been originally released online or are only available through streaming services."},{id:"MUSIC",label:"Music",tooltip:"Short anime released as a music video"},{id:"MANGA",label:"Manga",tooltip:"Professionally published manga with more than one chapter"},{id:"NOVEL",label:"Novel",tooltip:"Written books released as a series of light novels"},{id:"ONE_SHOT",label:"One Shot",tooltip:"Manga with just one chapter"}];function Le(e,t){switch(e){case"anime":return t.animeComposition;case"manga":return t.mangaComposition;default:return[e]}}function Ie(e,t){var a,s,r,l,i;let n=0,o=0,c=0,m=0,u=0,d=0;for(const p of e)n+=null!=(a=t[p].tot)?a:0,o+=null!=(s=t[p].miss)?s:0,c+=t[p].tot-t[p].miss,m+=null!=(r=t[p].totWeight)?r:0,u+=null!=(l=t[p].missWeight)?l:0,d+=null!=(i=t[p].gotWeight)?i:0;return{tot:n,miss:o,got:c,totWeight:m,missWeight:u,gotWeight:d}}const Ve=e=>{console.log(JSON.stringify(e.globalStats));let t={tot:Object.keys(e.seriesDict).length,got:0,miss:0};if(e.userOptions.smartCompletition)for(const[a,s]of Object.entries(e.seriesDict)){let r=0,l=0,i=0,n=0,o=0,c=0;for(const t of["anime","manga","NOVEL"]){let{got:a,miss:m,tot:u,totWeight:d,missWeight:p,gotWeight:g}=Ie(Le(t,e.userOptions),s.stats);0!=a&&(r+=u,l+=m,i+=a,n+=d,o+=p,c+=g)}e.seriesDict[a].stats.selected={tot:r,miss:l,got:i,per:Math.floor(i/r*100),totWeight:n,missWeight:o,gotWeight:c,perWeight:Math.floor(c/n*100)},0!=r?r==i?(e.seriesDict[a].status="COMPLETE",t.got+=1):(e.seriesDict[a].status="NOT_COMPLETE",t.miss+=1):e.seriesDict[a].status="ERR"}else for(const[a,s]of Object.entries(e.seriesDict)){let{got:r,miss:l,tot:i,totWeight:n,missWeight:o,gotWeight:c}=Ie(e.userOptions.completition,s.stats);e.seriesDict[a].stats.selected={tot:i,got:r,miss:l,per:Math.floor(r/i*100),totWeight:n,gotWeight:c,missWeight:o,perWeight:Math.floor(c/n*100)},0!=i?i==r?(e.seriesDict[a].status="COMPLETE",t.got+=1):(e.seriesDict[a].status="NOT_COMPLETE",t.miss+=1):e.seriesDict[a].status="ERR"}return l(l({},e),{globalStats:t})},De={CHARACTER:1,SEQUEL:2,SIDE_STORY:3,SOURCE:4,ALTERNATIVE:5,SPIN_OFF:6,SUMMARY:7,COMPILATION:8,CONTAINS:9,PREQUEL:10,ADAPTATION:11,PARENT:12,OTHER:13},Re=(e,t,a)=>{const s=e=>{var t;return{id:e.id,status:"NO",airStatus:e.status,format:null!=(t=e.format)?t:"SPECIAL",title:e.title.userPreferred,titles:[...Object.values(e.title),...e.synonyms].filter((e=>!["MediaTitle",null].includes(e))),siteUrl:e.siteUrl,bannerImage:e.bannerImage,popularity:e.popularity,compWeight:(e=>{var t,a;if("NOT_YET_RELEASED"==e.status)return 1;if(e.chapters)return 5*e.chapters;if(e.volumes)return 50*e.volumes;if(e.episodes&&e.duration)return e.episodes*e.duration;if((null==(t=e.nextAiringEpisode)?void 0:t.episode)&&e.duration)return(null==(a=e.nextAiringEpisode)?void 0:a.episode)*e.duration;let s=Object.values(e.startDate).filter((e=>"FuzzyDate"!=e&&e)).join("-"),r=(Date.now()-Date.parse(s))/864e5;return"MANGA"==e.format?5*Math.round(r/8.2):(e.format,20*Math.round(r/8.2))})(e),startDate:Object.values(e.startDate).filter((e=>"FuzzyDate"!=e&&e)).join("-")}};let r=i({headless:!0});const[n,o]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e)for(let e of r.entries){t.set(e.media.id,{data:l(l({},s(e.media)),{status:e.status})});for(let a of e.media.relations.nodes)t.get(a.id)||t.set(a.id,{data:l(l({},s(a)),{status:"NO"})});for(let t of e.media.relations.edges)a.set(t.id,{data:{id:"l"+t.id,source:e.media.id,target:t.node.id,relation:t.relationType}})}return[t,a]})(e);console.log(n,o),r.elements().remove(),r.add(Array.from(n.values()).concat(Array.from(o.values())));let c=r.elements().components(),m=[];c.map((e=>{let s=e.edges().map((e=>{let a=e.parallelEdges().sort(((e,a)=>t[e.data("relation")]-t[a.data("relation")]))[0];switch(a.data("relation")){case"ADAPTATION":a.move({source:a.data("target"),target:a.data("source")}),a.data({relation:"SOURCE"});break;case"PREQUEL":a.move({source:a.data("target"),target:a.data("source")}),a.data({relation:"SEQUEL"})}return a}));e.edges().remove(),s.map((e=>{e.restore()})),e.filter("node, edge[relation!='CHARACTER']").difference(a.map((e=>`#${e}`)).join(", ")).components().map((t=>{t.nodes().length!=t.filter("node[status='NO']").length&&m.push({series:t,serieComplete:e})}))}));let u=m.map((e=>{let t=e.series.sort(((e,t)=>{let a=parseInt(e.data("popularity")),s=parseInt(t.data("popularity"));return isNaN(a)?999:isNaN(s)?-1:s-a}));return{seriesPrime:t.nodes()[0],series:t,serieComplete:e.serieComplete}})).map((e=>{var t,a,s,r,i,n,o,c,m;let u={};for(let l of["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC","MANGA","NOVEL","ONE_SHOT"]){let d=e.series.nodes().filter(`node[format='${l}']`);u[l]={tot:null!=(t=d.length)?t:0,miss:null!=(a=d.filter("node[status='NO']").length)?a:0,got:null!=(s=d.filter("node[status!='NO']").length)?s:0,totWeight:null==(i=null==(r=d.map((e=>e.data("compWeight"))))?void 0:r.reduce)?void 0:i.call(r,((e,t)=>e+t),0),missWeight:null==(o=null==(n=d.filter("node[status='NO']").map((e=>e.data("compWeight"))))?void 0:n.reduce)?void 0:o.call(n,((e,t)=>e+t),0),gotWeight:null==(m=null==(c=d.filter("node[status!='NO']").map((e=>e.data("compWeight"))))?void 0:c.reduce)?void 0:m.call(c,((e,t)=>e+t),0)}}return l(l({},e),{stats:u,status:"ERR"})})),d={};return u.map((e=>{d[e.seriesPrime.data("id")]=l(l({},e),{seriesPrime:e.seriesPrime.data(),series:{nodes:e.series.nodes().map((e=>e.data())),edges:e.series.edges().map((e=>e.data()))},serieComplete:{nodes:e.serieComplete.nodes().map((e=>e.data())),edges:e.serieComplete.edges().map((e=>e.data()))}})})),console.log(Object.values(d).length),d},We=["132615","106495","20947","118940"],Pe=()=>{const[e,t]=fe();let[a,s]=o.useState(!1),[r,i]=o.useState(""),[n,c]=Se("usr","");const[u,{status:d,kill:p}]=w(Re,{remoteDependencies:["https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.18.2/cytoscape.min.js"]}),g=()=>{E({variables:{user:n,type:"ANIME"}})},[E,h]=k(Ce,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{O({variables:{user:n,type:"MANGA"}})}}),[O,f]=k(Ce,{notifyOnNetworkStatusChange:!0,onCompleted:async()=>{let e=await u([...h.data.MediaListCollection.lists,...f.data.MediaListCollection.lists],De,We);t((t=>Ve(l(l({},t),{seriesDict:e}))))}});return o.useEffect((()=>{h.loading||f.loading||"RUNNING"==d?s(!0):s(!1),h.error?i(h.error.message):f.error?i(f.error.message):i(" ")}),[h,f,d]),o.createElement("div",null,o.createElement(m,{container:!0,direction:"row",justifyContent:"flex-start",alignItems:"center"},o.createElement(m,{item:!0},o.createElement(L,{variant:"rounded"})),o.createElement(m,{item:!0},o.createElement(I,{sx:{m:1,width:"100%"},variant:"standard"},o.createElement(V,{id:"standard-adornment-password",placeholder:"AniList Nick",value:n,onChange:e=>{c(e.target.value)},onKeyPress:e=>{"Enter"==e.key&&g()},endAdornment:o.createElement(D,{position:"end"},a?o.createElement(R,null):o.createElement(W,{"aria-label":"get user anime",onClick:g},o.createElement(P,null)))}),o.createElement(z,{id:"standard-weight-helper-text"},r)))))},ze=()=>{const[e,t]=fe(),[a,s]=Se("sort",e.userOptions.sort);o.useEffect((()=>{t((e=>l(l({},e),{userOptions:l(l({},e.userOptions),{sort:a})})))}),[a]);const[r,i]=o.useState(null),n=Boolean(r),c=e=>{a.type==e?s({type:e,inverted:!a.inverted}):s(l(l({},a),{type:e}))};return o.createElement("span",null,o.createElement(W,{id:"sort-button","aria-controls":"sort-menu","aria-haspopup":"true","aria-expanded":n?"true":void 0,onClick:e=>{i(e.currentTarget)}},o.createElement(j,null)),o.createElement(U,{id:"sort-menu",anchorEl:r,open:n,onClose:()=>{i(null)},MenuListProps:{"aria-labelledby":"sort-button"},anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"}},o.createElement(_,{selected:"complete%"==a.type,onClick:()=>c("complete%")},a.inverted?o.createElement(H,null):o.createElement(F,null),"Complete %"),o.createElement(_,{selected:"weight%"==a.type,onClick:()=>c("weight%")},a.inverted?o.createElement(H,null):o.createElement(F,null),"Weighted Complete %"),o.createElement(_,{selected:"alphabetical"==a.type,onClick:()=>c("alphabetical")},a.inverted?o.createElement(H,null):o.createElement(F,null),"Alphabetical"),o.createElement(_,{selected:"missWeight"==a.type,onClick:()=>c("missWeight")},a.inverted?o.createElement(H,null):o.createElement(F,null),"Easy To Complete")))},je=({children:e})=>{const[t,a]=fe();let[s,r]=o.useState(""),[l,i]=o.useState([]);return o.useEffect((()=>{var e;i($(Object.values(null!=(e=t.seriesDict)?e:[]).filter((e=>!t.userOptions.statusFilter.includes(e.status))),"",{keys:["series.nodes.*.titles"],sorter:e=>(console.log(e),function(e){switch(e){case"weight%":return Te;case"complete%":return xe;case"alphabetical":return Ne;case"size":return Me;case"missWeight":return Ae;default:return Ne}}(t.userOptions.sort.type)(e,t.userOptions.sort.inverted))}))}),[t.seriesDict,t.userOptions.sort,t.userOptions.completition,t.userOptions.statusFilter,t.userOptions.smartCompletition]),o.createElement(d,null,o.createElement(B,{value:s,onChange:e=>{var a;r(e.target.value),i($(Object.values(null!=(a=t.seriesDict)?a:[]).filter((e=>!t.userOptions.statusFilter.includes(e.status))),e.target.value,{keys:["series.nodes.*.titles"]}))}}),o.createElement(W,{onClick:()=>{var e;null==(e=t.modalOpenState)||e[1](!0)}},o.createElement(G,null)),o.createElement(ze,null),o.isValidElement(e)?o.cloneElement(e,{seriesToRender:l}):o.createElement("p",null,"Shouldn't display"))},Ue=({index:e,style:t,data:a})=>{var s,r,i;fe();const[n,c]=o.useState(!1);let{addState:m,remState:p,handleToggle:g,seriesList:E,test:h}=a,O=null==(s=E[e])?void 0:s.series,f=null==(r=E[e])?void 0:r.seriesPrime,y=null==(i=E[e])?void 0:i.seriesPrime.id;return o.useLayoutEffect((()=>(m({id:y,state:[n,c],series:O}),()=>{p(y)})),[]),o.createElement(d,{style:l({},t),sx:{},key:y},o.createElement(J,{sx:{marginBottom:"10px",border:"1px solid",borderColor:"grey.500",background:`url(${f.bannerImage}) no-repeat center center`,backgroundSize:"cover",color:"white",height:"calc(100% - 10px)",width:"calc(100% - 10px)",borderRadius:"5px",boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"},selected:n,key:y,button:!0,onClick:()=>{m({id:y,state:[n,c],series:O}),g(y)}},o.createElement(Q,{sx:{fontSize:"19px"},id:y,primary:f.title+" "+E[e].stats.selected.missWeight}),o.createElement(d,{sx:{position:"relative",display:"inline-flex"}},o.createElement(R,{size:80,variant:"determinate",color:"primary",value:E[e].stats.selected.per}),o.createElement(d,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(u,null,E[e].stats.selected.per))),o.createElement(d,{sx:{position:"relative",display:"inline-flex"}},o.createElement(R,{variant:"determinate",color:"secondary",value:E[e].stats.selected.perWeight}),o.createElement(d,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(u,null,E[e].stats.selected.perWeight)))))},_e=({seriesToRender:e})=>{const[t,a]=fe();let[s,r]=o.useState([]);o.useEffect((()=>{var a;r(null!=(a=null!=e?e:Object.values(t.seriesDict))?a:[])}),[e,t.seriesDict]);let[l,i]=o.useState("Very Stupid Fix"),n=o.useMemo((()=>""),[l]);var c=o.useMemo((()=>({})),[l]);const m=e=>{c[e.id]={id:e.id,state:e.state,series:e.series},n==e.id&&e.state[1](!0)},u=e=>{delete c[e]},p=e=>{var a,s,r,l,i,o,m,u,d;n&&(null==(s=null==(a=null==c?void 0:c[n])?void 0:a.state)||s[1](!1)),n=e,c[e].state[1](!0),console.log(t.cyViz),console.log(null!=(l=null==(r=t.seriesDict)?void 0:r[e])?l:0),null==(i=t.cyViz)||i.elements().remove(),null==(o=t.cyViz)||o.add([...(d=c[e].series).nodes,...d.edges].map((e=>({data:e})))),null==(m=t.cyViz)||m.elements().makeLayout({name:"breadthfirst",roots:[n]}).run(),null==(u=t.cyViz)||u.center()};function g(e){var t;return null!=(t=s[e].seriesPrime.id)?t:"1"}return o.createElement(d,{sx:{height:"calc(100vh - 200px)"}},t.seriesDict?o.createElement(K,null,(({height:e,width:t})=>{var a;return o.createElement(Y,{height:e,itemSize:140,width:t,itemCount:null!=(a=null==s?void 0:s.length)?a:0,itemData:{addState:m,remState:u,handleToggle:p,seriesList:s},itemKey:g},Ue)})):o.createElement("p",null,"None"))},He=()=>{const[e,t]=fe();function a(e){t((t=>{switch(e){case"smart":return l(l({},t),{userOptions:l(l({},t.userOptions),{smartCompletition:!t.userOptions.smartCompletition})});case"all":return l(l({},t),{userOptions:l(l({},t.userOptions),{completition:we})});default:return l(l({},t),{userOptions:l(l({},t.userOptions),{completition:te(t.userOptions.completition,[e])})})}}))}return o.useEffect((()=>{t((e=>Ve(e)))}),[e.userOptions.completition,e.userOptions.smartCompletition,e.userOptions.mangaComposition,e.userOptions.animeComposition]),o.createElement("div",null,o.createElement(q,{control:o.createElement(X,{checked:e.userOptions.smartCompletition,onClick:()=>a("smart")}),label:"Smart Completition"}),"What is anime? ",ke.map((a=>{if(["TV","TV_SHORT","MOVIE","SPECIAL","OVA","ONA","MUSIC"].includes(a.id))return o.createElement(Z,{key:a.label,title:a.tooltip},o.createElement(ee,{variant:(s=a.id,e.userOptions.animeComposition.includes(s)?void 0:"outlined"),disabled:!e.userOptions.smartCompletition,label:a.label,onClick:()=>function(e){t((t=>l(l({},t),{userOptions:l(l({},t.userOptions),{animeComposition:te(t.userOptions.animeComposition,[e])})})))}(a.id)}));var s})),"What is Manga? ",ke.map((a=>{if(["MANGA","ONE_SHOT"].includes(a.id))return o.createElement(Z,{key:a.label,title:a.tooltip},o.createElement(ee,{variant:(s=a.id,e.userOptions.mangaComposition.includes(s)?void 0:"outlined"),disabled:!e.userOptions.smartCompletition,label:a.label,onClick:()=>function(e){t((t=>l(l({},t),{userOptions:l(l({},t.userOptions),{mangaComposition:te(t.userOptions.mangaComposition,[e])})})))}(a.id)}));var s})),o.createElement(q,{control:o.createElement(X,{checked:!e.userOptions.smartCompletition,onClick:()=>a("smart")}),label:"Custom"}),o.createElement(x,{disabled:e.userOptions.smartCompletition,onClick:()=>a("all")},"Select All"),ke.map((t=>{return o.createElement(Z,{key:t.label,title:t.tooltip},o.createElement(ee,{variant:(s=t.id,e.userOptions.completition.includes(s)?void 0:"outlined"),disabled:e.userOptions.smartCompletition,label:t.label,onClick:()=>a(t.id)}));var s})))},Fe={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,p:4};function $e(){const[e,t]=fe(),[a,s]=o.useState("1"),[r,i]=o.useState(!1);o.useEffect((()=>{t((e=>l(l({},e),{modalOpenState:[r,i]})))}),[]);return o.createElement("div",null,o.createElement(ae,{open:r,onClose:()=>{var t;return null==(t=e.modalOpenState)?void 0:t[1](!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description"},o.createElement(c,{sx:Fe},o.createElement(se,{value:a},o.createElement(d,{sx:{borderBottom:1,borderColor:"divider"}},o.createElement(re,{onChange:(e,t)=>{s(t)},"aria-label":"options"},o.createElement(le,{label:"Completition Options",value:"1"}),o.createElement(le,{label:"Sort",value:"2"}),o.createElement(le,{label:"Filter",value:"3"}))),o.createElement(ie,{value:"1"},o.createElement(He,null)),o.createElement(ie,{value:"2"},"Item Two"),o.createElement(ie,{value:"3"},"Item Three")))))}const Be=({children:e,statusId:t})=>{const[a,s]=fe();return o.createElement(W,{onClick:e=>{s((e=>l(l({},e),{userOptions:l(l({},e.userOptions),{statusFilter:te(e.userOptions.statusFilter,[t])})})))},color:a.userOptions.statusFilter.includes(t)?"default":"primary"},e)},Ge=()=>{const[e,t]=fe();return o.createElement(d,{sx:{margin:"auto"}},o.createElement(T,{direction:"row",spacing:2},o.createElement(Be,{statusId:"COMPLETE"},o.createElement(ne,null),e.globalStats.got),o.createElement(Be,{statusId:"NOT_COMPLETE"},o.createElement(oe,null),e.globalStats.miss),o.createElement(Be,{statusId:"ERR"},o.createElement(ce,null),e.globalStats.tot-(e.globalStats.got+e.globalStats.miss))))};function Je(){return o.createElement(m,{sx:{height:"100vh"},item:!0,xs:12,sm:3},o.createElement($e,null),o.createElement(Pe,null),o.createElement(Ge,null),o.createElement(je,null,o.createElement(_e,null)))}const Qe=new me({uri:"https://graphql.anilist.co",cache:new ue}),Ke=de({palette:{mode:"light"}});pe.render(o.createElement(o.StrictMode,null,o.createElement(Oe,null,o.createElement(ge,{client:Qe},o.createElement(Ee,{theme:Ke},o.createElement(m,{container:!0},o.createElement(be,null),o.createElement(Je,null)))))),document.getElementById("root"));
