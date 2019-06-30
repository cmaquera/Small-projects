function Enviar(){
	var n = document.getElementById("nombre").value;
	var a = document.getElementById("apellido").value;

	var url="procesar_datos.php";

	$.ajax({



		type:"post",
		url:url,
		data:{nombre: n, apellido:a},


		success:function(datos){
			$("#mostrardatos").html(datos);
		}
	}

	  )

}