// import React, { Fragment } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { TestQuery } from 'StgGraphql';
// import gql from 'graphql-tag';
//
// interface Props {}
//
// const q = {
//   gql: {
//     test: gql`
//       query testQuery {
//         test {
//           test
//         }
//       }
//     `,
//   },
// };
//
// const ApolloTest = ({}: Props) => {
//   const { loading, data: testData } = useQuery<TestQuery>(q.gql.test);
//
//   return <Fragment>{!loading && <div>{(testData.test as any).test}</div>}</Fragment>;
// };
//
// export default ApolloTest;
