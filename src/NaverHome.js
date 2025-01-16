import React from 'react';
import { useNavigate } from 'react-router-dom';

function NaverHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => navigate('/write')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        글쓰기
      </button>
      <button
        onClick={() => navigate('/calendar')}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        일정 등록
      </button>
    </div>
  );
}

export default NaverHome;