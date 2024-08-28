import { Router } from "express";
import path from "path";

import exampleRouter from "./example.route";
import { errorHandler } from "../middlewares/error.middleware";
import oauth2Middleware from "../middlewares/oauth2.middleware";

const router = Router();

router.use("/example", exampleRouter);

router.get("/oauth", (req, res) => {
  const filePath = path.join(__dirname, "../../public/oauth.html");
  res.sendFile(filePath);
});

router.post("/oauth/authorize", oauth2Middleware.authorizeHandler);
router.post("/oauth/token", oauth2Middleware.tokenHandler);
router.get("/test", oauth2Middleware.authenticateHandler, (req, res) => {
  res.send("ok");
});

router.use(errorHandler);

export default router;
