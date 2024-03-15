import { User } from '@/app/entities/user';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod'

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
  // console.log(body)
  return NextResponse.json(body);
}