import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useStyles } from './commentCardStyles';
import he from '../../strings';

type PendingComment = {
  id: number;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

export default function CommentCard({
  c,
  onApprove,
  onDelete,
}: {
  c: PendingComment;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { classes } = useStyles();
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography className={classes.meta} variant="caption">
            {he.pending.article}: <b>{c.article_id}</b> • {he.pending.created}:{' '}
            {new Date(c.created_at).toLocaleString('he-IL')}
          </Typography>
          <Typography variant="subtitle1">
            <b>{c.author_name}</b>
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {c.content}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onApprove(c.id)}
        >
          {he.pending.approve}
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => onDelete(c.id)}
        >
          {he.pending.delete}
        </Button>
      </CardActions>
    </Card>
  );
}
