import express, { Router } from "express";
import catsRouter from "./cats/cat.route";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  private setMiddleware() {
    this.app.use(express.json());
    // logging middleware
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log("request from : " + req.rawHeaders[1]);
      next();
    });

    // routing
    this.setRoute();

    // 404 middleware
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log("404");
      res.status(404).send("not found");
    });
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(3000, () => {
      console.log("server port 3000 started");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
