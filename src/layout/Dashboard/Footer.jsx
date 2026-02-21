// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'flex-end', p: '24px 16px 0px', mt: 'auto' }}
    >
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="#" variant="caption" color="text.primary">
          About us
        </Link>
        <Link href="#" variant="caption" color="text.primary">
          Privacy
        </Link>
        <Link href="#" variant="caption" color="text.primary">
          Terms
        </Link>
      </Stack>
    </Stack>
  );
}
