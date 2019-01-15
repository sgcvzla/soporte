<?php
    include "Conexion.php";
    include "fechMeta.php";

    $Config=$_REQUEST["cjson"];
    $call=$_REQUEST["call"];

    $Rjson= json_decode ($Config,true);
	$keys = array_keys($Rjson);
	$retorno =array();
	for($a=0; $a <count($Rjson) ; $a++){
		$type=$keys[$a];
		$typedata=array();
		$cards=$Rjson[$keys[$a]];
		$cardsKeys = array_keys($cards);


		for ($b=0; $b <count($cards) ; $b++) { 
			$datos		= $cards[$cardsKeys[$b]];
			$name		= $cardsKeys[$b];
			$Query 		= $datos[0];
			$db			= $datos[1];
			$table		= $datos[2];
			$condision	= " ";
			$queryAsempler=" ";

			if( $call==0 ){
				if($type=="card"){
					if(count($datos)>3){
						$condision	= $datos[3];
						$queryAsempler=$Query." ".$table." where ".$condision;
					}else{
						$queryAsempler=$Query." ".$table;
					}
				}else{
					$queryAsempler=$Query." ".$table;
				}
			}else if($call==1){
				if(count($datos)>3){
					$condision	= $datos[3];
					$queryAsempler=$Query." ".$table." where ".$condision;
				}else{
					$queryAsempler=$Query." ".$table;
				}
			}
			
			
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

					array_push($rowArr,$collBuff);

				}
				array_push($datos,$rowArr);
			}
			$salida=array($cols,$datos);
			$typedata[$name]=$salida;
			$resultset->closeCursor();
			$link=null;
		}
		$retorno[$type]=$typedata;
	}
	print_r(json_encode($retorno,JSON_UNESCAPED_UNICODE ));
?>