'use client'
import { FormEvent, useState } from "react";
import api from "./libs/axios";
import { AxiosError } from "axios";

export default function Home() {
  const [ name, setName ] = useState<string>()
  const [ email, setEmail ] = useState<string>()
  const [ date, setDate ] = useState<string>()

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(date)
    
   const d = date ? new Date(date) : null

    const user = {
      name: name,
      email: email,
      birthday: d
    }

    api.post('/user', user).then((response) => {
      console.log(response)
    }).catch((err: AxiosError) => {
      console.log(err.response?.data)
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={send}>
        <div className="flex flex-col">
          <input type="text" name="name" className="border-b outline-none" placeholder="João da Silva" 
            onChange={(e) => setName(e.target.value)}/>
          <input type="email" name="email" className="border-b outline-none" placeholder="joao@gmail.com"
            onChange={(e) => setEmail(e.target.value)}/>
          <input type="date" name="birthday" className="border-b outline-none"
            onChange={(e) => setDate(e.target.value)}/>
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </main>
  );
}
