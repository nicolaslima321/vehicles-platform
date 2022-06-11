import Table from '../components/VehiclesTable/VehiclesTable';
import Button from '../components/Button/Button';

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '../styles/pages/Teste.module.scss';

function createData(
  driverIdentifier,
  vehicleId,
  vehicleModel,
  vehicleType,
  vehicleCapacity,
  vehicleCreatedAt,
) {
  return {
    id: driverIdentifier,
    vehicleId,
    vehicleModel,
    vehicleType,
    vehicleCapacity,
    vehicleCreatedAt,
  };
}

export default function Teste() {
  const [hasVehicleSelected, setHasVehicleSelected] = useState(false);
  let [vehiclesSelected, setVehiclesSelected] = useState([]);

  const router = useRouter()

  // useEffect(() => {
  //   console.log('i entered here');

  //   if (vehiclesSelected && vehiclesSelected.length < 1) {
  //     console.log('im empty');
  //     setHasVehicleSelected(false);
  //   } else {
  //     console.log('im have some vehicles');
  //     if (hasVehicleSelected) {
  //       console.log('state is right, no changes need');
  //       return;
  //     }

  //     console.log('adjusting state');
  //     setHasVehicleSelected(true);
  //   }
  // }, [vehiclesSelected])

  const onCreateVehicleClick = () => router.push('vehicle/creation');

  const handleAllVehiclesSelection = (e) => {
    if (e && e.length === rows.length) {
      setHasVehicleSelected(true);
      setVehiclesSelected(rows);
    } else if (e && e.length === 0) {
      setHasVehicleSelected(false);
    }
  }

  const handleVehicleSelection = ({ row: selectedVehicle }) => {
    let currentVehicles = vehiclesSelected;
    console.log('started with', currentVehicles);

    if (currentVehicles.includes(selectedVehicle)) {
      currentVehicles = removeAlreadySelectedVehicles(selectedVehicle);
    } else {
      currentVehicles.push(selectedVehicle);
    }

    if (currentVehicles.length === 0) {
      setHasVehicleSelected(false);
    } else {
      setHasVehicleSelected(true);
    }

    console.log('ended with', currentVehicles);

    setVehiclesSelected(currentVehicles);
  }

  const removeAlreadySelectedVehicles =
    (selectedVehicle) => vehiclesSelected.filter((vehicle) => vehicle != selectedVehicle);

  const rows = [
    createData('Cupcake #12351', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12352', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12353', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12354', 305, 3.7, 67, 4.3, '26/03/2022'),
  ];

  return (
    <div className={styles.teste}>
      <Table
        className={`${styles['panel__vehicle-table']}`}
        rows={rows}
        onAllVehiclesSelected={(e) => handleAllVehiclesSelection(e)}
        onVehicleSelection={(e) => handleVehicleSelection(e)}
      />

      <div className={styles['panel__actions-group']}>
        <Button
          className={styles['panel__button']}
          variant='filled'
          onClick={() => onCreateVehicleClick()}
        >
          {'Create Vehicle'}
        </Button>

        <div>
          <Button
            className={`${styles['panel__button']} spacingRightLarge`}
            disabled={!hasVehicleSelected}
          >
            {'Edit Vehicle'}
          </Button>

          <Button
            className={styles['panel__button']}
            disabled={!hasVehicleSelected}
          >
            {'Delete Vehicle'}
          </Button>
        </div>
      </div>
    </div>
  )
}
