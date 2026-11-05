// Genera src/enviroment/enviroment.ts y src/index.html a partir de variables de entorno.
// En local lee el archivo .env; en Vercel (u otro CI) usa las variables del panel.
// Uso: node scripts/set-env.mjs [--prod]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = resolve(root, '.env');

if (existsSync(envFile)) {
  // Las variables ya definidas en el sistema (Vercel) tienen prioridad sobre .env
  process.loadEnvFile(envFile);
}

const production = process.argv.includes('--prod') || process.env.VERCEL === '1';
const env = process.env;

const values = {
  googleClientId: env.GOOGLE_CLIENT_ID ?? '',
  googleMapsApiKey: env.GOOGLE_MAPS_API_KEY ?? '',
  googleIaApiKey: env.GOOGLE_IA_API_KEY ?? '',
  apiUrl: env.API_URL || '/api',
  apiV1: env.API_V1_URL || '/api/v1',
};

const required = {
  GOOGLE_CLIENT_ID: values.googleClientId,
  GOOGLE_MAPS_API_KEY: values.googleMapsApiKey,
  GOOGLE_IA_API_KEY: values.googleIaApiKey,
};
const missing = Object.keys(required).filter((name) => !required[name]);
if (missing.length) {
  console.warn(`[set-env] Variables sin definir: ${missing.join(', ')} (revisa .env o el panel de Vercel)`);
}

const q = (value) => JSON.stringify(value);

const environmentTs = `// ARCHIVO GENERADO por scripts/set-env.mjs. No editar ni subir a git.
export const environment = {
  production: ${production},
  googleClientId: ${q(values.googleClientId)},
  apiUrl: ${q(values.apiUrl)},
  apiV1: ${q(values.apiV1)},
  GOOGLE_IA_API_KEY: ${q(values.googleIaApiKey)}
};
`;
writeFileSync(resolve(root, 'src/enviroment/enviroment.ts'), environmentTs);

const template = readFileSync(resolve(root, 'src/index.template.html'), 'utf8');
writeFileSync(
  resolve(root, 'src/index.html'),
  template.replaceAll('__GOOGLE_MAPS_API_KEY__', values.googleMapsApiKey),
);

console.log(`[set-env] Archivos generados (production=${production}).`);
