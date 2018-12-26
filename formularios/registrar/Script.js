
function fenviar() {
	var datos = new FormData();
	datos.append("cliente", document.getElementById("cliente").value);
	datos.append("sistema", document.getElementById("sistema").value);
	datos.append("modulo", document.getElementById("modulo").value);
	datos.append("tipo", document.getElementById("tipo").value);
	datos.append("detalles", document.getElementById("detalles").value);
	datos.append("impacto", document.getElementById("impacto").value);
	datos.append("nombre", document.getElementById("nombre").value);
	datos.append("email", document.getElementById("email").value);
	datos.append("telefono", document.getElementById("telefono").value);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			respuesta = JSON.parse(this.responseText);
			if (respuesta.exito=='SI') {
				mensaje = "Transacción registrada exitosamente, se generó el ticket No."+respuesta.ticket+"\nSu solicitud será evaluada y se asignará una prioridad en función de\nsu severidad, recibirá un email con más detalles y los próximos pasos.";
				alert(mensaje);
				flimpiar();
			} else {
				alert("Falló el registro de la transacción");
			}
		}
	};
	xmlhttp.open("POST", "registraticket.php", true);
	xmlhttp.send(datos);
}

function flimpiar() {
	document.getElementById('cliente').value = '';
	document.getElementById('sistema').value = '';
	document.getElementById('modulo').value = '';
	document.getElementById('tipo').value = 'nuevo';
	document.getElementById('detalles').value = '';
	document.getElementById('impacto').value = 'bajo';
	document.getElementById('nombre').value = '';
	document.getElementById('email').value = '';
	document.getElementById('telefono').value = '';
}
