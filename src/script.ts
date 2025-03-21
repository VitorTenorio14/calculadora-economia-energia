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