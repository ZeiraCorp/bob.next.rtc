import express from 'express';

export class RoutesController {
  
  constructor(options) {
    this.router = express.Router();
    this.options = options;
  }
  
  
}