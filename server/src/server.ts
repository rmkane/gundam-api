import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import multer from 'multer';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import sqlite3 from 'sqlite3';
import { setTimeout } from 'timers/promises';
import { z } from 'zod';

import NotificationService, { Notification } from './NotificationService.js';

dotenv.config();

const db = new sqlite3.Database('./auth.db');

db.serialize(() => {
  // db.run('DROP TABLE IF EXISTS login');
  db.run(`CREATE TABLE IF NOT EXISTS login(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username NVARCHAR(50) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(100) NOT NULL
  )`);
  db.get("SELECT 1 FROM login where username = 'admin'", (error, row) => {
    if (!row) {
      db.run(
        "INSERT INTO login (username, password, email) VALUES ('admin', 'pass', 'root@system.net')",
      );
    }
  });
});

setTimeout(3000).then(() => {
  db.get('SELECT username, email FROM login', (error, row) => {
    console.log(`${row.username} ${row.email}`);
  });
});

const parseIntOrDefault = (
  value: string | undefined,
  defaultValue: number,
): number => (value ? parseInt(value, 10) : defaultValue);

const parseBooleanOrDefault = (
  value: string | undefined,
  defaultValue: boolean,
): boolean => (value ? value === 'true' : defaultValue);

const app: Express = express();
const port: number = parseIntOrDefault(process.env.PORT, 8000);

const notificationService: NotificationService = new NotificationService();

const ContactFormData = z.object({
  email: z.string().email(),
  message: z.string(),
  name: z.string(),
  subject: z.string(),
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
type ContactFormData = z.infer<typeof ContactFormData>;

// https://codeshack.io/basic-login-system-nodejs-express-mysql/
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(multer().array('file', 10));
app.use(express.static('public'));

// Create reusable transporter object using the default SMTP transport
const getDefaultMailOptions = async (): Promise<SMTPTransport.Options> => {
  const testAccount = await nodemailer.createTestAccount();
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  };
};

const mailOptions: SMTPTransport.Options = {
  host: process.env.SMTP_HOST ?? '',
  port: parseIntOrDefault(process.env.SMTP_PORT, 0),
  secure: parseBooleanOrDefault(process.env.SMTP_SECURE, false),
  auth: {
    user: process.env.SMTP_AUTH_USER ?? '',
    pass: process.env.SMTP_AUTH_PASS ?? '',
  },
};

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/date', (_req, res) => {
  res.send({
    data: new Date(),
  });
});

app.post('/addNotification', (req: Request, res: Response) => {
  const notification: Notification = req.body;
  res.send(notificationService.addNotification(notification.content));
});

app.get('/notifications', (_req: Request, res: Response) => {
  res.send(notificationService.retrieveAllNotifications());
});

app.post('/email', (req: Request, res: Response) => {
  (async () => {
    const formData: ContactFormData = ContactFormData.parse(req.body);

    let options: SMTPTransport.Options = mailOptions;
    if (!options.host) {
      options = await getDefaultMailOptions();
    }

    const transporter = nodemailer.createTransport(options);
    const info = await transporter.sendMail({
      from: `"${formData.name}" <${options.auth?.user}>`,
      to: 'rmkane89@gmail.com',
      subject: formData.subject,
      text: formData.message,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // eslint-disable-next-line no-console
    console.log('data', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
  })();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

await setTimeout(2000);
notificationService.addNotification('Hello World');
await setTimeout(100);
notificationService.addNotification('Hello World');
await setTimeout(100);
notificationService.addNotification('Hello World');
await setTimeout(100);
notificationService.addNotification('Hello World');
