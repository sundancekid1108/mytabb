import { useState, useEffect, useMemo } from 'react';


const RightSidebar = ({ openTabs, onCloseTab, onSwitchTab })  => {
    // 1. 탭 목록을 windowId 기준으로 그룹화 (Memoization으로 성능 최적화)
    const tabsByWindow = useMemo(() => {
        const groups = {};
        openTabs.forEach((tab) => {
            if (!groups[tab.windowId]) {
                groups[tab.windowId] = [];
            }
            groups[tab.windowId].push(tab);
        });
        return groups;
    }, [openTabs]);

    // 윈도우 ID 목록 (키값) 가져오기
    const windowIds = Object.keys(tabsByWindow);
    console.log("tabsByWindow", tabsByWindow);

    return (
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 h-full">
            {/* 헤더 영역 */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                <h3 className="font-bold text-gray-700">Open Tabs</h3>
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                    {/* 전체 탭 개수 / 윈도우 개수 표시 */}
                    {openTabs.length} tabs / {windowIds.length} wins
                </span>
            </div>

            {/* 탭 리스트 영역 (스크롤 가능) */}
            <div className="flex-1 p-2 overflow-y-auto">

                {/* 2. 각 윈도우(그룹) 별로 순회 */}
                {windowIds.map((windowId, index) => (
                    <div key={windowId} className="mb-6 last:mb-0">

                        {/* 윈도우 구분 헤더 */}
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 rounded mb-1">
                            Window {index + 1}
                        </div>

                        {/* 해당 윈도우에 속한 탭들 순회 */}
                        {tabsByWindow[windowId].map((tab) => (
                            <div
                                key={tab.id}
                                onClick={() => onSwitchTab(tab.id, tab.windowId)} // 필요 시 windowId도 전달
                                className="group flex items-center p-3 mb-1 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors relative"
                            >
                                {/* 파비콘 (주석 해제 시 사용 가능) */}
                                {/* <img
                                    src={tab.favIconUrl || `https://www.google.com/s2/favicons?domain=${new URL(tab.url).hostname}&sz=32`}
                                    alt=""
                                    className="w-4 h-4 mr-3 flex-shrink-0 rounded-sm"
                                    onError={(e) => {e.target.style.display='none'}}
                                />
                                */}

                                {/* 탭 제목 */}
                                <div className="flex-1 min-w-0 mr-6"> {/* 삭제 버튼 공간 확보를 위해 mr-6 */}
                                    <p className="text-sm text-gray-700 truncate font-medium leading-tight">
                                        {tab.title}
                                    </p>
                                    {/* URL (선택사항) */}
                                    {/* <p className="text-xs text-gray-400 truncate mt-0.5">{new URL(tab.url).hostname}</p> */}
                                </div>

                                {/* 닫기 버튼 */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCloseTab(tab.id);
                                    }}
                                    className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                    title="Close Tab"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                ))}

                {/* 탭이 하나도 없을 때 안내 메시지 */}
                {openTabs.length === 0 && (
                    <div className="text-center text-gray-400 mt-10 text-sm">
                        No active tabs
                    </div>
                )}
            </div>
        </aside>
    );
}

export default RightSidebar;