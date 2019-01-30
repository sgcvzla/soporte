<?php
	include "Conexion.php";
    include "fechMeta.php";

    $correo =$_POST["correo"];
    $pass=$_POST["pass"];
    $db=$_POST["db"];
	
	$queryAsempler="SELECT nombre FROM consultores WhERE  contracena =:pass AND email=:email";

    $link = Conexion::obtenerInstancia("127.0.0.1:3307","root","REny0408",$db);
    $resultset=$link->prepare($queryAsempler);
    $valor=$resultset->execute([':pass' => $pass,':email' => $correo]) or die (print_r($db->errorInfo(), true));
    $op=$resultset->fetchAll();
    if(count($op)<1){
    	Print_r("correo o cntraseña invalido");
    }else{
    	Print_r($op[0]["nombre"]);
    }
?>

