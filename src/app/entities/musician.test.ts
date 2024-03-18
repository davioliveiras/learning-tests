import { test, expect } from 'vitest'
import { Musician } from './musician'

test('cannot create a musician without occupations', () => {
    expect(() => {
        return new Musician('Rafael Bittencourt', 'Rafael de Paula Souza Neto', 'toplinkmusicshows@hotmail.com', new Date('10/20/1971'), 
        'Brazil', [], 'Rafael é guitarrista do Angra.', 'rafaelbittencourt.com/')
    }).toThrow()
})
