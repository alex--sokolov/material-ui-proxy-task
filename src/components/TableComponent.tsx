import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddNewRow from './AddNewRow';
import {rowsMock} from '../data/data';
import { ITableRow } from '../interfaces';

const getMaxClientId = () => rowsMock.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id;
const getClientIds = () => rowsMock.map(client => client.id);

const TableComponent = () => {

  const [rowsState, setRowsState] = useState<ITableRow[]>(rowsMock);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number', sortable: false },
    { field: 'client', headerName: 'Client', type: 'string', width: 130, disableColumnMenu: true },
    {
      field: 'companyPositionRelation',
      headerName: 'Company Position/Relation',
      type: 'string',
      width: 250,
      sortable: false
    }
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ height: 400, width: '100%', textAlign: 'right' }}>
      <DataGrid
        rows={rowsState}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnSelector
      />
      <Button onClick={handleOpen} variant="contained" style={{ margin: '15px' }}>Add new item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: '15px', border: '2px solid #1976d2' }}>
            <AddNewRow
              lastId={getMaxClientId()}
              clientIds={getClientIds()}
              handleClose={handleClose}
              rowsState={rowsState}
              setRowsState={setRowsState}
              />
        </Box>
      </Modal>
    </div>
  );
};

export default TableComponent;
