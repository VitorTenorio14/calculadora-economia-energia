document.addEventListener("DOMContentLoaded", function () {
    const botaoBuscar = document.getElementById("botaoBuscarCooperativas");
    const listaCooperativas = document.getElementById("listaCooperativas");
    const cooperativaContainer = document.getElementById("cooperativaContainer");

    const cooperativas = [
        { nome: "Cooperativa A", desconto: 15 },
        { nome: "Cooperativa B", desconto: 10 },
        { nome: "Cooperativa C", desconto: 20 }
    ];

    botaoBuscar.addEventListener("click", function () {
        const valorConta = parseFloat(document.getElementById("valorConta").value) || 0;

        if (valorConta <= 0) {
            exibirErro("Insira um valor válido para a conta de energia!");
            return;
        }

        cooperativas.sort((a, b) => b.desconto - a.desconto);
        listaCooperativas.innerHTML = "";

        cooperativas.forEach(coop => {
            const economia = (valorConta * coop.desconto) / 100;
            const valorFinal = valorConta - economia;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${coop.nome}</strong><br>
                <strong>Desconto:</strong> ${coop.desconto}%<br>
                <strong>Economia Estimada:</strong> R$ ${economia.toFixed(2)}<br>
                <strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}
            `;
            listaCooperativas.appendChild(listItem);
        });

        cooperativaContainer.style.display = "block";
    });

    function exibirErro(mensagem) {
        listaCooperativas.innerHTML = `<span style="color: red;">${mensagem}</span>`;
        cooperativaContainer.style.display = "block";
    }
});
