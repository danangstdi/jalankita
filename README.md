This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. First, Turn On your apache server for mysql

2. Run Next JS:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Migrate Database:
```terminal
npm run migrate
```

4. Add superAdmin account in mysql:
```example: phpmyadmin
INSERT INTO `admins` (`id`, `adminId`, `level`, `access`, `registerAt`, `password`, `noEncryptPassword`) VALUES (NULL, 'superadmin2024', 'superAdmin', 'ALL', '2024-12-12 11:41:57.496000', '$2a$12$CZ4SGfxKUIsYrWfzh3Je1OTwEQTQKJPJxdbRLYksGQNzXml9IMOFq', 'admin123')
```

DONE:>