const container = document.getElementById('video-container');
const button = document.getElementById('get-video');

button.addEventListener('click', () => {
  Twilio.Video.createLocalVideoTrack().then(track => {
    container.append(track.attach());
    button.remove();
  });
})