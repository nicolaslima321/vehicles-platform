import Table from '/components/VehiclesTable/VehiclesTable';
import Button from '/components/Button/Button';

import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { isObjectsEqual, refreshArrayMemoryReference } from '/utils'

import styles from '/styles/pages/Panel.module.scss';
import VehicleFilters from '../components/VehicleFilters/VehicleFilters';

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

export default function Panel() {
  const [canPerformVehicleAction, setCanPerformVehicleAction] = useState(false);
  const [vehiclesSelected, setVehiclesSelected] = useState([]);

  const router = useRouter()

  useMemo(() => {
    const hasMoreThanOneVehicleSelected = vehiclesSelected.length > 1;
    const hasNoneVehicleSelected = vehiclesSelected.length === 0;

    if (hasMoreThanOneVehicleSelected || hasNoneVehicleSelected) {
      setCanPerformVehicleAction(false);
    } else {
      setCanPerformVehicleAction(true);
    }
  }, [vehiclesSelected])

  const onCreateVehicleClick = () => router.push('vehicle/creation');

  const handleVehicleSelection = ({
    row: selectedVehicle,
    value: vehicleCellUnchecked,
  }) => {
    let currentVehicles = vehiclesSelected;

    if (vehicleCellUnchecked) {
      currentVehicles = removeAlreadySelectedVehicles(selectedVehicle);
    } else {
      currentVehicles.push(selectedVehicle);
    }

    const newVehiclesSelected = refreshArrayMemoryReference(currentVehicles)

    setVehiclesSelected(newVehiclesSelected);
  }


  const removeAlreadySelectedVehicles =
    (selectedVehicle) => vehiclesSelected.filter((vehicle) => !isObjectsEqual(vehicle, selectedVehicle));

  const rows = [
    createData('Cupcake #12351', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12352', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12353', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12354', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12355', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12356', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12357', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12358', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12359', 305, 3.7, 67, 4.3, '26/03/2022'),
  ];

  return (
    <div className={styles.panel}>
      <VehicleFilters />
      <Table
        className={`${styles['panel__vehicle-table']}`}
        rows={rows}
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
            disabled={!canPerformVehicleAction}
          >
            {'Edit Vehicle'}
          </Button>

          <Button
            className={styles['panel__button']}
            disabled={!canPerformVehicleAction}
          >
            {'Delete Vehicle'}
          </Button>
        </div>
      </div>
    </div>
  )
}
