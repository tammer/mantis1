// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| EXAMPLE1 ||============================== //

export default function Example1Page() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title="February 12, 2026">
            <Stack sx={{ gap: 1.5 }}>
              <Typography variant="h2">The Story Behind Haystack's Investment in Blockit</Typography>
              <Typography variant="h5">Blockit launches with $5M seed financing, building the world's first calendar network.</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title="Card 2">
            <Typography variant="body1">
              Placeholder text for column two. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  );
}
