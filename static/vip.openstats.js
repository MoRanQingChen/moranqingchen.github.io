!function(n){function t(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return n[e].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=n,t.c=r,t.p="",t(0)}([function(n,t,r){function e(n){j.push(n),o()}function o(){if(j.length>0){var n=j.pop();n.f_vip=x,i(n)}j.length>0&&setTimeout(function(){o()},200)}function i(n){var t={};for(var r in n)t[r]=n[r];try{var e=decodeURIComponent(h("aid")),o=h("ptag")||h("PTAG")||h("adtag")||h("ADTAG")||"";!o&&e&&e.match(/\$12:[^$]*/g)&&(o=e.match(/\$12:[^$]*/g)[0].slice(4));var i="",u="",f="-",l="";a()&&(f=p("main_login")||"qq","wx"==f?(i=p("openid"),u=p("appid")):"qq"==f&&(i=c())),location.href.split("?")[1]&&(l=decodeURIComponent(location.href.split("?")[1]).replace(/\$/g,"|||"));var s="//btrace.qq.com/kvcollect";if(t&&t.bossid?(s+="?BossId="+t.bossid+"&Pwd="+t.bosspwd,t.bossid=null,t.bosspwd=null):t&&t.f_hottag?(s+="?BossId=3753&Pwd=1449912345&f_hottag="+t.f_hottag.replace(/\$/g,"|||")+"&f_event="+t.f_event,t.f_hottag=null,t.f_event=null):s+="?BossId=3754&Pwd=598288292",t&&"object"==typeof t)for(var r in t)t[r]&&(s+="&"+r+"="+encodeURIComponent(t[r]));s+="&f_url="+encodeURIComponent(w)+"&f_dm="+b+"&f_url_param="+encodeURIComponent(l)+"&f_pagetag="+(encodeURIComponent(o)||"")+"&f_logintype="+f+"&f_uid="+i+"&f_appid="+u+"&f_platform="+encodeURIComponent(d())+"&_dc="+Math.random();var v=new Image(1,1);v.src=s}catch(y){}}function u(n){$.ajax({dataType:"jsonp",url:"//pay.video.qq.com/fcgi-bin/payvip?otype=json&getannual=1",data:{uin:c(),t:0,g_tk:s(),getqqvip:"qq"==p("main_login")?1:0},CSRF:!0,jsonp:"callback",jsonpCallback:"jsonp100",success:function(t){return t&&t.result&&0==t.result.code?void n(t.vip):n(0)},error:function(t){n(0)}})}function a(){var n=p("main_login")||"qq";return"wx"==n||"none"!=n&&c()>1e4}function c(){var n=p("skey")||p("lskey");if(!n)return 0;var t=parseInt(p("uin").replace(/^o0*/g,""),10);return(!t||t<=1e4)&&(t=parseInt(p("luin").replace(/^o0*/g,""),10),!t||t<=1e4)?0:t}function f(){var n=$.trim(p("skey"));return n||$.trim(p("lskey"))}function l(n){for(var t=0,r=n.length,e=5381;t<r;++t)e+=(e<<5)+n.charAt(t).charCodeAt();return 2147483647&e}function s(){var n=f(),t=n?l(n):"";return t}function p(n){var t=new RegExp("(^| )"+n+"=([^;]*)(;|$)"),r=document.cookie.match(t);return r?unescape(r[2]):""}function h(n,t){t=t||location.href;var r,e=new RegExp("[?&#]"+n+"=([^&#]+)","gi"),o=t.match(e);return o&&o.length>0?(r=o[o.length-1].split("="),r&&r.length>1?v(r[1]):""):""}function v(n){return n.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;")}function d(){var n,t,r="other";return _.indexOf("iPhone")>=0||_.indexOf("iPad")>=0?n="ios":_.indexOf("Android")>=0&&(n="android"),n?(_.indexOf("QQLiveBrowser")>=0||_.indexOf("QQLiveHDBrowser")>=0?t="app":_.indexOf("MicroMessenger")>=0?t="wx":/QQ\/\d{1,}\.\d{1,}/.test(_)?t="qq":/(Chrome|Safari|QQBrowser)/.test(_)&&(t="browser"),t?m[n][t.toUpperCase()]:"other"):r}var y=r(1),g=r(5),m={ios:{APP:"ios.app",WX:"ios.wx",QQ:"ios.qq",BROWSER:"ios.browser"},android:{APP:"android.app",WX:"android.wx",QQ:"android.qq",BROWSER:"android.browser"},other:"other"};window.HLWSTATE=window.HLWSTATE||{};var b=location.host,w=location.pathname,_=navigator.userAgent,x=0,j=[];HLWSTATE.pgvMain=function(n){n&&(n.virtualDomain&&(b=n.virtualDomain),n.virtualURL&&(w=n.virtualURL)),i()},HLWSTATE.clickStat=function(n){var t="",r="click";n&&("string"==typeof n?t=n:(n.virtualDomain&&(b=n.virtualDomain),n.virtualURL&&(w=n.virtualURL),n.event&&(r=n.event),t=n.hottag),i({f_hottag:t,f_event:r}))},HLWSTATE.report=function(n,t){t?(n.f_vip=x,i(n)):e(n)},HLWSTATE.autoBoss=function(){$("[data-report], .vip_report").each(function(){var n=$(this),t=n.data("report");t&&t.f_hottag?"click"===t.f_event?!function(t){n.on("click",function(){t&&t.f_hottag&&"0"!==$(this).attr("click")&&(t.f_vip=x,i(t))})}(t):"expose"===t.f_event&&(!function(t){n.off("expose").on("expose",function(){e(t),n.off("expose")})}(t),"0"!==n.attr("auto-expose")&&!function(n){y(n,{recalc:!0},g.debounce(function(){$(n).trigger("expose")},1e3))}(this)):n.removeAttr("data-report").removeClass("vip_report"),n.removeClass("vip_report")})},u(function(n){x=n})},function(n,t,r){"use strict";function e(n,t){function r(r){var l,s,p=!r||r===document.body;p&&!g?l=a(n):p||g||(s=r.getBoundingClientRect().height);var v=!1,b=!1,w=function(o,i){if(!e.once||!b){var u;if(p){if(l=g||!l.height?a(n):l,!l.height)return;var c=l.top-m,f=l.bottom;e.offset&&(c-=e.offset,f+=e.offset),u=d?o+i>c&&o<f:o+i>c}else if(!p){var h=n.getBoundingClientRect();if(!h.height)return;var w=s||r.getBoundingClientRect().height,c=h.top-m;e.offset&&(c-=e.offset),u=d?c>-h.height&&c<w:c<w}var _=v;if(!u)return void(v=!1);v=!0,(y&&!_||!y)&&(b=!0,t&&t())}},_=h.on("scroll",w);return p?o():(c(r,"scroll",w),w(i(),u())),function(){_(),p||f(r,"scroll",w)}}var e={},p=arguments;"object"==s.type(t)&&(e=t,t=p[2]);var d=l(e,"visible",!0),y=l(e,"enter",!1),g=l(e,"recalc",!1),m=e.offsetTop||0,b=v(n);if(s.some(b.parents,function(n){return document.body===n}))return r(b.scrollParent);var w,_=setTimeout(function(){w=r(v(n).scrollParent)});return function(){clearTimeout(_),w&&w()}}function o(){if(y.throttle){if(g)return;g=!0,setTimeout(function(){g=!1,h.emit("scroll",i(),u())},y.throttle)}else h.emit("scroll",i(),u())}function i(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}function u(){return"BackCompat"==document.compatMode?document.body.clientHeight:document.documentElement.clientHeight}function a(n){var t=n.getBoundingClientRect();return{top:t.top+i(),bottom:t.bottom+i(),height:t.bottom-t.top}}function c(n,t,r){d?n.attachEvent("on"+t,r):n.addEventListener(t,r)}function f(n,t,r){d?n.detachEvent("on"+t,r):n.removeEventListener(t,r)}function l(n,t,r){return n.hasOwnProperty(t)?!!n[t]:r}var s=r(2),p=r(3),h=new p,v=r(4),d=!document.addEventListener,y={};c(window,"scroll",o),c(window,"resize",o),e.set=function(n,t){return y[n]=t,e},e.message=h,h.on("update",o),n.exports=e;var g},function(n,t){"use strict";function r(n,t){return n&&n.hasOwnProperty&&n.hasOwnProperty(t)}function e(){var n=this;return function(){setTimeout.apply(n,arguments)}}var o=void 0,i={escape:function(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;"):""},type:function(n){if(null===n)return"null";if(n===o)return"undefined";var t=/\[object (\w+)\]/.exec(Object.prototype.toString.call(n));return t?t[1].toLowerCase():""},keys:function(n){var t=[];return n?Object.keys?Object.keys(n):(this.objEach(n,function(n){t.push(n)}),t):t},bind:function(n,t){return n.bind?n.bind(t):function(){return n.apply(t,arguments)}},extend:function(n){if("object"!=this.type(n)&&"function"!=this.type(n))return n;for(var t,e,o=1,i=arguments.length;o<i;o++){t=arguments[o];for(e in t)r(t,e)&&(n[e]=t[e])}return n},trim:function(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/gm,"")},indexOf:function(n,t){if(n.indexOf)return n.indexOf(t);var r=-1;return i.some(n,function(n,e){if(n===t)return r=e,!0}),r},forEach:function(n,t){if(n.forEach)return n.forEach(t);for(var r=n.length,e=0;e<r;e++)t(n[e],e);return n},some:function(n,t){if(n.some)return n.some(t);for(var r=n.length,e=!1,o=0;o<r;o++)if(t(n[o],o)){e=!0;break}return e},map:function(n,t){if(n.map)return n.map(t);for(var r=n.length,e=[],o=0;o<r;o++)e.push(t(n[o],o));return e},objEach:function(n,t){if(n)for(var e in n)if(r(n,e)&&t(e,n[e])===!1)break},reduce:function(n,t){if("function"!=i.type(t))throw new TypeError("Array.prototype.reduce callback must be a function");var r=n.length;if(0===r&&2===arguments.length)throw new TypeError("reduce of empty array with no initial value");var e,o=0;if(arguments.length>=3)e=arguments[2];else for(;;){if(o in n){e=n[o++];break}if(++o>=r)throw new TypeError("reduceRight of empty array with no initial value")}for(;o<r;o++)e=t(e,n[o],o,n);return e},filter:function(n,t,r){if(n.filter)return n.filter(t);for(var e=n.length,o=[],i=0;i<e;i++){var u=n[i];t.call(r,u,i,n)&&o.push(u)}return o},nextTick:e(),lock:function(n){var t;return function(){if(!t){t=!0;var r=[].slice.call(arguments,0);r.unshift(function(){t=!1}),n.apply(this,r)}}},queue:function(n,t){function r(){var n=e.shift();if(!n)return void(o=t);o--;var u=n[0],a=n[1],c=n[2];c.unshift(function(){o++,r.apply(this,arguments)}),i.nextTick(function(){return u.apply(a,c)})}t=t||1;var e=[],o=t;return function(){if(e.push([n,this,[].slice.call(arguments,0)]),o)return r()}},delegator:function(n){var t,r=[];return function(e){return t?r.push(e):(t=!0,void n.call(this,function(){t=!1;var n=this,o=arguments;e&&e.apply(n,o),i.forEach(r,function(t){t&&t.apply(n,o)})}))}},once:function(n){var t,r=arguments;return function(){if(!t&&n)return t=!0,n.apply(r.length>=2?r[1]:null,arguments)}},verCompare:function(n,t){if(n===t)return 0;n=n.split("."),t=t.split(".");for(var r=n.length>=t.length?n.length:t.length,e=0,o=0;r--;){var i=Number(n[e]||0),u=Number(t[e++]||0);if(u>i)return 1;if(u<i)return-1}return o}};n.exports=i},function(n,t,r){"use strict";function e(){this._evtObjs={},this._outdatedMsgs={}}function o(){}var i=r(2);e.prototype.on=function(n,t,r){this._evtObjs[n]||(this._evtObjs[n]=[]),this._evtObjs[n].push({handler:t,once:r});var e=this;return function(){e.off(n,t)}},e.prototype.wait=function(n,t){return this._outdatedMsgs[n]?(t.apply(null,this._outdatedMsgs[n]),o):this.on(n,t,!0)},e.prototype.off=function(n,t){var r,e=this;return r=n?[n]:i.keys(this._evtObjs),i.forEach(r,function(n){if(t){var r=e._evtObjs[n]||[],o=[];i.forEach(r,function(n){n.handler!==t&&o.push(n)}),e._evtObjs[n]=o}else e._evtObjs[n]=[]}),this},e.prototype.emit=function(n){var t=Array.prototype.slice.call(arguments,1);this._outdatedMsgs[n]=t;var r=this._evtObjs[n]||[];i.forEach(r,function(n){n.once&&n.called||(n.called=!0,n.handler&&n.handler.apply(null,t))})},e.prototype.emitAsync=function(){var n=arguments,t=this;setTimeout(function(){t.emit.apply(t,n)},0)},e.prototype.assign=function(n){var t=this;i.forEach(["on","off","wait","emit","emitAsync"],function(r){var e=t[r];n[r]=function(){return e.apply(t,arguments)}})},(new e).assign(e),n.exports=e},function(n,t){"use strict";function r(n,t){t=t||[];var e=n.parentNode;return e?(t.push(e),e===document.body?t:r(e,t)):t}function e(n){if(!n)return"";var t;if(window.getComputedStyle)try{t=window.getComputedStyle(n)}catch(r){}else n.currentStyle&&(t=n.currentStyle);return t?t["overflow-y"]||t.overflow:""}function o(n){return/(auto|scroll)/.test(e(n))}n.exports=function(n){for(var t=r(n),e=document.body,i=0;i<t.length;i++){var u=t[i];if(u===document.body||o(u)){e=u;break}}return{parents:t,scrollParent:e}}},function(n,t,r){var e,o;(function(){function r(n){function t(t,r,e,o,i,u){for(;i>=0&&i<u;i+=n){var a=o?o[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,o,i){e=j(e,i,4);var u=!R(r)&&x.keys(r),a=(u||r).length,c=n>0?0:a-1;return arguments.length<3&&(o=r[u?u[c]:c],c+=n),t(r,e,o,u,c,a)}}function i(n){return function(t,r,e){r=O(r,e);for(var o=S(t),i=n>0?0:o-1;i>=0&&i<o;i+=n)if(r(t[i],i,t))return i;return-1}}function u(n,t,r){return function(e,o,i){var u=0,a=S(e);if("number"==typeof i)n>0?u=i>=0?i:Math.max(i+a,u):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,o),e[i]===o?i:-1;if(o!==o)return i=t(v.call(e,u,a),x.isNaN),i>=0?i+u:-1;for(i=n>0?u:a-1;i>=0&&i<a;i+=n)if(e[i]===o)return i;return-1}}function a(n,t){var r=M.length,e=n.constructor,o=x.isFunction(e)&&e.prototype||s,i="constructor";for(x.has(n,i)&&!x.contains(t,i)&&t.push(i);r--;)i=M[r],i in n&&n[i]!==o[i]&&!x.contains(t,i)&&t.push(i)}var c=this,f=c._,l=Array.prototype,s=Object.prototype,p=Function.prototype,h=l.push,v=l.slice,d=s.toString,y=s.hasOwnProperty,g=Array.isArray,m=Object.keys,b=p.bind,w=Object.create,_=function(){},x=function(n){return n instanceof x?n:this instanceof x?void(this._wrapped=n):new x(n)};"undefined"!=typeof n&&n.exports&&(t=n.exports=x),t._=x,x.VERSION="1.8.3";var j=function(n,t,r){if(void 0===t)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,o){return n.call(t,r,e,o)};case 4:return function(r,e,o,i){return n.call(t,r,e,o,i)}}return function(){return n.apply(t,arguments)}},O=function(n,t,r){return null==n?x.identity:x.isFunction(n)?j(n,t,r):x.isObject(n)?x.matcher(n):x.property(n)};x.iteratee=function(n,t){return O(n,t,1/0)};var k=function(n,t){return function(r){var e=arguments.length;if(e<2||null==r)return r;for(var o=1;o<e;o++)for(var i=arguments[o],u=n(i),a=u.length,c=0;c<a;c++){var f=u[c];t&&void 0!==r[f]||(r[f]=i[f])}return r}},A=function(n){if(!x.isObject(n))return{};if(w)return w(n);_.prototype=n;var t=new _;return _.prototype=null,t},E=function(n){return function(t){return null==t?void 0:t[n]}},T=Math.pow(2,53)-1,S=E("length"),R=function(n){var t=S(n);return"number"==typeof t&&t>=0&&t<=T};x.each=x.forEach=function(n,t,r){t=j(t,r);var e,o;if(R(n))for(e=0,o=n.length;e<o;e++)t(n[e],e,n);else{var i=x.keys(n);for(e=0,o=i.length;e<o;e++)t(n[i[e]],i[e],n)}return n},x.map=x.collect=function(n,t,r){t=O(t,r);for(var e=!R(n)&&x.keys(n),o=(e||n).length,i=Array(o),u=0;u<o;u++){var a=e?e[u]:u;i[u]=t(n[a],a,n)}return i},x.reduce=x.foldl=x.inject=r(1),x.reduceRight=x.foldr=r(-1),x.find=x.detect=function(n,t,r){var e;if(e=R(n)?x.findIndex(n,t,r):x.findKey(n,t,r),void 0!==e&&e!==-1)return n[e]},x.filter=x.select=function(n,t,r){var e=[];return t=O(t,r),x.each(n,function(n,r,o){t(n,r,o)&&e.push(n)}),e},x.reject=function(n,t,r){return x.filter(n,x.negate(O(t)),r)},x.every=x.all=function(n,t,r){t=O(t,r);for(var e=!R(n)&&x.keys(n),o=(e||n).length,i=0;i<o;i++){var u=e?e[i]:i;if(!t(n[u],u,n))return!1}return!0},x.some=x.any=function(n,t,r){t=O(t,r);for(var e=!R(n)&&x.keys(n),o=(e||n).length,i=0;i<o;i++){var u=e?e[i]:i;if(t(n[u],u,n))return!0}return!1},x.contains=x.includes=x.include=function(n,t,r,e){return R(n)||(n=x.values(n)),("number"!=typeof r||e)&&(r=0),x.indexOf(n,t,r)>=0},x.invoke=function(n,t){var r=v.call(arguments,2),e=x.isFunction(t);return x.map(n,function(n){var o=e?t:n[t];return null==o?o:o.apply(n,r)})},x.pluck=function(n,t){return x.map(n,x.property(t))},x.where=function(n,t){return x.filter(n,x.matcher(t))},x.findWhere=function(n,t){return x.find(n,x.matcher(t))},x.max=function(n,t,r){var e,o,i=-(1/0),u=-(1/0);if(null==t&&null!=n){n=R(n)?n:x.values(n);for(var a=0,c=n.length;a<c;a++)e=n[a],e>i&&(i=e)}else t=O(t,r),x.each(n,function(n,r,e){o=t(n,r,e),(o>u||o===-(1/0)&&i===-(1/0))&&(i=n,u=o)});return i},x.min=function(n,t,r){var e,o,i=1/0,u=1/0;if(null==t&&null!=n){n=R(n)?n:x.values(n);for(var a=0,c=n.length;a<c;a++)e=n[a],e<i&&(i=e)}else t=O(t,r),x.each(n,function(n,r,e){o=t(n,r,e),(o<u||o===1/0&&i===1/0)&&(i=n,u=o)});return i},x.shuffle=function(n){for(var t,r=R(n)?n:x.values(n),e=r.length,o=Array(e),i=0;i<e;i++)t=x.random(0,i),t!==i&&(o[i]=o[t]),o[t]=r[i];return o},x.sample=function(n,t,r){return null==t||r?(R(n)||(n=x.values(n)),n[x.random(n.length-1)]):x.shuffle(n).slice(0,Math.max(0,t))},x.sortBy=function(n,t,r){return t=O(t,r),x.pluck(x.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(r<e||void 0===e)return-1}return n.index-t.index}),"value")};var q=function(n){return function(t,r,e){var o={};return r=O(r,e),x.each(t,function(e,i){var u=r(e,i,t);n(o,e,u)}),o}};x.groupBy=q(function(n,t,r){x.has(n,r)?n[r].push(t):n[r]=[t]}),x.indexBy=q(function(n,t,r){n[r]=t}),x.countBy=q(function(n,t,r){x.has(n,r)?n[r]++:n[r]=1}),x.toArray=function(n){return n?x.isArray(n)?v.call(n):R(n)?x.map(n,x.identity):x.values(n):[]},x.size=function(n){return null==n?0:R(n)?n.length:x.keys(n).length},x.partition=function(n,t,r){t=O(t,r);var e=[],o=[];return x.each(n,function(n,r,i){(t(n,r,i)?e:o).push(n)}),[e,o]},x.first=x.head=x.take=function(n,t,r){if(null!=n)return null==t||r?n[0]:x.initial(n,n.length-t)},x.initial=function(n,t,r){return v.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},x.last=function(n,t,r){if(null!=n)return null==t||r?n[n.length-1]:x.rest(n,Math.max(0,n.length-t))},x.rest=x.tail=x.drop=function(n,t,r){return v.call(n,null==t||r?1:t)},x.compact=function(n){return x.filter(n,x.identity)};var I=function(n,t,r,e){for(var o=[],i=0,u=e||0,a=S(n);u<a;u++){var c=n[u];if(R(c)&&(x.isArray(c)||x.isArguments(c))){t||(c=I(c,t,r));var f=0,l=c.length;for(o.length+=l;f<l;)o[i++]=c[f++]}else r||(o[i++]=c)}return o};x.flatten=function(n,t){return I(n,t,!1)},x.without=function(n){return x.difference(n,v.call(arguments,1))},x.uniq=x.unique=function(n,t,r,e){x.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=O(r,e));for(var o=[],i=[],u=0,a=S(n);u<a;u++){var c=n[u],f=r?r(c,u,n):c;t?(u&&i===f||o.push(c),i=f):r?x.contains(i,f)||(i.push(f),o.push(c)):x.contains(o,c)||o.push(c)}return o},x.union=function(){return x.uniq(I(arguments,!0,!0))},x.intersection=function(n){for(var t=[],r=arguments.length,e=0,o=S(n);e<o;e++){var i=n[e];if(!x.contains(t,i)){for(var u=1;u<r&&x.contains(arguments[u],i);u++);u===r&&t.push(i)}}return t},x.difference=function(n){var t=I(arguments,!0,!0,1);return x.filter(n,function(n){return!x.contains(t,n)})},x.zip=function(){return x.unzip(arguments)},x.unzip=function(n){for(var t=n&&x.max(n,S).length||0,r=Array(t),e=0;e<t;e++)r[e]=x.pluck(n,e);return r},x.object=function(n,t){for(var r={},e=0,o=S(n);e<o;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},x.findIndex=i(1),x.findLastIndex=i(-1),x.sortedIndex=function(n,t,r,e){r=O(r,e,1);for(var o=r(t),i=0,u=S(n);i<u;){var a=Math.floor((i+u)/2);r(n[a])<o?i=a+1:u=a}return i},x.indexOf=u(1,x.findIndex,x.sortedIndex),x.lastIndexOf=u(-1,x.findLastIndex),x.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),o=Array(e),i=0;i<e;i++,n+=r)o[i]=n;return o};var C=function(n,t,r,e,o){if(!(e instanceof t))return n.apply(r,o);var i=A(n.prototype),u=n.apply(i,o);return x.isObject(u)?u:i};x.bind=function(n,t){if(b&&n.bind===b)return b.apply(n,v.call(arguments,1));if(!x.isFunction(n))throw new TypeError("Bind must be called on a function");var r=v.call(arguments,2),e=function(){return C(n,e,t,this,r.concat(v.call(arguments)))};return e},x.partial=function(n){var t=v.call(arguments,1),r=function(){for(var e=0,o=t.length,i=Array(o),u=0;u<o;u++)i[u]=t[u]===x?arguments[e++]:t[u];for(;e<arguments.length;)i.push(arguments[e++]);return C(n,r,this,this,i)};return r},x.bindAll=function(n){var t,r,e=arguments.length;if(e<=1)throw new Error("bindAll must be passed function names");for(t=1;t<e;t++)r=arguments[t],n[r]=x.bind(n[r],n);return n},x.memoize=function(n,t){var r=function(e){var o=r.cache,i=""+(t?t.apply(this,arguments):e);return x.has(o,i)||(o[i]=n.apply(this,arguments)),o[i]};return r.cache={},r},x.delay=function(n,t){var r=v.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},x.defer=x.partial(x.delay,x,1),x.throttle=function(n,t,r){var e,o,i,u=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:x.now(),u=null,i=n.apply(e,o),u||(e=o=null)};return function(){var f=x.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,o=arguments,l<=0||l>t?(u&&(clearTimeout(u),u=null),a=f,i=n.apply(e,o),u||(e=o=null)):u||r.trailing===!1||(u=setTimeout(c,l)),i}},x.debounce=function(n,t,r){var e,o,i,u,a,c=function(){var f=x.now()-u;f<t&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,o),e||(i=o=null)))};return function(){i=this,o=arguments,u=x.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,o),i=o=null),a}},x.wrap=function(n,t){return x.partial(t,n)},x.negate=function(n){return function(){return!n.apply(this,arguments)}},x.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},x.after=function(n,t){return function(){if(--n<1)return t.apply(this,arguments)}},x.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),n<=1&&(t=null),r}},x.once=x.partial(x.before,2);var B=!{toString:null}.propertyIsEnumerable("toString"),M=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];x.keys=function(n){if(!x.isObject(n))return[];if(m)return m(n);var t=[];for(var r in n)x.has(n,r)&&t.push(r);return B&&a(n,t),t},x.allKeys=function(n){if(!x.isObject(n))return[];var t=[];for(var r in n)t.push(r);return B&&a(n,t),t},x.values=function(n){for(var t=x.keys(n),r=t.length,e=Array(r),o=0;o<r;o++)e[o]=n[t[o]];return e},x.mapObject=function(n,t,r){t=O(t,r);for(var e,o=x.keys(n),i=o.length,u={},a=0;a<i;a++)e=o[a],u[e]=t(n[e],e,n);return u},x.pairs=function(n){for(var t=x.keys(n),r=t.length,e=Array(r),o=0;o<r;o++)e[o]=[t[o],n[t[o]]];return e},x.invert=function(n){for(var t={},r=x.keys(n),e=0,o=r.length;e<o;e++)t[n[r[e]]]=r[e];return t},x.functions=x.methods=function(n){var t=[];for(var r in n)x.isFunction(n[r])&&t.push(r);return t.sort()},x.extend=k(x.allKeys),x.extendOwn=x.assign=k(x.keys),x.findKey=function(n,t,r){t=O(t,r);for(var e,o=x.keys(n),i=0,u=o.length;i<u;i++)if(e=o[i],t(n[e],e,n))return e},x.pick=function(n,t,r){var e,o,i={},u=n;if(null==u)return i;x.isFunction(t)?(o=x.allKeys(u),e=j(t,r)):(o=I(arguments,!1,!1,1),e=function(n,t,r){return t in r},u=Object(u));for(var a=0,c=o.length;a<c;a++){var f=o[a],l=u[f];e(l,f,u)&&(i[f]=l)}return i},x.omit=function(n,t,r){if(x.isFunction(t))t=x.negate(t);else{var e=x.map(I(arguments,!1,!1,1),String);t=function(n,t){return!x.contains(e,t)}}return x.pick(n,t,r)},x.defaults=k(x.allKeys,!0),x.create=function(n,t){var r=A(n);return t&&x.extendOwn(r,t),r},x.clone=function(n){return x.isObject(n)?x.isArray(n)?n.slice():x.extend({},n):n},x.tap=function(n,t){return t(n),n},x.isMatch=function(n,t){var r=x.keys(t),e=r.length;if(null==n)return!e;for(var o=Object(n),i=0;i<e;i++){var u=r[i];if(t[u]!==o[u]||!(u in o))return!1}return!0};var L=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof x&&(n=n._wrapped),t instanceof x&&(t=t._wrapped);var o=d.call(n);if(o!==d.call(t))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===o;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var u=n.constructor,a=t.constructor;if(u!==a&&!(x.isFunction(u)&&u instanceof u&&x.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!L(n[c],t[c],r,e))return!1}else{var f,l=x.keys(n);if(c=l.length,x.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!x.has(t,f)||!L(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};x.isEqual=function(n,t){return L(n,t)},x.isEmpty=function(n){return null==n||(R(n)&&(x.isArray(n)||x.isString(n)||x.isArguments(n))?0===n.length:0===x.keys(n).length)},x.isElement=function(n){return!(!n||1!==n.nodeType)},x.isArray=g||function(n){return"[object Array]"===d.call(n)},x.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},x.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){x["is"+n]=function(t){return d.call(t)==="[object "+n+"]"}}),x.isArguments(arguments)||(x.isArguments=function(n){return x.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(x.isFunction=function(n){return"function"==typeof n||!1}),x.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},x.isNaN=function(n){return x.isNumber(n)&&n!==+n},x.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===d.call(n)},x.isNull=function(n){return null===n},x.isUndefined=function(n){return void 0===n},x.has=function(n,t){return null!=n&&y.call(n,t)},x.noConflict=function(){return c._=f,this},x.identity=function(n){return n},x.constant=function(n){return function(){return n}},x.noop=function(){},x.property=E,x.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},x.matcher=x.matches=function(n){return n=x.extendOwn({},n),function(t){return x.isMatch(t,n)}},x.times=function(n,t,r){var e=Array(Math.max(0,n));t=j(t,r,1);for(var o=0;o<n;o++)e[o]=t(o);return e},x.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},x.now=Date.now||function(){return(new Date).getTime()};var P={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},F=x.invert(P),$=function(n){var t=function(t){return n[t]},r="(?:"+x.keys(n).join("|")+")",e=RegExp(r),o=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(o,t):n}};x.escape=$(P),x.unescape=$(F),x.result=function(n,t,r){var e=null==n?void 0:n[t];return void 0===e&&(e=r),x.isFunction(e)?e.call(n):e};var N=0;x.uniqueId=function(n){var t=++N+"";return n?n+t:t},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var U=/(.)^/,Q={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},W=/\\|'|\r|\n|\u2028|\u2029/g,D=function(n){return"\\"+Q[n]};x.template=function(n,t,r){!t&&r&&(t=r),t=x.defaults({},t,x.templateSettings);var e=RegExp([(t.escape||U).source,(t.interpolate||U).source,(t.evaluate||U).source].join("|")+"|$","g"),o=0,i="__p+='";n.replace(e,function(t,r,e,u,a){return i+=n.slice(o,a).replace(W,D),o=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":u&&(i+="';\n"+u+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var u=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return u.call(this,n,x)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},x.chain=function(n){var t=x(n);return t._chain=!0,t};var H=function(n,t){return n._chain?x(t).chain():t};x.mixin=function(n){x.each(x.functions(n),function(t){var r=x[t]=n[t];x.prototype[t]=function(){var n=[this._wrapped];return h.apply(n,arguments),H(this,r.apply(x,n))}})},x.mixin(x),x.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=l[n];x.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],H(this,r)}}),x.each(["concat","join","slice"],function(n){var t=l[n];x.prototype[n]=function(){return H(this,t.apply(this._wrapped,arguments))}}),x.prototype.value=function(){return this._wrapped},x.prototype.valueOf=x.prototype.toJSON=x.prototype.value,x.prototype.toString=function(){return""+this._wrapped},e=[],o=function(){return x}.apply(t,e),!(void 0!==o&&(n.exports=o))}).call(this)}]);