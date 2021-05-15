//$(document).ready(function(){
    /* $('h1, h2').hide(); */
    /* $('h1').hide(); */
    /* $('.encabezado').hide(); */
   /*  $('#miH1').show(); */
   /* $('h1.encabezado').show(); */

   //function miBoton(){
       /* alert('hola mundo'); */
       /*$(selector).efecto(velocidad, callback)*/
       /* $('.primero').hide(2000, function(){
           alert('ocultamos el parrafo');
       }); */
       /* $('p.primero').toggle(2000); */
       /* $('p.primero').fadeOut(2000); */
       /* $('p.primero').fadeToggle(2000); */
/*        $('p.primero').slideToggle(300);
   } */

   //function mostrar(){
       /* $('p.primero').show(2000, function(){
           alert('mostramos el parrafo');
       }); */
   //}

/*    var btn = document.getElementById('boton');
   btn.addEventListener('click', miBoton);
   document.getElementById('boton2').addEventListener('click', mostrar); */
//});


$(document).ready(function(){
    $('#tercera').parent().css({
        background: '#b3f7a6'
    });

    $('.padre').children('#tercera').fadeOut(500);
    $('.padre').children('#tercera').fadeIn(2000);

    $('.padre').children().fadeOut(500);
    $('.padre').children().fadeIn(2000);

    $('.contenedor').find('#tercera').slideUp();
    $('.contenedor').find('#tercera').slideDown();

    $('#tercera').siblings().fadeOut(3000);
    $('#tercera').siblings().fadeIn(3000);

    $('#tercera').prev().css({
        background:'#ffffff'
    });
    $('#tercera').next().css({
        background:'#ffffff'
    });
    $('#tercera').prevAll().css({
        background:'#ffffff'
    });
    $('#tercera').nextAll().css({
        background:'#ffffff'
    });
    function saludar(){
        alert();
    }
    document.getElementById('boton').addEventListener('click', saludar);

    $('.caja').first().css({
        background:'#000000',
        color:'#ffffff'
    });
    $('.caja').last().css({
        background:'#000000',
        color:'#ffffff'
    });
    $('.caja').eq(1).css({
        background:'#000000',
        color:'#ffffff'
    });

    $('.caja').filter('#roja').css({
        background:'red'
    });
});