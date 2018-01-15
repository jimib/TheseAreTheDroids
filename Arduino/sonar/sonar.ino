#include <NewPing.h>


#define TRIGGER_PIN  2   // Arduino pin 2 tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     3   // Arduino pin 3 tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 500 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.
#define DELAY_BETWEEN_SENSOR_READINGS 250 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.
#define DELAY_BETWEEN_LOOPS 250 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.


NewPing sonar0(2, 3, MAX_DISTANCE); 
NewPing sonar90(4, 5, MAX_DISTANCE);
NewPing sonar180(6, 7, MAX_DISTANCE);
NewPing sonar270(8, 9, MAX_DISTANCE);
 
void setup() {
  Serial.begin(9600);
}

void loop() {
  //read the values
  int distance0 = sonar0.ping_cm();
  delay( DELAY_BETWEEN_SENSOR_READINGS );
  int distance90 = sonar90.ping_cm();
  delay( DELAY_BETWEEN_SENSOR_READINGS );
  int distance180 = sonar180.ping_cm();
  delay( DELAY_BETWEEN_SENSOR_READINGS );
  int distance270 = sonar270.ping_cm();
  //write out in json format
  Serial.println( String('{"type":"distance","data":[{"angle":0,"distance":'+distance0+'},{"angle":90,"distance":'+distance90+'},{"angle":180,"distance":'+distance180+'},{"angle":270,"distance":'+distance270+'}]}') );
  //wait before looping again
  delay( DELAY_BETWEEN_LOOPS );
}

