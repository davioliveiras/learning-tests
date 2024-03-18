import { Band } from "../entities/band";
import { Musician } from "../entities/musician";
import { BandRepository } from "../repositories/bands-repositories";

interface AddMusicianResquest{
    musician: Musician,
    bandName: string
}

interface RemoveMusicianResquest{
    musicianName: string,
    bandName: string
}

type Response = Band | null

export class MusicianInBand{

    constructor(private repository: BandRepository){}

    addMusician(req: AddMusicianResquest): Promise<Response>{        
        return this.repository.addMusician(req.musician, req.bandName)
    }

    removeMusician(req: RemoveMusicianResquest): Promise<Response>{        
        return this.repository.removeMusician(req.musicianName, req.bandName)
    }
}