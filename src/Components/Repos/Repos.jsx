import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import styles from './Repos.module.css';
import Card from '@material-ui/core/Card';
import CircularProgress from "@material-ui/core/CircularProgress";
import Octokit from '@octokit/rest';

const  octokit = new  Octokit();

const Repos = () => {
  const initialState = {
    isLoading: true,
    isError: false,
    errorText: '',
    repoList: [],
    firstRepo: 0,
    lastRepo: 5,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    octokit.repos.listForUser({
      username: 'SveSvet',
    }).then(({data}) => {
      setState({
        ...state,
        repoList: data,
        isLoading: false,
      });
    }).catch(err => {
          setState({
            ...state,
            isLoading: false,
            isError: true,
            errorText: 'User is not found',
          });
        });
  });

  const onClickNext = () => {
    setState({
      firstRepo: state.firstRepo + 4,
      lastRepo: state.lastRepo + 4,
    });
  };
  const onClickBack = () => {
    setState({
      firstRepo: state.firstRepo - 4,
      lastRepo: state.lastRepo - 4,
    });
  };

    return (
        <Card className={ styles.wrap }>
            { state.isLoading ? <CircularProgress /> :
                <div className={styles.wrap__repos}>
                  <h1 className={styles.wrap__title}>Репозитории на github.com</h1>
                    { state.isError ?
                        <div className={styles.error}>
                          <p className={styles.error__text}>{state.errorText}</p>
                        </div> : <div className={styles.repositories}>
                          { state.repoList.length < 4 ? <div className={styles.repository__list}>
                              { state.repoList.map(repo => (
                                    <ul key={repo.id}>
                                      <div className={styles.repository}>
                                        <div className={styles['about-repository-wrapper']}>
                                          <a className={styles['about-repository-link']}
                                              href={repo.svn_url}
                                              rel='noopener noreferrer'
                                              target='_blank'>
                                            { repo.name } </a>
                                          <div className={styles['info-about-repo']}>
                                            <div className={styles['info_about-repo__language-icon']}>
                                              <div className={styles[`info-about-repo__${repo.language}-icon`.toLowerCase()]}></div>
                                              <p className={styles['info-about-repo__language']}>repo.language</p>
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
                              }
                            </div> :
                            <div className={styles.repo__button}>
                            <div className={styles.repository__list}>
                              { state.repoList.slice(state.firstRepo, state.lastRepo).map(repo => (
                                    <ul key={repo.id}>
                                      <div className={styles.repository}>
                                        <div className={styles['about-repository-wrapper']}>
                                          <a className={styles['about-repository-link']}
                                              href={repo.svn_url}
                                              rel='noopener noreferrer'
                                              target='_blank' >
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
                                <button className={classnames({
                                      [styles.button] : true,
                                      [styles.disabled]: state.firstRepo === 0
                                    })}
                                    onClick={ () => onClickBack()}
                                    disabled={state.firstRepo === 0}>
                                  Назад
                                </button>
                                <button className={classnames({[styles.button] : true,
                                        [styles.disabled]: state.repoList.length - state.lastRepo <= 0 })}
                                        onClick={ () => onClickNext()}
                                        disabled={state.repoList.length - state.lastRepo <= 0} >
                                  Далее
                                </button>
                              </div>
                            </div>
                          }
                      </div>
                  }
                </div>
            }
        </Card>
    );
  }


export default Repos;