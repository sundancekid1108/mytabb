import { useState, useEffect } from 'react';
import {getWindowsInfo} from './chromeapi/chromeapi.js'
import RightSidebar from "./ components/RightSidebar/RightSidebar.jsx";
import LeftSidebar from "./ components/LeftSidebar/LeftSidebar.jsx";
import Header from "./ components/Header/Header.jsx";
import CollectionGroup from './ components/CollectionGroup/CollectionGroup.jsx'

function App() {
	// 상태 관리: 사이드바 메뉴 활성화
	const [activeMenu, setActiveMenu] = useState('Collections');
	const [openTabs, setOpenTabs] = useState([]); // 현재 열린 탭 목록 상태

	// 더미 데이터 (컬렉션)
	const [collections, setCollections] = useState([
		{
			id: 1,
			title: 'Daily Routine',
			tabs: [
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
				{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },{ id: 101, title: 'Gmail', domain: 'gmail.com' },
				{ id: 102, title: 'Notion', domain: 'notion.so' },
			],
		},
	]);

	// 1. 탭 목록 가져오기 (마운트 시 실행)
	useEffect(() => {

		// 1. 탭 목록 가져오기 함수 정의
		const fetchTabs = async () => {
			if (typeof chrome !== 'undefined' && chrome.windows) {
				const windows = await getWindowsInfo();

				// 모든 윈도우의 탭들을 하나의 배열로 합치기
				const allTabs = windows.flatMap(window => window.tabs || []);


				// '새 탭'이나 익스텐션 페이지 등 제외하고 싶다면 필터링 가능
				const filteredTabs = allTabs.filter(tab =>
					tab.url && !tab.url.startsWith('chrome://newtab')
				);

				setOpenTabs(filteredTabs);


			} else {
				// 개발 환경(브라우저)용 더미 데이터
				setOpenTabs([
					{ id: 1, title: 'Google', url: 'https://google.com', favIconUrl: '' },
					{ id: 2, title: 'GitHub', url: 'https://github.com', favIconUrl: '' }
				]);
			}
		};

		fetchTabs()



	}, []);


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
				await chrome.windows.update(windowId, { focused: true });
				await chrome.tabs.update(tabId, { active: true });
			} catch (error) {
				console.error("탭 전환 중 오류 발생:", error);
			}
		}
	};


	return (


			<div className="flex h-screen w-screen bg-gray-50 text-gray-800 font-sans overflow-hidden overscroll-none">


				<LeftSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
				<main className="flex-1 flex flex-col min-w-0 border-r border-gray-200 transition-all duration-300 h-full">
					<Header

					/>

					<div className="flex-1 overflow-y-auto p-8 bg-gray-50 scrollbar-hide">
						{collections.map((collection) => (
							<CollectionGroup key={collection.id} collection={collection} />
						))}
					</div>
				</main>

				<div>

					<RightSidebar
						openTabs={openTabs}
						onCloseTab={handleCloseTab}
						onSwitchTab={handleSwitchTab}
					/>


				</div>

			</div>

	)
}

export default App;
