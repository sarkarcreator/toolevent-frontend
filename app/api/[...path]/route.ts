export const runtime = 'nodejs';

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const backendUrl = (process.env.BACKEND_API_URL || 'https://api.toolbox.events').replace(/\/$/, '');
  const targetUrl = `${backendUrl}/api/${path.join('/')}${new URL(request.url).search}`;
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');
  const body = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer();
  try {
    const upstream = await fetch(targetUrl, { method: request.method, headers, body, redirect: 'manual', cache: 'no-store' });
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete('content-encoding');
    responseHeaders.delete('content-length');
    responseHeaders.delete('transfer-encoding');
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
  } catch (error) {
    console.error('API proxy error:', error);
    return Response.json({ success: false, error: { code: 'API_PROXY_ERROR', message: 'Unable to reach the Toolbox.Events API.' } }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
export const HEAD = proxy;
