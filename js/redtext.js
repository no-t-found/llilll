!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).Lenis=e()}(this,function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,"symbol"==typeof(n=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var o=i.call(t,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key))?n:String(n),o)}var n}function e(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t},i.apply(this,arguments)}function o(t,e,i){return Math.max(t,Math.min(e,i))}var n=/*#__PURE__*/function(){function t(){}var e=t.prototype;return e.advance=function(t){var e,i,n,s;if(this.isRunning){var r=!1;if(this.lerp)this.value=(i=this.value,n=this.to,(1-(s=1-Math.exp(-60*this.lerp*t)))*i+s*n),Math.round(this.value)===this.to&&(this.value=this.to,r=!0);else{this.currentTime+=t;var l=o(0,this.currentTime/this.duration,1),h=(r=l>=1)?1:this.easing(l);this.value=this.from+(this.to-this.from)*h}null==(e=this.onUpdate)||e.call(this,this.value,r),r&&this.stop()}},e.stop=function(){this.isRunning=!1},e.fromTo=function(t,e,i){var o=i.lerp,n=void 0===o?.1:o,s=i.duration,r=void 0===s?1:s,l=i.easing,h=void 0===l?function(t){return t}:l,a=i.onStart,c=i.onUpdate;this.from=this.value=t,this.to=e,this.lerp=n,this.duration=r,this.easing=h,this.currentTime=0,this.isRunning=!0,null==a||a(),this.onUpdate=c},t}(),s=/*#__PURE__*/function(){function t(t){var e,i,o=this,n=void 0===t?{}:t,s=n.wrapper,r=n.content,l=n.autoResize,h=void 0===l||l;if(this.resize=function(){o.onWrapperResize(),o.onContentResize()},this.onWrapperResize=function(){o.wrapper===window?(o.width=window.innerWidth,o.height=window.innerHeight):(o.width=o.wrapper.clientWidth,o.height=o.wrapper.clientHeight)},this.onContentResize=function(){o.scrollHeight=o.content.scrollHeight,o.scrollWidth=o.content.scrollWidth},this.wrapper=s,this.content=r,h){var a=(e=this.resize,function(){var t=arguments,o=this;clearTimeout(i),i=setTimeout(function(){e.apply(o,t)},250)});this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(a),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(a),this.contentResizeObserver.observe(this.content)}this.resize()}return t.prototype.destroy=function(){var t,e;null==(t=this.wrapperResizeObserver)||t.disconnect(),null==(e=this.contentResizeObserver)||e.disconnect()},e(t,[{key:"limit",get:function(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}]),t}(),r=/*#__PURE__*/function(){function t(){this.events={}}var e=t.prototype;return e.emit=function(t){for(var e=this.events[t]||[],i=0,o=e.length;i<o;i++)e[i].apply(e,[].slice.call(arguments,1))},e.on=function(t,e){var i,o=this;return(null==(i=this.events[t])?void 0:i.push(e))||(this.events[t]=[e]),function(){var i;o.events[t]=null==(i=o.events[t])?void 0:i.filter(function(t){return e!==t})}},e.off=function(t,e){var i;this.events[t]=null==(i=this.events[t])?void 0:i.filter(function(t){return e!==t})},e.destroy=function(){this.events={}},t}(),l=/*#__PURE__*/function(){function t(t,e){var i=this,n=e.wheelMultiplier,s=void 0===n?1:n,l=e.touchMultiplier,h=void 0===l?2:l,a=e.normalizeWheel,c=void 0!==a&&a;this.onTouchStart=function(t){var e=t.targetTouches?t.targetTouches[0]:t,o=e.clientY;i.touchStart.x=e.clientX,i.touchStart.y=o,i.lastDelta={x:0,y:0}},this.onTouchMove=function(t){var e=t.targetTouches?t.targetTouches[0]:t,o=e.clientX,n=e.clientY,s=-(o-i.touchStart.x)*i.touchMultiplier,r=-(n-i.touchStart.y)*i.touchMultiplier;i.touchStart.x=o,i.touchStart.y=n,i.lastDelta={x:s,y:r},i.emitter.emit("scroll",{deltaX:s,deltaY:r,event:t})},this.onTouchEnd=function(t){i.emitter.emit("scroll",{deltaX:i.lastDelta.x,deltaY:i.lastDelta.y,event:t})},this.onWheel=function(t){var e=t.deltaX,n=t.deltaY;i.normalizeWheel&&(e=o(-100,e,100),n=o(-100,n,100)),i.emitter.emit("scroll",{deltaX:e*=i.wheelMultiplier,deltaY:n*=i.wheelMultiplier,event:t})},this.element=t,this.wheelMultiplier=s,this.touchMultiplier=h,this.normalizeWheel=c,this.touchStart={x:null,y:null},this.emitter=new r,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}var e=t.prototype;return e.on=function(t,e){return this.emitter.on(t,e)},e.destroy=function(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})},t}();/*#__PURE__*/
return function(){function t(t){var e=this,o=void 0===t?{}:t,h=o.wrapper,a=void 0===h?window:h,c=o.content,u=void 0===c?document.documentElement:c,p=o.wheelEventsTarget,d=void 0===p?a:p,v=o.eventsTarget,f=void 0===v?d:v,m=o.smoothWheel,g=void 0===m||m,S=o.smoothTouch,y=void 0!==S&&S,w=o.syncTouch,T=void 0!==w&&w,b=o.syncTouchLerp,z=void 0===b?.1:b,_=o.__iosNoInertiaSyncTouchLerp,M=void 0===_?.4:_,L=o.touchInertiaMultiplier,E=void 0===L?35:L,k=o.duration,O=o.easing,R=void 0===O?function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}:O,W=o.lerp,x=void 0===W?!k&&.1:W,C=o.infinite,H=void 0!==C&&C,N=o.orientation,j=void 0===N?"vertical":N,A=o.gestureOrientation,X=void 0===A?"vertical":A,Y=o.touchMultiplier,D=void 0===Y?1:Y,I=o.wheelMultiplier,P=void 0===I?1:I,U=o.normalizeWheel,V=void 0!==U&&U,q=o.autoResize,B=void 0===q||q;this.onVirtualScroll=function(t){var o=t.deltaX,n=t.deltaY,s=t.event;if(!s.ctrlKey){var r=s.type.includes("touch"),l=s.type.includes("wheel");if(!("both"===e.options.gestureOrientation&&0===o&&0===n||"vertical"===e.options.gestureOrientation&&0===n||"horizontal"===e.options.gestureOrientation&&0===o||r&&"vertical"===e.options.gestureOrientation&&0===e.scroll&&!e.options.infinite&&n<=0)){var h=s.composedPath();if(!(h=h.slice(0,h.indexOf(e.rootElement))).find(function(t){var e;return(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent"))||r&&(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent-touch"))||l&&(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent-wheel"))||(null==(e=t.classList)?void 0:e.contains("lenis"))}))if(e.isStopped||e.isLocked)s.preventDefault();else{if(e.isSmooth=(e.options.smoothTouch||e.options.syncTouch)&&r||e.options.smoothWheel&&l,!e.isSmooth)return e.isScrolling=!1,void e.animate.stop();s.preventDefault();var a=n;"both"===e.options.gestureOrientation?a=Math.abs(n)>Math.abs(o)?n:o:"horizontal"===e.options.gestureOrientation&&(a=o);var c=r&&e.options.syncTouch,u=r&&"touchend"===s.type&&Math.abs(a)>1;u&&(a=e.velocity*e.options.touchInertiaMultiplier),e.scrollTo(e.targetScroll+a,i({programmatic:!1},c&&{lerp:u?e.syncTouchLerp:e.options.__iosNoInertiaSyncTouchLerp}))}}}},this.onNativeScroll=function(){if(!e.__preventNextScrollEvent&&!e.isScrolling){var t=e.animatedScroll;e.animatedScroll=e.targetScroll=e.actualScroll,e.velocity=0,e.direction=Math.sign(e.animatedScroll-t),e.emit()}},window.lenisVersion="1.0.29",a!==document.documentElement&&a!==document.body||(a=window),this.options={wrapper:a,content:u,wheelEventsTarget:d,eventsTarget:f,smoothWheel:g,smoothTouch:y,syncTouch:T,syncTouchLerp:z,__iosNoInertiaSyncTouchLerp:M,touchInertiaMultiplier:E,duration:k,easing:R,lerp:x,infinite:H,gestureOrientation:X,orientation:j,touchMultiplier:D,wheelMultiplier:P,normalizeWheel:V,autoResize:B},this.animate=new n,this.emitter=new r,this.dimensions=new s({wrapper:a,content:u,autoResize:B}),this.toggleClass("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=T||g||y,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll=new l(f,{touchMultiplier:D,wheelMultiplier:P,normalizeWheel:V}),this.virtualScroll.on("scroll",this.onVirtualScroll)}var h=t.prototype;return h.destroy=function(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClass("lenis",!1),this.toggleClass("lenis-smooth",!1),this.toggleClass("lenis-scrolling",!1),this.toggleClass("lenis-stopped",!1),this.toggleClass("lenis-locked",!1)},h.on=function(t,e){return this.emitter.on(t,e)},h.off=function(t,e){return this.emitter.off(t,e)},h.setScroll=function(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t},h.resize=function(){this.dimensions.resize()},h.emit=function(){this.emitter.emit("scroll",this)},h.reset=function(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()},h.start=function(){this.isStopped=!1,this.reset()},h.stop=function(){this.isStopped=!0,this.animate.stop(),this.reset()},h.raf=function(t){var e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)},h.scrollTo=function(t,e){var i=this,n=void 0===e?{}:e,s=n.offset,r=void 0===s?0:s,l=n.immediate,h=void 0!==l&&l,a=n.lock,c=void 0!==a&&a,u=n.duration,p=void 0===u?this.options.duration:u,d=n.easing,v=void 0===d?this.options.easing:d,f=n.lerp,m=void 0===f?!p&&this.options.lerp:f,g=n.onComplete,S=void 0===g?null:g,y=n.force,w=n.programmatic,T=void 0===w||w;if(!this.isStopped&&!this.isLocked||void 0!==y&&y){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var b,z;if("string"==typeof t?z=document.querySelector(t):null!=(b=t)&&b.nodeType&&(z=t),z){if(this.options.wrapper!==window){var _=this.options.wrapper.getBoundingClientRect();r-=this.isHorizontal?_.left:_.top}var M=z.getBoundingClientRect();t=(this.isHorizontal?M.left:M.top)+this.animatedScroll}}if("number"==typeof t){if(t+=r,t=Math.round(t),this.options.infinite?T&&(this.targetScroll=this.animatedScroll=this.scroll):t=o(0,t,this.limit),h)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(null==S||S(this));if(!T){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:p,easing:v,lerp:m,onStart:function(){c&&(i.isLocked=!0),i.isScrolling=!0},onUpdate:function(t,e){i.isScrolling=!0,i.velocity=t-i.animatedScroll,i.direction=Math.sign(i.velocity),i.animatedScroll=t,i.setScroll(i.scroll),T&&(i.targetScroll=t),e||i.emit(),e&&(i.reset(),i.emit(),null==S||S(i),i.__preventNextScrollEvent=!0,requestAnimationFrame(function(){delete i.__preventNextScrollEvent}))}})}}},h.toggleClass=function(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)},e(t,[{key:"rootElement",get:function(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}},{key:"limit",get:function(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}},{key:"isHorizontal",get:function(){return"horizontal"===this.options.orientation}},{key:"actualScroll",get:function(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}},{key:"scroll",get:function(){return this.options.infinite?(this.animatedScroll%(t=this.limit)+t)%t:this.animatedScroll;var t}},{key:"progress",get:function(){return 0===this.limit?1:this.scroll/this.limit}},{key:"isSmooth",get:function(){return this.__isSmooth},set:function(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClass("lenis-smooth",t))}},{key:"isScrolling",get:function(){return this.__isScrolling},set:function(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClass("lenis-scrolling",t))}},{key:"isStopped",get:function(){return this.__isStopped},set:function(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClass("lenis-stopped",t))}},{key:"isLocked",get:function(){return this.__isLocked},set:function(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClass("lenis-locked",t))}},{key:"className",get:function(){var t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}}]),t}()}); 
 
 
  $(window).scrollTop(0); 
    window.scrollTo(0, 0);
    $('html,body').animate({
	     	    scrollTop: 0
        }, 0);
        window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.4,
    wheelMultiplier: 0.4,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
   $(window).scrollTop(0); 
    window.scrollTo(0, 0);
     $('html,body').animate({
	     	    scrollTop: 0
        }, 0);
  lenis.start();
 
 
}
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});
 
  window.onload = function() {
  var body = document.querySelector('body');
  var links = document.querySelectorAll('.navlink');  
  
  links.forEach(function (link) {
    link.addEventListener('click', onLinkClicked);
    
    function onLinkClicked(event) {
      event.preventDefault();
       body.classList.remove('animated-show-active')
    $('.loader-text').text('01');
    $('.loads-block-sleet').css('height','0%');
 	$('.loads-block-sleet-dottom').css('height','0%');
    $('html').addClass('gotopage');
    $('html').removeClass('loaded');
      setTimeout(onAnimationComplete, 1000);
    }

    function onAnimationComplete() {
      window.location = link.href;  
    }
  });
}
  
  
    function countTo100(currentCount) {
        
        var dotload = 0;
        
        
        if($('.app').hasClass('home-page')){
            if (currentCount < 100) {
		    
		    if (currentCount < 10){
		        $('.loader-text').text('0'+currentCount);
		    } else {
		        $('.loader-text').text(''+currentCount);
		        var fixed = currentCount/2;
		        var dotfix = 50 + fixed;
		        $('.loads-block-sleet').css('height',dotfix+'%');
		        $('.loads-block-sleet-dottom').css('height',dotfix+'%');
		        
		        
		    }
		    
			
			setTimeout(function () {
				countTo100(currentCount + 1);
			}, 40);
		} else if (currentCount > 98){
		    $('.loader-text').text(100);
		    $('.loads-block-sleet').css('height','100%');
		        $('.loads-block-sleet-dottom').css('height','100%');
		    $('html').removeClass('startloaded');
			$('html').addClass('loaded');
			
			setTimeout(function () {
			    }, 1400);

		  setTimeout(function () {
		      lenis.start();
		  }, 100);
	
		    
		} else {
		    lenis.start();
		    setTimeout(function () {
		        $('html').removeClass('startloaded');
		        $('html').addClass('loaded');
		       }, 800);

		}
        }else{
            
             lenis.start();
             $('.loads-block-sleet').css('height','100%');
		        $('.loads-block-sleet-dottom').css('height','100%');
		    setTimeout(function () {
		        $('html').removeClass('startloaded');
		        $('html').addClass('loaded');
		       }, 800);
            
        }
        
		
	}
	
	countTo100(0);
	$('html').addClass('startloaded');
	
	
	
	document.querySelectorAll('.marq').forEach((trigger) => {
			new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(async (entry) => {
						if (entry.isIntersecting) {
						
							$(entry.target).addClass('active');
						} else {
						    $(entry.target).removeClass('active');
						}
					});
				},
				{
					threshold: 0,
				}
			).observe(trigger);
		});

	
	
	document.querySelectorAll('.app-bg').forEach((trigger) => {
			new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(async (entry) => {
						if (entry.isIntersecting) {
						
							$(entry.target).find('.spline-bg').show();
						} else {
						    $(entry.target).find('.spline-bg').hide();
						}
					});
				},
				{
					threshold: 0,
					rootMargin: '100px',
				}
			).observe(trigger);
		});

 document.addEventListener('DOMContentLoaded', () => {
    const targetClass = '.obsp';
    const observer = new MutationObserver(() => {
        const elements = document.querySelectorAll(targetClass);
        Array.from(elements).forEach((element) => {
               console.log(`РџСЂРѕС†РµРЅС‚ РІРёРґРёРјРѕСЃС‚Рё СЌР»РµРјРµРЅС‚Р° ${element.id || 'Р±РµР· id'}:`, getElementVisibilityPercentage(element));
        });
    });

    function getElementVisibilityPercentage(element) {
        let rect = element.getBoundingClientRect();
        let widthVisible = Math.max(0, rect.right - window.innerWidth);
        return ((rect.width + widthVisible) / element.offsetWidth * 100).toFixed(2);
    }

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
});





