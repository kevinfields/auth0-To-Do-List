import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import SavedList from '../components/SavedList';

const UserLists = () => {

    const {user} = useAuth0();
    const {sub} = user;

    const [loadedLists, setLoadedLists] = useState([]);
    const [loading, setLoading] = useState(true);

    

    //give user a unique id token
    const accNum = sub.substring(6, sub.length)

    const getLists = async () => {
        
        const userURL = 'https://userlists-663b8-default-rtdb.firebaseio.com/' + accNum + '.json';

        const result = await axios(userURL);
        
        let userData = result.data
        const lists = [];
        for (const key in userData){ 
            const list = {
                key: key,
                id: key,
                data: userData[key]
            }
            lists.push(list);
        };
        setLoadedLists(lists);
        setLoading(false);
    }

    // const removeList = (listId) => {
    //     console.log('trying to remove list ' + listId)
    //     setLoadedLists(loadedLists.filter(list => list.id !== listId));
    //     setLoading(false);
    // }

    //display lists on first page load
    useEffect(() => {
        getLists()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>My Lists</h2>
            <p>User ID: {accNum}</p>
            <section className='savedLists'>
            {loading ? <p>Loading ...</p> : null}
            {loadedLists.length > 0 ? loadedLists.map((list) => (
                <SavedList 
                list={list} 
                user={accNum} 
                key={list.id}
                reloadPage={() => getLists()}
                // removeList={() => removeList(list.id)} 
                />
            )) : !loading ? <h3>You have no lists yet. Go to the Create List tab to create one.</h3> : null}
            </section>
        </div>
    )
}

export default UserLists
