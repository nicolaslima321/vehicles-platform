import Header from '/layouts/Header/Header';
import Table from '../components/Table/Table';
import styles from '../styles/pages/Teste.module.scss';

export default function Teste() {
  return (
    <div className={styles.teste}>
      teste
      <Table className={styles.testeTable}>
        foo bar
      </Table>
    </div>
  )
}
