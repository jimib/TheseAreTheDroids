radio.setGroup(1)

let speed = 0;
input.onButtonPressed(Button.A, () => {
    speed -= 1;
    if (speed < 0) {
        speed = 0;
    }
    notifyReceiver();
});

input.onButtonPressed(Button.B, () => {
    speed += 1;
    notifyReceiver();
});

function notifyReceiver() {
    radio.sendNumber(speed);
    setValue(speed);
}


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