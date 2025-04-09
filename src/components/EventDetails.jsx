import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvent } from "../features/eventsSlice";

import Loader from "./common/Loader";

function EventDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(getEvent(id));
    }, [events.data])

    if (!events.data || events.data.length === 0) return <Loader />

    return (
        <div className="border-black border-[3px] h-screen justify-center flex">
            {events.currentEvent ?
                <div
                    className="flex flex-col w-1/2 border border-black h-[calc(100vh-20rem)] bg-blue-50/50 justify-center items-center place-self-center "
                >
                    <div
                        style={{
                            backgroundImage: `url('${events.currentEvent.images[0]}')`,
                        }}
                        className="w-64 h-64 rounded-2xl bg-no-repeat bg-contain bg-center relative"
                    >
                        <div
                            style={{
                                // backgroundImage: `url('${user.info.likes.find((item) => item === events.currentEvent._id) ? fav : toFav}')`,
                                // backgroundImage: `url('${fav}')`,
                            }}
                            className="w-10 h-10 absolute top-1 right-2 bg-center bg-cover cursor-pointer"
                        ></div>
                    </div>
                    <p
                        className=""
                    >{events.currentEvent.title}</p>
                    <p
                        className=""
                    >{events.currentEvent.description}</p>
                    <p
                        className=""
                    >{`${events.currentEvent.price}$`}</p>
                    <button
                        onClick={() => { }}
                        className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl px-3 py-1 font-semibold text-white"
                    >Sign up</button>

                </div> : <div>Event</div>}

        </div>
    );
}

export default EventDetails;
