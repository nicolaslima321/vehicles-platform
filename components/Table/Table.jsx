import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/InfoOutlined';

function createData(
  driverIdentifier,
  vehicleId,
  vehicleModel,
  vehicleType,
  vehicleCapacity,
  createdAt,
) {
  return {
    driverIdentifier,
    vehicleId,
    vehicleModel,
    vehicleType,
    vehicleCapacity,
    createdAt,
  };
}

const rows = [
  createData('Cupcake #12354', 305, 3.7, 67, 4.3, '26/03/2022'),
  createData('Donut', 452, 25.0, 51, 4.9, '26/03/2022'),
  createData('Eclair', 262, 16.0, 24, 6.0, '26/03/2022'),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, '26/03/2022'),
  createData('Gingerbread', 356, 16.0, 49, 3.9, '26/03/2022'),
  createData('Honeycomb', 408, 3.2, 87, 6.5, '26/03/2022'),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, '26/03/2022'),
  // createData('Jelly Bean', 375, 0.0, 94, 0.0),
  // createData('KitKat', 518, 26.0, 65, 7.0),
  // createData('Lollipop', 392, 0.2, 98, 0.0),
  // createData('Marshmallow', 318, 0, 81, 2.0),
  // createData('Nougat', 360, 19.0, 9, 37.0),
  // createData('Oreo', 437, 18.0, 63, 4.0),
];

const headCells = [
  {
    id: 'driverName',
    numeric: false,
    disablePadding: true,
    label: `Vehicle's driver`,
  },
  // {
  //   id: 'name',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Driver ID',
  // },
  {
    id: 'vehicleId',
    numeric: true,
    disablePadding: false,
    label: 'Vehicle ID',
  },
  {
    id: 'vehicleModel',
    numeric: true,
    disablePadding: false,
    label: 'Vehicle Model',
  },
  {
    id: 'vehicleType',
    numeric: true,
    disablePadding: false,
    label: 'Vehicle Type',
  },
  {
    id: 'vehicleCapacity',
    numeric: true,
    disablePadding: false,
    label: 'Vehicle Capacity',
  },
  {
    id: 'vehicleCreatedAt',
    numeric: true,
    disablePadding: false,
    label: 'Creation Date',
  },
];

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverClick = (event) => {
    console.log('im here')
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const canDisplayPopoverInfo = (headCell) => headCell.id === 'driverName';

  const EnhancedTableHead = (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}

            {canDisplayPopoverInfo(headCell) &&
              <>
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
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = index;
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row[index]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%', flex: '1' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            { EnhancedTableHead }

            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, index)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.driverIdentifier}
                    </TableCell>
                    <TableCell align="right">{row.vehicleId}</TableCell>
                    <TableCell align="right">{row.vehicleModel}</TableCell>
                    <TableCell align="right">{row.vehicleType}</TableCell>
                    <TableCell align="right">{row.vehicleCapacity}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
