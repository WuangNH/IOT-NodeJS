function compareTime(time1, time2) {
    // Chuyển đổi chuỗi thời gian thành mảng chứa [hours, minutes, seconds]
    const time1Parts = time1.split(":").map(Number);
    const time2Parts = time2.split(":").map(Number);
  
    // So sánh giờ, phút và giây theo thứ tự ngược lại
    if (time1Parts[0] !== time2Parts[0]) {
      return time2Parts[0] - time1Parts[0];
    }
  
    if (time1Parts[1] !== time2Parts[1]) {
      return time2Parts[1] - time1Parts[1];
    }
  
    if (time1Parts[2] !== time2Parts[2]) {
      return time2Parts[2] - time1Parts[2];
    }
  
    // Nếu giờ, phút và giây đều giống nhau, trả về 0 (bằng nhau)
    return 0;
  }
  
  // Một ví dụ về cách sử dụng hàm so sánh để sắp xếp theo thứ tự ngược lại:
  const times = ["23:23:42", "15:30:15", "08:45:30"];
  times.sort(compareTime);
  
  console.log(times); // Kết quả: [ '23:23:42', '15:30:15', '08:45:30' ]
  