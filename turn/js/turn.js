var bshare=bshare||{};
(
	function(BS){
	BS.Turn=function(option){
		var self=this;
		this.items=[];
		this.settings=$.extend({
			
		},option||{});
		this.container=option.container;
		this.data=option.items;
		this.dom=$('<div class="turnDom"></div>');
		for(var i=0,n=this.data.length;i<n;i++){
			self.createItem(this.data[i])
		}
		this.dom.appendTo(this.container);
	}
	BS.Turn.prototype={
		createItem:function(d){
			var self=this;
			var item ={};
			item.data=d;
			item.dom=$('<div class="animate-wrap"></div>');
			item.animate=$('<div class="animate" ></div>').appendTo(item.dom);
			item.front=$('<label  class="front"></label>').appendTo(item.animate);
			item.img=$('<img src='+d.img+' width="150" height="150" alt='+d.title+'>').appendTo(item.front);
			item.back=$('<label  class="back"></label>').appendTo(item.animate);
			item.descript=$('<div><p style="padding:10px;">'+d.descript+'</p></div>').css({width:self.settings.width,height:self.settings.height}).appendTo(item.back);
			item.animate.click(function(){
				if(d.href){
					parent.frames[self.settings.loadCon].location.href=d.href;
				}
				if(self.settings.callback)self.settings.callback.call(item);
			})
			item.animate.mouseover(function(){
				$(this).addClass("selected");
			}).mouseout(function(){
				$(this).removeClass("selected");
			})
			item.dom.appendTo(self.dom);
			self.items.push(item);
		}
	}
	
})(bshare)