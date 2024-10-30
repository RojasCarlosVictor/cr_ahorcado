let palabraSecreta = '';
let intentosRestantes = 6;
let letrasAdivinadas = [];
let puntaje = 0;

const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

document.getElementById('adivinar').onclick = function() {
    const letraInput = document.getElementById('letra');
    const letra = letraInput.value.toLowerCase().trim(); // Trim para eliminar espacios en blanco

    // Verificar que la letra no esté vacía y no haya sido adivinada previamente
    if (letra && !letrasAdivinadas.includes(letra)) {
        letrasAdivinadas.push(letra);
        if (!palabraSecreta.includes(letra)) {
            intentosRestantes--;
            dibujarAhorcado();
        }
        actualizarJuego();
    }

    letraInput.value = ''; // Limpiar el input después de la adivinanza
};

function actualizarJuego() {
    let palabraMostrada = palabraSecreta.split('').map(letra => (letrasAdivinadas.includes(letra) ? letra : '_')).join(' ');
    document.getElementById('palabra').innerText = palabraMostrada;
    document.getElementById('intentos').innerText = intentosRestantes;
    document.getElementById('letras-adivinadas').innerText = letrasAdivinadas.join(', ');

    // Comprobar si el jugador ha ganado o perdido
    if (intentosRestantes === 0) {
        document.getElementById('resultado').innerText = "¡Perdiste! La palabra era: " + palabraSecreta;
    } else if (!palabraMostrada.includes('_')) {
        puntaje++;
        document.getElementById('resultado').innerText = "¡Ganaste! Puntaje: " + puntaje;
    }
}

// Dibuja el ahorcado
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
    fetch('cr_db.php')  // Cambia la ruta si es necesario
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.statusText);
            }
            return response.json(); // Espera un JSON como respuesta
        })
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error al obtener la palabra. Inténtalo de nuevo.');
            } else {
                palabraSecreta = data.palabra;  // Establecer la palabra secreta desde la respuesta
                
                // Añadir una pista mostrando la primera letra
                document.getElementById('pista').innerText = "Primera letra: " + palabraSecreta.charAt(0).toUpperCase(); // Añadir una pista

                // Inicializar variables del juego
                intentosRestantes = 6;
                letrasAdivinadas = [];
                contexto.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el lienzo
                actualizarJuego();
            }
        })
        .catch(error => console.error('Error al obtener la palabra:', error));
}

window.onload = iniciarJuego;  // Inicia el juego al cargar la página
