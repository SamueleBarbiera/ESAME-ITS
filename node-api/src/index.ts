import prisma from '../prisma'
import express from 'express'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Working')
})

app.get('/parcheggi/liberi', async (req: any, res: any, next: any) => {
    try {
        if (req.method === 'GET') {
            const parcheggi1 = await prisma.parcheggi.findMany({
                where: {piano: 1},
                select: {piano: true, posto: true, parcheggio_stato: true, createdAt: true},
                orderBy: {
                    posto: 'asc',
                },
            })
            const parcheggi2 = await prisma.parcheggi.findMany({
                where: {piano: 2},
                select: {piano: true, posto: true, parcheggio_stato: true},
                orderBy: {
                    posto: 'asc',
                },
            })
            res.status(200).send({parcheggi1, parcheggi2})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).send({message: error})
    }
})
app.get('/parcheggi', async (req: any, res: any, next: any) => {
    try {
        if (req.method === 'GET') {
            const parcheggi1 = await prisma.parcheggi.findMany({
                where: {piano: 1},
                select: {piano: true, posto: true, parcheggio_stato: true, createdAt: true},
                orderBy: {
                    posto: 'asc',
                },
            })
            const parcheggi2 = await prisma.parcheggi.findMany({
                where: {piano: 2},
                select: {piano: true, posto: true, parcheggio_stato: true},
                orderBy: {
                    posto: 'asc',
                },
            })
            res.status(200).json({parcheggi1, parcheggi2})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo GET REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})

app.post(`/parcheggi/checkin`, async (req: any, res: any) => {
    const {piano, posto} = req.body
    try {
        if (req.method === 'POST') {
            const findParcheggio: any = await prisma.parcheggi.findFirst({
                where: {
                    piano: piano,
                    posto: posto,
                    parcheggio_stato: false,
                },
            })
            const Occupazioneparcheggi: any = await prisma.parcheggi.update({
                where: {
                    parcheggi_id: findParcheggio.parcheggi_id,
                },
                data: {parcheggio_stato: true},
            })
            res.status(200).json({Occupazioneparcheggi})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})

app.post(`/parcheggi/checkout`, async (req: any, res: any) => {
    const {piano, posto} = req.body
    try {
        if (req.method === 'POST') {
            const trovaUltimoRecord = await prisma.parcheggi.findFirst({
                where: {
                    piano: piano,
                    posto: posto,
                    parcheggio_stato: true,
                },
            })
            const Occupazioneparcheggi = await prisma.parcheggi.update({
                where: {parcheggi_id: trovaUltimoRecord?.parcheggi_id},
                data: {parcheggio_stato: false},
            })

            res.status(200).json({Occupazioneparcheggi})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})

app.post('/durata/create', async (req: any, res: any) => {
    const {tempoGet, piano, posto} = req.body
    let calcolo = 0

    try {
        if (req.method === 'POST') {
            const parking = await prisma.parcheggi.findFirst({
                where: {parcheggio_stato: true, piano: piano, posto: posto},
                select: {parcheggi_id: true, createdAt: true, updatedAt: true},
            })

            const n_hours = tempoGet
            calcolo = n_hours * 0.75

            console.log('🚀 - file: create.ts - line 68 - handle - n_hours', calcolo)

            const Data = await prisma.durata.create({
                data: {
                    costo_finale: calcolo,
                    pagamento_effettuato: false,
                    tempo: tempoGet,
                    parcheggi_id_fk: parking?.parcheggi_id.toString()!,
                },
            })
            res.status(200).json({'Durata creata:': Data})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})

app.post(`/btn/checkin`, async (req: any, res: any) => {
    const {piano, posto} = req.body

    try {
        if (req.method === 'POST') {
            const findParcheggio = await prisma.parcheggi.findFirst({
                where: {
                    piano: piano,
                    posto: posto,
                    parcheggio_stato: true,
                },
            })
            const trovaPagamento = await prisma.durata.findFirst({
                where: {
                    parcheggi_id_fk: findParcheggio?.parcheggi_id,
                },
            })
            const avviPagamento = await prisma.durata.update({
                where: {
                    durata_id: trovaPagamento?.durata_id,
                },
                data: {pagamento_effettuato: true},
            })
            res.status(200).json({'Pagamento effettuato con il btn al checkout': avviPagamento})
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})

app.get(`/btn/checkout`, async (req: any, res: any) => {
    try {
        if (req.method === 'GET') {
            res.status(204).json('Check-in effettuato senza rfid')
        } else {
            res.status(400).json({
                ERRORE: 'si accettano solo POST REQ',
            })
        }
    } catch (err) {
        let error = 'unkUnknown Error'
        if (err instanceof Error) error = err.message
        res.status(500).json({message: error})
    }
})
app.listen(8080, () => console.log(`🚀 Server ready at: http://localhost:8080`))
