import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { v4 as uuidv4 } from 'uuid';

const users: Array<User> = [];

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  const user = users.find((userData) => userData.username === username);
  const httpStatusCode = user ? 200 : 404;
  return res.status(httpStatusCode).send(user);
};

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: uuidv4(),
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    userStatus: 1,
  };

  users.push(user);
  return res.status(201).send(user);
};
