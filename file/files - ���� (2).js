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
			this.file.wrap("<form id='myupload' action='monthed.php' method='post' enctype='multipart/form-data'></form>"); 
			
			this.file.change(function(e){
				 $("#myupload").ajaxSubmit({ 
					dataType:  'json', 
					beforeSend: function() { 
						var percentVal = '0%'; 
						bar.width(percentVal);  
						percent.html(percentVal); 
						
					}, 
					uploadProgress: function(event, position, total, percentComplete) { 
						var percentVal = percentComplete + '%'; 
						bar.width(percentVal);
						percent.html(percentVal); 
					}, 
					success: function(data) { 
						self.createItems(data);
					}, 
					error:function(xhr){ 
						
						bar.width('0'); 
						
					} 
				}); 
			}); 
		
			this.createItems=function(file){
				//if(file.length>0){
					//for(var i=0,n=file.length;i<n;i++){
						//var item={name:file[i].name,type:self.getExt(file[i].type),size:file[i].size}
					//	self.addItems(file);
						//self.createImg(file);
					//}
				//}
				self.addItems(file);
				self.createImg(file);
			}
			this.fileviewCon[0].ondrop=function(e){
				 if(e.dataTransfer.files){
					var file=e.dataTransfer.files;
					self.createItems(file);
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
			addFileFun:function(){
				var self=this;
				self.file.click();
			},
			createImg:function(o){
				var self=this;
				var location=window.location+"";
				var url="http://localhost/file/files/"+o.pic;
				var item=$("<div class='item'><img src='"+url+"'alt='img' /></div>");
				self.addFile.before(item);
			},
			addItems:function(o){
				var self=this;
				self.items.push(o);
			},
			jsonToString:function(data){
				if(data.length==0) return str;
				var temp=[];
				for(var i=0;i<data.length;i++){
					var str="option"+i+":"+JSON.stringify(data[i]);
					temp.push(str);
				}
				var s=temp.join(",");
				return "{"+s+"}";
			},
			submit:function(){
				var self=this;
				if(self.settings.onSubmit)self.settings.onSubmit.call(self);
				$.ajax({
						type: "get",
						url: self.settings.action,
						data:{"option":self.items},
						contentType:self.settings.contentType ,
						dataType:self.settings.responseType,
						success: function (data) {
							for(var i=0,n=data.length;i<n;i++){
								self.createImg(data[i]);
							}
						},
						error: function (msg) {
							//alert(msg+"  adfasdf");
						}
					});
			}
			
		}

	}
)(bshare)