import { PrismaBands } from "@/app/repositories/in-database/prisma-bands";
import { CreateBand } from "@/app/services/create-band";
import { NextRequest, NextResponse } from "next/server";
import { b } from "vitest/dist/suite-a18diDsI.js";
import { date, z } from "zod";

export async function POST(req: NextRequest) {
    const bodySchema = z.object({
        name: z.string(),
        formedAt: z.number(),
        country: z.string(),
        site: z.string(),
        memberName1: z.string(),
        memberName2: z.string()
    })

    const body = bodySchema.parse(await req.json())

    const b = {
        name: body.name,
        formedAt: body.formedAt,
        country: body.country,
        site: body.site,
        memberName1: body.memberName1,
        memberName2: body.memberName2
    }

    const prismaRepository = new PrismaBands()
    const service = new CreateBand(prismaRepository)

    try {
        await service.create(b)
        return NextResponse.json({ message: 'ok' }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }
}