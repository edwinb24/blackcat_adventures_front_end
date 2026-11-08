module.exports=[[84312,a=>{let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/components/header/Header.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/components/header/Header.tsx","default");a.s(["default",0,b])},88645,a=>{var b=a.i(84312);a.n(b)},27572,a=>{var b=a.i(7997),c=a.i(73240),d=a.i(95936),e=a.i(87847);function f({socialMediaInfo:a}){let g=(a.socialMediaLinks?.nodes||[]).filter(a=>a.socialMedia?.socialMediaPlatform&&a.socialMedia.socialMediaLink).map((a,e)=>{let f=a.socialMedia?.socialMediaPlatform||"",g=a.socialMedia?.socialMediaLink||"",h=c.I.get(f.toLowerCase());return(0,b.jsx)("li",{children:(0,b.jsx)(d.default,{href:g,"aria-label":h?f:void 0,children:h||(0,b.jsx)("p",{children:f})})},`${f}_${e}`)});return(0,b.jsx)("ul",{className:e.default.SocialMediaMenu,children:g})}var g=a.i(914);function h({socialMediaInfo:a}){return(0,b.jsxs)("footer",{className:g.default.Footer,children:[(0,b.jsx)("p",{children:"Follow Us"}),(0,b.jsx)(f,{socialMediaInfo:a})]})}var i=a.i(4927);let j=i.f`
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
`;var k=a.i(88645),l=a.i(64075);let m=i.f`
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
`;async function n({children:a}){let[c,d]=await Promise.all([(0,l.f)(j),(0,l.f)(m)]);return(0,b.jsx)("html",{lang:"en",children:(0,b.jsxs)("body",{children:[(0,b.jsx)(k.default,{headerMenuOptions:c}),a,(0,b.jsx)(h,{socialMediaInfo:d})]})})}a.s(["default",0,n,"metadata",0,{title:{default:"Black Cat Adventures",template:"%s | Black Cat Adventures"},description:"Black Cat Adventures, TTRPG Modules, Adventures and DMing Services!"}],27572)}],914,a=>{a.v({Footer:"_1I15rq_Footer"})},87847,a=>{a.v({SocialMediaMenu:"ieq7xa_SocialMediaMenu"})},50645,function(a){a.n(a.i(27572))}];

//# sourceMappingURL=src_app_0ox2bv69b5w66._.js.map