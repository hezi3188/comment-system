import { Typography } from '@mui/material';
import { useStyles } from './logoStyles';
import he from '../../strings';

export default function Logo() {
  const { classes } = useStyles();
  return (
    <Typography className={classes.root} variant="h5">
      {he.appTitle}
    </Typography>
  );
}
