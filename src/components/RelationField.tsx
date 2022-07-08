import React, { useState, useEffect } from 'react';

import {
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Autocomplete,
  createFilterOptions
} from '@mui/material';

import { useQuery } from '@apollo/client';
import { LOAD_COMPANY_RELATIONS, LOAD_INDIVIDUAL_POSITIONS } from '../graphql/queries';
import { IServerVariants, EntityType, Entity } from '../interfaces';
import { relationsInMemory } from '../data/data';

const filter = createFilterOptions<EntityType>();


const RelationField = (props: any) => {

  const { changeEntity, isIndividual } = props;
  const entity = isIndividual
    ? {
      title: Entity.CompanyPosition,
      name: Entity.Position
    }
    : {
      title: Entity.CompanyRelation,
      name: Entity.Relation
    };
  const [variants, setVariants] = useState<EntityType[]>([]);
  const [value, setValue] = useState<EntityType | null>(null);
  const [open, toggleOpen] = useState(false);
  const handleClose = () => {
    setValue(dialogValue);
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({ title: '' });

  const handleSubmit = () => {
    if(variants.filter(variant => (variant.title === dialogValue.title)).length === 0) {
      setVariants([...variants, { title: dialogValue.title }]);
    }
    setValue({ title: dialogValue.title });
    handleClose();
  };

  useEffect(() => {
    if (value) {
      changeEntity(value.title);
    }
  }, [value?.title]);


  let QUERY = LOAD_INDIVIDUAL_POSITIONS;
  switch (entity.title) {
    case Entity.CompanyRelation:
      QUERY = LOAD_COMPANY_RELATIONS;
      break;
    case Entity.CompanyPosition:
      QUERY = LOAD_INDIVIDUAL_POSITIONS;
      break;
  }
  ;

  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    console.log('loading...');
  }
  if (error) {
    console.log('error... ', error);
  }

  useEffect(() => {
    if (data) {
      const serverVariants: EntityType[] = entity.title === Entity.CompanyRelation
        ? [...data.applicantIndividualCompanyRelations.data.map((variant: IServerVariants) => ({ title: variant.name })),
          ...relationsInMemory.relations]
        : [...data.applicantIndividualCompanyPositions.data.map((variant: IServerVariants) => ({ title: variant.name })),
          ...relationsInMemory.positions];
      setVariants(serverVariants);
    }
  }, [data]);

  let filteredToDialog: EntityType[] = [{ title: 'Dich' }];

  const [filteredOnOpen, setFilteredOnOpen] = useState<string[]>([]);

  const showFiltered = (filtered: string[]) => {
    return filtered.map((relation, index) => {
      return (
        <div key={relation + index} style={{ color: 'green', fontSize: 14 - index }}>
          {relation}
        </div>
      );
    });
  };

  console.log('value', value);

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          const newFiltered = filteredToDialog.map(x => x.title);
          newFiltered.pop();
          setFilteredOnOpen(newFiltered);
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
          if (value && params.inputValue === '') params.inputValue = value.title;
          let filtered = filter(options, params);
          if (params.inputValue !== '') {
            if (filtered.filter(e => (e.title === params.inputValue)).length === 0) {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`
              });
            } else {
              filtered = [...filtered.filter(e => !e.inputValue)];
            }
          }
          filteredToDialog = [...filtered];
          return filtered;
        }}
        id="autocomplete"
        fullWidth
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
        size="small"
        renderInput={(params) => <TextField {...params} label={entity.title}/>}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleSubmit();
        }}>
          <DialogTitle>Add a new {entity.name}</DialogTitle>
          <DialogContent>
            {showFiltered(filteredOnOpen)}
            {/*{JSON.stringify(filteredOnOpen, null, 2)}*/}

            <DialogContentText>
              Did you miss any {entity.name} in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) => setDialogValue({
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
};

export default RelationField;
