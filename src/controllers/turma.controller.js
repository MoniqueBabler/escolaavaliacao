const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.turma.create({
            data
        });

        return res.status(201).json(item);

    } catch (err) {
        console.log("ERRO AO CADASTRAR TURMA:");
        console.log(err);

        return res.status(500).json({
            erro: err.message
        });
    }
};


const listar = async (req, res) => {
    try {
        const { professorId } = req.params;

        const turmas = await prisma.turma.findMany({
            where: { 
                professorId: Number(professorId) 
            }
        });

        return res.status(200).json(turmas);

    } catch(err) {
        console.log(err);

        return res.status(500).json({
            erro: err.message
        });
    }
};


const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.turma.findUnique({
            where: { 
                id: Number(id) 
            }
        });

        return res.status(200).json(item);

    } catch(err) {
        console.log(err);

        return res.status(500).json({
            erro: err.message
        });
    }
};


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.turma.update({
            where:{
                id:Number(id)
            },
            data:req.body
        });

        return res.status(200).json(item);

    } catch(err) {
        console.log(err);

        return res.status(500).json({
            erro:err.message
        });
    }
};


const excluir = async (req, res) => {
  const { id } = req.params;

  const existeAtividade = await prisma.atividade.findFirst({
    where: { turmaId: Number(id) }
  });

  if (existeAtividade) {
    return res.status(400).json({
      error: "Você não pode excluir uma turma com atividades cadastradas"
    });
  }

  const turma = await prisma.turma.delete({
    where: { id: Number(id) }
  });

  return res.status(200).json(turma);
};


module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};