// helpers/book.api.js


// LIVROS

export async function criarLivroViaAPI(request, { nome, autor, paginas, descricao, imagem }) {
  const response = await request.post('/livros', {
    data: {
      nome,
      autor,
      paginas,
      descricao,
      imagemUrl: imagem
    }
  });

  await validarResposta(response, 'Erro ao criar livro');
  return await response.json();
}

export async function deletarLivroViaAPI(request, id) {
  const response = await request.delete(`/livros/${id}`);
  await validarResposta(response, 'Erro ao deletar livro');
}

export async function atualizarLivroViaAPI(request, id, dados) {
  const response = await request.put(`/livros/${id}`, {
    data: dados
  });

  await validarResposta(response, 'Erro ao atualizar livro');
  return await response.json();
}

export async function listarLivrosViaAPI(request) {
  const response = await request.get('/livros');
  await validarResposta(response, 'Erro ao listar livros');
  return await response.json();
}

export async function buscarLivroPorIdViaAPI(request, id) {
  const response = await request.get(`/livros/${id}`);
  await validarResposta(response, 'Erro ao buscar livro por ID');
  return await response.json();
}



//  FAVORITOS

export async function favoritarLivroViaAPI(request, usuarioId, livroId) {
  const response = await request.post('/favoritos', {
    data: { usuarioId, livroId }
  });

  await validarResposta(response, 'Erro ao favoritar livro');
  return await response.json();
}

export async function desfavoritarLivroViaAPI(request, usuarioId, livroId) {
  const response = await request.delete('/favoritos', {
    data: { usuarioId, livroId }
  });

  await validarResposta(response, 'Erro ao desfavoritar livro');
  return await response.json();
}

export async function listarFavoritosViaAPI(request, usuarioId) {
  const response = await request.get(`/favoritos/${usuarioId}`);
  await validarResposta(response, 'Erro ao listar favoritos');
  return await response.json();
}


// ESTATÍSTICAS

export async function obterEstatisticasViaAPI(request) {
  const response = await request.get('/estatisticas');
  await validarResposta(response, 'Erro ao obter estatísticas');
  return await response.json();
}


// UTILITÁRIO INTERNO

async function validarResposta(response, mensagemErro) {
  if (!response.ok()) {
    throw new Error(
      `${mensagemErro}: ${response.status()} - ${await response.text()}`
    );
  }
}