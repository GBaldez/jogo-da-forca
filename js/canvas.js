const tabuleiro = document.getElementById("canvas").getContext("2d");

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