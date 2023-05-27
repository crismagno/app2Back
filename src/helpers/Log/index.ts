import colors from "colors";
import { ELogColors, EModules, LogColorsStatus } from "./types";

colors.setTheme(ELogColors);

export class Log {
  /**
   * ALERT: message string of variable finalMessage must keep on start line
   * @param text - Message
   * @param module - What module system
   * @param logColor - type color to log show
   */
  public static show(
    text: String,
    module: EModules,
    logColor: LogColorsStatus = LogColorsStatus.NONE
  ): void {
    const finalMessage = `
      -------------------------------------------------------
      Module: ${module}
      Message: ${text}
      -------------------------------------------------
    `.trim();
    console.log(colors[ELogColors[logColor]](finalMessage));
  }

  public static error({
    error, module, text
  }:{
    error: any,
    text: String,
    module: EModules,
  }): void {
    const finalMessage = `
      -------------------------------------------------------
      Module: ${module}
      Message: ${text}
      -------------------------------------------------
    `.trim();
    console.log(colors[ELogColors[LogColorsStatus.ERROR]](finalMessage));
  }
}
