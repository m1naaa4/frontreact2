import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';

function DialogWarning({title,ContentText,open,HandleConfirmation,HandleClose}) {
  return (
    <Dialog
                    open={open}
                    onClose={HandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {title}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {ContentText}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={HandleClose}>NO</Button>
                        <Button onClick={HandleConfirmation} autoFocus>
                            YES
                        </Button>
                        </DialogActions>
    </Dialog>
  )
}

export default DialogWarning