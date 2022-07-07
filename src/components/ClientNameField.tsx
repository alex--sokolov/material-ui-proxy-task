import { Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ClientNameField = (props: any) => {

  const { isIndividual, changeClientName } = props;


  const nameRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

  const [clientName, setFullName] = useState({
      firstName: '',
      lastName: '',
      companyName: ''
    }
  );

  useEffect(() => {
    const client = isIndividual
      ? clientName.firstName !== ''
          ? clientName.lastName !== ''
              ?`${clientName.firstName} ${clientName.lastName}`
              : clientName.firstName
          : clientName.lastName
      : clientName.companyName
    changeClientName(client);
  }, [clientName.firstName, clientName.lastName, clientName.companyName, isIndividual]);

  const errorText = 'Invalid input';

  if (isIndividual) {
    return (
      <>
        <Grid item>
          <TextField
            label="First name"
            required
            fullWidth
            // error={true}
            name="firstName"
            size="small"
            value={clientName.firstName}
            // helperText={errorText}
            onChange={(e) => setFullName({...clientName, firstName: e.target.value})}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Last name"
            required
            fullWidth
            name="lastName"
            size="small"
            value={clientName.lastName}
            onChange={(e) => setFullName({...clientName, lastName: e.target.value})}
          />
        </Grid>
      </>
    );
  }

  return (
    <Grid item>
      <TextField
        label="Company name"
        required
        fullWidth
        name="companyName"
        size="small"
        value={clientName.companyName}
        onChange={(e) => setFullName({...clientName, companyName: e.target.value})}
      />
    </Grid>
  );
};

export default ClientNameField;
