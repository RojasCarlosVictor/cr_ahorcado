let palabraSecreta = '';
let intentosRestantes = 6;
let letrasAdivinadas = [];
let puntaje = 0;

const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

document.getElementById('adivinar').onclick = function() {
    const letraInput = document.getElementById('letra');
    const letra = letraInput.value.toLowerCase();

    if (letra && !letrasAdivinadas.includes(letra)) {
        letrasAdivinadas.push(letra);
        if (!palabraSecreta.includes(letra)) {
            intentosRestantes--;
            dibujarAhorcado();
        }
    }

    letraInput.value = '';
    actualizarJuego();
};

function actualizarJuego() {
    let palabraMostrada = palabraSecreta.split('').map(letra => (letrasAdivinadas.includes(letra) ? letra : '_')).join(' ');
    document.getElementById('palabra').innerText = palabraMostrada;
    document.getElementById('intentos').innerText = intentosRestantes;
    document.getElementById('letras-adivinadas').innerText = letrasAdivinadas.join(', ');

    if (intentosRestantes === 0) {
        document.getElementById('resultado').innerText = "¡Perdiste! La palabra era: " + palabraSecreta;
    } else if (!palabraMostrada.includes('_')) {
        puntaje++;
        document.getElementById('resultado').innerText = "¡Ganaste! Puntaje: " + puntaje;
    }
}

// Dibuja el  ahorcado
function dibujarAhorcado() {
    switch (intentosRestantes) {
        case 5:
            // Cabeza
            contexto.beginPath();
            contexto.arc(100, 40, 20, 0, Math.PI * 2, true);
            contexto.stroke();
            break;
        case 4:
            // Cuerpo
            contexto.beginPath();
            contexto.moveTo(100, 60);
            contexto.lineTo(100, 120);
            contexto.stroke();
            break;
        case 3:
            // Brazo Izquierdo
            contexto.beginPath();
            contexto.moveTo(100, 80);
            contexto.lineTo(60, 100);
            contexto.stroke();
            break;
        case 2:
            // Brazo Derecho
            contexto.beginPath();
            contexto.moveTo(100, 80);
            contexto.lineTo(140, 100);
            contexto.stroke();
            break;
        case 1:
            // Pierna Izquierda
            contexto.beginPath();
            contexto.moveTo(100, 120);
            contexto.lineTo(60, 160);
            contexto.stroke();
            break;
        case 0:
            // Pierna Derecha
            contexto.beginPath();
            contexto.moveTo(100, 120);
            contexto.lineTo(140, 160);
            contexto.stroke();
            break;
    }
}

// Inicializar el juego
function iniciarJuego() {
    palabraSecreta = 'ejemplo';  // debe obtenida desde la base de datos
    intentosRestantes = 6;
    letrasAdivinadas = [];
    contexto.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el lienzo
    actualizarJuego();
}

window.onload = iniciarJuego;
