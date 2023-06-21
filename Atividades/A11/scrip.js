"use strict";

const cep = document.querySelector("#cep");
cep.addEventListener("blur", buscaCEP);

function apresentarDados(data) {
    for (const campo in data){
        if(document.querySelector("#" + campo)){
            document.querySelector("#" + campo).value = data[campo];
        }
    }
}

function buscaCEP(e) {
    let busca = cep.value.replace("-", "");
    const options = {
        metod: "get",
        mode: "cors",
        cache: "default"
    }

    fetch(`https://viacep.com.br/ws/${busca}/json/`, options)
        .then((response) => {
            response.json()
            .then((data) => {apresentarDados(data); })
        })
        .catch((e) => {console.log("Erro: " , e, message); });
} 
        
document.getElementById("calculateShipping").addEventListener("click", function() {
    let encodedMessage = "T2JyaWdhZG8gcGVsYXMgYXVsYXMsIGNvbnRpbnVlIHNlbmRvIGVzc2Ugb3RpbW8gcHJvZmVzc29yIHF1ZSB2b2NlIGUuIEFkb3JvIGNvbW8gdm9jZSBzZSBlc2ZvcmNhIHBhcmEgdHJhemVyIGNvbnRldWRvcyBhdHVhbGl6YWRvcyBlIHZpZGVvIGF1bGFzIHBhcmEgc3VhIGRpc2NpcGxpbmEu";
    let decodedMessage = atob(encodedMessage);
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    setTimeout(function() {
        alert(decodedMessage);
    }, 100);
});


