
var element=null;
var inn=[];


document.addEventListener('click',function(e){colapseRow(e);}, false);
document.addEventListener("DOMContentLoaded", function(){onloadN();});

function colapseRow(e){
    e = e || window.event;
    var target = e.target || e.srcElement, text = target.textContent || target.innerText;
    element= target;
    if(target.matches('.card')){
    	for(var i=0;i<target.childNodes.length;i++){
        	var child =target.children[i];
            if(child!=null){

	        	if(child.className =='dataBlock'){

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

function onloadN() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response=xmlhttp.responseText;
            var Rjson=JSON.parse(response);
            inn=Rjson; 
            console.log(inn);

    

    for(var d=0;d<inn[1].length;d++){
        var data=inn[1][d];

        var card = document.createElement("DIV");
        card.classList.add("card");

        var name = document.createElement("DIV");
        name.classList.add("title");
        name.appendChild(document.createTextNode(""+inn[0][0]+":"+data[0]));
        card.appendChild(name);

        var tiket = document.createElement("DIV");
        tiket.classList.add("title");
        tiket.appendChild(document.createTextNode(""+inn[0][1]+":"+data[1]));
        card.appendChild(tiket);

        var block = document.createElement("DIV");
        block.classList.add("dataBlock");
        card.appendChild(block);

        for(var i=2;i<inn[0].length;i++){
            var f=inn[0][i];
            var r=data[i];

            if(f=="descripcion"){
                var description = document.createElement("DIV");
                description.classList.add(f);
                block.appendChild(description);

                var p = document.createElement("p");
                p.appendChild(document.createTextNode(r));
                description.appendChild(p);
            }else{
                var data = document.createElement("DIV");
                data.classList.add("data");
                data.appendChild(document.createTextNode(""+f+":"+r));
                block.appendChild(data); 
            }

        }
        //newdiv.appendChild(document.createTextNode("some text"));

        document.getElementsByClassName("container")[0].appendChild(card);
    }
        }
    };
    xmlhttp.open("POST","adminRequest.php",true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("p=gfhgfh");

}