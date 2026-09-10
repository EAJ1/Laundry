# Clean & Fresh Laundry

A responsive, static laundry service website built with HTML, CSS, JavaScript, and SVG. No build step or runtime dependencies are required. Google Fonts supplies Manrope and DM Sans when an internet connection is available; otherwise the browser uses a sans-serif fallback.

## Features

- Wash & fold, dry cleaning, and pickup & delivery service information
- Pickup enquiry form with labelled fields and browser validation
- Email draft preparation with service, suburb, preferred date, and laundry details
- Light and dark themes, following system preference and saving manual choices when storage is available
- Keyboard-accessible mobile navigation, Escape to close, visible focus indicators, and a skip link
- Responsive layouts and reduced-motion support
- Custom CSS laundry illustration, a matching SVG favicon, and an ivory, sage, and forest-green identity
- Service links that preselect the enquiry form, plus a practical FAQ section

## Run locally

Open `index.html` in a modern browser, or serve the directory:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop the server with Ctrl+C.

## Deploy with GitHub Pages

Repository: [EAJ1/Laundry](https://github.com/EAJ1/Laundry)

In repository **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, and save. GitHub Pages publishes the static files directly; `.nojekyll` disables Jekyll processing.

Expected website address: https://eaj1.github.io/Laundry/

To publish later changes, commit them and push to `main`. Check the repository's **Actions** tab for the Pages deployment result. See [GitHub's publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Contact flow

The form does **not** send messages to a server or confirm bookings. “Prepare Email Enquiry” creates an “Open email draft” link. The visitor opens that link, reviews the draft in their email application, and sends it themselves. Their entries remain on the page. If no email application is configured, they can use the displayed email address or phone number directly.

Form details are used locally to construct a `mailto:` link; this site does not store them. Theme preference is saved in browser local storage when available. Direct email and phone links remain usable without JavaScript.

## Before publishing

- Verify or replace the supplied email (`hello@cleanandfresh.com`) and phone (`+27 77 383 2782`) in `index.html`, and the email recipient in `script.js`. These inherited details have not been verified.
- Confirm the business location and collection suburbs, opening hours, pickup slots, and turnaround times.
- Supply actual prices in rand, weight units where applicable, minimum order amounts, and delivery fees. The page currently invites a quote instead of displaying unverified rates.
- Confirm service descriptions and any business promises before adding them.
- For direct website submissions, configure a real form endpoint and show success only after it confirms receipt. No email service is configured here.
- Check desktop and mobile layouts, both themes, keyboard navigation, reduced motion, and the email draft in your target browsers. No specific minimum browser versions are certified.

## Project structure

```text
index.html   Page content and enquiry form
style.css    Layout, themes, responsive styles, and animations
script.js    Navigation, theme preference, and email drafts
favicon.svg  Brand icon for browser tabs
TODO.md      Completed improvements and remaining launch checks
LICENSE      MIT license
README.md    Setup and operational notes
```

## Customization

Update business copy and links in `index.html`, colours and layout in `style.css`, and the email draft recipient in `script.js`. The light palette uses ivory `#f6f5ef`, forest green `#214f43`, and sage `#e2e9d9`. Theme colours are CSS custom properties at the top of `style.css`. The hero illustration is built in CSS and requires no image downloads.

## License

Available under the [MIT License](LICENSE).
