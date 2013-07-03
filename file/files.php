<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="./css/files.css" />
	<script type="text/javascript" src="./js/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="./js/files.js"></script>
	<script type="text/javascript" src="./js/json2.js"></script>
	<script type="text/javascript" src="./js/jquery.form.js"></script>
</head>
<body>
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
	
	<script type="text/javascript">
		var files=new bshare.Files({
			action:"./monthed.php",
			container:$("#fileContainer"),
			name: 'tempFile',
			responseType: "json",
			onSubmit:function(){
			},
			onChange:function(){},
			onComplete:function(){}
		})
	</script>
</body>
</html>