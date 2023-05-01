import { gql, useQuery } from '@apollo/client'
import * as React from "react";

const GET_BILLET = gql`
  query findAllBillet($skip: Int!, $take: Int!) {
    countBillet
    findAllBillet(skip: $skip, take: $take) {
      id
      identificationbillet
      isreserve
      isconsome
      createdAt
    }
  }
`;

type Billet = {
  id: string
  identificationbillet: string
  isreserve: boolean
  isconsome: boolean
}

const Billets = (props: { skip?: number; take?: number }) => {
  const { data } = useQuery<{ count: number; billet: Billet[], findAllBillet:Billet[] }>(GET_BILLET, {
    variables: props,
  });
  if(data != undefined){
    const renderedBillet = data?.findAllBillet?.map(({ id, identificationbillet, isreserve, isconsome }) => {

      return (
          <div key={id}>
            Identification du billet: {identificationbillet},
            &nbsp; Reservé: {isreserve === true ?<span style={{color: 'green'}}>{isreserve.toString()}</span> : <span style={{color: 'red'}}>{isreserve.toString()}</span>}
            &nbsp; Consomé: {isconsome === true ?<span style={{color: 'green'}}>{isconsome.toString()}</span> : <span style={{color: 'red'}}>{isconsome.toString()}</span>}
          </div>
      )
    });
    return <div className="Billet">{renderedBillet}</div>
  }

    return (
        <div className="skeletons">
          {new Array(props.take).fill(1).map((_, index) => (
              <div className="skeleton" key={index}>
                <p />
              </div>
          ))}
        </div>
    )


};

export default Billets
