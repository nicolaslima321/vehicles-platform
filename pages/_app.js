import '../styles/globals.scss'
import Header from '/layouts/Header/Header';
import styles from '../styles/App.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={ styles.app }>
      <Header/>
      <div className={ styles['app__child-container'] }>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp;
