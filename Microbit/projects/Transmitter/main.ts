radio.setGroup(1);

let name = "Transmitter";

basic.showString(name[0]);

let count = 0;
let speed = 0;
let delimiter = serial.delimiters(Delimiters.Comma);

serial.onDataReceived( delimiter, () => {
    let message = serial.readUntil( delimiter );
    switch (message) {
        case "heartbeat":
            serial.writeLine("heartbeat: " + (count));
            break;
        default:
            radio.sendString(message);
            break;
    }
});

//simulate the button presses - relay to the other controls
input.onButtonPressed(Button.A, function () {
    setSpeed( speed - 100 );
});

input.onButtonPressed(Button.B, function () {
    setSpeed( speed + 100 );
});

input.onButtonPressed(Button.AB, function () {
    setSpeed( 0 );
});

function setSpeed( val:number ) {
    if( !isNaN( val ) ){
        //set a record of the value
        speed = Math.min( 1023, Math.max( -1023, val ) );
        //determine the direction
        radio.sendString(":setSpeed:"+speed);
    }
}