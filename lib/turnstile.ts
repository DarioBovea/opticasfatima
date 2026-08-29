// Verifica un token de Cloudflare Turnstile contra la API de Cloudflare.
// Si no configuraste TURNSTILE_SECRET_KEY, se salta la verificación (para
// que el sitio siga funcionando en desarrollo local sin captcha). En
// producción, configura la variable para que sí se exija.
export async function verificarTurnstile(token: string, ip?: string | null) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // Sin la clave configurada, no podemos verificar — dejamos pasar,
    // pero esto significa que el captcha no está protegiendo nada todavía.
    return true;
  }

  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", secretKey);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return data.success === true;
}
