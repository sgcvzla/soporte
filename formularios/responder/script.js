document.addEventListener("DOMContentLoaded", function(){
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("=");
    ticket = paramarr[1];
    document.getElementById("ticket").value = ticket;

});
function sendForm(){
  var sendHttp= new XMLHttpRequest();

  sendHttp.onreadystatechange = function() {
    if (sendHttp.readyState == 4 && sendHttp.status == 200)
            alert(sendHttp.responseText); // Here is the response
    }

    var jsonS={};
    var respuesta = document.getElementById("respuesta").value;
    var spl=document.getElementById("ticket").value;

    jsonS["option"]="form";
    jsonS["tiket"]=spl;
    jsonS["mensage"]=respuesta;
    jsonS["remitente"]="cliente";
    jsonS["check_list"]="operador";

    console.log(jsonS);
    var JSend=JSON.stringify(jsonS);

    sendHttp.open("POST","../../escritorio/form.php", true);
    sendHttp.setRequestHeader('X-Requested-With', 'sendHttpRequest');
    sendHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    sendHttp.send("cJson="+JSend+"&db=sgcconsu_sgcvzla");
}

function validateFormOnSubmit() {
   // var contact= document.getElementById("cmpsForm");
    reason = "";
    //reason += validateName(contact.name);
    //reason += validateEmail(contact.email);
    //reason += validatePhone(contact.phone);
    //reason += validateCheckBox(contact);
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

