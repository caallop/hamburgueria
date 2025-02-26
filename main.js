/**
 * processo principal
 * estudo do CRUD - aividade pratica (mongodb)
 */

//importação do modulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//importaçao do modelo de dados (hambugueres/produtos)
const lanchesModel = require('./src/models/lanches.js')

//importaçao do pacote "string-similarity"
const stringsimilarity = require('string-similarity')

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

const app = async () => {

    //tentativa de conexao
    await conectar()

    // Cadastrar lanche - 1
    await criarLanche('Lanche 1', '12.54', 'Pão,  carne - 150g, queijo e muito amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 2', '15.91', 'Pão,  carne - 180g, queijo e muito mais amor', 'img/lanchebom2.png',)
    await criarLanche('Lanche 3', '14.49', 'Pão,  carne - 150g, queijo, alface e pouco amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 4', '12.58', 'Pão,  carne - 150g, queijo, alface, tomate e muito amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 5', '19.57', 'Pão,  carne - 180g, queijo, alface, tomate, picles e MUITO amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 6', '12.56', 'Pão,  carne de cordeiro - 150g, queijo, alface e muito amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 7', '54.91', 'Pão,  carne vegana - 150g, queijo vegano, alface vegano, amor vegano', 'img/lanchebom.png',)
    await criarLanche('Lanche 8', '27.52', 'Pão,  2 carnes - 150g, queijo, alface, tomate, picles, cebola, bacon, cebola caramelizada, onion ring, fé, mais hamburguer e muito amor', 'img/lanchebom.png',)
    await criarLanche('Lanche 9', '190.84', 'Pão,  5 carnes - 180g, queijo, feijao tropeiro, açai, calabresa, calabreso, ovo, queijo, cheddar, molhos (todos), alegria, tristeza, mulher do corno, e muito amor', 'img/lanchebom.png',)



    //tentatica de desconexao
    await desconectar()

}

app()