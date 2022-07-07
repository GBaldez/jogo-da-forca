const Keyboard = window.SimpleKeyboard.default; 

const myKeyboard = new Keyboard({
  onKeyPress: button => onKeyPress(button)
});
function onKeyPress(button) {   
  if (button.match(/^[a-z]+$/)) {
      console.log(button.toUpperCase());  
      }
     verificaLetra(button.toUpperCase(), palavraSecreta);
}
