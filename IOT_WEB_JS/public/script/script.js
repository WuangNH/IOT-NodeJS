const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// biểu đồ

// function generateDayWiseTimeSeries(baseTimestamp, numberOfDays, valueRange) {
//   var series = [];
//   for (var i = 0; i < numberOfDays; i++) {
//     var timestamp = baseTimestamp + i * 24 * 60 * 60 * 1000; // Thêm 1 ngày (24 giờ) vào thời gian
//     var value =
//       Math.random() * (valueRange.max - valueRange.min) + valueRange.min; // Giá trị ngẫu nhiên trong khoảng min và max
//     series.push([timestamp, value]);
//   }
//   return series;
// }

// function generateDayWiseTimeSeries(numberOfDays, valueRange) {
//   var series = [];
//   var baseTimestamp = new Date(); // Sử dụng thời gian hiện tại
//   baseTimestamp.setDate(baseTimestamp.getDate() - numberOfDays); // Trừ đi số ngày để quay lại quá khứ
//   baseTimestamp = baseTimestamp.getTime(); // Chuyển đổi thành timestamp

//   for (var i = 0; i < numberOfDays; i++) {
//     var timestamp = baseTimestamp + i * 24 * 60 * 60 * 1000; // Thêm 1 ngày (24 giờ) vào thời gian
//     var value =
//       Math.random() * (valueRange.max - valueRange.min) + valueRange.min; // Giá trị ngẫu nhiên trong khoảng min và max
//     series.push([timestamp, value]);
//   }
//   return series;
// }

