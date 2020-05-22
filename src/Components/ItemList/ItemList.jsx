import React from "react";
import List from '@material-ui/core/List';
import styles from './ItemList.module.css';
import Item from '../Item/Item';
import { Droppable, Draggable } from "react-beautiful-dnd";


const ItemList = ({ filtered, onClickDone, onClickDelete, onClickImportant}) => {
    if (filtered.length === 0) {
        return(
            <div className={styles.ItemListWrapEmpty} />
        )} else {
        return(
            <Droppable droppableId={'list'}>
                {(provided) => (<List ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className={styles.ItemListWrap}>
                    {filtered.map((task, index) =>
                        <Draggable draggableId={'task' + task.id} index={index} key={task.id} >
                            {(provided) => (
                                <Item
                                    value={task.value}
                                    isDone={task.isDone}
                                    isImportant={task.isImportant}
                                    id={task.id}
                                    onClickDone={onClickDone}
                                    onClickDelete={onClickDelete}
                                    onClickImportant={onClickImportant}
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                /> )}
                        </Draggable>
                    )}
                </List>)}
            </Droppable>
        )}
};

export default ItemList;
