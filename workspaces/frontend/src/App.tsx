import * as React from "react";
import { gql, useQuery } from '@apollo/client'
import Billet from './Billet'
import Pagination from './Pagination'
import './App.css'

const GET_BILLET_COUNT = gql`
  query findAllBillet {
    count
  }
`;

function App() {
  const { data } = useQuery<{ count: number }>(GET_BILLET_COUNT);
  return (
    <div className="App"  style={{marginTop:30}}>
      <Pagination count={data?.count || 0} render={(<Billet />) as any} />
    </div>
  )
}

export default App
