var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // The servo signal line is connected to
  // Digital PWM Pin 10
  var servo = new five.Servo(10);

  // You can add any objects to the board's REPL,
  // Let's add the servo here, so we can control
  // it directly from the REPL!
  board.repl.inject({
    servo: servo
  });
});