/* =========================================================
   GRUPEN · Auto-subida al repositorio
   Vigila la carpeta y sube TODOS los cambios al repo solo.
   Uso:  node autopush.js   (o doble clic en auto-subir.bat)
   ========================================================= */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DEBOUNCE = 4000;                 // espera 4s de "calma" tras el último cambio
const IGNORE = ['.git', 'node_modules', '.vscode', '.idea', '_shots', '.playwright-mcp'];

let timer = null, busy = false, pending = false;

const log = (m) => console.log('[' + new Date().toLocaleTimeString('es-CO') + '] ' + m);
const run = (cmd) => new Promise((res) => exec(cmd, { cwd: ROOT }, (err, stdout, stderr) => res({ err, stdout, stderr })));

async function push() {
  if (busy) { pending = true; return; }
  busy = true;
  const status = await run('git status --porcelain');
  if (!status.stdout.trim()) { busy = false; return; }   // nada que subir

  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  await run('git add -A');
  const msg = 'auto: cambios ' + stamp;
  const c = await run('git commit -m "' + msg + '"');
  if (c.err && !/nothing to commit/i.test(c.stdout + c.stderr)) {
    log('⚠ commit: ' + (c.stderr || c.stdout).trim().split('\n')[0]);
  }
  const p = await run('git push origin HEAD');
  if (p.err) log('⚠ push falló (¿sin internet o credenciales?): ' + (p.stderr || p.stdout).trim().split('\n').pop());
  else log('✓ subido a GitHub: ' + msg);

  busy = false;
  if (pending) { pending = false; schedule(); }
}

const schedule = () => { clearTimeout(timer); timer = setTimeout(push, DEBOUNCE); };
const shouldIgnore = (p) => IGNORE.some((ig) => p.split(path.sep).includes(ig));

log('👀 Vigilando: ' + ROOT);
log('   Cada cambio se sube solo al repositorio tras ' + (DEBOUNCE / 1000) + 's de calma.');
log('   (Deja esta ventana abierta. Para detener: cierra la ventana o Ctrl+C)');

try {
  fs.watch(ROOT, { recursive: true }, (event, filename) => {
    if (!filename || shouldIgnore(filename)) return;
    schedule();
  });
} catch (e) {
  log('No se pudo iniciar el vigilante: ' + e.message);
  process.exit(1);
}

schedule();   // primer chequeo por si quedó algo pendiente al iniciar
