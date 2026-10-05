# Laods portfolio

Portfolio for La Ode Muhammad Nur Abdulrahman (Arman).

## Local preview

You can now double-click `public/index.html`: relative asset paths allow CSS and JavaScript to load locally. For a normal local server, run from this folder:

```sh
npx serve public
```

Open the localhost URL printed by the command.

## Interaction update

- Smooth 320 ms accordion opening and closing, including rapid-click reversal.
- Native summary keyboard support and a no-JavaScript fallback.
- Reduced-motion preference disables accordion animation.
- Sticky header with a subtle blurred background on scroll and active section links.
- Stable header height and anchor offset keep section headings visible.
- Natural accordion height restored after animation and viewport changes.

## Preview before deploying

```sh
firebase emulators:start --only hosting --project YOUR_PROJECT_ID
```

Open the local URL printed by the command.

## Edit

- `public/index.html`: content, full name, links and metadata.
- `public/style.css`: layout, colours, responsive styles and typography.
- `public/app.js`: accordion animation, sticky-header state, active navigation, Jakarta clock and copyright year.
- `firebase.json`: Hosting configuration.
