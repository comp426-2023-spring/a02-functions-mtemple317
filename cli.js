#!/usr/bin/env node
// Create Help text edited from example provide by jdmar3 galo.sh
//var printf =  "Usage: $0 [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n"

//var printf = "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n" 
//Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
//    -h            Show this help message and exit.
//    -n, -s        Latitude: N positive; S negative.
//    -e, -w        Longitude: E positive; W negative.
//    -z            Time zone: uses tz.guess() from moment-timezone by default.
//    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
//    -j            Echo pretty JSON from open-meteo API and exit.
//show_help () ({
 // printf = "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n"    
//  printf  "  -h\t\tShow this help message and exit.\n"
//  printf -- "  -n, -s\tLatitude: N positive; S negative.\n"
//  printf -- "  -e, -w\tLongitude: E positive; W negative.\n"
//  printf -- "  -z\t\tTime zone: uses tz.guess() from moment-timezone by default.\n"
//  printf -- "  -d 0-6\tDay to retrieve weather: 0 is today; defaults to 1.\n"
//  printf -- "  -j\t\tEcho pretty JSON from open-meteo API and exit.\n"
//	exit 0 )}
	

const moment = import('moment');
//const timezone = moment.tz.guess();
//was getting undefined error for 'guess' with the above so I used suggestion from here below https://github.com/moment/moment-timezone/issues/294

const timezone = guess();
function guess() {
  try {
    return moment.tz.guess();
  } catch (err) {
    return 'UTC'; // could also be something like moment.tz.names()[0];
  }
}

//Make a request
const response = await fetch ('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m');

//Get the data from the request
const data = await response.json();

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
