// ===============================
// CONTAGEM REGRESSIVA
// ===============================

const dataFesta = new Date("August 15, 2026 18:30:00").getTime();

function atualizarContador() {
    const agora = new Date().getTime();
    const distancia = dataFesta - agora;

    if (distancia < 0) {
        document.getElementById("dias").innerHTML = "0";
        document.getElementById("horas").innerHTML = "0";
        document.getElementById("minutos").innerHTML = "0";
        document.getElementById("segundos").innerHTML = "0";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;
}

setInterval(atualizarContador, 1000);
atualizarContador();


// ===============================
// MODAL DE CONFIRMAÇÃO
// ===============================

function abrirModal() {
    const modal = document.getElementById("modal-presenca");
    if (modal) {
        modal.style.display = "block";
    }
}

function fecharModal() {
    const modal = document.getElementById("modal-presenca");
    if (modal) {
        modal.style.display = "none";
    }
}

// Fechar se clicar fora do modal
window.onclick = function(event) {
    const modal = document.getElementById("modal-presenca");
    if (event.target === modal) {
        fecharModal();
    }
};

// Exibir/Ocultar campo de acompanhantes
function verificarAcompanhantes() {
    const selectQtd = document.getElementById("quantidade");
    const campoAcompanhante = document.getElementById("campo-acompanhante");
    const inputAcompanhante = document.getElementById("nome-acompanhante");

    if (selectQtd && campoAcompanhante) {
        if (parseInt(selectQtd.value) > 0) {
            campoAcompanhante.style.display = "block";
            if (inputAcompanhante) inputAcompanhante.required = true;
        } else {
            campoAcompanhante.style.display = "none";
            if (inputAcompanhante) {
                inputAcompanhante.required = false;
                inputAcompanhante.value = "";
            }
        }
    }
}


// ===============================
// CONFIRMAÇÃO VIA WHATSAPP
// ===============================

function confirmar(event) {
    if (event) event.preventDefault(); // Impede o recarregamento da página

    const telefone = "5527992250279";

    const nome = document.getElementById("nome").value.trim();
    const presencaSelect = document.getElementById("presenca");
    const presenca = presencaSelect ? presencaSelect.value : "sim";
    const quantidade = document.getElementById("quantidade").value;
    const inputAcompanhante = document.getElementById("nome-acompanhante");
    const nomeAcompanhante = inputAcompanhante ? inputAcompanhante.value.trim() : "";

    if (nome === "") {
        alert("Por favor, informe seu nome.");
        return;
    }

    // Montagem da mensagem formatada para o WhatsApp
    const statusPresenca = presenca === "sim" ? "✅ Confirmada" : "❌ Não poderei comparecer";

    let mensagem = `*Confirmação de Presença - 18 Anos Celi* 🎉\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n`;
    mensagem += `📌 *Status:* ${statusPresenca}\n`;

    if (presenca === "sim") {
        if (parseInt(quantidade) > 0) {
            mensagem += `👥 *Acompanhantes:* ${quantidade}\n`;
            if (nomeAcompanhante !== "") {
                mensagem += `📝 *Nome(s):* ${nomeAcompanhante}\n`;
            }
        } else {
            mensagem += `👥 *Acompanhantes:* Nenhum (Vou sozinho/a)\n`;
        }
        mensagem += `\nNos vemos no dia 15/08/2026 às 18h30! 😊`;
    }

    // Redireciona para o WhatsApp com a mensagem pronta
    const url = `https://wa.me/${27992250279}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");

    // Limpa o formulário e fecha o modal
    fecharModal();
    const form = document.getElementById("form-confirmacao");
    if (form) form.reset();
    verificarAcompanhantes();
}


// ===============================
// CONFETES DE ENTRADA
// ===============================

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetes = [];
const cores = ["#FFFFFF", "#1E90FF", "#C0C0C0", "#87CEEB"];

for (let i = 0; i < 120; i++) {
    confetes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        tamanho: Math.random() * 4 + 4,
        velocidade: Math.random() * 1 + 1,
        cor: cores[Math.floor(Math.random() * cores.length)]
    });
}

function animarConfetes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetes.forEach(c => {
        ctx.fillStyle = c.cor;
        ctx.fillRect(c.x, c.y, c.tamanho, c.tamanho);
        c.y += c.velocidade;

        if (c.y > canvas.height) {
            c.y = -10;
        }
    });

    requestAnimationFrame(animarConfetes);
}

animarConfetes();

// Ajustar canvas ao redimensionar a janela
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});