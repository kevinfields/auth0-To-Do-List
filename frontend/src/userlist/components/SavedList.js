import React from 'react';
import SavedListItem from './SavedListItem';
// import axios from 'axios';
// import { baseURL } from '../../shared/baseURL';

let validArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'.split('');



const SavedList = (props) => {

    let list = [];
    for (let i=0; i<props.list.data.length; i++) {
        list.push({
            text: props.list.data[i].text,
            description: props.list.data[i].description,
            importance: props.list.data[i].importance,
        })
    }

    const makeKey = (text) => {
        let textArray = text.split('');
        for (let i=0; i<textArray.length; i++) {
            if (!validArray.includes(textArray[i])) {
                textArray[i] = '-';
            }
        }
        let newString = textArray.join('') + '-' + Math.floor(Math.random() * 1000).toString();
        return newString;
    }


    
    return (
        <section className='savedList'>
            {list.map((item) => (
                <SavedListItem 
                unitNo={list.indexOf(item)} 
                text={item.text} 
                description={item.description} 
                importance={item.importance} 
                key={makeKey(item.description)}
                markComplete={(unitNo) => props.markComplete(unitNo)}
                />
            ))}
            <button onClick={() => props.removeList()}>Delete List</button>
        </section>
    )
}

export default SavedList
