import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';

const ClientIdField = (props: any) => {
  const { lastId, clientIds, changeClientId } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly number[]>([]);
  const loading = open && options.length === 0;

  let arrNumber: number[] = [];
  for(let i=0; i < 10; i++) {
    if (lastId + i < 99000) {
      arrNumber.push(lastId + i + 1);
    }
  }

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      if (active) {
        setOptions([...arrNumber]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const isValid = (value: number) => (value > 0) && (value <= 99000) && !(clientIds.includes(value)) && !(arrNumber.includes(value)) ;

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => (option === value) || !(clientIds.includes(value))}
      getOptionLabel={(option) =>  `${option}`}
      options={options}
      loading={loading}
      onChange={(e: SyntheticEvent, value) => {
        const id = value || lastId + 1;
        changeClientId(id);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="ClientId"
          required
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isValid(value)){
              arrNumber.push(value);
              setOptions([...arrNumber]);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default ClientIdField;
