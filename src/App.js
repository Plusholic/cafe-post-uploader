import React from 'react';
import NaverCafePostForm from './NaverCafePostForm.js';
import './styles.css';

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <h1>빛나는 책갈피 독서 소모임 활동보고 작성</h1>
        <NaverCafePostForm />
      </div>
    </div>
  );
}

export default App;