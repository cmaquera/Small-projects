<?php
$nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : 'Invitado';
$edad = isset($_POST['edad']) ? htmlspecialchars($_POST['edad']) : 'No especificada';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Respuesta PHP</title>
    <link rel="stylesheet" href="../shared.css">
    <style>
        .resultado {
            max-width: 500px;
            margin: 2rem auto;
            padding: 1.5rem;
            border: 2px solid #16F24D;
            background: rgba(13,13,13,0.85);
            border-radius: 8px;
            text-align: center;
        }
    </style>
</head>
<body>
    <header class="site-header">
        <a class="back-link" href="index.html">← Volver al formulario</a>
        <h1>Datos Recibidos (PHP POST)</h1>
    </header>
    <main class="resultado">
        <p><strong>Nombre:</strong> <?php echo $nombre; ?></p>
        <p><strong>Edad:</strong> <?php echo $edad; ?></p>
        <p><a class="btn btn1" href="index.html">Regresar</a></p>
    </main>
    <footer class="site-footer">Creado por <strong><a href="https://github.com/cmaquera">CMaquera</a></strong></footer>
</body>
</html>
