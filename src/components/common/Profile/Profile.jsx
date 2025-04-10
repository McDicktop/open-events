import React, { useState } from "react";
import { useSelector } from "react-redux";

import ProfileIcon from "../../../assets/ProfileIcon";

// import ProfileIcon from '../../../assets/ProfileName';
// import EmailIcon from '../../../assets/EmailIcon';
// import EmailIcon from '../../../assets/EmailIcon';

// Panel slides components
import General from "./General";
import User from "./User";
import Security from "./Security";
import Friends from "./Friends";

function Profile() {
    const [activeTab, setActiveTab] = useState("general");

    const profileItems = [
        { key: "general", label: "General", component: General, icon: ProfileIcon },
        { key: "user", label: "Account", component: User, icon: ProfileIcon },
        { key: "security", label: "Security", component: Security, icon: ProfileIcon },
        { key: "friends", label: "Friends", component: Friends, icon: ProfileIcon },
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

    const renderActiveIcon = () => {
        const activeItem = profileItems.find((item) => item.key === activeTab);
        if (!activeItem) return null;

        const ActiveIcon = activeItem.icon;
        return <ActiveIcon className="w-full h-full" />;
    };

    return (
        <div className="flex overflow-hidden bg-white rounded-xl">
            {/* Sidebar */}
            <div className="w-36 border-r border-gray-200">
                <ul className="py-2 flex flex-col">
                    {profileItems.map((item) => (
                        <li
                            key={item.key}
                            onClick={() => handleTabChange(item.key)}
                            className={`rounded-full px-4 py-3 cursor-pointer flex items-center transition-colors duration-150
                                ${activeTab === item.key
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <span className="w-5 h-5 border rounded-full">
                                {renderActiveIcon()}
                            </span>
                            <span className="ml-2">{item.label}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto p-4">
                    <button className="w-full py-2 px-4 text-center text-white bg-red-500 hover-bg-red-600 rounded-full">
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                {renderActiveComponent()}
            </div>
        </div>
    );
}

export default Profile;

// Profile (data, map)
// General
// Security
// Admin
// Friends
// __________
// Logout

{
    /* {user.info && <div className='w-full h-full rounded-xl p-4 border'>
                {console.log(user)}
                <div className='flex items-center border'>
                    <ProfileName className='w-5 h-5' />
                    <p className="">
                        {user.info.firstname + ' ' + user.info.lastname}
                    </p>
                </div>

                <div className='flex items-center border'>
                    <EmailIcon className='w-4 h-4 ml-[2px] mr-[4px]' />
                    <p className="">
                        {user.info.email}
                    </p>
                </div>

                <div className=''>
                    <p className="">
                        {user.info.address?.country + ', ' + user.info.address?.city + ', ' + user.info.address?.street}
                    </p>
                </div>
            </div>} */
}
