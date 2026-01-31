const fs = require('fs');

try {
    // Attempt to write directly to TTY to bypass NPM suppression
    const tty = fs.openSync('/dev/tty', 'w');
    const version = require('./package.json').version;
    const msg = `
----------------------------------------
  FORBOC AI SDK v${version}
  ᚠ ᛫ ᛟ ᛫ ᚱ ᛫ ᛒ ᛫ ᛟ ᛫ ᚲ
----------------------------------------
> Initializing Cortex...
> Connecting into the Neuro-Symbolic Grid...
> Status: ONLINE

Welcome to the Future of NPC Intelligence.
`;
    fs.writeSync(tty, msg);
    fs.closeSync(tty);
} catch (e) {
    // Fallback if no TTY (CI/CD)
    console.error("Running postinstall...");
    require('./dist/index.js').init();
}

