const connection = require ('./connection');

const put = async (nome, email, tipo, id) => {
    const [query] = await connection.execute (`UPDATE bd_api.pessoas SET nome = '${nome}', email = '${email}', tipo = '${tipo}' WHERE id = '${id}';`);
    return  query;
}

module.exports = put;