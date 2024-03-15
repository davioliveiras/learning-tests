import { test, expect } from 'vitest'
import { User } from './user'

test('cannot create an user under 18 years old', () => {
    expect(() => {
        return new User('Bruno', 'bruno@gmail.com', new Date)
    }).toThrow()
})
