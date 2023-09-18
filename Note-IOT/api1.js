// public/api.js

// Lấy tham chiếu đến phần tử HTML table để hiển thị dữ liệu
const dataTableElement = document.getElementById('dataTable');

// Hàm để tải dữ liệu từ API và hiển thị nó trong bảng
function fetchDataAndDisplay() {
  fetch('/api/sensor_data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu JSON ở đây, ví dụ:
      const tableRows = data.map((item) => {
        return `
          <tr>
            <td>${item.temperature}</td>
            <td>${item.humidity}</td>
            <td>${item.light}</td>
            <td>${item.state_1}</td>
            <td>${item.state_2}</td>
            // <td>${item.db}</td>
            <td>${item.timestamp}</td>
          </tr>
        `;
      }).join('');

      // Tạo nội dung của bảng HTML
      const tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Light</th>
              <th>State 1</th>
              <th>State 2</th>
              // <th>DB</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;

      // Hiển thị bảng trong phần tử HTML
      dataTableElement.innerHTML = tableHTML;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

// Gọi hàm để tải và hiển thị dữ liệu
fetchDataAndDisplay();

// Sử dụng setInterval để cập nhật dữ liệu mỗi 5 giây
// setInterval(fetchDataAndDisplay, 5000);
