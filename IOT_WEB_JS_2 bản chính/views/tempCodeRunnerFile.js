const toggleButtonRelay2 = document.getElementById("toggleRelay2");
// let isRelay2On = false;

// function toggleRelay2() {
//   isRelay2On = !isRelay2On;
//   if (isRelay2On) {
//     // Gửi yêu cầu bật Đèn 2
//     turnOnRelay2();
//     toggleButtonRelay2.textContent = "Tắt Đèn 2";
//   } else {
//     // Gửi yêu cầu tắt Đèn 2
//     turnOffRelay2();
//     toggleButtonRelay2.textContent = "Bật Đèn 2";
//   }
// }

// // Hàm gửi yêu cầu đến máy chủ Node.js để điều khiển Đèn 2
// function turnOnRelay2() {
//   fetch("/control-relay", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       relay2: "on",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     })
//     .catch((error) => {
//       console.error("Lỗi khi gửi yêu cầu:", error);
//     });
// }

// function turnOffRelay2() {
//   fetch("/control-relay", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       relay2: "off",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     })
//     .catch((error) => {
//       console.error("Lỗi khi gửi yêu cầu:", error);
//     });
// }