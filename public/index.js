let room;
let roomSid = "RMb652cdb773ba0c708c0531eb50831ab9"
let roomName = "RMb652cdb773ba0c708c0531eb50831ab9"

const joinRoom = async (event, identity,) => {
 const response = await fetch(`/token?userId=${identity.nome}&roomSid=${roomSid}`);
 const jsonResponse = await response.json();
 const token = jsonResponse.result.token;
 const Video = Twilio.Video;

 if(identity.tipo == "prestador"){
  var localTracks = await Video.createLocalTracks({
    audio: true,
    video: { width: 640 },
  });
 }else{
  var localTracks = [];
 }
 
 try {
     room = await Video.connect(token, {
     name: roomName,
     tracks: localTracks,
   });
   console.log("Conectado a Sala: "+ roomName)
 } catch (error) {
   console.log(error);
 }
 // exibe seu próprio elemento de vídeo em DOM
 // localParticipants são tratados de forma diferente
 // você não precisa buscar seus próprios streams de vídeo / áudio do servidor
 if(identity.tipo == "prestador"){
  const localMediaContainer = document.getElementById("local-media-container");
  localTracks.forEach((localTrack) => {
    localMediaContainer.appendChild(localTrack.attach());
  });
 }
// exibe vídeo / áudio de outros participantes que já aderiram.
 room.participants.forEach(onParticipantConnected);

 // inscreva-se em um novo participante entrando no evento para que possamos exibir seu vídeo / áudio
 //exibe audio e video do participante conectado...
 room.on("participantConnected", onParticipantConnected);

 room.on("participantDisconnected", onParticipantDisconnected);

 toggleButtons();

 event.preventDefault();
};

// quando um participante se desconecta, remove seu vídeo e áudio do DOM.
 const onParticipantDisconnected = (participant) => {
 const participantDiv = document.getElementById(participant.sid);
 participantDiv.parentNode.removeChild(participantDiv);
};



const onParticipantConnected = (participant) => {
  if(participant.identity == "provider"){
  const participantDiv = document.createElement("div");
    participantDiv.id = participant.sid;
 

// quando um participante remoto entra, adiciona seu áudio e vídeo ao DOM
 const trackSubscribed = (track) => {
   participantDiv.appendChild(track.attach());
 };

 participant.on("trackSubscribed", trackSubscribed);

 participant.tracks.forEach((publication) => {
   if (publication.isSubscribed) {
     trackSubscribed(publication.track);
   }
 });
 
  document.body.appendChild(participantDiv); 
  console.log("Prestador entrou")
}

 const trackUnsubscribed = (track) => {
   track.detach().forEach((element) => element.remove());
 };

 participant.on("trackUnsubscribed", trackUnsubscribed);
};



const onLeaveButtonClick = (event) => {
 room.localParticipant.tracks.forEach((publication) => {
   const track = publication.track;
   
    // stop libera o elemento de mídia do controle do navegador
   // que é útil para desligar a luz da câmera, etc.
   track.stop();
   const elements = track.detach();
   elements.forEach((element) => element.remove());
 });
 room.disconnect();

 toggleButtons();
};

const toggleButtons = () => {
 document.getElementById("leave-button").classList.toggle("hidden");
 document.getElementById("join-button").classList.toggle("hidden");
};