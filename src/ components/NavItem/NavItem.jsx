import React from "react";

const NavItem = ({ icon, label, subtext, active = false }) => {
    return (
        <div className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}>
            <div className="w-5 h-5 flex items-center justify-center">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium">{label}</span>
                {subtext && <span className="text-[10px] text-gray-500">{subtext}</span>}
            </div>
        </div>
    )


}

export default NavItem;