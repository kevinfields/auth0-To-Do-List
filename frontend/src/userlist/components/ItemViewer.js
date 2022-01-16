import React from 'react'

const ItemViewer = (props) => {
    return (
        <div id='itemViewer'>
            <h4 id='itemViewerTitle'>Item Viewer</h4>
            <br />
            <p id='itemViewerTask'>Task: {props.text}</p>
            {props.description ? <p id='itemViewerDewcription'>Description: {props.description}</p> : null}
            {props.importance ? <p id='itemViewerImportance'>Importance: {props.importance}</p> : null}
           </div>
    )
}

export default ItemViewer