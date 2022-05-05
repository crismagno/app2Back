import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { Log } from "../../helpers/Log";
import http from "http";
import { EModules, LogColorsStatus } from "../../helpers/Log/types";

export class ServerCluster {
  private numCPUs: number = cpus().length;

  constructor(private server: http.Server, private port: number) {}

  public start(): void {
    if (cluster.isPrimary) {
      Log.show(`Primary ${process.pid} is running`, EModules.SERVER);

      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        Log.show(`worker ${worker.process.pid} died`, EModules.SERVER);
      });
    } else {
      this.server.listen(this.port, () => {
        Log.show(
          `Listening on port ${this.port}, http://localhost:${this.port}`,
          EModules.SERVER,
          LogColorsStatus.SUCCESS
        );
      });

      Log.show(`Worker ${process.pid} started`, EModules.SERVER);
    }
  }
}
