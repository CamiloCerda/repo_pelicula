$(document).ready(function(){
    LlenarNumeros();
    cargarContenido('1');

    $("#numeros button").click(function(){
        if ($(this).hasClass('btn-outline-secondary')){
            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            $(this).removeClass('btn-outline-secondary');
            $(this).addClass('btn-secondary');
        }
        $("#contenedorPeliculas").empty();
        cargarContenido($(this).text());
    });

    $("#presDerecha").click(function(){
        var siguiente = $('#numeros .btn-secondary').next('button');
        if (!$("#numeros button:last").hasClass("btn-secondary")){
            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            siguiente.removeClass('btn-outline-secondary');
            siguiente.addClass('btn-secondary');
        }
        /*if (parseInt($("#numeros button:last").text()) < 500){
            for(let i = 0; i < 12; i++) {

            }
        }*/ //$("#numeros").children() aca trabajar mañana
    });

    $("#presIzquierda").click(function(){
        var anterior = $('#numeros .btn-secondary').prev('button');
        if (!$("#numeros button:first").hasClass("btn-secondary")){
            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            anterior.removeClass('btn-outline-secondary');
            anterior.addClass('btn-secondary');
        }
    });

    function LlenarNumeros(){
        var soloUnaVez = true;
        for(let i = 0; i < 12; i++){
            if (soloUnaVez) {
                $("#numeros").append('<button class="btn btn-secondary">'+(i+1)+'</button>')
                soloUnaVez = false;
            }else {
                $("#numeros").append('<button class="btn btn-outline-secondary">'+(i+1)+'</button>')
            }
        }
    }
    function cargarContenido(numeroPagina){
        $.get({
            url:'https://api.themoviedb.org/3/discover/movie?api_key=c485490fd1f63bb346da39f1f5f9950f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page='+numeroPagina+'&with_watch_monetization_types=flatrate',
            success: function(respuesta){
                for(let i = 0; i < respuesta.results.length; i++) {
                    $("#contenedorPeliculas").append("<div class='cajaPelicula'>"+
                                    "<img src='https://image.tmdb.org/t/p/original"+respuesta.results[i].poster_path+"' alt=''>"+
                                    "<div class='contenidoPelicula'>"+
                                        "<div class='tituloPelicula'>"+
                                            "<h5>"+respuesta.results[i].title+"</h5>"+
                                        "</div>"+
                                        "<div class='descripcionPelicula'>"+
                                            "<p>"+respuesta.results[i].overview+"</p>"+
                                        "</div>"+
                                        "<button class='btn btn-secondary'>Más...</button>"+
                                    "</div>"+
                                "</div>");
                    //console.log(respuesta.results[i]);
                }
                
            },
            error: function(errorRespuesta){
                console.log(errorRespuesta);
            }
        });      
    }
    /* $.get({
        url:'https://api.themoviedb.org/3/movie/75780/images?api_key=c485490fd1f63bb346da39f1f5f9950f',
        success: function(respuesta){
            for(let i = 0; i < respuesta.backdrops.length; i++){
                //$('body').append('<img src="https://image.tmdb.org/t/p/original'+respuesta.backdrops[i].file_path+'" alt="">');
                //$('body').append('<img src="https://image.tmdb.org/t/p/w500'+respuesta.backdrops[i].file_path+'" alt="">');
            }
            console.log(respuesta.backdrops);
            
            for(let i = 0; i < respuesta.posters.length; i++){
                //$('body').append('<img src="https://image.tmdb.org/t/p/original'+respuesta.posters[i].file_path+'" alt="">');
                //$('body').append('<img src="https://image.tmdb.org/t/p/w500'+respuesta.posters[i].file_path+'" alt="">');
            }
            console.log(respuesta.posters);
        },
        error: function(errorRespuesta){
            console.log(errorRespuesta);
        }
    }); */
});