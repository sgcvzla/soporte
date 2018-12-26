
var inn=[];

document.addEventListener('click',function(e){colapseRow(e);}, false);
document.addEventListener("DOMContentLoaded", function(){onloadN();});

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
	        	}
            }
    	}
    }
}

function onloadN() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        var cont=document.getElementsByClassName("containerC");

        for (var amount = 0; amount <cont.length; amount++) {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response=xmlhttp.responseText;
                var Rjson=JSON.parse(response);
                inn=Rjson; 


                var campos=inn[0];
                var registros=inn[1];
                var innLength=registros.length;


                for(var d=0;d<innLength;d++){
                    var fila=registros[d];

                         var card = document.createElement("DIV");
                         card.classList.add("card");

                         var name = document.createElement("DIV");
                         name.classList.add("title");
                         name.appendChild(document.createTextNode(""+inn[0][0]+":"+fila[0]));
                         card.appendChild(name);

                         var tiket = document.createElement("DIV");
                         tiket.classList.add("title");

                         tiket.appendChild(document.createTextNode(""+inn[0][1]+":"+fila[1]));
                         card.appendChild(tiket);

                         var block = document.createElement("DIV");
                         block.classList.add("dataBlock");
                         card.appendChild(block);


                    var rLength=fila.length;
                    for(var i=2;i<rLength;i++){
                        var field=campos[i];
                        var data=fila[i];
                         
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
                    cont[amount].appendChild(card);
                }
            }
        }
    };
    xmlhttp.open("POST","Backend/adminRequest.php",true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var txt=readTextFile(xmlhttp);
}

function readTextFile(xmlhttp){
    var rawFile = new XMLHttpRequest();
    var r;
    var response;
    rawFile.onreadystatechange = function (){
        if (rawFile.readyState == 4 && rawFile.status == 200) {

            r=rawFile.responseText;
            response=JSON.parse(r);
            xmlhttp.send("Query="+response[0]+"&db="+response[1]+"&table="+response[2]);
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

setInterval(function(){ 
     
}, 5000);