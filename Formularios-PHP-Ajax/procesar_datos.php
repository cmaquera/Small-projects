<?php
echo "<br>";
$nombre = isset($_POST["nombre"]) ? htmlspecialchars($_POST["nombre"]) : "";
$apellido = isset($_POST["apellido"]) ? htmlspecialchars($_POST["apellido"]) : "";
echo "Nombre: " . $nombre . "<br><br>";
echo "Apellido: " . $apellido . "<br><br>";
?>