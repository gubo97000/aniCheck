if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(r.map((e=>d[e]||l(e)))).then((e=>(n(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"cb50702cb21f844dd89c5f03b36ad547"},{url:"assets/customWorker-195115ae.js",revision:null},{url:"assets/index-c693d247.css",revision:null},{url:"assets/index-c933208f.js",revision:null},{url:"assets/worker-bae56002.js",revision:null},{url:"index.html",revision:"6756d08f618e4d0c99e03a1662af2394"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"pwaicon.png",revision:"8d00e49fee299d0f0d26918ba9353375"},{url:"manifest.webmanifest",revision:"ade0c3b6508817062f09c94112670522"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
