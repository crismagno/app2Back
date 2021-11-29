import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { Log } from "../../helpers/Log";
import http from "http";

export class ServerCluster {
  private numCPUs: number = cpus().length;

  constructor(private server: http.Server, private port: number) {}

  public start(): void {
    if (cluster.isPrimary) {
      Log.show(`Primary ${process.pid} is running`, "SERVER");

      // Fork workers.
      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        Log.show(`worker ${worker.process.pid} died`, "SERVER");
      });
    } else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server
      this.server.listen(this.port, () => {
        Log.show(
          `Listening on port ${this.port}, http://localhost:${this.port}`,
          "SERVER",
          "info"
        );
      });

      Log.show(`Worker ${process.pid} started`, "SERVER");
    }
  }
}
