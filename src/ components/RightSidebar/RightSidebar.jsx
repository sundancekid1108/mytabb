import { useState, useEffect, useMemo } from 'react';
import useTabStore from "../../utils/zustand/store.js";
import { XMarkIcon } from '@heroicons/react/24/outline';

const RightSidebar = ()  => {

    // 필요한 상태와 함수만 선택해서 가져옴
    const { openTabs, selectedTabs, toggleSelectTab, closeTab, onSwitchTab } = useTabStore();
    console.log("openTabs", openTabs);
    console.log("selectedTabs", selectedTabs); // 체크할 때마다 이 배열이 변해야 합니다.

    // 그룹화 로직 (openTabs가 바뀔 때만 재계산)
    const tabsByWindow = useMemo(() => {
        const groups = {};
        openTabs.forEach((tab) => {
            if (!groups[tab.windowId]) groups[tab.windowId] = [];
            groups[tab.windowId].push(tab);
        });
        return groups;
    }, [openTabs]);


    // 윈도우 ID 목록 (키값) 가져오기
    const windowIds = Object.keys(tabsByWindow);

    return (


        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 h-full">
            {/* 헤더 영역 */}
            <div className=" h-16 p-5 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                <h3 className="font-bold text-gray-700">Open Tabs</h3>

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
                        {tabsByWindow[windowId].map((tab) => {
                            const isSelected = selectedTabs.some((selected) => selected.id === tab.id);

                            return (
                                <div
                                    key={tab.id}
                                    onClick={() => onSwitchTab(tab.id, tab.windowId)}
                                    className={`group flex items-center p-3 mb-1 rounded-lg transition-colors relative cursor-pointer
                                        ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                >
                                    {/* 파비콘 및 체크박스 영역 */}
                                    <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center relative"
                                         onClick={(e) => e.stopPropagation()} // 여기서 미리 막아버림
                                    >
                                        {/* 선택되지 않았을 때만 파비콘 표시 (호버 시 숨김) */}
                                        <div className={`${isSelected ? 'hidden' : 'group-hover:hidden'} flex items-center justify-center`}>
                                            {tab.favIconUrl ? (
                                                <img src={tab.favIconUrl} alt="" className="w-4 h-4 rounded-sm" />
                                            ) : (
                                                <div className="w-4 h-4 bg-gray-200 rounded-sm" />
                                            )}
                                        </div>

                                        {/* 체크박스: 호버 중이거나 이미 선택된 경우 표시 */}
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => {

                                                toggleSelectTab(tab);
                                            }}

                                            className={`${isSelected ? 'block' : 'hidden group-hover:block'} w-4 h-4 cursor-pointer accent-blue-600`}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0 mr-6">
                                        <p className={`text-sm truncate font-medium leading-tight ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                            {tab.title}
                                        </p>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            closeTab(tab.id);
                                        }}
                                        className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                        title="Close Tab"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            );
                        })}
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