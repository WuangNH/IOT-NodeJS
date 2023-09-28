const toggleButtonRelay1 = document.getElementById("toggleRelay1");
const toggleButtonLight = document.getElementById("light-icoin");
let isRelay1On = false;

function toggleRelay1() {
  isRelay1On = !isRelay1On;
  if (isRelay1On) {
    // Gửi yêu cầu bật Đèn 1
    turnOnRelay1();
    toggleButtonRelay1.textContent = "LIGHT ON";
    toggleButtonLight.style.filter = "hue-rotate(0deg)"
  } else {
    // Gửi yêu cầu tắt Đèn 1
    turnOffRelay1();
    toggleButtonRelay1.textContent = "LIGHT OFF";
    toggleButtonLight.style.filter = "grayscale(100%)";

  }
}

// Hàm gửi yêu cầu đến máy chủ Node.js để điều khiển Đèn 1
function turnOnRelay1() {
  fetch("/control-relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relay1: "on",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
}

function turnOffRelay1() {
  fetch("/control-relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relay1: "off",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
}


const toggleButtonRelay2 = document.getElementById("toggleRelay2");
const fanIcon = document.getElementById("fan-icoin");

let isRelay2On = false;

function toggleRelay2() {
  isRelay2On = !isRelay2On;
  if (isRelay2On) {
    // Gửi yêu cầu bật Đèn 2
    turnOnRelay2();
    toggleButtonRelay2.textContent = "FAN ON";
    fanIcon.classList.add("rotate"); // Thêm lớp "rotate" để bật hiệu ứng quay
  } else {
    // Gửi yêu cầu tắt Đèn 2
    turnOffRelay2();
    toggleButtonRelay2.textContent = "FAN OFF";
    fanIcon.classList.remove("rotate"); // Xóa lớp "rotate" để ngừng hiệu ứng quay
  }
}


// Hàm gửi yêu cầu đến máy chủ Node.js để điều khiển Đèn 2
function turnOnRelay2() {
  fetch("/control-relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relay2: "on",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
}

function turnOffRelay2() {
  fetch("/control-relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relay2: "off",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
}