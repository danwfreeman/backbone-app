/**
 *  Slider Kit Counter, v1.0 - 2011/09/23
 *  http://www.kyrielles.net/sliderkit
 *  
 *  Copyright (c) 2010-2012 Alan Frog
 *  Licensed under the GNU General Public License
 *  See <license.txt> or <http://www.gnu.org/licenses/>
 *  
 *  Requires : jQuery Slider Kit v1.7.1+
 * 
 */

(function(e){SliderKit.prototype.Counter=function(){var t=this,n={countItems:t.options.cssprefix+"-count-items",countLines:t.options.cssprefix+"-count-lines",countCur:t.options.cssprefix+"-count-current",countTot:t.options.cssprefix+"-count-total"};if(t.arePanels){var r=e("."+n.countItems,t.domObj),i=e("."+n.countCur,r);if(r.size()>0&&i.size()>0){var s=1,o=function(){i.text((t.currId!=0?t.currId:t.startId)+1)};t.firstTime&&(e("."+n.countTot,r).text(t.allItems),o()),t.panelAnteFns.push(o)}}if(t.isNavClip){var u=e("."+n.countLines,t.domObj),a=e("."+n.countCur,u);if(u.size()>0&&a.size()>0){var f=Math.ceil(t.navLINum/t.options.shownavitems),l=function(){var e=Math.ceil((t.currId+1)/t.options.shownavitems);a.text(e)};t.firstTime&&(e("."+n.countTot,u).text(f),l()),t.navAnteFns.push(l),t.panelPostFns.push(l)}}}})(jQuery);