import { Request, Response } from "express";

const root = (_: Request, res: Response) => {
  res.send("This is the root of Antirubbersheeter Backend");
};

export default root;
