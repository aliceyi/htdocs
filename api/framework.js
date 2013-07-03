var Ad=Ad||{};
(function(Ad){
	Ad.mainMenu=function(option){
		var self=this;
		self.data=option.data;
		self.settings=$.extend({
			
			
		},option||{});
		
		self.dom=$('<div class="left" style="margin:0 5px;"></div>');
		self.items=[];
		for(var i=0;i<self.data.length;i++){
			self.createItem(self.data[i]);
		}
		self.createItem=function(d){
			//
			var item={};
			item.data=d;
			item.dom=$('<a class="div-rounded-15 top-menu-button heading3" href="'+item.data.href+'">'+item.data.text+'</a>').appendTo(self.dom);
			self.items.push(item.dom);
		};
	};
	Ad.leftMenu=function(option){
		var self=this;
		self.data=option.data;
		self.settings=$.extend({},option||{});
		self.items=[];
		for(var i=0;i<self.data.length;i++){
			self.createItem(self.data[i]);
		}
		self.createItem=function(d){
			var item={};
			item.data=d;
			item.dom=$('<a class="menu-left-button" href="'+item.data.href+'">'+item.data.text+'</a>').appendTo(self.dom);
			item.clear=$('<div class="clear spacer10"></div>').appendTo(self.dom);
			self.items.push(item.dom);
		};
	};
	Ad.framework=function(option){
		var self=this;
		if(option.left)this.leftData=option.left;
		if(option.main)this.mainData=option.main;
		if(this.leftData){
			self.leftMenu=new Ad.leftMenu(self.leftData);
		}
		if(this.mainData){
			self.mainData=new Ad.mainMenu(self.mainData);
		}
		
	};
	
})(Ad);