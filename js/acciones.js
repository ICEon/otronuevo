// JavaScript Document
var $arreglo_elementos = [];
var $posicion_azar = [.01,.03,.05];
var $adivinar = [];
var $actual;
var $actualmin;
var $actualmax;
var $simboloCorrecto;
var $aciertos = 0;
var $pulsado=false;
var $velocidad = 2200;
var $cual_nivel="";


function conectar_base()
 {
  db = window.sqlitePlugin.openDatabase({name: "quimica_b.db", createFromLocation: 1});
 }
 
function shuffle_elements(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



function cargarNivel($min,$max)
 {		 
 $('#aciertos').html(0);
  $('#totales').html(($max-$min) + 1);
	      db.transaction(function(tx) {
        tx.executeSql("SELECT simbolo FROM elementos WHERE idelemento BETWEEN " + $min + " AND " + $max +" ORDER BY numeroAtomico ASC;", [], function(tx, res) {
			$arreglo_elementos = [];
			for ($i=0; $i <=($max-$min); $i++)
			 {
				$arreglo_elementos [$i] =  res.rows.item($i).simbolo;
			 }
		$arreglo_elementos = shuffle_elements($arreglo_elementos);			
		$actual=0;
		$actualmin = $min;
		$actualmax = $max;
		$aciertos = 0;
			colocar_adivinar($actualmin,$actualmax);
        });
      });
 }
 
	 
	// $('#dos div').html($arreglo_elementos[0]);

function colocar_adivinar ($min, $max){
	$pulsado = false;
	$('.boton').removeClass('boton-correcto');
	if ($actual == 0)
	 {
		//todo al origen reset puntajes  
	 }
	   $adivinar = [];
	   $adivinar[0] = $arreglo_elementos[$actual];
	   do 
	    {
		 $segundo = Math.round(Math.random()*($max-$min));
	     $adivinar[1] = $arreglo_elementos[$segundo]; 
		} while ($segundo == $actual);
	
	   do 
	    {
		 $tercero = Math.round(Math.random()*($max-$min));
	     $adivinar[2] = $arreglo_elementos[$tercero]; 
		} while (($tercero == $segundo) || ($tercero == $actual));
		
		       $simboloCorrecto=""; 		
			   $nombreCorrecto="";
	$simboloCorrecto = $adivinar[0];
	   db.transaction(function(tx) {
		   
        tx.executeSql("SELECT nombreElemento, simbolo FROM elementos WHERE simbolo = '"+ $simboloCorrecto +"';", [], function(tx, res) {
$('#elemento-actual').html('');			
		   $('#uno div').html('');
		 $('#dos div').html('');
		 $('#tres div').html('');

		$adivinar = shuffle_elements($adivinar);
		$posicion_azar = shuffle_elements($posicion_azar);


	     switch ($simboloCorrecto)
		  {
			case $adivinar[0]:
			 $('#botones-adivinar-uno').addClass('boton-correcto');
			break;  
			case $adivinar[1]:
			 $('#botones-adivinar-dos').addClass('boton-correcto');
			break;  
			case $adivinar[2]:
			 $('#botones-adivinar-tres').addClass('boton-correcto');
			break;  
		  }

		 $('#uno div').html($adivinar[0]);
		 $('#dos div').html($adivinar[1]);
		 $('#tres div').html($adivinar[2]);
		 

$('#elemento-actual').html(res.rows.item(0).nombreElemento);
     $('#elementoEncontrar').html(res.rows.item(0).nombreElemento);
	 
	 $('.nombre_elemento').html (res.rows.item(0).nombreElemento);
	 $('.simbolo_elemento').html($simboloCorrecto);
	 
	 $(':mobile-pagecontainer').pagecontainer('change', '#juego',{transition: 'none'}); 

     $("#quien").popup("open",{transition: "flip"}); 	
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
		$mostrarCual = $(this).html();
		$color = $(this).css('background-color');
		
			$('#header-emostrar').css('background-color', $color);
			
  		  
		  
			
			 db.transaction(function(tx) {
        tx.executeSql("select * from elementos where simbolo = '" + $mostrarCual + "';", [], function(tx, res) {
			$("#numeroAtomicoMostrar").html(res.rows.item(0).numeroAtomico);
			$("#nombreMostrar").html(res.rows.item(0).nombreElemento);			
			$("#simboloMostrar").html(res.rows.item(0).simbolo);			
			$("#masaMostrar").html(res.rows.item(0).masaAtomica);			
			$("#grupoMostrar").html(res.rows.item(0).grupo);			
			$("#periodoMostrar").html(res.rows.item(0).periodo);			
			$("#electroMostrar").html(res.rows.item(0).electronegatividad);			
			$("#configMostrar").html(res.rows.item(0).configuracionElectronica);			
			$("#estadoMostrar").html(res.rows.item(0).estado);			
			$("#familiaMostrar").html(res.rows.item(0).familia);
			$("#descripcionMostrar").html(res.rows.item(0).descripcion);
				$("#descripcionMostrar").css('text-align', 'justify');
	   $(':mobile-pagecontainer').pagecontainer('change', '#elementoMostrar',{
                transition: 'pop'
			   });			
        });
      });
	  

			
	})
	
	$('#btn_cerrar_mostrar').on('tap', function(){
  $(':mobile-pagecontainer').pagecontainer('change', '#tabla',{
                transition: 'pop'
			   }); 
	
});
	
	$('.boton-nivel').on('click' , function () {
		$cual_nivel = $(this).attr('id');
		$('#nivel').html($cual_nivel.substring(11));
		switch ($cual_nivel)
	     {
			//seleccion de los elementos con un arreglo de x a y segun el nivel
		case 'boton-nivel1':
		 cargarNivel(1,7);
		break;		
		case 'boton-nivel2':	  
		 cargarNivel(8,13);
		break;
		case 'boton-nivel3':
		cargarNivel(33,37);
		break;
		case 'boton-nivel4':
		 cargarNivel(26,32);
		break;
		case 'boton-nivel5':
		 cargarNivel(14,19);
		break;
		case 'boton-nivel6':
		cargarNivel(20,25);
		break;
		case 'boton-nivel7':
		cargarNivel(38,44);
		break;
		case 'boton-nivel8':
		cargarNivel(85,98);
		break;
		case 'boton-nivel9':
		cargarNivel(99,112);
		break;
		case 'boton-nivel10':
		cargarNivel(45,84);
		break;
		 }
	});
	$(document).on('input change', '#velocidad-juego', function() {
     switch ($(this).val())
	  {
		case '1':
		 $('#velocidad').html('Lento');
		 $velocidad = 3000;		  
		break;
		case '2':
		 $('#velocidad').html('Normal');
		 $velocidad = 2200;
		break;
		case '3':
		 $('#velocidad').html('Rapido');
		 $velocidad = 1750;
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
			  $(':mobile-pagecontainer').pagecontainer('change', '#niveles',{
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
		  
		  $('#btncontinuar').on('tap', function (){             
             $("#quien").popup("close",{transition: "flip"});
			 $alto = $('#juego').height();
			 animarCaida ($alto);
		 });
		  
		  
		
		  $('.boton').on('click', function() {
			  $pulsado=true;
			  $("#tablero-adivinar").stop();
			  if ($(this).hasClass('boton-correcto'))
			   {
				  $aciertos = $aciertos + 1;  
				  $('#encontrados').html($aciertos);
				  $('#aciertos').html($aciertos);
				  $("#acierto").popup();
				  audio.play('acierto');
				  $("#acierto").popup('open', {transition: "slide"});
			   }
			  else
			   {
			    $("#error").popup();
				navigator.notification.vibrate(500);
				$("#error").popup('open', {transition: "slide"});	
			   }
			   
		  });
		  
		  function animarCaida($alto){
			 $alto = $alto - ($alto*.1);
			  $velocidad_actual = "";
			  $velocidad_actual = $velocidad-(($velocidad * ($alto/603)) - $velocidad);
			  
			  
  $('#uno').css('top', 0 - ($alto*$posicion_azar[0])+'px');
  $('#tres').css('top', 0 - ($alto*$posicion_azar[1])+'px');
  $('#dos').css('top', 0 - ($alto*$posicion_azar[2])+'px');
    $('#dos').css('position', 'relative');
	$('#uno').css('position', 'relative');
	$('#tres').css('position', 'relative');
 
  $("#tablero-adivinar").clearQueue().stop().animate({top: $alto}, $velocidad_actual, "linear", function() {
	 if(!$pulsado)
	  {
		  $("#error").popup();
				navigator.notification.vibrate(500);
				$("#error").popup('open', {transition: "slide"});		  
	  }

  });
 }//animar caida
 
 $('#btnfin').on('tap', function(){
   $("#fin").popup('close', {transition: "slidefade"});	
   
	
});
 
 $('#btn_otro_elemento').on('tap', function(){
   $("#acierto").popup('close', {transition: "slidefade"});	
   
	
});

$('#btn_error_elemento').on('tap', function(){
   $("#error").popup('close', {transition: "slidefade"});	
   
	
});


$(document).on("popupafterclose", "#acierto", function () {
	revisar();

});

$(document).on("popupafterclose", "#error", function () {
	revisar();

});
 
function revisar()
  {
	  $("#tablero-adivinar").css({top: "30px"});
	 if ($actual < $arreglo_elementos.length-1)
	  {
		$actual=$actual+1;
		colocar_adivinar($actualmin,$actualmax);     
	  }
	  else
	   {   $completado = 	($aciertos*100)/(($actualmax-$actualmin)+1);
	      $completado = $completado.toFixed(1);
		   $('#porcentaje').html($completado +"%");
		    switch ($cual_nivel.substring(11))
			 {
				 case '1':
				  $('#mayor-uno').html($completado );
				 break;
				 case '2':
				  $('#mayor-dos').html($completado );
				 break;
				 case '3':
				  $('#mayor-tres').html($completado);
				 break;
				 case '4':
				  $('#mayor-cuatro').html($completado);
				 break;
				 case '5':
				  $('#mayor-cinco').html($completado );
				 break;
				 case '6':
				  $('#mayor-seis').html($completado );
				 break;
				 case '7':
				  $('#mayor-siete').html($completado );
				 break;
				 case '8':
				  $('#mayor-ocho').html($completado );
				 break;
				 case '9':
				  $('#mayor-nueve').html($completado );
				 break;
				 case '10':
				  $('#mayor-diez').html($completado );
				 break;
			 }
		   $('#encontrados-fin').html($aciertos);
		   
		   $(':mobile-pagecontainer').pagecontainer('change', '#niveles',{transition: 'none'});
		 
		   
		   
		   $("#fin").popup();
				navigator.notification.vibrate(500);
				$("#fin").popup('open', {transition: "slide"});
	   }
  }
 

	  

 } //device ready
}); //ready