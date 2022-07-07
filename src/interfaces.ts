export interface IAddNewRow {
  lastId: number;
  clientIds: number[];
  handleClose(): void;
}

export interface IRelationsVariants {
  id: string,
  name: string,
  __typename: string
}