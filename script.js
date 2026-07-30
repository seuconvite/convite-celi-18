// ===============================
// CONTAGEM REGRESSIVA
// ===============================

const dataFesta = new Date("August 16, 2026 19:30:00").getTime();


function atualizarContador(){

    const agora = new Date().getTime();

    const distancia = dataFesta - agora;


    if(distancia < 0){
        document.getElementById("dias").innerHTML = "0";
        document.getElementById("horas").innerHTML = "0";
        document.getElementById("minutos").innerHTML = "0";
        document.getElementById("segundos").innerHTML = "0";
        return;
    }


    const dias = Math.floor(
        distancia / (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (distancia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (distancia % (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const segundos = Math.floor(
        (distancia % (1000 * 60)) /
        1000
    );


    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

}


setInterval(atualizarContador,1000);

atualizarContador();




// ===============================
// CONFIRMAÇÃO WHATSAPP
// ===============================


function confirmar(){

    let nome = document.getElementById("nome").value;

    let quantidade = document.getElementById("quantidade").value;


    if(nome === ""){
        alert("Por favor, informe seu nome.");
        return;
    }


    if(quantidade === ""){
        quantidade = "1";
    }


    let mensagem =
`Eii! Meu nome é ${nome}.
Com muita alegria, confirmo minha presença na comemoração do seu aniversário de 18 anos! 😊.

Quantidade de pessoas: ${quantidade}

Nos vemos no dia 16/08/2026 às 18h30!`;


    let telefone = "5527992250279";


    let url =
    "https://wa.me/" + 5527992250279 +
    "?text=" +
    encodeURIComponent(mensagem);


    window.open(url,"_blank");

}




// ===============================
// CONFETES DE ENTRADA
// ===============================


const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let confetes=[];


for(let i=0;i<120;i++){

    confetes.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height-canvas.height,

        tamanho:
        Math.random()*4+4,

        velocidade:
        Math.random()*1+1,

        cor:[
            "#FFFFFF",
            "#1E90FF",
            
        ][
            Math.floor(Math.random()*4)
        ]

    });

}



function animarConfetes(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    confetes.forEach(c=>{


        ctx.fillStyle=c.cor;


        ctx.fillRect(
            c.x,
            c.y,
            c.tamanho,
            c.tamanho
        );


        c.y += c.velocidade;


        if(c.y > canvas.height){

            c.y=-10;

        }


    });


    requestAnimationFrame(animarConfetes);

}


animarConfetes();



// Ajustar tela ao redimensionar

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

});
