import { Prisma } from '@prisma/client'
import prisma from '../prisma'

const arrPIANO1: any = []
const arrPIANO2: any = []

for (let x = 0; x < 3; x++) {
    arrPIANO1[x] = { posto: x, piano: 1, parcheggio_stato: false }
}

for (let y = 0; y < 3; y++) {
    arrPIANO2[y] = { posto: y, piano: 2, parcheggio_stato: false }
}


const parcheggiData: Prisma.ParcheggiCreateInput[] = arrPIANO1
const parcheggiData2: Prisma.ParcheggiCreateInput[] = arrPIANO2

async function main() {
    console.log('Start seeding ...')
    await prisma.parcheggi.deleteMany({})
    const parcheggi = await prisma.parcheggi.createMany({
        data: parcheggiData,
    })
    const parcheggi2 = await prisma.parcheggi.createMany({
        data: parcheggiData2,
    })
    console.log('🚀 - file: seed.ts - line 36 - main - user', parcheggi, parcheggi2)
    // eslint-disable-next-line quotes
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
