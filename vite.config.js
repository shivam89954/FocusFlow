import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

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
  plugins: [
    stripTsTypesPlugin,
    nitro({ preset: "vercel" })
  ],
  cloudflare: false,
  tanstackStart: {
    router: {
      disableTypes: true,
      generatedRouteTree: "routeTree.gen.js",
    }
  },
});
