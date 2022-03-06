import React from "react";
import {useState, useEffect, useRef} from 'react';
import sortList from '../functions/sortList';
import ListItem from '../components/ListItem';
import ItemViewer from '../components/ItemViewer';
import useLocalStorage from '../hooks/useLocalStorage';
import { baseURL } from "../../shared/baseURL";

const useFocus = () => {

    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ] 

}

const CreateList = (props) => {

    const [list, setList] = useState([]);
    const [title, setTitle] = useState('My List');
    const [naming, setNaming] = useState(false);
    const [displayList, setDisplayList] = useState([]);
    const [repetitionError, setRepetitionError] = useState(false);
    const [savedList, setSavedList] = useLocalStorage('list', []);
    const [itemRef, setItemFocus] = useFocus();
    const [bright, setBright] = useState(false);


    const [current, setCurrent] = useState({
        text: '',
        description: '',
        importance: 1,
    });
    const [view, setView] = useState({
        text: '',
        description: '',
        importance: 1,
    })

    useEffect(() => {
        setList(savedList); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (repetitionError) {
          setTimeout(() => {
            setRepetitionError(false);
          }, 2000)
        }
    }, [repetitionError])

    useEffect(() => {
        if (current.text.length > 50) {
            setCurrent({
                text: current.text.substring(0, 50),
                description: current.description,
                importance: current.importance,
            })
        }

        if (current.description.length > 250) {
            setCurrent({
                text: current.text,
                description: current.description.substring(0, 250),
                importance: current.importance,
            })
        }
        if (current.importance > 5 ) {
          setCurrent({
              text: current.text,
              description: current.description,
              importance: 5,
          })
        }
        if (current.importance < 1) {
            setCurrent({
              text: current.text,
              description: current.description,
              importance: 1,
            })
        }
        if (bright) {
            setBright(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current])
    
    useEffect(() => {
        setSavedList(list);
        setDisplayList(list, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])

    const addItem = () => {
        if (list.includes(current)) {
            setRepetitionError(true);
        } else if (current.text !== '') {
            setList(list => list.concat(current));
            setCurrent({
                text: '',
                description: '',
                importance: 1,
            });
            
        }
    }

    const removeItem = (item) => {
        if (view.text === item.text) {
            setView({
                text: '',
                description: '',
                importance: item.importance,
            })
        }
        setList((prevList) => prevList.filter((listItem) => listItem !== item));
    }

    const viewItem = (item) => {
        setView({
            text: item.text,
            description: item.description,
            importance: item.importance,
        })
    }

    const addTitle = () => {

        if (list[0] && list[0].importance === 0) {
            list.shift();
        }
        list.unshift({
            text: title,
            description: '',
            importance: 0, 
        });
    }

   

    const saveList = async () => {

        addTitle();
        if (list.length < 2) {
            alert('Please add an item');
            return;
        }
        let fetchURL = `${baseURL}${props.user}.json`
        console.log('fetchURL: ' + fetchURL);
        await fetch(fetchURL,
            {
            method: "POST",
            body: JSON.stringify(list),
            headers: {
                "Content-Type": "application/json",
            }
          }
        );
        alert('List Saved!');
        setList([]);
        setTitle('My List')
    }

    const listSorter = (sort) => {
        let newList = sortList(list, sort);
        setDisplayList(newList);
    }

    const makeBright = () => {
        setBright(true);
        setItemFocus();
    }

    return (
        <div id='addListItem'>
            <section id={bright ? 'addItemScreenBright' : 'addItemScreen'}>
                <h4 id='addItemHeader'>Add Tasks: </h4>
           <p>Add an item to your list: </p>
           <label htmlFor='itemTextInput'>Task Name: </label>
           <input
           id='itemTextInput'
           type='text'
           onChange={(e) => setCurrent({
            text: (e.target.value),
            description: current.description,
            importance: current.importance,
            })}
           value={current.text}
           maxLength='50'
           ref={itemRef}
           />
           <br />
           <label htmlFor='itemImportanceInput'>Importance Level: </label>
           <input
           id='itemImportanceInput'
           type='number'
           onChange={(e) => setCurrent({
            text: current.text,
            description: current.description,
            importance: (e.target.value),
           })}
           value={current.importance}
           max='5'
           min='1' />
           <br />
           <label htmlFor='itemDescriptionInput' id='itemDescriptionLabel'>Task Description: </label>
           <textarea
           id='itemDescriptionInput'
           type='text'
           rows='4'
           onChange={(e) => setCurrent({
            text: current.text,
            description: (e.target.value),
            importance: current.importance,
            })}
           value={current.description}
           maxLength='250'
           ></textarea>
           <br />
           
           <button id='addItemButton' onClick={() => addItem()}>Add to List</button>
           </section>
           <div id='listMainWrapper'>
           <section id='listMain'>
           {naming ? <input
                    id='listNameInput'
                    type='text'
                    value={title}
                    maxLength='40'
                    onChange={(e) => setTitle(e.target.value)}
                    /> : <h2 id='listTitle'>{title}</h2> }
           {displayList.map((item) => (
               <ListItem 
               key={Math.floor(Math.random() * 999999999)}
               className='listItem'
               removeItem={() => removeItem(item)}
               viewItem={() => viewItem(item)}
               description={item.description}
               importance={item.importance}
               editIndex={list.indexOf(item)}
               text={item.text}>{item}</ListItem>
           ))}
           </section>
           </div>
           <button id='saveListButton' onClick={() => saveList()}>Save List</button>
           <button id='changeNameButton' onClick={() => setNaming(!naming)}>
               { naming ? 'Save Name' : 'Edit Name'}
           </button>
           <button id='newTaskButton' onClick={makeBright}>Add Task</button>
           <section id='sortList'>
           <label htmlFor='sortListSelector'>Sort By: </label>
           <select
            id='sortListSelector'
            onChange={(e) => listSorter(e.target.value)}
            >
                <option value='0'>Newest First</option>
                <option value='1'>Alphabetical</option>
                <option value='2'>Importance (High to Low)</option>
                <option value='3'>Oldest First</option>
                <option value='4'>Reverse Alphabetical</option>
                <option value='5'>Importance (Low to High)</option>
            </select>
            </section>
           <ItemViewer text={view.text} description={view.description} importance={view.importance} />
           {repetitionError ? <p id='repetitionError'>That task is already listed.</p> : null}
        </div>
    )
}

export default CreateList