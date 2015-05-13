//almacenamiento
function saveLogin(name,id){
	window.localStorage.setItem('nombre',name);
	window.localStorage.setItem('id',id);
}
function isLogin(){
	var id = window.localStorage.getItem('id');
	if(id != undefined)
		return true;
	else
		return false;
}
function accesoBD(){
	var db = window.openDatabase("hotel", "1.0", "Hotel BD", 5000000);
	return db;
}

function reservaInt(t,p,h,d){
	accesoBD().transaction(function(tx){
		var f = new Date();
		var fecha = f.getDate()+'/'+(f.getMonth()+1)+'/'+f.getFullYear();
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservaciones (id unique, tipoHabitacion, personas, habitaciones, dias)');
		tx.executeSql('INSERT INTO reservaciones (tipoHabitacion, personas, habitaciones, dias) VALUES ("'+t+'", "'+p+'", "'+h+'", "'+d+'")');
		tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id unique, tipoHabitacion, personas, habitaciones, dias, fecha)');
		tx.executeSql('INSERT INTO historial (tipoHabitacion, personas, habitaciones, dias, fecha) VALUES ("'+t+'", "'+p+'", "'+h+'", "'+d+'","'+fecha+'")');
	}, function(err){
		alert(err.code);
	}, function(){
		navigator.notification.alert('Esperando por conexión a Internet', function(){
			window.location.href = '#page';
		}, 'Datos Guardados', 'Aceptar');
	});
}