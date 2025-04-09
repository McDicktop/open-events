import React from "react";
import { useParams } from "react-router-dom";

function Event() {
    const { id } = useParams();

    

    return (
        <>
            {console.log(id)}
            <div>Event</div>
        </>
    );
}

export default Event;
