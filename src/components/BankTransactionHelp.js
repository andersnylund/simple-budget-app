import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Danske from '../images/danske.png';
import DanskeGuide from '../images/danskeGuide.png';
import Nordea from '../images/nordea.png';
import NordeaGuide from '../images/nordeaGuide.png';
import Op from '../images/op.png';
import OpGuide from '../images/opGuide.png';

class BankTransactionHelp extends React.Component {
  state = {
    open: false,
    title: undefined,
    content: undefined
  };

  handleClickOpen = (title, element) => () => {
    this.setState({ open: true, title, content: element });
  };

  handleClose = () => {
    this.setState({ open: false, title: undefined, content: undefined });
  };

  render() {
    const { fullScreen } = this.props;
    const { open, title, content } = this.state;
    return (
      <div>
        <Button>
          <img
            alt="Danske"
            src={Danske}
            onClick={this.handleClickOpen('Danske', <img alt="Danske" src={DanskeGuide} />)}
          />
        </Button>
        <Button>
          <img
            alt="OP"
            src={Op}
            onClick={this.handleClickOpen('OP', <img alt="OP" src={OpGuide} />)}
          />
        </Button>
        <Button>
          <img
            alt="Nordea"
            src={Nordea}
            onClick={this.handleClickOpen('Nordea', <img alt="Nordea" src={NordeaGuide} />)}
          />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          maxWidth={false}
          onClose={this.handleClose}
          scroll="paper"
          TransitionComponent={Grow}
          aria-labelledby="bank-transaction-help-dialog-title"
        >
          <DialogTitle id="bank-transaction-help-dialog-title">
            <div>{title}</div>
          </DialogTitle>
          <Paper onClick={this.handleClose}>{content}</Paper>
        </Dialog>
      </div>
    );
  }
}

BankTransactionHelp.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(BankTransactionHelp);
