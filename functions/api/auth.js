export async function onRequest(context) {
  const { env, request } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  
  if (!client_id) {
    return new Response("GITHUB_CLIENT_ID environment variable is missing", { status: 500 });
  }

  const url = new URL(request.url);
  // Using the same origin for the callback URL
  const redirect_uri = `${url.origin}/api/callback`;
  
  // Create a random state string for security
  const state = crypto.randomUUID();

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", client_id);
  authUrl.searchParams.set("scope", "repo,user");
  authUrl.searchParams.set("redirect_uri", redirect_uri);
  authUrl.searchParams.set("state", state);

  return Response.redirect(authUrl.toString(), 302);
}
