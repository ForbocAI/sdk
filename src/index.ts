/**
 * ForbocAI SDK
 * The Infrastructure Layer for Autonomous AI Characters
 */

// Core Exports
export * from './core';

export const init = () => {
  const reset = "\x1b[0m";
  const cyan = "\x1b[36m";
  const blue = "\x1b[34m";
  const dim = "\x1b[2m";
  const bold = "\x1b[1m";

  // Runic "F O R B O C"
  const runes = "ᚠ ᛫ ᛟ ᛫ ᚱ ᛫ ᛒ ᛫ ᛟ ᛫ ᚲ";

  const border = `${dim}----------------------------------------${reset}`;

  console.error(`
${border}
  ${cyan}${bold}FORBOC AI SDK${reset} ${dim}v0.0.1${reset}
  ${blue}${runes}${reset}
${border}
${dim}> Initializing Cortex...${reset}
${dim}> Connecting into the Neuro-Symbolic Grid...${reset}
${dim}> Status: ${cyan}ONLINE${reset}

${cyan}Welcome to the Future of NPC Intelligence.${reset}
`);
};
