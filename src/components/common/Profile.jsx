import React from 'react'
import { useSelector } from 'react-redux'

import ProfileName from '../../assets/ProfileName';
import EmailIcon from '../../assets/EmailIcon';

function Profile() {
    const user = useSelector((state) => state.user);
    return (

        <>
            {user.info && <div className='w-full h-full rounded-xl p-4 border'>
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
            </div>}
        </>


    )
}

export default Profile