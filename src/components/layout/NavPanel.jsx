import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";

import MyLocation from "../../assets/MyLocation";
import Language from "../../assets/Language";
import UserDropdown from "../common/UserDropdown";
import NavSearch from "../common/NavSearch";

function NavPanel() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    return (
        <nav className="px-10 py-2 flex justify-between border-b border-gray-200">
            {/* logo and location */}
            <div className="flex items-center gap-5">
                <span
                    style={{ backgroundImage: `url('${logo}')` }}
                    className="block bg-contain bg-center bg-no-repeat h-12 w-40"
                ></span>

                <span className="h-2/4 w-[1px] bg-gray-200 block"></span>

                <div className="flex items-center justify-center px-4 py-2 gap-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-600">
                    <MyLocation className="w-6 h-6" strokeWidth="3" />
                    My location
                </div>
            </div>

            {/* search and filters */}
            <div className="flex items-center gap-5">
                <NavSearch />
            </div>

            {/* language and user */}
            <div className="flex items-center gap-5">
                <div className="flex items-center justify-center gap-1 p-2">
                    <span className="text-sm text-semibold">EN</span>
                    <Language className="w-6 h-6" strokeWidth="3" />
                </div>

                {user.info.id ? (
                    <UserDropdown />
                ) : (
                    <button
                        className="rounded-full px-6 py-2.5 bg-gray-800 text-nowrap text-gray-100 font-semibold text-md"
                        onClick={() => navigate("/signup")}
                    >
                        {/* <ProfileName className="w-8 h-8" /> */}

                        Get Started
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavPanel;
