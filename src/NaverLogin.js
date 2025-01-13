import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function NaverLogin() {
   const handleNaverLogin = () => {
       const authUrl = "https://nid.naver.com/oauth2.0/authorize";
       const params = {
           response_type: "code",
           client_id: "ANInyyXdRBw_CA2kVk8Z",
           redirect_uri: "http://localhost:3000/naver/callback",
           state: "RANDOM_STATE",
           scope: "cafe.write cafes"
       };

       // 네이버 로그인 페이지로 리다이렉트
       window.location.href = `${authUrl}?${new URLSearchParams(params).toString()}`;
   };

   return (
       <div className="flex items-center justify-center min-h-screen">
           <div className="text-center">
               <button 
                   onClick={handleNaverLogin}
                   className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
               >
                   네이버 로그인
               </button>
           </div>
       </div>
   );
}

export default NaverLogin;