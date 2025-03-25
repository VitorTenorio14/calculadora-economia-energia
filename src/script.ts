document.addEventListener("DOMContentLoaded", function () {
    const botaoBuscar = document.getElementById("botaoBuscarCooperativas") as HTMLButtonElement;
    const listaCooperativas = document.getElementById("listaCooperativas") as HTMLOListElement;
    const cooperativaContainer = document.getElementById("cooperativaContainer") as HTMLDivElement;

    interface Cooperativa {
        nome: string;
        desconto: number;
    }

    const cooperativas: Cooperativa[] = [
        { nome: "Cooperativa A", desconto: 15 },
        { nome: "Cooperativa B", desconto: 10 },
        { nome: "Cooperativa C", desconto: 20 }
    ];

    botaoBuscar.addEventListener("click", function () {
        const valorConta = parseFloat((document.getElementById("valorConta") as HTMLInputElement).value) || 0;

        if (valorConta <= 0) {
            exibirErro("Insira um valor válido para a conta de energia!");
            return;
        }

        // Ordena as cooperativas do maior para o menor desconto
        cooperativas.sort((a, b) => b.desconto - a.desconto);

        // Limpa a lista antes de atualizar
        listaCooperativas.innerHTML = "";

        // Adiciona as cooperativas à lista com cálculos
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

        // Exibe a lista de cooperativas
        cooperativaContainer.style.display = "block";
    });

    function exibirErro(mensagem: string) {
        listaCooperativas.innerHTML = `<span style="color: red;">${mensagem}</span>`;
        cooperativaContainer.style.display = "block";
    }
});
