import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import CreateList from '../userlist/pages/CreateList';

const Lists = () => {
    const {user} = useAuth0();
    const {/*nickname, email,*/ sub} = user;
    const accNum = sub.substring(6, sub.length)
    return (
        <div>
            <CreateList user={accNum}/>
            {/* <p>Your name is {nickname}</p>
            <p>Your email is {email}</p>
            <p>Your auth0 account number is: {accNum}</p>  */}
        </div>
    )
}

export default Lists
