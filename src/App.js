import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NaverCafePostForm from './NaverCafePostForm';
import NaverCallback from './NaverCallback';
import NaverLogin from './NaverLogin';
import './styles.css';

function App() {
 return (
   <Router>
     <div className="min-h-screen">
       <div className="bg-white">
         <h1 className="text-3xl font-bold text-gray-900 mb-4">빛나는 책갈피 독서 소모임 활동보고 작성</h1>
         <p className="text-gray-600 mb-8">
           빛나는 책갈피 네이버 카페 모임 보고 자동화 앱입니다. 네이버 카페 API를 사용하며, 
           최소한의 개인정보만을 수집합니다. 수집된 개인정보는 빛나는 책갈피 관련 개발 외의 
           용도로 사용되지 않습니다.
         </p>
         <Routes>
           <Route path="/" element={<NaverLogin />} /> {/* 첫 페이지를 로그인으로 */}
           <Route path="/write" element={<NaverCafePostForm />} /> {/* 글쓰기 페이지 */}
           <Route path="/naver/callback" element={<NaverCallback />} /> {/* 콜백 처리 */}
         </Routes>
       </div>
     </div>
   </Router>
 );
}

export default App;