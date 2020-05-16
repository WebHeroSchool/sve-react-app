import React from 'react';
import styles from './Repos.module.css';
import Card from '@material-ui/core/Card';
import CircularProgress from "@material-ui/core/CircularProgress";
import Octokit from '@octokit/rest';

const  octokit = new  Octokit();

class Repos extends React.Component {
  state = {
    isLoading: true,
    isError: false,
    errorText: '',
    repoList: [],
    firstRepo: 0,
    lastRepo: 5
  };

  componentDidMount() {
    octokit.repos.listForUser({
      username: 'SveSvet',
    }).then (({ data }) => {
      this.setState({
        repoList: data,
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
        isError: true,
        errorText: 'User is not found',
      });
    });

  };


  onClickNext = () => {
    this.setState({
      firstRepo: this.state.firstRepo + 4,
      lastRepo: this.state.lastRepo + 4
    });
  };

  onClickBack = () => {
    this.setState({
      firstRepo: this.state.firstRepo - 4,
      lastRepo: this.state.lastRepo - 4
    });
  };

  render() {
    const { isLoading, isError, errorText, repoList,
      onClickBack, onClickNext, firstRepo, lastRepo } = this.state;
    return (

        <Card className={ styles.wrap }>
            { isLoading ? <CircularProgress className={styles.preloader}/> :
                <div className={styles.wrap__repos}>
                  <h1 className={styles.wrap__title}>Репозитории на github.com</h1>
                  {isError ?
                      <div className={styles.error}>
                        <p className={styles.error__text}>{errorText}</p>
                      </div> :
                      <div className={styles.repositories}>


                        {repoList.length < 4 ? /*условие, ЕСЛИ в списке репозиториев их меньше 4, то:*/
                        <div className={styles.repository__list}>
                              {
                                repoList.map(repo => (
                                    <ul key={repo.id}>
                                      <div className={styles.repository}>
                                        <div className={styles['about-repository-wrapper']}>
                                          <a
                                              className={styles['about-repository-link']}
                                              href={repo.svn_url}
                                              rel='noopener noreferrer'
                                              target='_blank'
                                          >
                                            {repo.name}
                                          </a>
                                          <div className={styles['info-about-repo']}>

                                            <div className={styles['info_about-repo__language-icon']}>
                                              <div className={styles[`info-about-repo__${repo.language}-icon`.toLowerCase()]}></div>
                                              <p className={styles['info-about-repo__language']}>{repo.language}</p>
                                            </div>
                                            <p className={styles['info-about-repo__star']}>{repo.stargazers_count}</p>
                                            <p className={styles['info-about-repo__forks']}>{repo.forks}</p>
                                            <span>Обновлен: {new Date(repo.updated_at).toLocaleString('en-US', {
                                              day: 'numeric',
                                              month: 'short',
                                              year: 'numeric',
                                            })}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </ul>
                                ))
                              } </div> : /*условие, ЕСЛИ в списке репозиториев больше, то: */
                            <div className={styles.repo__button}>
                            <div className={styles.repository__list}>
                              {
                                repoList.slice(firstRepo, lastRepo).map(repo => (
                                    <ul key={repo.id}>
                                      <div className={styles.repository}>
                                        <div className={styles['about-repository-wrapper']}>
                                          <a
                                              className={styles['about-repository-link']}
                                              href={repo.svn_url}
                                              rel='noopener noreferrer'
                                              target='_blank'
                                          >
                                            {repo.name}
                                          </a>
                                          <div className={styles['info-about-repo']}>

                                            <div className={styles['info_about-repo__language-icon']}>
                                              <div className={styles[`info-about-repo__${repo.language}-icon`.toLowerCase()]}></div>
                                              <p className={styles['info-about-repo__language']}>{repo.language}</p>
                                            </div>
                                            <p className={styles['info-about-repo__star']}>{repo.stargazers_count}</p>
                                            <p className={styles['info-about-repo__forks']}>{repo.forks}</p>
                                            <span className={styles['info-about-repo__update']}>Обновлен: {new Date(repo.updated_at).toLocaleString('en-US', {
                                              day: 'numeric',
                                              month: 'short',
                                              year: 'numeric',
                                            })}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </ul>
                                ))
                              }
                            </div>
                              <div className={styles.buttons_wrap}>
                                <button
                                    className={styles.button}
                                    onClick={()=>this.onClickBack()}
                                    disabled={firstRepo < 3}
                                >
                                  Назад
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={()=>this.onClickNext()}
                                    disabled={repoList.length - lastRepo <= 0}
                                >
                                  Далее
                                </button>
                              </div>
                              {/*ниже - див, закрывающий стиль 'repoWithButton'*/}
                            </div>


                          }

                      </div>
                  }
                </div>
            }
        </Card>
    );
  }
}

export default Repos;