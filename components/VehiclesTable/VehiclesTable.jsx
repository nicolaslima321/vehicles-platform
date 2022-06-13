import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Popover from '@mui/material/Popover';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';

import './VehiclesTable.module.scss';

const defaultSizeProps = isMobile
  ? { minWidth: 160 }
  : { flex: 1 };

export default function DataTable({ rows, resetVehicleTable, onVehicleSelection }) {
  const [vehiclesRows, setVehiclesRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (resetVehicleTable) {
      setVehiclesRows([]);
    } else {
      setVehiclesRows(rows);
    }
  }, [rows, resetVehicleTable]);

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
      field: 'driverIdentifier',
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
      field: 'id',
      headerName: 'ID'
    },
    {
      ...defaultSizeProps,
      field: 'model',
      headerName: 'Model',
    },
    {
      ...defaultSizeProps,
      field: 'type',
      headerName: 'Type'
    },
    {
      ...defaultSizeProps,
      field: 'capacity',
      headerName: 'Capacity'
    },
    {
      ...defaultSizeProps,
      field: 'creationDate',
      headerName: 'Created in'
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Typography sx={{ marginBottom: 2 }} variant="h6">Vehicles:</Typography>

      <DataGrid
        rows={vehiclesRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          height: 400,
          '& .MuiCheckbox-root': {
            color: 'red !important',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none',
          }
        }}
        checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        onCellClick={(e) => onVehicleSelection(e)}
      />
    </div>
  );
}
