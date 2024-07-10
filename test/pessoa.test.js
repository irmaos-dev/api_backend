const request = require("supertest");
const connection = "http://localhost:3000";
let idTeste = 0;
let dadoNome = "";
let dadoEmail = "";
let dadoTipo = 0;

describe("GET /pessoa", () => {
  it("Deve retornar 200 e o body vazio", () => {
    return request(connection)
      .get("/pessoa")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(0);
      });
  });
});

describe("POST /pessoa", () => {
  dadoNome = "Teste";
  dadoEmail = "teste@teste.com";
  dadoTipo = 1;

  it("Deve retornar 201", () => {
    return request(connection)
      .post("/pessoa")
      .send({ nome: dadoNome, email: dadoEmail, tipo: dadoTipo })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        idTeste = response.body.insertId;
        expect(idTeste).not.toBe(0);
      });
  });

  it("Deve verificar se os dados enviados foram incluídos no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + idTeste)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(idTeste);
        expect(response.body.nome).toEqual(dadoNome);
        expect(response.body.email).toEqual(dadoEmail);
        expect(response.body.tipo).toEqual(dadoTipo);
      });
  });
});

describe("PUT /pessoa/:dados", () => {
  dadoNome = "Teste2";
  dadoEmail = "teste2@teste2.com";
  dadoTipo = 2;

  it("Deve retornar 200", () => {
    return request(connection)
      .put("/pessoa/" + idTeste)
      .send({ nome: dadoNome, email: dadoEmail, tipo: dadoTipo })
      .expect(200);
  });

  it("Deve verificar se os dados enviados foram alterados no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + idTeste)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(idTeste);
        expect(response.body.nome).toEqual(dadoNome);
        expect(response.body.email).toEqual(dadoEmail);
        expect(response.body.tipo).toEqual(dadoTipo);
      });
  });
});

describe("DELETE /pessoa/:id", () => {
  it("Deve retornar 204", () => {
    return request(connection)
      .delete("/pessoa/" + idTeste)
      .expect(204);
  });

  it("Deve verificar se os dados enviados foram deletados no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + idTeste)
      .expect(404)
      .then((response) =>{       
        expect(response.body).toStrictEqual({});
      })
  });

  describe("GET /pessoa", () => {
    it("Deve retornar 200 e o body vazio", () => {
      return request(connection)
        .get("/pessoa")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(0);
        });
    });
  });
});
