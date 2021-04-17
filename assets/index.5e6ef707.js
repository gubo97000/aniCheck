var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,l=(e,l)=>{for(var n in l||(l={}))t.call(l,n)&&s(e,n,l[n]);if(a)for(var n of a(l))r.call(l,n)&&s(e,n,l[n]);return e};import{c as n,r as o,G as i,g as d,u as c,T as u,B as m,L as f,a as y,b as g,A as p,F as h,d as E,I as v,e as b,f as L}from"./vendor.5c2e5d7a.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const n=new URL(e,r);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){l(new Error(`Failed to import: ${e}`)),s(i)},onload(){a(self[t].moduleMap[n]),s(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/aniCheck/assets/");const w={cy:n({headless:!0})};function S({children:e}){const[t,a]=o.useState(w);return o.createElement(D.Provider,{value:[t,a]},e)}const D=o.createContext([w,()=>{}]);function O(){const[e,t]=o.useContext(D);let a=o.useRef(null);return o.useEffect((()=>{let r=n({container:a.current,elements:[{data:{id:"a"}},{data:{id:"b"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'node[format="MANGA"]',style:{shape:"rhomboid"}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});t(l(l({},e),{cyViz:r}))}),[]),o.createElement(i,{item:!0,xs:9},o.createElement("div",{ref:a,style:{width:"100%",height:"100%"}}))}const C=d`
query ($user: String!){
  MediaListCollection(userName: $user, type: ANIME) {
    lists {
      entries {
        id
        status
        media {
          id
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
          relations {
            edges {
              id
              relationType
              node {
                id
                title {
                  userPreferred
                }
                startDate {
                  year
                  month
                  day
                }
                format
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
`;function M(){const[e,t]=o.useContext(D);let[a,r]=(e=>{const[t,a]=o.useState(localStorage.getItem(e)||"");return o.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const[s,{loading:n,error:i,data:d,refetch:f,networkStatus:y,variables:g}]=c(C,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{if(!n&&!i&&d){let a=e.cy;const[r,s]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e.MediaListCollection.lists)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,format:e.media.format,title:e.media.title.userPreferred,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let r of e.media.relations.edges)a.set(r.id,{data:{id:r.id,source:e.media.id,target:r.node.id,relation:r.relationType}}),t.get(r.node.id)||t.set(r.node.id,{data:{id:r.node.id,status:"NO",format:r.node.format,title:r.node.title.userPreferred,startDate:[r.node.startDate.year,r.node.startDate.month,r.node.startDate.day].join("-")}})}return[t,a]})(d);console.log(r,s),a.add(Array.from(r.values()).concat(Array.from(s.values())));let n=a.elements().components().map((e=>{let t=e.sort(((e,t)=>{let a=Date.parse(e.data("startDate")),r=Date.parse(t.data("startDate"));return isNaN(a)?999:isNaN(r)?-1:a-r}));return{seriesPrime:t.nodes()[0],series:t}}));console.log(n),t(l(l({},e),{seriesList:n})),console.log(e)}}});return o.createElement("div",null,o.createElement(u,{id:"username",value:a,onChange:e=>{r(e.target.value)},label:"Your AniList nick"}),o.createElement(m,{variant:"contained",onClick:e=>{s({variables:{user:a}})}},"Load"),n?o.createElement("div",null,"Loading"):o.createElement("div",null,"Done"),i?o.createElement("p",null,"Error: ",i.message):o.createElement("p",null,"No Error"))}function P({index:e,style:t,data:a}){var r,s,l;const[n,i]=o.useState(!1);let{addState:d,handleToggle:c,seriesList:u}=a,m=null==(r=u[e])?void 0:r.series,g=null==(s=u[e])?void 0:s.seriesPrime,p=null==(l=u[e])?void 0:l.seriesPrime.data("id");return o.useMemo((()=>{d({id:p,state:[n,i],series:m})}),[]),o.createElement(f,{key:p,style:t,role:void 0,button:!0,onClick:()=>{c(p)}},o.createElement(y,{id:p,primary:g.data("title")+n}))}function N(){const[e,t]=o.useContext(D);let[a,r]=o.useState("Very Stupid Fix"),s=o.useMemo((()=>""),[a]);var l=o.useMemo((()=>({})),[a]);const n=e=>{l[e.id]={id:e.id,state:e.state,series:e.series}},d=t=>{var a,r,n,o;console.log(s),s&&(console.log("Hello"),l[s].state[1](!1)),s=t,l[t].state[1](!0),console.log(s),null==(a=e.cyViz)||a.elements().remove(),null==(r=e.cyViz)||r.add(l[t].series),null==(n=e.cyViz)||n.elements().makeLayout({name:"breadthfirst",roots:[s]}).run(),null==(o=e.cyViz)||o.center()};function c(t){var a,r;return null!=(r=null==(a=e.seriesList)?void 0:a[t].seriesPrime.data("id"))?r:"1"}return o.createElement(i,{sx:{height:"100vh"},item:!0,xs:3},o.createElement(M,null),o.createElement("p",null,s," ",Object.keys(l).length),o.createElement(g,{sx:{height:"80vh"}},e.seriesList?o.createElement(p,null,(({height:t,width:a})=>{var r,s;return o.createElement(h,{height:t,itemSize:70,width:a,itemCount:null!=(s=null==(r=e.seriesList)?void 0:r.length)?s:0,itemData:{addState:n,handleToggle:d,seriesList:e.seriesList},itemKey:c},P)})):o.createElement("p",null,"None")))}const j=new E({uri:"https://graphql.anilist.co",cache:new v});b.render(o.createElement(o.StrictMode,null,o.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),o.createElement(S,null,o.createElement(L,{client:j},o.createElement(i,{container:!0},o.createElement(O,null),o.createElement(N,null))))),document.getElementById("root"));
