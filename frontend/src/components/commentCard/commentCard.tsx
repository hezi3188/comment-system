import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useStyles } from './commentCardStyles';
import strings from '../../strings';

interface PendingComment {
  id: number;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function CommentCard({
  comment,
  onApprove,
  onDelete,
}: {
  comment: PendingComment;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { classes } = useStyles();
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography className={classes.meta} variant="caption">
            {strings.pending.article}: <b>{comment.article_id}</b> •{' '}
            {strings.pending.created}:{' '}
            {new Date(comment.created_at).toLocaleString('he-IL')}
          </Typography>
          <Typography variant="subtitle1">
            <b>{comment.author_name}</b>
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {comment.content}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onApprove(comment.id)}
        >
          {strings.pending.approve}
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => onDelete(comment.id)}
        >
          {strings.pending.delete}
        </Button>
      </CardActions>
    </Card>
  );
}
