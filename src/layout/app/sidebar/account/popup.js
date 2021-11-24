import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import Disconnect from './Disconnect';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
// import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';

import Mytheme from './theme';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    background: 'rgba(255, 255, 255, 0.16)',
    position: 'absolute',
    width: '51.875rem',
    height: '24.375rem',
    backdropFilter: 'blur(34px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
  },
  dialogTitle: {
    marginTop: '3px',
  },
  outer: {
    backdropFilter: 'blur(34px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
  },
  close: {
    border: '0px',
    marginRight: '10px',
    marginTop: '5px',
    cursor: 'pointer',
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={Mytheme}>
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ container: classes.outer, paper: classes.dialogWrapper }}
        style={(Mytheme.light.dialogWrapper, Mytheme.light.outer)}>
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: 'flex' }}>
            <Typography
              className={classes.title}
              variant="popupTitle"
              component="div"
              style={{ flexGrow: 1, fontFamily: 'Saira, sans-serif' }}>
              {title}
            </Typography>
            <button
              className={classes.close}
              style={Mytheme.light.close}
              classes={{ container: classes.outer, paper: classes.close }}
              onClick={() => {
                setOpenPopup(false);
              }}>
              <CloseIcon />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
