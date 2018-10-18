# Simple Budgeting

To install the required linters we use, add the following configuration to your `.vscode/settings.json` file:

```json
{
  "files.associations": {
    "*.js": "javascriptreact"
  },
  // other settings
  // formatting using eslint
  // let editor format using prettier for all other files
  "editor.formatOnSave": true,
  // disable editor formatting, so eslint can handle it
  "[javascript]": {
    "editor.formatOnSave": false
  },
  // available through eslint plugin in vscode
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true
}
```

To run locally do `npm install` and then `npm start`

Testing is not set up... yet
