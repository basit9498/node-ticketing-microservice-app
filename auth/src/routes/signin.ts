import express from "express";

const router = express.Router();

router.post("/api/users/sigin", (req, res) => {
  res.send("hi there auth");
});
export { router as signinUserRouter };
