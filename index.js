//Modulos requeridos
//var lcdi2c = require('lcdi2c');
//var dht    = require('dht-sensor');
//var gpio   = require('onoff').Gpio;
var Request= require("request");
var rp     = require('request-promise');





function Movimiento() {

    //Declaramos variables
    var FICHERO  = ""
    var PROGRESO = ""
    var RESTANTE = ""
    
    var api = {
        method: 'GET',
        uri: "https://balkiest-ruff-7920.dataplicity.io/api/job?apikey=2D12C1ECED1E4314A28CD39D0AA6FAAA",
        json: true
    };

    rp(api)
        .then(function (parsedBody) {
            if (parsedBody.state == "Printing"){
                //Si la impresora esta funcionando encendemos el dispplay
                FICHERO = parsedBody.job.file.name
                PROGRESO = parsedBody.progress.completion
                PROGRESO = PROGRESO.toFixed(2);
                RESTANTE = (parsedBody.progress.printTimeLeft / 60) / 60
                RESTANTE = RESTANTE.toFixed(2);
                FICHERO  = "Archivo: " + FICHERO
                PROGRESO = "Progreso: " + PROGRESO + " %"
                RESTANTE = "Restante: " + RESTANTE + " horas"
                console.log(FICHERO)
            }

        })
        .catch(function (err) {
            console.log(err)
            FICHERO  = "Archivo : ERROR"
            PROGRESO = "Progreso: ERROR"
            RESTANTE = "Restante: ERROR"
        });
    
    console.log(FICHERO)
}

setInterval(Movimiento, 1500);

