const express = require("express");
const mysql = require("mysql2");
const mqtt = require("mqtt");
const http = require("http");

const app = express();
const apiRoutes = require("./routes/api");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const path = require("path");
const { Chart } = require("chart.js"); // Import thư viện Chart.js

const bodyParser = require("body-parser");
const mqttClient = mqtt.connect("mqtt://192.168.0.106");
const client = mqtt.connect("mqtt://192.168.0.106");
// const mqttClient = mqtt.connect("mqtt://192.168.123.58");

const port = 8082;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "demo",
});

db.connect((err) => {
  if (err) {
    console.error("Không thể kết nối với cơ sở dữ liệu:", err);
    return;
  }
  console.log("Đã kết nối với cơ sở dữ liệu MySQL");

  db.query(
    `CREATE TABLE IF NOT EXISTS sensor_data1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature INT,
    humidity INT,
    light INT,
    state_1 INT,
    state_2 INT,
    state_3 INT,
    db INT,
    timestamp TIMESTAMP 
  )`,
    (err, results) => {
      if (err) {
        console.error("Lỗi khi tạo bảng:", err);
      } else {
        console.log("Đã tạo bảng sensor_data1 hoặc bảng đã tồn tại.");
      }
    }
  );
});

// const client = mqtt.connect("mqtt://192.168.123.58");

