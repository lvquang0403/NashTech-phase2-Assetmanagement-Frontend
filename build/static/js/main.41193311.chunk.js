(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{119:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),c=a.n(s),o=a(8),l=a(2),i=a(13),d=a.n(i),u=a(23),j=a(6),O=a(80),b=a(130),m=a(37),h=a.n(m),x=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="dev"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_ENV.trim()?Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_DEV_URL:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_PROD_URL,a+="/auth/updatePassword",e.next=4,h.a.post(a,{username:t.username,email:t.email,password:t.newPassword}).then((function(e){n=e.data})).catch((function(e){n=null}));case 4:return e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=a(1),f=function(){Object(o.e)();var e=Object(n.useState)({username:localStorage.getItem("username"),email:localStorage.getItem("email"),password:"",newPassword:""}),t=Object(j.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),c=Object(j.a)(s,2),i=c[0],m=c[1],h=Object(n.useState)(!1),f=Object(j.a)(h,2),S=f[0],_=f[1],v=function(){return _(!1)},T=Object(n.useState)(""),g=Object(j.a)(T,2),E=g[0],w=g[1],C=Object(n.useState)(!1),P=Object(j.a)(C,2),R=P[0],N=P[1],D=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(a);case 2:null==(t=e.sent)||""===t.message?(m(!0),w("Your password is incorrect")):"SUCCESS_CHANGE_PASSWORD"===t.message&&(m(!1),_(!1));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){return function(e){""==!e.password&&""==!e.newPassword?N(!0):""!==e.password&&""!==e.newPassword||N(!1)}(a)}),[a]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(O.a,{variant:"default",onClick:function(){return _(!0)},children:"Change password"}),Object(p.jsxs)(b.a,{show:S,onHide:v,children:[Object(p.jsx)(b.a.Header,{closeButton:!0,children:Object(p.jsx)(b.a.Title,{children:Object(p.jsx)("p",{class:"h3 text-danger",children:"Change password"})})}),Object(p.jsx)(b.a.Body,{children:Object(p.jsxs)("form",{className:"flex flex-column mx-auto bg-white p-3",children:[Object(p.jsx)("div",{class:"alert alert-danger my-2 ".concat(i?"":"d-none"),role:"alert",children:E}),Object(p.jsxs)("div",{children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"password",children:"Current password"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{password:e.target.value}))},type:"password",value:a.password,id:"password"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"password",children:"New password"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{newPassword:e.target.value}))},type:"password",value:a.newPassword,id:"newPassword"})]})]})}),Object(p.jsxs)(b.a.Footer,{children:[Object(p.jsx)(O.a,{variant:"secondary",onClick:v,children:"Cancel"}),R?Object(p.jsx)(O.a,{variant:"danger",onClick:function(){return D()},children:"Change password"}):Object(p.jsx)(O.a,{variant:"danger",disabled:!0,children:"Change password"})]})]})]})},S=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="dev"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_ENV.trim()?Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_DEV_URL:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_PROD_URL,a+="/auth/login",e.next=4,h.a.post(a,{username:t.username,password:t.password}).then((function(e){n=e.data})).catch((function(e){n=null}));case 4:return e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=a(128),v=a(125),T=function(){var e=Object(o.e)(),t=Object(n.useState)({username:"",password:""}),a=Object(j.a)(t,2),r=a[0],s=a[1],c=Object(n.useState)(!1),i=Object(j.a)(c,2),O=i[0],b=i[1],m=Object(n.useState)(!1),h=Object(j.a)(m,2),x=h[0],f=h[1],T=function(){var t=Object(u.a)(d.a.mark((function t(){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,S(r);case 2:null==(a=t.sent)?f(!0):"SUCCESS_LOGIN_USER"===a.message&&(localStorage.setItem("jwtToken",a.data.token),localStorage.setItem("username",a.data.username),localStorage.setItem("refreshToken",a.data.refreshToken),localStorage.setItem("email",a.data.email),f(!1),e.push("/home"));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){!function(e){""!==e.username&&""!==e.password?b(!0):""!==e.username&&""!==e.password||b(!1)}(r)}),[r]),Object(p.jsx)("div",{className:"flex text-start d-grid",children:Object(p.jsxs)("div",{className:"flex flex-column mx-auto bg-white p-3 col-4 mt-5",children:[Object(p.jsx)("p",{class:"h3 text-secondary text-center",children:"Log in"}),Object(p.jsxs)(_.a.Group,{className:"mt-3",children:[Object(p.jsx)(_.a.Label,{className:"form-label text-secondary",htmlFor:"username",children:"Username"}),Object(p.jsx)(_.a.Control,{onChange:function(e){s(Object(l.a)(Object(l.a)({},r),{},{username:e.target.value}))},type:"text",value:r.username,id:"username"})]}),Object(p.jsxs)(_.a.Group,{className:"flex flex-column mt-2",children:[Object(p.jsx)(_.a.Label,{className:"form-label text-secondary",htmlFor:"password",children:"Password"}),Object(p.jsx)(_.a.Control,{onChange:function(e){s(Object(l.a)(Object(l.a)({},r),{},{password:e.target.value}))},type:"password",value:r.password,id:"password"})]}),Object(p.jsx)(v.a,{class:"alert alert-danger my-2 ".concat(x?"":"d-none"),role:"alert",children:"Username or password is incorrect. Please try again"}),Object(p.jsx)("div",{className:"d-grid mt-3",children:O?Object(p.jsx)("button",{className:"col-4 offset-4 btn btn-danger",onClick:function(){return T()},children:"Log in"}):Object(p.jsx)("button",{className:"col-4 offset-4 btn btn-danger",disabled:!0,children:"Log in"})})]})})},g=function(){var e=Object(n.useState)({username:"",password:"",repassword:"",email:"",dob:"",firstname:"",lastname:"",phone:"",gender:1}),t=Object(j.a)(e,2),a=t[0],r=t[1];return Object(p.jsx)("div",{children:Object(p.jsxs)("div",{className:"flex flex-column mx-auto bg-white w-25 p-3",children:[Object(p.jsx)("p",{class:"h3 text-g",children:"Register"}),Object(p.jsxs)("div",{children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"username",children:"Username"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{username:e.target.value}))},type:"text",value:a.username,id:"username"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{password:e.target.value}))},type:"password",value:a.password,id:"password"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"password",children:"Re-password"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{repassword:e.target.value}))},type:"password",value:a.repassword,id:"password"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"email",children:"Email"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{email:e.target.value}))},type:"email",value:a.email,id:"email"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"phone",children:"Phone"}),Object(p.jsx)("input",{class:"form-control",onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{phone:e.target.value}))},type:"text",value:a.phone,id:"phone"})]}),Object(p.jsxs)("div",{className:"flex flex-column mt-2",children:[Object(p.jsx)("label",{className:"form-label text-secondary",htmlFor:"gender",children:"Gender"}),Object(p.jsxs)("select",{className:"form-select",value:a.gender,onChange:function(e){return r(Object(l.a)(Object(l.a)({},a),{},{gender:e.target.value}))},children:[Object(p.jsx)("option",{value:"1",children:"Man"}),Object(p.jsx)("option",{value:"0",children:"Women"})]})]}),Object(p.jsx)("div",{className:"mt-3",children:Object(p.jsx)("button",{className:"ms-3 btn btn-danger",children:"Register"})})]})})},E=a(129),w=a(126),C=a(127),P=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="dev"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_ENV.trim()?Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_DEV_URL:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_PROD_URL,a+="/auth/logout",e.next=4,h.a.post(a,{accessToken:t.accessToken,refreshToken:t.refreshToken}).then((function(e){n=e.data})).catch((function(e){n=null}));case 4:return e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(n.useState)(!1),t=Object(j.a)(e,2),a=t[0],r=t[1],s=function(){return r(!1)},c={accessToken:localStorage.getItem("jwtToken"),refreshToken:localStorage.getItem("refreshToken")},l=Object(o.e)(),i=function(){var e=Object(u.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(c);case 2:"SUCCESS_LOGOUT_USER"===e.sent.message&&(localStorage.removeItem("jwtToken"),localStorage.removeItem("refreshToken"),l.push("/login"));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(O.a,{variant:"default",onClick:function(){return r(!0)},children:"Log out"}),Object(p.jsxs)(b.a,{show:a,onHide:s,children:[Object(p.jsx)(b.a.Header,{closeButton:!0,children:Object(p.jsx)(b.a.Title,{children:Object(p.jsx)("p",{class:"h3 text-danger",children:"Are you sure"})})}),Object(p.jsx)(b.a.Body,{children:"Do you want to log out?"}),Object(p.jsxs)(b.a.Footer,{children:[Object(p.jsx)(O.a,{variant:"secondary",onClick:function(){return s()},children:"Cancel"}),Object(p.jsx)(O.a,{variant:"danger",onClick:function(){return i()},children:"Log out"})]})]})]})},N=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(E.a,{bg:"danger",variant:"dark",expand:"lg",children:Object(p.jsxs)(w.a,{children:[Object(p.jsx)(E.a.Brand,{href:"#home",children:"Home"}),Object(p.jsx)(E.a.Toggle,{}),Object(p.jsx)(E.a.Collapse,{className:"justify-content-end",children:Object(p.jsx)(E.a.Text,{children:Object(p.jsxs)(C.a,{className:"fs-5",title:"Nguyen",id:"basic-nav-dropdown",children:[Object(p.jsx)(C.a.Item,{href:"#action/changePass",children:Object(p.jsx)(f,{})}),Object(p.jsx)(C.a.Item,{href:"#action/logout",children:Object(p.jsx)(R,{})})]})})})]})})})},D=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(N,{})})};var A=function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)(o.a,{path:"/login",component:T}),Object(p.jsx)(o.a,{path:"/register",component:g}),Object(p.jsx)(o.a,{path:"/home",component:D})]})},y=a(36);a(118);c.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(y.a,{children:Object(p.jsx)(A,{})})}),document.getElementById("root"))}},[[119,1,2]]]);
//# sourceMappingURL=main.41193311.chunk.js.map