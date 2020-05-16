import React from "react";
import List from '@material-ui/core/List';
import styles from './ItemList.module.css';
import Item from '../Item/Item';


const ItemList = ({ filtered, onClickDone, onClickDelete, onClickImportant, moveCard }) => {
    if (filtered.length === 0) {
        return(
            <div className={styles.ItemListWrapEmpty} />
        )} else {
            return(
                <List className={styles.ItemListWrap}>
                    {filtered.map((task, i) =>
                      <li key={task.id} >
                        <Item
                            value={task.value}
                            isDone={task.isDone}
                            isImportant={task.isImportant}
                            id={task.id}
                            index={i}
                            onClickDone={onClickDone}
                            onClickDelete={onClickDelete}
                            onClickImportant={onClickImportant}
                            moveCard={moveCard}
                        />
                    </li>)}
                </List>
            )}
    };

export default ItemList;
