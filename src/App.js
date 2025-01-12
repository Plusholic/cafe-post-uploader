import React from 'react';
import NaverCafePostForm from './NaverCafePostForm.js';
import './styles.css';

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <h1>빛나는 책갈피 독서 소모임 활동보고 작성</h1>
          <p>빛나는 책갈피 네이버 카페 모임 보고 자동화 앱입니다. 네이버 카페 API를 사용하며, 최소한의 개인정보만을 수집합니다. 수집된 개인정보는 빛나는 책갈피 관련 개발 외의 용도로 사용되지 않습니다.</p> 
        <NaverCafePostForm />
      </div>
    </div>
  );
}

export default App;