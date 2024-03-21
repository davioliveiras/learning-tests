import { FindBandsByMusician } from "@/app/services/band/find-musician-bands";
import { PrismaBands } from "../../repositories/in-database/prisma-bands";
import { PrismaMusicians } from "../../repositories/in-database/prisma-musicians";
import { CreateBand } from "../../services/band/create-band";
import { FindBandByName } from "../../services/band/find-band";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

export async function POST(req: NextRequest) {
    const bodySchema = z.object({
        name: z.string(),
        formedAt: z.number(),
        country: z.string(),
        site: z.string(),
        membersNames: z.array(z.string())
    })

    const body = bodySchema.parse(await req.json())

    const b = {
        name: body.name,
        formedAt: body.formedAt,
        country: body.country,
        site: body.site,
        members: body.membersNames
    }

    const musicianRepository = new PrismaMusicians()
    const prismaRepository = new PrismaBands(musicianRepository)
    const service = new CreateBand(prismaRepository)

    try {
        const band = await service.execute(b)
        return NextResponse.json({ message: band }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    const parmsSchema = z.string()

    // const parms = parmsSchema.parse(req.nextUrl.searchParams.get('name'))

    const parms = parmsSchema.parse(req.nextUrl.searchParams.get('musician'))

    const musicianRepository = new PrismaMusicians()
    const prismaRepository = new PrismaBands(musicianRepository)
    const service = new FindBandsByMusician(prismaRepository)

    try {
        const band = await service.execute({ name: parms })
        if (band)
            return NextResponse.json({ band }, { status: 200 })
        else
            return NextResponse.json({ message: 'Banda não encontrada.' }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }


    // const musicianRepository = new PrismaMusicians()
    // const prismaRepository = new PrismaBands(musicianRepository)
    // const service = new FindBandByName(prismaRepository)

    // try {
    //     const band = await service.execute({ name: parms })
    //     if (band)
    //         return NextResponse.json({ band }, { status: 200 })
    //     else
    //         return NextResponse.json({ message: 'Banda não encontrada.' }, { status: 200 })
    // } catch (err: any) {
    //     return NextResponse.json({ message: err.message }, { status: 400 })
    // }
}