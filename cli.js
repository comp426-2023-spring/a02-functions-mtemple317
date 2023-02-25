#!/usr/bin/env node

import minimist from 'minimist' 
let args = minimist(process.argv.slice(2))
const empty = Object.keys(args).length ===1;
if (args.h || empty === true){

console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)
//process.exit(0)
}	

import moment from 'moment-timezone'

//const timezone = moment.tz.guess();
//Make a request
//built in, don't need?
import fetch from 'node-fetch';

const system_tz = moment.tz.guess()
//set timezone variable
const tz= args.z || system_tz || null // america/new york
//assign latitude
const latitude = args.n || -Math.abs(args.s) || null
const longitude = args.e || -Math.abs(args.w) || null 
if (!args.d) { args.d=1 }

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.92' + latitude + '&longitude=-79.05' + longitude + '&current_weather=true' + current_weather + '&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
//const response = await fetch ('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m');
//console.log(response)

//Get the data from the request
const data = await response.json();

//const args = process.argv;
//const args = minimist(process.argv.slice(2));

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
} 
/* Do you need to wear your galoshes?
if (( "$PRECIP_HOURS" > "0" )); then
  printf "You might need your galoshes ${DAY_PHRASE}.\n"
else
  printf "You probably won't need your galoshes ${DAY_PHRASE}.\n"
fi */

