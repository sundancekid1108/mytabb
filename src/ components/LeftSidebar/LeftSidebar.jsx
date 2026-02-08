import { useState, useEffect } from 'react';

const LeftSidebar = () => {
    // 상태 관리: 사이드바 메뉴 활성화
    const [activeMenu, setActiveMenu] = useState('Collections');
    const menuItems = ['CollectionsCollectionsCollectionsCollections', 'History', 'Tags',];
    return (
        <aside className="w-64 bg-gray-900 text-gray-400 flex flex-col flex-shrink-0">
            {/* 로고 영역 */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                    My<span className="text-red-500">Tabb</span>
                </h1>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto" >
                {menuItems.map((item) => (
                    <div
                        key={item}
                        onClick={() => setActiveMenu(item)}
                        className={`px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 font-medium
              ${activeMenu === item
                            ? 'bg-gray-800 text-white'
                            : 'hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        {item === 'CollectionsCollectionsCollectionsCollections' && '📂 '}
                        {item === 'History' && '🕒 '}
                        {item === 'Tags' && '🏷️ '}
                        {item}
                    </div>
                ))}
            </nav>

            {/* 하단 업그레이드 버튼 */}
            <div className="p-4 border-t border-gray-800">
                <button className="w-full py-2 px-4 border border-gray-600 rounded text-sm hover:border-gray-400 text-gray-300 transition-colors">
                    Upgrade Plan
                </button>
            </div>
        </aside>
    )
}

export default LeftSidebar;