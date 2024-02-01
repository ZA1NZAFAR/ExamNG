// pages/api/sendEmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			const { firstName, lastName, email, phoneNumber, selected, message } = req.body;

			// Create a transporter using nodemailer
			const transporter = nodemailer.createTransport({
				// Configure your email provider here (e.g., Gmail)
				service: 'gmail',
				auth: {
					user: 'examng0@gmail.com',
					pass: 'efrei2024',
				},
			});

			// Send mail with defined transport object
			const info = await transporter.sendMail({
				from: 'examng0@gmail.com', // sender address
				to: 'examng0@gmail.com', // list of receivers
				subject: 'New Support Request', // Subject line
				html: `
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Subject:</strong> ${selected.join(', ')}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
			});

			console.log('Message sent: %s', info.messageId);
			res.status(200).json({ success: true });
		} catch (error) {
			console.error('Error sending email:', error);
			res.status(500).json({ success: false, error: 'Internal Server Error' });
		}
	} else {
		res.status(405).end(); // Method Not Allowed
	}
};
