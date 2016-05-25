// JavaScript Document
var $arreglo_elementos = [];

function conectar_base()
 {
  db = window.sqlitePlugin.openDatabase({name: "quimica_b.db", createFromLocation: 1});
 }

function cargarNivel($min,$max)
 {
	      db.transaction(function(tx) {
        tx.executeSql("SELECT numeroAtomico FROM elementos WHERE idelemento BETWEEN " + $min + " AND " + $max +";", [], function(tx, res) {
			for ($i=0; $i <$max; $i++)
			 {
				$arreglo_elementos [$i] =  res.rows.item($i).numeroAtomico;
			 }
			 
			 $elementoEncontrar = Math.floor((Math.random() * $max) + $min);
			 
			 $('#dos div').html($elementoEncontrar);
			 
			 $(':mobile-pagecontainer').pagecontainer('change', '#juego',{
                transition: 'pop'
			   }); 
			
			
        }, function error(err) {alert ("error en la consulta" + err)});
      });
 }

$(document).ready(function(e) {

document.addEventListener("deviceready", onDeviceReady, false);


 function onDeviceReady() {
	 
	 audio = window.plugins.LowLatencyAudio;	
audio.preloadFX('error', 'recursos/sonidos/error.mp3', function(msg){}, function(msg){ alert( 'Error: ' + msg ); });	
audio.preloadFX('acierto', 'recursos/sonidos/acierto.mp3', function(msg){}, function(msg){ alert( 'Error: ' + msg ); });	
 conectar_base();

    $('.span-1-of-19').on ('click', function(){
		
	})
	
	
	$('.boton-nivel').on('click' , function () {
		$cual_nivel = $(this).attr('id');	
		alert ($cual_nivel);
		switch ($cual_nivel)
	     {
			//seleccion de los elementos con un arreglo de x a y segun el nivel
		case 'boton-nivel1':
		 cargarNivel(1,7);
		break;		
		case 'boton-nivel2':
		 cargarNivel(8,12);
		break;
		case 'boton-nivel3':
		cargarNivel(32,36);
		break;
		case 'boton-nivel4':
		 cargarNivel(25,31);
		break;
		case 'boton-nivel5':
		 cargarNivel(13,18);
		break;
		case 'boton-nivel6':
		cargarNivel(19,24);
		break;
		case 'boton-nivel7':
		cargarNivel(37,43);
		break;
		case 'boton-nivel8':
		cargarNivel(85,98);
		break;
		case 'boton-nivel9':
		cargarNivel(99,112);
		break;
		case 'boton-nivel10':
		cargarNivel(44,84);
		break;
		 }
	});
	$(document).on('input change', '#velocidad-juego', function() {
     switch ($(this).val())
	  {
		case '1':
		 $('#velocidad').html('Lento');
		 
		break;
		case '2':
		 $('#velocidad').html('Normal');
		break;
		case '3':
		 $('#velocidad').html('Rapido');
		break;  
	  }
});
  $('.btn_menu').on('click', function () {
	  $icono = $(this).find('span');
	  $caja = 	 $(this).find('div');
	  $accion = $(this).attr('id');
	       $icono.addClass('rotar');
$caja.addClass('animated fadeOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
	     switch ($accion)
		  {
			 case 'jugar':
			  $(':mobile-pagecontainer').pagecontainer('change', '#nivel',{
                transition: 'pop'
			   }); 
			 break;
			 
			 case 'opciones':
			  $(':mobile-pagecontainer').pagecontainer('change', '#opciones',{
                transition: 'pop'
			   }); 
			 break;
			 
			 case 'tabla':
			  $(':mobile-pagecontainer').pagecontainer('change', '#tabla',{
                transition: 'pop'
			   }); 
			 break;
		  }
		 $caja.removeClass('animated fadeOutRight');
		 $icono.removeClass('rotar');
		 
		 });

	 
		  });
		  
		  
		  $('.exterior').on('click', function (){
			$alto = $('#juego').height();
			animarCaida ($alto);
			  
			  
		  });
		  
		  $('.boton').on('click', function() {
			  
			  $("#tablero-adivinar").stop();
		  });
		  
		  function animarCaida($alto){
			 $alto = $alto - ($alto*.1);
			 			  $velocidad= 2200;
			  $velocidad = $velocidad-(($velocidad * ($alto/603)) - $velocidad);
			  
  $('#uno').css('top', 0 - ($alto*.03)+'px');

  $('#tres').css('top', 0 - ($alto*.05)+'px');
  $('#dos').css('top', 0 - ($alto*.01)+'px');
    $('#dos').css('position', 'relative');
	$('#uno').css('position', 'relative');
	$('#tres').css('position', 'relative');
 
  $("#tablero-adivinar").clearQueue().stop().animate({top: $alto}, $velocidad, "linear", function() {
	 
  });



 }//animar caida
 } //device ready
}); //ready