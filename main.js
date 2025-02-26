/**
 * processo principal
 * estudo do CRUD - aividade pratica (mongodb)
 */

//importação do modulo de conexão (database.js)
const { conectar, desconectar } = require(database.js)

//importaçao do modelo de dados (hambugueres/produtos)
const lanchesModel = require('./src/modelssrc/models/lanches.js')

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
      }else {
        console.log(error)
      }   
    }
}

const app = async () => {

//tentativa de conexao
conectar()

//tentatica de desconexao
desconectar()

}