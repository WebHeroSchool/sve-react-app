import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import About from '../About/About';
import Todo from '../Todo/Todo';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class App extends React.Component {

    render () {
        return (
            <Router>
                <html>
                <body className={styles.body}>
                <header className={styles.header}>
                        <NavLink
                            to='/'
                            exact
                            className={styles.header__link}
                            activeClassName={styles['header__about-me']}
                        >
                            Обо мне
                        </NavLink>
                        <NavLink
                            to='/todo'
                            className={styles.header__link}
                            activeClassName={styles.header__todos}
                        >
                            Дела
                        </NavLink>
                </header>
                <div className={styles.content}>
                    <Route path='/' exact component={About} />
                    <Route path='/todo' component={Todo} />
                </div>
                </body>
                </html>
            </Router>
        )
    }
}

export default App;

