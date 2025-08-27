import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  meta: { color: theme.palette.text.secondary },
  actions: {
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));
