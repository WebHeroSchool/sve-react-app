import React from 'react';
import styles from './About.module.css';
import Repos from '../Repos/Repos';
import Card from '@material-ui/core/Card';
import CircularProgress from "@material-ui/core/CircularProgress";
import Octokit from '@octokit/rest';

import mail from './img/mail.svg';
import telegram from './img/telegram.svg';
import github from './img/github.svg';
import vk from './img/vk.svg';
import facebook from './img/facebook.svg';

const  octokit = new  Octokit();

class About extends React.Component {
  state = {
    isLoading: true,
    isError: false,
    errorText: '',
    User: [],
  };

  componentDidMount() {
    octokit.users.getByUsername({
      username: 'SveSvet',
    }).then (({ data }) => {
      this.setState({
        User: data,
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
        isError: true,
        errorText: 'User is not found :(',
      });
    });
  };

    render()
    {
      const { isLoading, isError, errorText, User } = this.state;
      return (
          <section className={styles.section}>

              <Card className={styles.content__user}>
                  {isLoading ? <CircularProgress /> :
                      <div className={styles.content__user_wrap}>
                        { isError ? <div className={styles['content__user_error']}>{errorText}</div> :
                            <div className={styles.info}>
                              <img className={styles.info__avatar} src={User.avatar_url} alt='avatar'></img>
                              <div className={styles.desc}>
                                <p className={styles.desc__login}>Светлана Митюхина</p>
                                <p className={styles.desc__bio}>{User.bio}</p>
                                <a className={ styles.desc__mail}
                                  href='mailto: svetlana.mit.dev@gmail.com'>
                                  <img src={ mail } alt='mail' className={ styles.desk__mail_img }></img>
                                  svetlana.mit.dev@gmail.com
                                </a>
                                <a className={ styles.desc__tg } href='tg://resolve?domain=nasariolet'>
                                  <img src={ telegram } alt='telegram' className={ styles.desk__tg_img }></img>
                                  +7 999 828 27 15
                                </a>
                                <div className={styles.contacts}>
                                  <a href='https://github.com/SveSvet'
                                     target='_blank'
                                     rel='noopener noreferrer'>
                                    <img src={ github } alt='github' className={styles.contacts__link}></img>
                                  </a>
                                  <a href='https://vk.com/id70672243'
                                     target='_blank'
                                     rel='noopener noreferrer'>
                                    <img src={ vk } alt='vk' className={styles.contacts__link}></img>
                                  </a>
                                  <a href='https://www.facebook.com/sveta.mityukhina'
                                     target='_blank'
                                     rel='noopener noreferrer'>
                                    <img src={ facebook } alt='facebook' className={styles.contacts__link}></img>
                                  </a>
                                </div>
                              </div>
                            </div>
                        }
                      </div>
                  }
              </Card>
                    <Repos />
          </section>
      );
    }
}

export default About;