const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "hospitalitytoolkitbe-production.up.railway.app"

function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {}
  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }
  const csrf = getCsrfToken()
  if (csrf && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    headers["x-csrf-token"] = csrf
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null)
    throw new ApiError(
      errorBody?.message || `HTTP ${res.status}: ${res.statusText}`,
      res.status,
      errorBody,
    )
  }
  const json = await res.json()
  if (json != null && typeof json === "object" && "data" in json) {
    return json.data as T
  }
  return json as T
}

export { ApiError }

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
}

export function getCsrfTokenForHeader(): string | null {
  return getCsrfToken()
}
