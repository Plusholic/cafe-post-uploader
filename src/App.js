import React from 'react';
import NaverCafePostForm from './NaverCafePostForm.js'; // 방금 만든 컴포넌트 import

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          네이버 카페 글쓰기
        </h1>
        <NaverCafePostForm />
      </div>
    </div>
  );
}

export default App;