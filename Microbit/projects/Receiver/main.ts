radio.setGroup(1);

radio.onDataPacketReceived((packet) => {
    setValue(packet.receivedNumber);
});

setValue(0);

function setValue(value: number) {
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