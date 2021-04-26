var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,l=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,s)=>{for(var n in s||(s={}))t.call(s,n)&&l(e,n,s[n]);if(a)for(var n of a(s))r.call(s,n)&&l(e,n,s[n]);return e};import{c as n,W as o,r as i,G as d,g as c,u as m,A as u,F as p,I as y,a as g,C as f,b as h,E,d as b,m as v,B as S,T as w,L,e as x,f as C,h as k,i as I,j as O,k as M,l as A,n as N,o as R}from"./vendor.92497a8e.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,s)=>{const n=new URL(e,r);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){s(new Error(`Failed to import: ${e}`)),l(i)},onload(){a(self[t].moduleMap[n]),l(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/aniCheck/assets/");const P={cy:n({headless:!0})},{Provider:T,useTracked:U}=o((()=>i.useState(P)));function j(){const[e,t]=U();let a=i.useRef(null);return i.useEffect((()=>{let r=n({container:a.current,elements:[{data:{id:"a",title:"Ani"}},{data:{id:"b",title:"Check"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{label:"data(title)"}},{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:'node[status="CURRENT"]',style:{"background-color":"cyan"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa",label:"data(relation)"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'edge[relation= "SOURCE"]',style:{label:"Source"}},{selector:'node[format="MANGA"]',style:{"border-width":"1px",shape:"polygon","shape-polygon-points":"0.846 -0.923 -0.602 -0.923 -0.923 -0.806 -0.923 0.846 -0.692 0.923 0.692 0.923 0.692 -0.692 -0.692 -0.692 -0.692 0.923 -0.692 -0.692 -0.769 -0.769 -0.538 -0.846 0.846 -0.846 0.846 0.769 "}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});r.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),r.on("tap","node,edge",(e=>{console.log(e.target.data())})),t(s(s({},e),{cyViz:r}))}),[]),i.createElement(d,{item:!0,xs:9},i.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}))}const D=c`
query ($user: String!, $type: MediaType){
  MediaListCollection(userName: $user, type: $type) {
    lists {
      entries {
        id
        status
        media {
          id
          siteUrl
          title {
            userPreferred
          }
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
          relations {
            nodes {
              id
              siteUrl
              title {
                userPreferred
              }
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
`;function z(){const[e,t]=U();let[a,r]=i.useState(!1),[l,n]=i.useState(""),[o,c]=(e=>{const[t,a]=i.useState(localStorage.getItem(e)||"");return i.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const v=()=>{S({variables:{user:o,type:"ANIME"}})},[S,w]=m(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{L({variables:{user:o,type:"MANGA"}})}}),[L,x]=m(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{let a=e.cy;const[r,l]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,format:e.media.format,title:e.media.title.userPreferred,siteUrl:e.media.siteUrl,bannerImage:e.media.bannerImage,popularity:e.media.popularity,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let a of e.media.relations.nodes)t.get(a.id)||t.set(a.id,{data:{id:a.id,status:"NO",format:a.format,title:a.title.userPreferred,siteUrl:a.siteUrl,popularity:a.popularity,bannerImage:a.bannerImage,startDate:[a.startDate.year,a.startDate.month,a.startDate.day].join("-")}});for(let t of e.media.relations.edges)a.set(t.id,{data:{id:"l"+t.id,source:e.media.id,target:t.node.id,relation:t.relationType}})}return[t,a]})([].concat(w.data.MediaListCollection.lists,x.data.MediaListCollection.lists));console.log(r,l),a.elements().remove(),a.add(Array.from(r.values()).concat(Array.from(l.values()))),a.remove('edge[relation="CHARACTER"]');let n=a.elements().components().map((e=>{let t=e.sort(((e,t)=>{let a=parseInt(e.data("popularity")),r=parseInt(t.data("popularity"));return isNaN(a)?999:isNaN(r)?-1:r-a}));return{seriesPrime:t.nodes()[0],series:t}}));console.log(n),t(s(s({},e),{seriesList:n})),console.log(e)}});return i.useEffect((()=>{w.loading||x.loading?r(!0):r(!1),w.error?n(w.error.message):x.error?n(x.error.message):n(" ")}),[w,x]),i.createElement("div",null,i.createElement(d,{container:!0,direction:"row",justifyContent:"flex-start",alignItems:"center"},i.createElement(d,{item:!0},i.createElement(u,{variant:"rounded"})),i.createElement(d,{item:!0},i.createElement(p,{sx:{m:1,width:"100%"},variant:"standard"},i.createElement(y,{id:"standard-adornment-password",placeholder:"AniList Nick",value:o,onChange:e=>{c(e.target.value)},onKeyPress:e=>{"Enter"==e.key&&v()},endAdornment:i.createElement(g,{position:"end"},a?i.createElement(f,null):i.createElement(h,{"aria-label":"get user anime",onClick:v},i.createElement(E,null)))}),i.createElement(b,{id:"standard-weight-helper-text"},l)))))}const V=({children:e})=>{const[t,a]=U();let[r,l]=i.useState(""),[s,n]=i.useState([]);return i.useEffect((()=>{var e;n(v(null!=(e=t.seriesList)?e:[],"",{keys:[e=>e.series.map((e=>e.data("title")))]}))}),[t]),i.createElement(S,null,i.createElement(w,{value:r,onChange:e=>{var a;l(e.target.value),n(v(null!=(a=t.seriesList)?a:[],e.target.value,{keys:[e=>e.series.map((e=>e.data("title")))]}))}}),i.isValidElement(e)?i.cloneElement(e,{seriesToRender:s}):i.createElement("p",null,"Shouldn't display"))};function $({index:e,style:t,data:a}){var r,l,n;const[o,d]=i.useState(!1);let{addState:c,remState:m,handleToggle:u,seriesList:p,test:y}=a,g=null==(r=p[e])?void 0:r.series,f=null==(l=p[e])?void 0:l.seriesPrime,h=null==(n=p[e])?void 0:n.seriesPrime.data("id");return i.useLayoutEffect((()=>(c({id:h,state:[o,d],series:g}),()=>{m(h)})),[]),i.createElement(S,{style:s({},t),sx:{},key:h},i.createElement(L,{sx:{marginBottom:"10px",border:"1px solid",borderColor:"grey.500",backgroundImage:`url(${f.data("bannerImage")})`,backgroundSize:"cover",color:"white",height:"calc(100% - 10px)",width:"calc(100% - 10px)",borderRadius:"5px",boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"},selected:o,key:h,button:!0,onClick:()=>{c({id:h,state:[o,d],series:g}),u(h)}},i.createElement(x,{sx:{fontSize:"10px"},id:h,primary:f.data("title")})))}const _=({seriesToRender:e})=>{const[t,a]=U();let[r,l]=i.useState([]);i.useEffect((()=>{var a;l(null!=(a=null!=e?e:t.seriesList)?a:[])}),[e,t.seriesList]);let[s,n]=i.useState("Very Stupid Fix"),o=i.useMemo((()=>""),[s]);var d=i.useMemo((()=>({})),[s]);const c=e=>{d[e.id]={id:e.id,state:e.state,series:e.series},o==e.id&&e.state[1](!0)},m=e=>{delete d[e]},u=e=>{var a,r,l,s,n,i;o&&(null==(r=null==(a=null==d?void 0:d[o])?void 0:a.state)||r[1](!1)),o=e,d[e].state[1](!0),null==(l=t.cyViz)||l.elements().remove(),null==(s=t.cyViz)||s.add(d[e].series),null==(n=t.cyViz)||n.elements().makeLayout({name:"breadthfirst",roots:[o]}).run(),null==(i=t.cyViz)||i.center()};function p(e){var a,r;return null!=(r=null==(a=t.seriesList)?void 0:a[e].seriesPrime.data("id"))?r:"1"}return i.createElement(S,{sx:{height:"80vh"}},t.seriesList?i.createElement(C,null,(({height:e,width:t})=>{var a;return i.createElement(k,{height:e,itemSize:120,width:t,itemCount:null!=(a=null==r?void 0:r.length)?a:0,itemData:{addState:c,remState:m,handleToggle:u,seriesList:r},itemKey:p},$)})):i.createElement("p",null,"None"))};function F(){U();let[e,t]=i.useState("Very Stupid Fix"),a=i.useMemo((()=>""),[e]);var r=i.useMemo((()=>({})),[e]);return i.createElement(d,{sx:{height:"100vh"},item:!0,xs:3},i.createElement(z,null),i.createElement("p",null,a," ",Object.keys(r).length),i.createElement(V,null,i.createElement(_,null)))}const B=new I({uri:"https://graphql.anilist.co",cache:new O}),q=M({palette:{mode:"light"}});A.render(i.createElement(i.StrictMode,null,i.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),i.createElement(T,null,i.createElement(N,{client:B},i.createElement(R,{theme:q},i.createElement(d,{container:!0},i.createElement(j,null),i.createElement(F,null)))))),document.getElementById("root"));
