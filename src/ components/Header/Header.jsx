const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
            {/* 검색창 */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-red-400 transition-all">
                <span className="text-gray-400 mr-2">🔍</span>
                <input
                    type="text"
                    placeholder="Search your tabs..."
                    className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                />
            </div>

            {/* 프로필 아이콘 */}
            <div className="w-9 h-9 bg-gradient-to-tr from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer">
                JS
            </div>
        </header>
    )
}

export default Header;