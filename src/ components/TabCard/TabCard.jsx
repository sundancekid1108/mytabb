import { useState, useEffect } from 'react';

const TabCard = ({ tab }) => {
    return(
        <div className="group relative bg-white h-32 p-4 rounded-xl shadow-sm border border-transparent hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 transition-all duration-200 cursor-pointer flex flex-col justify-between">
            {/* 상단: 파비콘 & 삭제 버튼 */}
            <div className="flex justify-between items-start">
                <img
                    src={`https://www.google.com/s2/favicons?domain=${tab.domain}&sz=64`}
                    alt="favicon"
                    className="w-7 h-7 rounded"
                />
                {/* group-hover: 마우스 올렸을 때만 X 버튼 표시 */}
                <button
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity"
                    onClick={(e) => {
                        e.stopPropagation(); // 카드 클릭 이벤트 방지
                        alert(`${tab.title} 삭제`); // 나중에 실제 삭제 로직 연결
                    }}
                >
                    ✕
                </button>
            </div>

            {/* 하단: 텍스트 정보 */}
            <div className="overflow-hidden">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{tab.title}</h3>
                <p className="text-xs text-gray-400 truncate mt-1">{tab.domain}</p>
            </div>
        </div>
    )

}

export default TabCard;