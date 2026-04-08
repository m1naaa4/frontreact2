import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Build the Vite proxy config for all backend microservices.
 *
 * In dev, HttpService calls axios with paths like "/project/getallProjects".
 * Each path prefix maps to its own service domain from the .env file.
 * Main-API paths (login, register, user, profile, etc.) must have /api prepended
 * because REACT_APP_API_URL ends in /api (e.g. https://api.dadupa.com/api).
 *
 * IMPORTANT: Many of these path prefixes are also React Router routes (e.g. /project,
 * /login, /register, /funder, /admin). We use the `bypass` callback to detect browser
 * navigation requests (Accept: text/html) and let Vite serve index.html instead of
 * forwarding to the API — this keeps SPA routing intact.
 */
function buildProxy(env) {
  // Parse origin and base path from REACT_APP_API_URL so we don't hardcode the domain.
  const apiUrlEnv = env.REACT_APP_API_URL || 'http://localhost:8000/api';
  const apiUrl    = new URL(apiUrlEnv);
  const apiOrigin = apiUrl.origin;                      // e.g. https://api.dadupa.com
  const apiBase   = apiUrl.pathname.replace(/\/$/, ''); // e.g. /api

  const base = { changeOrigin: true, secure: false };

  // Never proxy requests for static assets — let Vite serve them from public/.
  const staticExt = /\.(gif|png|jpg|jpeg|svg|ico|webp|css|js|woff2?|ttf|eot|map)(\?.*)?$/i;
  const bypassStatic = (req) => {
    if (staticExt.test(req.url)) return req.url;
  };

  // Helper: proxy a path prefix to its own microservice domain.
  // stripPrefix must match the proxy key (e.g. 'comment' for '/comment').
  // The prefix is stripped before forwarding so the backend sees its own paths.
  const svc = (target, stripPrefix) => ({
    ...base,
    target,
    bypass: bypassStatic,
    ...(stripPrefix && { rewrite: (p) => p.replace(new RegExp('^/' + stripPrefix), '') }),
  });

  // Helper: proxy a path prefix to the main API (prepend /api to the path).
  const mainApi = (target, base2) => ({
    ...base,
    target,
    bypass: bypassStatic,
    rewrite: (p) => base2 + p,
  });

  return {
    // ── Microservices ──────────────────────────────────────────────────────
    // Each entry strips its own path prefix before forwarding so the backend
    // sees the same paths as when called directly with a full URL.
    '/project':      svc(env.REACT_APP_PROJCT        || apiOrigin, 'project'),
    '/notification': svc(env.REACT_APP_Notification  || apiOrigin, 'notification'),
    '/comment':      svc(env.REACT_APP_COMMENT        || apiOrigin, 'comment'),
    '/like':         svc(env.REACT_APP_LIKE           || apiOrigin, 'like'),
    '/post':         svc(env.REACT_APP_POST           || apiOrigin, 'post'),
    '/article':      svc(env.REACT_APP_ARTICLE        || apiOrigin, 'article'),
    '/funder':       svc(env.REACT_APP_FUNDER         || apiOrigin, 'funder'),
    '/mentor':       svc(env.REACT_APP_MENTOR         || apiOrigin, 'mentor'),
    '/video':        svc(env.REACT_APP_MEDIA_UPLOAD   || apiOrigin, 'video'),

    // ── Main API (auth-service) — paths need the /api prefix added ─────────
    '/login':        mainApi(apiOrigin, apiBase),
    '/logout':       mainApi(apiOrigin, apiBase),
    '/register':     mainApi(apiOrigin, apiBase),
    '/password':     mainApi(apiOrigin, apiBase),
    '/user':         mainApi(apiOrigin, apiBase),
    '/profile':      mainApi(apiOrigin, apiBase),
    '/cvtheque':     mainApi(apiOrigin, apiBase),
    '/admin':        mainApi(apiOrigin, apiBase),
    '/getusers':     mainApi(apiOrigin, apiBase),
    '/broadcasting': mainApi(apiOrigin, apiBase),

    // ── Legacy /api prefix (kept for any direct axios calls using that prefix)
    '/api': {
      ...base,
      target: apiOrigin,
      rewrite: (p) => apiBase + p.replace(/^\/api/, ''),
    },
  };
}

export default ({ mode }) => {
  // Load all environment variables (including existing REACT_APP_* names)
  const env = loadEnv(mode, process.cwd(), '');

  const processEnv = {
    ...env,
    NODE_ENV: mode,
    PUBLIC_URL: env.PUBLIC_URL ?? '',
  };

  return defineConfig({
    plugins: [
      react(),
      // SPA fallback: rewrite browser navigation requests to "/" BEFORE the proxy
      // runs, so paths like /project/list, /login, /funder etc. are served by Vite
      // (as index.html + React Router) instead of being forwarded to the API.
      {
        name: 'spa-html-fallback',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const accept = req.headers['accept'] || '';
            if (
              accept.includes('text/html') &&
              !req.url.startsWith('/@') &&
              !req.url.startsWith('/src') &&
              !req.url.includes('.')
            ) {
              req.url = '/';
            }
            next();
          });
        },
      },
    ],
    esbuild: {
      // Allow legacy .js files that contain JSX (from CRA) to parse correctly.
      loader: 'jsx',
      include: /src\/.*\.[jt]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      // Force daterangepicker (and its deps) to be pre-bundled together by esbuild
      // so they share the same moment instance and avoid the UMD `this` = undefined issue.
      include: ['daterangepicker', 'moment', 'jquery'],
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.jsx': 'jsx',
        },
      },
    },
    define: {
      'process.env': processEnv,
    },
    build: {
      rollupOptions: {
        // Exclude test-only packages from the production bundle
        external: (id) => id.includes('@testing-library') || id.includes('@sheerun/mutationobserver-shim'),
      },
    },
    resolve: {
      alias: [
        // Force exact imports of react-multiselect-checkboxes (no subpaths) to the safe wrapper.
        // Sub-path imports like /lib/index.js bypass this alias and go straight to node_modules.
        {
          find: /^react-multiselect-checkboxes$/,
          replacement: path.resolve(__dirname, 'src/components/SafeMultiSelect.js'),
        },
      ],
    },
    server: {
      port: 3000,
      proxy: buildProxy(env),
    },
    preview: {
      port: 3000,
    },
  });
};
