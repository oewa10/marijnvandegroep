# Marijn van de Groep — Freelance Kok

Eenpagina-website (Nederlandstalig, geen backend) voor Marijn van de Groep,
freelance kok in Utrecht en omgeving. Gebouwd met [Vite](https://vite.dev) en React.

## Aan de slag

```bash
npm install
npm run dev
```

De dev-server draait standaard op http://localhost:5173.

## Scripts

- `npm run dev` — start de ontwikkelserver met hot reload
- `npm run build` — bouwt de productieversie naar `dist/`
- `npm run preview` — bekijkt de gebouwde `dist/` lokaal

## Structuur

- `index.html` — HTML-shell, `<head>` met Google Fonts en meta-tags
- `src/main.jsx` — React entrypoint
- `src/App.jsx` — de volledige pagina, opgedeeld in secties (Hero, Diensten, Uitrusting, Menu, Contact)
- `src/index.css` — alle styling (ongewijzigd overgenomen uit het originele ontwerp)

## Aanpassen

Contactgegevens, diensten, de uitrustingslijst en het voorbeeldmenu staan als
data-arrays bovenaan de betreffende secties in `src/App.jsx`. Het e-mailadres
staat als constante `EMAIL` bovenaan het bestand.
