import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { currencies } from '../app';

interface INavbarProps {
  currency: string;
  handleSelectCurrency: (value: string) => void;
}

export function Navbar({ currency, handleSelectCurrency }: INavbarProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleMenuClick = (value: string) => {
    handleSelectCurrency(value);
    setAnchor(null);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          background: '#fafafa',
          border: 1,
          borderColor: 'grey.200',
          borderRadius: 2,
          py: 2,
          px: {
            xs: 2,
            sm: 3,
            lg: 4,
          },
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
            }}
          >
            CryptoPredict
          </Typography>
          <Stack alignItems="center" direction="row">
            <Typography
              variant="caption"
              sx={{
                color: 'grey.700',
                fontWeight: 700,
                mr: 0.5,
                mb: -0.2,
              }}
            >
              {currency.toUpperCase()}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              {!!anchor ? <CloseRoundedIcon /> : <NotesRoundedIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            background: '#fafafa',
            border: 1,
            borderColor: 'grey.200',
            borderRadius: 2,
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        }}
      >
        {currencies.map((currency) => (
          <MenuItem
            key={currency.id}
            onClick={() => handleMenuClick(currency.id)}
          >
            {currency.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
