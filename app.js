// Crea un objeto nuevo del framework que creamos, sin la ->
// necesidad de escribir la palabra new
var g = G$('Luis', 'Ojeda');

// Utilizado los métodos que son encadenables
g.greet().setLanguage('English').greet(true).setLanguage('Spanish').log();

// Al hacer click en el botón, se muestra el lenguaje ->
// haciendo uso de nuestro framework
$('#btnLogin').click(function() {
    // Crea un nuevo objeto
    var loginGreetr = G$('Antonio', 'Orozco');

    // Le cambia el lenguaje al objeto, haciendo uso del selector y ->
    // además lo muestra en la página
    loginGreetr.setLanguage($('#language').val()).HTMLGreeting('#greeting', true).log();

});

