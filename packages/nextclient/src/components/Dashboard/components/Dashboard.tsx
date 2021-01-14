import React, { Fragment } from 'react';
import GameController from './GameController';

interface Props {}

const Dashboard = ({}: Props) => {
  return <Fragment>
          <GameController/>
          {/*<ApolloTest/>*/}
         </Fragment>
};

export default Dashboard;
