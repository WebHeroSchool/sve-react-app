import React from 'react';
import classnames from 'classnames';
import styles from './CalcTodo.module.css';

const CalcTodo = ({ tasks, onClickFilteredTasks, filtered }) => {
    const allTasks = tasks.length;
    const completedTasks = tasks.filter(item => item.isDone).length;
    const uncompletedTasks = tasks.filter(item => !item.isDone).length;


    return (
        <div className={styles.calcTasksWrapper}>
                <button
                    className={classnames({
                        [styles.button]: true,
                        [styles.selected]: filtered === 'Завершенные'
                    })}
                    onClick={() => onClickFilteredTasks('Завершенные')}
                >
                    Сделано:
                    <span className={styles.tasksCount}>
            {completedTasks}
          </span>
                </button>
                <button
                    className={classnames({
                        [styles.button]: true,
                        [styles.selected]: filtered === 'Незавершенные'
                    })}
                    onClick={() => onClickFilteredTasks('Незавершенные')}
                >
                    Осталось:
                    <span className={styles.tasksCount}>
            {uncompletedTasks}
          </span>
                </button>
                <button
                    className={classnames({
                        [styles.button]: true,
                        [styles.selected]: filtered === 'Все'
                    })}
                    onClick={()=>onClickFilteredTasks('Все')}
                >
                    Все:
                    <span className={styles.tasksCount}>
            {allTasks}
          </span>
                </button>
            </div>
    )

}

export default CalcTodo;

