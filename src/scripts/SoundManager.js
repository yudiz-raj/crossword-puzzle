class SoundManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    playSound(key, loop) {
        key.play();
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}