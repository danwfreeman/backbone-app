/**
 *  Slider Kit Timer, v.1.0 - 2011/09/23
 *  http://www.kyrielles.net/sliderkit
 *  
 *  Copyright (c) 2010-2012 Alan Frog
 *  Licensed under the GNU General Public License
 *  See <license.txt> or <http://www.gnu.org/licenses/>
 *  
 *  Requires : jQuery Slider Kit v1.8+
 * 
 */

(function(e){SliderKit.prototype.Timer=function(t){var n=this,r={fadeout:1},i={timer:n.options.cssprefix+"-timer"};r=e.extend({},r,t);if(n.arePanels&&n.isPlaying!=""){var s=e("."+i.timer,n.domObj);s.size()==0&&(n.panelsBag.append('<div class="'+i.timer+'"></div>'),s=e("."+i.timer,n.domObj));var o=function(){s.stop().css("opacity",1).width(n.domObjWidth).hide()},u=function(){o(),n.isPlaying!=null&&s.show().animate({opacity:r.fadeout,width:0},n.options.autospeed-100,function(){})};u(),n.panelAnteFns.push(u)}}})(jQuery);