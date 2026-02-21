// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| EXAMPLE1 ||============================== //

const articles = [
  { title: "The Story Behind Haystack's Investment in Blockit", subtitle: 'Feb 12, 2026', url: '#' },
  { title: 'Why Calendar Networks Are the Next Big Infra', subtitle: 'Feb 10, 2026', url: '#' },
  { title: 'Seed to Series A: Lessons from Blockit', subtitle: 'Feb 8, 2026', url: '#' },
  { title: 'Introducing the Blockit Calendar Network', subtitle: 'Feb 5, 2026', url: '#' }
];

export default function Example1Page() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 5 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title="Articles">
            <List disablePadding sx={{ py: 0 }}>
              {articles.map((article, index) => (
                <ListItemButton
                  key={index}
                  component={Link}
                  href={article.url}
                  underline="none"
                  color="inherit"
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': { bgcolor: 'primary.lighter' },
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      borderRight: '2px solid',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {article.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                        {article.subtitle}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </MainCard>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Stack sx={{ gap: 3 }}>
          <MainCard title="February 12, 2026">
            <Stack sx={{ gap: 1.5 }}>
              <Typography variant="h2" component={Link} href="#" color="inherit" underline="hover">
                The Story Behind Haystack's Investment in Blockit
              </Typography>
              <Typography variant="h5">Blockit launches with $5M seed financing, building the world's first calendar network.</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  sx={{ backgroundColor: '#ffcdd2', color: '#c62828', '&:hover': { backgroundColor: '#ef9a9a' } }}
                >
                  Dismiss
                </Button>
              </Box>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  );
}
