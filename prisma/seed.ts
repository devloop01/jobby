import { PrismaClient } from "@prisma/client"

import jobs from "../public/jobs.json"

const prisma = new PrismaClient()

async function seed() {
	console.log("Connecting to database... ⏳")
	await prisma.$connect()
	console.log("Connected to database! ✅")

	console.log("Cleaning database...")
	await prisma.jobPosting.deleteMany()
	console.log("Database clean complete!")

	console.log("Seeding data... ⏳")
	await prisma.jobPosting.createMany({ data: jobs })
	console.log("data seeded successfully! ✅👌")
}

seed()
	.then(async () => {
		console.log("Disconnecting from database... ⏳")
		await prisma.$disconnect()
		console.log("Disconnected successfully! ✅")
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		console.log("\nSomething bad happed!! ❌❌❌")
		process.exit(1)
	})
