import React from 'react';
import axios from 'axios';
import SavedListItem from './SavedListItem';

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

    const markComplete = (unitNo) => {
        // axios
        // .put(`https://userlists-663b8-default-rtdb.firebaseio.com/${props.user}/${props.list.key}/${unitNo}`, {
        //     text: 'Completed',
        //     description: 'This is done now',
        //     importance: 0
        // })
        // .then(res => console.log(res))
        // .catch(err => console.error(err));
        console.log(unitNo)
    }

    const deleteList = async () => {
        let userURL = `https://userlists-663b8-default-rtdb.firebaseio.com/${props.user}/${props.list.key}`
        console.log('fetching from ' + userURL);

        await axios.delete(userURL)
        .then(() => {
            props.reloadPage();
        })
        .catch(err => console.error(err));
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
                markComplete={(unitNo) => markComplete(unitNo)}
                />
            ))}
            <button onClick={() => deleteList()}>Delete List</button>
        </section>
    )
}

export default SavedList
