import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IArticleDetailModal {
    open: boolean;
    onAgree: () => void;
    onCancel: () => void;
    articleTitle: string;
}

export default function ArticleDeleteModal(props: IArticleDetailModal) {

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Silme Bildirisi!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.articleTitle} meqalesini silmek istediyinize eminsinizmi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Disagree</Button>
          <Button onClick={props.onAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}