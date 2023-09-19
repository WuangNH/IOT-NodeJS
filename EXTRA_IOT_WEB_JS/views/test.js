// Tạo một đối tượng Date đại diện cho ngày giờ hiện tại
var currentDate = new Date();
var today = new Date();
var date =
  today.getDate() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getFullYear();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// In ra đối tượng Date
console.log(currentDate);
console.log(time);
