import React from 'react'

const SavedListItem = (props) => {

    let styling = 'listMain' + props.importance.toString();

    return (
        <div className={styling}>
            <h3 className='savedListTitle'>{props.text}</h3>
           { props.importance !== 0 ? <div>
            <p className='savedListDescription'>{props.description}</p>
            <p className='savedListImportance'>Importance Level: {props.importance}</p>
            <button className='complete-button' onClick={() => props.markComplete(props.unitNo)}>
                Complete
            </button>
            </div> : null}
        </div>
    )
}

export default SavedListItem
