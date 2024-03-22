import type { Environment } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import 'dotenv/config'
import { execSync } from 'node:child_process';
import api from '../../src/app/libs/axios';

const prisma = new PrismaClient()

function createUrlTest(testSchema: string) {
    console.log('daale')

    if (!process.env.DATABASE_URL) {
        throw new Error('Defina uma URL para o banco')
    }

    const newUrl = new URL(process.env.DATABASE_URL)
    newUrl.searchParams.set('schema', testSchema)
    return newUrl.toString()
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = 'test_' + randomUUID()
        const testUrl = createUrlTest(schema)

        process.env.DATABASE_URL = testUrl
        console.log(process.env.DATABASE_URL)

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
}