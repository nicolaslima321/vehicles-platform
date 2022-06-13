import Table from '/components/VehiclesTable/VehiclesTable';
import Button from '/components/Button/Button';
import { Skeleton } from '@mui/material';

import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios';

import { isObjectsEqual, refreshArrayMemoryReference } from '/utils'

import styles from '/styles/pages/Panel.module.scss';
import VehicleFilters from '../components/VehicleFilters/VehicleFilters';
import vehicleApi from '../api/vehicle';

export default function Panel() {
  const [filterOptions, setFilterOptions] = useState({});
  const [canPerformVehicleAction, setCanPerformVehicleAction] = useState(false);
  const [foundVehicles, setFoundVehicles] = useState([]);
  const [vehiclesSelected, setVehiclesSelected] = useState([]);
  const [vehiclesRows, setVehiclesRows] = useState([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isFirstRendering, setIsFirstRendering] = useState(true);
  const [resetVehicleTable, setResetVehicleTable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isFirstRendering) {
      console.log('first rendering');
      setIsFirstRendering(false);
      searchVehicles()
    }

    if (!isLoadingVehicles && foundVehicles.length > 0) {
      const mappedVehicles = foundVehicles.map((vehicle) => mountVehicleRow(vehicle));
      setVehiclesRows(mappedVehicles);
    }
  }, [foundVehicles])

  useMemo(() => {
    console.log('vehicles selected changed');

    const hasMoreThanOneVehicleSelected = vehiclesSelected.length > 1;
    const hasNoneVehicleSelected = vehiclesSelected.length === 0;

    if (hasMoreThanOneVehicleSelected || hasNoneVehicleSelected) {
      setCanPerformVehicleAction(false);
    } else {
      setCanPerformVehicleAction(true);
    }
  }, [vehiclesSelected])

  const mountVehicleRow = ({ creationDate, driver, ...vehiclesProps }) => {
    let driverIdentifier = '';

    if (driver && driver.length > 0) {
      const [{ id, firstName, lastName }] = driver;
      driverIdentifier = `${firstName} ${lastName} #${id}`;
    } else {
      // Reason: There are some Vehicles in the Database that doesnt have drivers
      // So I decided to identify by that form
      driverIdentifier = `Non existing driver`;
    }

    return {
      ...vehiclesProps,
      creationDate: new Date(creationDate).toLocaleDateString(),
      driverIdentifier,
    };
  }


  const onCreateVehicleClick = () => router.push('vehicle/creation');
  const onEditVehicleClick = () => {
    const currentVehicle = vehiclesSelected[0];
    router.push({
      pathname: 'vehicle/edition/[id]',
      query: { id: currentVehicle.id },
    });
  }

  const onDeleteVehicleClick = () => deleteVehicle();

  const deleteVehicle = async () => {
    const currentVehicle = vehiclesSelected[0];
    await vehicleApi.delete(currentVehicle.id);
  }

  const onSearchVehiclesClick = () => searchVehicles();

  const searchVehicles = async () => {
    setVehiclesSelected([]);
    setResetVehicleTable(true);
    setIsLoadingVehicles(true);

    const vehicles = await vehicleApi.fetchAll(filterOptions);
    console.log(vehicles);

    setFoundVehicles(vehicles);
    setIsLoadingVehicles(false);
    setResetVehicleTable(false);
  }

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

  return (
    <div className={styles.panel}>
      <VehicleFilters onOptionsChanged={(options) => setFilterOptions(options)} />

      {isLoadingVehicles && <Skeleton variant="rectangular" width={'100%'} height={400} />}
      {!isLoadingVehicles &&
        <Table
          className={`${styles['panel__vehicle-table']}`}
          rows={vehiclesRows}
          resetVehicleTable={resetVehicleTable}
          onVehicleSelection={(e) => handleVehicleSelection(e)}
        />
      }

      <div className={styles['panel__actions-group']}>
        <div className={styles['panel__actions-button-group']}>
          <Button
            className={`${styles['panel__button']} spacingRightLarge`}
            color='secondary'
            variant='filled'
            onClick={() => onSearchVehiclesClick()}
          >
            {'Search Vehicles'}
          </Button>

          <Button
            className={styles['panel__button']}
            variant='filled'
            onClick={() => onCreateVehicleClick()}
          >
            {'Create Vehicle'}
          </Button>
        </div>

        <div className={styles['panel__actions-button-group']}>
          <Button
            className={`${styles['panel__button']} spacingRightLarge`}
            onClick={() => onEditVehicleClick()}
            disabled={!canPerformVehicleAction}
          >
            {'Edit Vehicle'}
          </Button>

          <Button
            className={styles['panel__button']}
            onClick={() => onDeleteVehicleClick()}
            disabled={!canPerformVehicleAction}
          >
            {'Delete Vehicle'}
          </Button>
        </div>
      </div>
    </div>
  )
}
