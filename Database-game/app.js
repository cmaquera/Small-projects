var mysql = require('mysql');
var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));



app.post('/', function(req, res){
   console.log(req.params[0]);
   res.send('Hola');
});


var connection = mysql.createConnection({
   host: 'localhost',   
   user: 'root',
   password: 'root',
   database: 'juego_db',
   port: 3306
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta :D');
   }
});



//INSERTAR UN ELEMENTO EN LA TABLA
/*var query = connection.query('INSERT INTO jugador(Usuario, Contraseña, Nombre, Puntos) VALUES(?, ?, ?, ?)', [ 'TuJefa', 'prograclub', 'Prograclub', '100' ], 
   function(error, result){
   if(error){
      throw error;
   }else{
      console.log(result);
   }
 }
);
*/

var query = connection.query('SELECT idJugador, Usuario, Contraseña, Nombre, Puntos FROM jugador', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
            for(i=0; i<resultado.length; i++){
               console.log(resultado[i].Usuario + ' | ' + resultado[i].Nombre + ' | ' + resultado[i].Puntos);
            }
         }else{
            console.log('Registro no encontrado');
         }
      }
   }
);

connection.end();



app.listen(app.get('port'), function(){
   console.log("La pagina esta corriendo en el puerto ", app.get('port'));
});