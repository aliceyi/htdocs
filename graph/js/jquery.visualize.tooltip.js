/**
 * --------------------------------------------------------------------
 * Tooltip plugin for the jQuery-Plugin "Visualize"
 * Tolltip by Iraê Carvalho, irae@irae.pro.br, http://irae.pro.br/en/
 * Copyright (c) 2010 Iraê Carvalho
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * 	
 * Visualize plugin by Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group, http://www.filamentgroup.com
 *
 * --------------------------------------------------------------------
 */

(function($){
	function addCommas(nStr) {
		try {
			nStr += '';
			var x = nStr.split('.'),
				x1 = x[0],
				x2 = x.length > 1 ? '.' + x[1] : '',
				rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		} catch(e) {return nStr}
	}
	
	$.visualizePlugins.push(function visualizeTooltip(options,tableData) {
		//configuration
		var o = $.extend({
			tooltip: true,
			tooltipalign: 'auto', // also available 'left' and 'right'
			tooltipvalign: 'top',
			tooltipclass: 'visualize-tooltip',
			tooltiphtml: function(data){
				if(options.multiHover) {
					var html='';
					for(var i=0;i<data.point.length;i++){
						html += '<p>'+data.point[i].xLabels[0]+' - '+data.point.symbol+'<strong>'+addCommas(data.point[i].value)+'</strong> '+data.point[i].yLabels[0]+data.point.unit+'</p>';
					}
					return html;					
				} else {
					return '<p>'+data.point.xLabels[0]+' - '+data.point.symbol+'<strong> '+addCommas(data.point.value)+'</strong> '+data.point.yLabels[0]+data.point.unit+'</p>';
				}
			},
			tooltipfilldot: true, // whether to fill in dots when hovered on
			tooltipdotenlarge: true,
			delay:false
		},options);
		
		// don't go any further if we are not to show anything
		if(!o.tooltip) {return;}
		
		var self = $(this),
			canvasContain = self.next(),
			scroller = canvasContain.find('.visualize-scroller'),
			scrollerW = scroller.width(), scrollerH = scroller.height(),
			tracker = canvasContain.find('.visualize-interaction-tracker');
		
		// IE needs background color and opacity white or the tracker stays behind the tooltip
		tracker.css({
			backgroundColor:'white',
			opacity:0,
			zIndex:1000
		});
		
		var tooltip = $('<div class="'+o.tooltipclass+'"/>').css({
				position:'absolute',
				display:'none',
				zIndex:1000
			})
			.insertAfter(scroller.find('canvas'));

		var usescroll = true;
		
		if( typeof(window.G_vmlCanvasManager) !== 'undefined' ){
			scroller.css({'position':'absolute'});
			//tracker.css({marginTop:'-'+(o.height)+'px'});
		}
		
		
		self.bind('vizualizeOver',function visualizeTooltipOver(e,data){
			if(data.canvasContain.get(0) != canvasContain.get(0)) {return;} // for multiple graphs originated from same table
			if(o.multiHover) {
				var p = data.point[0].canvasCords;
			} else {
				var p = data.point.canvasCords;
			}
			var left,right,sTop,top,clasRem,clasAdd,bottom,x=Math.round(p[0]+data.tableData.zeroLocX),y=Math.round(p[1]+data.tableData.zeroLocY);
			if(o.tooltipalign == 'left' || ( o.tooltipalign=='auto' && x-scroller.scrollLeft()<=scrollerW/2 ) ) {
				if($.browser.msie && ($.browser.version == 7 || $.browser.version == 6) ) {usescroll=false;} else {usescroll=true;}
				left = x-(usescroll?scroller.scrollLeft():0);
				if(x-scroller.scrollLeft()<0) { // even with when not using scroll we need to calc with it for IE
					return;
				}
				left = left+(tooltip.width()-35)+'px';
				right = '';
				clasAdd="tooltipleft";
				clasRem="tooltipright";
			} else {
				if($.browser.msie && $.browser.version == 7) {usescroll=false;} else {usescroll=true;}
				right = Math.abs(x-o.width)- (o.width-(usescroll?scroller.scrollLeft():0)-scrollerW);
				if(Math.abs(x-o.width)- (o.width-scroller.scrollLeft()-scrollerW)<0) { // even with when not using scroll we need to calc with it for IE
					return;
				}
				left = '';
				right = right+'px';
				clasAdd="tooltipright";
				clasRem="tooltipleft";
			}
			if (y-scroller.scrollTop()<=scrollerH/2) {
				sTop = -15;
			} else {
				sTop = 60;
			}
			
			tooltip
				.addClass(clasAdd)
				.removeClass(clasRem)
				.html(o.tooltiphtml(data))
				.css({
					display:'block',
					top: y-sTop+'px',
					left: left,
					right: right
				});
		});
		
		self.bind('vizualizeOut',function visualizeTooltipOut(e,data){
			tooltip.css({display:'none'});
		});
		
		// Change inner color on mouseover intecation
		if(o.tooltipfilldot && !$.browser.msie) { // IE is a bit slow, but is possible. Future versions may solve this problem
			var currentHoverPoint = null;
			// listen for hovering events
			self
				.bind('vizualizeOver',function(e,data){
					currentHoverPoint = data.point;
					$(data.point.elem).parents('table').trigger('visualizeRedraw');
				})
				.bind('vizualizeOut',function(e,data){
					currentHoverPoint = null;
					$(data.point.elem).parents('table').trigger('visualizeRedraw');
				});

			// Modify painting for hovering effect
			self.bind('vizualizeBeforeDraw',function hoverBeforeDraw(e,data){
				if(currentHoverPoint) {
					var item,i,j,len = data.tableData.allItems.length;
					for(i=0;i<len;i+=1) { item = data.tableData.allItems[i];
						if(currentHoverPoint == item) {
							item.innerColor = item.color;
							if (o.tooltipdotenlarge) {
								item.dotSize = item.dotSize*1.5;
								item.dotInnerSize = item.dotInnerSize*1.5;
							}
						}
					}
				}
			});
		}
	});
})(window.jQuery);