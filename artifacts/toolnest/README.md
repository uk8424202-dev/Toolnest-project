# ToolNest

ToolNest is a responsive collection of ten everyday tools. The tools run in your browser; there is no ToolNest account, database, or application server.

## Files

- `index.html` — page shell, page title, and search/social-sharing metadata.
- `src/main.js` — site navigation, tool cards, and all ten tools' browser-side logic.
- `src/styles.css` — the visual theme, responsive layouts, and accessible interaction states.
- `public/favicon.svg` — the ToolNest browser-tab icon.
- `README.md` — Android/Replit instructions and free GitHub + Cloudflare Pages publishing steps.

## Run it in Replit on Android

1. Open the ToolNest project in the Replit app or in a mobile browser.
2. Tap **Run** at the top of the project.
3. Open the **Preview** pane to use the website. If it is hidden, open the project's tools or panes menu and choose **Preview**.
4. To edit the contact placeholder before sharing the site, open `artifacts/toolnest/src/main.js`, find `CONTACT_EMAIL` near the top, and replace `hello@toolnest.example` with an address you use.
5. Tap **Run** again after code changes to refresh the preview.

## Publish for free with GitHub and Cloudflare Pages

You do not need to buy a domain. Cloudflare Pages can give the site a free `pages.dev` address.

### Put the project on GitHub

1. Open the project's **Version control** or **Git** tool in Replit.
2. Connect a GitHub account if asked, create a new repository, and commit the project files.
3. Push the commit to GitHub. Keep the repository root as the project root; ToolNest lives in `artifacts/toolnest`.

### Connect Cloudflare Pages

1. Create a free Cloudflare account and open **Workers & Pages**.
2. Choose **Create application** → **Pages** → **Connect to Git** and select the GitHub repository.
3. Set the repository root directory to `/`.
4. Use **None** (or a custom build) as the framework preset, then set:
   - **Build command:** `pnpm install --frozen-lockfile && PORT=5173 BASE_PATH=/ pnpm --filter @workspace/toolnest run build`
   - **Build output directory:** `artifacts/toolnest/dist/public`
5. Leave environment variables empty; this static website does not need secrets or API keys.
6. Save and deploy. Cloudflare will build the site and provide a `pages.dev` link. Future pushes to the connected branch trigger a new build.

The build uses the free Vite tooling already in the repository. Cloudflare's free plan and GitHub's free account are sufficient for the basic setup; custom domains are optional.

## QR code library and privacy

The QR generator loads QRCode.js 1.0.0 from cdnjs the first time that tool is used. Your browser requests the library file from the CDN, which receives normal request metadata such as your IP address. The library creates the QR code in the browser; the text or URL entered into the tool is not sent to cdnjs or to a ToolNest server. Other tools process their input locally too.
