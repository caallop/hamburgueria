/**
 * processo principal
 * estudo do CRUD - aividade pratica (mongodb)
 */

//importação do modulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//importaçao do modelo de dados (hambugueres/produtos)
const lanchesModel = require('./src/models/lanches.js')

//importaçao do pacote "string-similarity"
const stringSimilarity = require('string-similarity')

//CRUD- CREATE- 

const criarLanche = async (nomeLan, precoLan, descricaoLan, imagemLan) => {
    try {
        const novoLanche = new lanchesModel(
            {
                nomeLanche: nomeLan,
                precoLanche: precoLan,
                descricaoLanche: descricaoLan,
                imagemLanche: imagemLan
            }
        )
        //a linha abaixo salva os dados do cliente nos bancos de dados
        await novoLanche.save()
        console.log("lanche criado com sucesso")
    } catch (error) {
        if (error.code = 11000) {
            console.log(`ERRO: este lanche ja existe`)
        } else {
            console.log(error)
        }
    }
}

//funçao para listar todos os lanches
const listarLanches = async () => {
    try {
        //a linha abaixo lista todos os clientes
        const lanche = await lanchesModel.find()
        console.log(lanche)

    } catch (error) {
        console.log(error)
    }
}

//Funçao para buscar um lanche especifico pelo nome
const buscarLanche = async (nomeLan) => {
    try {
        // find() buscar 
        // nomeCliente: new RegExp(nome, 'i') filtro pelo nome (partes que contenham(expressão regular))
        // 'i' insensitive (ignorar letras maiusculas ou minúsculas) 
        const lanche = await lanchesModel.find(
            {

                nomeLanche: new RegExp(nomeLan, 'i')
            }
        )
        // Calcular a similaridade entre os nomes retornados e o nome pesquisado
        const nomeLanches = lanche.map(lanche => lanche.nomeLanche)

        // validação (se não existir o cliente pesquisado)
        if (nomeLanches.length === 0) {
            console.log("Cliente não cadastrado")
        } else {
            const match = stringSimilarity.findBestMatch(nomeLan, nomeLanches)

            // cliente com melhor similaridade
            const melhorLanche = lanche.find(lanche => lanche.nomeLanche === match.bestMatch.target)

            console.log(melhorLanche)
        }
        //console.log(cliente)
    } catch (error) {
        console.log(error)
    }

}


const atualizarLanche = async (id, nomeLan, descricaoLan, precoLan) => {
    try {
        const lanche = await lanchesModel.findByIdAndUpdate(
            id,
            {
                nomeLanche: nomeLan,
                descricaoLanche: descricaoLan,
                precoLanche: precoLan
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!lanche) {
            console.log("Cliente não encontrado")
        } else {
            console.log("Dados do clinte alterados com sucesso")
        }
    } catch (error) {
        console.log(error)
    }
}

const deletarLanche = async (id) => {
    try {
        const lanche = await lanchesModel.findByIdAndDelete(id)

        if (!lanche) {
            console.log("Cliente não encontrado")
        } else {
            console.log("Cliente deletado com sucesso")
        }
    } catch (error) {
        console.log(error)
    }


}

const app = async () => {

    //tentativa de conexao
    await conectar()

    // Cadastrar lanche - 1
    // await criarLanche('simples', '12.54', 'Pão,  carne - 150g, queijo e muito amor', 'img/lanchebom.png',)
    // await criarLanche('x amor', '15.91', 'Pão,  carne - 180g, queijo e muito mais amor', 'img/lanchebom2.png',)
    // await criarLanche('x burguer love', '14.49', 'Pão,  carne - 150g, queijo, alface e pouco amor', 'img/lanchebom.png',)
    // await criarLanche('mc cheese', '12.58', 'Pão,  carne - 150g, queijo, alface, tomate e muito amor', 'img/lanchebom.png',)
    // await criarLanche('x-picles', '19.57', 'Pão,  carne - 180g, queijo, alface, tomate, picles e MUITO amor', 'img/lanchebom.png',)
    // await criarLanche('cordeirinho', '12.56', 'Pão,  carne de cordeiro - 150g, queijo, alface e muito amor', 'img/lanchebom.png',)
    // await criarLanche('pink money', '54.91', 'Pão,  carne vegana - 150g, queijo vegano, alface vegano, amor vegano', 'img/lanchebom.png',)
    // await criarLanche('x tudinho', '27.52', 'Pão,  2 carnes - 150g, queijo, alface, tomate, picles, cebola, bacon, cebola caramelizada, onion ring, fé, mais hamburguer e muito amor', 'img/lanchebom.png',)
    // await criarLanche('x tudao', '190.84', 'Pão,  5 carnes - 180g, queijo, feijao tropeiro, açai, calabresa, calabreso, ovo, queijo, cheddar, molhos (todos), alegria, tristeza, mulher do corno, e muito amor', 'img/lanchebom.png',)

    //para buscar todos da lista
    // await listarLanches()

    //buscar um NOME especifico
    //await buscarLanche("")

    //Alterar os dados de um lanche por id
    await atualizarLanche('67c0fd255dd568e274907829', 'vitor', 'lanche bao a dessa', '1')

    //exlcluir os dados de um lanche por id
    await deletarLanche('67c0fd255dd568e274907829')

    //tentatica de desconexao
    await desconectar()

}

app()