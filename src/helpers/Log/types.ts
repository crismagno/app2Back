export enum EModules {
  APP = "App",
  MIDDLEWARES = "Middlewares",
  SOCKET_SOCIAL = "Socket Social",
  LOG = "Log",
  NONE = "None",
  SERVER = "Server",
}
export type TModules =
  | "APP"
  | "MIDDLEWARES"
  | "SOCKET_SOCIAL"
  | "LOG"
  | "NONE"
  | "SERVER";

export enum ELogColors {
  info = "blue",
  help = "cyan",
  warn = "yellow",
  success = "green",
  error = "red",
  none = "white",
}
export type TLogColors = "success" | "error" | "warn" | "info" | "none";
