import { Band } from "../entities/band"
import { Member } from "../entities/member"
import { Musician } from "../entities/musician"

const kiko = new Musician('Kiko Loureiro', 'Pedro Henrique Loureiro', 'store@kikoloureiro.com', new Date('6/16/1972'),
    'Brazil', ['Guitarist'], 'Pedro Henrique "Kiko" Loureiro is a Brazilian guitarist. He has been a member of several heavy ' +
'metal bands, including Angra and Megadeth.', 'kikoloureiro.com')

const rafael = new Musician('Rafael Bittencourt', 'Rafael de Paula Souza Neto', 'toplinkmusicshows@hotmail.com', new Date('10/20/1971'),
    'Brazil', ['Guitarist', 'Vocalist'], 'Rafael "Bittencourt" de Paula Souza Neto é um cantor, compositor, guitarrista ' +
    'violonista e produtor brasileiro, conhecido pelo seu trabalho como guitarrista da banda de power metal Angra, da qual é ' +
'fundador e único membro ativo em todas as formações.', 'youtube.com/@CanalAmplifica')

const felipe = new Musician('Felipe Andreoli', 'Felipe Andreoli', 'toplinkmusicshows@hotmail.com', new Date('3/7/1980'),
    'Brazil', ['Bassist'], 'Felipe Andreoli is a Brazilian musician best known as the bassist for the heavy metal band Angra.',
    'https://felipeandreoli.com/')

const angra = new Band('Angra', 1991, 'Brazil', 'angra.net')

const kikoInAngra = new Member('Kiko Loureiro', 'Angra')
const rafaelInAngra = new Member('Rafael Bittencourt', 'Angra')

export { kiko, rafael, felipe, angra, rafaelInAngra, kikoInAngra }