//Modulos requeridos
//var lcdi2c = require('lcdi2c');
//var dht    = require('dht-sensor');
//var gpio   = require('onoff').Gpio;
var Request= require("request");
var rp     = require('request-promise');



var api = {
    method: 'GET',
    uri: "https://balkiest-ruff-7920.dataplicity.io/api/job?apikey=2D12C1ECED1E4314A28CD39D0AA6FAAA",
    json: true
};

rp(api)
    .then(function (parsedBody) {
        //console.log(parsedBody)
        //console.log(parsedBody.state)
        if (parsedBody.state == "Printing"){
            //Si la impresora esta funcionando encendemos el dispplay
            var FICHERO = parsedBody.job.file.name
            var PROGRESO = parsedBody.progress.completion
            PROGRESO = PROGRESO.toFixed(2);
            var RESTANTE = (parsedBody.progress.printTimeLeft / 60) / 60
            RESTANTE = RESTANTE.toFixed(2);
            console.log("Archivo: " + FICHERO + " %")
            console.log("Progreso: " + PROGRESO + "%")
            console.log("Restante: " + RESTANTE + " horas")
        }

    })
    .catch(function (err) {
        console.log(err)
        return res.status(500).send({
            message: "error al recuperar datos del job"
        });

    });