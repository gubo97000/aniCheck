var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,l=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,o=(e,o)=>{for(var s in o||(o={}))t.call(o,s)&&l(e,s,o[s]);if(a)for(var s of a(o))r.call(o,s)&&l(e,s,o[s]);return e};import{c as s,r as n,G as i,g as d,u as c,T as m,B as u,a as p,L as g,b as y,A as f,F as h,d as E,I as b,e as v,f as w,h as L,i as S}from"./vendor.cbead7d8.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,o)=>{const s=new URL(e,r);if(self[t].moduleMap[s])return a(self[t].moduleMap[s]);const n=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){o(new Error(`Failed to import: ${e}`)),l(i)},onload(){a(self[t].moduleMap[s]),l(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/aniCheck/assets/");const C={cy:s({headless:!0})};function O({children:e}){const[t,a]=n.useState(C);return n.createElement(x.Provider,{value:[t,a]},e)}const x=n.createContext([C,()=>{}]);function D(){const[e,t]=n.useContext(x);let a=n.useRef(null);return n.useEffect((()=>{let r=s({container:a.current,elements:[{data:{id:"a",title:"a"}},{data:{id:"b",title:"a"}},{data:{id:"ab",source:"a",target:"b"}}],style:[{selector:"node",style:{label:"data(title)"}},{selector:'node[status="NO"]',style:{"background-color":"red"}},{selector:'node[status="COMPLETED"]',style:{"background-color":"green"}},{selector:"edge",style:{"curve-style":"bezier",width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa",label:"data(relation)"}},{selector:'edge[relation= "SEQUEL"]',style:{label:"Sequel"}},{selector:'edge[relation= "SIDE_STORY"]',style:{label:"Side Story"}},{selector:'edge[relation= "OTHER"]',style:{label:"Other"}},{selector:'edge[relation= "ADAPTATION"]',style:{label:"Adapted from"}},{selector:'edge[relation= "SOURCE"]',style:{label:"Source"}},{selector:'node[format="MANGA"]',style:{"border-width":"1px",shape:"polygon","shape-polygon-points":"0.846 -0.923 -0.602 -0.923 -0.923 -0.806 -0.923 0.846 -0.692 0.923 0.692 0.923 0.692 -0.692 -0.692 -0.692 -0.692 0.923 -0.692 -0.692 -0.769 -0.769 -0.538 -0.846 0.846 -0.846 0.846 0.769 "}},{selector:'node[format="NOVEL"]',style:{shape:"triangle"}}],layout:{name:"cose"}});r.on("cxttapend","node",(e=>{console.log("cxttapend on node"),window.open(e.target.data("siteUrl"),"_blank")})),r.on("tap",(e=>{console.log(e.target.data())})),t(o(o({},e),{cyViz:r}))}),[]),n.createElement(i,{item:!0,xs:9},n.createElement("div",{ref:a,style:{width:"100%",height:"100vh"}}))}const M=d`
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
            edges {
              id
              relationType
              node {
                id
                title {
                  userPreferred
                }
                siteUrl
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
`;function k(){const[e,t]=n.useContext(x);let[a,r]=(e=>{const[t,a]=n.useState(localStorage.getItem(e)||"");return n.useEffect((()=>{localStorage.setItem(e,t)}),[t]),[t,a]})("usr");const[l,s]=c(M,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{i({variables:{user:a,type:"MANGA"}})}}),[i,{loading:d,error:p,data:g,refetch:y,networkStatus:f,variables:h}]=c(M,{notifyOnNetworkStatusChange:!0,onCompleted:()=>{if(!d&&!p&&g){let a=e.cy;const[r,l]=(e=>{let t=new Map,a=new Map;console.log(e);for(let r of e)for(let e of r.entries){t.set(e.media.id,{data:{id:e.media.id,status:e.status,format:e.media.format,title:e.media.title.userPreferred,siteUrl:e.media.siteUrl,startDate:[e.media.startDate.year,e.media.startDate.month,e.media.startDate.day].join("-")}});for(let r of e.media.relations.edges)a.set(r.id,{data:{id:r.id,source:e.media.id,target:r.node.id,relation:r.relationType}}),t.get(r.node.id)||t.set(r.node.id,{data:{id:r.node.id,status:"NO",format:r.node.format,title:r.node.title.userPreferred,siteUrl:r.node.siteUrl,startDate:[r.node.startDate.year,r.node.startDate.month,r.node.startDate.day].join("-")}})}return[t,a]})([].concat(s.data.MediaListCollection.lists,g.MediaListCollection.lists));console.log(r,l),a.add(Array.from(r.values()).concat(Array.from(l.values())));let n=a.elements().components().map((e=>{let t=e.sort(((e,t)=>{let a=Date.parse(e.data("startDate")),r=Date.parse(t.data("startDate"));return isNaN(a)?999:isNaN(r)?-1:a-r}));return{seriesPrime:t.nodes()[0],series:t}}));console.log(n),t(o(o({},e),{seriesList:n})),console.log(e)}}});return n.createElement("div",null,n.createElement(m,{id:"username",value:a,onChange:e=>{r(e.target.value)},label:"Your AniList nick"}),n.createElement(u,{variant:"contained",onClick:e=>{l({variables:{user:a,type:"ANIME"}})}},"Load"),d?n.createElement("div",null,"Loading"):n.createElement("div",null,"Done"),p?n.createElement("p",null,"Error: ",p.message):n.createElement("p",null,"No Error"))}function N({index:e,style:t,data:a}){var r,l,s;const[i,d]=n.useState(!1);let{addState:c,handleToggle:m,seriesList:u}=a,f=null==(r=u[e])?void 0:r.series,h=null==(l=u[e])?void 0:l.seriesPrime,E=null==(s=u[e])?void 0:s.seriesPrime.data("id");return n.useMemo((()=>{c({id:E,state:[i,d],series:f})}),[]),n.createElement(p,{sx:{},style:o({},t),key:E},n.createElement(g,{sx:{height:"90%",marginBottom:"10px",border:"1px solid",borderColor:"grey.500",bgcolor:"background.paper",color:"primary.main",borderRadius:"5px"},selected:i,key:E,role:void 0,button:!0,onClick:()=>{m(E)}},n.createElement(y,{id:E,primary:h.data("title")})))}function P(){const[e,t]=n.useContext(x);let[a,r]=n.useState("Very Stupid Fix"),l=n.useMemo((()=>""),[a]);var o=n.useMemo((()=>({})),[a]);const s=e=>{console.log("addState"),o[e.id]={id:e.id,state:e.state,series:e.series}},d=t=>{var a,r,s,n;console.log(l),l&&(console.log("Hello"),o[l].state[1](!1)),l=t,o[t].state[1](!0),console.log(l),null==(a=e.cyViz)||a.elements().remove(),null==(r=e.cyViz)||r.add(o[t].series),null==(s=e.cyViz)||s.elements().makeLayout({name:"breadthfirst",roots:[l]}).run(),null==(n=e.cyViz)||n.center()};function c(t){var a,r;return null!=(r=null==(a=e.seriesList)?void 0:a[t].seriesPrime.data("id"))?r:"1"}return n.createElement(i,{sx:{height:"100vh"},item:!0,xs:3},n.createElement(k,null),n.createElement("p",null,l," ",Object.keys(o).length),n.createElement(p,{sx:{height:"80vh"}},e.seriesList?n.createElement(f,null,(({height:t,width:a})=>{var r,l;return n.createElement(h,{height:t,itemSize:100,width:a,itemCount:null!=(l=null==(r=e.seriesList)?void 0:r.length)?l:0,itemData:{addState:s,handleToggle:d,seriesList:e.seriesList},itemKey:c},N)})):n.createElement("p",null,"None")))}const U=new E({uri:"https://graphql.anilist.co",cache:new b}),A=v({palette:{mode:"light"}});w.render(n.createElement(n.StrictMode,null,n.createElement("meta",{name:"viewport",content:"initial-scale=1, width=device-width"}),n.createElement(O,null,n.createElement(L,{client:U},n.createElement(S,{theme:A},n.createElement(i,{container:!0},n.createElement(D,null),n.createElement(P,null)))))),document.getElementById("root"));
