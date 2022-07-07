import React, { useState, useEffect, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';
import { LOAD_COMPANY_RELATIONS } from '../graphql/queries';
import { IRelationsVariants } from '../interfaces';

interface RelationToTheCompanyType {
  inputValue?: string;
  title: string;
}
const filter = createFilterOptions<RelationToTheCompanyType>();

const RelationToTheCompanyField = (props:any) => {
  const {changeRelationToTheCompany} = props;
  const [variants, setVariants] = useState<RelationToTheCompanyType[]>([]);
  const [value, setValue] = useState<RelationToTheCompanyType | null>(null);
  const [open, toggleOpen] = useState(false);
  const handleClose = () => {
    setDialogValue({
      title: ''
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    title: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title
    });
    handleClose();
  };


  useEffect(() => {
    if (value) {
      changeRelationToTheCompany(value.title);
    }
  }, [value?.title]);


  const { loading, error, data } = useQuery(LOAD_COMPANY_RELATIONS);

  useEffect(() => {
    if (data) {
      const newVariants:RelationToTheCompanyType[] =
        data.applicantIndividualCompanyRelations.data.map((variant: IRelationsVariants) => ({title: variant.name}));
      setVariants(newVariants);
    }
  }, [data]);



  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={variants}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        size='small'
        freeSolo
        renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RelationToTheCompanyField;
