var bshare=bshare||{};
(
	function(BS){
		BS.timeSelect=function(option){
			var self=this;
			this.settings=$.extend({
				 format:"hh:mm",
				 isEdit:"true",
				 type:12,
				 period:"上午",
				 afterFun:function(){
					 
				 }
			},option||{});
			this.items=[];
			this.container=option.container;
			this.dom=$('<div class="timeDom"></div>');
			this.format=this.settings.format.split(":");
			
			
			for(var i=0;i<this. format.length;i++){
				if(this. format[i]=="hh"){
					self.createItem({type:this. format[i]});
				}
				if(this. format[i]=="mm"){
					this.createItem({type:this. format[i]});
				}
				if(this. format[i]=="ss"){
					this.createItem({type:this. format[i]});
				}
			}
			
			self.dom.appendTo(self.container);
			
		}
		BS.timeSelect.prototype={
			getNum:function(j){
				var n=0;
				if(j<10){
					n="0"+j;
				}else{
					n=j;
				}
				return n;
			},
			createItem:function(d){
				var self=this;
				var item={};
				item.d=d;
				item.domcon=$('<div class="timeDomCon"><select name="" class="itemDom"></select></div>');
				item.dom=item.domcon.find(".itemDom");
				item.isChange=false;
				if(d.type=="hh"){
					item.type="";
					item.num=self.settings.type;
				}
				if(d.type=="mm"){
					item.type="";
					item.num=60;
				}
				if(d.type=="ss"){
					item.type="";
					item.num=60;
				}
				if(self.settings.type==12 && d.type=="hh"){
					if(self.settings.period=="下午"){
						item.num=11;
					}
					for(var j=1;j<=item.num;j++){
						var s=self.getNum(j)+" "+self.settings.period;
						item.childDom='<option value="'+j+'">'+s+'</option>';
						item.type +=item.childDom;
					}
				}else{
					for(var j=0;j<item.num;j++){
						item.childDom='<option value="'+j+'">'+self.getNum(j)+'</option>';
						item.type +=item.childDom;
					}
				}
				item.dom.html(item.type);
				item.domcon.appendTo(self.dom);
				
				item.getValue=function(){
					var v=item.dom.val();
					if(v<10){
						v=0+v;
					}
					return v;
				}
				
				//item.span=$("<span class='timeDes'>"+item.getValue()+"</span>").appendTo(item.domcon);
				
				if(d.type==="hh"){
					item.colon=$('<span style="width:10px;"> ：</span>').appendTo(item.domcon);
				}
				if(d.type==="mm"){
					if(self.settings. format.split(":").length==3){
						item.colon=$('<span style="width:10px;"> ：</span>').appendTo(item.domcon);
					}
				}
				//select change 
				item.dom.change(function(){
					//item.span.text(item.getValue());
					//item.dom.hide();
					//item.span.show();
					if(self.settings.afterFun)self.settings.afterFun().call(self);
					item.isChange=false;
				});
				item.domcon.mouseover(function(){return;
					if(self.settings.isEdit){
						item.dom.show();
						//item.span.hide();
					}
					
				});
				item.dom.mousedown(function(){
					if(self.settings.isEdit){
						item.isChange=true;
					}
				})
				item.domcon.mouseout(function(event){return;
					if(self.settings.isEdit){
						if(!item.isChange){
							item.dom.hide();
							//item.span.show();
						}
					}
				});
				self.items.push(item);
				return item;
			},
			getTime:function(){
				var self=this;
				var time=[];
				for(var i=0;i<self.items.length;i++){
					time.push(self.items[i].getValue());
				}
				return time.join(":");
			},
			setTime:function(t){
				var self=this;
				var time=t.split(":");
				for(var i=0;i<time.length;i++){
					self.items[i].dom.val(parseInt(time[i]));
					//self.items[i].span.html(time[i]);
				}
			}
			
		}
		
		
	}

)(bshare);