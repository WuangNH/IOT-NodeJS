const express = require("express");
const mysql = require("mysql2");
const mqtt = require("mqtt");
const app = express();
const apiRoutes = require("./routes/api");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const path = require("path");
const { Chart } = require("chart.js"); // Import thư viện Chart.js
// const ApexCharts = require("apexcharts");

const bodyParser = require("body-parser");
const mqttClient = mqtt.connect("mqtt://192.168.0.105");

const port = 8081;

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "demo",
});

// Kết nối đến cơ sở dữ liệu MySQL
db.connect((err) => {
  if (err) {
    console.error("Không thể kết nối với cơ sở dữ liệu:", err);
    return;
  }
  console.log("Đã kết nối với cơ sở dữ liệu MySQL");

  // Tạo bảng sensor_data nếu nó chưa tồn tại
  db.query(
    `CREATE TABLE IF NOT EXISTS sensor_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT,
    humidity INT,
    light INT,
    state_1 INT,
    state_2 INT,
    db INT,
    timestamp DATETIME 
  )`,
    (err, results) => {
      if (err) {
        console.error("Lỗi khi tạo bảng:", err);
      } else {
        console.log("Đã tạo bảng sensor_data hoặc bảng đã tồn tại.");
      }
    }
  );
});

// Kết nối đến máy chủ MQTT
const client = mqtt.connect("mqtt://192.168.0.105");

client.on("connect", () => {
  console.log("Đã kết nối thành công đến máy chủ MQTT");
  client.subscribe("sensor"); // Thay thế 'sensor' bằng tên chủ đề MQTT bạn muốn lắng nghe
});

client.on("message", (topic, message) => {
  console.log(`Nhận dữ liệu từ chủ đề '${topic}': ${message.toString()}`);

  try {
    const jsonData = JSON.parse(message.toString());
    console.log("Dữ liệu JSON:", jsonData);
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time;

    // Lấy thời gian hiện tại
    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Thêm dữ liệu vào cơ sở dữ liệu
    db.query(
      "INSERT INTO sensor_data (temperature, humidity, light, state_1, state_2, db, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        jsonData.temperature,
        jsonData.humidity,
        jsonData.light,
        jsonData.state_1,
        jsonData.state_2,
        jsonData.db,
        today,
      ],
      (err, results) => {
        if (err) {
          console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
        } else {
          console.log("Đã thêm dữ liệu vào cơ sở dữ liệu.");
        }
      }
    );
  } catch (error) {
    console.error("Lỗi khi chuyển đổi dữ liệu JSON:", error);
  }
});





//Hàm biểu đồ
// Tạo biểu đồ bằng Chart.js
const chartData = {
  labels: [],
  datasets: [
    {
      label: "Temperature",
      borderColor: "rgb(255, 99, 132)",
      data: [],
    },
    {
      label: "Humidity",
      borderColor: "rgb(75, 192, 192)",
      data: [],
    },
    {
      label: "Light",
      borderColor: "rgb(255, 205, 86)",
      data: [],
    },
  ],
};

// Sử dụng Socket.io để cập nhật biểu đồ
io.on("connection", (socket) => {
  // Gửi dữ liệu biểu đồ khi có kết nối mới
  socket.emit("chartData", chartData);
  socket.on("message", (data) => {
    console.log("Received from server:", data);
  });
  // ... (Thêm mã để cập nhật dữ liệu biểu đồ khi nhận dữ liệu từ MQTT)
});




// Kết nối tới MQTT broker

mqttClient.on("connect", () => {
  console.log("Đã kết nối thành công với MQTT broker");
});

mqttClient.on("error", (error) => {
  console.error("Không thể kết nối đến MQTT broker:", error);
});
// Sử dụng bodyParser để phân tích dữ liệu JSON từ frontend
app.use(bodyParser.json());
// Lắng nghe yêu cầu từ phía frontend để điều khiển đèn 1 và đèn 2
app.post("/control-relay", (req, res) => {
  const { relay1, relay2 } = req.body;

  // Kiểm tra và gửi thông điệp tới MQTT broker để điều khiển đèn 1
  if (relay1 === "on") {
    mqttClient.publish("relay_1", "0");
  } else if (relay1 === "off") {
    mqttClient.publish("relay_1", "1");
  }

  // Kiểm tra và gửi thông điệp tới MQTT broker để điều khiển đèn 2
  if (relay2 === "on") {
    mqttClient.publish("relay_2", "0");
  } else if (relay2 === "off") {
    mqttClient.publish("relay_2", "1");
  }

  res.status(200).json({ message: "Đã điều khiển đèn" });
});







// Use the API routes
app.use("/api", apiRoutes);

// Serve static files from the 'public' folder
app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/sensor_data", (req, res) => {
  res.sendFile(__dirname + "/views/sensor_data.html");
});


// 1. Thêm route để xử lý yêu cầu từ trang HTML
app.get("/latest_sensor_data", (req, res) => {
  // 2. Thực hiện truy vấn SQL để lấy 10 bản ghi mới nhất
  db.query(
    "SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 10",
    (err, results) => {
      if (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).send("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu.");
      } else {
        // 3. Gửi kết quả truy vấn đến trang HTML
        res.json(results); // Gửi dữ liệu dưới dạng JSON
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
