import { AddMemberService } from "@/app/services/band/add-member";
import { PrismaBands } from "../../repositories/in-database/prisma-bands";
import { PrismaMusicians } from "../../repositories/in-database/prisma-musicians";
import { CreateBand } from "../../services/band/create-band";
import { FindBandByName } from "../../services/band/find-band";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";
import { RemoveMemberService } from "@/app/services/band/remove-member";

const prismaRepository = new PrismaBands()

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

    const parms = parmsSchema.parse(req.nextUrl.searchParams.get('name'))
    const service = new FindBandByName(prismaRepository)

    try {
        const band = await service.execute({ name: parms })
        if (band)
            return NextResponse.json({ band }, { status: 200 })
        else
            return NextResponse.json({ message: 'Banda não encontrada.' }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }

}

export async function PUT(req: NextRequest) {

    const bodySchema = z.object({
        musician: z.string(),
        band: z.string()
    })

    const b = bodySchema.parse(await req.json())
    const service = new AddMemberService(prismaRepository)

    try {
        const s = await service.execute(b.musician, b.band)
        return NextResponse.json({ message: s }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }

}

export async function DELETE(req: NextRequest) {

    const bodySchema = z.object({
        musician: z.string(),
        band: z.string()
    })

    const b = bodySchema.parse(await req.json())
    const service = new RemoveMemberService(prismaRepository)

    try {
        const s = await service.execute(b.musician, b.band)
        return NextResponse.json({ message: s }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }

}