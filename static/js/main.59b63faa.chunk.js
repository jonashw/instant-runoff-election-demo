(this["webpackJsonpinstant-runoff-election"]=this["webpackJsonpinstant-runoff-election"]||[]).push([[0],{15:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),c=n(9),r=n.n(c),i=n(6),l=n(3),o=n(2),d=n(5),j=("\ud83d\udc38,\ud83d\udc30,\ud83d\udc19,\ud83d\udc35,\ud83d\udc3c,\ud83e\udd8a,\ud83d\udc34,".split(",").slice(0,6),function(e,t,n){var s=t.toString().length;return Array(t).fill().map((function(t,a){var c=Array(e).fill().reduce((function(e){var t=Math.floor(Math.random()*e.availableCandidates.length),n=Math.random()<0?[""]:e.availableCandidates.splice(t,1),s=Object(o.a)(n,1)[0];return e.votes.push(s),e}),{votes:[],availableCandidates:n.slice(0)}).votes;return{id:(a+1).toString().padStart(s,"0"),votes:c}}))}),h=j,b=function(e){var t=e.reduce((function(e,t){var n=e[t]||0;return e[t]=n+1,e}),{});return Object.entries(t).map((function(t){var n=Object(o.a)(t,2),s=n[0],a=n[1];return{candidate:"null"===s?null:s,voteCount:a,votePercentage:a/e.length*100}})).sort((function(e,t){return t.voteCount-e.voteCount}))},u=function(e,t){if(0===e.length)return[];for(var n=function(e){var t=[].concat(Object(d.a)(e.losers),[e.leaders[e.leaders.length-1].candidate]),n=function(e,t){return t.map((function(t){for(var n=t.votes.slice(0);e.indexOf(n[0])>-1&&n.length>0;)n.shift();return Object(l.a)(Object(l.a)({},t),{},{votes:n})})).filter((function(e){return e.votes.length>0}))}(t,e.ballots),s=b(n.map((function(e){return e.votes[0]})));return{ballots:n,losers:t,leaders:s}},s=[{ballots:e,losers:[],leaders:b(e.map((function(e){return e.votes[0]})))}],a=0;a<t;a++){var c=s[s.length-1];c.leaders[0]&&c.leaders[0].votePercentage<50&&s.push(n(c))}var r=void 0;if(s.length>0){var i=s[s.length-1].leaders[0];i&&i.votePercentage>50&&(r=Object(l.a)(Object(l.a)({},i),{},{fromBehind:s[0].leaders[0].candidate!==i.candidate}))}return{stages:s,winner:r}},m=n(0),f=function(e){return Object(m.jsx)("div",{className:"is-size-3 has-text-centered",style:{display:"inline-block",width:"1.33em"},children:e||"\ud83d\udeab"},e)},O=function(e){var t=e.ballots,n=e.onRemove;return Object(m.jsx)("div",{className:"columns is-multiline",children:t.map((function(e,t){return Object(m.jsx)("div",{className:"column m-0",children:Object(m.jsx)("div",{className:"box p-3",children:Object(m.jsx)("div",{className:"level",children:Object(m.jsxs)("div",{className:"level-left",children:[Object(m.jsx)("span",{className:"tag",children:e.id}),e.votes.map(f),!!n&&Object(m.jsx)("button",{className:"delete",title:"Remove this ballot from the election",onClick:function(){return n(e.id)}})]})})})},e.id)}))})},x=function(e){var t=e.result,n=Object(m.jsxs)(m.Fragment,{children:["After ",Object(m.jsx)("strong",{children:t.stages.length-1})," instant run-off",t.stages.length-1===1?"":"s"]});return t.winner?Object(m.jsxs)("article",{className:"message is-success",children:[Object(m.jsx)("div",{className:"message-header",children:Object(m.jsx)("p",{children:"We have a winner!"})}),Object(m.jsxs)("div",{className:"message-body",children:[n,", this election goes to ",f(t.winner.candidate),"with ",t.winner.voteCount," votes (",t.winner.votePercentage.toFixed(2),"% of all votes).",t.winner.fromBehind&&Object(m.jsx)("strong",{className:"ml-2",children:"This candidate came from behind!"})]})]}):Object(m.jsxs)("article",{className:"message is-danger",children:[Object(m.jsx)("div",{className:"message-header",children:Object(m.jsx)("p",{children:"Undecided"})}),Object(m.jsxs)("div",{className:"message-body",children:[n,", this election is undecided. Nobody got >50% of the vote!"]})]})},v=function(e){var t=e.leaders;return Object(m.jsxs)("table",{className:"table is-striped is-bordered has-text-centered",children:[Object(m.jsx)("thead",{children:Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Place"}),Object(m.jsx)("th",{children:"Candidate"}),Object(m.jsx)("th",{children:"Votes"}),Object(m.jsx)("th",{children:"%"})]})}),Object(m.jsx)("tbody",{children:t.map((function(e,t){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:t+1}),Object(m.jsx)("td",{children:f(e.candidate)}),Object(m.jsx)("td",{children:e.voteCount}),Object(m.jsx)("td",{children:e.votePercentage.toFixed(1)})]},t)}))})]})},g=function(e){var t=e.children;return Object(m.jsx)("article",{className:"message is-info",children:Object(m.jsxs)("div",{className:"message-body",children:[Object(m.jsx)("span",{className:"icon",role:"img","aria-label":"info",children:"\u2139\ufe0f"}),t]})})};function p(){var e="\ud83d\udc38,\ud83d\udc30,\ud83d\udc19,\ud83d\udc35,\ud83d\udc3c,\ud83e\udd8a,\ud83d\udc34,\ud83d\udc2e,\ud83d\udc36,\ud83d\udc2d".split(","),t=a.a.useState(Object.fromEntries(e.map((function(e,t){return[e,t<=2]})))),n=Object(o.a)(t,2),s=n[0],c=n[1],r=e.filter((function(e){return s[e]})),d=a.a.useState(2),j=Object(o.a)(d,2),b=j[0],p=j[1],N=a.a.useState(void 0),w=Object(o.a)(N,2),C=w[0],k=w[1],y=a.a.useState(0),S=Object(o.a)(y,2),V=S[0],P=S[1];return Object(m.jsxs)("div",{className:"container is-fluid mt-5",children:[Object(m.jsx)("a",{href:"https://forms.gle/4m8ih2JKVVZCKtq96",target:"_blank",className:"button is-info is-pulled-right",children:Object(m.jsxs)("span",{className:"icon-text",children:[Object(m.jsx)("span",{className:"icon mr-1",children:"\ud83d\udc4d"}),"Give me feedback",Object(m.jsx)("span",{className:"icon ml-1",children:"\ud83d\udc4e"})]})}),Object(m.jsx)("h1",{className:"title",children:"Ranked Choice Voting"}),Object(m.jsxs)("div",{className:"content",children:["Experiment with this simulator to better understand Ranked Choice Voting (RCV) and instant run-off elections for single-winner races."," ",Object(m.jsxs)("a",{href:"https://www.fairvote.org/how_rcv_works",target:"_blank",rel:"noreferrer",children:["More information",Object(m.jsx)("span",{className:"icon",role:"img","aria-label":"external link",children:"\u2197"})]})]}),Object(m.jsxs)("div",{className:"box",children:[Object(m.jsxs)("div",{className:"level",children:[Object(m.jsxs)("div",{children:[Object(m.jsx)("strong",{children:"# of Choices on ballot"}),Object(m.jsx)("br",{}),Object(m.jsx)("input",{className:"mr-2",type:"range",min:"1",max:"3",value:b,onChange:function(e){return p(parseInt(e.target.value,10))}}),b]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("strong",{children:"Available Candidates"}),Object(m.jsx)("div",{className:"is-flex",children:e.map((function(e){return Object(m.jsxs)("label",{className:"checkbox has-text-centered",children:[Object(m.jsx)("input",{type:"checkbox",checked:s[e],onChange:function(t){return c(Object(l.a)(Object(l.a)({},s),{},Object(i.a)({},e,!s[e])))}}),Object(m.jsx)("div",{children:f(e)})]},e)}))})]}),Object(m.jsx)("button",{className:"button is-primary",onClick:function(){var e=function(e,t,n){for(var s,a=0;a<n;)if(a++,console.log("try #"+a),t(s=e()))return s;return s}((function(){return u(h(b,200,r),10)}),(function(e){return!!e.winner&&e.winner.fromBehind}),20);k(e),P(e.stages.length-1)},children:"Generate random ballots"})]}),1===b&&Object(m.jsxs)(g,{children:["Traditional elections allow voters only a single choice."," ",Object(m.jsx)("strong",{children:"Enable 2 choices or more for a more interesting instant run-off election."})]}),r.length<3&&Object(m.jsxs)(g,{children:["In traditional elections, it often feels like only 2 candidates matter."," ",Object(m.jsx)("strong",{children:"Select at least 3 candidates for a more interesting instant run-off election"})]})]}),!!C&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(x,{result:C}),Object(m.jsx)("div",{className:"tabs is-toggle",children:Object(m.jsx)("ul",{children:C.stages.map((function(e,t){return Object(m.jsx)("li",{className:V===t?"is-active":"",children:Object(m.jsxs)("a",{onClick:function(){return P(t)},children:[0===t?"Original results":"Instant Run-off #".concat(t),t===C.stages.length-1?" (Final)":""]})},t)}))})}),[C.stages[V]].filter((function(e){return!!e})).map((function(e,t){return Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"mb-5",children:["Ballots considered VALID at this stage = ",e.ballots.length," ","out of ",C.stages[0].ballots.length]}),Object(m.jsx)(v,{leaders:e.leaders}),!!e.losers.length&&Object(m.jsxs)("div",{className:"mb-5",children:["Candidates eliminated from previous steps ="," ",e.losers.map(f)]}),Object(m.jsx)(O,{ballots:e.ballots})]},t)}))]})]})}var N=document.getElementById("root");r.a.render(Object(m.jsx)(s.StrictMode,{children:Object(m.jsx)(p,{})}),N)}},[[15,1,2]]]);
//# sourceMappingURL=main.59b63faa.chunk.js.map