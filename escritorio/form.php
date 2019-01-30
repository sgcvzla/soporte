<?php
    include "Backend/Conexion.php";
    include "Backend/fechMeta.php";

	$jsonRequest=$_REQUEST["cJson"];
	$db=$_REQUEST["db"];
	$json=json_decode($jsonRequest);

	switch ($json->option) {
		case 'form':{
			loadForm($json,$db);
		}break;
		case 'option':{
			loadOption($json,$db);
		}break;
		case 'operador':{
			saveOperador($json,$db);
		}break;
		default:{
			echo "error";
		}break;
	}

	function loadConsultores($json,$db){
		$name		= "options";
		$Query 		= "SELECT id , nombre FROM";
		$table		= "consultores";
		$condision	= " ";
		$queryAsempler=" ";
		$queryAsempler=$Query." ".$table;

		$link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
		$resultset=$link->prepare($queryAsempler);
		$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));

		$meta=getColl($db,$table,$link);
		$RowSize=$resultset->columnCount();			
		$cols=array();

		if (strpos($Query,"SELECT * FROM") !== false) {
			for($i=0;$i<$RowSize;$i++){
				array_push($cols,$meta[$i]);
			}
		}else{
			for($i=0;$i<count($meta);$i++){
				if (strpos($Query,$meta[$i]." ") !== false) {
					array_push($cols,$meta[$i]);
				}
			}
		}

		$op=$resultset->fetchAll();

		$mainSize=count($op)-1;
		$datos= array();
		for($i=0;$i<=$mainSize;$i++){
			$rowsBuf=$op[$i];
			$rowArr= array();

			for($j=0;$j<=$RowSize-1;$j++){
				$collBuff=$rowsBuf[$j];
				if($collBuff===null){
					array_push($rowArr,"nulo");
				}else{
					array_push($rowArr,$collBuff);
				}

			}
			array_push($datos,$rowArr);
		}
		$salida=array($cols,$datos);
		$resultset->closeCursor();
		$link=null;
		return $salida;
	}

	function loadOption($json,$db){
		$name		= "asignado";
		$Query 		= "SELECT asignado FROM";
		$table		= "tickets";
		$condision	= " ";
		$queryAsempler=" ";
		$queryAsempler=$Query." ".$table." where ticket=".$json->tiket;

		$link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
		$resultset=$link->prepare($queryAsempler);
		$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));

		$meta=getColl($db,$table,$link);
		$RowSize=$resultset->columnCount();			
		$cols=array();

		if (strpos($Query,"SELECT * FROM") !== false) {
			for($i=0;$i<$RowSize;$i++){
				array_push($cols,$meta[$i]);
			}
		}else{
			for($i=0;$i<count($meta);$i++){
				if (strpos($Query,$meta[$i]." ") !== false) {
					array_push($cols,$meta[$i]);
				}
			}
		}

		$op=$resultset->fetchAll();

		$mainSize=count($op)-1;
		$datos= array();
		for($i=0;$i<=$mainSize;$i++){
			$rowsBuf=$op[$i];
			$rowArr= array();

			for($j=0;$j<=$RowSize-1;$j++){
				$collBuff=$rowsBuf[$j];
				if($collBuff===null){
					array_push($rowArr,"nulo");
				}else{
					array_push($rowArr,$collBuff);
				}

			}
			array_push($datos,$rowArr);
		}
		$salida=array($cols,$datos);
		$typedata[$name]=$salida;
		$typedata["options"]=loadConsultores($json,$db);
		$resultset->closeCursor();
		$link=null;



		print_r(json_encode($typedata,JSON_UNESCAPED_UNICODE));
	}

	function loadForm($json,$db){
		$check_list=$json->check_list;
		$tiket=$json->tiket;
		$mensage=$json->mensage;
		$remitent=$json->remitente;
		$check="";

		for ($i=0; $i <count($check_list) ; $i++) { 
			if($i==0 && $check_list[0]==true){
				$check.="cliente"."-";
			}
			if($i==1 && $check_list[1]==true){
				$check.="Operador";
			}	
		}

		$queryAsempler="INSERT INTO historial (ticket, detalles, remitente, destinatario, fechastatus) VALUES (".$tiket.",\"".$mensage."\",\"".$remitent."\",\"".$check."\",CURDATE()) ;";

		$link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
		$resultset=$link->prepare($queryAsempler);
		$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));

		print_r("operación exitosa");
	}


	
	function saveOperador($json,$db){
		$tiket=$json->tiket;
		$operad=$json->newOperador;
		$check="";

		$queryAsempler="UPDATE tickets SET asignado =".$operad." WHERE ticket=".$tiket;

		$link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
		$resultset=$link->prepare($queryAsempler);
		$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));

		print_r("operación exitosa");
	}

	

?>