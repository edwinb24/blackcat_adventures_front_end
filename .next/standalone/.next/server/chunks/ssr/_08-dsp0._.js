module.exports=[64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},914,a=>{a.v({Footer:"Footer-module__1I15rq__Footer"})},84312,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/components/header/Header.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/components/header/Header.tsx","default")},88645,a=>{"use strict";var b=a.i(84312);a.n(b)},71e3,a=>{"use strict";a.s(["ApolloWrapper",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call ApolloWrapper() from the server but ApolloWrapper is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/components/lib/ApolloWrapper.tsx","ApolloWrapper")},35426,a=>{"use strict";var b=a.i(71e3);a.n(b)},87847,a=>{a.v({SocialMediaMenu:"SocialMediaMenu-module__ieq7xa__SocialMediaMenu"})},16461,a=>{"use strict";a.s(["NewsletterModalContext",()=>c,"NewsletterModalContextProvider",()=>d]);var b=a.i(11857);let c=(0,b.registerClientReference)(function(){throw Error("Attempted to call NewsletterModalContext() from the server but NewsletterModalContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/contexts/newsletterModalContext.tsx","NewsletterModalContext"),d=(0,b.registerClientReference)(function(){throw Error("Attempted to call NewsletterModalContextProvider() from the server but NewsletterModalContextProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/contexts/newsletterModalContext.tsx","NewsletterModalContextProvider")},10312,a=>{"use strict";var b=a.i(16461);a.n(b)},27572,a=>{"use strict";var b=a.i(7997),c=a.i(73240),d=a.i(95936),e=a.i(87847);function f({socialMediaInfo:a}){let g=(a.socialMediaLinks?.nodes||[]).map((a,e)=>{if(!a.socialMedia?.socialMediaPlatform||!a.socialMedia?.socialMediaLink)return(0,b.jsx)("li",{children:(0,b.jsx)("p",{children:"Social Media Link Fail to Load"})},e);let{socialMediaPlatform:f,socialMediaLink:g}=a.socialMedia;return(0,b.jsx)("li",{children:(0,b.jsx)(d.default,{href:`${g}`,children:f?.toLowerCase()&&c.SOCIAL_MEDIA_ICONS.has(f?.toLowerCase())?c.SOCIAL_MEDIA_ICONS.get(f?.toLowerCase()):(0,b.jsx)("p",{children:a.socialMedia?.socialMediaPlatform})})},`${f}_${e}`)});return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)("ul",{className:e.default.SocialMediaMenu,children:g})})}var g=a.i(914);function h({socialMediaInfo:a}){return(0,b.jsxs)("footer",{className:g.default.Footer,children:[(0,b.jsx)("p",{children:"Follow Us"}),(0,b.jsx)(f,{socialMediaInfo:a})]})}var i=a.i(4927);a.i(65982);let j=i.gql`
    query GetPostList {
        posts {
            nodes {
                postFields {
                    addToMainMenu
                }
                id
                title
                link
            }
        }
        modules {
            nodes {
                id
                title
                link
                moduleFields {
                    moduleStatus
                }
            }
        }
    }
`;var k=a.i(88645),l=a.i(64075),m=a.i(35426);let n=i.gql`
    query getSocialMedia {
        socialMediaLinks {
            nodes {
                socialMedia {
                    socialMediaPlatform
                    socialMediaLink
                }
            }
        }
    }
`;var o=a.i(10312);async function p({children:a}){let{data:c,error:d}=await (0,l.getClient)().query({query:j}),{data:e,error:f}=await (0,l.getClient)().query({query:n});return d||f?(0,b.jsx)("p",{children:"Error Loading this Element"}):c&&c.posts&&e&&e?.socialMediaLinks?(0,b.jsx)("html",{lang:"en",children:(0,b.jsx)("body",{children:(0,b.jsx)(m.ApolloWrapper,{children:(0,b.jsxs)(o.NewsletterModalContextProvider,{children:[(0,b.jsx)(k.default,{headerMenuOptions:c}),a,(0,b.jsx)(h,{socialMediaInfo:e})]})})})}):(0,b.jsx)("p",{children:"Element Fail to Load"})}a.s(["default",0,p,"metadata",0,{title:"Black Cat Adventures",description:"Black Cat Adventures, TTRPG Modules, Adventures and DMing Services!"}],27572)},50645,function(a){a.n(a.i(27572))}];

//# sourceMappingURL=_08-dsp0._.js.map