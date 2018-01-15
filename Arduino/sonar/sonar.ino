#include <NewPing.h>


#define TRIGGER_PIN  2   // Arduino pin 2 tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     3   // Arduino pin 3 tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 500 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonarA(2, 3, MAX_DISTANCE); 
NewPing sonarB(4, 5, MAX_DISTANCE); 
 
void setup() {
  Serial.begin(9600);
}

void loop() {
  delay(200);
  // read distance from sensor and send to serial
  Serial.printlns("A:");
  Serial.println( sonarA.ping_cm() );


  delay(200);
  Serial.println("B:");
  Serial.println( sonarB.ping_cm() );
  
}

