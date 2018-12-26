<?php
    function getColl($db,$table,$conn) {
    	$Query ="SHOW COLUMNS FROM ".$table;
    	$resultset=$conn->prepare($Query);
    	$valor=$resultset->execute() or die (print_r($db->errorInfo(), true));
    	$data= array();

		$op=$resultset->fetchAll(PDO::FETCH_COLUMN,0);

		return $op;
	}
?>