// import React, { Fragment } from 'react';
// import TableRow from './TableRow'
// import { NewGameForm } from './NewGameForm';
//
// interface Props {}
//
// const DashboardCopy = ({}: Props) => {
//   const [data, setData] = React.useState([])
//   React.useEffect(() => {
//     async function getData() {
//       const res = await fetch('/api')
//       const newData = await res.json()
//       setData(newData)
//     }
//     getData()
//   }, [])
//
//   return <Fragment>
//     {/*{data.length > 0 ? (*/}
//     {/*        data.map(d => (*/}
//     {/*          <TableRow*/}
//     {/*            loading={false}*/}
//     {/*            key={d.data.title}*/}
//     {/*            title={d.data.title}*/}
//     {/*            description={d.data.description}*/}
//     {/*          />*/}
//     {/*        ))*/}
//     {/*      ) : ( */}
//     {/*        <>*/}
//     {/*         {"loading"}*/}
//     {/*        </>*/}
//     {/*      )}*/}
//     {
//       <div>
//         <NewGameForm />
//       </div>
//     }
//
//   </Fragment>;
// };
//
// export default DashboardCopy;
