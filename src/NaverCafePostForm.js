import React, { useState } from 'react';
import axios from 'axios';

function NaverCafePostForm() {
    const [formData, setFormData] = useState({
        subject: '',
        activity_type: '',
        date: '',
        participants: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const requestData = {
                user_id: "test_user",
                subject: "Test Subject",
                content: "Test Content"
            };
    
            // axios 기본 설정 변경
            const response = await axios({
                method: 'post',
                url: '/prod/post',
                data: requestData,
                headers: {
                    'Content-Type': 'application/json'
                },
                transformRequest: [
                    (data) => JSON.stringify(data)  // 직접 JSON 문자열로 변환
                ],
                timeout: 10000
            });
    
            console.log('서버 응답:', response);
    
            if (response.status === 200) {
                alert('글이 성공적으로 작성되었습니다!');
                setFormData({ /* 폼 초기화 */ });
            }
    
        } catch (error) {
            console.error('에러 전체 내용:', error);
            if (error.response) {
                console.error('에러 응답 데이터:', error.response.data);
                console.error('요청 설정:', error.config);
            }
            alert(`글 작성에 실패했습니다. (${error.message})`);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <div className="mb-4">
                <label className="block mb-2">제목</label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">활동 유형</label>
                <input
                    type="text"
                    name="activity_type"
                    value={formData.activity_type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">일시</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">참여자</label>
                <input
                    type="text"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">활동 내용</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                ></textarea>
            </div>

            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading}
            >
                {isLoading ? '글 작성 중...' : '카페 글 작성'}
            </button>
        </form>
    );
}

export default NaverCafePostForm;