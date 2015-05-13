$(document).ready(function(){
	document.addEventListener("deviceready", function(){
		$('#regFoto').tap(function(){
			navigator.device.capture.captureImage(function(mediaFiles){
			path = mediaFiles[0].fullPath;
			$('#Foto').append('<br><img src="'+path+'" width="100%" />').attr('rel',path);
			},function(error){
			navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
			},{limit:1});
		});
		$('#regEnviar').tap(function(){
			var nom = $('#regNom').val();
			var email = $('#regEmail').val();
			var tel = $('#regTel').val();
			var foto = $('#regFoto').attr('rel');
			if(nom != '' && email != '' && tel != '' && foto != undefined && foto != ''){
				enviarRegistro(nom, tel, email, foto);
			}else{
				navigator.notification.alert('Todos los campos son requeridos', null, 'Error de Registro', 'Aceptar');
			}
		});
	}, false);
});
