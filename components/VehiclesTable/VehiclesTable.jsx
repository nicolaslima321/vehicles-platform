import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Popover from '@mui/material/Popover';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { IconButton, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';

import styles from './VehiclesTable.module.scss';

const defaultSizeProps = isMobile
  ? { minWidth: 160 }
  : { flex: 1 };

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

export default function DataTable() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const columns = [
    {
      ...defaultSizeProps,
      field: 'id',
      headerName: 'Driver Identifier',
      renderHeader: () => {
        return (
          <>
            <strong className='spacingRightSmall'>{`Vehicle's Driver`}</strong>
            <IconButton aria-label="info" onClick={handlePopoverClick}>
              <InfoIcon/>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
            >
              <Typography sx={{ p: 2 }}>{`The number on driver's right is his ID`}</Typography>
            </Popover>
          </>
        );
      },
    },
    {
      ...defaultSizeProps,
      field: 'vehicleId',
      headerName: 'Vehicle ID'
    },
    {
      ...defaultSizeProps,
      field: 'vehicleModel',
      headerName: 'Vehicle Model',
    },
    {
      ...defaultSizeProps,
      field: 'vehicleType',
      headerName: 'Vehicle Type'
    },
    {
      ...defaultSizeProps,
      field: 'vehicleCapacity',
      headerName: 'Vehicle Capacity'
    },
    {
      ...defaultSizeProps,
      field: 'vehicleCreatedAt',
      headerName: 'Creation Date'
    },
  ];

  const rows = [
    createData('Cupcake #12351', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12352', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12353', 305, 3.7, 67, 4.3, '26/03/2022'),
    createData('Cupcake #12354', 305, 3.7, 67, 4.3, '26/03/2022'),
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellClick={(e) => console.log(e)}
        onSelectionModelChange={(e) => console.log(e)}
      />
    </div>
  );
}
