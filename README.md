<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>SGC Consultores - Soporte técnico</title>
	<link rel="stylesheet" href="">
<style>
	* {
		margin: 0;
		padding:0;
	}
	.logo {
		margin-top: 10px;
		height: 10em;
		width: 12em;
		text-align: center;
/*		display: flex;
		align-items: center;
		justify-content: center;
*/	}
	img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}
	#container {
		padding: 1em;
		margin: auto;
		width: 38%;
		min-width: 400px;
		background: lightgray;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.cmps {
		padding: 0.5em 0 0 0;
		display: flex;
		flex-direction: row;
	}
	.etiq {
		width: 37.5%;
		height: 20px;
		justify-content: middle;
	}
	.campo {
		height: 20px;
	}
	.selec {
		height: 20px;
	}
	.btns {
		padding-top: 0.5em;
		text-align: right;
	}
	@media only screen and (max-width: 1260px) {
		.logo {
			padding-bottom: 0.5em;
		}
		h3 {
			padding-bottom: 0.5em;
		}
		.cmps {
			padding: 0 0 2.25em 0;
		}
	}
</style>
</head>
<body>
	<div align="center">
		<div class="logo">
			<img src="https://www.sgc-consultores.com.ve/img/sgc.jpg" alt="SGC Consultores C.A.">
		</div>
	</div>
	<div id="container">
		<h3 align="center">Abrir un ticket de soporte</h3>
		<div class="cmps">
			<span class="etiq">Cliente</span>
			<input id="cliente" class="campo" type="text" size="50" maxlength="100" />
		</div>
		<div class="cmps">
			<span class="etiq">Sistema</span>
			<input id="sistema" class="campo" type="text" size="50" maxlength="100" />
		</div>
		<div class="cmps">
			<span class="etiq">Módulo</span>
			<input id="modulo" class="campo" type="text" size="50" maxlength="100" />
		</div>
		<div class="cmps">
			<span class="etiq">Tipo de solicitud</span>
			<select id="tipo" class="selec" >
				<option value="nuevo">Nuevo requerimiento</option>
				<option value="falla">Reportar falla</option>
				<option value="mejor">Oportunidad de mejora</option>
				<option value="comen">Comentario</option>
			</select>
		</div>
		<div class="cmps">
			<span class="etiq">Detalles:</span>
			<textarea id="detalles" rows="5" style="width: 62.5%;" maxlength="250"></textarea>
		</div>
		<div class="cmps">
			<span class="etiq">Impacto sobre el negocio (*):</span>
			<select id="impacto" class="selec">
				<option value="bajo">No tiene impacto significativo</option>
				<option value="medio">Impacto medio (no compromete el negocio)</option>
				<option value="alto">Impacto alto (puede ocasionar perjuicio)</option>
			</select>
		</div>
		<div class="cmps">
			<p align="justified">(*) Esta respuesta será evaluada por el servico técnico y se asignará la severidad adecuada en función al acuedo de nivel de servicio.</p>
		</div>	
		<div class="cmps">
			<span class="etiq">Nombre de quien reporta:</span>
			<input id="nombre" class="campo" type="text" size="50" maxlength="100" />
		</div>
		<div class="cmps">
			<span class="etiq">correo electrónico:</span>
			<input id="email" class="campo" type="email" size="50" maxlength="100" title="Debe introducir un formato de email válido (incluir el @)" />
		</div>
		<div class="cmps">
			<span class="etiq">Teléfono de contacto:</span>
			<input id="telefono" class="campo" type="text" size="50" maxlength="100" />
		</div>
		<div class="btns">
			<button id="enviar" onclick="fenviar()" style="width: 7em;">Enviar</button>
			<button id="limpiar" onclick="flimpiar()" style="width: 7em;">Limpiar</button>
		</div>
	</div>
<script>
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
</script>
</body>
</html>
