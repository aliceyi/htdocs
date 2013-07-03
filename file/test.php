<?
	$arr=array();
	
	function a(){
		array_push($GLOBALS['arr'],array("a","c"));
		array_push($GLOBALS['arr'],array("c","d"));
	}
	a();
	echo json_encode($arr);
	

	
?>