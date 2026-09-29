# Siket Digitals

One-page site for Siket Digitals, a studio in Addis Ababa that builds websites and web apps. The page introduces the studio, shows the team, and sends contact messages by email through Web3Forms.

## Run it locally

```powershell
npm install
copy .env.example .env
npm run dev
```

Open http://127.0.0.1:5173/

Put the Web3Forms access key in `.env`:

```
VITE_WEB3FORMS_KEY=your-key-here
```

`.env` stays on your machine. It is listed in `.gitignore`.

## Scripts

- `npm run dev` starts the local site
- `npm run build` typechecks and builds the production files into `dist/`
- `npm run preview` serves the built site

## What stays out of GitHub

`node_modules/`, `dist/`, `.env`, and the `Inspiration/` folder are ignored.
