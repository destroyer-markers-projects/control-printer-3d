
var lcdi2c = require('lcdi2c');
var lcd = new lcdi2c(1, 0x27, 16, 2);
var currentTime = new Date();
lcd.clear();
lcd.println(currentTime.toTimeString().substring(0, 8), 1);
lcd.println(message, 2);