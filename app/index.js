// import libraries
import clock from "clock";
import document from "document";
import {display} from "display";
import * as messaging from "messaging";
import * as fs from "fs";
import { me } from "appbit";
import {preferences} from "user-settings";
import { battery } from "power";
import dtlib from "../common/datetimelib"

// trying to get user settings if saved before
let userSettings;
try {
  userSettings = fs.readFileSync("user_settings.json", "json");
} catch (e) {
  userSettings = {starColor: "yellow", vacuumColor:"#000033"}
}

// on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
}

let h1img = document.getElementById("h1");
let h2img = document.getElementById("h2");
let m1img = document.getElementById("m1");
let m2img = document.getElementById("m2");
let solidBackground = document.getElementById("solidBackground");
let imageBackground = document.getElementById("imageBackground");
let batteryMoon = document.getElementById("batteryMoon");
let batteryEarth = document.getElementById("batteryEarth");

function updateBattery(charge) {
  batteryEarth.cx = batteryMoon.cx + batteryMoon.r*2*charge/100;
}



function setStarColor(color) {
    h1img.style.fill = color;
    h2img.style.fill = color;
    m1img.style.fill = color;
    m2img.style.fill = color;
    imageBackground.style.fill = color;
    batteryMoon.style.fill = color;
}
setStarColor(userSettings.starColor);

function setVacuumColor(color) {
  solidBackground.style.fill = color;
  batteryEarth.style.fill = color;
}
setVacuumColor(userSettings.vacuumColor);

// get user time format preference
dtlib.timeFormat = preferences.clockDisplay == "12h" ? 1: 0;


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

}

// Message is received
messaging.peerSocket.onmessage = evt => {
  
  switch (evt.data.key) {
    case "starColor": 
          userSettings.starColor = evt.data.newValue.replace(/["']/g, "");
          setStarColor(userSettings.starColor);
          break;
    case "vacuumColor":
          userSettings.vacuumColor = evt.data.newValue.replace(/["']/g, "");
          setVacuumColor(userSettings.vacuumColor)
          break;
  };
  console.log(evt.data.key);
  console.log(userSettings.vacuumColor);
  
  updateClock(); // and refresh the clock
      
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};


// Update the clock every tick event
clock.ontick = () => updateClock();
updateClock();


//battery
updateBattery(Math.floor(battery.chargeLevel));
battery.onchange = () => {updateBattery(Math.floor(battery.chargeLevel))};
