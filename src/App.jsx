import { useState, useEffect } from 'react';
import {getOpenedTabsList} from './chromeapi/chromeapi.js'
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
		// 실제 Chrome 확장프로그램 환경인지 확인
		if (typeof chrome !== 'undefined' && chrome.tabs) {
			chrome.tabs.query({ currentWindow: true }, (tabs) => {
				// '새 탭' 페이지(자기 자신)는 목록에서 제외하면 더 깔끔함
				const filtered = tabs.filter(t => t.url !== 'chrome://newtab/');
				setOpenTabs(filtered);
			});
		} else {
			// 개발 환경(localhost)용 더미 데이터
			setOpenTabs([
				{ id: 901, title: 'YouTube - React Tutorial', url: 'https://youtube.com', favIconUrl: '' },
				{ id: 902, title: 'OpenAI ChatGPT', url: 'https://openai.com', favIconUrl: '' },
				{ id: 903, title: 'Naver News', url: 'https://news.naver.com', favIconUrl: '' },
			]);
		}
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
	const handleSwitchTab = (tabId) => {
		if (typeof chrome !== 'undefined' && chrome.tabs) {
			chrome.tabs.update(tabId, { active: true });
		} else {
			console.log(`Switch to tab ID: ${tabId}`);
		}
	};


	return (


			<div className="flex h-screen w-screen bg-gray-50 text-gray-800 font-sans overflow-hidden overscroll-none">

				{/* 1. 왼쪽 사이드바 (고정) */}
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
					{/* 3. 오른쪽 사이드바 (고정) - 추가됨! */}
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
