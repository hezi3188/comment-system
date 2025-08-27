import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './pendingStyles';
import { approveComment, deleteComment, getPending } from '../../api';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import CommentCard from '../../components/commentCard/commentCard';
import strings from '../../strings';

type PendingComment = {
  id: number;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

export default function Pending() {
  const nav = useNavigate();
  const { classes } = useStyles();
  const [items, setItems] = useState<PendingComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      setLoading(true);
      const rows = await getPending(token || '');
      setItems(rows);
    } catch (e: any) {
      setError(e.message || strings.pending.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      nav('/login');
      return;
    }
    fetchData();
  }, [token, nav]);

  async function onApprove(id: number) {
    if (!token) return;
    await approveComment(id, token);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  async function onDelete(id: number) {
    if (!token) return;
    await deleteComment(id, token);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flex: 1 }}>{strings.pending.title}</Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem('token');
              nav('/login');
            }}
          >
            {strings.pending.logout}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {loading && (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && items.length === 0 && (
          <Typography>{strings.pending.none}</Typography>
        )}
        <div className={classes.list}>
          {items.map((c) => (
            <CommentCard
              key={c.id}
              comment={c}
              onApprove={onApprove}
              onDelete={onDelete}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
