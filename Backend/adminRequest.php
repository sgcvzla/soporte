<?php
    include "Conexion.php";
    include "FetchColumns.php";

    $Query = $_REQUEST["Query"];
    $db=$_REQUEST["db"];
    $table=$_REQUEST["table"];
    
	$link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
	$resultset=$link->prepare("SELECT * FROM ".$table);
	$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));
	$meta=getMeta($db,$table,$link);
	$op=$resultset->fetchAll();

	$mainSize=count($op)-1;
	$datos= array();
	for($i=0;$i<=$mainSize;$i++){
		$rowsBuf=$op[$i];
		$RowSize=count($meta);
		$rowArr= array();

		for($j=0;$j<=$RowSize-1;$j++){
			$collBuff=$rowsBuf[$j];
			  
			array_push($rowArr,$collBuff);

		}
		array_push($datos,$rowArr);
	}
    $salida=array($meta,$datos);

	print_r(json_encode($salida,JSON_UNESCAPED_UNICODE ));
	$resultset->closeCursor();
	$link=null;
?>