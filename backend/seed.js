// Script để thêm dữ liệu mẫu vào MongoDB
// Chạy: node backend/seed.js

const mongoose = require('mongoose');
const Student = require('./Student');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/student_db')
  .then(() => console.log(" Đã kết nối MongoDB"))
  .catch(err => console.error(" Lỗi kết nối:", err));

// Dữ liệu mẫu
const sampleStudents = [
  { name: "Nguyễn Văn An", age: 18, class: "12A1" },
  { name: "Trần Thị Bích", age: 17, class: "11A2" },
  { name: "Lê Hoàng Cường", age: 18, class: "12B1" },
  { name: "Phạm Thị Dung", age: 16, class: "10A1" },
  { name: "Hoàng Văn Em", age: 17, class: "11B2" },
  { name: "Võ Thị Phương", age: 18, class: "12A2" },
  { name: "Đặng Văn Giang", age: 16, class: "10B1" },
  { name: "Bùi Thị Hoa", age: 17, class: "11A1" },
  { name: "Đinh Văn Khánh", age: 18, class: "12C1" },
  { name: "Mai Thị Lan", age: 16, class: "10A2" }
];

// Hàm seed dữ liệu
async function seedDatabase() {
  try {
    // Xóa dữ liệu cũ
    await Student.deleteMany({});
    console.log("  Đã xóa dữ liệu cũ");

    // Thêm dữ liệu mới
    const result = await Student.insertMany(sampleStudents);
    console.log(` Đã thêm ${result.length} học sinh mẫu`);
    
    // Hiển thị danh sách
    console.log("\n Danh sách học sinh vừa thêm:");
    result.forEach((student, index) => {
      console.log(`${index + 1}. ${student.name} - ${student.age} tuổi - Lớp ${student.class}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(" Lỗi khi seed dữ liệu:", error);
    process.exit(1);
  }
}

// Chạy seed
seedDatabase();
