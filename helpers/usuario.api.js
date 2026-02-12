// helpers/usuario.api.js

export async function criarUsuarioViaAPI(request, { nome, email, senha }) {
  const response = await request.post('http://localhost:3000/registro', {
    data: { nome, email, senha }
  });

  if (!response.ok()) {
    throw new Error(`Falha ao criar usuário via API: ${response.status()} - ${await response.text()}`);
  }

  return await response.json(); // retorna { mensagem, usuario }
}

export async function loginUsuarioViaAPI(request, { email, senha }) {
  const response = await request.post('http://localhost:3000/login', {
    data: { email, senha }
  });

  if (!response.ok()) {
    throw new Error(`Falha no login via API: ${response.status()} - ${await response.text()}`);
  }

  return await response.json(); // retorna { mensagem, usuario }
}
