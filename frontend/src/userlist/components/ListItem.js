import React from 'react'

const ListItem = (props) => {

    let itemClass = 'listItem';

    itemClass += props.importance.toString();

    if (props.importance !== 0) {
    return (
        <div className={itemClass}>
            <p className='listItemText'>{props.text}</p>
            <button className='listItemView' onClick={props.viewItem}>View</button>
            <button className='listItemRemove' onClick={props.removeItem}>Remove</button>  
        </div>
    )
    } else {
        return null;
    }
}

export default ListItem
