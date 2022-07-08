import { Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IClientNameField, IClientNameState } from '../interfaces';

const ClientNameField = (props: IClientNameField) => {

  const { isIndividual, changeClientName } = props;

  const [clientName, setFullName] = useState<IClientNameState>({
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
      : clientName.companyName;
    changeClientName(client);
  }, [clientName.firstName, clientName.lastName, clientName.companyName, isIndividual]);

  if (isIndividual) {
    return (
        <>
        <Grid item>
          <TextField
            label="First name"
            required
            fullWidth
            name="firstName"
            size="small"
            value={clientName.firstName}
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
