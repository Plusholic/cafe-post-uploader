import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NaverCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            try {
                // URL에서 네이버 인증 결과 파라미터 추출
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const state = urlParams.get('state');
                console.log('code:', code);
                console.log('state:', state);
                console.log('url:', window.location);
                if (!code || !state) {
                    throw new Error('필수 파라미터가 누락되었습니다.');
                }

                // OAuth 처리 API 호출
                const response = await axios.post(
                    `/dev/oauth/callback`,
                    { code, state },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 10000, // 타임아웃 설정
                    }
                );

                console.log('OAuth 처리 결과:', response.data);

                if (response.status === 200) {
                    // 로그인 성공 시 /write 페이지로 이동
                    navigate('/write');
                } else {
                    throw new Error('OAuth 처리 실패');
                }
            } catch (error) {
                console.error('OAuth 처리 중 에러:', error.message);

                // 실패 시 메인 페이지로 리다이렉션 및 에러 메시지 표시
                alert('로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
                navigate('/');
            }
        };

        processCallback();
    }, []); // 여기에 navigate 넣어뒀더니 비동기때문에 중복요청이 발생함 

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl mb-4">로그인 처리 중...</h2>
                <p className="text-gray-600">잠시만 기다려주세요.</p>
            </div>
        </div>
    );
}

export default NaverCallback;
