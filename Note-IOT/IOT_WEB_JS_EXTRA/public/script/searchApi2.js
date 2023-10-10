


document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm2");
  const searchResult = document.getElementById("searchResult2");
  const actionTable = document.getElementById("actionTable");
  const appearAPIButton = document.getElementById("appearAPI2");
  

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Ẩn div có class "all-content" khi nhấn nút tìm kiếm
    
    actionTable.style.display = "none"
    searchResult.style.display = "block"
    const startTime = document.getElementById("startTime2").value;
    const endTime = document.getElementById("endTime2").value;

    // Gửi yêu cầu tìm kiếm bằng fetch API cho form tìm kiếm đầu tiên
    fetch(
      `/search-records?startTime=${encodeURIComponent(
        startTime
      )}&endTime=${encodeURIComponent(endTime)}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu tìm kiếm và hiển thị kết quả cho form tìm kiếm đầu tiên
        displaySearchResults(data, searchResult);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm:", error);
      });
  });


    // Xử lý sự kiện click trên nút appearAPI
    appearAPIButton.addEventListener("click", () => {
      actionTable.style.display = "block";
      searchResult.style.display = "none"
    });
    

  function formatState2(state) {
    return state === 0 ? "Tắt" : "Mở";
  }
  // Hàm để hiển thị kết quả và phân trang cho form tìm kiếm đầu tiên
  function displaySearchResults(data, resultElement) {
    // Số lượng mục trên mỗi trang
    const itemsPerPage = 20;

    // Lưu trữ dữ liệu tìm kiếm
    const searchData = data;

    // Hàm để hiển thị trang cụ thể
    function displayPage(page) {
      // Tạo một bảng HTML
      const tableElement = document.createElement("table");

      // Tạo hàng đầu tiên (header) của bảng
      const tableHeader = `
        <thead>
          <tr>
            <th>ID</th>
            <th>State 1</th>
            <th>State 2</th>
            <th>Timestamp</th>
          </tr>
        </thead>
      `;

      // Tạo phần thân của bảng (các hàng dữ liệu)
      const tableBody = document.createElement("tbody");

      // Tính toán chỉ mục bắt đầu và kết thúc của dữ liệu trên trang hiện tại
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = searchData.slice(startIndex, endIndex);

      // Thêm từng dòng dữ liệu vào bảng
      pageData.forEach((item) => {
        const formattedTimestamp = formatTimestamp1(item.timestamp);
        const state1 = formatState2(item.state_1);
        const state2 = formatState2(item.state_2);
        const formattedLight = mapLightValue(item.light);

        const tableRow = `
          <tr>
            <td>${item.id}</td>
            <td>${state1}</td>
            <td>${state2}</td>
            <td>${formattedTimestamp}</td>
          </tr>
        `;

        tableBody.innerHTML += tableRow;
      });

      // Gán nội dung HTML của bảng
      tableElement.innerHTML = tableHeader;
      tableElement.appendChild(tableBody);

      // Hiển thị bảng trong phần tử resultElement
      resultElement.innerHTML = "";
      resultElement.appendChild(tableElement);

      // Hiển thị phân trang
      displayPagination1(searchData, page, itemsPerPage, resultElement);
    }

    // Hàm để hiển thị phân trang
    function displayPagination1(
      data,
      currentPage,
      itemsPerPage,
      resultElement
    ) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const paginationElement = document.createElement("div");
      paginationElement.classList.add("pagination");

      // Hiển thị nút "Trang trước" và xử lý sự kiện khi nhấn
      const prevButton = document.createElement("button");
      prevButton.textContent = "Trang trước";
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          displayPage(currentPage - 1);
        }
      });
      paginationElement.appendChild(prevButton);

      // Hiển thị nút cho từng trang
      const maxButtons = 9; // Số lượng nút trang tối đa để hiển thị
      const halfMaxButtons = Math.floor(maxButtons / 2);

      if (totalPages <= maxButtons) {
        // Hiển thị tất cả nút trang nếu tổng số trang nhỏ hơn hoặc bằng maxButtons
        for (let i = 1; i <= totalPages; i++) {
          appendPageButton(i);
        }
      } else {
        // Xác định phần bắt đầu và kết thúc của danh sách nút trang để hiển thị
        let startPage = currentPage - halfMaxButtons;
        let endPage = currentPage + halfMaxButtons;

        if (startPage < 1) {
          startPage = 1;
          endPage = maxButtons;
        } else if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxButtons + 1;
        }

        // Hiển thị nút trang đầu và nút "..."
        if (startPage > 1) {
          appendPageButton(1);
          appendEllipsis();
        }

        // Hiển thị danh sách các nút trang
        for (let i = startPage; i <= endPage; i++) {
          appendPageButton(i);
        }

        // Hiển thị nút trang cuối và nút "..."
        if (endPage < totalPages) {
          appendEllipsis();
          appendPageButton(totalPages);
        }
      }

      // Hiển thị nút "Trang sau" và xử lý sự kiện khi nhấn
      const nextButton = document.createElement("button");
      nextButton.textContent = "Trang sau";
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          displayPage(currentPage + 1);
        }
      });
      paginationElement.appendChild(nextButton);

      // Hiển thị phân trang trong phần tử HTML
      resultElement.appendChild(paginationElement);

      // Hàm để thêm nút trang vào phân trang
      function appendPageButton(pageNumber) {
        const pageButton = document.createElement("button");
        pageButton.textContent = pageNumber;
        if (pageNumber === currentPage) {
          pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
          displayPage(pageNumber);
        });
        paginationElement.appendChild(pageButton);
      }

      // Hàm để thêm nút "..." vào phân trang
      function appendEllipsis() {
        const ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        paginationElement.appendChild(ellipsis);
      }
    }

    // Hiển thị trang đầu tiên khi có kết quả tìm kiếm
    displayPage(1);
  }
});
