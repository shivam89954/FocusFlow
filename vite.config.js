import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const stripTsTypesPlugin = {
  name: 'strip-ts-types',
  transform(code, id) {
    if (id.replace(/\\/g, '/').endsWith('routeTree.gen.js')) {
      const cleanCode = code.split('import type')[0];
      return {
        code: cleanCode,
        map: null
      };
    }
  }
};

export default defineConfig({
  plugins: [stripTsTypesPlugin],
  tanstackStart: {
    router: {
      disableTypes: true,
      generatedRouteTree: "routeTree.gen.js",
    },
    server: {
      preset: "vercel",
    },
  },
});
