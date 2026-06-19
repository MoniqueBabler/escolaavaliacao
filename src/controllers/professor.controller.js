const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.professor.create({
        data
    });

    res.json(item).status(201).end();
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    const professor = await prisma.professor.findFirst({
        where: {
            email,
            senha
        }
    });

    if (!professor) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }

    res.json(professor);
};

const listar = async (req, res) => {
    const lista = await prisma.professor.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.professor.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.professor.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.professor.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    login
}
