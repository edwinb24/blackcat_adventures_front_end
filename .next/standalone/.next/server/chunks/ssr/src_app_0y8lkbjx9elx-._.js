module.exports=[70974,a=>{a.v({moduleDescription:"JDQU5a_moduleDescription",moduleDetails:"JDQU5a_moduleDetails",moduleDraft:"JDQU5a_moduleDraft",moduleImage:"JDQU5a_moduleImage",moduleInformation:"JDQU5a_moduleInformation",modulePublished:"JDQU5a_modulePublished",moduleStatus:"JDQU5a_moduleStatus"})},65403,a=>{"use strict";var b=a.i(7997),c=a.i(64075),d=a.i(4927);let e=d.f`
    query getSingleModule($slug: ID!) {
        module(id: $slug, idType: SLUG) {
            title
            id
            moduleFields {
                description
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
`;var f=a.i(75578),g=a.i(20599),h=a.i(73240),i=a.i(4942),j=a.i(45049),k=a.i(95936),l=a.i(70974);function m({title:a,description:c,imageLink:d,altText:e,moduleStatus:n,linkToPurchase:o}){return(0,b.jsx)("main",{children:(0,b.jsxs)("div",{className:g.default.pageWideWrapper,children:[(0,b.jsx)(k.default,{href:"/",children:"Return to Home >"}),(0,b.jsx)("h1",{className:g.default.mainTitle,children:a}),(0,b.jsxs)("div",{className:l.default.moduleInformation,children:[(0,b.jsxs)("div",{className:l.default.moduleDetails,children:[(0,b.jsx)("div",{className:l.default.moduleDescription,children:(0,i.f)(c)}),(0,b.jsx)(f.f,{available:n!==h.X.draft,href:o,label:"Purchase",classes:{base:l.default.moduleStatus,unavailable:l.default.moduleDraft,available:l.default.modulePublished}})]}),d&&(0,b.jsx)("div",{className:l.default.moduleImage,children:(0,b.jsx)(j.default,{src:d,width:400,height:500,alt:e,preload:!0})})]})]})})}a.i(70396);var n=a.i(73727);let o=async a=>{let b=(await (0,c.f)(e,{slug:a})).module;if(!b?.moduleFields)return null;let d=b.moduleFields.moduleStatus||h.X.hidden;return d===h.X.hidden?null:{cmsModule:b,moduleFields:b.moduleFields,moduleStatus:d}},p=async({params:a})=>{let{moduleName:b}=await a,c=await o(b);return{title:c?.cmsModule.title||"Module"}},q=async({params:a})=>{let{moduleName:c}=await a,d=await o(c);d||(0,n.notFound)();let{cmsModule:e,moduleFields:f,moduleStatus:g}=d;return(0,b.jsx)(m,{title:e.title||"",description:f.description||"",imageLink:f.additionalImage?.node.link||"",altText:f.additionalImage?.node.altText||"",moduleStatus:g,linkToPurchase:f.linkToPurchase||""})};a.s(["default",0,q,"generateMetadata",0,p],65403)},96782,function(a){a.n(a.i(65403))}];

//# sourceMappingURL=src_app_0y8lkbjx9elx-._.js.map