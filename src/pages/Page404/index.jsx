import { Link } from 'react-router-dom';
import styles from './page404.module.css';

const Page404 = () => {
  return ( 
    <main className={styles.container}>
      <h1>Hey there👋🏾</h1>
      <p>We ran into some errors while loading this page</p>
      <h2>This can be due to various reasons:</h2>
      <ul>
        <li>A bad internet connection.</li>
        <li>An error from our servers.</li>
      </ul>
      <h2>Try:</h2>
      <ul>
        <li>Making sure your internet connection is stable.</li>
        <li>Reloading the site by clicking on the button below.</li>
      </ul>
      <Link to='/' className={styles.homeBtn}>Go back to homepage</Link>
    </main>
  );
}
 
export default Page404;