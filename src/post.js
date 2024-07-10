const connection = require ('./connection');

const post = async (nome, email, tipo) => {
    const [query] = await connection.execute ("INSERT INTO `bd_api`.`pessoas` (`nome`, `email`, `tipo`) VALUES ('" + nome + "', '" + email + "', '" + tipo + "');");
    return  query;
}

module.exports = post;
