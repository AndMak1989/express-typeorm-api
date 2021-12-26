declare namespace Express {
  export interface Request {
    file: any,
    user: {
      id: string;
    };
  }
}
