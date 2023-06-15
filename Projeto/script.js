var aposentadoria;
var margem = 0.35;
var juros = 0.0178;
var prazo = 84;
var seguroPrestamista = 0.12782
var parcela;

function calcularEmprestimo() { //formula para calcular emprestimo baseado no margem consignavel máxima 
    parcela = aposentadoria * margem;
    var emprestimo = parcela * (1 - Math.pow(1 + juros, -prazo)) / juros;

    var seguro = document.getElementById("seguro").checked; // pega o valor do checkbox
    var valorSeguro = 0;
    if (seguro) {
        valorSeguro = emprestimo * seguroPrestamista; // calcula o valor do seguro
    }
    
    var iofDiario = 0.0001182; // 0.01182% em termos decimais
    var iofFixo = 0.0038; // 0.38% em termos decimais
    var prazoEmDias = Math.min(prazo * 30, 365);// maximo de 365 dias
     

    var iofTotal = emprestimo * (iofDiario * prazoEmDias + iofFixo);


    var emprestimoLiquido = emprestimo - iofTotal - valorSeguro;
    var valorTotal = parcela * prazo; 

    return {
        emprestimo: emprestimo,
        iof: iofTotal,
        liquido: emprestimoLiquido,
        parcela: parcela, 
        total: valorTotal,  
        seguro: valorSeguro
    };
}

function formatarMoeda(input) { // mascara de moeda
    var valor = input.value;
    valor = valor.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2);
    valor = "R$" + valor;
    valor = valor.replace(".", ",");
    input.value = valor;
}

function converterParaNumero(valor) { // converte texto em numero
    
    valor = valor.replace("R$", "");
    valor = valor.replace(",", ".");
    return parseFloat(valor);
}

function atualizarInterface(elementId, results) { // imprime dados na tela formatados
    var resultHtml = 
    "Valor do empréstimo: R$ " + results.emprestimo.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Valor do IOF: R$ " + results.iof.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Crédito líquido ao cliente: R$ " + results.liquido.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Valor da parcela (Prestação ): R$ " + results.parcela.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) +  
    "<br style='margin:10px 0;'>Valor total das parcelas: R$ " + results.total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});  

    if (results.seguro > 0) {
        resultHtml += "<br style='margin:10px 0;'>Valor do seguro: R$ " + results.seguro.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // adiciona o valor do seguro se ele for maior que zero
    }

    document.getElementById(elementId).innerHTML = resultHtml;

    document.getElementById("recalcularParcelas").style.display = "block";
}



function calcular() { // função para calcular o valor do empréstimo
    document.getElementById("error").innerHTML = ""; // Adicionado para limpar a mensagem de erro
    aposentadoria = converterParaNumero(document.getElementById("aposentadoria").value);

    if (aposentadoria <= 0 || isNaN(aposentadoria)) {
        document.getElementById("error").innerHTML = "Por favor, insira um valor de aposentadoria válido.";
        return;
    }

    var results = calcularEmprestimo();
    atualizarInterface("resultado", results);
}


var prazoRecalculado;

function calcularEmprestimoValorFixo(valorParcela, prazoAtual) { // função para calcular o valor do empréstimo baseado no valor da parcela e o prazo
    
    var emprestimo = valorParcela * (1 - Math.pow(1 + juros, -prazoAtual)) / juros;

    var seguro = document.getElementById("seguro").checked; // pega o valor do checkbox
    var valorSeguro = 0;
    if (seguro) {
        valorSeguro = emprestimo * seguroPrestamista; // calcula o valor do seguro
    }
    
    var iofDiario = 0.0001182; // 0.01182% em termos decimais
    var iofFixo = 0.0038; // 0.38% em termos decimais
    var prazoEmDias = Math.min(prazo * 30, 365); // maximo de 365 dias

    var iofTotal = emprestimo * (iofDiario * prazoEmDias + iofFixo);
    var emprestimoLiquido = emprestimo - iofTotal - valorSeguro;
    var valorTotal = valorParcela * prazoAtual;

    return {
        emprestimo: emprestimo,
        iof: iofTotal,
        liquido: emprestimoLiquido,
        parcela: valorParcela,
        total: valorTotal
    };
}

function recalcularParcelas() { // funçao para calcular o valor do empréstimo baseado no prazo atualizado
    document.getElementById("error").innerHTML = ""; // Adicionado para limpar a mensagem de erro

    prazoRecalculado = parseFloat(document.getElementById("numParcelas").value);
    prazo = parseFloat(document.getElementById("numParcelas").value);

    if (prazoRecalculado <= 0 || prazoRecalculado > 84) {
        document.getElementById("error").innerHTML = "Por favor, insira um número de parcelas válido (Máximo de 84 parcelas).";
        return;
    } 
    
    var results = calcularEmprestimo();
    atualizarInterface("resultadoRecalculoParcelas", results);
    document.getElementById("recalcularValor").style.display = "block";
}

function recalcularValor() { // funçao para  calcular o empréstimo baseado no valor da parcela atualizada
    document.getElementById("error").innerHTML = ""; // Adicionado para limpar a mensagem de erro

    var valorParcela = converterParaNumero(document.getElementById("valorParcela").value);
    var prazoAtual = prazoRecalculado || prazo;
    parcela = aposentadoria * margem;

    if (valorParcela <= 14 || valorParcela > parcela || isNaN(valorParcela)) {
        document.getElementById("error").innerHTML = "Por favor, insira um valor de parcela válido (valor minimo de R$15,00 e maximo de R$" + parcela.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + ").";
        return;
    }
    
    var results = calcularEmprestimoValorFixo(valorParcela, prazoAtual);
    atualizarInterface("resultadoRecalculoValor", results);
}

var modal = document.getElementById("infoModal");
var btn = document.getElementById("infoIcon");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
