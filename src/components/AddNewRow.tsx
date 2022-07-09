import React, { FormEvent, useState } from 'react';
import {
  Typography,
  Container,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Stack,
  SelectChangeEvent,
  InputLabel
} from '@mui/material';

import { Entity, IAddNewRow, IForm, ITableRow } from '../interfaces';
import ClientIdField from './ClientIdField';
import ClientNameField from './ClientNameField';
import RelationField from './RelationField';

const AddNewRow = (props: IAddNewRow) => {

  const { lastId, clientIds, handleClose, rowsState, setRowsState} = props;

  const [values, setValues] = useState<IForm>({
    entity: Entity.Individual,
    id: lastId + 1,
    client: '',
    companyPositionRelation: '',
  });

  const changeEntity = (entity: Entity):void => {
    setValues({ ...values, entity });
  };

  const changeClientId = (id: number):void => {
    setValues({ ...values, id });
  };

  const changeClientName = (client: string):void => {
    setValues({ ...values, client});
  };

  const changeRelationToTheCompany = (companyPositionRelation: string):void => {
    setValues({ ...values, companyPositionRelation});
  };

  const isIndividual = ():boolean => values.entity === Entity.Individual;

  const isUnique = (arr:ITableRow[] , id: number) => arr.filter(x => x.id === id).length === 0;

  const customValidator = (fields: ITableRow): { result: ITableRow | null, error: string | null } => {
    return isUnique(rowsState, Number(fields.id))
            ? {result: fields, error: null}
            : {result: null, error: 'Id is not unique!'}
  }

  const handleSubmitNewRow = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const {result, error} = customValidator(values);
    if (result) {
      setRowsState([...rowsState, result]);
      handleClose();
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new client
      </Typography>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: '50vh' }}
        >
          <Paper elevation={2} sx={{ padding: 5, marginTop: 5 }}>
            <form onSubmit={handleSubmitNewRow} style={{maxWidth: '320px'}}>
              <FormControl fullWidth size="small">
                <Grid container direction="column" spacing={2} style={{height: '300px'}}>
                  <Grid item>
                    <InputLabel id="select-entity">Entity</InputLabel>
                    <Select
                      labelId="select-entity"
                      id="select-entity"
                      fullWidth
                      style={{height: '40px'}}
                      value={values.entity}
                      label="Entity"
                      required
                      onChange={(e: SelectChangeEvent) => {
                        changeEntity(e.target.value as Entity);
                      }}
                    >
                      <MenuItem value={Entity.Individual}>{Entity.Individual}</MenuItem>
                      <MenuItem value={Entity.Company}>{Entity.Company}</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <ClientIdField lastId={lastId} clientIds={clientIds} changeClientId={changeClientId}/>
                  </Grid>
                  <ClientNameField isIndividual={isIndividual()} changeClientName={changeClientName}/>
                  <Grid item>
                    <RelationField isIndividual={isIndividual()} changeEntity={changeRelationToTheCompany}/>
                  </Grid>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={5} justifyContent="space-between">
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </FormControl>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default AddNewRow;
