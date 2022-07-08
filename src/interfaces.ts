export enum Entity {
  Individual = 'Individual',
  Company = 'Company',
  CompanyRelation = 'Relation to the company',
  CompanyPosition = 'Position in the company',
  Relation = 'relation',
  Position = 'position',
}

export interface ITableRow {
  id: number;
  client: string;
  companyPositionRelation: string;
}

export interface IAddNewRow {
  lastId: number;
  clientIds: number[];
  rowsState: ITableRow[];
  setRowsState: any;
  handleClose(): void;
}

export interface ClientIdField {
  lastId: number;
  clientIds: number[];

  changeClientId(id: number): void;
}

export interface IClientNameField {
  isIndividual: boolean;

  changeClientName(client: string): void;
}

export interface IClientNameState {
  firstName: string,
  lastName: string,
  companyName: string,
}

export interface IServerVariants {
  id: string;
  name: string;
  __typename: string;
}

export interface EntityType {
  inputValue?: string;
  title: string;
}

export interface IForm {
  entity: Entity;
  id: number;
  client: string;
  companyPositionRelation: string;
}
