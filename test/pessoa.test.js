const request = require("supertest");
const connection = "http://localhost:3000";

describe("GET /pessoa", () => {
  it("Deve retornar 200", () => {
    return request(connection)
      .get("/pessoa")
      .expect(200)
      .then((response) => {
        expect(response.body);
        console.log(response.body);
      });
  });

  it("Deve retornar 404", async () => {
    return await request(connection)
    .get("/pessoa_teste")
    .expect((response) =>{
      console.log(response)
    })
    .expect(404);
  });
});

describe("GET /pessoa/:id", () => {
  it("Deve retornar 200 e verificar o nome", () => {
    return request(connection)
      .get("/pessoa/14")
      .expect(200)
      .then((response) => {
        expect(response.body.nome).toEqual("Gustavo");
      });
  });

  it("Deve retornar 404", async () => {
    return await request(connection).get("/pessoa/70").expect(404);
  });
});

describe("POST /pessoa", () => {
  const dadoNome = "Edu";
  const dadoEmail = "Edu@talk.com";
  const dadoTipo = 2;
  let idNovo = 0;

  it("Deve retornar 201", () => {
    return request(connection)
      .post("/pessoa")
      .send({ nome: dadoNome, email: dadoEmail, tipo: dadoTipo })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        idNovo = response.body.insertId;
        console.log(idNovo);
        if (idNovo == 0) {
          throw new Error("Erro ao adicionar!");
        }
      });
  });

  it("Deve verificar se os dados enviados foram incluídos no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + idNovo)
      .expect(200)
      .then((response) => {
        expect(response.body.nome).toEqual(dadoNome);
        expect(response.body.email).toEqual(dadoEmail);
        expect(response.body.tipo).toEqual(dadoTipo);
      });
  });
});

describe("PUT /pessoa/:dados", () => {
  const dadoNome = "Boy";
  const dadoEmail = "boy@the.cat";
  const dadoTipo = 3;
  const id = "8";

  it("Deve retornar 204", () => {
    return request(connection)
      .put("/pessoa/" + id)
      .send({ nome: dadoNome, email: dadoEmail, tipo: dadoTipo })
      .expect(200);
  });

  it("Deve verificar se os dados enviados foram alterados no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + id)
      .expect(200)
      .then((response) => {
        expect(response.body.nome).toEqual(dadoNome);
        expect(response.body.email).toEqual(dadoEmail);
        expect(response.body.tipo).toEqual(dadoTipo);
      });
  });
});

describe("DELETE /pessoa/:id", () => {
  const id = "9";

  it("Deve retornar 204", () => {
    return request(connection)
      .delete("/pessoa/" + id)
      .expect(204);
  });

  it("Deve verificar se os dados enviados foram deletados no banco de dados", () => {
    return request(connection)
      .get("/pessoa/" + id)
      .expect(404);
  });
});
