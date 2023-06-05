import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  console.log('started');

  // async function handleClick() {
  //   console.log('handleClick()');
  //   router.push('/roundtrip');
  // }

  return (
    <div className={styles.container}>
      <h1>uw-tsv-parser demos</h1>

      <p>The first demo will show the happy path.</p>
      <button onClick={() => router.push('/roundtrip')}>First demo</button>


      <p>
        The second demo shows the errors when a row has wrong number of columns
        (doesn't match header row).
      </p>
      <button onClick={() => router.push('/colmismatch')}>
        Column Mismatch demo
      </button>


      <p>
        The third demo shows checking for non-string data in a 2D array
        converted to TSV.
      </p>
      <button onClick={() => router.push('/checkNonStringVal')}>
        Check for non-string data demo
      </button>


      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}
