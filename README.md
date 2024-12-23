This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Run Next JS:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Masukkan URL Postgre anda di .env DATABASE_URL

2. Migrate Database:
```terminal
npm run migrate
```

3. Add superAdmin account in postgresql:
```
INSERT INTO admins ("id", "adminId", "level", "access", "registerAt", "password", "noEncryptPassword") 
VALUES (DEFAULT, 'superadmin2024', 'superAdmin', 'ALL', '2024-12-12 11:41:57', '$2a$12$CZ4SGfxKUIsYrWfzh3Je1OTwEQTQKJPJxdbRLYksGQNzXml9IMOFq', 'admin123');
```

DONE:>