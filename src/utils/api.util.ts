export function getSectionDataEndpoint() {
  if (
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("vercel.app")
  ) {
    return "https://6851547a8612b47a2c099812.mockapi.io/api/v1";
  }
  return "http://localhost:3001";
}
