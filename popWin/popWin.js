var bshare=bshare||{};
(function(BS){
	BS.popWin=function(option){
		var self=this;
		this.settings=$.extend({
			width:500,
			height:300
		},option||{});
		this.container=option.container;
		this.wall=$('<div class="popWall"></div>').appendTo(this.container);
		this.dom=$('<div class="popDom" ><div class="titleDom"><span class="titleCon">'+this.settings.title+'</span><span class="close">X</span></div><div class="bodyDom"></div></div>').appendTo(this.container);
		this.dom.css({width:this.settings.width+"px",height:this.settings.height+"px","margin-left":-(this.settings.width/2)+"px","margin-top":-(this.settings.height/2)+"px"});
		this.title=this.dom.find(".titleDom");
		this.body=this.dom.find(".bodyDom").append(self.settings.content);
		this.closeDom=this.dom.find(".close");
		this.closeDom.click(function(){
			self.close();
		});
	};
	BS.popWin.prototype={
		close:function(){
			var self=this;
			self.container.hide();
			self.settings.closeCallback.call(self);
		},
		remove:function(){
			var self=this;
			self.container.remove();
		},
		show:function(){
			var self=this;
			// recalc window size on resizing:
			$(window).resize(function() {
				self.setMaskHeight();
			});
			self.setMaskHeight();
			self.container.show();
		},
		setContent:function(o){
			var self=this;
			self.body.append(o);
		},
		setMaskHeight:function(){
			try {
				// get height of page for the mask:
				var body = document.body, html = document.documentElement
				$(".popWall").height(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) + "px");
			} catch (e) {}
		}
	};
	
})(bshare);