const fanElement = document.querySelector(".fan");
const fanBladesElement = document.querySelector(".fan-blades");

let isOn = false;

fanElement.addEventListener("click", () => {
  if (isOn) {
    fanBladesElement.style.animation = "none"; // Tắt hiệu ứng quay
  } else {
    fanBladesElement.style.animation = "spin 1s linear infinite"; // Bật hiệu ứng quay
  }
  
  isOn = !isOn; // Đảo ngược trạng thái
});
