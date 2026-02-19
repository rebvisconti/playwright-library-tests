
async function handleResponse(response, customMessage) {
  if (!response.ok()) {
    const errorText = await response.text();
    throw new Error(`${customMessage} | Status: ${response.status()} | Details: ${errorText}`);
  }
  
  if (response.status() === 204) return null;
  
  return await response.json();
}

// --- Books API ---
export const booksApi = {
  create: async (request, { nome, autor, paginas, descricao, imagem }) => {
    const response = await request.post('/livros', {
      data: { nome, autor, paginas, descricao, imagemUrl: imagem }
    });
    return await handleResponse(response, 'Erro ao criar livro');
  },

  delete: async (request, id) => {
    const response = await request.delete(`/livros/${id}`);
    return await handleResponse(response, 'Erro ao deletar livro');
  },

  update: async (request, id, dados) => {
    const response = await request.put(`/livros/${id}`, { data: dados });
    return await handleResponse(response, 'Erro ao atualizar livro');
  },

  listAll: async (request) => {
    const response = await request.get('/livros');
    return await handleResponse(response, 'Erro ao listar livros');
  },

  getById: async (request, id) => {
    const response = await request.get(`/livros/${id}`);
    return await handleResponse(response, 'Erro ao buscar livro por ID');
  }
};

// --- Favorites API ---
export const favoritesApi = {
  add: async (request, usuarioId, livroId) => {
    const response = await request.post('/favoritos', {
      data: { usuarioId, livroId }
    });
    return await handleResponse(response, 'Erro ao favoritar livro');
  },

  remove: async (request, usuarioId, livroId) => {
    const response = await request.delete('/favoritos', {
      data: { usuarioId, livroId }
    });
    return await handleResponse(response, 'Erro ao desfavoritar livro');
  },

  listByUser: async (request, usuarioId) => {
    const response = await request.get(`/favoritos/${usuarioId}`);
    return await handleResponse(response, 'Erro ao listar favoritos');
  }
};

// --- Statistics API ---
export const statsApi = {
  get: async (request) => {
    const response = await request.get('/estatisticas');
    return await handleResponse(response, 'Erro ao obter estatísticas');
  }
}; // <--- ESSA CHAVE ESTAVA FALTANDO!

// --- Auth API ---
export const authApi = {
  register: async (request, { nome, email, senha }) => {
    const response = await request.post('/registro', {
      data: { nome, email, senha }
    });
    return await handleResponse(response, 'Erro ao registrar usuário');
  },

  login: async (request, { email, senha }) => {
    const response = await request.post('/login', {
      data: { email, senha }
    });
    return await handleResponse(response, 'Erro ao realizar login');
  }
};