const dataTableElement1 = document.getElementById("dataTable");
const itemsPerPage1 = 25; // Số mục trên mỗi trang
let currentPage1 = 1; // Trang hiện tại

// public/api.js
function formatTimestamp1(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
function formatState1(state) {
  return state === 0 ? "Tắt" : "Mở";
}

function compareTime1(a, b) {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
  
    // So sánh ngày
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
}

function mapLightValue(light) {
  return (100 - ((light - 99) / (1024 - 99)) * 100).toFixed(2);
}


// Hàm để hiển thị dữ liệu trên trang cụ thể
function displayDataOnPage1(data, page) {
  const startIndex = (page - 1) * itemsPerPage1;
  const endIndex = startIndex + itemsPerPage1;
  const pageData = data.slice(startIndex, endIndex);
  currentPage1 = page;
  pageData.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
  
    // So sánh ngày
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });
  
  const tableRows = pageData
    .map((item) => {
      const formattedTimestamp = formatTimestamp1(item.timestamp);
      const state1 = formatState1(item.state_1);
      const state2 = formatState1(item.state_2);
      const formattedLight = mapLightValue(item.light);
      return `
      <tr>
      <td>${formattedTimestamp}</td>
        <td>${item.temperature} °C</td>
        <td>${item.humidity} %</td>
        <td>${formattedLight} Lux</td>
        
      </tr>
    `;
    })
    .join("");

  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Light</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  dataTableElement1.innerHTML = tableHTML;

  // Gọi hàm để hiển thị phân trang
  displayPagination1(data, page);
}

// Hàm để hiển thị phân trang
function displayPagination1(data, currentPage1) {
  const totalPages = Math.ceil(data.length / itemsPerPage1);
  const paginationElement = document.createElement("div");
  paginationElement.classList.add("pagination");

  // Hiển thị nút "Trang trước" và xử lý sự kiện khi nhấn
  const prevButton = document.createElement("button");
  prevButton.textContent = "Trang trước";
  prevButton.addEventListener("click", () => {
    if (currentPage1 > 1) {
      currentPage1--;
      displayDataOnPage1(data, currentPage1);
    }
  });
  paginationElement.appendChild(prevButton);

  // Hiển thị nút cho trang đầu tiên
  const firstPageButton = document.createElement("button");
  firstPageButton.textContent = "1";
  if (1 === currentPage1) {
    firstPageButton.classList.add("active");
  }
  firstPageButton.addEventListener("click", () => {
    currentPage1 = 1;
    displayDataOnPage1(data, currentPage1);
  });
  paginationElement.appendChild(firstPageButton);

  // Hiển thị nút cho trang thứ 2 nếu có
  if (totalPages > 1) {
    const secondPageButton = document.createElement("button");
    secondPageButton.textContent = "2";
    if (2 === currentPage1) {
      secondPageButton.classList.add("active");
    }
    secondPageButton.addEventListener("click", () => {
      currentPage1 = 2;
      displayDataOnPage1(data, currentPage1);
    });
    paginationElement.appendChild(secondPageButton);
  }

  // Hiển thị nút và dấu "..." cho các trang ở giữa
  if (totalPages > 5) {
    // Hiển thị nút cho trang trước "..."
    if (currentPage1 > 3) {
      const prevEllipsis = document.createElement("span");
      prevEllipsis.textContent = "...";
      paginationElement.appendChild(prevEllipsis);
    }

    // Hiển thị nút cho các trang ở giữa
    const startPage = Math.max(currentPage1 - 2, 3);
    const endPage = Math.min(currentPage1 + 2, totalPages - 2);

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === currentPage1) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage1 = i;
        displayDataOnPage1(data, currentPage1);
      });
      paginationElement.appendChild(pageButton);
    }

    // Hiển thị nút cho trang sau "..."
    if (currentPage1 < totalPages - 2) {
      const nextEllipsis = document.createElement("span");
      nextEllipsis.textContent = "...";
      paginationElement.appendChild(nextEllipsis);
    }
  } else {
    // Hiển thị nút cho tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng 5
    for (let i = 3; i <= totalPages - 2; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === currentPage1) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage1 = i;
        displayDataOnPage1(data, currentPage);
      });
      paginationElement.appendChild(pageButton);
    }
  }

  // Hiển thị nút cho trang cuối cùng
  const lastPageButton = document.createElement("button");
  lastPageButton.textContent = totalPages;
  if (totalPages === currentPage1) {
    lastPageButton.classList.add("active");
  }
  lastPageButton.addEventListener("click", () => {
    currentPage1 = totalPages;
    displayDataOnPage1(data, currentPage1);
  });
  paginationElement.appendChild(lastPageButton);

  // Hiển thị nút "Trang sau" và xử lý sự kiện khi nhấn
  const nextButton = document.createElement("button");
  nextButton.textContent = "Trang sau";
  nextButton.addEventListener("click", () => {
    if (currentPage1 < totalPages) {
      currentPage1++;
      displayDataOnPage1(data, currentPage1);
    }
  });
  paginationElement.appendChild(nextButton);

  // Hiển thị phân trang trong phần tử HTML
  dataTableElement1.appendChild(paginationElement);
}

// Lấy tham chiếu đến phần tử HTML table để hiển thị dữ liệu

// Hàm để tải dữ liệu từ API và hiển thị nó trong bảng
function fetchDataAndDisplay1() {
  fetch("/api/sensor_data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Sắp xếp dữ liệu theo thời gian giảm dần
      data.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
      
        // So sánh ngày
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      });
      // Hiển thị dữ liệu trên trang hiện tại
      displayDataOnPage1(data, currentPage1);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Gọi hàm để tải và hiển thị dữ liệu
fetchDataAndDisplay1();

// Sử dụng setInterval để cập nhật dữ liệu mỗi 5 giây
setInterval(fetchDataAndDisplay1, 1000);