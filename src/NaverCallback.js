import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NaverCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');
    
            if (!code || !state) {
                return;
            }
    
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));

                console.log('process.env.REACT_APP_API_ENDPOINT:', process.env.REACT_APP_API_ENDPOINT);
                const response = await axios.post(
                    process.env.REACT_APP_API_ENDPOINT,
                    { code, state },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 30000,
                    }
                );
    
                console.log('OAuth 처리 결과:', response.data);
    
                if (response.status === 200) {
                    if (response.data.userId) {
                        console.log('userId:', response.data.userId);
                        console.log('loginTime:', new Date().getTime());
                        localStorage.setItem('userId', response.data.userId);
                        localStorage.setItem('loginTime', new Date().getTime());
                    }
                    navigate('/home', { replace: true });
                }
            } catch (error) {
                console.error('OAuth 처리 중 에러:', error.message);
                localStorage.removeItem('userId');
                localStorage.removeItem('loginTime');
                alert('로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
                navigate('/', { replace: true });
            }
        };
    
        processCallback();
    }, []);
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
