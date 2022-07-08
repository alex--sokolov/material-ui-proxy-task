import React, {useState, useEffect} from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import { setContext } from '@apollo/client/link/context';
import TableComponent from './components/TableComponent';
import axios from 'axios';

const EMAIL='test@test.com';
const PASSWORD='1234567Qa';




function App() {


  const [token, setToken] = useState(localStorage.getItem('token'))

  const getToken = async () => {
    const { data } =  await axios.post(
      '/auth/login',
      { email: EMAIL, password: PASSWORD }
    )
    localStorage.setItem('token',data.access_token);
    setToken(data.access_token);
  };

  useEffect(() => {if (!token) getToken()}, [token]);

  console.log(token);
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

  return (
    <ApolloProvider client={client}>
      <TableComponent/>
    </ApolloProvider>
  );
}

export default App;
