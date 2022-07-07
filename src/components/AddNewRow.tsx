import { useQuery } from '@apollo/client';
import { LOAD_COMPANY_RELATIONS } from '../graphql/queries';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Stack
} from '@mui/material';

import { IAddNewRow } from '../interfaces';
import ClientIdField from './ClientIdField';

const AddNewRow = (props: IAddNewRow) => {
  const { lastId, clientIds, handleClose } = props;

  const { loading, error, data } = useQuery(LOAD_COMPANY_RELATIONS);
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  // const { loading, error, data } = useQuery(FILTER_BY_COMPANY_POSITIONS);
  // useEffect(() => {
  //
  //
  //   console.log('data', data);
  // }, [data]);

  // const { loading, error, data } = useQuery(LOAD_INDIVIDUAL_POSITIONS);
  // useEffect(() => {
  //
  //
  //   console.log('data', data);
  // }, [data]);

  // const [entity, setEntity] = useState('Individual');


  const [values, setValues] = useState({
    entity: 'Individual',
    id: lastId + 1,
    client: '',
    companyPosition: '',
    companyRelation: '',
  });

  const changeEntity = (e: SelectChangeEvent<string>) => {
    setValues({ ...values, entity: e.target.value });
  };
  const changeClientId = (id: number) => {
    setValues({ ...values, id });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleClientId = (e: any) => {
    e.preventDefault();
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
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <InputLabel id="select-entity">Entity</InputLabel>
                    <Select
                      labelId="select-entity"
                      id="select-entity"
                      fullWidth
                      value={values.entity}
                      label="Entity"
                      required
                      onChange={(e: SelectChangeEvent<string>) => {
                        changeEntity(e);
                      }}
                    >
                      <MenuItem value="Individual">Individual</MenuItem>
                      <MenuItem value="Company">Company</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item>
                    <ClientIdField lastId={lastId} clientIds={clientIds} changeClientId={changeClientId}/>
                  </Grid>

                  <Grid item>
                    <TextField
                      label="First name"
                      required
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Last name"
                      required
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Company name"
                      required
                    />
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


// return (
//   <div>
//     <Typography id="modal-modal-title" variant="h6" component="h2">
//       Add new client
//     </Typography>
//     <Form
//       onSubmit={onSubmit}
//       validate={validate}
//       render={({ form, handleSubmit, submitting, pristine, values }) => (
//         <form onSubmit={handleSubmit} noValidate>
//           <FormSpy
//             subscription={{ values: true }}
//             onChange={({ values }) => {
//               let needReset = false;
//               const next = { ...values };
//
//               // reset city field value when country changes
//               if (values.country !== valuesRef.current.country) {
//                 next.city = null;
//                 needReset = true;
//               }
//               if (needReset) {
//                 // update form without triggering validation
//                 form.reset(next);
//               }
//
//               // update ref
//               valuesRef.current = values;
//             }}
//           />
//
//           <Paper style={{ padding: 16 }}>
//             <Grid container alignItems="flex-start" spacing={8}>
//               <Grid item xs={12}>
//                 <Field
//                   fullWidth
//                   name="notes"
//                   component={TextField}
//                   multiline
//                   label="Notes"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   fullWidth
//                   name="country"
//                   component={Select}
//                   label="Select a Country"
//                   formControlProps={{ fullWidth: true }}
//                 >
//                   <MenuItem value="France">France</MenuItem>
//                   <MenuItem value="Hungary">Hungary</MenuItem>
//                   <MenuItem value="Germany">Germany</MenuItem>
//                 </Field>
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   fullWidth
//                   name="city"
//                   component={Select}
//                   label="Select a City"
//                   formControlProps={{ fullWidth: true }}
//                 >
//                   <MenuItem value="London">London</MenuItem>
//                   <MenuItem value="Paris">Paris</MenuItem>
//                   <MenuItem value="Budapest">Budapest</MenuItem>
//                 </Field>
//               </Grid>
//               <Grid item style={{ marginTop: 16 }}>
//                 <Button
//                   type="button"
//                   variant="contained"
//                   onClick={form.reset}
//                   disabled={submitting || pristine}
//                 >
//                   Reset
//                 </Button>
//               </Grid>
//               <Grid item style={{ marginTop: 16 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   disabled={submitting}
//                 >
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//
//           <pre>{JSON.stringify(values, 0, 2)}</pre>
//         </form>
//       )}
//     />
//   </div>
// )

