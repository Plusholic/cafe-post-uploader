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
                // ...formData,
                user_id: 'test_user',
                subject: "Test Subject",
                content: "Test Content",
            };
    
            console.log('요청 URL:', 'https://xw5z1g65hc.execute-api.us-east-1.amazonaws.com/dev/post');
            console.log('전송할 데이터:', requestData);
            
            const response = await axios({
                method: 'post',
                url: 'https://xw5z1g65hc.execute-api.us-east-1.amazonaws.com/dev/post',
                data: requestData,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 5000  // 5초 타임아웃 설정
            });
    
            console.log('응답:', response);
                
            if (response.status === 200) {
                alert('글이 성공적으로 작성되었습니다!');
                setFormData({
                    subject: '',
                    activity_type: '',
                    date: '',
                    participants: '',
                    description: ''
                });
            }
        } catch (error) {
            console.error('API 호출 에러:', error);
            if (error.response) {
                // 서버가 응답을 반환한 경우
                console.error('에러 응답 데이터:', error.response.data);
                console.error('에러 응답 상태:', error.response.status);
                console.error('에러 응답 헤더:', error.response.headers);
            } else if (error.request) {
                // 요청은 보냈지만 응답을 받지 못한 경우
                console.error('요청 객체:', error.request);
            } else {
                // 요청 설정 중에 문제가 발생한 경우
                console.error('에러 메시지:', error.message);
            }
            alert('글 작성에 실패했습니다: ' + (error.response?.data?.error || error.message));
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