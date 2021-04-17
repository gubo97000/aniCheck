var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,l=(e,l)=>{for(var o in l||(l={}))t.call(l,o)&&s(e,o,l[o]);if(a)for(var o of a(l))r.call(l,o)&&s(e,o,l[o]);return e};import{c as o,r as n,G as i,g as d,u as c,T as u,B as m,L as f,a as y,b as g,A as p,F as h,d as E,I as v,e as b,f as L}from"./vendor.5c2e5d7a.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const o=new URL(e,r);if(self[t].moduleMap[o])return a(self[t].moduleMap[o]);const n=new Blob([`import * as m from '${o}';`,`${t}.moduleMap['${o}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){l(new Error(`Failed to import: ${e}`)),s(i)},onload(){a(self[t].moduleMap[o]),s(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/assets/");const w={cy:o({headless:!0})};function S({children:e}){const[t,a]=n.useState(w);return n.createElement(D.Provider,{value:[t,a]},e)}const D=n.createContext([w,()=>{}]);function O(){const[e,t]=n.useContext(D);let a=n.useRef(null);return n.useEffect((()=>{let r=o({container:a.current,elements:[{data:{id:"a"}},{data:{id:"b"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'node[format="MANGA"]',style:{shape:"rhomboid"}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});t(l(l({},e),{cyViz:r}))}),[]),n.createElement(i,{item:!0,xs:9},n.createElement("div",{ref:a,style:{width:"100%",height:"100%"}}))}const C=d`
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
`;function M(){const[e,t]=n.useContext(D);let[a,r]=(e=>{const[t,a]=n.useState(localStorage.getItem(e)||"");return n.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const[s,{loading:o,error:i,data:d,refetch:f,networkStatus:y,variables:g}]=c(C,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{if(!o&&!i&&d){let a=e.cy;const[r,s]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e.MediaListCollection.lists)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,format:e.media.format,title:e.media.title.userPreferred,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let r of e.media.relations.edges)a.set(r.id,{data:{id:r.id,source:e.media.id,target:r.node.id,relation:r.relationType}}),t.get(r.node.id)||t.set(r.node.id,{data:{id:r.node.id,status:"NO",format:r.node.format,title:r.node.title.userPreferred,startDate:[r.node.startDate.year,r.node.startDate.month,r.node.startDate.day].join("-")}})}return[t,a]})(d);console.log(r,s),a.add(Array.from(r.values()).concat(Array.from(s.values())));let o=a.elements().components().map((e=>{let t=e.sort(((e,t)=>{let a=Date.parse(e.data("startDate")),r=Date.parse(t.data("startDate"));return isNaN(a)?999:isNaN(r)?-1:a-r}));return{seriesPrime:t.nodes()[0],series:t}}));console.log(o),t(l(l({},e),{seriesList:o})),console.log(e)}}});return n.createElement("div",null,n.createElement(u,{id:"username",value:a,onChange:e=>{r(e.target.value)},label:"Your AniList nick"}),n.createElement(m,{variant:"contained",onClick:e=>{s({variables:{user:a}})}},"Load"),o?n.createElement("div",null,"Loading"):n.createElement("div",null,"Done"),i?n.createElement("p",null,"Error: ",i.message):n.createElement("p",null,"No Error"))}function P({index:e,style:t,data:a}){var r,s,l;const[o,i]=n.useState(!1);let{addState:d,handleToggle:c,seriesList:u}=a,m=null==(r=u[e])?void 0:r.series,g=null==(s=u[e])?void 0:s.seriesPrime,p=null==(l=u[e])?void 0:l.seriesPrime.data("id");return n.useMemo((()=>{d({id:p,state:[o,i],series:m})}),[]),n.createElement(f,{key:p,style:t,role:void 0,button:!0,onClick:()=>{c(p)}},n.createElement(y,{id:p,primary:g.data("title")+o}))}function N(){const[e,t]=n.useContext(D);let[a,r]=n.useState("Very Stupid Fix"),s=n.useMemo((()=>""),[a]);var l=n.useMemo((()=>({})),[a]);const o=e=>{l[e.id]={id:e.id,state:e.state,series:e.series}},d=t=>{var a,r,o,n;console.log(s),s&&(console.log("Hello"),l[s].state[1](!1)),s=t,l[t].state[1](!0),console.log(s),null==(a=e.cyViz)||a.elements().remove(),null==(r=e.cyViz)||r.add(l[t].series),null==(o=e.cyViz)||o.elements().makeLayout({name:"breadthfirst",roots:[s]}).run(),null==(n=e.cyViz)||n.center()};function c(t){var a,r;return null!=(r=null==(a=e.seriesList)?void 0:a[t].seriesPrime.data("id"))?r:"1"}return n.createElement(i,{sx:{height:"100vh"},item:!0,xs:3},n.createElement(M,null),n.createElement("p",null,s," ",Object.keys(l).length),n.createElement(g,{sx:{height:"80vh"}},e.seriesList?n.createElement(p,null,(({height:t,width:a})=>{var r,s;return n.createElement(h,{height:t,itemSize:70,width:a,itemCount:null!=(s=null==(r=e.seriesList)?void 0:r.length)?s:0,itemData:{addState:o,handleToggle:d,seriesList:e.seriesList},itemKey:c},P)})):n.createElement("p",null,"None")))}const j=new E({uri:"https://graphql.anilist.co",cache:new v});b.render(n.createElement(n.StrictMode,null,n.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),n.createElement(S,null,n.createElement(L,{client:j},n.createElement(i,{container:!0},n.createElement(O,null),n.createElement(N,null))))),document.getElementById("root"));
