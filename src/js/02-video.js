import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAY_TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(PLAY_TIME_KEY, stringifyData);
};
player.on('timeupdate', throttle(onPlay, 1000));

function resumePlayback() {
  if (JSON.parse(localStorage.getItem(PLAY_TIME_KEY)) === null) {
    return;
  }
  const pause = JSON.parse(localStorage.getItem(PLAY_TIME_KEY))['seconds'];
  if (pause) {
    player
      .setCurrentTime(pause)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'Error':
            break;
          default:
            break;
        }
      });
  }
}
resumePlayback();
