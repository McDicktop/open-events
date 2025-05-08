import { useSelector } from "react-redux";

function Account() {
    const user = useSelector((state) => state.user);

    return (
        <>
            {console.log(user.info)}
            {user.info.id && <div>
                <p>Account</p>
                <p>{user.info.firstname + ' ' + user.info.lastname}</p>
                
                
                </div>}
        </>
    );
}

export default Account;
