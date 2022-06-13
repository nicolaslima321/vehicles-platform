import { useEffect, useState } from 'react';

import { TextField, Typography } from '@mui/material';
import Button from '../../components/Button/Button';

import driverApi from '../../api/driver';
import vehicleApi from '../../api/vehicle';

import styles from '/styles/pages/vehicle/Creation.module.scss';

export default function Creation() {
  const [capacity, setCapacity] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [displayPhrase, setDisplayPhrase] = useState(false);
  const [drivers, setDrivers] = useState({});
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [selectedDriver, setSelectedDriver] = useState({});
  const [type, setType] = useState('');

  useEffect(() => {
    loadDrivers();
  }, []);

  useEffect(() => {
    const canCreateVehicle =
      Boolean(selectedDriver && selectedDriver.id) &&
      Boolean(plate) && Boolean(model) && Boolean(type) &&
      Boolean(capacity);

    if (canCreateVehicle) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedDriver, plate, model, type, capacity]);

  const onCreateVehicleClick = async () => {
    const created = await vehicleApi.create({
      driverId: selectedDriver.id,
      plate,
      model,
      type,
      capacity,
    });

    if (created) {
      window.alert('Vehicle successfully created!');
    } else {
      window.alert('Could not create vehicle! Try again');
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
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="The model of the vehicle"
            onChange={(e) => handleChangeModel(e)}
            sx={{ marginBottom: 2 }}
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Type of the vehicle"
            onChange={(e) => handleChangeType(e)}
            sx={{ marginBottom: 2 }}
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            id="input-driverName"
            label="Capacity of the vehicle"
            onChange={(e) => handleChangeCapacity(e)}
            sx={{ marginBottom: 2 }}
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
        disabled={disabled}
        onClick={() => onCreateVehicleClick()}
        variant='filled'
      >
        {'Create Vehicle'}
      </Button>
    </div>
  )
}
