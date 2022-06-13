import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { TextField, Typography } from '@mui/material';

import Button from '/components/Button/Button';

import driverApi from '/api/driver';
import vehicleApi from '/api/vehicle';

import styles from '/styles/pages/vehicle/Edition.module.scss';

export default function Edition() {
  const [drivers, setDrivers] = useState({});
  const [vehicleId, setVehicleId] = useState(0);
  const [selectedDriverId, setSelectedDriverId] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({});
  const [displayPhrase, setDisplayPhrase] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;

    if (!Boolean(id)) {
      alert('ID not provided, redirecting..');
      router.back();
    }

    loadDrivers();
    loadCurrentVehicle(id);
  }, []);

  useEffect(() => {
    const canUpdateVehicle =
      Boolean(selectedDriver && selectedDriverId) &&
      Boolean(plate) && Boolean(model) && Boolean(type) &&
      Boolean(capacity);

    if (canUpdateVehicle) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedDriver, selectedDriverId, plate, model, type, capacity]);

  const loadCurrentVehicle = async (id) => {
    const {
      driver: [{ id: driverId }],
      plate,
      model,
      type,
      capacity,
    } = await vehicleApi.find(id);

    setVehicleId(id);
    setSelectedDriverId(driverId);
    setPlate(plate);
    setModel(model);
    setType(type);
    setCapacity(capacity);
  }

  const onUpdateVehicleClick = async () => {
    const params = {
      driverId: selectedDriverId,
      plate,
      model,
      type,
      capacity,
    };

    const created = await vehicleApi.update(vehicleId, params);

    if (created) {
      window.alert('Vehicle successfully updated!');
    } else {
      window.alert('Could not update vehicle! Try again');
    }
  };

  const loadDrivers = async () => {
    const drivers = await driverApi.fetchAll();
    setDrivers(drivers);
  };

  const driverIdentifier = ({ firstName, lastName, id }) => `${firstName} ${lastName} #${id}`;

  const driverPhrase =
    (driver) => {
      if (driver) {
        return `You selected the follow driver: ${driverIdentifier(driver)}`;
      } else {
        return `There are no driver with the entered ID, please try again`;
      }
    };

  const handleChangeDriver = (event) => {
    const driverId = event.target.value;

    const foundDriver =
      drivers.find((driver) => driver.id == driverId) ?? null;

    if (driverId && !foundDriver) {
      setDisplayPhrase(true);
    } else {
      setDisplayPhrase(false);
    }

    setSelectedDriver(foundDriver);
    setSelectedDriverId(foundDriver.id);
  };

  const handleChangePlate =
    (event) => setPlate(event.target.value);

  const handleChangeModel =
    (event) => setModel(event.target.value);

  const handleChangeType =
    (event) => setType(event.target.value);

  const handleChangeCapacity =
    (event) => setCapacity(event.target.value);

  return (
    <div className={styles.creation}>
      <Typography sx={{ alignSelf: 'center', marginBottom: 6 }} variant="h4">Create Vehicle</Typography>

      <div className={styles['creation__field-group']}>
        <section className={styles['creation__field-section']}>
          <Typography sx={{ marginBottom: 2 }} variant="h5">Enter the Vehicle informations</Typography>
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Plate of the vehicle"
            onChange={(e) => handleChangePlate(e)}
            sx={{ marginBottom: 2 }}
            value={plate}
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="The model of the vehicle"
            onChange={(e) => handleChangeModel(e)}
            sx={{ marginBottom: 2 }}
            value={model}
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Type of the vehicle"
            onChange={(e) => handleChangeType(e)}
            sx={{ marginBottom: 2 }}
            value={type}
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Capacity of the vehicle"
            onChange={(e) => handleChangeCapacity(e)}
            sx={{ marginBottom: 2 }}
            value={capacity}
            variant="outlined"
          />
        </section>

        <section className={styles['creation__field-section']}>
          <Typography sx={{ marginBottom: 2 }} variant="h5">Enter the current Driver</Typography>
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Driver ID"
            onChange={(e) => handleChangeDriver(e)}
            sx={{ marginBottom: 2 }}
            type="number"
            value={selectedDriverId}
            variant="outlined"
          />
          {displayPhrase &&
            <Typography sx={{
                marginBottom: 2,
                color: displayPhrase ? 'red' : '',
              }}
              variant="body1"
            >
              {driverPhrase(selectedDriver)}
            </Typography>
          }
        </section>
      </div>

      <Button
        className={styles['creation__button']}
        variant='filled'
        onClick={() => onUpdateVehicleClick()}
        disabled={disabled}
      >
        {'Update Vehicle'}
      </Button>
    </div>
  )
}
