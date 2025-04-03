import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      thirdPartyLogin: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

export {};
