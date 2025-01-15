import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NaverCafePostForm from './NaverCafePostForm';
import NaverCallback from './NaverCallback';
import NaverLogin from './NaverLogin';
import './App.css';

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
           <br />
           <br />
           1. 로그인 시 전체 동의하기를 눌러주세요(카페 글쓰기 권한)
           <br />
           2. 글쓰기 후에는 카페를 방문해서 작성이 잘 됐는지 확인해주세요
           <br />
           3. 이미지는 세로로만 올라가고, 네이버 카페의 옛날 글쓰기 폼이라 수정을 추천드립니다.<br />
           네이버 카페에서 작성한 글의 수정버튼을 누르고 전체 내용을 복사 후 새로 글쓰기 진행(추천)
         </p>
         <Routes>
           <Route path="/" element={<NaverLogin />} /> {/* 첫 페이지를 로그인으로 */}
           <Route path="/write" element={<NaverCafePostForm />} /> {/* 글쓰기 페이지 */}
           <Route path="/naver/callback" element={<NaverCallback />} /> {/* 콜백 처리 */}
           <Route path="*" element={<Navigate to="/" replace />} /> {/* 모든 경로 처리 */}
         </Routes>
       </div>
     </div>
   </Router>
 );
}

export default App;