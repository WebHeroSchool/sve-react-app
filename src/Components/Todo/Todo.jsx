import React from 'react';
import Card from '@material-ui/core/Card';
import ItemList from '../ItemList/ItemList';
import Input from "../Input/Input";
import CalcTodo from "../CalcTodo/CalcTodo";
import styles from './Todo.module.css';
import update from 'immutability-helper';
import { DragDropContext } from "react-beautiful-dnd";

const buttonTasksName = {
    completed: 'Завершенные',
    uncomplited: 'Незавершенные',
    all: 'Все'
};

class Todo extends React.Component {
    maxId = 100;
    state = {
        tasks:  JSON.parse(localStorage.getItem('editedList') ||
            '[{"value":"Изучить React","isDone":false, "isImportant": true,"id":1},' +
            '{"value":"Найти работу","isDone":false, "isImportant": true,"id":2}]'),
        count: 3,
        filtered: buttonTasksName.all,
        classNameForInputRepeat: false,
    };

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) return;

        const newTodoItems = this.state.tasks;

        const [removed] = this.setState.splice(source.index, 1);
        this.setState.splice(destination.index, 0, removed)
        this.setState([
            ...newTodoItems
        ])
    }

    onClickDone = id => {
        const newItemList = this.state.tasks.map(item => {
            const newItem = {...item};
            if (item.id === id) {
                newItem.isDone = !item.isDone;
            }
            return newItem;
        });
        this.setState({ tasks: newItemList });
    };

    onClickImportant = id => {
        const newItemList = this.state.tasks.map(item => {
            const newItem = {...item};
            if (item.id === id) {
                newItem.isImportant = !item.isImportant;
            }
            return newItem;
        });
        this.setState({ tasks: newItemList });
    };

    onClickDelete = id => {
        const newItemList = this.state.tasks.filter(item => {
            return item.id !== id
        });

        this.setState({ tasks: newItemList });
        this.setState((count) => count - 1);
    };

    onClickAdd = value => {
        const item = this.state.tasks.filter(item => item.value === value);
        if (item.length === 0) {
            this.setState(state => ({
                tasks: [
                    ...state.tasks,
                    {
                        value,
                        isDone: false,
                        isImportant: false,
                        id: state.count + 1
                    }
                ],
                count: state.count + 1,
                classNameForInputRepeat: false
            }));
        } else {
            this.setState({ classNameForInputRepeat: true });
        }
    };

    onClickFilteredTasks = filtered => this.setState({ filtered: filtered });

    render() {
        let dealListString = JSON.stringify(this.state.tasks);
        localStorage.setItem('editedList', dealListString);

        let filteredTasks;
        switch (this.state.filtered) {
            case buttonTasksName.completed:
                filteredTasks = this.state.tasks.filter(item => item.isDone);
                break;
            case buttonTasksName.uncomplited:
                filteredTasks = this.state.tasks.filter(item => !item.isDone);
                break;
            case buttonTasksName.all:
                filteredTasks = this.state.tasks;
                break;
        };

        return (
            <Card className={styles.container}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div>
                        <div className={styles.todoHeader}>
                            <h1 className={styles.todoHeaderTitle}>Список моих дел</h1>
                            <CalcTodo
                                tasks={this.state.tasks}
                                onClickFilteredTasks={this.onClickFilteredTasks}
                                filtered={this.state.filtered}
                            />
                        </div>
                        <ItemList
                            filtered={filteredTasks}
                            filteredValue={this.state.filtered}
                            onClickDone={this.onClickDone}
                            onClickImportant={this.onClickImportant}
                            onClickDelete={this.onClickDelete} />

                        <Input items={this.state.tasks}
                               classNameForInputRepeat={this.state.classNameForInputRepeat}
                               onClickAdd={this.onClickAdd}
                        />
                    </div>
                </DragDropContext>
            </Card>
        )}
};

export default Todo;