client.on("connect", () => {
  console.log("Đã kết nối thành công đến máy chủ MQTT");
  client.subscribe("sensor");
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

    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    db.query(
      "INSERT INTO sensor_data1 (temperature, humidity, light, state_1, state_2, state_3, db, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        jsonData.temperature,
        jsonData.humidity,
        jsonData.light,
        jsonData.state_1,
        jsonData.state_2,
        jsonData.state_3,
        jsonData.db,
        new Date(),
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

mqttClient.on("connect", () => {
  console.log("Đã kết nối thành công với MQTT broker");
});

mqttClient.on("error", (error) => {
  console.error("Không thể kết nối đến MQTT broker:", error);
});

io.on("connection", (socket) => {
  console.log("Máy khách đã kết nối qua WebSocket");

  // socket.on("controlRelay", (relayData) => {
  //   // Xử lý yêu cầu điều khiển và gửi tới MQTT broker
  //   const { relay1, relay2, relay3 } = relayData;

  //   if (relay1 === "on") {
  //     mqttClient.publish("relay_1", "0");
  //   } else if (relay1 === "off") {
  //     mqttClient.publish("relay_1", "1");
  //   }

  //   if (relay2 === "on") {
  //     mqttClient.publish("relay_2", "0");
  //   } else if (relay2 === "off") {
  //     mqttClient.publish("relay_2", "1");
  //   }

  //   if (relay3 === "on") {
  //     mqttClient.publish("relay_3", "0");
  //   } else if (relay3 === "off") {
  //     mqttClient.publish("relay_3", "1");
  //   }
  // });
});

app.use(bodyParser.json());

app.post("/control-relay", (req, res) => {
  const { relay1, relay2, relay3 } = req.body;

  // Kiểm tra và gửi thông điệp tới MQTT broker để điều khiển Đèn 1
  if (relay1 === "on") {
    mqttClient.publish("relay_1", "0"); // Gửi lệnh bật Đèn 1
  } else if (relay1 === "off") {
    mqttClient.publish("relay_1", "1"); // Gửi lệnh tắt Đèn 1
  } else if (relay1 === "nn") {
    mqttClient.publish("relay_1", "2"); // Gửi lệnh tắt Đèn 1
  }

  // Kiểm tra và gửi thông điệp tới MQTT broker để điều khiển Đèn 2
  if (relay2 === "on") {
    mqttClient.publish("relay_2", "0"); // Gửi lệnh bật Đèn 2
  } else if (relay2 === "off") {
    mqttClient.publish("relay_2", "1"); // Gửi lệnh tắt Đèn 2
  }

  // Kiểm tra và gửi thông điệp tới MQTT broker để điều khiển Đèn 3
  if (relay3 === "on") {
    mqttClient.publish("relay_3", "0"); // Gửi lệnh bật Đèn 3
    console.log("Chưa Tắt  được đèn 3");
  } else if (relay3 === "off") {
    mqttClient.publish("relay_3", "1"); // Gửi lệnh tắt Đèn 3
    console.log("Chưa bật được đèn 3");
  }
  console.log("đã điều khiển được cả 3 đèn");
  res.status(200).json({ message: "Đã điều khiển đèn" });
});

// Tạo route cho đường dẫn /latest_sensor_data
app.get("/latest_sensor_data", (req, res) => {
  // Thực hiện truy vấn SQL hoặc lấy dữ liệu từ nguồn nào đó
  // Ví dụ: Lấy dữ liệu từ cơ sở dữ liệu và trả về dưới dạng JSON
  db.query(
    "SELECT * FROM sensor_data1 ORDER BY timestamp DESC LIMIT 10",
    (err, results) => {
      if (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).send("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu.");
      } else {
        // Trả về dữ liệu dưới dạng JSON
        res.json(results);
      }
    }
  );
});





app.get("/search-records", (req, res) => {
  try {
    const temperature = req.query.temperature; // Giá trị nhiệt độ cụ thể
    const humidity = req.query.humidity; // Giá trị độ ẩm cụ thể
    const light = req.query.light; // Giá trị ánh sáng cụ thể

    // Bắt đầu truy vấn SQL
    let sql = "SELECT * FROM sensor_data1 WHERE 1";
    const params = [];

    // Kiểm tra và thêm điều kiện cho nhiệt độ cụ thể (nếu được cung cấp)
    if (temperature !== undefined && temperature !== "") {
      const parsedTemperature = parseFloat(temperature);
      if (!isNaN(parsedTemperature)) {
        sql += " AND temperature = ?";
        params.push(parsedTemperature);
      }
    }

    // Kiểm tra và thêm điều kiện cho độ ẩm cụ thể (nếu được cung cấp)
    if (humidity !== undefined && humidity !== "") {
      sql += " AND humidity = ?";
      params.push(humidity);
    }

    // Kiểm tra và thêm điều kiện cho ánh sáng cụ thể (nếu được cung cấp)
    if (light !== undefined && light !== "") {
      sql += " AND light = ?";
      params.push(light);
    }

    // Kiểm tra và thêm điều kiện cho khoảng thời gian nếu cần
    if (req.query.startTime && req.query.endTime) {
      sql += " AND timestamp >= ? AND timestamp <= ?";
      params.push(req.query.startTime, req.query.endTime);
    }

    db.query(sql, params, (err, results) => {
      if (err) {
        console.error("Lỗi khi tìm kiếm bản ghi:", err);
        res.status(500).json({ error: "Lỗi khi tìm kiếm bản ghi" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu tìm kiếm:", error);
    res.status(500).json({ error: "Lỗi nội bộ" });
  }
});


// app.get("/search-records", (req, res) => {
//   try {
//     const startTime = req.query.startTime;
//     const endTime = req.query.endTime;
//     const temperature = req.query.temperature; // Giá trị nhiệt độ cụ thể
//     const humidity = req.query.humidity; // Giá trị độ ẩm cụ thể
//     const light = req.query.light; // Giá trị ánh sáng cụ thể

//     if (!startTime || !endTime) {
//       res.status(400).json({ error: "Thời gian không hợp lệ" });
//       return;
//     }

//     // Bắt đầu truy vấn SQL
//     let sql = `
//       SELECT *
//       FROM sensor_data1
//       WHERE timestamp >= ? AND timestamp <= ?
//     `;
//     const params = [startTime, endTime];

//     // Kiểm tra và thêm điều kiện cho nhiệt độ cụ thể (nếu được cung cấp)
//     if (temperature !== undefined && temperature !== "") {
//       // Sử dụng parseFloat để chuyển giá trị nhiệt độ thành số thập phân
//       const parsedTemperature = parseFloat(temperature);
//       if (!isNaN(parsedTemperature)) {
//         sql += " AND temperature = ?";
//         params.push(parsedTemperature);
//       }
//     }

//     // Kiểm tra và thêm điều kiện cho độ ẩm cụ thể (nếu được cung cấp)
//     if (humidity !== undefined && humidity !== "") {
//       sql += " AND humidity = ?";
//       params.push(humidity);
//     }

//     // Kiểm tra và thêm điều kiện cho ánh sáng cụ thể (nếu được cung cấp)
//     if (light !== undefined && light !== "") {
//       sql += " AND light = ?";
//       params.push(light);
//     }

//     db.query(sql, params, (err, results) => {
//       if (err) {
//         console.error("Lỗi khi tìm kiếm bản ghi:", err);
//         res.status(500).json({ error: "Lỗi khi tìm kiếm bản ghi" });
//       } else {
//         res.json(results);
//       }
//     });
//   } catch (error) {
//     console.error("Lỗi khi xử lý yêu cầu tìm kiếm:", error);
//     res.status(500).json({ error: "Lỗi nội bộ" });
//   }
// });







app.get("/mqtt-data", (req, res) => {
  const mqttData = {
    relay1: "off",
    relay2: "off",
    relay3: "off", // Đọc trạng thái Đèn 3 từ MQTT broker
  };

  res.json(mqttData);
});

app.use("/api", apiRoutes);

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/views/sensor_data.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
