import { connect, createLocalTracks } from 'twilio-video';


class VideoValidator {
    setError(message:string){
        throw  message;
    }

    //capturar mídia local do microfone, câmera ou compartilhamento de tela erro getUserMedia is not supported
    async criarTrilhasLocais(audio: boolean, width: number){        
        try {
            let localTracks = await createLocalTracks({audio: audio,video: { width: width }});
            return localTracks;
        } catch (e: any) {
            this.setError(e)
        } 
    }

}

export default new VideoValidator();