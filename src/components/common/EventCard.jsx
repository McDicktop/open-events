import React from "react";
import { toggleLikeEvent } from "../../services/event.api";

import { updateUserInfo } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import HeartIcon from "../../assets/HeartIcon";

function EventCard({ event }) {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const toggleLike = async (id) => {
        const res = await toggleLikeEvent({ eventId: id }, token);
        if (!res.message) {
            dispatch(updateUserInfo({ likes: res.likes }));
            return;
        }
        alert("Internal server error!");
    };

    return (
        <div className="relative group h-64 overflow-hidden rounded-2xl">
            <div
                style={{
                    backgroundImage: `url('https://allaboutrosalilla.com/wp-content/uploads/2023/02/Tallinn-Christmas-Market-7.jpg')`,
                }}
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 origin-center transition-transform duration-300 ease-in-out"
            ></div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-b 
    from-black/50 from-0% 
    via-transparent via-40% 
    to-black/80 to-90%
    group-hover:backdrop-blur-[2px]"
            ></div>

            <div className="absolute top-3 left-3 rounded-[0.75rem] px-3 bg-gray-800/50 text-white text-center text-[16px] leading-[1.75rem] font-semibold">
                18.10
            </div>



            <div className="w-8 h-8 absolute top-3 right-3 cursor-pointer" onClick={() => toggleLike(event._id)}>
                {user.info.id && <>
                    <HeartIcon
                        className="w-full h-full"
                        color="#f2f0f0af"
                        fill={
                            user.info.likes.find((item) => item === event._id)
                                ? "#aba9a952"
                                : "#f2f0f0de"
                        }
                    />
                </>}

            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-150 ease-in-out transform translate-y-0 group-hover:-translate-y-10">
                <div className="text-3xl font-semibold">{event.title}</div>
                <div className="text-lg">{event.description}</div>
            </div>

            <button
                onClick={() => navigate(`/event/${event._id}`)}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-xl py-1 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0 hover:bg-gray-200"
            >
                Learn more
            </button>
        </div>
    );
}

export default EventCard;
