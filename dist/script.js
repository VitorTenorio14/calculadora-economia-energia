function calcularEconomia() {
    const valorConta = obterValorConta();
    const desconto = obterDesconto();
    if (valorConta <= 0 || desconto === null) {
        exibirErro("Insira um valor válido!");
        return;
    }
    const economia = calcularValorEconomia(valorConta, desconto);
    const valorFinal = valorConta - economia;
    exibirResultado(economia, desconto, valorFinal);
}
function obterValorConta() {
    const input = document.getElementById("valorConta");
    return parseFloat(input.value.replace(',', '.')) || 0;
}
function obterDesconto() {
    const select = document.getElementById("cooperativa");
    const option = select.selectedOptions[0];
    return option ? parseFloat(option.getAttribute("data-desconto") || "0") : null;
}
function calcularValorEconomia(valor, desconto) {
    return (valor * desconto) / 100;
}
function exibirErro(mensagem) {
    const resultadoOutput = document.getElementById("resultado");
    resultadoOutput.innerHTML = `<span style="color: red;">${mensagem}</span>`;
}
function exibirResultado(economia, desconto, valorFinal) {
    const resultadoOutput = document.getElementById("resultado");
    resultadoOutput.innerHTML = `
        <strong>Economia Estimada:</strong> R$ ${economia.toFixed(2)} (${desconto}% de desconto)<br>
        <strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}
    `;
}
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    (_a = document.getElementById("botaoCalcular")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", calcularEconomia);
    // Aplicação da máscara pode ser feita com uma lib externa no futuro
    // Aqui só importamos para possível integração
});
