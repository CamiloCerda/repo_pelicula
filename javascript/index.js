$(document).ready(function(){
    LlenarNumeros();
    var valorNext = 1, valorPrev = 1, idiomaSeleccionado = 'es', idGenerosSeleccionados = -1;
    cargarContenido(1, idiomaSeleccionado);
    mostrarGeneros(idiomaSeleccionado);

    $("#numeros button").click(function(){
        if ($(this).hasClass('btn-outline-secondary')){
            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            $(this).removeClass('btn-outline-secondary');
            $(this).addClass('btn-secondary');
        }
        $("#contenedorPeliculas").empty();
        cargarContenido($(this).text(), idiomaSeleccionado);
        valorNext = parseInt($(this).text());
    });

    $("#presDerecha").click(function(){
        var siguiente = $('#numeros .btn-secondary').next('button');

        if (!$("#numeros button:last").hasClass("btn-secondary")){
            valorNext = parseInt($("#numeros .btn-secondary").text()) + 1;
            $("#contenedorPeliculas").empty();
            cargarContenido(valorNext,idiomaSeleccionado);

            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            siguiente.removeClass('btn-outline-secondary');
            siguiente.addClass('btn-secondary');
        }else {
            if(parseInt($("#btn8").text()) < 500){
                valorNext = parseInt($("#numeros .btn-secondary").text()) + 1;
                $("#contenedorPeliculas").empty();
                cargarContenido(valorNext,idiomaSeleccionado);

                $("#numeros button").removeClass('btn-secondary');
                $("#numeros button").addClass('btn-outline-secondary');
                $("#btn1").removeClass('btn-outline-secondary');
                $("#btn1").addClass('btn-secondary');
            }
            var valorUltimoBtn = parseInt($("#numeros button:last").text());
            for(let i = 1; i < 13; i++){
                if (valorUltimoBtn+i <= 500){
                    $("#btn"+i+"").text(valorUltimoBtn+i);
                }else {
                    $("#btn"+i+"").hide();
                }
            }
        }
    });

    $("#presIzquierda").click(function(){
        var anterior = $('#numeros .btn-secondary').prev('button');
        
        if (!$("#numeros button:first").hasClass("btn-secondary")){
            valorPrev = parseInt($("#numeros .btn-secondary").text()) - 1;
            $("#contenedorPeliculas").empty();
            cargarContenido(valorPrev, idiomaSeleccionado);

            $("#numeros button").removeClass('btn-secondary');
            $("#numeros button").addClass('btn-outline-secondary');
            anterior.removeClass('btn-outline-secondary');
            anterior.addClass('btn-secondary');
        }else {
            if(parseInt($("#btn1").text()) > 1){
                valorPrev = parseInt($("#numeros .btn-secondary").text()) - 1;
                $("#contenedorPeliculas").empty();
                cargarContenido(valorPrev, idiomaSeleccionado);

                $("#numeros button").removeClass('btn-secondary');
                $("#numeros button").addClass('btn-outline-secondary');
                $("#btn12").removeClass('btn-outline-secondary');
                $("#btn12").addClass('btn-secondary');
                $("#numeros button").show();
            }

            var valorPrimerBtn = parseInt($("#numeros button:first").text());
            for(let i = 1; i < 13; i++){
                if (valorPrimerBtn - (13-i) >= 1){
                    $("#btn"+i+"").text(valorPrimerBtn - (13-i));
                }
            }            
        }
    });

    $("#listaIdiomas li").click(function(){
        $("#contenedorPeliculas").empty();
        idiomaSeleccionado = idiomas[$(this).text()]
        cargarContenido($("#numeros .btn-secondary").text(), idiomaSeleccionado);
        mostrarGeneros(idiomaSeleccionado);
    });
    var idiomas = {English:'en', Italiano:'it',Francais:'fr',日本語:'ja',Portugues:'pt',Pусский:'ru',Español:'es'}
    

    function mostrarGeneros(idioma){
        $.get({
            url:'https://api.themoviedb.org/3/genre/movie/list?api_key=c485490fd1f63bb346da39f1f5f9950f&language='+idioma,
            success: function(respuesta){
                $("#listaGeneros").empty();
                $("#listaGeneros").append('<li><a class="dropdown-item" id="-1" href="#">Todas</a></li>');
                for(let i = 0; i < respuesta.genres.length; i++){
                    $("#listaGeneros").append('<li><a class="dropdown-item" id="'+respuesta.genres[i].id+'" href="#">'+respuesta.genres[i].name+'</a></li>');
                }
                $("#liGeneros li a").click(function(){
                    $("#contenedorPeliculas").empty();
                    $("#numeros button").removeClass('btn-secondary');
                    $("#numeros button").addClass('btn-outline-secondary');
                    $("#btn1").removeClass('btn-outline-secondary');
                    $("#btn1").addClass('btn-secondary');
                    idGenerosSeleccionados = $(this).attr('id');
                    cargarContenido(1, idiomaSeleccionado);
                });
            },
            error: function(errorRespuesta){
                console.log(errorRespuesta);
            }
        });
    }
    
    function LlenarNumeros(){
        var soloUnaVez = true;
        for(let i = 0; i < 12; i++){
            if (soloUnaVez) {
                $("#numeros").append('<button class="btn btn-secondary" id="btn'+(i+1)+'">'+(i+1)+'</button>')
                soloUnaVez = false;
            }else {
                $("#numeros").append('<button class="btn btn-outline-secondary" id="btn'+(i+1)+'">'+(i+1)+'</button>')
            }
        }
    }
    
    function cargarContenido(numeroPagina, idioma){
        if(idGenerosSeleccionados == -1){
            $.get({
                url:'https://api.themoviedb.org/3/discover/movie?api_key=c485490fd1f63bb346da39f1f5f9950f&language='+idioma+'&sort_by=popularity.desc&include_adult=false&include_video=true&page='+numeroPagina+'&with_watch_monetization_types=flatrate',
                success: function(respuesta){
                    //console.log(respuesta);
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
                                        "</div>"+
                                        "<button class='btn btn-secondary' id='"+respuesta.results[i].id+"' data-bs-toggle='modal' data-bs-target='#exampleModal'><i class='fas fa-search-plus'></i></button>"+
                                    "</div>");
                        //console.log(respuesta.results[i]);
                    }
                    
                    $("#contenedorPeliculas button").click(function(){
                        buscarImagenesPelicula($(this).attr('id'));
                    });
                },
                error: function(errorRespuesta){
                    console.log(errorRespuesta);
                }
            });    
        }
        else{
            $.get({
                url:'https://api.themoviedb.org/3/discover/movie?api_key=c485490fd1f63bb346da39f1f5f9950f&language='+idioma+'&sort_by=popularity.desc&include_adult=false&include_video=true&page='+numeroPagina+'&with_watch_monetization_types=flatrate&with_genres='+idGenerosSeleccionados,
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
                                        "</div>"+
                                        "<button class='btn btn-secondary' id='"+respuesta.results[i].id+"' data-bs-toggle='modal' data-bs-target='#exampleModal'><i class='fas fa-search-plus'></i></button>"+
                                    "</div>");
                        //console.log(respuesta.results[i]);
                    }
                    $("#contenedorPeliculas button").click(function(){
                        buscarImagenesPelicula($(this).attr('id'));
                    });
                },
                error: function(errorRespuesta){
                    console.log(errorRespuesta);
                }
            });
        }  
    }

    function buscarImagenesPelicula(id){
        $.get({
            url:'https://api.themoviedb.org/3/movie/'+id+'/images?api_key=c485490fd1f63bb346da39f1f5f9950f',
            success: function(respuesta){
                console.log('aca')
                $("#cuerpoModalPelicula #contenedorFotosModal").empty();
                $.each(respuesta.backdrops, function(indice,elemento){
                    console.log(indice, elemento.file_path);
                    $("#cuerpoModalPelicula #contenedorFotosModal").append('<img src="https://image.tmdb.org/t/p/original'+elemento.file_path+'" alt="">');
                });
                
                console.log('posters')
                $.each(respuesta.posters, function(indice, elemento){
                    console.log(indice, elemento);
                })
            },
            error: function(errorRespuesta){
                console.log(errorRespuesta);
            }
        });
    }
});