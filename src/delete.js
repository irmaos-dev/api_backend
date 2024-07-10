
const connection = require ('./connection');

const del = async (id) => {
    const [query] = await connection.execute (` DELETE FROM bd_api.pessoas WHERE id = '${id}';`);
    return  query;
}

module.exports = del;