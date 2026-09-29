export interface HealthResponse {
  status: "ok";
  service: string;
  message: string;
}

export async function checkApiHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(
      `La API respondió con un error HTTP ${response.status}.`,
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("status" in data) ||
    data.status !== "ok" ||
    !("service" in data) ||
    typeof data.service !== "string" ||
    !("message" in data) ||
    typeof data.message !== "string"
  ) {
    throw new Error("La API devolvió una respuesta inesperada.");
  }

  return {
    status: data.status,
    service: data.service,
    message: data.message,
  };
}