import { Response } from "express";

export const responseMock: Partial<Response> = {
  json: jest.fn().mockImplementation(() => {}),
  status: jest.fn().mockImplementation(() => ({ json: () => {} })),
  send: jest.fn().mockImplementation(() => {}),
  sendStatus: jest.fn().mockImplementation(() => {}),
};
