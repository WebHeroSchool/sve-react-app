import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Input.module.css';
import buttonImg from './assets/button.svg';

class Input extends React.Component {
        state = {
                inputValue: '',
                inputError: false,
            };

            onLabelChange = (e) => {
            this.setState({
                 inputValue: e.target.value
            })
        };

        onSubmit = (e) => {
        e.preventDefault();
            if (this.state.inputValue === '') {
                this.setState({
                    inputError: true,
                });
        
            } else {
                this.setState({
                inputValue: '',
                inputError: false,
            });
            this.props.onClickAdd(this.state.inputValue);
            }
        };
        
        render() {
                const { inputValue, inputError } = this.state;
                const { classNameForInputRepeat } = this.props;

            return (
                <form className={classnames({
                        [styles['inputWrap']]: true,
                        [styles['inputError']]: inputError,
                        [styles['inputRepeat']]: classNameForInputRepeat})}
                        onSubmit={this.onSubmit}
                        >
                        <input
                            onChange={this.onLabelChange}
                            placeholder={'Введите текст'}
                            className={styles.input}
                            value={inputValue}
                             />
                    <button className={styles.inputButton}>
                        <img src={buttonImg} alt=""/>
                    </button>
                </form>
            );
        };
};


export default Input;