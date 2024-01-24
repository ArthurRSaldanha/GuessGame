let randoNumbersList = [];
let maxNumber = 10;
let randomNumber = generateRandomNumber();
let contador = 0;

function exibirtextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.2});
}   

function exibirMensagemInicial(){
    exibirtextoNaTela("h1", "Jogo de Advinha");
    exibirtextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function generateRandomNumber(){
    let choseNumber = parseInt(Math.random() * maxNumber + 1);
    let listElements = randoNumbersList.length;

    if(listElements == maxNumber){
        randoNumbersList = [];
    }

    if(randoNumbersList.includes(choseNumber)){
        generateRandomNumber();
    }else{
        randoNumbersList.push(choseNumber);
        return choseNumber;
    }
}

function resetField(){
    playerGuess = document.querySelector('input');
    playerGuess.value = "";
}

const verificarChute = () => {
    let playerGuess = document.querySelector('input').value;
    contador++;

    if(playerGuess < randomNumber){
        exibirtextoNaTela("p", `O número secreto é maior do que ${playerGuess}`);
    } else if((playerGuess > maxNumber)){
        exibirtextoNaTela("p", "Insira um número válido");
    } else if((playerGuess > randomNumber)){
        exibirtextoNaTela("p", `O número secreto é menor do que ${playerGuess}`);
    } else {
        let tentativas  = contador > 1 ? 'tentativas' : 'tentativa'
        exibirtextoNaTela("p", `Parabénss! Você acertou o número secreto ${randomNumber} com ${contador} ${tentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    resetField();
}

const reset = () => {
    exibirMensagemInicial();
    contador = 0;
    randomNumber = generateRandomNumber();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

