import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import { setContext } from '@apollo/client/link/context';
import TableComponent from './components/TableComponent';

// const token = localStorage.getItem('token');
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNTIuMjI4LjIxNS45NFwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTcxMDYxNTQsImV4cCI6MTY1OTY5ODE1NCwibmJmIjoxNjU3MTA2MTU0LCJqdGkiOiJIaGNWVzFmN21NeFZ4QnNCIiwic3ViIjoyLCJwcnYiOiJjYjc4YjVlMWZmY2UwZjgzMWQwMjMxZGYyYzhiZDdjODA2NDc3NzYyIn0.p2zd9vcIXWm9eaSohi5m1Qk2uBzLiKObsuC8t4fnfS0';

const httpLink = createHttpLink({
  uri: '/api',
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <TableComponent/>
    </ApolloProvider>
  );
}

export default App;
