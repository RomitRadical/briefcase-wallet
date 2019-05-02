(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{384:function(e,t,a){e.exports=a(837)},389:function(e,t,a){},404:function(e,t){},410:function(e,t){},429:function(e,t){},431:function(e,t){},655:function(e,t){},80:function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return c}),a.d(t,"b",function(){return o});var n=a(103),r=a.n(n),l=new(a(283))({restURL:"https://trest.bitcoin.com/v2/"});function c(){var e=l.Mnemonic.generate(128);return e?(localStorage.setItem("wallet",e),e):(console.log("Network Error: New wallet could not be created"),!1)}function o(t){if(!t)return console.log("Error: No seed detected"),!1;var a=new e(t),n=r.a.crypto.Hash.sha256(a),l=r.a.crypto.BN.fromBuffer(n);return new r.a.PrivateKey(l).toAddress().toString()}r.a.Networks.defaultNetwork=r.a.Networks.testnet}).call(this,a(3).Buffer)},837:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(6),c=a.n(l),o=(a(389),a(390),a(30)),i=a(31),s=a(34),u=a(32),m=a(59),d=a(33),b=a(367),p=a(88),f=a(838),h=a(839),g=a(840),y=a(851),v=a(841),E=a(842),w=a(843),x=a(352),k=a(122),C=a(353);k.b.add(C.a);var O=function(e){return r.a.createElement("div",null,r.a.createElement(f.a,{style:j.container,light:!0},r.a.createElement(h.a,{style:j.headerText,className:"mr-auto"},r.a.createElement(x.a,{icon:"briefcase"})," Briefcase"),r.a.createElement(g.a,{style:j.hamburger,onClick:e.onClick,className:"mr-1"}),r.a.createElement(y.a,{isOpen:e.isOpen,navbar:!0},r.a.createElement(v.a,{navbar:!0},r.a.createElement(E.a,null,r.a.createElement(w.a,{style:j.text,href:"/"},"Wallet")),r.a.createElement(E.a,null,r.a.createElement(w.a,{style:j.text,href:"/settings"},"Settings")),r.a.createElement(E.a,null,r.a.createElement(w.a,{style:j.text,href:"/about"},"About"))))))},j={container:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#0492CE"},headerText:{color:"white",fontFamily:"Righteous"},text:{color:"white"},hamburger:{backgroundColor:"white"}},S=a(25),B=a.n(S),N=a(171),I=a(80),T=new(a(283))({restURL:"https://trest.bitcoin.com/v2/"}),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).getPrice=function(){var e=localStorage.getItem("currency");e||(e="INR"),Object(N.a)(B.a.mark(function t(){var n;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T.Price.current(e);case 3:if(n=t.sent){t.next=7;break}return console.log("Network Error: Price cannot be fetched"),t.abrupt("return",!1);case 7:return a.setState({price:n}),t.abrupt("return",!0);case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}},t,null,[[0,11]])}))()},a.getBalance=function(e){Object(N.a)(B.a.mark(function t(){var n,r;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T.Address.details(e);case 3:n=t.sent,r=a.state.price,a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}))()},a.checkNewTx=function(){Object(N.a)(B.a.mark(function e(){var t,n,r;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=Object(I.b)(localStorage.getItem("wallet")),e.next=4,T.Address.details(t);case 4:n=e.sent,r=a.state.price,n.balance+n.unconfirmedBalance>a.state.bal?(console.log("New payment received"),a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r})):n.balance+n.unconfirmedBalance<a.state.bal&&(console.log("Payment sent"),a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}))()},a.state={bal:0,fiatBal:0,newBal:0,symbol:"\u20bf",fiatSymbol:"\u20b9",price:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=Object(I.b)(localStorage.getItem("wallet"));this.getPrice(),this.getBalance(e)}},{key:"componentDidMount",value:function(){setInterval(this.getPrice,1e4),setInterval(this.checkNewTx,1e3)}},{key:"render",value:function(){var e=this.state,t=e.bal,a=e.fiatBal,n=e.symbol,l=e.fiatSymbol;return r.a.createElement("div",{style:R.container},r.a.createElement("div",{style:R.box},r.a.createElement("h2",{style:R.text,className:"display-4"},l,a.toFixed(2)),r.a.createElement("h3",{style:R.text},n,t.toFixed(8))))}}]),t}(n.Component),R={container:{backgroundColor:"#0492CE",textAlign:"center",justifyContent:"center",fontFamily:"Questrial",borderBottomLeftRadius:"50px",borderBottomRightRadius:"50px"},text:{color:"white",margin:"0px"},mainText:{color:"white",fontFamily:"Questrial",marginBottom:"0"},box:{marginTop:"40px",marginBottom:"20px"}},M=a(850),F=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:W.container},r.a.createElement(M.a,{horizontal:!0},"History"))}}]),t}(n.Component),W={container:{flex:1,color:"black",alignItems:"center",maxWidth:"500px",margin:"0 auto"}},P=a(848),D=a(16),z=a(67),H=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onAmountEnter=function(e){a.setState({address:e})},a.onAmountEnter=function(e){a.setState({amount:e})},a.state={address:"",amount:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("currency");return e||(e="\u20b9"),r.a.createElement("div",{style:L.container},r.a.createElement(M.a,{horizontal:!0},"Send"),r.a.createElement(P.a,{style:L.input,prefix:r.a.createElement(D.a,{type:"user"}),placeholder:"Enter Bitcoin Cash Address",onChange:this.onAddressEnter}),r.a.createElement(P.a,{style:L.input,prefix:e,placeholder:"Enter Amount to Send",onChange:this.onAmountEnter}),r.a.createElement(z.a,{style:L.button,shape:"round"},"Send"))}}]),t}(n.Component),L={container:{flex:1,textAlign:"center",color:"black",maxWidth:"500px",margin:"0 auto"},input:{marginTop:"10px"},button:{backgroundColor:"#0492CE",color:"white",marginTop:"15px",padding:"0 50px"}},Q=a(361),U=a.n(Q),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).copyAddress=function(){navigator.clipboard.writeText(a.state.addr),console.log("Address copied")},a.state={addr:"",bal:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=Object(I.b)(localStorage.getItem("wallet"));this.setState({addr:e})}},{key:"render",value:function(){var e=this.state.addr;return r.a.createElement("div",{style:J.container},r.a.createElement(M.a,{horizontal:!0},"Receive"),r.a.createElement("div",null,r.a.createElement("h4",null,"Your Bitcoin Cash Address:"),r.a.createElement(U.a,{style:J.qr,value:e}),r.a.createElement("div",null,e),r.a.createElement("div",null,r.a.createElement(z.a,{style:J.button,shape:"round",onClick:this.copyAddress},"Copy"))))}}]),t}(n.Component),J={container:{flex:1,textAlign:"center",color:"black",maxWidth:"500px",margin:"0 auto"},button:{backgroundColor:"#0492CE",color:"white",marginTop:"10px",padding:"0 50px"},qr:{marginTop:"5px"}},K=a(362),V=a.n(K),$=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState({value:e})},a.toggleNavbar=a.toggleNavbar.bind(Object(m.a)(a)),a.state={collapsed:!1,value:0,addr:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return r.a.createElement("div",{style:Y.container},r.a.createElement(A,null),r.a.createElement("div",null,r.a.createElement(V.a,{index:1,resistance:!0,enableMouseEvents:!0},r.a.createElement("div",{style:Object.assign({},Y.tabs,Y.tab1)},r.a.createElement(H,null)),r.a.createElement("div",{style:Object.assign({},Y.tabs,Y.tab2)},r.a.createElement(F,null)),r.a.createElement("div",{style:Object.assign({},Y.tabs,Y.tab3)},r.a.createElement(q,null)))))}}]),t}(n.Component),Y={container:{display:"flex",textAlign:"center",fontFamily:"Questrial",flexDirection:"column",backgroundColor:"white",color:"black"},tabs:{padding:15,minHeight:100,color:"#fff"},tab1:{backgroundColor:"white"},tab2:{backgroundColor:"white",overflow:""},tab3:{backgroundColor:"white",overflow:"hidden"}},G=a(844),X=a(845),Z=a(847),_=a(846),ee=a(849),te=Z.a.Option,ae=P.a.TextArea,ne=[{currency:"Indian Rupee",ticker:"INR",symbol:"\u20b9"},{currency:"United States Dollar",ticker:"USD",symbol:"$"}],re=["Fiat","Bitcoin Cash"],le=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).fiatCurrencyToogle=function(e){a.setState({fiatCurrency:e}),localStorage.setItem("fiat-currency",e)},a.displayCurrencyToogle=function(e){a.setState({displayCurrency:e}),localStorage.setItem("display-currency",e)},a.displayPriceToggle=function(e){e?localStorage.setItem("display-price","On"):localStorage.setItem("display-price","Off")},a.importModalToggle=function(e){a.setState({importModal:e})},a.state={fiatCurrency:"",displayCurrency:"",importModal:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=localStorage.getItem("fiat-currency"),t=localStorage.getItem("display-currency");e?t||(t="Fiat"):e="INR",this.setState({fiatCurrency:e,displayCurrency:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.fiatCurrency,n=t.displayCurrency;return r.a.createElement("div",null,r.a.createElement(G.a,null,r.a.createElement(X.a,null,r.a.createElement("div",{style:ce.container},r.a.createElement("div",null,"Fiat Currency"),r.a.createElement("div",{style:ce.spacer}),r.a.createElement("div",null,r.a.createElement(Z.a,{defaultValue:a,style:{width:80},onChange:this.fiatCurrencyToogle},ne.map(function(e){return r.a.createElement(te,{key:e.ticker,value:e.ticker},e.ticker)}))))),r.a.createElement(X.a,null,r.a.createElement("div",{style:ce.container},r.a.createElement("div",null,"Display Currency"),r.a.createElement("div",{style:ce.spacer}),r.a.createElement(Z.a,{defaultValue:n,style:{width:120},onChange:this.displayCurrencyToogle},re.map(function(e){return r.a.createElement(te,{key:e,value:e},e)})))),r.a.createElement(X.a,null,r.a.createElement("div",{style:ce.container},r.a.createElement("div",null,"Display Price"),r.a.createElement("div",{style:ce.spacer}),r.a.createElement("div",null,r.a.createElement(_.a,{defaultChecked:!0,onChange:this.displayPriceToggle})))),r.a.createElement(X.a,null,r.a.createElement("div",{style:ce.container},r.a.createElement("div",null,"Import/Recover Wallet"),r.a.createElement("div",{style:ce.spacer}),r.a.createElement("div",null,r.a.createElement(D.a,{type:"right",onClick:function(){return e.importModalToggle(!0)}}),r.a.createElement(ee.a,{title:"Import/Recover Wallet",centered:!0,visible:this.state.importModal,onOk:function(){return e.importModalToggle(!1)},onCancel:function(){return e.importModalToggle(!1)}},r.a.createElement(ae,{placeholder:"Enter the seed to recover your wallet",autosize:{minRows:3,maxRows:6}}))))),r.a.createElement(X.a,null,"Advanced")))}}]),t}(n.Component),ce={container:{display:"flex",flex:1,alignItems:"center",justifyContent:"center"},spacer:{flex:1}},oe=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:ie.container},r.a.createElement("h3",null,"About Bitcoin Cash:"),r.a.createElement("p",null,"Bitcoin Cash is a peer-to-peer electronic cash system. It's a permissionless, decentralized cryptocurrency that requires no trusted third parties and no central bank."),r.a.createElement("hr",{className:"my-2"}),r.a.createElement("h3",null,"Key Features:"),r.a.createElement("ol",null,r.a.createElement("li",null,"Fast"),r.a.createElement("li",null,"Reliable"),r.a.createElement("li",null,"Low Fees"),r.a.createElement("li",null,"Simple"),r.a.createElement("li",null,"Stable"),r.a.createElement("li",null,"Secure")),r.a.createElement("hr",{className:"my-2"}))}}]),t}(n.Component),ie={container:{flex:1,padding:"10px"}},se=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).toggleNavbar=a.toggleNavbar.bind(Object(m.a)(a)),a.state={collapsed:!1,value:0,addr:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){if(!localStorage.getItem("wallet")){console.log("No wallet detected");var e=Object(I.a)();console.log("New wallet created: "+e)}var t=Object(I.b)(localStorage.getItem("wallet"));this.setState({addr:t})}},{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return r.a.createElement(b.a,null,r.a.createElement("div",{style:ue.container},r.a.createElement(O,{isOpen:this.state.collapsed,onClick:this.toggleNavbar}),r.a.createElement(p.a,{path:"/",exact:!0,component:$}),r.a.createElement(p.a,{path:"/settings/",component:le}),r.a.createElement(p.a,{path:"/about/",component:oe})))}}]),t}(n.Component),ue={container:{display:"flex",fontFamily:"Questrial",flexDirection:"column",backgroundColor:"white",color:"black",minHeight:"100vh"},spacer:{flex:"1"},tabs:{padding:15,minHeight:100,color:"#fff"},tab1:{backgroundColor:"white"},tab2:{backgroundColor:"white",overflow:""},tab3:{backgroundColor:"white",overflow:"hidden"}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(835),a(836);c.a.render(r.a.createElement(se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[384,1,2]]]);
//# sourceMappingURL=main.97b4c846.chunk.js.map