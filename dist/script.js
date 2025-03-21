"use strict";
/*function calcularEconomia() {
    const valorContaInput = document.getElementById("valorConta");
    const cooperativaSelect = document.getElementById("cooperativa");
    const resultadoOutput = document.getElementById("resultado");
    const valorConta = parseFloat(valorContaInput.value);
    const desconto = parseFloat(cooperativaSelect.selectedOptions[0].getAttribute("data-desconto") || "0");
    if (isNaN(valorConta) || valorConta <= 0) {
        resultadoOutput.innerHTML = "Insira um valor válido!";
        return;
    }
    const economia = (valorConta * desconto) / 100;
    const valorFinal = valorConta - economia;
    resultadoOutput.innerHTML = `
        <strong>Economia Estimada:</strong> R$ ${economia.toFixed(2)} (${desconto}% de desconto)<br>
        <strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}
    `;
}*/

function calcularEconomia() {
    var valorConta = obterValorConta();
    var desconto = obterDesconto();
    if (valorConta <= 0 || desconto === null) {
        exibirErro("Insira um valor válido!");
        return;
    }
    var economia = calcularValorEconomia(valorConta, desconto);
    var valorFinal = valorConta - economia;
    exibirResultado(economia, desconto, valorFinal);
}
function obterValorConta() {
    var input = document.getElementById("valorConta");
    return parseFloat(input.value) || 0;
}
function obterDesconto() {
    var select = document.getElementById("cooperativa");
    var option = select.selectedOptions[0];
    return option ? parseFloat(option.getAttribute("data-desconto") || "0") : null;
}
function calcularValorEconomia(valor, desconto) {
    return (valor * desconto) / 100;
}
function exibirErro(mensagem) {
    var resultadoOutput = document.getElementById("resultado");
    resultadoOutput.innerHTML = "<span style=\"color: red;\">".concat(mensagem, "</span>");
}
function exibirResultado(economia, desconto, valorFinal) {
    var resultadoOutput = document.getElementById("resultado");
    resultadoOutput.innerHTML = "\n        <strong>Economia Estimada:</strong> R$ ".concat(economia.toFixed(2), " (").concat(desconto, "% de desconto)<br>\n        <strong>Valor Final:</strong> R$ ").concat(valorFinal.toFixed(2), "\n    ");
}
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    (_a = document.getElementById("botaoCalcular")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", calcularEconomia);
});

