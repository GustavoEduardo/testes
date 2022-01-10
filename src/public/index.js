// Uma room (sala) é um espaço virtual no qual os usuários finais se comunicam.
// O participant (participante) é um usuário que entrou ou entrará em uma sala.
// As Tracks (Faixas) são informações compartilhadas entre os espectadores. Existem diferentes tipos de faixas, como áudio, vídeo ou dados.
// As tracks (faixas) podem ser local (locais) ou remote (remotas), pois esses tipos de dados precisam ser tratados de maneiras diferentes. Você não iria querer que o vídeo de um usuário fizesse uma viagem de ida e volta no servidor ao exibi-lo no navegador dele.
// As informações sobre as tracks (faixas) são compartilhadas entre os espectadores usando um subscription model (modelo de assinatura).

// Primeiro, buscamos o access token (token de acesso) em nosso servidor. Em seguida, nos conectamos a uma sala ao chamar o método connect.

// Usamos as APIs do navegador para capturar áudio e vídeo locais e, em seguida, passar essas informações para a sala que estamos criando.

// Após o usuário se conectar a uma sala, precisamos attach (anexar) suas tracks (faixas) locais de áudio e vídeo, o que significa transformá-las em elementos HTML de midia com o SDK do Twilio Video. Feito isso, podemos anexá-las ao DOM.

// Se outros espectadores já estiverem na sala, precisaremos assinar e anexar suas faixas de vídeo e áudio. Além disso, devemos configurar ouvintes de eventos para que façam o mesmo para os futuros participantes que também participarão da chamada.

// Por fim, precisaremos limpar e remover elementos e assinaturas quando um participante sair da sala. É apenas uma questão de boas maneiras e o garbage collector vai agradecer por isso.

// O método toggleButtons (alternar botões) é uma função auxiliar para exibir ou ocultar os botões Join Room (Entrar na sala) e Leave Room (Sair da sala), assim o usuário não se atrapalha ao escolher qual é o correto.

let room;

 const joinRoom = async (event, identidade) => {
 const response = await fetch(`/token?identidade=${identidade}`);
 const jsonResponse = await response.json();
 const token = jsonResponse.token;

 const Video = Twilio.Video;

 const localTracks = await Video.createLocalTracks({
   audio: true,
   video: { width: 640 },
 });
 try {
   room = await Video.connect(token, {
     name: "videoAppointment",
     tracks: localTracks,
   });
 } catch (error) {
   console.log(error);
 }

 // display your own video element in DOM
 // localParticipants are handled differently
 // you don't need to fetch your own video/audio streams from the server
 const localMediaContainer = document.getElementById("local-media-container");
 localTracks.forEach((localTrack) => {
   localMediaContainer.appendChild(localTrack.attach());
 });

 // display video/audio of other participants who have already joined
 room.participants.forEach(onParticipantConnected);

 // subscribe to new participant joining event so we can display their video/audio
 room.on("participantConnected", onParticipantConnected);

 room.on("participantDisconnected", onParticipantDisconnected);

 toggleButtons();

 event.preventDefault();
};

// when a participant disconnects, remove their video and audio from the DOM.
const onParticipantDisconnected = (participant) => {
 const participantDiv = document.getElementById(participant.sid);
 participantDiv.parentNode.removeChild(participantDiv);
};

const onParticipantConnected = (participant) => {
 const participantDiv = document.createElement("div");
 participantDiv.id = participant.sid;

 // when a remote participant joins, add their audio and video to the DOM
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

 const trackUnsubscribed = (track) => {
   track.detach().forEach((element) => element.remove());
 };

 participant.on("trackUnsubscribed", trackUnsubscribed);
};

const onLeaveButtonClick = (event) => {
 room.localParticipant.tracks.forEach((publication) => {
   const track = publication.track;
   // stop releases the media element from the browser control
   // which is useful to turn off the camera light, etc.
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