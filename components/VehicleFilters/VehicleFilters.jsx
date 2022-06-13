import * as React from 'react';
import { useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from '/styles/components/VehicleFilters.module.scss';

export default function VehicleFilters({ onOptionsChanged }) {
  const [filterOptions, setFilterOptions] = useState({});

  const overrideOptionsObject =
    (currentOption, optionToOverride) => Object.assign(currentOption, optionToOverride);

  const handleChange = (event, optionKey) => {
    event.stopPropagation();

    const { target: { value: optionValue }} = event;
    const newOptionsObject = overrideOptionsObject(filterOptions, { ...filterOptions, [optionKey]: optionValue });
    setFilterOptions(newOptionsObject);

    onOptionsChanged(filterOptions);
  };

  return (
    <div className={styles['vehicle-filters']}>
      <Typography sx={{ marginBottom: 2 }} variant="h6">Filter options:</Typography>

      <div className={styles['vehicle-filters__options']}>
        <div className={styles['vehicle-filters__options-group']}>
          <TextField
            className={styles['vehicle-filters__option-field']}
            onChange={(e) => handleChange(e, 'driverName')}
            id="input-driverName"
            label="Driver Name"
            variant="outlined"
          />
          <TextField
            className={styles['vehicle-filters__option-field']}
            onChange={(e) => handleChange(e, 'model')}
            id="input-model"
            label="Model"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Creation Date"
              value={filterOptions.creationDate}
              onChange={(e) => handleChange(e, 'creationDate')}
              renderInput={(params) => <TextField
                className={styles['vehicle-filters__option-field']}
                id="input-creationDate"
                {...params}
              />}
              helperText="Creation Date"
            />
          </LocalizationProvider>
        </div>

        <div className={styles['vehicle-filters__options-group']}>
          <TextField
            className={styles['vehicle-filters__option-field-small']}
            onChange={(e) => handleChange(e, 'driverId')}
            id="input-driverId"
            type="number"
            label="Driver ID"
            variant="outlined"
          />
          <TextField
            className={styles['vehicle-filters__option-field-small']}
            onChange={(e) => handleChange(e, 'vehicleId')}
            id="input-vehicleId"
            type="number"
            label="Vehicle ID"
            variant="outlined"
          />
          <TextField
            className={styles['vehicle-filters__option-field-small']}
            onChange={(e) => handleChange(e, 'plate')}
            id="input-plate"
            label="Plate"
            variant="outlined"
          />
          <TextField
            className={styles['vehicle-filters__option-field-small']}
            onChange={(e) => handleChange(e, 'type')}
            id="input-type"
            label="Type"
            variant="outlined"
          />
          <TextField
            className={styles['vehicle-filters__option-field-small']}
            onChange={(e) => handleChange(e, 'capacity')}
            id="input-capacity"
            label="Capacity"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  )
}
