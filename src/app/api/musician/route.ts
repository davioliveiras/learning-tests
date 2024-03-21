import { PrismaMusicians } from '@/app/repositories/in-database/prisma-musicians';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod'
import { CreateMusician } from '../../services/musician/create-musician'
import { FindMusician } from '@/app/services/musician/find-musician';
import { AddOccupation } from '@/app/services/musician/add-occupation';

const prismaRepository = new PrismaMusicians()

export async function POST(req: NextRequest) {
  const bodySchema = z.object({
    name: z.string(),
    fullName: z.string(),
    email: z.string(),
    birthday: z.string(),
    country: z.string(),
    occupations: z.array(z.string()),
    description: z.string(),
    site: z.string().nullable(),
  })

  const body = bodySchema.parse(await req.json())

  const m = {
    name: body.name,
    fullName: body.fullName,
    email: body.email,
    birthday: new Date(body.birthday),
    country: body.country,
    occupations: body.occupations,
    description: body.description,
    site: body.site
  }

  const service = new CreateMusician(prismaRepository)

  try {
    await service.execute(m)
    return NextResponse.json({ message: 'ok' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {

  const parmsSchema = z.string()

  const name = parmsSchema.parse(req.nextUrl.searchParams.get('name'))

  const service = new FindMusician(prismaRepository)
  const m = await service.execute({ name: name })

  if (m)
    return NextResponse.json({ m }, { status: 200 });
  else
    return NextResponse.json({ message: 'Músico não encontrado' }, { status: 200 });
}

export async function PUT(req: NextRequest) {

  const service = new AddOccupation(prismaRepository)

  const bodySchema = z.object({
    name: z.string(),
    newOccupation: z.string()
  })

  const body = bodySchema.parse(await req.json())

  try {
    await service.execute({ name: body.name, occupation: body.newOccupation })
    return NextResponse.json({ message: 'Ocupação adicionada.' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}