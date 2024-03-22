import api from "../../libs/axios";
import { expect, test } from "vitest";
import request from 'supertest'
import { POST } from '../../api/musician/route'


test('create a musician', async () => {


    const r = await api.post('/musician', {
        "name": "Nandinho",
        "fullName": "Pedro Henrique Loureiro",
        "email": "store@kikoloureiro",
        "birthday": "06/15/1972",
        "country": "Brazil",
        "occupations": ["Guitarist"],
        "description": "Brazilian guitarist.",
        "site": "kikoloureiro.com"
    }).then((result) => {
        console.log(result.data)
        return result
    })



    expect(r.status).toBe(201)
})