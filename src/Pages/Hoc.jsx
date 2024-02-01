import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
}

const boxStyle = {
    border: '3px solid #666',
    backgroundColor: '#ddd',
    borderRadius: '.5em',
    padding: '10px',
    cursor: 'move',
}

const Draggable = props => {
    const dragSrcEl = React.useRef();

    useEffect(() => {
        let items = document.querySelectorAll('.container .box');

        items.forEach(function (item) {
            item.addEventListener('dragstart', handleDragStart, false);
            //item.addEventListener('dragenter', handleDragEnter, false);
            item.addEventListener('dragover', handleDragOver, false);
            //item.addEventListener('dragleave', handleDragLeave, false);
            item.addEventListener('drop', handleDrop, false);
            item.addEventListener('dragend', handleDragEnd, false);
        });
    }, []);

    function handleDragStart(e) {
        e.target.style.opacity = '0.4';
        dragSrcEl.current = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        if (dragSrcEl.current != e.target) {
            dragSrcEl.current.innerHTML = e.target.innerHTML;
            e.target.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }

    return (
        <>
            <div style={containerStyle} className='container'>
                <div draggable='true' className='box' style={boxStyle}>A</div>
                <div draggable='true' className='box' style={boxStyle}>B</div>
                <div draggable='true' className='box' style={boxStyle}>C</div>
            </div>
        </>
    )
};

export default Draggable;