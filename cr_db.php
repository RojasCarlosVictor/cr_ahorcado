<?php
$servername = "localhost";
$username = "usuario"; // Cambia esto por tu usuario de base de datos
$password = "contraseña"; // Cambia esto por tu contraseña de base de datos
$dbname = "cr_parcial_plp3";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Función para obtener una palabra aleatoria
function obtenerPalabraAleatoria($conn) {
    $sql = "SELECT palabra FROM palabras ORDER BY RAND() LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['palabra'];
    }
    return null;
}
?>
