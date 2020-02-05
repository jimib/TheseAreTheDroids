const _ = require('lodash');
const SerialPort = require('serialport');

const DELIMITER = ',';

SerialPort.list()
.then( (devices) => {
	//find the Microbit
	return _.filter( devices, {
		vendorId: '0d28',
		productId: '0204'
	} );
} )
.then( (devices) => {
	console.log( devices );
	//pick out the first device
	var device = _.first( devices );
	//open the first socket
	if( device ){
		//create the socket
		var socket = new SerialPort( device.path, { baudRate: 115200 } );
		//create a reference to the start time
		var timeStart = Date.now();
		setInterval( () => {
			//put a basic sinosoidal animation on to the speed of the wheel
			var phase = 0.2 * (2 * Math.PI * (Date.now() - timeStart) / 1000);
			socket.write(`:setSpeed:${Math.round( 100 * Math.cos( phase ) )}${DELIMITER}`);
		}, 100 );
	}else{
		console.error(`Unable to find a device`);

	}
} );


// const Readline = require('@serialport/parser-readline')
// const port = new SerialPort(path, { baudRate: 256000 })

// const parser = new Readline()
// port.pipe(parser)

// parser.on('data', line => console.log(`> ${line}`))
// port.write('ROBOT POWER ON\n')
