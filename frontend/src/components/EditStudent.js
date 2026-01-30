import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [loading, setLoading] = useState(true);

  // Bài 3: Lấy thông tin học sinh hiện tại
  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
        console.log('✅ Đã tải thông tin học sinh:', res.data);
      })
      .catch(err => {
        console.error('❌ Lỗi khi tải thông tin:', err);
        alert('Không thể tải thông tin học sinh!');
        navigate('/');
      });
  }, [id, navigate]);

  // Bài 3: Cập nhật thông tin học sinh
  const handleUpdate = (e) => {
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

    const updatedStudent = {
      name: name.trim(),
      age: Number(age),
      class: stuClass.trim()
    };

    axios.put(`${API_URL}/${id}`, updatedStudent)
      .then(res => {
        console.log('✅ Đã cập nhật học sinh:', res.data);
        alert('Cập nhật thông tin thành công! ✅');
        navigate('/');
      })
      .catch(err => {
        console.error('❌ Lỗi khi cập nhật:', err);
        alert('Không thể cập nhật thông tin. Vui lòng thử lại!');
      });
  };

  if (loading) {
    return (
      <div className="loading">
        ⏳ Đang tải thông tin học sinh...
      </div>
    );
  }

  return (
    <div className="edit-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Quay lại
      </button>

      <div className="header">
        <h1>✏️ CHỈNH SỬA THÔNG TIN HỌC SINH</h1>
      </div>

      <div className="form-section">
        <form className="student-form" onSubmit={handleUpdate}>
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
              💾 Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
