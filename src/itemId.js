const connection = require ('./connection');

const itemId = async (id) => {
    const [query] = await connection.execute (`SELECT * FROM bd_api.pessoas WHERE id = '${id}';`);
    return  query[0];
}

module.exports = itemId;