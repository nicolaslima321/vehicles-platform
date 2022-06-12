import * as React from 'react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './VehicleFilters.module.scss';

export default function VehicleFilters({ onDriversNameFilled }) {
  const [value, setValue] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles['vehicle-filters']}>
      <Typography sx={{ marginBottom: 2 }} variant="h6">Filter options:</Typography>

      <div className={styles['vehicle-filters__options']}>
        <div className={styles['vehicle-filters__options-group']}>
          <TextField className={styles['vehicle-filters__option-field']} id="outlined-basic" label="Driver Name" variant="outlined" />
          <TextField className={styles['vehicle-filters__option-field']} id="outlined-basic" label="Model" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField className={styles['vehicle-filters__option-field']} {...params} />}
              helperText="Creation Date"
            />
          </LocalizationProvider>
        </div>

        <div className={styles['vehicle-filters__options-group']}>
          <TextField className={styles['vehicle-filters__option-field-small']} id="outlined-basic" type="number" label="Driver ID" variant="outlined" />
          <TextField className={styles['vehicle-filters__option-field-small']} id="outlined-basic" type="number" label="Vehicle ID" variant="outlined" />
          <TextField className={styles['vehicle-filters__option-field-small']} id="outlined-basic" label="Plate" variant="outlined" />
          <TextField className={styles['vehicle-filters__option-field-small']} id="outlined-basic" label="Type" variant="outlined" />
          <TextField className={styles['vehicle-filters__option-field-small']} id="outlined-basic" label="Capacity" variant="outlined" />
        </div>
      </div>
    </div>
  )
}
