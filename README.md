# Benito González Sax

Portfolio website for Benito González Sax, a professional saxophonist for weddings, corporate events, and celebrations across Murcia, Alicante, and Spain. Built with Astro and available in Spanish and English.

![Screenshot](docs/screenshot.png)

## Installation

### Prerequisites

Install [nvm](https://github.com/nvm-sh/nvm) to manage the Node.js version.

### Setup

```sh
nvm install   # installs the Node.js version specified in .nvmrc
nvm use       # switches to that version
npm install   # installs dependencies
```

## Usage

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build for production into `./dist/`         |
| `npm run preview` | Preview the production build locally        |

## Deployment

The site is hosted on **Firebase Hosting** (region: `europe-west1`) and deployed via two GitHub Actions workflows:

- **Push to `main`** → builds the site and deploys to the live production channel at [benitogonzalezsax.com](https://benitogonzalezsax.com).
- **Open a pull request** → builds the site and deploys to a temporary Firebase **preview channel**, posting the preview URL as a comment on the PR.

The workflows require a `FIREBASE_SERVICE_ACCOUNT_BENITOGONZALEZSAX` secret configured in the repository settings. No manual `firebase deploy` is needed — CI handles everything
