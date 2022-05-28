/**
 *  Slider Kit Delay Captions, v.1.1 - 2012/01/10
 *  http://www.kyrielles.net/sliderkit
 *  
 *  Copyright (c) 2010-2012 Alan Frog
 *  Licensed under the GNU General Public License
 *  See <license.txt> or <http://www.gnu.org/licenses/>
 *  
 *  Requires: jQuery Slider Kit v1.7.1+
 *  note: 'hold' options is depreciated since jQuery Slider Kit v1.9
 * 
 */

(function(e){SliderKit.prototype.DelayCaptions=function(t){var n=this,r={delay:400,position:"bottom",transition:"sliding",duration:300,easing:"",hold:!1},i={textbox:n.options.cssprefix+"-panel-textbox"},s="",o=0,u="",a=0,f=0,l=0,c="",h=function(){var h=e("."+i.textbox,n.domObj);if(h.size()==0)return n._errorReport("DelayCaptions #01",n.options.debug,0),!1;s=e.extend({},r,t);var p=h.width();a=s.position=="top"||s.position=="bottom"?h.height():s.position=="left"?p:s.position=="right"?n.domObjWidth:0;if(a==0)return n._errorReport("DelayCaptions #02",n.options.debug,0),!1;h.css({top:"",bottom:"0",left:"",right:""}),f=s.delay<n.options.panelfxspeed?n.options.panelfxspeed:s.delay,l=n.options.panelfxspeed+f+s.duration,n.options.autospeed<l&&(n.options.autospeed=l,n._errorReport("DelayCaptions #03",n.options.debug,0)),n.animating=!1;switch(s.transition){case"sliding":u=s.position=="right"?"":"-",o=s.position=="right"?"left":s.position;switch(s.position){case"top":c={top:"+="+a};break;case"bottom":c={bottom:"+="+a};break;case"left":c={left:"+="+a};break;case"right":c={left:"-="+p}}break;case"fading":c={opacity:1}}},p=function(){n.txtBoxTimer!=null&&clearTimeout(n.txtBoxTimer)},d=function(){p();var t=e("."+i.textbox,n.currPanel);if(t.size()>0)switch(s.transition){case"fading":t.css("opacity","0");break;case"sliding":t.css(o,u+a+"px")}};n.panelAnteFns.push(d);var v=function(e){n.textboxRunning=!0,e.animate(c,s.duration,s.easing,function(){n.animating=!1,n.textboxRunning=!1})},m=function(){p();var t=e("."+i.textbox,n.currPanel);t.size()>0&&(n.options.fastchange||(n.animating=!0),n.textboxRunning||(n.txtBoxTimer=setTimeout(function(){v(t)},f)))};n.panelPostFns.push(m),h()}})(jQuery);