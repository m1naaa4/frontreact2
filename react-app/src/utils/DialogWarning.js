import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

function DialogWarning({title,ContentText,open,HandleConfirmation,HandleClose}) {
  const { t } = useTranslation();
  
  return (
    <Dialog
      open={open}
      onClose={HandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      
      >
          <DialogTitle id="alert-dialog-title" style={{fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '20px', color: '#00b601'}}>
            {title}
          </DialogTitle>
          <DialogContent style={{borderRadius: '15px'}}>
            <DialogContentText id="alert-dialog-description">
                {ContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={HandleClose} style={{backgroundColor: 'red', borderRadius: '40px', color: 'white', fontSize: '10px', fontWeight: 600}}>{t('no')}</Button>
            <Button onClick={HandleConfirmation} style={{backgroundColor: '#00b601', borderRadius: '40px', color: 'white', fontSize: '10px', fontWeight: 600}} autoFocus>
                {t('yes')}
            </Button>
          </DialogActions>
    </Dialog>
  )
}

export default DialogWarning