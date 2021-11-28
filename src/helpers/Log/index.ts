import colors from "colors";
import { ELogColors, EModules, TLogColors, TModules } from "./types";

colors.setTheme({
  info: "blue",
  help: "cyan",
  warn: "yellow",
  success: "green",
  error: "red",
});

export class Log {
  /**
   * OBS: message string of variable finalMessage must keep on start line
   * @param text - Message
   * @param module - What module system
   * @param logColor - type color to log show
   */
  static show(text: String, module: TModules, logColor?: TLogColors): void {
    const finalMessage = `
-------------------------------------------------------
Module: ${EModules[module]} 
Message: ${text}
-------------------------------------------------------
`;
    console.log(colors[ELogColors[logColor || "none"]](finalMessage));
  }
}
