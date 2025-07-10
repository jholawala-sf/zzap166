// Note this file only loads the style-editor module from ./editors
// because page designer does not support modules for editors and
// leads to a cleaner vite build

const currentScript = document.currentScript.src;
const script = document.createElement('script');
script.type = 'module';
const path = currentScript.split('/').slice(0, -1).join('/') + '/editors/agent-editor.js';
script.src = path;
document.head.appendChild(script);
