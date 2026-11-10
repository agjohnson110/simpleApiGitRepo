## Testing
1. Run a local server in root directory: `python -m http.server 8000` in VS Code terminal
2. Open `http://localhost:8000` in your browser
3. For mobile: Access the IP of your machine on port 8000
4. Use ctrl-shift-R for windows hard refresh

## Setup
1. Google Sheet
    Extensions > Apps Script
        Replace everything with backend code. (This is fairly secure.)
        Project Settings > Script Properties
            Create SECRET=my-secret-key (Can keep source code elsewhere without secret)
        Deploy > New Deployment > Web App
            Execute as Me, Access Anyone
            Save URL for frontend (script.google.com/macros/s/xxxxx/exec)
2. Github
    Create index.html and other code
    Start Github pages from master branch (in settings)
        Configure to use external URL??