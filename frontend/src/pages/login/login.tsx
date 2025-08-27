import { useState } from 'react';
import { login } from '../../api';
import he from '../../strings';
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
  } = useForm<Form>({
    defaultValues: { username: 'admin', password: '1234' },
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError('');
    try {
      const { token } = await login(data.username, data.password);
      localStorage.setItem('token', token);
      nav('/pending');
    } catch (e: any) {
      setServerError(e.message || he.login.error);
    }
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar>
              {' '}
              <LockIcon />
            </Avatar>
            <Logo />
          </Stack>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              label={he.login.username}
              fullWidth
              {...register('username', { required: he.validation.required })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              type="password"
              label={he.login.password}
              fullWidth
              {...register('password', { required: he.validation.required })}
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
              {isSubmitting ? he.login.loggingIn : he.login.submit}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
