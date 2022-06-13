import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '/styles/pages/vehicle/Edition.module.scss';
import { Select, MenuItem, TextField, Typography } from '@mui/material';
import driverApi from '../../../api/driver';
import Button from '../../../components/Button/Button';
import vehicleApi from '../../../api/vehicle';

export default function Edition() {
  const [drivers, setDrivers] = useState({});
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
    console.log(router);
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

    setSelectedDriverId(driverId);
    setPlate(plate);
    setModel(model);
    setType(type);
    setCapacity(capacity);
  }

  const onUpdateVehicleClick = async (params) => {
    const created = await vehicleApi.update(selectedDriverId, params);

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
            onChange={(e) => handleChangePlate(e)}
            value={plate}
            id="input-driverName"
            label="Plate of the vehicle"
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            onChange={(e) => handleChangeModel(e)}
            value={model}
            id="input-driverName"
            label="The model of the vehicle"
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            onChange={(e) => handleChangeType(e)}
            value={type}
            id="input-driverName"
            label="Type of the vehicle"
            variant="outlined"
          />
          <TextField
            className={styles['creation__field']}
            onChange={(e) => handleChangeCapacity(e)}
            value={capacity}
            id="input-driverName"
            label="Capacity of the vehicle"
            variant="outlined"
          />
        </section>

        <section className={styles['creation__field-section']}>
          <Typography sx={{ marginBottom: 2 }} variant="h5">Enter the current Driver</Typography>
          <TextField
            className={styles['creation__field']}
            onChange={(e) => handleChangeDriver(e)}
            value={selectedDriverId}
            id="input-driverName"
            label="Driver ID"
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
        variant='filled'
        onClick={() => onUpdateVehicleClick()}
        disabled={disabled}
      >
        {'Update Vehicle'}
      </Button>
    </div>
  )
}
