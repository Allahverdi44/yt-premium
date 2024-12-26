let player;

document.getElementById('playButton').addEventListener('click', () => {
  const videoInput = document.getElementById('videoIdInput').value;
  const videoId = extractVideoId(videoInput);

  if (videoId) {
    loadVideo(videoId);
  } else {
    alert('Geçerli bir YouTube Video ID veya URL girin!');
  }
});

function extractVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : url; // Eğer URL değilse direkt girilen ID'yi kullan
}

function loadVideo(videoId) {
  if (!player) {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
    });
  } else {
    player.loadVideoById(videoId);
  }
}

function onYouTubeIframeAPIReady() {
  console.log('YouTube API hazır!');
}

// YouTube iframe API'yi yükleme
(function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
