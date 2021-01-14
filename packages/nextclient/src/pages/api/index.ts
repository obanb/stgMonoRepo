import faunadb from 'faunadb'

// your secret hash
const q = faunadb.query
const client = new faunadb.Client({ secret: "fnADxTlR8tACBURsU8zJlh4M2-9GVDRw3u6T_TUU" })

module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('all_todos') // specify source
          )
        ),
        q.Lambda("x", q.Get(q.Var("x"))) // lookup each result by its reference
      )
    )
    // ok
    res.status(200).json((dbs as any).data)
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: JSON.stringify(e) })
  }
}