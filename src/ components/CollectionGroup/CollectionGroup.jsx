import TabCard from "../TabCard/TabCard.jsx";

const CollectionGroup =({ collection }) => {
    return (
        <div className="mb-10">
            {/* 컬렉션 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold text-gray-800 mr-3">{collection.title}</h2>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
            {collection.tabs.length}
          </span>
                </div>
                <button className="text-xs font-bold text-gray-500 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition">
                    OPEN ALL
                </button>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* 개별 카드들 렌더링 */}
                {/*{collection.tabs.map((tab) => (*/}
                {/*    <TabCard key={tab.id} tab={tab} />*/}
                {/*))}*/}

                {/* 탭 추가 버튼 (항상 마지막에 위치) */}
                <button className="h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
                    <span className="text-2xl font-light">+</span>
                </button>
            </div>
        </div>
    )
}

export default CollectionGroup;