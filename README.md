This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## NOTE For Reviewer
```
Karena Vercel free plan yang cukup berat ketika menjalankan ORM seperti prisma, terkadang deployment kami mengalami gangguan server ( https://jalankita.vercel.app/ ). Jadi kami menyarankan untuk juga melakukan testing di local dengan panduan instalasi dibawah :
```

## Getting Started

1. Instal dependencies
```terminal
npm i
```

2. Konfigurasi Postgresql anda di .env DATABASE_URL

3. Migrate Database:
```terminal
npm run migrate
```

4. Generate Prisma Client:
```terminal
npx prisma generate
```

5. Generate akun SuperAdmin melalui SQL Editor:
```pgadmin sql editor
INSERT INTO admins ("id", "adminId", "level", "access", "registerAt", "password", "noEncryptPassword") 
VALUES (DEFAULT, 'superadmin2024', 'superAdmin', 'ALL', '2024-12-12 11:41:57', '$2a$12$CZ4SGfxKUIsYrWfzh3Je1OTwEQTQKJPJxdbRLYksGQNzXml9IMOFq', 'admin123');

kredensial:
- adminId : superadmin2024
- password : admin123
```

6. Run Next JS:
```terminal
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

DONE:>