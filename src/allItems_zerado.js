const connection = require ('./connection');

const allItems_zerado = async () => {
    const [query] = await connection.execute ('SELECT *, id as _id FROM bd_api.pessoa_teste');
    return  query;
}

module.exports = allItems_zerado;