var bshare=bshare||{};
(function(BS){
	BS.slide=function(option){
		var self=this;
		this.settings=$.extend({
			width:1903,
			height:400,
			isPlay:true
		},option||{});
		this.container=this.settings.container;
		this.container.css({width:this.settings.width+"px",height:this.settings.height+"px"});
		this.content=$(this.container).find(".content");
		this.contentItems=$(this.content).find("li").css({width:this.settings.width});
		this.pagination=$(this.container).find(".pagination");
		this.paginationItems=$(this.pagination).find("li");
		this.selectedIndex=null;
		this.intervalTime=3000;
		this.interval=null;
		//reset pagination style
		this.reset=function(index){
			$($(self.paginationItems)[index]).removeClass(" selected");
		}
		//change position
		this.selected=function(index){		
			//if(index===self.selectedIndex)return;
			if(index!=self.selectedIndex)self.reset(self.selectedIndex);
			var minus=-1;
			if($.browser.msie){
				self.content.stop();
				self.content.animate({left:(minus*(index*self.settings.width))+"px"},1000);
			}else{
				self.content.removeClass("isFirst").css({left:(minus*(index*self.settings.width))+"px"});
			}
			
			$(self.paginationItems[index]).addClass(" selected");
			self.selectedIndex=index;
		}
		//click pagination change picture position
		this.paginationItems.click(function(){
			var index=$(this).index();		
			self.selected(index);
		});
		this.autoPlay=function(){
			self.interval=window.setInterval(function(){
				var i=0;
				if(self.selectedIndex!=null && self.selectedIndex<self.paginationItems.length-1)i=self.selectedIndex+1;
				self.selected(i);
			},self.intervalTime);
		}
		this.clearPlay=function(){
			if(self.interval)window.clearInterval(self.interval);
			if(self.timeout)window.clearTimeout(self.timeout);
		}
		
		//default seleted
			self.selected(0);
		//if 
		if(this.settings.isPlay){
			self.autoPlay();
		}
		
		this.paginationItems.mouseover(function(){
			if(self.interval)self.clearPlay();
			var index=$(this).index();
			self.selected(index);
		})
		
		this.paginationItems.mouseout(function(){
			if(self.settings.isPlay){
				self.timeout=window.setTimeout(function(){
					self.autoPlay();
				},self.intervalTime);
			}
		})
		
		this.contentItems.mouseover(function(){
			if(self.interval)self.clearPlay();
			var index=$(this).index();
			self.selected(index);
		})
		
		this.contentItems.mouseout(function(){
			if(self.settings.isPlay){
				self.timeout=window.setTimeout(function(){
					self.autoPlay();
				},self.intervalTime);
			}
		})
	}

})(bshare)