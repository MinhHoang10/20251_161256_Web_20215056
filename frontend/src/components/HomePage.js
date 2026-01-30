import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

function HomePage() {
  const navigate = useNavigate();
  
  // State quản lý danh sách học sinh
  const [students, setStudents] = useState([]);
  
  // State cho form thêm học sinh
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  
  // State cho tìm kiếm và sắp xếp
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Bài 1: Lấy danh sách học sinh khi component load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(API_URL)
      .then(response => {
        setStudents(response.data);
        console.log('✅ Đã tải danh sách học sinh:', response.data);
      })
      .catch(error => {
        console.error('❌ Lỗi khi fetch danh sách:', error);
        alert('Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.');
      });
  };

  // Bài 2: Thêm học sinh mới
  const handleAddStudent = (e) => {
    e.preventDefault();
    
    // Validate
    if (!name.trim() || !age || !stuClass.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (age < 1 || age > 100) {
      alert('Tuổi không hợp lệ!');
      return;
    }

    const newStudent = { 
      name: name.trim(), 
      age: Number(age), 
      class: stuClass.trim() 
    };

    axios.post(API_URL, newStudent)
      .then(res => {
        console.log('✅ Đã thêm học sinh:', res.data);
        setStudents(prev => [...prev, res.data]);
        
        // Xóa form
        setName('');
        setAge('');
        setStuClass('');
        
        alert('Thêm học sinh thành công! ✅');
      })
      .catch(err => {
        console.error('❌ Lỗi khi thêm:', err);
        alert('Không thể thêm học sinh. Vui lòng thử lại!');
      });
  };

  // Bài 3: Chuyển đến trang chỉnh sửa
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Bài 4: Xóa học sinh
  const handleDelete = (id, name) => {
    if (!window.confirm(`Bạn có chắc muốn xóa học sinh "${name}"?`)) {
      return;
    }

    axios.delete(`${API_URL}/${id}`)
      .then(res => {
        console.log('✅ Đã xóa học sinh:', res.data.message);
        setStudents(prevList => prevList.filter(s => s._id !== id));
        alert('Xóa học sinh thành công! ✅');
      })
      .catch(err => {
        console.error('❌ Lỗi khi xóa:', err);
        alert('Không thể xóa học sinh. Vui lòng thử lại!');
      });
  };

  // Bài 5: Lọc danh sách theo tìm kiếm
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bài 6: Sắp xếp danh sách
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="header">
        <h1>🎓 QUẢN LÝ HỌC SINH</h1>
        <p>Hệ thống quản lý thông tin học sinh - MERN Stack</p>
      </div>

      {/* Bài 2: Form thêm học sinh */}
      <div className="form-section">
        <h2>➕ Thêm Học Sinh Mới</h2>
        <form className="student-form" onSubmit={handleAddStudent}>
          <div className="form-group">
            <label>Họ và Tên *</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tuổi *</label>
            <input
              type="number"
              placeholder="18"
              value={age}
              onChange={e => setAge(e.target.value)}
              min="1"
              max="100"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Lớp *</label>
            <input
              type="text"
              placeholder="12A1"
              value={stuClass}
              onChange={e => setStuClass(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>&nbsp;</label>
            <button type="submit" className="btn-submit">
              Thêm Học Sinh
            </button>
          </div>
        </form>
      </div>

      {/* Bài 5 & 6: Tìm kiếm và Sắp xếp */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="sort-btn" onClick={() => setSortAsc(prev => !prev)}>
          📊 Sắp xếp: {sortAsc ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      {/* Bài 1: Hiển thị danh sách học sinh */}
      {sortedStudents.length === 0 ? (
        <div className="no-data">
          {searchTerm ? '🔍 Không tìm thấy học sinh nào!' : '📝 Chưa có học sinh nào. Hãy thêm học sinh mới!'}
        </div>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit" 
                      onClick={() => handleEdit(student._id)}
                    >
                      ✏️ Sửa
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(student._id, student.name)}
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        <p>📊 Tổng số học sinh: <strong>{students.length}</strong></p>
        {searchTerm && (
          <p>🔍 Kết quả tìm kiếm: <strong>{filteredStudents.length}</strong></p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
