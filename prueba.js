var lcdi2c = require('lcdi2c');
var lcd = new lcdi2c(1, 0x3f, 16, 2);
var currentTime = new Date();
lcd.clear();
lcd.println(currentTime.toTimeString().substring(0, 8), 1);
lcd.println("Hola como eSSSSSSstas", 2);