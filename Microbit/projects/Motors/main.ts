let speed = 0;

radio.setGroup(1);

radio.onDataPacketReceived((packet) => {
    basic.clearScreen();
    speed = packet.receivedNumber;
    updateSpeed();
});


input.onButtonPressed(Button.A, function () {
    speed = Math.max( -1023, speed - 100 );
    updateSpeed();
});

input.onButtonPressed(Button.B, function () {
    speed = Math.min(1023, speed + 100 );
    updateSpeed();
});

pins.analogWritePin(AnalogPin.P0, speed);
pins.analogSetPeriod(AnalogPin.P0, 20000);
updateSpeed();
basic.showString("M");

function updateSpeed() {
    setValue(speed);
    //determine the direction
    pins.digitalWritePin(DigitalPin.P1, speed > 0 ? 0 : 1 );
    pins.digitalWritePin(DigitalPin.P2, speed > 0 ? 1 : 0 );
    //determine the magnitude
    pins.analogWritePin(AnalogPin.P0, Math.abs(speed) );
}

function setValue(value: number) {
    //led.toggle(0, 0);
    //return;
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let iv = 10 * ( x + (y * 5) );
            if ( iv < value ) {
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
}


