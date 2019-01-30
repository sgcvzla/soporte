
var config;
var op;

document.addEventListener('click',function(e){
    colapseRow(e);
}, false);

document.addEventListener("DOMContentLoaded", function(){
    var paramstr = window.location.search;
    console.log(paramstr);
    loadCards();
});

setInterval(function(){
    if(op!=null){
        loadHistory(op.textContent);
        loadOptions(op.textContent);
    }
}, 10000);

function colapseRow(e){
    e = e || window.event;
    var target = e.target || e.srcElement, text = target.textContent || target.innerText;
    if(target.matches('.title')){
        var parent=target.parentNode;

    	for(var i=0;i<parent.childNodes.length;i++){
        	var child =parent.children[i];
            if(child!=null){
	        	if(child.className =='dataBlock'){
                    var right=document.getElementsByClassName("formSeg");
                    var asign=false;
                    for(var a=0;a<child.childNodes.length;a++){
                        var child2Child =child.children[i];
                        var text=child.textContent;
                        if(text.includes("Asignado")){
                            asign=true;
                        }                        

                    }
                    if((child.style.display==null)||(child.style.display=="")){
                        child.style.display="inherit";
                        if(asign){
                            right[0].style.display="flex";
                        }else{
                            right[1].style.display="flex";
                            document.getElementById("ticket").value=target.textContent.split(":")[1];                        

                        }

                        op=target;

                    }else{
    	        		if(child.style.display=="none"){
    	        			child.style.display="inherit";
                            if(asign){
                                right[0].style.display="flex";                        
                            }else{
                                right[1].style.display="flex";
                                document.getElementById("ticket").value=target.textContent.split(":")[1];                        

                            }
                            op=target;

    	        		}else{ 
    	        			child.style.display="none";
                            if(asign){
                                right[0].style.display="none";                        
                            }else{
                                right[1].style.display="none";
                            }
                            op=null;

    	        		}
                    }
	        	}else if(child.className =='title'){
                    loadHistory(target.textContent);
                    loadOptions(target.textContent);
                }
            }
    	}
    }
}

function loadCards() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var left=document.getElementsByClassName("Left");
            var amount=left.length;

            var response=xmlhttp.responseText;
            var jsonParsed=JSON.parse(response);
            //var jsonParsedKeys=Object.keys(jsonParsed);

            for(var aa=0;aa<amount;aa++){
                var cont=jsonParsed["card"];

                var contkeys=Object.keys(cont);


                for(var b=0;b<contkeys.length;b++){
                    var dataname=contkeys[b];
                    var data=cont[dataname];

                    var campos=data[0];
                    var registros=data[1];
                    var dataLength=registros.length;

                    var contenedor = document.createElement("DIV");
                    contenedor.classList.add("containerC");

                    for(var c=0;c<dataLength;c++){
                        var fila=registros[c];

                        var card = document.createElement("DIV");
                        card.classList.add("card");

                        var name = document.createElement("DIV");
                        name.classList.add("title");
                        name.appendChild(document.createTextNode(""+campos[0]+":"+fila[0]));
                        card.appendChild(name);

                        var tiket = document.createElement("DIV");
                        tiket.classList.add("key");
                        tiket.appendChild(document.createTextNode(""+campos[1]+":"+fila[1]));
                        card.appendChild(tiket);

                        var block = document.createElement("DIV");
                        block.classList.add("dataBlock");
                        card.appendChild(block);


                        var rLength=fila.length;
                        for(var d=2;d<rLength;d++){
                            var field=campos[d];
                            var data=fila[d];

                            if(field=="descripcion"){
                                var description = document.createElement("DIV");
                                description.classList.add(field);
                                block.appendChild(description);

                                var p = document.createElement("p");
                                p.appendChild(document.createTextNode(data));
                                description.appendChild(p);
                            }else{
                                var divdata = document.createElement("DIV");
                                divdata.classList.add("data");
                                divdata.appendChild(document.createTextNode(""+field+":"+data));
                                block.appendChild(divdata); 
                            }
                        }
                        contenedor.appendChild(card);
                    }
                    left[aa].appendChild(contenedor);
                }
            }

            

        }

    };
    xmlhttp.open("POST","Backend/adminRequest.php",true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var txt=readTextFile(xmlhttp,0,"");
}

