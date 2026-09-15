This is the front-end design for blackcat-adventures.com. My personal project for my professional DM, blogs, and the books I’m writing! (Currently a WIP)

The main issue this project is trying to solve is to allow me to have the freedom of design that Next.js and React offer, while allowing the site to be easy to update for non-technical users (mainly my wife :) ), while trying to keep things as cheap as possible.

The project consists of two sections:

**The front-end (this)**

This is a Next.js application, with as much content as possible coming from Apollo GraphQL endpoints served from the back-end. The front-end code is in TypeScript and, as much as possible, manually desing (I don’t oppose the use of libraries, but I enjoy the problem solving of designing UI elements and small pieces of functionality myself). The front-end uses html-react-parser to display the HTML coming from the back-end in a non-risky way. Apart from that, the typing for the back-end is automatically inferred through Apollo and uses a cache-first policy.

**Note:** If you check below, you will notice this project is build through a standalone command; this is again to keep cost low as the build command for Next.js is infamously ram heavy. I’m also not using a building pipeline like GitHub Actions due to it being cheaper to manually go through the process of launching the site.


**The back-end (a headless WordPress API)**

The WordPress design in the back-end utilize WPGraphQL to convert Wordpress into a GraphQL interface that is able to make graph API calls, instead of REST calls. It also utilise ACF (Advanced Custom Fields) expose through the graphical interface to provide more back-end customization. The database for the CMS is a traditional MySQL manage through PHPMyAdmin.

To help keep costs down, both the Headless WordPress and the Next.js application share the same server. An Ubuntu machine in New York using Apache and a reverse proxy to run the Next.js site. If you take a look, you might notice that blackcat-adventures.com is currently down. This is because I'm currently testing how many resources the application can get away with using, since Node (and especially Next.js) uses way higher on a site than a static website, and again one of the objectives is trying to keep costs as low as possible. The Node command keeps on running through the use of pm2.

If you are curious about my other projects, you can take a look at my personal website: [edwinbroce.com](https://edwinbroce.com) (GitHub: [github.com/edwinb24/edb24-pwa-theme](https://github.com/edwinb24/edb24-pwa-theme)).

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
   
3. Login to Ubuntu server, go to the www folder, clone the repo there. Navigate to the project
   
**Note: keep in mind this is a hidden folder if you are looking for it you might need the all flag `ls -a`**

4. Run the application in port 3000 with pm2 so it remains alive even after the terminal is close
```
PORT=3000 HOSTNAME=0.0.0.0 pm2 start node .next/standalone/server.js
```

5. Verify the application is running successfully by checking the website.
