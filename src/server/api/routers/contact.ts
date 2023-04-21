import { contactSchema } from "@/utils/schema/contact"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import nodemailer from "nodemailer"
import { env } from "@/env.mjs"

const transporter = nodemailer.createTransport({
	port: parseInt(env.SENDGRID_SMTP_PORT),
	host: env.SENDGRID_SMTP_SERVER,
	auth: {
		user: env.SENDGRID_USERNAME,
		pass: env.SENDGRID_API_KEY,
	},
	secure: true,
})

/**
 * User Routers
 * route: /api/trpc/contact
 */
export const contactRouter = createTRPCRouter({
	sendMail: protectedProcedure.input(contactSchema).mutation(async ({ input }) => {
		const { email, message, name } = input

		try {
			await transporter.sendMail({
				to: "contactjobbyjob@gmail.com",
				from: "contactjobbyjob@gmail.com",

				html: /*html */ `
              <div>
                <p>Email: ${email}</p>
                <p>${message}</p>
                <div>
                  from: ${name}<br/>
                </div>
              </div>
        `,
			})
			console.log("message sent")
		} catch (error) {
			// throw Error(error)
			console.log(error)
		}
	}),
})
