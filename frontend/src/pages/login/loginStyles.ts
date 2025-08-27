import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: { display: 'grid', placeItems: 'center', minHeight: '100vh' },
  paper: { padding: theme.spacing(4), width: 380 },
  form: { display: 'grid', gap: theme.spacing(2), marginTop: theme.spacing(2) },
}));
