import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NaverLogin() {
   const handleNaverLogin = () => {
       const authUrl = "https://nid.naver.com/oauth2.0/authorize";
       const params = {
           response_type: "code",
           client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
           redirect_uri: process.env.REACT_APP_REDIRECT_URI,
           state: "RANDOM_STATE",
           scope: "cafe.write cafes",
           auth_type: "reprompt"
       };
   
       // 네이버 로그인 페이지로 리다이렉트
       window.location.href = `${authUrl}?${new URLSearchParams(params).toString()}`;
   };

   const navigate = useNavigate();
   useEffect(() => {
       // 이미 로그인된 상태면 write 페이지로 리다이렉트
       const userId = localStorage.getItem('userId');
       if (userId) {
           navigate('/write', { replace: true }); // replace: true로 히스토리 대체
       }
   }, [navigate]);

   return (
    <div className="min-h-screen">
        <div className="text-center flex flex-col items-center gap-4">

          <div className="w-12">
              <img 
                  src="/login.jpeg" 
                  alt="로그인 시 동의" 
                  className="w-full h-auto"
                  width="256"  // 픽셀 단위로 실제 렌더링 크기 지정
                  height="256" // 비율 유지를 위해 적절한 높이 설정
              />
          </div>
            <button 
                onClick={handleNaverLogin}
                className="w-4/5 max-w-[200px] bg-green-500 text-white px-6 py-2.5 text-sm rounded-lg hover:bg-green-600 transition-colors"
            >
                네이버 로그인
            </button>
        </div>
    </div>
);
}

export default NaverLogin;