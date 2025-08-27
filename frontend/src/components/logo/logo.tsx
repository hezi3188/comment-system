import { Typography } from '@mui/material';
import { useStyles } from './logoStyles';
import strings from '../../strings';

export default function Logo() {
  const { classes } = useStyles();
  return (
    <Typography className={classes.root} variant="h5">
      {strings.appTitle}
    </Typography>
  );
}
