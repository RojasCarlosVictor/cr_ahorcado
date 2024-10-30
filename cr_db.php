<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "cr_parcial_plp3";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    header('Content-Type: application/json'); // Indica que la respuesta es JSON
    echo json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]);
    exit; // Termina la ejecución si hay un error en la conexión
}

// Función para obtener una palabra aleatoria
function obtenerPalabraAleatoria($conn) {
    $sql = "SELECT palabra FROM palabras ORDER BY RAND() LIMIT 1"; // Consulta para seleccionar una palabra aleatoria
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc(); // Obtiene la fila de resultados
        return $row['palabra'];
    }
    return null; // Retorna null si no hay resultados
}

// Manejo de solicitudes GET para obtener una palabra aleatoria
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json'); // Asegúrate de enviar la respuesta como JSON
    $palabra = obtenerPalabraAleatoria($conn);
    if ($palabra) {
        echo json_encode(['palabra' => $palabra]); // Retorna la palabra como JSON
    } else {
        echo json_encode(['error' => 'No se encontraron palabras disponibles']); // Mensaje de error
    }
}

// Cerrar la conexión
$conn->close();
?>

