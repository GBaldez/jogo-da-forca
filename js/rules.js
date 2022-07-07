let palavraCorreta = "";
let letras = [];
let erros = 0;
const letrasErradas = document.getElementById("erros");
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
const letraDigitada = (event, palavra) => {
    if(palavraCorreta.length === palavra.length || erros === 6) return;
    const letra = event.key.toUpperCase();
    if(!letra.match(/[a-z]/i)) return;
    else {
        console.log(palavra.split(letra).length)
        verificaLetra(letra, palavra);
    }
}