import{j as t,R as m,r as a,a as y}from"./index.8ffbfc14.js";const h=(...e)=>e.filter(Boolean).join(" "),w={lines:1,expandControl:t("button",Object.assign({className:"handy-clamp__control"},{children:"Expand"}))},d=e=>{const s=a.exports.useRef(null),[i,r]=a.exports.useState(!1),[c,u]=a.exports.useState(!1),f=n=>{n==null||n.preventDefault(),r(!0)},x=()=>{e.expandControl||r(!0)},p=()=>{const n=s.current;n&&u(n.scrollHeight>n.clientHeight)};a.exports.useEffect(()=>{const n=new ResizeObserver(p);return n.observe(s.current),()=>n.disconnect()},[]);const b=!i&&c&&!e.expandControl,C=!i&&c&&e.expandControl;return y("div",Object.assign({className:h("handy-clamp",e.className),onClick:x},{children:[t("div",Object.assign({className:h("handy-clamp__text",b?"handy-clamp__text_clickable":void 0),style:i?void 0:{WebkitLineClamp:e.lines},ref:s},{children:e.children})),C&&m.cloneElement(e.expandControl,{onClick:f})]}))};d.defaultProps=w;d.displayName="HandyClamp";const o=m.memo(d),v={title:"Handy clamp"},l=`This book is largely concerned with Hobbits, and from its pages a reader may discover
much of their character and a little of their history. Further information will also be found in
the selection from the Red Book of Westmarch that has already been published, under the title of The Hobbit.
That story was derived from the earlier chapters of the Red Book, composed by Bilbo himself,
the first Hobbit to become famous in the world at large, and called by him There and Back Again,
since they told of his journey into the East and his return: an adventure
which later involved all the Hobbits in the great events of that Age that are here related.`,k=()=>t(o,{lines:2,children:l}),H=()=>t(o,{lines:2,expandControl:null,children:l}),_=()=>t(o,{lines:2,expandControl:t("a",{href:"#",children:"Expand"}),children:l}),g=e=>t(o,{lines:e.lines,expandControl:t("span",{dangerouslySetInnerHTML:{__html:e.expandControl}}),children:e.children});g.args={children:l,expandControl:"<button>Expand</button>",lines:2};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{k as Basic,_ as CustomExpandControl,H as HiddenExpandControl,g as Interactive,v as default};
