import { ITableRow } from '../interfaces';

export let rowsMock: ITableRow[] = [
  { id: 1, client: 'Ivan Ivanov', companyPositionRelation: 'Developer' },
  { id: 2, client: 'Vasya Vasechkin', companyPositionRelation: 'Designer' },
  { id: 3, client: 'Tesla', companyPositionRelation: 'Shareholder' },
  { id: 4, client: 'Maxim Maximov', companyPositionRelation: 'Business analytic' },
  { id: 5, client: 'Fedor Fedorov', companyPositionRelation: 'CEO' },
  { id: 6, client: 'Sergey Sergeev', companyPositionRelation: 'Manager' },
  { id: 7, client: 'Apple', companyPositionRelation: 'Shareholder' },
  { id: 8, client: 'Google', companyPositionRelation: 'Director' },
];

export const relationsInMemory = {
  positions: [{title: "InMemoryTestPosition"}],
  relations: [{title: "InMemoryTestRelation"}]
};
