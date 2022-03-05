import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import SavedList from '../components/SavedList';
import { baseURL } from '../../shared/baseURL';

// import {createInstance} from 'axios';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';
// import {useCollectionData} from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   apiKey: "AIzaSyAeIVrMPCCt1DqizKUlEpcTQiCj2KpvscQ",
//   authDomain: "todolists-92585.firebaseapp.com",
//   databaseURL: "https://todolists-92585-default-rtdb.firebaseio.com",
//   projectId: "todolists-92585",
//   storageBucket: "todolists-92585.appspot.com",
//   messagingSenderId: "284118069420",
//   appId: "1:284118069420:web:6858d50904a4cdc6a12f09"
//   });

//   const auth = firebase.auth();
//   const firestore = firebase.firestore();
  



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
                // removeList={() => removeList(list.id)} 
                />
            )) : !loading ? <h3>You have no lists yet. Go to the Create List tab to create one.</h3> : null}
            </section>
        </div>
    )
}

export default UserLists
