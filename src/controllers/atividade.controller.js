const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    const { descricao, turmaId, fim } = req.body;

    const atividade = await prisma.atividade.create({
      data: {
        descricao,
        turmaId: Number(turmaId),
        fim: fim ? new Date(fim) : null
      }
    });

    return res.status(201).json(atividade);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const lista = await prisma.atividade.findMany({
      where: {
        turmaId: Number(turmaId)
      }
    });

    return res.status(200).json(lista);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: err.message });
  }
};
const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.atividade.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.atividade.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const atividade = await prisma.atividade.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json(atividade);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
