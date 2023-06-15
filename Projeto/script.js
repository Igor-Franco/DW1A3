var aposentadoria;
var margem = 0.35;
var juros = 0.0178;
var prazo = 84;
var seguroPrestamista = 0.12782
var parcela;

function calcularEmprestimo() {
    parcela = aposentadoria * margem;
    var emprestimo = parcela * (1 - Math.pow(1 + juros, -prazo)) / juros;

    var seguro = document.getElementById("seguro").checked; // pega o valor do checkbox
    var valorSeguro = 0;
    if (seguro) {
        valorSeguro = emprestimo * seguroPrestamista; // calcula o valor do seguro
    }
    
    
    // var iofDiario = 0.0082 / 100;
    // var iofFixo = 0.38 / 100;
    // var iofDiario = 0.0011182 / 100;
    // var iofFixo = 0.38 / 100;
    // var iofTotal = emprestimo * (iofDiario * 365 + iofFixo);
    
    var iofDiario = 0.0001182; // 0.01182% em termos decimais
    var iofFixo = 0.0038; // 0.38% em termos decimais
    var prazoEmDias = Math.min(prazo * 30, 365);

    //var iofTotal = emprestimo * (iofDiario * prazoEmDias + iofFixo);
    var iofTotal = emprestimo * (iofDiario * prazoEmDias);


    var emprestimoLiquido = emprestimo - iofTotal - valorSeguro;
    var valorTotal = parcela * prazo; // Novo cálculo

    return {
        emprestimo: emprestimo,
        iof: iofTotal,
        liquido: emprestimoLiquido,
        parcela: parcela, // Novo campo
        total: valorTotal,  
        seguro: valorSeguro
    };
}

function formatarMoeda(input) {
    var valor = input.value;
    valor = valor.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2);
    valor = "R$" + valor;
    valor = valor.replace(".", ",");
    input.value = valor;
}

function converterParaNumero(valor) {
    valor = valor.replace("R$", "");
    valor = valor.replace(",", ".");
    return parseFloat(valor);
}

function atualizarInterface(elementId, results) {
    var resultHtml = 
    "Valor do empréstimo: R$ " + results.emprestimo.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Valor do IOF: R$ " + results.iof.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Crédito líquido ao cliente: R$ " + results.liquido.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + 
    "<br style='margin:10px 0;'>Valor da parcela (Prestação ): R$ " + results.parcela.toLocaleString('pt-BR', {minimumFractionDigits: 2}) +  
    "<br style='margin:10px 0;'>Valor total das parcelas: R$ " + results.total.toLocaleString('pt-BR', {minimumFractionDigits: 2});  

    if (results.seguro > 0) {
        resultHtml += "<br style='margin:10px 0;'>Valor do seguro: R$ " + results.seguro.toLocaleString('pt-BR', {minimumFractionDigits: 2}); // adiciona o valor do seguro se ele for maior que zero
    }

    document.getElementById(elementId).innerHTML = resultHtml;

    document.getElementById("recalcularParcelas").style.display = "block";
}



function calcular() {
    aposentadoria = converterParaNumero(document.getElementById("aposentadoria").value);

    if (aposentadoria <= 0) {
        document.getElementById("error").innerHTML = "Por favor, insira um valor de aposentadoria válido.";
        return;
    }

    var results = calcularEmprestimo();
    atualizarInterface("resultado", results);
}


var prazoRecalculado; // nova variável

function calcularEmprestimoValorFixo(valorParcela, prazoAtual) {
    var emprestimo = valorParcela * (1 - Math.pow(1 + juros, -prazoAtual)) / juros;

    var seguro = document.getElementById("seguro").checked; // pega o valor do checkbox
    var valorSeguro = 0;
    if (seguro) {
        valorSeguro = emprestimo * seguroPrestamista; // calcula o valor do seguro
    }

    // var iofDiario = 0.0082 / 100;
    // var iofFixo = 0.38 / 100;
    // var iofTotal = emprestimo * (iofDiario * prazoAtual + iofFixo);
    
    var iofDiario = 0.0001182; // 0.01182% em termos decimais
    var iofFixo = 0.0038; // 0.38% em termos decimais
    var prazoEmDias = Math.min(prazo * 30, 365);

    //var iofTotal = emprestimo * (iofDiario * prazoEmDias + iofFixo);
    var iofTotal = emprestimo * (iofDiario * prazoEmDias);
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

function recalcularParcelas() {
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

function recalcularValor() {
    document.getElementById("error").innerHTML = ""; // Adicionado para limpar a mensagem de erro

    var valorParcela = converterParaNumero(document.getElementById("valorParcela").value);
    var prazoAtual = prazoRecalculado || prazo;
    parcela = aposentadoria * margem;

    if (valorParcela <= 14 || valorParcela > parcela) {
        document.getElementById("error").innerHTML = "Por favor, insira um valor de parcela válido (valor minimo de R$15,00 e maximo de R$" + parcela.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + ").";
        return;
    }
    
    var results = calcularEmprestimoValorFixo(valorParcela, prazoAtual);
    atualizarInterface("resultadoRecalculoValor", results);
}
