import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Popover from '@mui/material/Popover';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';

import './VehiclesTable.module.scss';

const defaultSizeProps = isMobile
  ? { minWidth: 160 }
  : { flex: 1 };

export default function DataTable({ rows, onAllVehiclesSelected, onVehicleSelection }) {
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          '& .MuiCheckbox-root': {
            color: 'red !important',
          }
        }}
        checkboxSelection
        onSelectionModelChange={(e) => onAllVehiclesSelected(e)}
        onCellClick={(e) => onVehicleSelection(e)}
      />
    </div>
  );
}
