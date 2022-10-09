/* Basic stuff */
var vid = document.getElementById("video");
vid.autoplay = true;
vid.load();
function showVideoControls() {
    videoControls.classList.add('visible');
}

function hideVideoControls() {
    videoControls.classList.remove('visible');
}

videoControls.addEventListener('click', function(event) {
    if (videoControls.classList.contains('visible')) {
        //hideVideoControls();
    } else {
        showVideoControls();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    showVideoControls();
});


/* Utils */

function secondsToTimeCode(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
        h,
        m > 9 ? m : '0' + m,
        s > 9 ? s : '0' + s,
    ].filter(Boolean).join(':');
}


/* Custom controls */

playPauseButton.addEventListener('click', function(event) {
    event.stopPropagation();
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

video.addEventListener('play', function() {
    playPauseButton.classList.add('playing');
    // hideVideoControls();
});

video.addEventListener('pause', function() {
    console.log('pause');
    playPauseButton.classList.remove('playing');
    showVideoControls();
});

video.addEventListener('ended', function() {
    console.log('ended');
    playPauseButton.classList.remove('playing');
    video.currentTime = 0;
    showVideoControls();
});

const skipTime = 10;


if ('orientation' in screen) {
    screen.orientation.addEventListener('change', function() {
        // Let's automatically request fullscreen if user switches device in landscape mode.
        if (screen.orientation.type.startsWith('landscape')) {
            // Note: It may silently fail in browsers that don't allow requesting
            // fullscreen from the orientation change event.
            // https://github.com/whatwg/fullscreen/commit/e5e96a9da944babf0e246980559cd80a46a300ca
            requestFullscreenVideo();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
}

function lockScreenInLandscape() {
    if (!('orientation' in screen)) {
        return;
    }

    // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
    if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
        screen.orientation.lock('landscape').then(function() {
            // When screen is locked in landscape while user holds device in
            // portrait, let's use the Device Orientation API to unlock screen only
            // when it is appropriate to create a perfect and seamless experience.
            listenToDeviceOrientationChanges();
        });
    }
}

function listenToDeviceOrientationChanges() {
    if (!('DeviceOrientationEvent' in window)) {
        return;
    }

    var previousDeviceOrientation, currentDeviceOrientation;
    window.addEventListener('deviceorientation', function onDeviceOrientationChange(event) {
        // event.beta represents a front to back motion of the device and
        // event.gamma a left to right motion.
        if (Math.abs(event.gamma) > 10 || Math.abs(event.beta) < 10) {
            previousDeviceOrientation = currentDeviceOrientation;
            currentDeviceOrientation = 'landscape';
            return;
        }
        if (Math.abs(event.gamma) < 10 || Math.abs(event.beta) > 10) {
            previousDeviceOrientation = currentDeviceOrientation;
            // When device is rotated back to portrait, let's unlock screen orientation.
            if (previousDeviceOrientation == 'landscape') {
                screen.orientation.unlock();
                window.removeEventListener('deviceorientation', onDeviceOrientationChange);
            }
        }
    });
}


/* Background Playback */

document.addEventListener('visibilitychange', function() {
    // Pause video when page is hidden.
    if (document.hidden) {
        video.pause();
    }
});


let index = 3;

video.addEventListener('play', function() {
    // Calling this one to set up media session just for the sake of separating
    // background playback.
}, { once: true });
