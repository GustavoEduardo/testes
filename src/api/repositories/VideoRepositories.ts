////https://www.twilio.com/docs/video/api
import axios from 'axios';
import 'dotenv/config';
import ISala from '../../types/ISala';
import { model } from 'mongoose';
import sala from '../models/Sala';//carrego o schema
import { mongoConnect } from '../models/MongoConnect';
const salaModel = model<ISala>('Sala', sala);//atribuo o schema ao model


var username = process.env.TWILIO_API_KEY ? process.env.TWILIO_API_KEY: "" ;
var password = process.env.TWILIO_API_SECRET? process.env.TWILIO_API_SECRET: "";

class VideoRepositories{   

    //sdk - Gerando token para cada participante que entra na sala - https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens#examples
    async token(userId: string, roomSid: string) {
        const AccessToken: any = require("twilio").jwt.AccessToken;
        const VideoGrant =AccessToken.VideoGrant; 
        //Criando um token de acesso que iremos assinar e devolver ao cliente,
        //contendo a concessão que acabamos de criar.
        // Used when generating any kind of tokens        
        const token = new AccessToken("ACdab97653f527ccd341e16ab7d973692d","SKe6467c0c7447a4db902951ceabce5ac2","7VoSi7g7LbyCqsvHxZ7lVj7pDAZuT2Po");           
        //Atribuindo a identidade gerada ao token.
        token.identity = userId;    
        //Conceda os recursos de token de vídeo Twilio de acesso.
        const videoGrant = new VideoGrant({room: roomSid});
        token.addGrant(videoGrant);

        let chave = {
            userId: userId,
            token: token.toJwt(),
            };
        console.log("Gerado novo Token para userId: "+chave.userId)

        return chave;                               
       
    }

     //******************Salas******************************** */
    async criarSala(uniqueName: string) {        
        console.log("Criar sala: "+uniqueName)
        let res = await axios.post(`https://video.twilio.com/v1/Rooms`,{
            recordParticipantsOnConnect: true,
            type: 'group',            
            uniqueName: uniqueName,
            statusCallback: 'https://doubts.labtropadigital.com.br/videos',
            StatusCallbackMethod:"POST"   
        },{
            auth: {
                username: username,
                password: password
              }
        })

        let sala= {
            nome: res.data.unique_name,
            sid: res.data.sid,
            criada:  res.data.date_updated,
            criador: "token.user.idU",
            url: res.data.url,
        }

        await this.setHome(sala)    
        return res.data;
    }    
   
    async encerrarSala(roomSid: string) {
        let status = "Status=completed";
        let res = await axios.post(`https://video.twilio.com/v1/Rooms/${roomSid}`,status,{           
            headers: { 
                "Accept": "application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            auth: {
                username: username,
                password: password
              }
        })
        let sala = {
            duracao: res.data.duration
        }
        await this.updateHome(res.data.sid, sala)
        return res.data;
    }

    async listarSalasAtivas() {
        let salas = await axios.get(`https://video.twilio.com/v1/Rooms`,{
            auth: {
                username: username,
                password: password
              }
        })           
        return salas.data.rooms;
    }

    async buscarSala(nomeOuSid: string) {
        let sala = await axios.get(`https://video.twilio.com/v1/Rooms/${nomeOuSid}`,{
            auth: {
                username: username,
                password: password
              }
        })           
        return sala.data;
    }

    //******************Banco Sala Mongoose******************************** */
    async setHome(sala: ISala){
        mongoConnect.connect();
        try {
            let novaSala = new salaModel(sala)
            novaSala.save()
            console.log("Dados de criação de sala salvos no mongo")            
        } catch (e) {
            console.log("Erro: "+ e)
        }          
        
    }
    
    async updateHome(sid: string, sala: ISala){
        mongoConnect.connect();
        try {
            await salaModel.updateOne({sid: sid}, {$set: sala});
            console.log("Edição realizada no mongo")
        } catch (e) {
            console.log("Erro: "+ e)
        }
    }    

    //******************Gravações******************************** */
    async listar() {
        let gravacoes = await axios.get(`https://video.twilio.com/v1/Recordings/?groupingSid`,
        {
            auth: {
                username: username,
                password: password
              }
        })
        return gravacoes.data;        
    }

    async getBySid(recordingSid: string) {
        let gravacao = await axios.get(`https://video.twilio.com/v1/Recordings/${recordingSid}`,
        {
            auth: {
                username: username,
                password: password
              }
        })
        return gravacao.data;        
    }

    async getByGroup(groupingSid: string) {
        console.log(groupingSid)
        let gravacoes = await axios.get(`https://video.twilio.com/v1/Recordings/?groupingSid=${groupingSid}`,
        {
            auth: {
                username: username,
                password: password
              }
        })
        return gravacoes.data.recordings;        
    }

}

export default new VideoRepositories();