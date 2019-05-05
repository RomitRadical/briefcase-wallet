(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{386:function(e,t,a){e.exports=a(839)},391:function(e,t,a){},406:function(e,t){},412:function(e,t){},431:function(e,t){},433:function(e,t){},657:function(e,t){},80:function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return c}),a.d(t,"b",function(){return o});var n=a(104),r=a.n(n),l=new(a(284))({restURL:"https://trest.bitcoin.com/v2/"});function c(){var e=l.Mnemonic.generate(128);return e?(localStorage.setItem("wallet",e),e):(console.log("Network Error: New wallet could not be created"),!1)}function o(t){if(!t)return console.log("Error: No seed detected"),!1;var a=new e(t),n=r.a.crypto.Hash.sha256(a),l=r.a.crypto.BN.fromBuffer(n);return new r.a.PrivateKey(l).toAddress().toString()}r.a.Networks.defaultNetwork=r.a.Networks.testnet}).call(this,a(4).Buffer)},839:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(6),c=a.n(l),o=(a(391),a(392),a(31)),i=a(32),s=a(35),u=a(33),m=a(60),d=a(34),p=a(368),b=a(88),f=a(840),h=a(841),g=a(842),y=a(854),v=a(843),E=a(844),x=a(845),w=a(353),k=a(123),C=a(354);k.b.add(C.a);var O=function(e){return r.a.createElement("div",null,r.a.createElement(f.a,{style:j.container,light:!0},r.a.createElement(h.a,{style:j.headerText,className:"mr-auto"},r.a.createElement(w.a,{icon:"briefcase"})," Briefcase"),r.a.createElement(g.a,{style:j.hamburger,onClick:e.onClick,className:"mr-1"}),r.a.createElement(y.a,{isOpen:e.isOpen,navbar:!0},r.a.createElement(v.a,{navbar:!0},r.a.createElement(E.a,null,r.a.createElement(x.a,{style:j.text,href:"/"},"Wallet")),r.a.createElement(E.a,null,r.a.createElement(x.a,{style:j.text,href:"/settings"},"Settings")),r.a.createElement(E.a,null,r.a.createElement(x.a,{style:j.text,href:"/about"},"About"))))))},j={container:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#0492CE"},headerText:{color:"white",fontFamily:"Righteous"},text:{color:"white"},hamburger:{backgroundColor:"white"}},S=a(22),B=a.n(S),N=a(101),I=a(80),T=a(853),A=a(68),R=new(a(284))({restURL:"https://trest.bitcoin.com/v2/"});T.a.config({placement:"bottomRight"});var M=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).getPrice=function(){var e=localStorage.getItem("currency");e||(e="INR"),Object(N.a)(B.a.mark(function t(){var n;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,R.Price.current(e);case 3:if(n=t.sent){t.next=7;break}return console.log("Network Error: Price cannot be fetched"),t.abrupt("return",!1);case 7:return a.setState({price:n}),t.abrupt("return",!0);case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}},t,null,[[0,11]])}))()},a.getBalance=function(e){Object(N.a)(B.a.mark(function t(){var n,r;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,R.Address.details(e);case 3:n=t.sent,r=a.state.price,a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}))()},a.checkNewTx=function(){Object(N.a)(B.a.mark(function e(){var t,n,r;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=Object(I.b)(localStorage.getItem("wallet")),e.next=4,R.Address.details(t);case 4:n=e.sent,r=a.state.price,n.balance+n.unconfirmedBalance>a.state.bal?(console.log("New payment received"),a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r})):n.balance+n.unconfirmedBalance<a.state.bal?(console.log("Payment sent"),a.setState({bal:Number(n.balance+n.unconfirmedBalance),fiatBal:(n.balance+n.unconfirmedBalance)*r})):a.setState({fiatBal:(n.balance+n.unconfirmedBalance)*r}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}))()},a.newPayment=function(){var e=a.state.receivedAmount,t=r.a.createElement(A.a,{type:"primary",size:"small",onClick:a.openTxDetails},"Details"),n={message:"New Payment Received",description:"Amount: ".concat(e),duration:0,btn:t};T.a.info(n)},a.openTxDetails=function(){console.log("Hi")},a.state={bal:0,fiatBal:0,newBal:0,symbol:"\u20bf",fiatSymbol:"\u20b9",price:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=Object(I.b)(localStorage.getItem("wallet"));this.getPrice(),this.getBalance(e)}},{key:"componentDidMount",value:function(){setInterval(this.getPrice,1e4),setInterval(this.checkNewTx,1e4)}},{key:"render",value:function(){var e=this.state,t=e.bal,a=e.fiatBal,n=e.symbol,l=e.fiatSymbol;return r.a.createElement("div",{style:F.container},r.a.createElement("div",{style:F.box},r.a.createElement("h2",{style:F.text,className:"display-4"},l,a.toFixed(2)),r.a.createElement("h3",{style:F.text},n,t.toFixed(8))))}}]),t}(n.Component),F={container:{backgroundColor:"#0492CE",textAlign:"center",justifyContent:"center",fontFamily:"Questrial",borderBottomLeftRadius:"50px",borderBottomRightRadius:"50px"},text:{color:"white",margin:"0px"},mainText:{color:"white",fontFamily:"Questrial",marginBottom:"0"},box:{marginTop:"40px",marginBottom:"20px"}},P=a(852),W=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:D.container},r.a.createElement(P.a,{horizontal:!0},"History"))}}]),t}(n.Component),D={container:{flex:1,color:"black",alignItems:"center",maxWidth:"500px",margin:"0 auto"}},z=a(850),H=a(16),L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onAmountEnter=function(e){a.setState({address:e})},a.onAmountEnter=function(e){a.setState({amount:e})},a.onSend=function(){console.log("Send")},a.state={address:"",amount:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("fiat-symbol");return e||(e="\u20b9"),r.a.createElement("div",{style:Q.container},r.a.createElement(P.a,{horizontal:!0},"Send"),r.a.createElement(z.a,{size:"large",style:Q.input,prefix:r.a.createElement(H.a,{type:"user"}),placeholder:"Enter Bitcoin Cash Address",onChange:this.onAddressEnter}),r.a.createElement(z.a,{size:"large",style:Q.input,prefix:e,placeholder:"Enter Amount to Send",onChange:this.onAmountEnter}),r.a.createElement(A.a,{size:"large",style:Q.button,shape:"round",onClick:this.onSend},"Send"))}}]),t}(n.Component),Q={container:{flex:1,textAlign:"center",color:"black",maxWidth:"500px",margin:"0 auto"},input:{marginTop:"10px"},button:{backgroundColor:"#0492CE",color:"white",marginTop:"15px",padding:"0 50px"}},U=a(362),q=a.n(U),J=a(371),K=a(363),V=J.a.Share,$=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).copyAddress=function(){var e=a.state.addr;function t(){return(t=Object(N.a)(B.a.mark(function t(){return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,V.share({title:"Share",text:e,dialogTitle:"Share your bitcoin cash address"});case 3:t.next=7;break;case 5:t.prev=5,t.t0=t.catch(0);case 7:case"end":return t.stop()}},t,null,[[0,5]])}))).apply(this,arguments)}!function(){t.apply(this,arguments)}(),console.log("Address copied")},a.renderContent=function(){var e=a.state.addr;return K.isMobile?r.a.createElement("div",null,r.a.createElement(A.a,{style:Y.button,shape:"round",onClick:a.copyAddress},"Share")):r.a.createElement("div",null,r.a.createElement(A.a,{style:Y.button,shape:"round",onClick:function(){return navigator.clipboard.writeText(e)}},"Copy"))},a.state={addr:"",bal:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=Object(I.b)(localStorage.getItem("wallet"));this.setState({addr:e})}},{key:"render",value:function(){var e=this.state.addr;return r.a.createElement("div",{style:Y.container},r.a.createElement(P.a,{horizontal:!0},"Receive"),r.a.createElement("div",null,r.a.createElement("h4",null,"Your Bitcoin Cash Address:"),r.a.createElement(q.a,{style:Y.qr,value:e}),r.a.createElement("div",null,e),r.a.createElement("div",null,this.renderContent())))}}]),t}(n.Component),Y={container:{flex:1,textAlign:"center",color:"black",maxWidth:"500px",margin:"0 auto"},button:{backgroundColor:"#0492CE",color:"white",marginTop:"10px",padding:"0 50px"},qr:{marginTop:"5px"}},G=a(364),X=a.n(G),Z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState({value:e})},a.toggleNavbar=a.toggleNavbar.bind(Object(m.a)(a)),a.state={collapsed:!1,value:0,addr:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return r.a.createElement("div",{style:_.container},r.a.createElement(M,null),r.a.createElement("div",null,r.a.createElement(X.a,{index:1,resistance:!0,enableMouseEvents:!0},r.a.createElement("div",{style:Object.assign({},_.tabs,_.tab1)},r.a.createElement(L,null)),r.a.createElement("div",{style:Object.assign({},_.tabs,_.tab2)},r.a.createElement(W,null)),r.a.createElement("div",{style:Object.assign({},_.tabs,_.tab3)},r.a.createElement($,null)))))}}]),t}(n.Component),_={container:{display:"flex",textAlign:"center",fontFamily:"Questrial",flexDirection:"column",backgroundColor:"white",color:"black"},tabs:{padding:15,minHeight:100,color:"#fff"},tab1:{backgroundColor:"white"},tab2:{backgroundColor:"white",overflow:""},tab3:{backgroundColor:"white",overflow:"hidden"}},ee=a(846),te=a(847),ae=a(849),ne=a(848),re=a(851),le=ae.a.Option,ce=z.a.TextArea,oe=[{currency:"Indian Rupee",ticker:"INR",symbol:"\u20b9"},{currency:"United States Dollar",ticker:"USD",symbol:"$"}],ie=["Fiat","Bitcoin Cash"],se=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).fiatCurrencyToogle=function(e){a.setState({fiatCurrency:e}),localStorage.setItem("fiat-currency",e)},a.displayCurrencyToogle=function(e){a.setState({displayCurrency:e}),localStorage.setItem("display-currency",e)},a.displayPriceToggle=function(e){e?localStorage.setItem("display-price","On"):localStorage.setItem("display-price","Off")},a.importModalToggle=function(e){a.setState({importModal:e})},a.state={fiatCurrency:"",displayCurrency:"",importModal:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=localStorage.getItem("fiat-currency"),t=localStorage.getItem("display-currency");e?t||(t="Fiat"):e="INR",this.setState({fiatCurrency:e,displayCurrency:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.fiatCurrency,n=t.displayCurrency;return r.a.createElement("div",null,r.a.createElement(ee.a,null,r.a.createElement(te.a,null,r.a.createElement("div",{style:ue.container},r.a.createElement("div",null,"Fiat Currency"),r.a.createElement("div",{style:ue.spacer}),r.a.createElement("div",null,r.a.createElement(ae.a,{defaultValue:a,style:{width:80},onChange:this.fiatCurrencyToogle},oe.map(function(e){return r.a.createElement(le,{key:e.ticker,value:e.ticker},e.ticker)}))))),r.a.createElement(te.a,null,r.a.createElement("div",{style:ue.container},r.a.createElement("div",null,"Display Currency"),r.a.createElement("div",{style:ue.spacer}),r.a.createElement(ae.a,{defaultValue:n,style:{width:120},onChange:this.displayCurrencyToogle},ie.map(function(e){return r.a.createElement(le,{key:e,value:e},e)})))),r.a.createElement(te.a,null,r.a.createElement("div",{style:ue.container},r.a.createElement("div",null,"Display Price"),r.a.createElement("div",{style:ue.spacer}),r.a.createElement("div",null,r.a.createElement(ne.a,{defaultChecked:!0,onChange:this.displayPriceToggle})))),r.a.createElement(te.a,null,r.a.createElement("div",{style:ue.container},r.a.createElement("div",null,"Import/Recover Wallet"),r.a.createElement("div",{style:ue.spacer}),r.a.createElement("div",null,r.a.createElement(H.a,{type:"right",onClick:function(){return e.importModalToggle(!0)}}),r.a.createElement(re.a,{title:"Import/Recover Wallet",centered:!0,visible:this.state.importModal,onOk:function(){return e.importModalToggle(!1)},onCancel:function(){return e.importModalToggle(!1)}},r.a.createElement(ce,{placeholder:"Enter the seed to recover your wallet",autosize:{minRows:3,maxRows:6}}))))),r.a.createElement(te.a,null,"Advanced")))}}]),t}(n.Component),ue={container:{display:"flex",flex:1,alignItems:"center",justifyContent:"center"},spacer:{flex:1}},me=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:de.container},r.a.createElement("h3",null,"About Bitcoin Cash:"),r.a.createElement("p",null,"Bitcoin Cash is a peer-to-peer electronic cash system. It's a permissionless, decentralized cryptocurrency that requires no trusted third parties and no central bank."),r.a.createElement("hr",{className:"my-2"}),r.a.createElement("h3",null,"Key Features:"),r.a.createElement("ol",null,r.a.createElement("li",null,"Fast"),r.a.createElement("li",null,"Reliable"),r.a.createElement("li",null,"Low Fees"),r.a.createElement("li",null,"Simple"),r.a.createElement("li",null,"Stable"),r.a.createElement("li",null,"Secure")),r.a.createElement("hr",{className:"my-2"}))}}]),t}(n.Component),de={container:{flex:1,padding:"10px"}},pe=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).toggleNavbar=a.toggleNavbar.bind(Object(m.a)(a)),a.state={collapsed:!1,value:0,addr:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){if(!localStorage.getItem("wallet")){console.log("No wallet detected");var e=Object(I.a)();console.log("New wallet created: "+e)}var t=Object(I.b)(localStorage.getItem("wallet"));this.setState({addr:t})}},{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement("div",{style:be.container},r.a.createElement(O,{isOpen:this.state.collapsed,onClick:this.toggleNavbar}),r.a.createElement(b.a,{path:"/",exact:!0,component:Z}),r.a.createElement(b.a,{path:"/settings/",component:se}),r.a.createElement(b.a,{path:"/about/",component:me})))}}]),t}(n.Component),be={container:{display:"flex",fontFamily:"Questrial",flexDirection:"column",backgroundColor:"white",color:"black",minHeight:"100vh"},spacer:{flex:"1"},tabs:{padding:15,minHeight:100,color:"#fff"},tab1:{backgroundColor:"white"},tab2:{backgroundColor:"white",overflow:""},tab3:{backgroundColor:"white",overflow:"hidden"}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(837),a(838);c.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[386,1,2]]]);
//# sourceMappingURL=main.cf3e4089.chunk.js.map