const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function query(url: string) {
  const baseUrl = STRAPI_HOST || 'http://localhost:1337';
  const headers: HeadersInit = STRAPI_TOKEN
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : {};

  try {
    const res = await fetch(`${baseUrl}/api/${url}`, { headers });

    if (!res.ok) {
      console.warn(`⚠️ Strapi returned ${res.status} for ${url}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(
      `❌ Error fetching from Strapi (${baseUrl}/api/${url}):`,
      error,
    );
    // Devuelve fallback para que Next no rompa la build
    return {
      data: {},
      error: 'Strapi not reachable',
    };
  }
}
