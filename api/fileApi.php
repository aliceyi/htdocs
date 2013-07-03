<link rel="stylesheet" href="../file/css/files.css" />
<div>
	<div class="descript" > 
		<h3 class="h3" >上传组件</h3>
		<div class="clear spacer10" ></div>
		<p class="text">
			<div class="spacer_left10" >
			<h3 class="h3" >JS创建方法</h3>
			<div class="clear spacer10" ></div>
			<div style="color:#858590">
				<pre>var files=new bshare.Files({
		action:"../file/monthed.php",
		container:$("#fileContainer"),
		name: 'tempFile',
		responseType: "json",
		onSubmit:function(){
		},
		onChange:function(){},
		onComplete:function(){}
	})</pre>
			</div>
			<div class="clear spacer10" ></div>
		</div>
		<div class="clear spacer10" ></div>
		<div class="spacer_left10 ">
			<h3 class="h3" >属性</h3>
			<div class="clear spacer10" ></div>
			<div style="color:#858590">
<pre>
action:String 设置组件的操作，与后台交互的action

container:Object 设置存放组件的容器

responseType:String 设置组件上传数据类型,目前只支持json格式

onSubmit:Function 设置文件上传时的扩展函数

onChange:Function 设置上传组件文件发生变化的扩展函数

onComplete:Function 设置上传组件文件上传完成后的扩展函数

</pre>				
			</div>
			
		</div>
		<div class=" spacer_left10 ">
		<div class="clear spacer10" ></div>
			<h3 class="h3" >方法</h3>
			<div class="clear spacer10" ></div>
			<div style="color:#858590">
<pre>


</pre>				
			</div>
			
		</div>
		</p>
	</div>
	<div class=" spacer15"></div>
	<div class="commonList " id="commonList">
		<h3 class="h3">DEMO SHOW</h3>
		<div class="spacer15"></div>
		<div id="fileContainer" class="fileContainer">
		<div class="fileView animate" ondragenter="return false" ondragover="return false" >
			<div id="addFile" class="addFile animate" title="点击添加图片" >
				<span>+</span> 
			</div>
			<div id="msg"></div>
		</div>
		<div class="fileBtnCon">
			<input id="file" name="filesUploaded[]" multiple="true" type="file" />
			<input id="fileBtn" class="fbtn " type="button" value="上传图片"/>
			<input id="fileSubmit" class="fbtn blue" type="button" value="确认上传"/>
		</div>	
		</div>

	</div>
	</div>
</div>
<script type="text/javascript" src="../file/js/jquery-1.7.min.js"></script>
<script type="text/javascript" src="../file/js/jquery.form.js"></script>
<script type="text/javascript" src="../file/js/files.js"></script>
<script type="text/javascript" src="../file/js/json2.js"></script>
<script type="text/javascript">
	var files=new bshare.Files({
		action:"../file/monthed.php",
		container:$("#fileContainer"),
		name: 'tempFile',
		responseType: "json",
		onSubmit:function(){
		},
		onChange:function(){},
		onComplete:function(){}
	})
</script>