function loadOptions(target){
    optionhttp = new XMLHttpRequest();
    optionhttp.onreadystatechange = function() {
        if (optionhttp.readyState == 4 && optionhttp.status == 200) {
            var response=optionhttp.responseText;
            var jsonParsed=JSON.parse(response);

            var operadList=document.getElementsByClassName("selec");
            var amount=operadList.length;
            var operad=jsonParsed["asignado"][1][0][0];
            var select=0;

            for(var aa=0;aa<amount;aa++){
                var cont=jsonParsed["options"];
                var options=cont[1];

                while (operadList[aa].childNodes.length>0) {
                    operadList[aa].childNodes[0].remove();
                }
                for (var b=0;b<options.length;b++) {
                    var rows=options[b];

                    var option = document.createElement("option");
                    option.text = rows[1];
                    if(rows[1]==operad){
                        select=b;
                    }
                    operadList[aa].add(option);

                }
                operadList[aa].selectedIndex =select;
            }
        }
    };
    var jsonS={};
    var spl=target.split(":");

    jsonS["option"]="option";
    jsonS["tiket"]=spl[1];

    var JSend=JSON.stringify(jsonS);


    optionhttp.open("POST","form.php",true);
    optionhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    optionhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    optionhttp.send("cJson="+JSend+"&db=sgcconsu_sgcvzla");

}

function loadHistory(user){
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var nameform=document.getElementsByClassName("nameform");
            while (nameform[0].childNodes.length>0) {
                nameform[0].childNodes[0].remove();
            }
            nameform[0].appendChild(document.createTextNode(user));

            var history=document.getElementsByClassName("historial");
            var amount=history.length;


            var response=xmlhttp.responseText;
            var jsonParsed=JSON.parse(response);

            for(var aa=0;aa<amount;aa++){

                while (history[aa].childNodes.length>0) {
                    history[aa].childNodes[0].remove();
                }

                var cont=jsonParsed["historia"];
                var contkeys=Object.keys(cont);

                for(var b=0;b<contkeys.length;b++){
                    var dataname=contkeys[b];
                    var data=cont[dataname];

                    var campos=data[0];
                    var registros=data[1];
                    var dataLength=registros.length;

                    for(var c=0;c<dataLength;c++){
                        var fila=registros[c];
                        var fieldText=fila[1];
                        var dataText=fila[0];

                        var message = document.createElement("DIV");
                        message.classList.add("message");

                        var field = document.createElement("DIV");
                        field.classList.add("field");
                        field.appendChild(document.createTextNode(fieldText+": "));
                        message.appendChild(field);

                        var texto = document.createElement("DIV");
                        texto.classList.add("dataH");
                        texto.appendChild(document.createTextNode(dataText));
                        message.appendChild(texto);

                        history[aa].appendChild(message);                    
                    }

                }
            }
        }
    };
    xmlhttp.open("POST","Backend/adminRequest.php",true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var txt=readTextFile(xmlhttp,1,user);
}

function readTextFile(xmlhttp,call,user){
    var rawFile = new XMLHttpRequest();
    var r;
    var response;

    rawFile.onreadystatechange = function (){
        if (rawFile.readyState == 4 && rawFile.status == 200) {
            if(call==0){
                r=rawFile.responseText;
                response=JSON.parse(r);
                xmlhttp.send("cjson="+r+"&call="+call);


            }
            if(call==1){
                r=rawFile.responseText;
                response=JSON.parse(r);

                var contkeys=Object.keys(response["historia"]);
                var where =response["historia"][contkeys[0]][3];
                var spl=user.split(":");
                response["historia"][contkeys[0]][3]=where+"\""+spl[1]+"\"";
                xmlhttp.send("cjson="+JSON.stringify(response)+"&call="+call);
            }

            
        }
    }
    rawFile.open("GET","Backend/init.php",true);
    rawFile.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    rawFile.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    rawFile.send();
}

