import Table from '../components/VehiclesTable/VehiclesTable';
import Button from '../components/Button/Button';

import styles from '../styles/pages/Teste.module.scss';

export default function Teste() {
  return (
    <div className={styles.teste}>
      teste
      <Table className={styles.testeTable}>
        foo bar
      </Table>
      <Button>
        {'Create Vehicle'}
      </Button>
    </div>
  )
}
