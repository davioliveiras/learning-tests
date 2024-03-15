import { PrismaUsers } from '@/app/repositories/prisma/prisma-users';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod'
import { CreateUser } from '../../services/create-user'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  return NextResponse.json({ id: id }, {status: 200});
}

export async function POST(req: NextRequest) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    birthday: z.string()
  })

  const body = bodySchema.parse(await req.json())

  const u = {
    name: body.name,
    email: body.email,
    birthday: new Date(body.birthday)
  }

  const prismaRepository = new PrismaUsers()
  const service = new CreateUser(prismaRepository)

  try{
    await service.execute(u)
    return NextResponse.json({message: 'ok'}, {status: 200});
  }catch(err: any){
    return NextResponse.json({message: err.message}, {status: 400});
  }

  
  return NextResponse.json(body);
}