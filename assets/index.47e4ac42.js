var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,l=(e,l)=>{for(var n in l||(l={}))t.call(l,n)&&s(e,n,l[n]);if(a)for(var n of a(l))r.call(l,n)&&s(e,n,l[n]);return e};import{c as n,W as i,r as o,G as d,g as m,u as c,A as u,F as p,I as g,a as y,C as f,b as h,d as E,m as v,B as b,T as S,L as w,e as x,f as C,h as O,i as L,j as M,k as N,l as P,n as k,o as I}from"./vendor.5e685d16.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const n=new URL(e,r);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const i=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){l(new Error(`Failed to import: ${e}`)),s(o)},onload(){a(self[t].moduleMap[n]),s(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/aniCheck/assets/");const A={cy:n({headless:!0})},{Provider:T,useTracked:j}=i((()=>o.useState(A)));function R(){const[e,t]=j();let a=o.useRef(null);return o.useEffect((()=>{let r=n({container:a.current,elements:[{data:{id:"a",title:"Ani"}},{data:{id:"b",title:"Check"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{label:"data(title)"}},{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:'node[status="CURRENT"]',style:{"background-color":"cyan"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa",label:"data(relation)"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'edge[relation= "SOURCE"]',style:{label:"Source"}},{selector:'node[format="MANGA"]',style:{"border-width":"1px",shape:"polygon","shape-polygon-points":"0.846 -0.923 -0.602 -0.923 -0.923 -0.806 -0.923 0.846 -0.692 0.923 0.692 0.923 0.692 -0.692 -0.692 -0.692 -0.692 0.923 -0.692 -0.692 -0.769 -0.769 -0.538 -0.846 0.846 -0.846 0.846 0.769 "}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});r.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),r.on("tap","node,edge",(e=>{console.log(e.target.data())})),t(l(l({},e),{cyViz:r}))}),[]),o.createElement(d,{item:!0,xs:9},o.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}))}const D=m`
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
              status(version: 2)
            }
            edges {
              id
              relationType
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
`;function U(){const[e,t]=j();let[a,r]=o.useState(!1),[s,n]=o.useState(""),[i,m]=(e=>{const[t,a]=o.useState(localStorage.getItem(e)||"");return o.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const v=()=>{b({variables:{user:i,type:"ANIME"}})},[b,S]=c(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{w({variables:{user:i,type:"MANGA"}})}}),[w,x]=c(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{let a=e.cy;const[r,s]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,airStatus:e.media.status,format:e.media.format,title:e.media.title.userPreferred,siteUrl:e.media.siteUrl,bannerImage:e.media.bannerImage,popularity:e.media.popularity,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let a of e.media.relations.nodes)t.get(a.id)||t.set(a.id,{data:{id:a.id,status:"NO",airStatus:a.status,format:a.format,title:a.title.userPreferred,siteUrl:a.siteUrl,popularity:a.popularity,bannerImage:a.bannerImage,startDate:[a.startDate.year,a.startDate.month,a.startDate.day].join("-")}});for(let t of e.media.relations.edges)a.set(t.id,{data:{id:"l"+t.id,source:e.media.id,target:t.node.id,relation:t.relationType}})}return[t,a]})([].concat(S.data.MediaListCollection.lists,x.data.MediaListCollection.lists));console.log(r,s),a.elements().remove(),a.add(Array.from(r.values()).concat(Array.from(s.values())));let n=a.elements().components(),i=[];n.map((e=>{e.filter("edge[relation!='CHARACTER'],node").components().map((t=>{t.nodes().length!=t.filter("node[status='NO']").length&&i.push({series:t,serieComplete:e})}))}));let o=i.map((e=>{let t=e.series.sort(((e,t)=>{let a=parseInt(e.data("popularity")),r=parseInt(t.data("popularity"));return isNaN(a)?999:isNaN(r)?-1:r-a}));return{seriesPrime:t.nodes()[0],series:t,serieComplete:e.serieComplete}})).map((e=>{var t,a,r,s,n;let i=e.series.nodes().filter("node[format='MANGA']"),o=e.series.nodes().filter("node[format !='MANGA']").filter("node[format !='NOVEL']"),d={serieTot:e.series.nodes().length,serieMiss:null!=(t=e.series.filter("node[status='NO']").length)?t:0,seriePer:Math.round(e.series.filter("node[status!='NO']").length/e.series.length*100),mangaTot:null!=(a=i.length)?a:0,mangaMiss:null!=(r=i.filter("node[status='NO']").length)?r:0,mangaPer:Math.round(i.filter("node[status!='NO']").length/i.length*100),animeTot:null!=(s=o.length)?s:0,animeMiss:null!=(n=o.filter("node[status='NO']").length)?n:0,animePer:Math.round(o.filter("node[status!='NO']").length/o.length*100)};return l(l({},e),{stats:d})})),d={};o.map((e=>{d[e.seriesPrime.data("id")]=e})),console.log(o),t(l(l({},e),{seriesList:o,seriesDict:d})),console.log(e)}});return o.useEffect((()=>{S.loading||x.loading?r(!0):r(!1),S.error?n(S.error.message):x.error?n(x.error.message):n(" ")}),[S,x]),o.createElement("div",null,o.createElement(d,{container:!0,direction:"row",justifyContent:"flex-start",alignItems:"center"},o.createElement(d,{item:!0},o.createElement(u,{variant:"rounded"})),o.createElement(d,{item:!0},o.createElement(p,{sx:{m:1,width:"100%"},variant:"standard"},o.createElement(g,{id:"standard-adornment-password",placeholder:"AniList Nick",value:i,onChange:e=>{m(e.target.value)},onKeyPress:e=>{"Enter"==e.key&&v()},endAdornment:o.createElement(y,{position:"end"},a?o.createElement(f,null):o.createElement(h,{"aria-label":"get user anime",onClick:v}))}),o.createElement(E,{id:"standard-weight-helper-text"},s)))))}const V=({children:e})=>{const[t,a]=j();let[r,s]=o.useState(""),[l,n]=o.useState([]);return o.useEffect((()=>{var e;n(v(null!=(e=t.seriesList)?e:[],"",{keys:[e=>e.series.map((e=>e.data("title")))]}))}),[t]),o.createElement(b,null,o.createElement(S,{value:r,onChange:e=>{var a;s(e.target.value),n(v(null!=(a=t.seriesList)?a:[],e.target.value,{keys:[e=>e.series.map((e=>e.data("title")))]}))}}),o.isValidElement(e)?o.cloneElement(e,{seriesToRender:l}):o.createElement("p",null,"Shouldn't display"))},z=({index:e,style:t,data:a})=>{var r,s,n;j();const[i,d]=o.useState(!1);let{addState:m,remState:c,handleToggle:u,seriesList:p,test:g}=a,y=null==(r=p[e])?void 0:r.series,h=null==(s=p[e])?void 0:s.seriesPrime,E=null==(n=p[e])?void 0:n.seriesPrime.data("id");return o.useLayoutEffect((()=>(m({id:E,state:[i,d],series:y}),()=>{c(E)})),[]),o.createElement(b,{style:l({},t),sx:{},key:E},o.createElement(w,{sx:{marginBottom:"10px",border:"1px solid",borderColor:"grey.500",backgroundImage:`url(${h.data("bannerImage")})`,backgroundSize:"cover",color:"white",height:"calc(100% - 10px)",width:"calc(100% - 10px)",borderRadius:"5px",boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"},selected:i,key:E,button:!0,onClick:()=>{m({id:E,state:[i,d],series:y}),u(E)}},o.createElement(x,{sx:{fontSize:"19px"},id:E,primary:h.data("title")+p[e].stats.seriePer}),o.createElement(b,{sx:{position:"relative",display:"inline-flex"}},o.createElement(f,{variant:"determinate",color:"secondary",value:p[e].stats.mangaPer+20}),o.createElement(b,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(f,{variant:"determinate",color:"primary",value:p[e].stats.mangaPer}))),o.createElement(b,{sx:{position:"relative",display:"inline-flex"}},o.createElement(f,{variant:"determinate",color:"secondary",value:p[e].stats.animePer+20}),o.createElement(b,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(f,{variant:"determinate",color:"primary",value:p[e].stats.animePer})))))},$=({seriesToRender:e})=>{const[t,a]=j();let[r,s]=o.useState([]);o.useEffect((()=>{var a;s(null!=(a=null!=e?e:t.seriesList)?a:[])}),[e,t.seriesList]);let[l,n]=o.useState("Very Stupid Fix"),i=o.useMemo((()=>""),[l]);var d=o.useMemo((()=>({})),[l]);const m=e=>{d[e.id]={id:e.id,state:e.state,series:e.series},i==e.id&&e.state[1](!0)},c=e=>{delete d[e]},u=e=>{var a,r,s,l,n,o,m,c;i&&(null==(r=null==(a=null==d?void 0:d[i])?void 0:a.state)||r[1](!1)),i=e,d[e].state[1](!0),console.log(null!=(l=null==(s=t.seriesDict)?void 0:s[e])?l:0),null==(n=t.cyViz)||n.elements().remove(),null==(o=t.cyViz)||o.add(d[e].series),null==(m=t.cyViz)||m.elements().makeLayout({name:"breadthfirst",roots:[i]}).run(),null==(c=t.cyViz)||c.center()};function p(e){var a,r;return null!=(r=null==(a=t.seriesList)?void 0:a[e].seriesPrime.data("id"))?r:"1"}return o.createElement(b,{sx:{height:"80vh"}},t.seriesList?o.createElement(C,null,(({height:e,width:t})=>{var a;return o.createElement(O,{height:e,itemSize:120,width:t,itemCount:null!=(a=null==r?void 0:r.length)?a:0,itemData:{addState:m,remState:c,handleToggle:u,seriesList:r},itemKey:p},z)})):o.createElement("p",null,"None"))};function _(){j();let[e,t]=o.useState("Very Stupid Fix"),a=o.useMemo((()=>""),[e]);var r=o.useMemo((()=>({})),[e]);return o.createElement(d,{sx:{height:"100vh"},item:!0,xs:3},o.createElement(U,null),o.createElement("p",null,a," ",Object.keys(r).length),o.createElement(V,null,o.createElement($,null)))}const F=new L({uri:"https://graphql.anilist.co",cache:new M}),G=N({palette:{mode:"light"}});P.render(o.createElement(o.StrictMode,null,o.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),o.createElement(T,null,o.createElement(k,{client:F},o.createElement(I,{theme:G},o.createElement(d,{container:!0},o.createElement(R,null),o.createElement(_,null)))))),document.getElementById("root"));
