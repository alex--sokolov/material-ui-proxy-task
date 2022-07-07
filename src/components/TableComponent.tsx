import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FILTER_BY_COMPANY_POSITIONS, LOAD_COMPANY_RELATIONS, LOAD_INDIVIDUAL_POSITIONS } from '../graphql/queries';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddNewRow from './AddNewRow';

const rows = [
  { id: 1, client: 'Ivan Ivanov', companyPosition: 'Trainee', companyRelation: 'Developer' },
  { id: 2, client: 'Vasya Vasechkin', companyPosition: 'Trainee', companyRelation: 'Designer' },
  { id: 3, client: 'Sergey Sergeev', companyPosition: 'Director', companyRelation: 'Manager' },
  { id: 4, client: 'Maxim Maximov', companyPosition: 'Director', companyRelation: 'Business analytic' },
  { id: 5, client: 'Fedor Fedorov', companyPosition: 'Trainee', companyRelation: 'CEO' },
  { id: 6, client: 'Tesla', companyPosition: 'Shareholder', companyRelation: 'Chief Officer' },
  { id: 7, client: 'Apple', companyPosition: 'Shareholder', companyRelation: 'Designer' },
  { id: 8, client: 'Google', companyPosition: 'Director', companyRelation: 'Developer' },
];

const getMaxClientId = () => rows.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id;
const getClientIds = () => rows.map(client => client.id);

const TableComponent = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number', sortable: false },
    { field: 'client', headerName: 'Client', type: 'string', width: 130, disableColumnMenu:true },
    { field: 'companyPosition', headerName: 'Company Position', type: 'string', width: 150, sortable: false },
    { field: 'companyRelation', headerName: 'Relation to the Company', width: 180, sortable: false },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
      <div style={{ height: 400, width: '100%', textAlign: 'right' }}>
        <DataGrid
          rows={rows}
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
            <AddNewRow lastId = {getMaxClientId()} clientIds={getClientIds()} handleClose={handleClose}/>
          </Box>
        </Modal>
      </div>
  );
}

export default TableComponent;
