import { useState } from 'react';
import { login } from '../../api';
import strings from '../../strings';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStyles } from './loginStyles';
import Logo from '../../components/logo/logo';

type Form = { username: string; password: string };

export default function Login() {
  const nav = useNavigate();
  const { classes } = useStyles();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>();

  const onSubmit = handleSubmit(async (data) => {
    setServerError('');
    try {
      const { token } = await login(data.username, data.password);
      localStorage.setItem('token', token);
      nav('/pending');
    } catch (e: any) {
      setServerError(e.message || strings.login.error);
    }
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar>
              <LockIcon />
            </Avatar>
            <Logo />
          </Stack>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              label={strings.login.username}
              fullWidth
              {...register('username', {
                required: strings.validation.required,
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              type="password"
              label={strings.login.password}
              fullWidth
              {...register('password', {
                required: strings.validation.required,
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {serverError && (
              <Typography color="error">{serverError}</Typography>
            )}
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              fullWidth
            >
              {isSubmitting ? strings.login.loggingIn : strings.login.submit}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
