import {useState, useEffect, useCallback} from 'react';
import {getWindowsInfo} from './chromeapi/chromeapi.js'
import RightSidebar from "./ components/RightSidebar/RightSidebar.jsx";
import LeftSidebar from "./ components/LeftSidebar/LeftSidebar.jsx";
import Header from "./ components/Header/Header.jsx";
import CollectionGroup from './ components/CollectionGroup/CollectionGroup.jsx'
import useTabStore from './utils/zustand/store.js'
import {openTabDataSample} from './sample/testdata.js'

const  App = () => {
    // 상태 관리: 사이드바 메뉴 활성화
    const [activeMenu, setActiveMenu] = useState('Collections');
    const [openTabs, setOpenTabs] = useState([]);
    const [selectedTabs, setSelectedTabs] = useState([]);

    // 더미 데이터 (컬렉션)
    const [collections, setCollections] = useState([
        {
            id: 1,
            title: 'Daily Routine',
            tabs: [
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
                {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'}, {id: 101, title: 'Gmail', domain: 'gmail.com'},
                {id: 102, title: 'Notion', domain: 'notion.so'},
            ],
        },
    ]);


    // 1. 탭 목록 가져오기 함수 정의
    // const fetchTabs = useCallback(async () => {
    //     if (typeof chrome !== 'undefined' && chrome.windows) {
    //         try {
    //             const windows = await getWindowsInfo();
    //             const allTabs = windows.flatMap(window => window.tabs || []);
    //             const filteredTabs = allTabs.filter(tab =>
    //                 tab.url && !tab.url.startsWith('chrome://newtab')
    //             );
    //             console.log(filteredTabs);
    //
    //
    //             setOpenTabs([...filteredTabs]);
    //         } catch (error) {
    //             console.error("탭 정보를 가져오는데 실패했습니다.", error);
    //         }
    //     } else {
    //         // 개발 모드 더미 데이터
    //         setOpenTabs(openTabDataSample);
    //     }
    // }, []);





        // 1. 탭 목록 가져오기 (마운트 시 실행)
        useEffect(() => {

            // const initialize = async () => {
            //     await fetchTabs();
            // };
            //
            // initialize();

            const { fetchTabs } = useTabStore.getState();
            fetchTabs()


            if (typeof chrome !== 'undefined' && chrome.tabs) {
                // 리스너에서 직접 fetchTabs 호출
              const handleUpdate = (tabId, changeInfo, tab) => {
                    // URL, 제목, 혹은 파비콘이 변경되거나 로딩이 완료되었을 때만 갱신
                    if (changeInfo.status === 'complete' || changeInfo.url || changeInfo.title) {
                        // console.log("탭 변화 감지됨:", changeInfo);
                        fetchTabs();
                    }
                };

                const handleEvent = () => {
                    // console.log("탭 리스트 이벤트 발생");
                    fetchTabs();
                };

                // 탭 생성 및 삭제
                chrome.tabs.onCreated.addListener(handleEvent);
                chrome.tabs.onRemoved.addListener(handleEvent);

                // 탭 순서 변경 (Drag and Droped)
                chrome.tabs.onMoved.addListener(handleEvent);

                // 탭 내용 변경 (URL, 제목, 로딩 상태 등)
                chrome.tabs.onUpdated.addListener(handleUpdate)

                // 현재 활성화된 탭 변경 (다른 탭 클릭 시)
                chrome.tabs.onActivated.addListener(handleEvent);

                // 윈도우 관련 변경
                chrome.windows.onCreated.addListener(handleEvent);
                chrome.windows.onRemoved.addListener(handleEvent);
                chrome.windows.onFocusChanged.addListener(handleEvent);

                // 클린업 함수: 리스너 제거
                return () => {
                    chrome.tabs.onCreated.removeListener(handleEvent);
                    chrome.tabs.onRemoved.removeListener(handleEvent);
                    chrome.tabs.onMoved.removeListener(handleEvent);
                    chrome.tabs.onUpdated.removeListener(handleUpdate);
                    chrome.tabs.onActivated.removeListener(handleEvent);
                    chrome.windows.onCreated.removeListener(handleEvent);
                    chrome.windows.onRemoved.removeListener(handleEvent);
                    chrome.windows.onFocusChanged.removeListener(handleEvent);
                };
            }

            // setOpenTabs(openTabDataSample);

        }, []);

        const handleToggleSelectedTab = (tabId) => {
            setSelectedTabs((prev) =>
                prev.includes(tabId)
                    ? prev.filter((id) => id !== tabId) // 이미 있으면 제거
                    : [...prev, tabId]                  // 없으면 추가
            );
        }


        // 2. 탭 닫기 핸들러
        const handleCloseTab = (tabId) => {
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                chrome.tabs.remove(tabId, () => {
                    setOpenTabs((prev) => prev.filter((t) => t.id !== tabId));
                });
            } else {
                setOpenTabs((prev) => prev.filter((t) => t.id !== tabId));
            }
        };

        // 3. 탭 이동 핸들러
        const handleSwitchTab = async (tabId, windowId) => {
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                try {
                    // 해당 탭이 속한 윈도우를 포커스, 해당 탭 활성화
                    await chrome.windows.update(windowId, {focused: true});
                    await chrome.tabs.update(tabId, {active: true});
                } catch (error) {
                    console.error("탭 전환 중 오류 발생:", error);
                }
            }
        };




        return (


            <div className="flex h-screen w-screen bg-gray-50 text-gray-800 font-sans overflow-hidden overscroll-none">


                <LeftSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                <main
                    className="flex-1 flex flex-col min-w-0 border-r border-gray-200 transition-all duration-300 h-full">
                    <Header

                    />

                    <div className="flex-1 overflow-y-auto p-8 bg-gray-50 scrollbar-hide">
                        {collections.map((collection) => (
                            <CollectionGroup key={collection.id} collection={collection}/>
                        ))}
                    </div>
                </main>

                <div>

                    <RightSidebar
                        openTabs={openTabs}
                        selectedTabs={selectedTabs}
                        onToggleSelectedTab={handleToggleSelectedTab}
                        onCloseTab={handleCloseTab}
                        onSwitchTab={handleSwitchTab}
                    />


                </div>

            </div>

        )

}

export default App;
