/*function calcularEconomia(): void {
    const valorContaInput = document.getElementById("valorConta") as HTMLInputElement;
    const cooperativaSelect = document.getElementById("cooperativa") as HTMLSelectElement;
    const resultadoOutput = document.getElementById("resultado") as HTMLElement;

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
}
*/

function calcularEconomia(): void {
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

function obterValorConta(): number {
    const input = document.getElementById("valorConta") as HTMLInputElement;
    return  parseFloat(input.value) || 0 ;

}

function obterDesconto(): number | null {
    const select = document.getElementById("cooperativa") as HTMLSelectElement;
    const option = select.selectedOptions[0];
    return option ? parseFloat(option.getAttribute("data-desconto") || "0") : null;
}

function calcularValorEconomia(valor: number, desconto: number): number {
    return (valor * desconto) / 100;
}

function exibirErro(mensagem: string): void {
    const resultadoOutput = document.getElementById("resultado") as HTMLElement;
    resultadoOutput.innerHTML = `<span style="color: red;">${mensagem}</span>`;
}

function exibirResultado(economia: number, desconto: number, valorFinal: number): void {
    const resultadoOutput = document.getElementById("resultado") as HTMLElement;
    resultadoOutput.innerHTML = `
        <strong>Economia Estimada:</strong> R$ ${economia.toFixed(2)} (${desconto}% de desconto)<br>
        <strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("botaoCalcular")?.addEventListener("click", calcularEconomia);
});
