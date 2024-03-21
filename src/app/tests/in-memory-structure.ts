import { Band } from "../entities/band"
import { Member } from "../entities/member"
import { Musician } from "../entities/musician"

export type InMemoryDatabase = { bands: Band[], musicians: Musician[], members: Member[] }