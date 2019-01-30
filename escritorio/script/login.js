document.addEventListener("DOMContentLoaded", function(){
	var right=document.getElementsByClassName("Rigt");
	var left=document.getElementsByClassName("Left");

	right[0].style.width="50%";
	left[0].style.width="50%";

	var inn=document.getElementsByTagName("input");
	for(var a=0;a<inn.length;a++){
		var button = inn[a];
		if(button.type=="button"){
			button.style.background="#555";
			button.style.color="#fff";
			button.style.width="20%";
			button.style.height="3em";
			button.style.outline="none";
			button.style.border="none";
			button.style.margin="1em";

		}

	}
});

function enviar(){
	var datos = new FormData();
    datos.append("correo", document.getElementById("usr").value);
    datos.append("pass", document.getElementById("pass").value);
    datos.append("db", "sgcconsu_sgcvzla");



    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
    	if (this.readyState == 4 && this.status == 200) {
    		var res =this.responseText;
			/*var params = {'name' : res};

    		var form = document.createElement("form");
    		form.setAttribute("method", "post");
    		form.setAttribute("action", "admin.htm");
    		form.setAttribute("target", "");
    		for (var i in params){
    			if (params.hasOwnProperty(i)){
    				var input = document.createElement('input');
    				input.type = 'hidden';
    				input.name = i;
    				input.value = params[i];
    				form.appendChild(input);
    			}
    		}
    		document.body.appendChild(form);
    		window.open('admin.htm', '_SELF');
    		form.submit();
    		document.body.removeChild(form);*/
    		if(res!=null || res != ""){
    			window.open('admin.htm?user='+res, '_SELF');

    		}

    	}
    };
    xmlhttp.open("POST", "Backend/login.php", true);
    xmlhttp.send(datos);


}