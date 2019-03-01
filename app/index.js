// import libraries
import clock from "clock";
import document from "document";
import {preferences as user_settings} from "user-settings";
import { battery } from "power";
import { goals, today } from "user-activity";
import { preferences } from "fitbit-preferences";
import asap from "fitbit-asap/app";
import dtlib from "../common/datetimelib"

// trying to get user settings if saved before
if (!preferences.starColor) {
  preferences.starColor = "white";
  preferences.vacuumColor = "black";
  preferences.showBattery = false;
  preferences.showActivity = "disabled"
}

let h1img = document.getElementById("h1");
let h2img = document.getElementById("h2");
let m1img = document.getElementById("m1");
let m2img = document.getElementById("m2");
let solidBackground = document.getElementById("solidBackground");
let imageBackground = document.getElementById("imageBackground");
let batteryMoon = document.getElementById("batteryMoon");
let batteryEarth = document.getElementById("batteryEarth");
let activityPlanet = document.getElementById("activityPlanet");
let activityOrbit = document.getElementById("activityOrbit");

function updateActivity(activity) {
  
  activityOrbit.sweepAngle = 360* Math.min(today.adjusted[activity],goals[activity]) /goals[activity];
}

function showHideActivity(activity) {

  if (activity == "disabled") {
    activityPlanet.style.display = "none";
    activityOrbit.style.display = "none";
  } else {
    activityPlanet.style.display = "inline";
    activityOrbit.style.display = "inline";
    updateActivity(activity);
  }
}

function updateBattery(charge) {
  batteryEarth.cx = batteryMoon.cx + batteryMoon.r*2*charge/100;
}

function showHideBattery(toggle) {
  if (toggle) {
    batteryMoon.style.display = "inline";
    batteryEarth.style.display = "inline";
    updateBattery(Math.floor(battery.chargeLevel));
  } else {
    batteryMoon.style.display = "none";
    batteryEarth.style.display = "none";    
  }
 
}

function setStarColor(color) {
    h1img.style.fill = color;
    h2img.style.fill = color;
    m1img.style.fill = color;
    m2img.style.fill = color;
    imageBackground.style.fill = color;
    batteryMoon.style.fill = color;
    activityPlanet.style.fill = color;
    activityOrbit.style.fill = color;
}
setStarColor(preferences.starColor);

function setVacuumColor(color) {
  solidBackground.style.fill = color;
  batteryEarth.style.fill = color;
}
setVacuumColor(preferences.vacuumColor);

// get user time format preference
dtlib.timeFormat = user_settings.clockDisplay == "12h" ? 1: 0;


// Update the clock every minute
clock.granularity = "minutes";


// Update the <text> element with the current time
function updateClock() {
  
  let today = new Date(); // get current date/time
  
  // obtaining hours in user-preferred format and split them into 2 digits
  let hours = dtlib.format1224hour(today.getHours());
  let h1 = Math.floor(hours/10);
  let h2 = hours % 10;
  
  // obtaining minutes and split them into 2 digits
  let mins = today.getMinutes();
  let m1 = Math.floor(mins/10);
  let m2 = mins % 10;
  
  h1img.href = `digits/${h1}.png`;
  h2img.href = `digits/${h2}.png`;
  m1img.href = `digits/${m1}.png`;
  m2img.href = `digits/${m2}.png`;
  
  if (preferences.showActivity != "disabled") updateActivity(preferences.showActivity);

}

// Message is received
asap.onmessage = data => {
  
  switch (data.key) {
    case "starColor": 
          preferences.starColor = data.newValue.replace(/["']/g, "");
          setStarColor(preferences.starColor);
          break;
    case "vacuumColor":
          preferences.vacuumColor = data.newValue.replace(/["']/g, "");
          setVacuumColor(preferences.vacuumColor)
          break;
    case "showBattery":
          preferences.showBattery = (data.newValue == "true");
          showHideBattery(preferences.showBattery);
          break;
    case "showActivity":
          let activity = JSON.parse(data.newValue).values[0].value;

          if (activity === "elevationGain" && today.adjusted.elevationGain === undefined) {
            activity = "disabled";
          }

          preferences.showActivity = activity;
          showHideActivity(preferences.showActivity);
          break;
  };
 
  updateClock(); // and refresh the clock
      
}


// Update the clock every tick event
clock.ontick = () => updateClock();
updateClock();


//battery
battery.onchange = () => {updateBattery(Math.floor(battery.chargeLevel))};
showHideBattery(preferences.showBattery);

//activity
showHideActivity(preferences.showActivity);
console.log(preferences.showActivity);
