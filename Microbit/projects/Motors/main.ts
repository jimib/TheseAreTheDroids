let speed = 0;
let count = 0;

let name = control.deviceSerialNumber().toString();

let delimiter = serial.delimiters(Delimiters.Comma);
serial.onDataReceived(delimiter, () => {
    parseMessage( serial.readUntil( delimiter ) );
});

function printMessage( message:string ){
    //serial.writeLine( message );
}

function parseMessage( message:string ){
    let parts = message.split(":");
    switch( parts[0] ){
        case name:
        case "":
            //action this
            printMessage("Action:" + parts[1] );
            switch( parts[1] ){
                case "register":
                    printMessage( name );
                break;
                case "setSpeed":
                    let s = parseInt( parts[2] );
                    printMessage( "setSpeed:" + s );
                    setSpeed( s );
                break;
            }
        break;
    }
}

radio.setGroup(1);

radio.onDataPacketReceived((packet) => {
    //parse the message
    parseMessage( packet.receivedString );
});


input.onButtonPressed(Button.A, function () {
    setSpeed( speed - 100 );
});

input.onButtonPressed(Button.B, function () {
    setSpeed( speed + 100 );
});

pins.analogWritePin(AnalogPin.P0, speed);
pins.analogSetPeriod(AnalogPin.P0, 20000);

setSpeed( 0 );

function setSpeed( val:number ) {
    if( !isNaN( val ) ){
        //set a record of the value
        speed = Math.min( 1023, Math.max( -1023, val ) );
        //determine the direction
        pins.digitalWritePin(DigitalPin.P1, speed > 0 ? 0 : 1 );
        pins.digitalWritePin(DigitalPin.P2, speed > 0 ? 1 : 0 );
        //determine the magnitude
        pins.analogWritePin(AnalogPin.P0, Math.abs(speed) );
        //update the led to help us debug
        //writeSpeedToLed( Math.abs( speed ) );
    }
}

function writeSpeedToLed(value: number) {
    //return;
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let iv = (1023 / 25) * ( x + (y * 5) );
            if ( iv < value ) {
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
}


