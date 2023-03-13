// Función que se invoca de inmediato, ->
// permite un objeto global y uno de jQuery
;(function (global, $) {

    // Permite utilizar el resultado de un constructor de funciones ->
    // para así no tener que utilizar siempre la palabra new
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    // No están expuestos al mundo exterior
    var supportedLanguages = ['Spanish', 'English', 'German'];

    // Saludos normales o informales
    var normalGreetings = {
        Spanish: 'Hola',
        English: 'Hello', 
        German: 'Hallo'
    };

    // Saludos formales
    var formalGreetings = {
        Spanish: 'Saludos',
        English: 'Greetings',
        German: 'Grüße'
    };

    // Mensajes de inicio de sesion
    var logMessages = {
        Spanish: 'Inició Sesión',
        English: 'Logged In',
        German: 'In Verbindung Gebracht'
    }

    // Aquí se ponen los metodos que se quieran agregar ->
    // al objeto que regresa de Greetr
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        // Valida si es un lenguaje permitido
        validate: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },

        informalGreeting: function() {
            return normalGreetings[this.language] + ' ' + this.firstName + '!';            
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function(formal) {
            var message;
            
            // En caso de ser indefinido o nulo, su valor ->
            // se va a considerar como 'false'
            if (formal) {
                message = this.formalGreeting();
            } else {
                message = this.informalGreeting();
            }

            if (console) {
                console.log(message);
            }

            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            return this;
        },

        setLanguage: function(newLanguage) {
            this.language = newLanguage;
            
            this.validate();

            return this;
        }, 

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw "jQuery not loaded";
            }

            if (!selector) {
                throw "Missing jQuery selector";
            }

            var message;

            if (formal) {
                message = this.formalGreeting();
            } else {
                message = this.informalGreeting();
            }

            // Agrega el mensaje en el lugar seleccionado del DOM
            $(selector).html(message);

            return this;
        }

    };

    // Construyendo el objeto que va a ser utilizado por la función Greetr
    Greetr.init = function(firstName, lastName, language) {
        var self = this;

        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'Spanish';

        self.validate();

    }

    // Cualquier objeto Greetr creado con la función init ->
    // va a apuntar a la cadena de prototipos del objeto
    Greetr.init.prototype = Greetr.prototype;

    // Estamos haciendo que los dos objetos globales apunten ->
    // a Greetr, para así poder llamar a la librería solo escribiendo G$
    global.Greetr = global.G$ = Greetr;

})(window, jQuery);