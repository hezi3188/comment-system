import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  container: { marginTop: theme.spacing(4) },
  list: { display: 'grid', gap: theme.spacing(2), marginTop: theme.spacing(2) },
}));
