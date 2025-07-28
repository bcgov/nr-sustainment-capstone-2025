import {jest} from '@jest/globals';

export default class Typography {
    constructor(options: any) {
      return {
        injectStyles: jest.fn(),        
        toString: jest.fn(() => ''),
      };
    }
  }
