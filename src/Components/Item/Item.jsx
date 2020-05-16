import React, { useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import styles from './Item.module.css';
import DeleteIcon from "@material-ui/icons/Delete";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Item =
    React.forwardRef( (
            {isDragging, connectDropTarget, connectDragSource, isOver, canDrop,
            value,
            isDone,
            isImportant,
            classes,
            onClickDone,
            onClickDelete,
            onClickImportant,
            id }, ref ) => {
                const elementRef = useRef(null);
                connectDragSource(elementRef);
                connectDropTarget(elementRef);
                const opacity = isDragging ? 0 : 1;
                useImperativeHandle(ref, () => ({
                getNode: () => elementRef.current,
            }));
    return (
    <div ref={elementRef}
         style={{ opacity } }
         className={ classnames({[styles.wrapper]: true, [styles.isImportant]: isImportant }) }>
        <div className={styles.wrapper__text}>
            <Checkbox color="primary" checked={ isDone } tabIndex={ -1 } onClick={() => onClickDone(id)}/>
            <span className={ classnames({[styles.item]: true, [styles.done]: isDone }) }> {value} </span>
        </div>

        <div className={styles.wrapper__icon}>
            <StarRoundedIcon onClick={() => onClickImportant(id) } className={ classnames({[styles.importantIcon]: true, [styles.isImportant]: isImportant }) }/>
            <DeleteIcon onClick={ () => onClickDelete(id)} className={styles.deleteIcon} />
        </div>
    </div>
)});

export default DropTarget(
    ItemTypes.CARD,
    {
        hover(props, monitor, component) {
            if (!component) {
                return null
            }
            const node = component.getNode();
            if (!node) {
                return null
            }
            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = node.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            props.moveCard(dragIndex, hoverIndex);
            monitor.getItem().index = hoverIndex
        },
    },
    (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        ItemTypes.CARD,
        {
            beginDrag: (props) => ({
                id: props.id,
                index: props.index,
            }),
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    )(Item),
);

