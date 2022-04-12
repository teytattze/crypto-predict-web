import { Data } from 'plotly.js';

export interface ICyptoCurrencyData {
  [key: string]: {
    price: Data[];
    sentiment: Data[];
  };
}
