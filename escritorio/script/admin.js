
var config;
document.addEventListener('click',function(e){colapseRow(e);}, false);
document.addEventListener("DOMContentLoaded", function(){loadCards();});
setInterval(function(){}, 5000);

function colapseRow(e){
    e = e || window.event;
    var target = e.target || e.srcElement, text = target.textContent || target.innerText;

    if(target.matches('.title')){
        var parent=target.parentNode;

    	for(var i=0;i<parent.childNodes.length;i++){
        	var child =parent.children[i];

            if(child!=null){
              
	        	if(child.className =='dataBlock'){
                    
                    if((child.style.display==null)||(child.style.display=="")){
                        child.style.display="inherit";
                    }else{
    	        		if(child.style.display=="none"){
    	        			child.style.display="inherit";
    	        		}else{ 
    	        			child.style.display="none";
    	        		}
                    }
	        	}else if(child.className =='title'){
                    console.log(child.textContent.split(":")[1] );
                    loadHistory(child.textContent);

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

function loadHistory(user){
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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

                        var card = document.createElement("DIV");
                        card.classList.add("message");

                        var name = document.createElement("DIV");
                        name.classList.add("etiq");
                        name.appendChild(document.createTextNode(""+campos[0]+":"+fila[0]));
                        card.appendChild(name);


                        //for(var d=2;d<rLength;d++){
                           var field=campos[1];
                           var data=fila[1];

                           var texto = document.createElement("DIV");
                           texto.classList.add("data");
                           name.appendChild(document.createTextNode(""+field+":"+data));
                           card.appendChild(name);

                       // }
                        history[aa].appendChild(card);                    
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

function removeHistory(history){
    while (history.firstChild) {
        console.log("removing");
        history.removeChild(history.firstChild);
    }
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



function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight+10+ 'px';
  }
