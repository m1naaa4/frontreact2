// In Vite dev, prepend the service prefix so the proxy can route the request
// (e.g. '/comment' + '/create' → '/comment/create' → proxy strips '/comment' → https://comment.dadupa.com/create).
// In production builds, return the full absolute URL for direct requests.
const DEV = import.meta.env.DEV;

export const svcUrl = (prefix, baseEnv, path) => {
  const p = path.startsWith('/') ? path : '/' + path;
  if (DEV) {
    return prefix ? '/' + prefix + p : p;
  }
  return baseEnv + p;
};
