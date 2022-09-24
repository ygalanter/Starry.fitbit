import { peerSocket } from "fitbit-file-messaging";
import { settingsStorage } from "settings";

console.log("Companion Started");

setTimeout(() => {
  if (settingsStorage.getItem('showBattery') === null) {
    settingsStorage.setItem('showBattery', true)
  }
}, 100);

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};


// Send data to device using Messaging API
function sendVal(data) {
  peerSocket.send(data);
}