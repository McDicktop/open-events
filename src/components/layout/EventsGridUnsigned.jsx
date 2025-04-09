import EventCard from "../common/EventCard";
import Loader from "../common/Loader";

import { useSelector } from "react-redux";

function EventsGridUnsigned() {


    const events = useSelector((state) => state.events);

    if (!events.data || events.data.length === 0) return <Loader />

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6 md:gap-8 bg-white p-4 sm:p-6 md:p-8">
            {events.data.length ? (
                <>
                    {events.data.map((event, index) => (
                        <div key={`ind_${index}`} className="">
                            <EventCard event={event} />
                        </div>
                    ))}
                </>
            ) : (
                <div className="text-white col-span-full text-center">
                    No events
                </div>
            )}
        </div>
    );
}

export default EventsGridUnsigned;
