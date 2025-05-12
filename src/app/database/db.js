import Conexao from "./connection.js"
import dotenv from "dotenv"
dotenv.config()

/**
 * Classe de manipulação do Banco de Dados
 * @author Thalles Nascimento
 * @class
 */
class Db{

    /**
     * Método para conexão com o Banco de Dados
     * @param {String} login Usuário do Banco de Dados
     * @param {String | Number} key Senha do Banco de Dados
     * @returns Retorna a conexão com o Banco de Dados
     */
    conection(){
        this.con = Conexao.conection(process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_HOST, process.env.MYSQL_PORT , process.env.MYSQL_DATABASE)
    }


    /**
     * SQL: INSERT INTO table SET [JSON]
     * @returns Retorna a inserção de um registro no Banco de Dados
     */
    sql_insert(logData){
        const insert_sql = "INSERT INTO log SET ?;"

        return new Promise((resolve, reject) =>{
            this.con.query(insert_sql, logData, (error, result) =>{
                if (error) {
                    console.error(error)
                    return reject("Erro ao registrar log")
                } else {
                    return resolve("Log registrado!")
                }
            })
        })
    }

}

/**
 * Padrão Singleton -> Designer Patterns
 *      Foi criada e exportada apenas uma instância da classe Db
 *  */ 
export default new Db()