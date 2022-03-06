import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import SavedList from '../components/SavedList';
import { baseURL } from '../../shared/baseURL';

// import {createInstance} from 'axios';


const UserLists = () => {

    const {user} = useAuth0();
    const {sub, email} = user;

    const [loadedLists, setLoadedLists] = useState([]);
    const [loading, setLoading] = useState(true);

    

    //give user a unique id token and get a name based on email
    const accNum = sub.substring(6, sub.length)
    const emailName = email.split('@')[0];

    const getLists = async () => {
        
        const userURL = `${baseURL}${accNum}.json`;

        const result = await axios(userURL);
        
        let userData = result.data
        const lists = [];
        for (const key in userData){ 
            const list = {
                key: key,
                id: lists.length,
                data: userData[key]
            }
            lists.push(list);
        };
        setLoadedLists(lists);
        setLoading(false);
    }

    const removeList = (listId) => {
        console.log('trying to remove list ' + listId)
        setLoadedLists(loadedLists.filter(list => list.id !== listId));
        setLoading(false);
    }

    const removeItem = (listId, itemId) => {

        console.log('listId: ' + listId)
        console.log('itemId, ' + itemId)

        let list = loadedLists[listId];
        console.log('list: ' + JSON.stringify(list))
        list.data.splice(itemId, 1)
        console.log('list.data: ' + JSON.stringify(list.data))
        let listScreenshot = loadedLists;
        console.log('updated list: ' + JSON.stringify(list));
        listScreenshot.splice(listId, 1, list);
        console.log('listScreenshot: ' + listScreenshot)
        setLoadedLists([...listScreenshot]);

    }

    //display lists on first page load
    useEffect(() => {
        getLists()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>My Lists - {emailName}</h2>
            <p>User ID: {accNum}</p>
            <section className='savedLists'>
            {loading ? <p>Loading ...</p> : null}
            {loadedLists.length > 0 ? loadedLists.map((list) => (
                <SavedList 
                list={list} 
                user={accNum} 
                key={list.id}
                reloadPage={() => getLists()}
                removeList={() => removeList(list.id)} 
                markComplete={(itemId) => removeItem(list.id, itemId)}
                />
            )) : !loading ? <h3>You have no lists yet. Go to the Create List tab to create one.</h3> : null}
            </section>
        </div>
    )
}

export default UserLists
