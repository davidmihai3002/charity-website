export interface AuthMessage {
  type: "success" | "error" | "";
  text: string | null;
}
