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
    const [images, setImages] = useState([]); // 이미지 상태 추가
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 이미지 처리 함수 추가
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            // 활동 내용 포맷팅
            const formattedContent = `
[활동 유형] : ${formData.activity_type}<br>
[일시] : ${formData.date}<br>
[참여자] : ${formData.participants}<br>
[활동 내용]<br>
---------------<br>
${formData.description}
${images.map((_, index) => `<br><img src='#${index}' />`).join('')}
            `;

            const requestData = {
                user_id: "test_user",
                subject: formData.subject,
                content: formattedContent,
                images: images.map(img => img.split(',')[1]) // base64 데이터만 추출
            };

            const response = await axios({
                method: 'post',
                url: '/prod/post',
                data: requestData,
                headers: {
                    'Content-Type': 'application/json'
                },
                transformRequest: [
                    (data) => JSON.stringify(data)
                ],
                timeout: 10000
            });
    
            console.log('서버 응답:', response);
    
            if (response.status === 200) {
                alert('글이 성공적으로 작성되었습니다!');
                setFormData({
                    subject: '',
                    activity_type: '',
                    date: '',
                    participants: '',
                    description: ''
                });
                setImages([]); // 이미지도 초기화
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

            {/* 이미지 업로드 필드 추가 */}
            <div className="mb-4">
                <label className="block mb-2">이미지 첨부</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />
                {/* 이미지 미리보기 */}
                {images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                            />
                        ))}
                    </div>
                )}
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