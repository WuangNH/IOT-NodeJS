document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchResults = document.getElementById("searchResults");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const minTemperature = document.getElementById("minTemperature").value;
    const maxTemperature = document.getElementById("maxTemperature").value;
    const minHumidity = document.getElementById("minHumidity").value;
    const maxHumidity = document.getElementById("maxHumidity").value;

    const url = `/search-records?startTime=${startTime}&endTime=${endTime}&minTemperature=${minTemperature}&maxTemperature=${maxTemperature}&minHumidity=${minHumidity}&maxHumidity=${maxHumidity}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Hiển thị dữ liệu tìm kiếm trong div searchResults
      searchResults.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu tìm kiếm:", error);
      searchResults.innerHTML = "Đã xảy ra lỗi trong quá trình tìm kiếm.";
    }
  });
});
