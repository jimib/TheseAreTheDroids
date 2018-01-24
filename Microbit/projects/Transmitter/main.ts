radio.setGroup(1);

let name = "Transmitter";

basic.showString(name);
basic.showString(name[0]);

let count = 0;

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
    let message = serial.readLine();
    switch (message) {
        case "heartbeat":
            serial.writeLine("heartbeat: " + (count++));
            break;
        default:
            radio.sendString(message);
            break;
    }
});