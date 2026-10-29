module.exports=[19299,a=>{a.v({ListOfModules:"aagZUW_ListOfModules"})},5329,a=>{a.v({moduleDescription:"_9ugh5W_moduleDescription",moduleDetails:"_9ugh5W_moduleDetails",moduleDraft:"_9ugh5W_moduleDraft",moduleEntry:"_9ugh5W_moduleEntry",moduleImage:"_9ugh5W_moduleImage",moduleLearnMoreLink:"_9ugh5W_moduleLearnMoreLink",modulePublished:"_9ugh5W_modulePublished",moduleStatus:"_9ugh5W_moduleStatus",moduleTitle:"_9ugh5W_moduleTitle"})},1856,a=>{"use strict";var b=a.i(7997),c=a.i(73240),d=a.i(6259),e=a.i(45049),f=a.i(95936),g=a.i(5329);function h({title:a,imageLink:i,altText:j,link:k,moduleStatus:l,position:m,linkToPurchase:n,shortDescription:o}){let p=l!==c.X.draft&&n?(0,b.jsx)("button",{className:`${g.default.moduleStatus} ${g.default.modulePublished}`,children:(0,b.jsx)(f.default,{href:n,children:"Purchase"})}):(0,b.jsx)("button",{className:`${g.default.moduleStatus} ${g.default.moduleDraft}`,children:"Coming Soon"}),q=k.split("/");return(0,b.jsxs)("div",{className:g.default.moduleEntry,children:[(0,b.jsx)("h3",{className:g.default.moduleTitle,children:a}),(0,b.jsxs)("div",{className:g.default.moduleDetails,children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:g.default.moduleDescription,children:(0,d.f)(o)}),(0,b.jsx)(f.default,{className:g.default.moduleLearnMoreLink,href:q.length>1?`/module/${q[q.length-2]}`:"/",children:" learn more..."})]}),p]}),i&&(0,b.jsx)("div",{className:g.default.moduleImage,children:(0,b.jsx)(e.default,{src:`${i}`,width:250,height:250,alt:j,preload:m<2,loading:m>=2?"lazy":void 0})})]})}var i=a.i(20599),j=a.i(19299);function k({modulePageData:a}){let{title:e,content:g}=a.post,l=(a.modules?.nodes.filter(a=>a.link&&a.moduleFields?.moduleStatus&&a.moduleFields.moduleStatus!==c.X.hidden)||[]).map((a,d)=>{let{title:e,link:f,shortDescription:g,imageLink:i,altText:j,moduleStatus:k,linkToPurchase:l,id:m}={...a,...a.moduleFields,imageLink:a.moduleFields?.additionalImage?.node.link||"",altText:a.moduleFields?.additionalImage?.node.altText||""};return(0,b.jsx)(h,{position:d,title:e||"",link:f||"",shortDescription:g||"",imageLink:i||"",altText:j||"",moduleStatus:k||c.X.hidden,linkToPurchase:l||""},m)});return(0,b.jsxs)("main",{className:i.default.pageNarrowWrapper,children:[(0,b.jsx)(f.default,{href:"/",children:"Return to Home >"}),(0,b.jsx)("h1",{className:i.default.mainTitle,children:e}),(0,d.f)(g),(0,b.jsx)("ul",{className:j.default.ListOfModules,children:l})]})}var l=a.i(4927);let m=l.f`
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
`;var n=a.i(64075);async function o(){let{data:a,error:d}=await (0,n.f)().query({query:m,variables:{id:c.T}});return d?(0,b.jsx)("p",{children:"Error Loading this Element"}):a&&a?.post&&a.post?.content&&a.post?.title?(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(k,{modulePageData:a})}):(0,b.jsx)("p",{children:"Element Fail to Load or is missing content and/or title"})}a.s(["default",0,o],1856)},89267,function(a){a.n(a.i(1856))}];

//# sourceMappingURL=src_app_1b_l4dejicd3d._.js.map