// var options = {
//   series: [
//     {
//       name: "Nhiệt độ",
//       data: generateDayWiseTimeSeries(
//         new Date("24 Aug 2023 GMT").getTime(),
//         20,
//         {
//           min: 10,
//           max: 60,
//         }
//       ),
//     },
//     {
//       name: "Độ ẩm",
//       data: generateDayWiseTimeSeries(
//         new Date("24 Aug 2023 GMT").getTime(),
//         20,
//         {
//           min: 10,
//           max: 20,
//         }
//       ),
//     },
//     {
//       name: "Ánh sáng",
//       data: generateDayWiseTimeSeries(
//         new Date("24 Aug 2023 GMT").getTime(),
//         20,
//         {
//           min: 10,
//           max: 60,
//         }
//       ),
//     },
//   ],
//   chart: {
//     type: "area",
//     height: 350,
//     stacked: true,
//     events: {
//       selection: function (chart, e) {
//         console.log(new Date(e.xaxis.min));
//       },
//     },
//   },
//   colors: ["#FD7238", "#3C91E6", "#FFCE26"],
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   fill: {
//     type: "gradient",
//     gradient: {
//       opacityFrom: 0.6,
//       opacityTo: 0.8,
//     },
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "left",
//   },

//   // xaxis: {
//   //   type: "datetime",
//   // },

//   // xaxis: {
//   //   type: "datetime",
//   //   labels: {
//   //     formatter: function (value) {
//   //       // Định dạng lại thời gian thành giờ:phút:giây sử dụng luxon
//   //       return DateTime.fromMillis(value).toFormat("HH:mm:ss");
//   //     },
//   //     reverse: true, // Đảo ngược trục x để hiển thị thời gian giảm dần
//   //   },
//   // },

//   xaxis: {
//     type: "datetime",
//     labels: {
//       formatter: function () {
//         const now = new Date();
//         const hours = now.getHours();
//         const minutes = now.getMinutes();
//         const seconds = now.getSeconds();
//         return (
//           hours +
//           ":" +
//           (minutes < 10 ? "0" : "") +
//           minutes +
//           ":" +
//           (seconds < 10 ? "0" : "") +
//           seconds
//         );
//       },
//     },
//   },
// };

// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();
// function addDataFromSpansToChart() {
//   const randomNumber1 = parseFloat(
//     document.getElementById("randomNumber1").textContent
//   );
//   const randomNumber2 = parseFloat(
//     document.getElementById("randomNumber2").textContent
//   );
//   const randomNumber3 = parseFloat(
//     document.getElementById("randomNumber3").textContent
//   );

//   // Thêm giá trị vào dữ liệu biểu đồ
//   options.series[0].data.push([new Date().getTime(), randomNumber1]);
//   options.series[1].data.push([new Date().getTime(), randomNumber2]);
//   options.series[2].data.push([new Date().getTime(), randomNumber3]);

//   // Giới hạn số lượng điểm dữ liệu hiển thị trong biểu đồ (nếu bạn muốn giới hạn)
//   const maxDataPoints = 20; // Số lượng điểm dữ liệu tối đa trong biểu đồ
//   if (options.series[0].data.length > maxDataPoints) {
//     options.series[0].data.shift(); // Loại bỏ điểm dữ liệu cũ nhất
//     options.series[1].data.shift();
//     options.series[2].data.shift();
//   }

//   chart.updateSeries(options.series);
//   chart.updateOptions({
//     series: options.series,
//   });
// }

// setInterval(updateChartData, 1000);

// // Hàm cập nhật dữ liệu ngẫu nhiên và cập nhật biểu đồ
// function updateChartData() {
//   options.series.forEach(function (seriesData) {
//     seriesData.data = generateDayWiseTimeSeries(
//       new Date("24 Aug 2023 GMT").getTime(),
//       20,
//       {
//         min: 10,
//         max:
//           seriesData.name === "South"
//             ? 100
//             : seriesData.name === "North"
//             ? 100
//             : 100,
//       }
//     );
//   });
//   chart.updateOptions({
//     series: options.series,
//   });
// }

// // Cập nhật dữ liệu sau mỗi 5 giây
// // setInterval(updateChartData, 1000);

// // Định nghĩa hàm generateDayWiseTimeSeries

// function generateDayWiseTimeSeries(baseval, count, yrange) {
//   var i = 0;
//   var series = [];
//   while (i < count) {
//     var x = baseval;
//     var y =
//       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//     series.push([x, y]);
//     baseval += 86400000; // 1 ngày trong milliseconds
//     i++;
//   }
//   return series;
// }

// button on/off



document.addEventListener("DOMContentLoaded", function () {
  const btn1 = document.getElementById("dashbroad-btn");
  const btn2 = document.getElementById("profile-btn");
  const btn3 = document.getElementById("logging-btn");
  const btn4 = document.getElementById("ation-btn");
  const content1 = document.getElementById("content");
  const content2 = document.getElementById("bg-light");
  const content3 = document.getElementById("logging");
  const content4 = document.getElementById("btn-record");

  btn1.addEventListener("click", function () {
    content1.style.display = "block";
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "none";
  });

  btn2.addEventListener("click", function () {
    content1.style.display = "none";
    content2.style.display = "block";
    content3.style.display = "none";
    content4.style.display = "none";
  });

  btn3.addEventListener("click", function () {
    content1.style.display = "none";
    content2.style.display = "none";
    content3.style.display = "block";
    content4.style.display = "none";
  });
  btn4.addEventListener("click", function () {
    content1.style.display = "none";
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "block";
  });
});

// document.addEventListener("DOMContentLoaded", function() {
//     const btn1 = document.getElementById("dashbroad-btn");
//     const btn2 = document.getElementById("profile-btn");

//     btn1.addEventListener("click", function() {
//         console.log("Dashboard button clicked");
//         // Thêm mã thay đổi hiển thị ở đây
//     });

//     btn2.addEventListener("click", function() {
//         console.log("Profile button clicked");
//         // Thêm mã thay đổi hiển thị ở đây
//     });
// });


    // Hàm để cập nhật dữ liệu trên trang
    function updateSensorData(data) {
      const temperatureDisplay = document.getElementById("temperatureDisplay");
      const humidityDisplay = document.getElementById("humidityDisplay");
      const lightDisplay = document.getElementById("lightDisplay");

      // Kiểm tra xem có dữ liệu hay không
      if (data.length > 0) {
          const latestData = data[0]; // Lấy bản ghi mới nhất

          // Cập nhật các phần tử hiển thị với dữ liệu mới
          temperatureDisplay.textContent = latestData.temperature ;
          humidityDisplay.textContent = latestData.humidity ;
          const mappedLight = mapLightValue(latestData.light);
          lightDisplay.textContent = mappedLight;
      }
  }

  function mapLightValue(light) {
    return (100 - ((light - 99) / (1024 - 99)) * 100).toFixed(2);
}

  // Hàm để lấy dữ liệu từ API và cập nhật trang
  function fetchDataAndDisplay() {
      fetch("/latest_sensor_data")
          .then((response) => response.json())
          .then((data) => {
              console.log("Dữ liệu mới nhất:", data);
              updateSensorData(data);
          })
          .catch((error) => {
              console.error("Lỗi khi lấy dữ liệu:", error);
          });
  }

  // Gọi fetchDataAndDisplay một lần khi trang được tải
  fetchDataAndDisplay();

  // Sử dụng setInterval để gọi nó sau mỗi giây và cập nhật trang
  setInterval(fetchDataAndDisplay, 1000);



//   record log

const tableRows = [];
const tableRows2 = [];

// Hàm để thêm số liệu vào bảng

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Định dạng giờ thành hai chữ số
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Định dạng phút thành hai chữ số
  const seconds = now.getSeconds().toString().padStart(2, "0"); // Định dạng giây thành hai chữ số

  return `${hours}:${minutes}:${seconds}`;
}

// Hàm kiểm tra đèn tắt hay bật

