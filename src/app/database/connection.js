// Código necessário para a conexão com o banco de dados
import mysql from 'mysql2'

/**
 * Classe que realiza a conexão com o Banco de Dados
 * @author Thalles Nascimento
 * @class
 */
class Conexao{

    /**
     * 
     * @param {String} login Usuário do Banco de Dados
     * @param {String | Number} key Senha do Banco de Dados
     * @returns Retorna a conexão com o Banco de Dados
     */
    conection(login, key, hostname, port,databases){
        
        const con = mysql.createConnection({
            host: hostname,
            port: port,
            user: login,
            password: key,
            database: databases
        })
        
        return con
    }

}

/**
 * Padrão Singleton -> Designer Patterns
 *      Foi criada e exportada apenas uma instância da classe Conexão
 *  */ 
 export default new Conexao()