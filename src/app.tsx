import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Navbar } from './components/navbar';
import { Plot } from './components/plot';
import { getSyntheticChartData } from './lib/chart';
import { ws } from './lib/websocket';
import { ICyptoCurrencyData } from './shared/interfaces';

export function App() {
  const [currency, setCurrency] = useState<string>(currencies[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICyptoCurrencyData | null>(null);

  ws.onopen = () => setIsLoading(false);
  ws.onmessage = (ev) => setData(JSON.parse(ev.data));

  useEffect(() => {
    if (isLoading) return;
    handleTweetsSentiment();
  }, [currency, isLoading]);

  const handleSelectCurrency = (value: string) => {
    setCurrency(value);
  };

  const handleTweetsSentiment = () => {
    const input = { action: 'sendCurrencyData' };
    ws.send(JSON.stringify(input));
  };

  if (isLoading)
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={4}
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Typography variant="h5">Loading...</Typography>
        <CircularProgress color="primary" />
      </Stack>
    );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, lg: 4 },
      }}
    >
      <Navbar currency={currency} handleSelectCurrency={handleSelectCurrency} />
      <Box
        component="main"
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Plot
              title="Price Prediction"
              data={!!data ? data[currency].price : []}
              layout={{
                showlegend: false,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Plot
              title="Sentiment Analysis"
              data={!!data ? data[currency].sentiment : []}
              layout={{
                showlegend: false,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Plot
              title="Synthetic Data"
              data={getSyntheticChartData()}
              layout={{ showlegend: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export interface ICurrency {
  id: string;
  name: string;
}

export const currencies: ICurrency[] = [
  {
    id: 'BTC',
    name: 'Bitcoin',
  },
  {
    id: 'ETH',
    name: 'Ethereum',
  },
  {
    id: 'SOL',
    name: 'Solana',
  },
  {
    id: 'LUNA',
    name: 'Terra',
  },
  {
    id: 'BNB',
    name: 'Binance Coin',
  },
];

export const currencyIdToName = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  SOL: 'Solana',
  LUNA: 'Terra',
  BNB: 'Binance Coin',
};
