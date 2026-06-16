# NEXT STEPS

## Before Netlify

- Create a GitHub repository for the website.
- Add the GitHub remote to this local folder.
- Commit and push the staged public site files.
- In Netlify, import the GitHub repository.
- Use no build command.
- Set publish directory to `.`.
- Add the custom domain and enable HTTPS.

## Website Polish

- Compress the largest images in `assets/` so the site loads faster on phones.
- Check every page on mobile, especially image-heavy work pages.
- Add Open Graph preview metadata so links look good when shared.
- Add a favicon and browser tab title polish.
- Decide whether the site should keep the current raw HTML structure or move into a small static-site system later.

## Audio Layer Idea

Add a persistent audio object that follows the visitor through the website without turning the site into a normal clean portfolio.

Possible directions:

- A small fixed MP3 player in the corner with play/pause, track title, and volume.
- A hidden radio/transmission layer that starts only when clicked, then keeps looping quietly.
- Different ambient loops per section: car interior, corrupted menu music, voice memo fragments, machine hum, breath, broken UI sounds.
- A player that looks like a damaged device, not a generic Spotify widget.
- A simple playlist using local `.mp3` files in `assets/audio/`.

Implementation notes:

- Browsers will not autoplay audio reliably, so the visitor needs to press play first.
- Keep files small: export MP3 around 128-192 kbps unless sound quality is central.
- Start with one global player in `index.html`, `styles.css`, and `script.js`.
- If the player should persist across page changes, either keep the site mostly on one page or use a small iframe/audio shell. Plain multi-page HTML reloads audio on each page.

Good first version:

- Add `assets/audio/`.
- Put one short loop or track inside it.
- Add a fixed bottom-left audio control.
- Save the play state and volume in `localStorage`.
- On work pages, show the same player but allow the audio to restart after navigation.

## Content To Decide

- What should the first audio feel like: performance recording, ambient loop, voice, broken pop song, field recording, or UI/device noise?
- Should sound be background atmosphere, an artwork, or a navigation system?
- Should visitors be able to choose tracks, or should the site behave like one haunted broadcast?
