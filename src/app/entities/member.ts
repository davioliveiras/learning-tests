export class Member {
    private musicianName: string
    private bandName: string

    constructor(musicianName: string, bandName: string) {
        this.musicianName = musicianName
        this.bandName = bandName
    }

    getMusicianName() {
        return this.musicianName
    }

    getBandName() {
        return this.bandName
    }

    setMusicianName(musicianName: string) {
        this.musicianName = musicianName
    }

    setBandName(bandName: string) {
        this.bandName = bandName
    }
}