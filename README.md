This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies by running `yarn`
**Note: this application runs Yarn commands, running npm commands can result on build errors or two lock files**

Run the dev environment:

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Digital Ocean with Apache

1. Build application locally using the command:
   ```
   yarn build:standalone
   ```
This will build the application standalone. The standalone build is saved to the `.next/` directory, but it is not part of the git ignore, so it will show when commiting the code to GitHub.

2. Push changes on main to override previous build
   
3. Login to Ubuntu server, go to the www folder, clone the repo there. Navigate to the standalone folder `cd .next/standalone/`
**Note: keep in mind this is a hidden folder if you are looking for it you might need the all flag `ls -a`**

4. Run the application in port 3000
```
PORT=3000 HOSTNAME=0.0.0.0 node server.js
```

5. Verify the application is running successfully by checking the website.


