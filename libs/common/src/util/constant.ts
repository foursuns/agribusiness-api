export enum MESSAGE {
  BAD_REQUEST = 'Exceção de solicitação incorreta',
  BAD_GATEWAY_REQUEST = 'Exceção de solicitação gateway',

  FOUND = 'já existe',
  NOT_FOUND = 'não encontrado',

  SUCCESS = 'sucesso',

  INVALID_DOCNO = 'Documento inválido',

  CREATE_SUCCESS = 'criado com sucesso.',
  UPDATE_SUCCESS = 'atualizado com sucesso.',
  DELETE_SUCCESS = 'excluído com sucesso.',

  ERROR_CREATE = 'Erro ao criar',
  ERROR_UPDATE = 'Erro ao atualizar',
  ERROR_DELETE = 'Erro ao excluir',
  ERROR_FIND = 'Erro ao localizar',
  ERROR_CALCULATE = 'Área Agricultável + Área de Vegetação deve ser igual a Área Total da fazenda',
}
