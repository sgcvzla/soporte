<?php
// get the q parameter from URL
    $q = $_REQUEST["p"];
	$fields=array("cliente","tiket","sistema","modulo","tipo","severidad", "fecha de asignacion", "tecnico", "status", "descripcion");

    $row1=array( "hansel moreno", "1111", "monos", "meme", "nulo", "1", "19-12-2018", "julio riera", "en progreso","fgffffffffffffffffffsgdfgfdg fgh dfhfdh  hfghg fgh fgh fgh hdfghfghdf ");
    $row2=array( "hansel moreno", "1111", "monos", "meme", "nulo", "1", "19-12-2018", "julio riera", "en progreso","fgffffffffffffffffffsgdfgfdg fgh dfhfdh  hfghg fgh fgh fgh hdfghfghdf ");
    $row3=array( "hansel moreno", "1111", "monos", "meme", "nulo", "1" ,"19-12-2018", "julio riera", "en progreso","fgffffffffffffffffffsgdfgfdg fgh dfhfdh  hfghg fgh fgh fgh hdfghfghdf ");
    $row4=array( "hansel moreno", "1111", "monos", "meme", "nulo", "1", "19-12-2018", "julio riera", "en progreso","fgffffffffffffffffffsgdfgfdg fgh dfhfdh  hfghg fgh fgh fgh hdfghfghdf ");

    $datos=array( $row1, $row2, $row3, $row4);

    $out=array($fields,$datos);
    

	echo json_encode($out);
?>