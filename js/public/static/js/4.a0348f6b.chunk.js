(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{727:function(e,t){},728:function(e,t){},757:function(e,t,n){},772:function(e,t,n){"use strict";n.r(t);var a,r=n(727),c=n(728),o=n.n(c),i=(n(209),n(143)),s=(n(91),n(36)),u=n(12),l=n(13),d=n(15),m=n(14),p=n(16),f=n(0),h=n.n(f),y=n(25),b=(n(757),n(49)),g=n(23),v=n.n(g),S=Object(y.connect)(function(e){return{userinfo:e.Login_reducer.hks_userInfo}})(a=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).toDetail=function(){var e=n.props.history,t=n.state.orderNumber;e.push("/orderDetail/".concat(t))},n.toOrder=function(){n.props.history.push("/orderManage")},n.state={orderNumber:"",isPaySuccess:"",isLoading:!0},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e,t=this,n=this.props,a=n.location,r=n.userinfo,c=a.search,o=Object(b.c)(c).paymentNumber;o?(e={paymentNumber:o,userID:r.customer.customerID},v()({url:"unifyPay/interface/paymentDetail/query",method:"post",data:e,transformRequest:[function(e){var t="";for(var n in e)t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n])+"&";return t}],headers:{"Content-Type":"application/x-www-form-urlencoded"},source:"pay",noErr:!0}).then(function(e){return e},function(e){return e})).then(function(e){t.setState({isLoading:!1}),0==e.data.code?t.setState({orderNumber:e.data.paymentRequest.originCode,isPaySuccess:!0},function(){}):(t.setState({isPaySuccess:!1}),s.a.error(e.data.msg))}):this.setState({isPaySuccess:!1,isLoading:!1})}},{key:"render",value:function(){var e,t,n=this.state,a=n.isLoading,r=n.isPaySuccess,c=a?h.a.createElement(i.a,{size:"large"}):null;return r?(t="#icon-tijiaochenggong",e=h.a.createElement("div",null,h.a.createElement("h3",null,"\u652f\u4ed8\u6210\u529f\uff01"),h.a.createElement("p",null,"\u8ba2\u5355\u652f\u4ed8\u6210\u529f\uff0c\u5c06\u81ea\u52a8\u8df3\u8f6c\u81f3\u8ba2\u5355\u8be6\u60c5\u3002"),h.a.createElement("p",{className:"link",onClick:this.toDetail},"\u70b9\u51fb\u8fd9\u91cc\u7acb\u5373\u8df3\u8f6c"))):!1===r&&(t="#icon-ic_upload_fail_norma",e=h.a.createElement("div",null,h.a.createElement("h3",null,"\u652f\u4ed8\u5931\u8d25\uff01"),h.a.createElement("p",{className:"link",onClick:this.toOrder},"\u70b9\u51fb\u8fd9\u91cc\u7acb\u5373\u8df3\u8f6c\u5230\u8ba2\u5355\u5217\u8868"))),h.a.createElement("div",{className:"paySuccess container"},h.a.createElement("svg",{className:"icon","aria-hidden":"true"},h.a.createElement("use",{xlinkHref:t})),e,c)}}]),t}(f.Component))||a;n.d(t,"PaySuccess_actions",function(){return r}),n.d(t,"PaySuccess_reducer",function(){return o.a}),n.d(t,"PaySuccess",function(){return S});t.default=S}}]);
//# sourceMappingURL=4.a0348f6b.chunk.js.map