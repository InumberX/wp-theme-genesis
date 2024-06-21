(()=>{var a={xs:360,sm:576,md:768,lg:992,xl:1200,xxl:1400},l={xxs:!1,xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1},E=t=>{Object.keys(l).forEach(n=>{n===t?l[n]=!0:l[n]=!1})},v=t=>{t.matches&&s.setCurrentBreakPoint("xxs")},M=t=>{t.matches&&s.setCurrentBreakPoint("xs")},J=t=>{t.matches&&s.setCurrentBreakPoint("sm")},B=t=>{t.matches&&s.setCurrentBreakPoint("md")},T=t=>{t.matches&&s.setCurrentBreakPoint("lg")},q=t=>{t.matches&&s.setCurrentBreakPoint("xl")},H=t=>{t.matches&&s.setCurrentBreakPoint("xxl")},C=()=>{let t=window.matchMedia(`screen and (max-width: ${a.xs-1}px)`),n=window.matchMedia(`screen and (min-width: ${a.xs}px) and (max-width: ${a.sm-1}px)`),o=window.matchMedia(`screen and (min-width: ${a.sm}px) and (max-width: ${a.md-1}px)`),e=window.matchMedia(`screen and (min-width: ${a.md}px) and (max-width: ${a.xl-1}px)`),i=window.matchMedia(`screen and (min-width: ${a.lg}px) and (max-width: ${a.xl-1}px)`),r=window.matchMedia(`screen and (min-width: ${a.xl}px) and (max-width: ${a.xxl-1}px)`),c=window.matchMedia(`screen and (min-width: ${a.xxl}px)`);t.addEventListener("change",s.checkBreakPointXxs),n.addEventListener("change",s.checkBreakPointXs),o.addEventListener("change",s.checkBreakPointSm),e.addEventListener("change",s.checkBreakPointMd),i.addEventListener("change",s.checkBreakPointLg),r.addEventListener("change",s.checkBreakPointXl),c.addEventListener("change",s.checkBreakPointXxl),s.checkBreakPointXxs(t),s.checkBreakPointXs(n),s.checkBreakPointSm(o),s.checkBreakPointMd(e),s.checkBreakPointLg(i),s.checkBreakPointXl(r),s.checkBreakPointXxl(c)},s={setCurrentBreakPoint:E,checkBreakPointXxs:v,checkBreakPointXs:M,checkBreakPointSm:J,checkBreakPointMd:B,checkBreakPointLg:T,checkBreakPointXl:q,checkBreakPointXxl:H,init:C};var b={object:(t,n,o)=>{if(!t||!n)return;let e=t[n];Object.defineProperty(t,n,{get:()=>e,set:i=>{let r=e;e=i,o(r,i)},configurable:!0})}};var h="",x=()=>{b.object(l,"xxs",(t,n)=>{let o=document.querySelector('meta[name="viewport"]');o&&o.setAttribute("content",n?`width=${a.xs}`:h)})},O=()=>{let t=document.querySelector('meta[name="viewport"]');t&&(h=t.getAttribute("content"),t.setAttribute("content",l.xxs?`width=${a.xs}`:h),x())},k={act:x,init:O};var A="Scrolling";var w=t=>{setTimeout(function(){$("body").removeClass(A)},t)},g=(t,n)=>{let o=t==="#"?$("body"):$(t),e=n??300;if(!o)return;let i=o.offset().top,r=$(".JsHeader"),c=r?r.outerHeight(!0):0,d=i-24-c;$("body").addClass(A),setTimeout(()=>{$("html, body").animate({scrollTop:d},e),w(e)},10)},I=()=>{$(document).off("click.smoothScroll").on("click.smoothScroll",'a[href^="#"]:not(.JsNotSmoothScroll)',function(){let t=$(this);return g(t.attr("href")),!1})},S={init:I,act:g,scrollStop:w};var f={main:300};var L="data-accordion-open",u="data-accordion-animating",p=t=>t.getAttribute("aria-expanded")==="true",X=t=>{let n=t.closest(".JsAccordion, .JsAccordionParent");if(n.getAttribute(u)==="true")return;n.setAttribute(u,"true");let e=n.querySelector(".JsAccordion__contents, .JsAccordionParent__contents");t.setAttribute("aria-expanded","true"),e.removeAttribute("hidden"),e.style.willChange="max-block-size",e.style.overflow="clip";let{blockSize:i}=window.getComputedStyle(e),r=[{maxBlockSize:"0"},{maxBlockSize:i}],c=()=>{requestAnimationFrame(()=>{e.style.willChange="",e.style.overflow="",n.removeAttribute(u)})};requestAnimationFrame(()=>{e.animate(r,{duration:f.main,easing:"ease-in-out"}).addEventListener("finish",c)});let d=n.querySelector(".JsAccordion__value");d&&d.setAttribute("value","true")},N=t=>{let n=t.closest(".JsAccordion, .JsAccordionParent");if(n.getAttribute(u)==="true")return;n.setAttribute(u,"true");let e=n.querySelector(".JsAccordion__contents, .JsAccordionParent__contents");t.setAttribute("aria-expanded","false"),e.style.willChange="max-block-size",e.style.overflow="clip";let{blockSize:i}=window.getComputedStyle(e),r=[{maxBlockSize:i},{maxBlockSize:"0"}],c=()=>{requestAnimationFrame(()=>{e.style.willChange="",e.style.overflow="",e.setAttribute("hidden","until-found"),n.removeAttribute(u)})};requestAnimationFrame(()=>{e.animate(r,{duration:f.main,easing:"ease-in-out"}).addEventListener("finish",c)});let d=n.querySelector(".JsAccordion__value");d&&d.setAttribute("value","")},V=()=>{let t=document.querySelectorAll(".JsAccordion, .JsAccordionParent");for(let n=0,o=t.length;n<o;n=n+1){let e=t[n],i=e.querySelector(".JsAccordion__button, .JsAccordionParent__button"),r=e.querySelector(".JsAccordion__contents, .JsAccordionParent__contents"),c=p(i);e.setAttribute(L,String(c)),i.setAttribute("aria-expanded","true"),r.removeAttribute("hidden")}},z=()=>{let t=document.querySelectorAll(".JsAccordion, .JsAccordionParent");for(let n=0,o=t.length;n<o;n=n+1){let e=t[n],i=e.querySelector(".JsAccordion__button, .JsAccordionParent__button"),r=e.querySelector(".JsAccordion__contents, .JsAccordionParent__contents"),c=p(i);i.setAttribute("aria-expanded",String(c)),c||r.setAttribute("hidden","until-found"),e.removeAttribute(L)}},Q=()=>{$(document).off("click.accordion").on("click.accordion",".JsAccordion__button, .JsAccordionParent__button",function(){let o=this;return p(o)?N(o):X(o),!1}),$(window).off("beforeprint.accordion").on("beforeprint.accordion",function(){V()}),$(window).off("afterprint.accordion").on("afterprint.accordion",function(){z()});let t=document.querySelectorAll(".JsAccordion");for(let o=0,e=t.length;o<e;o=o+1){let i=t[o],r=i.querySelector(".JsAccordion__button"),c=i.querySelector(".JsAccordion__contents"),d=c.getAttribute("id");r.setAttribute("role","button"),r.setAttribute("aria-expanded",String(!c.hasAttribute("hidden"))),r.setAttribute("aria-controls",d)}let n=document.querySelectorAll(".JsAccordionParent");for(let o=0,e=n.length;o<e;o=o+1){let i=n[o],r=i.querySelector(".JsAccordionParent__button"),c=i.querySelector(".JsAccordionParent__contents"),d=c.getAttribute("id");r.setAttribute("role","button"),r.setAttribute("aria-expanded",String(!c.hasAttribute("hidden"))),r.setAttribute("aria-controls",d)}},_={init:Q};var P=(t,n,o)=>{for(let e=0,i=t.length;e<i;e=e+1){let r=t[e],c=e===o;r.setAttribute("aria-selected",String(c)),r.setAttribute("tabindex",c?"0":"-1")}for(let e=0,i=n.length;e<i;e=e+1){let r=n[e];if(e!==o){r.setAttribute("hidden","until-found"),r.removeAttribute("tabindex");continue}r.removeAttribute("hidden"),r.setAttribute("tabindex","0")}},W=()=>{$(document).off("click.tab").on("click.tab",".JsTab__button",function(){let o=this.closest(".JsTab"),e=o.querySelectorAll(".JsTab__button"),i=o.querySelectorAll(".JsTab__contents");return P(e,i,$(e).index($(this))),!1});let t=document.querySelectorAll(".JsTab");for(let n=0,o=t.length;n<o;n=n+1){let e=t[n],i=e.querySelectorAll(".JsTab__button"),r=e.querySelectorAll(".JsTab__contents");for(let c=0,d=i.length;c<d;c=c+1){let m=i[c];m.setAttribute("aria-selected","false"),m.setAttribute("aria-controls",r[c].id),m.setAttribute("tabindex","-1")}P(i,r,0)}},y={init:W};window.addEventListener("DOMContentLoaded",()=>{s.init(),k.init(),S.init(),_.init(),y.init()});})();