"use strict";var precacheConfig=[["/index.html","2a7503602e22299c33c74898e35fb8bd"],["/static/css/main.60a5c5e2.css","4cc7a320869f32058e3157f8bc084f7b"],["/static/js/main.82f3a65f.js","8b86f90fc4276f6e2eabd43ede6cde0f"],["/static/media/1.bd63d005.jpg","bd63d00550899d17d96eab0e523e191a"],["/static/media/10.d751435c.jpg","d751435c79f8947a09d2247b694c9f38"],["/static/media/11.75105300.jpg","751053009988ada921063b9c976a0231"],["/static/media/12.851d6074.jpg","851d60748c878027e7a52c42c441b138"],["/static/media/13.4f0b2bbd.jpg","4f0b2bbd13d80bb56db798dffb9bf438"],["/static/media/14.707f3ac5.jpg","707f3ac5e9fc103169b34fe0b01f59d3"],["/static/media/15.a3b5eb2f.jpg","a3b5eb2fd4be679210afd738fcf8edb8"],["/static/media/16.ffa5badd.jpg","ffa5badd054f465bf879543954816c29"],["/static/media/2.6fd1361a.jpg","6fd1361a03f7cf3438b3aab6bc409c7e"],["/static/media/3.c88397ea.jpg","c88397eabc61b0cd856c63dba9af15f6"],["/static/media/4.ace3d5b7.jpg","ace3d5b785f01689d46740d26b55d68a"],["/static/media/5.cdb00628.jpg","cdb0062838530082085a0dd3e2f0b1d1"],["/static/media/6.1555904a.jpg","1555904a3ed0f25d93fafb91d409d99e"],["/static/media/7.ed3b6061.jpg","ed3b6061163c390a6c6a9aea559e6d06"],["/static/media/8.be1a90b6.jpg","be1a90b6fc3184f6a923cb3720b92ec4"],["/static/media/9.120c52ed.jpg","120c52ed00e61c10a538b35b498020e4"],["/static/media/logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"],["/static/media/turn-arrow.583ca888.eot","583ca888b447d46759b91bbc312c8337"],["/static/media/turn-arrow.860e608e.woff","860e608ed28f527db5860195ed618985"],["/static/media/turn-arrow.bad2eaf2.ttf","bad2eaf2d783e1bb2ef78f6b7ac05e88"],["/static/media/turn-arrow.e33d265f.svg","e33d265f5a523a9d3598b9f685319c26"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});