$( ".obsp" ).each(function( index ) {
  $(this).attr('id', 'box'+(index + 1)+'');
});


let observers = [];

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    const box = entry.target;
    const visiblePct = Math.floor(entry.intersectionRatio * 100) * 0.0115;
    //console.log(visiblePct);
    if (visiblePct <= 0.85){
        $(entry.target).parent().parent().children('.video').css('transform','scale(0.85)')
    }else{
        $(entry.target).parent().parent().children('.video').css('transform','scale('+visiblePct+')')
    }
    
   
        const visiblePct2 = Math.floor(entry.intersectionRatio * 100) * 1;
        console.log(visiblePct2);
        
        if (visiblePct2 > 90){
            var index = $(box).closest('.splide__slide').index();
            $('.div-block-16 > div').eq(index).addClass('divactive');
            
            $('.div-block-19 div.active').removeClass('active');
            $('.div-block-19 div').eq(index).addClass('active');
            
        } else {
            var index = $(box).closest('.splide__slide').index();
            $('.div-block-16 div.divactive').addClass('divactiveout');
            $('.div-block-16 > div').eq(index).removeClass('divactive');
            setTimeout(function () {
                 $('.div-block-16 div.divactiveout').removeClass('divactiveout');
                
             }, 300);
        }
    
    
    
    
  });
};

const startup = () => {
 
  let observerOptions = {};

  let thresholdSet = [];
  for (let j = 0; j <= 1.0; j += 0.01) {
      thresholdSet.push(j);
  }

  
  for (let i = 0; i < 9; i++) {
      
    
   
    let boxID = `box${i + 1}`;
   
    observerOptions.threshold = thresholdSet;
    observers[i] = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );
   
    observers[i].observe(document.querySelector(`#${boxID}`));
  }

  
};

startup();