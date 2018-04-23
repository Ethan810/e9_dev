function camelCase(name) {
  return name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (m, n) => {
      return n.toUpperCase();
    });
}

const req = require.context('.', true, /^\.\/[^_][\w-]+\/(style\/)?index\.js?$/);
req.keys().forEach(mod => {
  const v = req(mod);
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.js?$/);
  if (match && match[1]) {
    try {
      const name = camelCase(match[1]);
      exports[name] = v.default || v;
    } catch (e) {
      console.log(e);
    }
  }
});
