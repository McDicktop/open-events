import React, { useState } from "react";
import { useSelector } from "react-redux";

import ProfileIcon from "../../../assets/ProfileIcon";
import SettingsIcon from "../../../assets/SettingsIcon";
import PrivacyIcon from "../../../assets/PrivacyIcon";
import FriendsIcon from "../../../assets/FriendsIcon";

// Panel slides components
import Settings from "./Settings";
import User from "./User";
import Security from "./Security";
import Friends from "./Friends";


function Profile() {
    const [activeTab, setActiveTab] = useState("settings");

    const profileItems = [
        { key: "settings", label: "Settings", component: Settings, icon: SettingsIcon, className: 'w-6 h-6' },
        { key: "user", label: "Account", component: User, icon: ProfileIcon, className: 'w-6 h-6' },
        { key: "security", label: "Security", component: Security, icon: PrivacyIcon, className: 'w-6 h-6' },
        { key: "friends", label: "Friends", component: Friends, icon: FriendsIcon, className: 'w-6 h-6' },
    ];

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    const renderActiveComponent = () => {
        const activeItem = profileItems.find((item) => item.key === activeTab);
        if (!activeItem) return null;

        const ActiveComponent = activeItem.component;
        return <ActiveComponent />;
    };

    // const renderActiveIcon = () => {
    //     const activeItem = profileItems.find((item) => item.key === activeTab);
    //     if (!activeItem) return null;

    //     const ActiveIcon = activeItem.icon;
    //     return <ActiveIcon className="w-full h-full" />;
    // };

    const renderIcon = (item) => {
        const Icon = item.icon;
        return <Icon className={item.className} />
    }




    return (
        <div className="flex overflow-hidden bg-gray-100 rounded-xl p-1">
            {/* Sidebar */}
            <div className="w-48">
                <ul className="py-2 flex flex-col items-center">
                    {profileItems.map((item) => (
                        <li
                            key={item.key}
                            onClick={() => handleTabChange(item.key)}
                            className={`mb-2 rounded-2xl px-4 py-1 cursor-pointer flex items-center transition-colors duration-150 flex flex-row items-center w-40
                                ${activeTab === item.key
                                    ? 'bg-gray-300 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            <span className="p-1 rounded-full">
                                {/* {renderActiveIcon()} */}
                                {renderIcon(item)}
                            </span>
                            <span className="ml-2 select-none">{item.label}</span>
                        </li>
                    ))}
                </ul>
                <div className="p-4 mt-10">
                    <button className="w-full py-2 px-4 text-center text-white bg-red-400 hover:bg-red-500 rounded-2xl duration-100">
                        Log out
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 border bg-white rounded-xl ml-1">
                {renderActiveComponent()}
            </div>
        </div>
    );
}

export default Profile;