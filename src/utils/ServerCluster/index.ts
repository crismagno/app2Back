import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { Log } from "../../helpers/Log";
import http from "http";
import { EModules, LogColorsStatus } from "../../helpers/Log/types";

export class ServerCluster {
  private _numCPUs: number = cpus().length;

  constructor(private _server: http.Server, private _port: number) {}

  public start(): void {
    if (cluster.isPrimary && false) {
      Log.show(`Primary ${process.pid} is running`, EModules.SERVER);

      for (let i = 0; i < this._numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        Log.show(`worker ${worker.process.pid} died`, EModules.SERVER);
      });
    } else {
      this._server.listen(this._port, () => {
        Log.show(
          `Listening on port ${this._port}, http://localhost:${this._port}`,
          EModules.SERVER,
          LogColorsStatus.SUCCESS
        );
      });

      Log.show(`Worker ${process.pid} started`, EModules.SERVER);
    }
  }
}