/*
*metodos de historial
*/
function sendForm(){
  var sendHttp= new XMLHttpRequest();

  sendHttp.onreadystatechange = function() {
    if (sendHttp.readyState == 4 && sendHttp.status == 200)
            alert(sendHttp.responseText); // Here is the response
    }

    var jsonS={};
    var boxChecked=new Array();

    var check_list = document.forms["cmpsForm"].elements["check_list[]"];
    var respuesta = document.forms["cmpsForm"].elements["respuesta"].value;

    for(var i=0;i<check_list.length;i++){
        boxChecked.push(check_list[i].checked);
    }
    var spl=document.getElementsByClassName("nameform")[0].textContent.split(":");

    jsonS["option"]="form";
    jsonS["tiket"]=spl[1];
    jsonS["mensage"]=respuesta;
    jsonS["remitente"]="Admin";
    jsonS["check_list"]=boxChecked;

    console.log(jsonS);
    var JSend=JSON.stringify(jsonS);

    sendHttp.open("POST","form.php", true);
    sendHttp.setRequestHeader('X-Requested-With', 'sendHttpRequest');
    sendHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    sendHttp.send("cJson="+JSend+"&db=sgcconsu_sgcvzla");
}

function sendOperador(){
  var sendHttp= new XMLHttpRequest();

  sendHttp.onreadystatechange = function() {
    if (sendHttp.readyState == 4 && sendHttp.status == 200)
            alert(sendHttp.responseText); // Here is the response
    }

    var jsonS={};
    var spl=document.getElementsByClassName("nameform")[0].textContent.split(":");
    var newOperador=document.getElementsByClassName("selec")[0].value;
    console.log(newOperador);

    jsonS["option"]     ="operador";
    jsonS["tiket"]      =spl[1];
    jsonS["newOperador"]="\""+newOperador+"\"";

    var JSend=JSON.stringify(jsonS);

    sendHttp.open("POST","form.php", true);
    sendHttp.setRequestHeader('X-Requested-With', 'sendHttpRequest');
    sendHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    sendHttp.send("cJson="+JSend+"&db=sgcconsu_sgcvzla");
}

function validateFormOnSubmit() {
    var contact= document.forms["cmpsForm"];
    reason = "";
    //reason += validateName(contact.name);
    //reason += validateEmail(contact.email);
    //reason += validatePhone(contact.phone);
    reason += validateCheckBox(contact);
    //reason += validateNumber(contact.number);
    //reason += validateDisclaimer(contact.disclaimer);

    if (reason.length > 0) {

        return false;
    } else {
       sendForm();
    }
}

function validateName(name) {
    var error = "";

    if (name.value.length == 0) {
        var error = "1";
    }
    return error;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}

function validateEmail(email) {
    var error = "";
    var temail = trim(email.value); // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

    if (email.value == "") {
        var error = "2";
    } else if (!emailFilter.test(temail)) { //test email for illegal characters
        var error = "3";
    } else if (email.value.match(illegalChars)) {
        var error = "4";
    }
    return error;
}

function validatePhone(phone) {
    var error = "";
    var stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');

    if (phone.value == "") {
        var error = '6';
    } else if (isNaN(parseInt(stripped))) {
        var error = "5";
    } else if (stripped.length < 10) {
        var error = "6";
    }
    return error;
}

function validateCheckBox(contact) {
    var error="";
    if ((contact["check_list[]"][0].checked == false) && (contact["check_list[]"][1].checked == false)) {
        var error = "2";
    }
    return error;
}

function validateNumber(number) {
    var num = document.forms["cmpsForm"]["numeros"];
   //var num = document.forms["cmps"].elements["check_list[]"][0].checked;
    var y = num.value;
    if (!isNaN(y)) {

        if (y < 0 || y > 50) {
            var error = "10";
        }

        return error;

    } else {
        var error = "3";
    }
    return error;
}


/*
*metodos de nuevo formulario
*/
function fenviar() {
    var datos = new FormData();
    datos.append("ticket", document.getElementById("ticket").value);
    datos.append("severidad", document.getElementById("severidad").value);
    datos.append("prioridad", document.getElementById("prioridad").value);
    datos.append("respuesta", document.getElementById("respuesta").value);
    datos.append("asignado", document.getElementById("asignado").selectedIndex+1);
    datos.append("plandeaccion", document.getElementById("plandeaccion").value);
    console.log(document.getElementById("asignado").selectedIndex);
    if ( (document.getElementById("asignado").selectedIndex!= -1)) {
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
    }else{
        alert("seleccione un operador");
    }
    
}

function flimpiar() {
    document.getElementById('severidad').value = 3;
    document.getElementById('prioridad').value = 1;
    document.getElementById('respuesta').value = '';
    document.getElementById('asignado').value = '';
    document.getElementById('plandeaccion').value = '';
}