function isBackgroundColorBlack(elementId) {
  const element = document.getElementById(elementId);

  // Kiểm tra xem phần tử có tồn tại không
  if (!element) {
    console.error(`Phần tử với ID ${elementId} không tồn tại.`);
    return false; // Hoặc giá trị mặc định khác tùy bạn
  }

  // Lấy giá trị background-color
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;

  // Kiểm tra giá trị background-color
  return backgroundColor === "rgb(108, 204, 122)" ? "Bật" : "Tắt";
}




// function addDataToTable() {
//   // Lấy giá trị từ các thẻ HTML
//   const value1 = document.getElementById("randomNumber1").textContent;
//   const value2 = document.getElementById("randomNumber2").textContent;
//   const value3 = document.getElementById("randomNumber3").textContent;
//   const value5 = isBackgroundColorBlack("img-light");
//   const value6 = isBackgroundColorBlack("img-pan");

//   // Lấy thẻ tbody của bảng
//   const tbody = document.querySelector("#data-table tbody");
//   const tbody2 = document.querySelector("#action-table tbody");

//   // Tạo một dòng mới
//   const newRow = tbody.insertRow(0);
//   const newRow2 = tbody2.insertRow(0);

//   // Tạo các ô dữ liệu cho từng cột
//   const cell1 = newRow.insertCell(0);
//   const cell12 = newRow2.insertCell(0);

//   const cell2 = newRow.insertCell(1);
//   const cell3 = newRow.insertCell(2);
//   const cell4 = newRow.insertCell(3);
//   const cell5 = newRow2.insertCell(1);
//   const cell6 = newRow2.insertCell(2);

//   // Đặt giá trị cho từng ô
//   cell1.textContent = getCurrentTime();
//   cell12.textContent = getCurrentTime();
//   cell2.textContent = value1 + " °C";
//   cell3.textContent = value2 + " %";
//   cell4.textContent = value3 + " lux";
//   cell5.textContent = value5;
//   cell6.textContent = value6;

//   // Thêm dòng mới vào mảng
//   tableRows.push(newRow);
//   tableRows2.push(newRow2);

//   // Kiểm tra kích thước của mảng, nếu lớn hơn 10, loại bỏ dòng cũ
//   if (tableRows.length > 20) {
//     const removedRow = tableRows.shift(); // Loại bỏ dòng cũ nhất
//     tbody.removeChild(removedRow); // Xóa dòng cũ khỏi bảng
//   }
//   if (tableRows2.length > 20) {
//     const removedRow2 = tableRows2.shift(); // Loại bỏ dòng cũ nhất
//     tbody.removeChild(removedRow2); // Xóa dòng cũ khỏi bảng
//   }
// }

// Gọi hàm để thêm số liệu vào bảng khi trang web được tải
// window.onload = addDataToTable;






// Cập nhật số liệu và thêm vào bảng sau mỗi 5 giây
// setInterval(addDataToTable, 5000); // 5000 mili giây = 5 giây


// const tableRows2 = [];
// function addDataToTable22() {
//   // Lấy giá trị từ các thẻ HTML
//   // const value1 = document.getElementById("randomNumber1").textContent;
//   // const value2 = document.getElementById("randomNumber2").textContent;
//   // const value3 = document.getElementById("randomNumber3").textContent;
//   const value5 = isBackgroundColorBlack("img-light");
//   const value6 = isBackgroundColorBlack("img-pan");

//   // Lấy thẻ tbody của bảng
//   const tbody = document.querySelector("#action-table tbody");

//   // Tạo một dòng mới
//   const newRow2 = tbody.insertRow(0);

//   // Tạo các ô dữ liệu cho từng cột
//   const cell1 = newRow2.insertCell(0);
//   // const cell2 = newRow.insertCell(1);
//   // const cell3 = newRow.insertCell(2);
//   // const cell4 = newRow.insertCell(3);
//   const cell5 = newRow2.insertCell(1);
//   const cell6 = newRow2.insertCell(2);

//   // Đặt giá trị cho từng ô
//   cell1.textContent = getCurrentTime();
//   // cell2.textContent = value1 + " °C";
//   // cell3.textContent = value2 + " %";
//   // cell4.textContent = value3 + " lux";
//   cell5.textContent = value5;
//   cell6.textContent = value6;

//   // Thêm dòng mới vào mảng
//   tableRows2.push(newRow);

//   // Kiểm tra kích thước của mảng, nếu lớn hơn 10, loại bỏ dòng cũ
//   if (tableRows2.length > 20) {
//     const removedRow2 = tableRows2.shift(); // Loại bỏ dòng cũ nhất
//     tbody.removeChild(removedRow2); // Xóa dòng cũ khỏi bảng
//   }
// }

// // Gọi hàm để thêm số liệu vào bảng khi trang web được tải
// window.onload = addDataToTable;

// // Cập nhật số liệu và thêm vào bảng sau mỗi 5 giây
// setInterval(addDataToTable, 5000); // 5000 mili giây = 5 giây
