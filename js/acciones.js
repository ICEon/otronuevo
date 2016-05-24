// JavaScript Document
var $arreglo_elementos = [];

function conectar_base()
 {
  db = window.sqlitePlugin.openDatabase({name: "quimica_b.db", createFromLocation: 1});
 }

function cargarNivel($min,$max)
 {
	      db.transaction(function(tx) {
        tx.executeSql("select numeroAtomico from elementos where idelemento >= 0 and idelemento <= 6;", [], function(tx, res) {
            alert (res.rows.item(0).numeroAtomico);
			for ($i = 0; i <=$max; i++)
			 {
				$arreglo_elementos [$i] =  res.rows.item($i).numeroAtomico;
			 }
			 
			 alert ($arreglo_elementos[0]);
			
			
			
        });
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
		
		switch ($cual_nivel)
	     {
			//seleccion de los elementos con un arreglo de x a y segun el nivel
		case 'boton-nivel1':
		 cargarNivel(0,6);
		break;		
		case 'boton-nivel2':
		 cargarNivel(7,11);
		break;
		case 'boton-nivel3':
		cargarNivel(31,35);
		break;
		case 'boton-nivel4':
		 cargarNivel(24,30);
		break;
		case 'boton-nivel5':
		 cargarNivel(12,17);
		break;
		case 'boton-nivel6':
		cargarNivel(18,24);
		break;
		case 'boton-nivel7':
		cargarNivel(36,42);
		break;
		case 'boton-nivel8':
		cargarNivel(84,97);
		break;
		case 'boton-nivel9':
		cargarNivel(98,111);
		break;
		case 'boton-nivel10':
		cargarNivel(43,83);
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