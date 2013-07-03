var bshare=bshare||{};
(
	function(BS){
		BS.Files=function(option){
			var self=this;
			this.settings=$.extend({
				action:"",
				name: 'tempFile',
				responseType: "json",
				contentType:"application/json; charset=utf-8",
				onSubmit:function(){},
				onChange:function(){},
				onComplete:function(){}
			},option||{});
			this.dom=option.container;
			this.btnCon=this.dom.find(".fileBtnCon");
			this.fileviewCon=this.dom.find(".fileView");
			this.btn=$("#fileBtn");
			this.addFile=$("#addFile");
			this.file=$("#file");
			this.fileSubmit=$("#fileSubmit");
			this.items=[];
			var bar=this.bar=$(".bar");
			var percent=this.percent = $('.percent'); 
			this.msg=$("#msg");
			if($.browser.msie){
				this.addFile.hide();
			}
			this.btn.click(function(){
				self.addFileFun();
			})
			this.addFile.click(function(){
				self.addFileFun();
			})
			 /**
			 * Get file name from path
			 * @param {String} file path to file
			 * @return filename
			 */  
			this.fileFromPath=function(file){
				return file.replace(/.*(\/|\\)/, "");
			}
			/**
			 * Get file extension lowercase
			 * @param {String} file name
			 * @return file extenstion
			 */    
			this.getExt=function(file){
				return (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
			}
			/**
			 * add form 
			 */  
			this.file.wrap("<form id='myupload' action='"+self.settings.action+"?act=addimg' method='post' enctype='multipart/form-data'></form>"); 
			/**
			 * select img submit php temp save img
			 * return upload file information
			 */
			this.ajaxSubmit=function(){
				$("#myupload").ajaxSubmit({ 
					dataType:  'json', 
					beforeSend: function() { 
						
					}, 
					uploadProgress: function(event, position, total, percentComplete) { 
						
					}, 
					success: function(data) { 
						self.createItems(data);
					}, 
					error:function(xhr){ 
						alert(xhr.responseText);
					} 
				}); 
			}
			/**
			 * when file change ,form submit.
			 */
			this.file.change(function(e){
				 self.ajaxSubmit(); 
			}); 
			/**
			 * remove browser default event.
			 */
			$(document).on({ 
				dragleave:function(e){    //拖离 
					e.preventDefault(); 
				}, 
				drop:function(e){  //拖后放 
					e.preventDefault(); 
				}, 
				dragenter:function(e){    //拖进 
					e.preventDefault(); 
				}, 
				dragover:function(e){    //拖来拖去 
					e.preventDefault(); 
				} 
			}); 
			/**
			 *create upload file picture.
			 */
			this.createItems=function(file){ 
				if(file.length>0){
					for(var i=0,n=file.length;i<n;i++){
						//var item={name:file[i].name,type:self.getExt(file[i].type),size:file[i].size}
						//self.addItems(file[i]);
						self.createImg(file[i]);
					}
				}
			}
			/**
			 *mouse drag img drop container trigger ondrop event.
			 */
			this.fileviewCon[0].ondrop=function(e){
				 if(e.dataTransfer.files){
					var fileList=e.dataTransfer.files;
					xhr = new XMLHttpRequest(); 
					xhr.open("post", ""+self.settings.action+"?act=addimg", false); 
					xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
					var fd = new FormData(); 
					for(var i=0;i<fileList.length;i++){
						fd.append('filesUploaded[]', fileList[i]); 
					}
					xhr.send(fd);
					if(xhr.readyState == 4){
						if(xhr.responseText.indexOf("[")==-1){
							alert(xhr.responseText);
						}else{
							var data= eval(xhr.responseText);
							self.createItems(data);
						}
					}else{
						alert(xhr.responseText);
					} 
				 }
				 e.stopPropagation();    
				 e.preventDefault(); 
				return false;
			}
			this.fileSubmit.click(function(){
				self.submit();
			});
		}
		BS.Files.prototype={
			addFileFun:function(){// click add button trigger file click event.
				var self=this;
				self.file.click();
			},
			removeData:function(item){
				var self=this;
				//remove data
				self.items=$.grep(self.items,function(n,i){
					return n==item;
				},true);
			},
			remove:function(item){
				var self=this;
				item.img.css({width:"0px",height:"0px",bottom:"0px",right:"0px",opacity:"0.5"});
				if($.browser.mise){
					item.img.animate({width:"0px",height:"0px",bottom:"0px",right:"0px",opacity:"0.5"},500);
				}
				//remove dom
				window.setTimeout(function(){
					item.dom.remove();
				},700);
			},
			deleteItem:function(item){
				var self=this;
				self.remove(item);
				self.removeData(item);
			},
			removeAll:function(){
				var self=this;
				for(var i=0;i<self.items.length;i++){
					self.remove(self.items[i]);
				}
				self.items=[];
			},
			showmsg:function(msg){
				var self=this;
				self.msg.html(msg);
				self.msg.show("300");
				window.setTimeout(function(){
					self.msg.hide("300");
				},1000);
			},
			createImg:function(o){//create upload img picture.
				var self=this;
				var item={};
				item.data=o;
				var location=window.location+"";
				var url="http://192.168.1.82/file/files/"+o.pic;
				item.dom=$("<div class='item'><img class='animate' src='"+url+"'alt='img' /><div class='delcon'><div class='delbg'></div><div class='del'></div></div></div>");
				item.del=item.dom.find(".del");
				item.delcon=item.dom.find(".delcon");
				item.img=item.dom.find("img");
				item.del.click(function(){
					   $.post(""+self.settings.action+"?act=delimg",{name:o.pic},function(msg){ 
						if(msg==1){ 
							self.deleteItem(item);
						}else{ 
							alert(msg); 
						} 
					});
				});
				item.dom.mouseover(function(){
					item.delcon.show();
				})
				item.dom.mouseout(function(){
					item.delcon.hide();
				})
				self.addFile.before(item.dom);
				self.items.push(item);
			},
			addItems:function(o){//upload img save to the self.itmes array.
				var self=this;
				self.items.push(o);
			},
			jsonToString:function(data){ //json to string
				if(data.length==0) return str;
				var temp=[];
				for(var i=0;i<data.length;i++){
					var str="option"+i+":"+JSON.stringify(data[i]);
					temp.push(str);
				}
				var s=temp.join(",");
				return "{"+s+"}";
			},
			submit:function(){ //submit upload file.
				var self=this;
				if(self.settings.onSubmit)self.settings.onSubmit.call(self);
				var data=[];
				for(var i=0;i<self.items.length;i++){
					data.push(self.items[i].data);
				}
				$.ajax({
						type: "get",
						url: self.settings.action,
						data:{"option":data,act:"saveimg"},
						contentType:self.settings.contentType ,
						dataType:self.settings.responseType,
						success: function (data) {
							if(data==1){
								self.removeAll();
								self.showmsg("上传成功！！");
							}
						},
						error: function (msg) {
							alert(msg+"  adfasdf");
						}
					});
			}
			
		}

	}
)(bshare)