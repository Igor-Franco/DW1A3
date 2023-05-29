document.getElementById('meuFormulario').addEventListener('submit', function(e) {

    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var telefone = document.getElementById('telefone');
    var cep = document.getElementById('cep');
    var cpf = document.getElementById('cpf');

    // Remover a classe 'invalido' de todos os campos
    nome.classList.remove('invalido');
    email.classList.remove('invalido');
    telefone.classList.remove('invalido');
    cep.classList.remove('invalido');
    cpf.classList.remove('invalido');

    // Aplicar máscaras
    telefone.value = mascaraTelefone(telefone.value);
    cpf.value = mascaraCpf(cpf.value);
    cep.value = mascaraCep(cep.value);

    // Validar campos
    if (!validarNome(nome.value)) {
        nome.classList.add('invalido');
        e.preventDefault();
    }
    if (!validarEmail(email.value)) {
        email.classList.add('invalido');
        e.preventDefault();
    }
    if (!validarTelefone(telefone.value)) {
        telefone.classList.add('invalido');
        e.preventDefault();
    }
    if (!validarCep(cep.value)) {
        cep.classList.add('invalido');
        e.preventDefault();
    }
    if (!validarCpf(cpf.value)) {
        cpf.classList.add('invalido');
        e.preventDefault();
    }

    // Se chegou até aqui, todos os campos são válidos
    if (!e.defaultPrevented) {
        alert('Formulário enviado com sucesso!');
    }
});

function mascaraTelefone(campo) {
    var valor = campo.value;
    valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
    campo.value = valor;
}


function mascaraCpf(campo) {
    var valor = campo.value;
    valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o primeiro ponto
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o segundo ponto
    valor = valor.replace(/(\d{3})(\d{2})/, "$1-$2"); // Insere o hífen
    campo.value = valor;
}

function mascaraCep(campo) {
    var valor = campo.value;
    valor = valor.replace(/\D/d, ""); // Remove tudo que não é dígito
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); //Insere o hífem
    campo.value = valor;
}


function validarNome(valor) {
    // Verificar se o campo não está vazio
    if (valor.trim() === ""){
        return false;
    }

    // Verifica o comprimento do nome
    if (valor.length < 2 || valor.length > 50) {
        return false;
    }

    // Verificar se o nome possui apenas caracteres permitidos
    var regex = /^[a-zA-Z-' ]+$/;
    if (!regex.test(valor)) {
        return false;
    }

    return true;
}



function validarEmail(email) {
    // Verificar se o campo possui apenas caracteres permitidos
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email.value)) {
        email.classList.add('invalido');
        return false;
    }

    return true;
}


function validarTelefone(telefone) {
    var regex = /^\(\d{2}\) (?:9\d{4}-\d{4}|[1-8]\d{3}-\d{4})$/;
    if (!regex.test(telefone.value)) {
        telefone.classList.add('invalido');
        return false;
    }

    return true;
}


function validarCep(cep) {
    var regex = /^\d{5}-\d{3}$/;
    if (!regex.test(cep.value)){
        cep.classList.add('invalido');
        return false;
    }

    return true;
}


function validarCpf(cpf) {
    var regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!regex.test(cpf.value)){
        cpf.classList.add('invalido');
        return false;
    }

    return true;
}
