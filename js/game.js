const botao = document.querySelector("#btn-iniciar");
const botaoAddNovaPalavra = document.getElementById("adicionar-palavra");
const divBotoes = document.querySelector(".botoes");
const container = document.querySelector("#forca");
const simpleKeyboard = document.querySelector(".simple-keyboard");
const palavras = ["GATO", "CACHORRO", "ELEFANTE","PATO", "CABRA", "GALINHA", "CABRA", "GALO"];
let palavraSecreta;
const start = () => {
    game.play();
    divBotoes.remove();
    canvas.style.display = "inline-block";
    container.style.height = "auto";
    desenhaForca();
    palavraSecreta = escolhePalavra();
    desenhaTracos(palavraSecreta);
    document.addEventListener("keypress", (e) => {
        letraDigitada(e, palavraSecreta);
    })
    if(!document.querySelector(".botoes-jogo")) {
    criarBotoesJogo();}
};

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

const escolhePalavra = () => {
    const numero = Math.floor(Math.random() * palavras.length);
    return palavras[numero];
}

botao.addEventListener("click", start);
botaoAddNovaPalavra.addEventListener("click", adicionarNovaPalavra);