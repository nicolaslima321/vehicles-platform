import Header from '/layouts/Header/Header';
import styles from '../styles/App.module.scss';

import '../styles/globals.scss'
import '../styles/variables.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={ styles.app }>
      <Header/>
      <div className={ styles.appChildContainer }>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp;
