import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const answerData: Prisma.AnswerCreateInput[] = [
  {
    entryAt: '2020-01-22T13:57:31.123Z',
    answer: 'first entry example',
  },
  {
    entryAt: '2020-02-22T13:57:31.123Z',
    answer: 'second entry example',
  },
  {
    entryAt: '2020-01-22T13:57:31.123Z',
    answer: 'third entry example',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of answerData) {
    const answer = await prisma.answer.create({
      data: u,
    })
    console.log(`Created user with id: ${answer.id}`)
  }
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
