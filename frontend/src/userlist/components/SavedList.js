import React from 'react';
import axios from 'axios';
import SavedListItem from './SavedListItem';

let validArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'.split('');

const SavedList = (props) => {

    let list = [];
    console.log('key: ' + props.list.key);
    console.log('data: ' + props.list.data);
    for (let i=0; i<props.list.data.length; i++) {
        console.log('data.text: ' + props.list.data[i].text);
        console.log('data.description: ' + props.list.data[i].description);
        console.log('data.importance: ' + props.list.data[i].importance);
        list.push({
            text: props.list.data[i].text,
            description: props.list.data[i].description,
            importance: props.list.data[i].importance,
        })
    }

    const deleteList = async () => {
        let userURL = `https://userlists-663b8-default-rtdb.firebaseio.com/${props.user}/${props.list.key}`
        console.log('fetching from ' + userURL);
        await axios.delete(userURL);
            // { 
            //   method: "DELETE",
            //   headers: new Headers({
            //     'content-type': 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            //     "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            //     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            //   }),
            // });
    }

    const makeKey = (text) => {

        let textArray = text.split('');

        for (let i=0; i<textArray.length; i++) {
            if (!validArray.includes(textArray[i])) {
                textArray[i] = '-';
            }
        }
        let newString = textArray.join('') + '-' + Math.floor(Math.random() * 1000).toString();
        
        console.log('returning ' + newString);
        
        return newString;
    }
    
    return (
        <section className='savedList'>
            {list.map((item) => (
                <SavedListItem text={item.text} description={item.description} importance={item.importance} key={makeKey(item.description)}/>
            ))}
            <button onClick={() => deleteList()}>Delete List</button>
        </section>
    )
}

export default SavedList
