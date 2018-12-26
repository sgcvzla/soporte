function cargar() {
	var paramstr = window.location.search.substr(1);
	var paramarr = paramstr.split("=");
	ticket = paramarr[1];
	document.getElementById("ticket").value = ticket;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			respuesta = JSON.parse(this.responseText);
			if (respuesta.exito=='SI') {
				document.getElementById('fechaticket').value = respuesta.ticket.fechaticket;
				document.getElementById('cliente').value = respuesta.ticket.cliente;
				document.getElementById('sistema').value = respuesta.ticket.sistema;
				document.getElementById('modulo').value = respuesta.ticket.modulo;
				document.getElementById('tipo').value = respuesta.ticket.tipo;
				document.getElementById('detalles').value = respuesta.ticket.detalles;
				document.getElementById('impacto').value = respuesta.ticket.impacto;
				document.getElementById('nombre').value = respuesta.ticket.nombre;
				document.getElementById('email').value = respuesta.ticket.email;
				document.getElementById('telefono').value = respuesta.ticket.telefono;
				document.getElementById('severidad').value = respuesta.ticket.severidad;

				if (respuesta.consultores != undefined) {
					for (i = 0; i < respuesta.consultores.length; i++) {
						var sel = document.createElement("option");
						var txt = document.createTextNode(respuesta.consultores[i].nombre);
						sel.appendChild(txt);
						sel.value = respuesta.consultores[i].id;
						document.getElementById('asignado').appendChild(sel);
					}
					document.getElementById('asignado').value = respuesta.consultores[0].id
				}
			} else {
				alert("El ticket ya fue asignado, cerrado o no existe");
			}
		}
	};
	xmlhttp.open("GET", "buscaticket.php?ticket="+ticket, true);
	xmlhttp.send();
}

function fenviar() {
	var datos = new FormData();
	datos.append("ticket", document.getElementById("ticket").value);
	datos.append("severidad", document.getElementById("severidad").value);
	datos.append("prioridad", document.getElementById("prioridad").value);
	datos.append("respuesta", document.getElementById("respuesta").value);
	datos.append("asignado", document.getElementById("asignado").value);
	datos.append("plandeaccion", document.getElementById("plandeaccion").value);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			respuesta = JSON.parse(this.responseText);
			if (respuesta.exito == 'SI') {
				mensaje = "Transacción registrada exitosamente.";
				alert(mensaje);
				flimpiar();
			} else {
				alert("Falló el registro de la transacción");
			}
		}
	};
	xmlhttp.open("POST", "registrarespuesta.php", true);
	xmlhttp.send(datos);
}

function flimpiar() {
	document.getElementById('severidad').value = 3;
	document.getElementById('prioridad').value = 1;
	document.getElementById('respuesta').value = '';
	document.getElementById('asignado').value = '';
	document.getElementById('plandeaccion').value = '';
}
