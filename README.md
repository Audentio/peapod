# Peapod #
*Framework for future projects.*

### Getting your hands dirty ###

*Requires nodejs installed*

Homebrew users can `brew install node`

*****

**Fork the repo, then Clone your fork and navigate to peapod**
```
git clone git@github.com:{YourAccount}/peapod.git peapod
cd peapod
```

**Install dependencies**
```
npm install
```

*****

**Build DLLs (common dependencies) and Imports**
```
npm run compile
```

**Build & watch examples**
```
npm run examples-dev
```
Then visit [http://localhost:3002](http://localhost:3002).

**Build & watch documentation**
```
npm run doc
```
Then visit [http://localhost:3001](http://localhost:3001).

**Build & watch for external use**
```
npm run dev
```
