const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://jsonplaceholder.typicode.com";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  { body, headers, ...options }: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed`, response.status);
  }

  // JSONPlaceholder returns 200 with an empty body for DELETE.
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
