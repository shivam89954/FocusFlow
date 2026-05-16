import handler from "@tanstack/react-start/server-entry";

export const config = {
  runtime: "edge",
};

export default async function (request) {
  // TanStack Start's default server entry handles the Request -> Response conversion
  // for Edge runtimes like Vercel Edge Functions.
  const h = await (handler.default ?? handler);
  return h.fetch(request);
}
