# Weglot Test Solution Engineer
A test that proxy [dow.com](dow.com) website to provide a partial translation for french content.

## Prerequisite
Bun ([bun.sh](bun.sh)) (version used for development: 1.0.30)

## Commands
Run development server :
```bash
bun run dev
```
Run for production :
```bash
bun run ./src/index.js
```
Run tests :
```bash
bun test
```

## How to know it works
 - You can navigate inside english content
 - Once you access french content (by replacing `/en-us` with `/fr-fr` in url), you can keep jump from page to page while keeping translation content
 - An element translated on every page is the "Contact us" at the top right corner
 
## Limitatins
 - It is assumed that reference content is on english ressources

## What might be improved
- For translation service tests, mocking dictionary would be necessary
- Turning a string into HTML content must be done in a proper way
