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

- **Contact email:** set `CONTACT_EMAIL` at the top of `script.js`. The intro-call form opens the visitor's email app with the request filled in. Until the address is set, the form shows a notice and does not open an email.
- **Placeholders:** items highlighted in light blue brackets in the page are sample copy to replace. Search `class="ph"` in `index.html` to find them all:
  - counties served
  - Tyler Elrod's background and photo
  - Season program price
  - phone number
  - response time
  - the free intro call label
- **Photo:** replace the `.photo` placeholder block in the About section with an `<img>` of Tyler.
- **Level descriptions:** the FBS, FCS, Division II, Division III, NAIA and junior college copy is general. Confirm it against current rules from each governing body.
- **Rules check:** confirm NCAA and Virginia High School League rules on third-party recruiting services, and how contracts and payment work with minors, before taking paying clients.
- **Footer disclaimer:** review the wording with whoever advises the business.

## Editing

- Colors and fonts are CSS variables at the top of `styles.css`. Light and dark values are defined separately.
- The college-level explorer content lives in the `levels` array in `script.js`.
- The `mailto` form uses the visitor's own email app, so there is no server and no stored data.
