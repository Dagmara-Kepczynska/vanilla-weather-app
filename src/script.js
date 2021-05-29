let now = new Date(); 
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
let month = months[now.getMonth()]; 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear(); 
let hour = now.getHours(); 
let minute = now.getMinutes();

 function transformMinute (minute) {
if (minute.toString().length < 2) {
  return `0${minute}`
} else {
  return minute
}
 }

let minutes = transformMinute(minute);

let liveDate = document.querySelector("h2.date");
liveDate.innerHTML = `${day}, ${date} ${month} ${year}`;

let liveTime = document.querySelector("span.time"); 
liveTime.innerHTML = `${hour}:${minutes}`;
