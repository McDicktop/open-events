import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { modalProfileHandler } from "../features/appSlice";

import UpdateForm from "./layout/Forms/UpdateForm";
import EventsGrid from "./layout/EventsGrid";
import EventsGridUnsigned from "./layout/EventsGridUnsigned";
import NavPanel from "./layout/NavPanel";
import Profile from "./common/Profile/Profile";
import Modal from "./layout/Modal";
import ThemeSelector from "./common/ThemeSelector";

function Main() {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.app);

    const user = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);      // перенести в редакс

    return (
        <>
            {!user.token && (
                <>
                    <NavPanel />
                    <EventsGridUnsigned />
                </>
            )}

            {user.token && !user.isCompleted && <UpdateForm />}

            {user.token && user.isCompleted && (
                <>
                    <ThemeSelector/>
                    <NavPanel />
                    <EventsGrid userId={user.info.id} isOwnVisible={visible} />

                    <Modal
                        onClose={() => dispatch(modalProfileHandler(false))}
                        show={user.info.id && app.modalProfile}
                        title="Profile"
                    >
                        {/* <div className="w-64 h-64 bg-gray-400"> */}
                        <Profile />
                    </Modal>
                </>
            )}
        </>
    );
}

export default Main;
