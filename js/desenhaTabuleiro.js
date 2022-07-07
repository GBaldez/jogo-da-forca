const palavras = ["GATO", "CACHORRO", "ELEFANTE","PATO", "CABRA", "GALINHA", "CABRA", "GALO"];
const tabuleiro = document.getElementById("canvas").getContext("2d");
let palavraCorreta = "";
let letras = [];
let erros = 0;
const botao = document.querySelector("#btn-iniciar");
const letrasErradas = document.getElementById("erros");
const botaoAddNovaPalavra = document.getElementById("adicionar-palavra");
const divBotoes = document.querySelector(".botoes");
let palavraSecreta;
const container = document.querySelector("#forca");
const simpleKeyboard = document.querySelector(".simple-keyboard");

//função start
const start = () => {
    game.play();
    divBotoes.remove();
    canvas.style.display = "inline-block";
    container.style.height = "auto"; 
    if(window.innerWidth < 768) simpleKeyboard.style.display = "inline-block";
    desenhaForca();
    palavraSecreta = escolhePalavra();
    desenhaTracos(palavraSecreta);
    document.addEventListener("keypress", (e) => {
        letraDigitada(e, palavraSecreta);
    })
    if(!document.querySelector(".botoes-jogo")) {
    criarBotoesJogo();}
};

const criarBotoesJogo = () => {
    let botoesJogo = document.createElement("div");
    botoesJogo.setAttribute("class", "botoes-jogo");
    let btnReiniciar = document.createElement("button");
    btnReiniciar.setAttribute("id", "btn-reiniciar");
    btnReiniciar.innerHTML = "Novo Jogo";
    btnReiniciar.addEventListener("click", () => {
        restart();
        start();
    })
    let btnDesistir = document.createElement("button");
    btnDesistir.setAttribute("id", "btn-desistir");
    btnDesistir.innerHTML = "Desistir";
    btnDesistir.addEventListener("click", () => {
        window.location.reload();
    })
    container.appendChild(botoesJogo);
    botoesJogo.appendChild(btnReiniciar);
    botoesJogo.appendChild(btnDesistir);
}
const restart = () => {
    tabuleiro.clearRect(0, 0, canvas.width, canvas.height);
    palavraSecreta = "";
    letras = [];
    erros = 0;
    palavraCorreta = "";
}
const adicionarNovaPalavra = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "palavra-nova");
    input.setAttribute("placeholder", "Digite a palavra e aperte enter");
    input.setAttribute("maxlength", "8");
    document.addEventListener("keypress", (e) => {
        if(!e.key.match(/[a-z]/i)) e.preventDefault();
        if(e.key === "Enter") {
            let palavra = input.value.toUpperCase();
            if(confirm("Deseja adicionar a palavra " + palavra + "?")) {
                palavras.push(palavra);
                alert("Palavra adicionada com sucesso!");
                input.remove();
            } else {
                alert("Palavra não adicionada!");
        }
    }
    });
    divBotoes.appendChild(input);
}
   
const desenhaTracos = (palavraSecreta) => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath(); //inicia o desenho
    let eixo = 600/palavraSecreta.length;
    for(let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(500+eixo*i, 640);
        tabuleiro.lineTo(550+eixo*i, 640);
    }
    tabuleiro.stroke();//faz de fato o desenho
}
//função para escolher palavra
const escolhePalavra = () => {
    const numero = Math.floor(Math.random() * palavras.length);
    return palavras[numero];
}

