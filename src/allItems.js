const connection = require ('./connection');

const allItems = async () => {
    const [query] = await connection.execute ('SELECT *, id as _id FROM bd_api.pessoas');
    return  query;
}

module.exports = allItems;