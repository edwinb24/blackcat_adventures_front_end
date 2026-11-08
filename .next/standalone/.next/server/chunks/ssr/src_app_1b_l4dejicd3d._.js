module.exports=[19299,a=>{a.v({ListOfModules:"aagZUW_ListOfModules"})},5329,a=>{a.v({moduleDescription:"_9ugh5W_moduleDescription",moduleDetails:"_9ugh5W_moduleDetails",moduleDraft:"_9ugh5W_moduleDraft",moduleEntry:"_9ugh5W_moduleEntry",moduleImage:"_9ugh5W_moduleImage",moduleLearnMoreLink:"_9ugh5W_moduleLearnMoreLink",modulePublished:"_9ugh5W_modulePublished",moduleStatus:"_9ugh5W_moduleStatus",moduleTitle:"_9ugh5W_moduleTitle"})},1856,a=>{"use strict";var b=a.i(7997),c=a.i(75578),d=a.i(73240),e=a.i(4942),f=a.i(45049),g=a.i(95936),h=a.i(5329);function i({title:a,imageLink:j,altText:k,link:l,moduleStatus:m,position:n,linkToPurchase:o,shortDescription:p}){return(0,b.jsxs)("li",{className:h.default.moduleEntry,children:[(0,b.jsx)("h3",{className:h.default.moduleTitle,children:a}),(0,b.jsxs)("div",{className:h.default.moduleDetails,children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:h.default.moduleDescription,children:(0,e.f)(p)}),(0,b.jsx)(g.default,{className:h.default.moduleLearnMoreLink,href:((a,b="")=>{let c,d=(c=(a||"").split("/")).length>1?c[c.length-2]:"";return d?`${b}/${d}`:"/"})(l,"/module"),children:" learn more..."})]}),(0,b.jsx)(c.f,{available:m!==d.X.draft,href:o,label:"Purchase",classes:{base:h.default.moduleStatus,unavailable:h.default.moduleDraft,available:h.default.modulePublished}})]}),j&&(0,b.jsx)("div",{className:h.default.moduleImage,children:(0,b.jsx)(f.default,{src:j,width:250,height:250,alt:k,preload:n<2,loading:n>=2?"lazy":void 0})})]})}var j=a.i(20599),k=a.i(19299);function l({title:a,content:c,modules:f}){let h=f.filter(a=>a.link&&a.moduleFields?.moduleStatus&&a.moduleFields.moduleStatus!==d.X.hidden).map((a,c)=>{let e=a.moduleFields;return(0,b.jsx)(i,{position:c,title:a.title||"",link:a.link||"",shortDescription:e?.shortDescription||"",imageLink:e?.additionalImage?.node.link||"",altText:e?.additionalImage?.node.altText||"",moduleStatus:e?.moduleStatus||d.X.hidden,linkToPurchase:e?.linkToPurchase||""},a.id)});return(0,b.jsxs)("main",{className:j.default.pageNarrowWrapper,children:[(0,b.jsx)(g.default,{href:"/",children:"Return to Home >"}),(0,b.jsx)("h1",{className:j.default.mainTitle,children:a}),(0,e.f)(c),(0,b.jsx)("ul",{className:k.default.ListOfModules,children:h})]})}var m=a.i(4927);let n=m.f`
    query getAllModulesContent($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
        }
        modules {
            nodes {
                id
                link
                title
                moduleFields {
                    shortDescription
                    linkToPurchase
                    moduleStatus
                    additionalImage {
                        node {
                            link
                            altText
                        }
                    }
                }
            }
        }
    }
`;var o=a.i(64075);a.i(70396);var p=a.i(73727);let q=()=>(0,o.f)(n,{id:d.T}),r=async()=>{let a=await q();return{title:a.post?.title||"Modules"}};async function s(){let a=await q();return a.post?.content&&a.post.title||(0,p.notFound)(),(0,b.jsx)(l,{title:a.post.title,content:a.post.content,modules:a.modules?.nodes||[]})}a.s(["default",0,s,"generateMetadata",0,r],1856)},89267,function(a){a.n(a.i(1856))}];

//# sourceMappingURL=src_app_1b_l4dejicd3d._.js.map