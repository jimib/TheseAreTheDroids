let speed = 0;

radio.setGroup(1);

radio.onDataPacketReceived((packet) => {
    basic.clearScreen();
    speed = packet.receivedNumber;
    updateSpeed();
});

pins.analogSetPeriod(AnalogPin.P0, 20000);
pins.digitalWritePin(DigitalPin.P6, 0);
pins.digitalWritePin(DigitalPin.P7, 1);

basic.showString("M");

function updateSpeed() {
    setValue(speed);
    pins.analogWritePin(AnalogPin.P0, speed * 40);
}

function setValue(value: number) {
    //led.toggle(0, 0);
    //return;
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let iv = x + (y * 5);
            if (iv < value) {
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
}


