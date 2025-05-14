const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/";

export default async function fetchApi(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  // Ensure the URL is absolute
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `${API_URL}${url}`;
  }
  if (url.startsWith("/")) {
    url = url.substring(1);
  }
  // Ensure the URL is well-formed
  try {
    new URL(url);
  } catch (error) {
    console.error("Invalid URL:", url);
    throw new Error("Invalid URL");
  }

  // Set default headers
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    (
      options.headers as Record<string, string>
    ).Authorization = `Bearer ${token}`;
  }

  // Set default method
  options.method = options.method || "GET";

  return await (await fetch(url, options)).json();
}
