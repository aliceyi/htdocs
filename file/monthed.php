
<?

	function multiple(array $_files, $top = TRUE)
	{
		
		$files = array();
		 foreach($_files as $name=>$file){
			 if($top) $sub_name = $file['name'];
			 else    $sub_name = $name;
			 
			if(is_array($sub_name)){
				 foreach(array_keys($sub_name) as $key){
					 $files[$name][$key] = array(
						 'name'     => $file['name'][$key],
						 'type'     => $file['type'][$key],
						 'tmp_name' => $file['tmp_name'][$key],
						 'error'    => $file['error'][$key],
						 'size'     => $file['size'][$key],
					 );
					 $files[$name] = multiple($files[$name], FALSE);
					 upload($files[$name][$key]);
				 }
			 }else{
				 $files[$name] = $file;
			 }
		 }
		return $files;
	}
	$temp=array();
	
	function upload(array $f){
		$picname = $f['name']; 
		$picsize = $f['size']; 
		if ($picname != "") { 
			
			$type = strstr($picname, '.'); //限制上传格式 
			if ($type != ".gif" && $type != ".jpg" && $type !=".png") { 
				echo '图片格式不对'; 
				exit; 
			} 
			$rand = rand(100, 999); 
			$pics = date("YmdHis") . $rand . $type; //命名图片名称 
			//上传路径 
			$pic_path = "files/". $pics; 
			move_uploaded_file($f['tmp_name'], $pic_path); 
			$size = round($picsize/1024,2); //转换成kb 
			$arr = array( 
				'name'=>$picname, 
				'pic'=>$pics, 
				'size'=>$size 
			); 
			
			array_push($GLOBALS["temp"],$arr);
		}
	}
	
	function save(array $option){
		 $con = mysql_connect("192.168.1.82","root","123456");
		 if (!$con)
		 {
			die('Could not connect: ' . mysql_error());
		 }
		
		mysql_select_db("my_db", $con);
		for($i=0;$i<count($option);$i++){
		
			$sql='INSERT INTO files (id, name)VALUES("'. $i .'","'.$option[$i]["pic"].'")';
			if (!mysql_query($sql,$con))
			{
			  die('Error: ' . mysql_error());
			}
		}
		mysql_close($con);
		$msg="1";
		echo $msg;
		return $msg;
	}
	
	$action = $_GET['act']; 
	if($action=='delimg'){ //删除图片 
		$filename = $_POST['name']; 
		$msg="";
		if(!empty($filename)){ 
			unlink('files/'.$filename); 
			$msg="1";
			echo '1'; 
		}else{ 
			$msg='删除失败.';
			echo '删除失败.'; 
		} 
		return $msg;
	}else if($action =='saveimg'){
		$msg=save($_GET["option"]);
		return $msg;
	}else{
		$filesa = multiple($_FILES);
		echo json_encode($temp); //输出json数据 
		return $temp;
	}
	

	
?>



<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset="utf-8" />
	<title></title>
</head>
<body>
	<!-- 
		if ($picsize > 512000) { //限制上传大小 
				echo '上传的文件不能大于500k'; 
				exit; 
			} 
	
	$option=$_GET["option"];
	 $con = mysql_connect("192.168.1.82","root","123456");
	 if (!$con)
	 {
		die('Could not connect: ' . mysql_error());
	 }
	
	mysql_select_db("my_db", $con);
	for($i=0;$i<count($option);$i++){
	
		$sql='INSERT INTO files (id, name)VALUES("'. $i .'","'.$option[$i]["name"].'")';
		echo $sql;
		if (!mysql_query($sql,$con))
		{
		  die('Error: ' . mysql_error());
		}
	}
	
	echo ''.count($option) .'"record added"';
	mysql_close($con); -->

	<script type="text/javascript">
		alert(2);
	</script>
</body>
</html>