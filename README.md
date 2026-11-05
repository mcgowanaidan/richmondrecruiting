# Fall Line Recruiting

Static website for a recruiting education business serving Richmond-area high school football players and their families. Plain HTML, CSS and JavaScript. No build step.

"Fall Line Recruiting" is a working name.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content |
| `styles.css` | Styling, including light and dark themes |
| `script.js` | College-level explorer and the intro-call form |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Preview locally

Open `index.html` in a browser, or run a local server from this folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy with GitHub Pages

1. Create a new repository on GitHub and upload these files to the root of the `main` branch.
2. In the repository, open **Settings**, then **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

To use a custom domain, add it under **Settings > Pages** and point your DNS records at GitHub following their instructions.

## Before you launch

- **Activate the intro-call form (one time):** the form posts to [FormSubmit](https://formsubmit.co) and emails each request to `CONTACT_EMAIL` in `script.js` (currently tylerjelrod@gmail.com). After the site is live, submit the form once yourself. FormSubmit emails an activation link to that address. Click it, and every later request is delivered. Check the spam folder if it does not arrive. If the service cannot be reached, the form falls back to opening an email draft. FormSubmit only works from a hosted site, not from a file opened on your computer.
- **Placeholders:** items highlighted in light blue brackets are sample copy to replace. Search `class="ph"` in `index.html` to find them all:
  - counties served
  - the "What we do not do" policy note
  - the level-descriptions review note
- **Photos:** upload two photos of Tyler to the repo root, next to `index.html`, named exactly `tyler-elrod-1.jpg` and `tyler-elrod-2.jpg` (lowercase, `.jpg`). The page swaps each placeholder for its photo automatically. Portrait crops (4:5) look best, and keeping each file under about 500 KB keeps the page fast. If a photo is a PNG, convert it to JPG or tell whoever maintains the site to update the `data-src` names in `index.html`.
- **Level descriptions:** the FBS, FCS, Division II, Division III, NAIA and junior college copy is general. Confirm it against current rules from each governing body.
- **Rules check:** confirm NCAA and Virginia High School League rules on third-party recruiting services, and how contracts and payment work with minors, before taking paying clients.
- **Footer disclaimer:** review the wording with whoever advises the business.

## Editing

- Colors and fonts are CSS variables at the top of `styles.css`. Light and dark values are defined separately.
- The college-level explorer content lives in the `levels` array in `script.js`.
- Prices live in the Packages section of `index.html`: free 20-minute intro call, $100 roadmap session, $250 season program.
- The form has no server of your own and stores nothing on the site. Requests pass through FormSubmit to your inbox.
