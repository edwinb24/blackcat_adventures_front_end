module.exports=[96758,a=>{a.v({ListOfEvents:"rK4Rtq_ListOfEvents"})},59116,a=>{a.v({eventDescription:"I7FFwq_eventDescription",eventDetails:"I7FFwq_eventDetails",eventDraft:"I7FFwq_eventDraft",eventEntry:"I7FFwq_eventEntry",eventImage:"I7FFwq_eventImage",eventLearnMoreLink:"I7FFwq_eventLearnMoreLink",eventNotes:"I7FFwq_eventNotes",eventPrice:"I7FFwq_eventPrice",eventPricingAndSessions:"I7FFwq_eventPricingAndSessions",eventPublished:"I7FFwq_eventPublished",eventSessions:"I7FFwq_eventSessions",eventStatus:"I7FFwq_eventStatus",eventTitle:"I7FFwq_eventTitle"})},11250,a=>{"use strict";var b=a.i(7997),c=a.i(20599),d=a.i(73240),e=a.i(6259),f=a.i(95936),g=a.i(45049),h=a.i(59116);function i({title:a,description:c,imageLink:j,imageAltText:k,eventStatus:l,eventSessions:m,eventNote:n,price:o,linkToPurchaseTicket:p}){let q=l!==d.W.comingsoon&&p?(0,b.jsx)("button",{className:`${h.default.eventStatus} ${h.default.eventPublished}`,children:(0,b.jsx)(f.default,{href:p,children:"Get A Ticket"})}):(0,b.jsx)("button",{className:`${h.default.eventStatus} ${h.default.eventDraft}`,children:"Coming Soon"}),r=m.map((a,c)=>{let d;return(0,b.jsx)("li",{children:(0,b.jsxs)("p",{children:[Number.isNaN((d=new Date(a.eventSessionStartTime)).getTime())?"TBD":new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"short",timeZone:"UTC"}).format(d),a.eventSessionNotes&&(0,b.jsxs)("i",{children:[" * ",a.eventSessionNotes]})]})},a.eventSessionStartTime+c)});return(0,b.jsxs)("div",{className:h.default.eventEntry,children:[a&&(0,b.jsx)("h3",{className:h.default.eventTitle,children:a}),(0,b.jsxs)("div",{className:h.default.eventDetails,children:[(0,b.jsxs)("div",{children:[(0,e.f)(c),n&&(0,b.jsxs)("p",{className:h.default.eventNotes,children:["*",n]})]}),(0,b.jsx)("ul",{className:h.default.eventSessions,children:r}),(0,b.jsxs)("p",{className:h.default.eventPrice,children:[(0,b.jsx)("b",{children:"Price:"})," ",o]}),q]}),j&&(0,b.jsx)("div",{className:h.default.eventImage,children:(0,b.jsx)(g.default,{src:`${j}`,width:300,height:300,alt:k,preload:!0})})]})}var j=a.i(96758);function k({eventsPageData:a}){let{title:g,content:h}=a.post,l=a.events?.nodes.filter(a=>a.eventFields?.eventStatus&&a.eventFields.eventStatus!==d.W.hidden)||[],m=(l.length>0?l.sort((a,b)=>{let c=a.eventFields?.eventSessions||[],d=b.eventFields?.eventSessions||[],e=c[0]?.eventSessionStartTime||"",f=d[0]?.eventSessionStartTime||"";return e||f?e?f?new Date(e).getTime()-new Date(f).getTime():-1:1:0}):[]).map(a=>{let{description:c,title:e,price:f,imageAltText:g,eventSessions:h,eventNote:j,imageLink:k,eventStatus:l,linkToPurchaseTicket:m,id:n}={...a,...a.eventFields,eventSessions:a.eventFields?.eventSessions&&a.eventFields?.eventSessions.length>0?a.eventFields?.eventSessions:[],imageLink:a.eventFields?.additionalImage?.node.link||"",imageAltText:a.eventFields?.additionalImage?.node.altText||""};return(0,b.jsx)(i,{eventNote:j||"",eventSessions:h||[],title:e||"",imageLink:k,imageAltText:g,price:f||"",description:c||"",eventStatus:l||d.W.hidden,linkToPurchaseTicket:m||""},n)});return(0,b.jsxs)("main",{className:c.default.pageNarrowWrapper,children:[(0,b.jsx)(f.default,{href:"/",children:"Return to Home >"}),(0,b.jsx)("h1",{className:c.default.mainTitle,children:g}),(0,e.f)(h),(0,b.jsx)("ul",{className:j.default.ListOfEvents,children:m.length>0?m:(0,b.jsx)("h1",{children:"There are not currently events."})})]})}var l=a.i(4927);let m=l.f`
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
`;var n=a.i(64075);async function o(){let{data:a,error:c}=await (0,n.f)().query({query:m,variables:{id:d.j}});return c?(0,b.jsx)("p",{children:"Error Loading this Element"}):a&&a?.post&&a.post?.content&&a.post?.title?(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(k,{eventsPageData:a})}):(0,b.jsx)("p",{children:"Element Fail to Load or is missing content and/or title"})}a.s(["default",0,o],11250)},95421,function(a){a.n(a.i(11250))}];

//# sourceMappingURL=src_app_0uwvvl69exldi._.js.map