//valida se foi uma letra digitada e se a mesma consta na palavra
const letraDigitada = (event, palavra) => {
    if(palavraCorreta.length === palavra.length || erros === 6) return;
    const letra = event.key.toUpperCase();
    if(!letra.match(/[a-z]/i)) return;
    else {
        console.log(palavra.split(letra).length)
        verificaLetra(letra, palavra);
    }
}
const escreverLetraCerta = (letra, eixo, index) => {
    tabuleiro.font = "bold 50px Changa";
    tabuleiro.fillStyle = "#ffeb3b";
    tabuleiro.fillText(letra, 505+eixo*index, 620);
    tabuleiro.stroke();
}
const escreverLetrasErradas = (letra) => {
    tabuleiro.font = "bold 30px Changa";
        tabuleiro.lineWidth = 6;
        tabuleiro.lineCap = "round";
        tabuleiro.lineJoin = "round";
        tabuleiro.fillStyle = "#f44336";
        tabuleiro.fillText(letra, 1150, 100+erros*30);
        tabuleiro.stroke();    
}
//verificar se a letra digitada está na palavra e se o jogador venceu ou perdeu
const verificaLetra = (letra, palavraSecreta) => {
    if(palavraCorreta.includes(letra)) return;
    if(palavraSecreta.includes(letra)) {
        for(let i = 0; i < palavraSecreta.length; i++) {
            if(palavraSecreta[i] === letra) {
                escreverLetraCerta(letra, 600/palavraSecreta.length, i);
                palavraCorreta+=letra;
                correct.play();
            }
        } 
        if(palavraCorreta.length === palavraSecreta.length) msgVitoria();
    } else {
        if(letras.includes(letra)) return;
        erros++;
        wrong.play();
        letras.push(letra);
        escreverLetrasErradas(letra, palavraSecreta);
        desenhaForca();
    }
}
const revelarLetraCorreta = (i,palavraSecreta) => {
    palavraCorreta+=palavraSecreta[i].toUpperCase();
}
//funções para desenhar a forca e o boneco
const desenhaForca = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.stroke();
    tabuleiro.moveTo(50, 640);
    tabuleiro.lineTo(200, 640)
    tabuleiro.moveTo(120, 640);
    tabuleiro.lineTo(120, 100);
    tabuleiro.moveTo(120, 100);
    tabuleiro.lineTo(400, 100);
    tabuleiro.moveTo(400, 100);
    tabuleiro.lineTo(400, 200);
    tabuleiro.stroke();
    
    if(erros === 1) desenharCabeça();
    if(erros === 2) desenharCorpo();
    if(erros === 3) desenharBracoDireito();
    if(erros === 4) desenharBracoEsquerdo();
    if(erros === 5) desenharPernaDireita();
    if(erros === 6) {
        desenharPernaEsquerda();
        gameOver();
    }
}
const desenharCabeça = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.arc(400, 250, 50, 0, 2*Math.PI);
    tabuleiro.stroke();
}
const desenharCorpo = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.moveTo(400, 300);
    tabuleiro.lineTo(400, 450);
    tabuleiro.stroke();
}
const desenharBracoDireito = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.moveTo(400, 320);
    tabuleiro.lineTo(300, 400);
    tabuleiro.stroke();
}
const desenharBracoEsquerdo = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.moveTo(400, 320);
    tabuleiro.lineTo(500, 400);
    tabuleiro.stroke();
}
const desenharPernaDireita = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.moveTo(400, 450);
    tabuleiro.lineTo(300, 550);
    tabuleiro.stroke();
}
const desenharPernaEsquerda = () => {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "white";
    tabuleiro.beginPath();
    tabuleiro.moveTo(400, 450);
    tabuleiro.lineTo(500, 550);
    tabuleiro.stroke();
}

const gameOver = () => {
    tabuleiro.font = "bold 60px Changa";
    tabuleiro.fillStyle = "#f44336";
    tabuleiro.fillText("Fim de Jogo", 500, 300);
    tabuleiro.stroke();
}
const msgVitoria = () => {
    tabuleiro.font = "bold 60px Changa";
    tabuleiro.fillStyle = "#8bc34a";
    tabuleiro.fillText("Você Venceu. Parabéns!", 500, 300);
    tabuleiro.stroke();
    win.play();
}

botao.addEventListener("click", start);
botaoAddNovaPalavra.addEventListener("click", adicionarNovaPalavra);

//sound effects

