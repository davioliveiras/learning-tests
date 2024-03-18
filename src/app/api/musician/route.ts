import { PrismaUsers } from '@/app/repositories/in-database/prisma-musicians';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod'
import { CreateMusician } from '../../services/create-musician'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  return NextResponse.json({ id: id }, {status: 200});
}

export async function POST(req: NextRequest) {
  const bodySchema = z.object({
    name: z.string(),
    fullName: z.string(),
    email: z.string(),
    birthday: z.string(),
    country: z.string(),
    occupations: z.array(z.string()),
    description: z.string(),
    site: z.string().optional(),
  })

  const body = bodySchema.parse(await req.json())

  const m = {
    name: body.name,
    fullName: body.fullName,
    email: body.email,
    birthday: body.birthday,
    country: body.country,
    occupations: body.occupations,
    description: body.description,
    site: body.site
  }

  const prismaRepository = new PrismaMusicians()
  const service = new CreateMusician(prismaRepository)

  try{
    await service.execute(m)
    return NextResponse.json({message: 'ok'}, {status: 200});
  }catch(err: any){
    return NextResponse.json({message: err.message}, {status: 400});
  }
}