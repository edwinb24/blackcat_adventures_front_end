module.exports=[96758,a=>{a.v({ListOfEvents:"rK4Rtq_ListOfEvents"})},59116,a=>{a.v({eventDescription:"I7FFwq_eventDescription",eventDetails:"I7FFwq_eventDetails",eventDraft:"I7FFwq_eventDraft",eventEntry:"I7FFwq_eventEntry",eventImage:"I7FFwq_eventImage",eventLearnMoreLink:"I7FFwq_eventLearnMoreLink",eventNotes:"I7FFwq_eventNotes",eventPrice:"I7FFwq_eventPrice",eventPricingAndSessions:"I7FFwq_eventPricingAndSessions",eventPublished:"I7FFwq_eventPublished",eventSessions:"I7FFwq_eventSessions",eventStatus:"I7FFwq_eventStatus",eventTitle:"I7FFwq_eventTitle"})},11250,a=>{"use strict";var b=a.i(7997),c=a.i(20599),d=a.i(73240),e=a.i(4942),f=a.i(95936),g=a.i(75578),h=a.i(45049),i=a.i(59116);function j({title:a,description:c,imageLink:f,imageAltText:k,eventStatus:l,eventSessions:m,eventNote:n,price:o,linkToPurchaseTicket:p,position:q}){let r=m.map((a,c)=>{let d;return(0,b.jsx)("li",{children:(0,b.jsxs)("p",{children:[Number.isNaN((d=new Date(a.eventSessionStartTime||"")).getTime())?"TBD":new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"short",timeZone:"UTC"}).format(d),a.eventSessionNotes&&(0,b.jsxs)("i",{children:[" * ",a.eventSessionNotes]})]})},`${a.eventSessionStartTime}${c}`)});return(0,b.jsxs)("li",{className:i.default.eventEntry,children:[a&&(0,b.jsx)("h3",{className:i.default.eventTitle,children:a}),(0,b.jsxs)("div",{className:i.default.eventDetails,children:[(0,b.jsxs)("div",{children:[(0,e.f)(c),n&&(0,b.jsxs)("p",{className:i.default.eventNotes,children:["*",n]})]}),(0,b.jsx)("ul",{className:i.default.eventSessions,children:r}),(0,b.jsxs)("p",{className:i.default.eventPrice,children:[(0,b.jsx)("b",{children:"Price:"})," ",o]}),(0,b.jsx)(g.f,{available:l!==d.W.comingsoon,href:p,label:"Get A Ticket",classes:{base:i.default.eventStatus,unavailable:i.default.eventDraft,available:i.default.eventPublished}})]}),f&&(0,b.jsx)("div",{className:i.default.eventImage,children:(0,b.jsx)(h.default,{src:f,width:300,height:300,alt:k,preload:q<1,loading:q>=1?"lazy":void 0})})]})}var k=a.i(96758);let l=a=>{let b=a.eventFields?.eventSessions?.[0]?.eventSessionStartTime;return b?new Date(b).getTime():null},m=(a,b)=>{let c=l(a),d=l(b);return null===c&&null===d?0:null===c?1:null===d?-1:c-d},n=({title:a,content:g,events:h})=>{let i=h.filter(a=>a.eventFields?.eventStatus&&a.eventFields.eventStatus!==d.W.hidden).sort(m).map((a,c)=>{let e=a.eventFields;return(0,b.jsx)(j,{position:c,title:a.title||"",description:e?.description||"",eventNote:e?.eventNote||"",eventSessions:(e?.eventSessions||[]).filter(a=>null!==a),imageLink:e?.additionalImage?.node.link||"",imageAltText:e?.additionalImage?.node.altText||"",price:e?.price||"",eventStatus:e?.eventStatus||d.W.hidden,linkToPurchaseTicket:e?.linkToPurchaseTicket||""},a.id)});return(0,b.jsxs)("main",{className:c.default.pageNarrowWrapper,children:[(0,b.jsx)(f.default,{href:"/",children:"Return to Home >"}),(0,b.jsx)("h1",{className:c.default.mainTitle,children:a}),(0,e.f)(g),(0,b.jsx)("ul",{className:k.default.ListOfEvents,children:i.length>0?i:(0,b.jsx)("li",{children:(0,b.jsx)("h1",{children:"There are currently no events."})})})]})};var o=a.i(4927);let p=o.f`
    query getAllEvents($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
        }
        events {
            nodes {
                id
                title
                eventFields {
                    description
                    linkToPurchaseTicket
                    eventStatus
                    price
                    eventNote
                    eventSessions {
                        eventSessionNotes
                        eventSessionStartTime
                    }
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
`;var q=a.i(64075);a.i(70396);var r=a.i(73727);let s=()=>(0,q.f)(p,{id:d.j}),t=async()=>{let a=await s();return{title:a.post?.title||"Events"}};async function u(){let a=await s();return a.post?.content&&a.post.title||(0,r.notFound)(),(0,b.jsx)(n,{title:a.post.title,content:a.post.content,events:a.events?.nodes||[]})}a.s(["default",0,u,"generateMetadata",0,t],11250)},95421,function(a){a.n(a.i(11250))}];

//# sourceMappingURL=src_app_0uwvvl69exldi._.js.map