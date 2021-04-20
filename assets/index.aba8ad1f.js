var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,l=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,s)=>{for(var n in s||(s={}))t.call(s,n)&&l(e,n,s[n]);if(a)for(var n of a(s))r.call(s,n)&&l(e,n,s[n]);return e};import{c as n,r as o,G as i,g as d,u as c,T as u,B as m,m as g,a as p,L as y,b as f,A as h,F as E,d as v,I as b,e as S,f as w,h as L,i as x}from"./vendor.a47745c2.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,s)=>{const n=new URL(e,r);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){s(new Error(`Failed to import: ${e}`)),l(i)},onload(){a(self[t].moduleMap[n]),l(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/aniCheck/assets/");const C={cy:n({headless:!0})};function O({children:e}){const[t,a]=o.useState(C);return o.createElement(k.Provider,{value:[t,a]},e)}const k=o.createContext([C,()=>{}]);function M(){const[e,t]=o.useContext(k);let a=o.useRef(null);return o.useEffect((()=>{let r=n({container:a.current,elements:[{data:{id:"a",title:"a"}},{data:{id:"b",title:"a"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{label:"data(title)"}},{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:'node[status="CURRENT"]',style:{"background-color":"cyan"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa",label:"data(relation)"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'edge[relation= "SOURCE"]',style:{label:"Source"}},{selector:'node[format="MANGA"]',style:{"border-width":"1px",shape:"polygon","shape-polygon-points":"0.846 -0.923 -0.602 -0.923 -0.923 -0.806 -0.923 0.846 -0.692 0.923 0.692 0.923 0.692 -0.692 -0.692 -0.692 -0.692 0.923 -0.692 -0.692 -0.769 -0.769 -0.538 -0.846 0.846 -0.846 0.846 0.769 "}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});r.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),r.on("tap",(e=>{console.log(e.target.data())})),t(s(s({},e),{cyViz:r}))}),[]),o.createElement(i,{item:!0,xs:9},o.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}))}const D=d`
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
`;function I(){const[e,t]=o.useContext(k);let[a,r]=(e=>{const[t,a]=o.useState(localStorage.getItem(e)||"");return o.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const[l,n]=c(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{i({variables:{user:a,type:"MANGA"}})}}),[i,{loading:d,error:g,data:p,refetch:y,networkStatus:f,variables:h}]=c(D,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{if(!d&&!g&&p){let a=e.cy;const[r,l]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,format:e.media.format,title:e.media.title.userPreferred,siteUrl:e.media.siteUrl,bannerImage:e.media.bannerImage,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let a of e.media.relations.nodes)t.get(a.id)||t.set(a.id,{data:{id:a.id,status:"NO",format:a.format,title:a.title.userPreferred,siteUrl:a.siteUrl,bannerImage:e.media.bannerImage,startDate:[a.startDate.year,a.startDate.month,a.startDate.day].join("-")}});for(let t of e.media.relations.edges)a.set(t.id,{data:{id:t.id,source:e.media.id,target:t.node.id,relation:t.relationType}})}return[t,a]})([].concat(n.data.MediaListCollection.lists,p.MediaListCollection.lists));console.log(r,l),a.add(Array.from(r.values()).concat(Array.from(l.values())));let o=a.elements().components().map((e=>{let t=e.sort(((e,t)=>{let a=Date.parse(e.data("startDate")),r=Date.parse(t.data("startDate"));return isNaN(a)?999:isNaN(r)?-1:a-r}));return{seriesPrime:t.nodes()[0],series:t}}));console.log(o),t(s(s({},e),{seriesList:o})),console.log(e)}}});return o.createElement("div",null,o.createElement(u,{id:"username",value:a,onChange:e=>{r(e.target.value)},label:"Your AniList nick"}),o.createElement(m,{variant:"contained",onClick:e=>{l({variables:{user:a,type:"ANIME"}})}},"Load"),d?o.createElement("div",null,"Loading"):o.createElement("div",null,"Done"),g?o.createElement("p",null,"Error: ",g.message):o.createElement("p",null,"No Error"))}const N=({children:e})=>{const[t,a]=o.useContext(k);let[r,l]=o.useState(""),[s,n]=o.useState([]);return o.useEffect((()=>{var e;n(g(null!=(e=t.seriesList)?e:[],"",{keys:[e=>e.series.map((e=>e.data("title")))]}))}),[t]),o.createElement(p,null,o.createElement(u,{value:r,onChange:e=>{var a;l(e.target.value),n(g(null!=(a=t.seriesList)?a:[],e.target.value,{keys:[e=>e.series.map((e=>e.data("title")))]}))}}),o.isValidElement(e)?o.cloneElement(e,{seriesToRender:s}):o.createElement("p",null,"Shouldn't display"))};function U({index:e,style:t,data:a}){var r,l,n;const[i,d]=o.useState(!1);let{addState:c,remState:u,handleToggle:m,seriesList:g,test:h}=a,E=null==(r=g[e])?void 0:r.series,v=null==(l=g[e])?void 0:l.seriesPrime,b=null==(n=g[e])?void 0:n.seriesPrime.data("id");return o.useLayoutEffect((()=>(c({id:b,state:[i,d],series:E}),()=>{u(b)})),[]),o.createElement(p,{style:s({},t),sx:{},key:b},o.createElement(y,{sx:{marginBottom:"10px",border:"1px solid",borderColor:"grey.500",backgroundImage:`url(${v.data("bannerImage")})`,backgroundSize:"cover",color:"white",height:"calc(100% - 10px)",width:"calc(100% - 10px)",borderRadius:"5px",boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"},selected:i,key:b,role:void 0,button:!0,onClick:()=>{c({id:b,state:[i,d],series:E}),m(b)}},o.createElement(f,{sx:{fontSize:"10px"},id:b,primary:v.data("title")})))}const P=({seriesToRender:e})=>{const[t,a]=o.useContext(k);let[r,l]=o.useState([]);o.useEffect((()=>{var a;l(null!=(a=null!=e?e:t.seriesList)?a:[])}),[e,t.seriesList]);let[s,n]=o.useState("Very Stupid Fix"),i=o.useMemo((()=>""),[s]);var d=o.useMemo((()=>({})),[s]);const c=e=>{console.log("addState "+e.id),d[e.id]={id:e.id,state:e.state,series:e.series},i==e.id&&e.state[1](!0)},u=e=>{console.log("remState "+e),delete d[e]},m=e=>{var a,r,l,s,n,o;console.log(i),i&&(console.log("Hello"),null==(r=null==(a=null==d?void 0:d[i])?void 0:a.state)||r[1](!1)),i=e,d[e].state[1](!0),console.log(i),null==(l=t.cyViz)||l.elements().remove(),null==(s=t.cyViz)||s.add(d[e].series),null==(n=t.cyViz)||n.elements().makeLayout({name:"breadthfirst",roots:[i]}).run(),null==(o=t.cyViz)||o.center()};function g(e){var a,r;return null!=(r=null==(a=t.seriesList)?void 0:a[e].seriesPrime.data("id"))?r:"1"}return o.createElement(p,{sx:{height:"80vh"}},t.seriesList?o.createElement(h,null,(({height:e,width:t})=>{var a;return o.createElement(E,{height:e,itemSize:120,width:t,itemCount:null!=(a=null==r?void 0:r.length)?a:0,itemData:{addState:c,remState:u,handleToggle:m,seriesList:r},itemKey:g},U)})):o.createElement("p",null,"None"))};function R(){o.useContext(k);let[e,t]=o.useState("Very Stupid Fix"),a=o.useMemo((()=>""),[e]);var r=o.useMemo((()=>({})),[e]);return o.createElement(i,{sx:{height:"100vh"},item:!0,xs:3},o.createElement(I,null),o.createElement("p",null,a," ",Object.keys(r).length),o.createElement(N,null,o.createElement(P,null)))}const T=new v({uri:"https://graphql.anilist.co",cache:new b}),A=S({palette:{mode:"light"}});w.render(o.createElement(o.StrictMode,null,o.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),o.createElement(O,null,o.createElement(L,{client:T},o.createElement(x,{theme:A},o.createElement(i,{container:!0},o.createElement(M,null),o.createElement(R,null)))))),document.getElementById("root"));
