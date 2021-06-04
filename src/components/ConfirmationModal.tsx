import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

interface props {
    isOpen: boolean,
    callback: (itemId: number) => void,
    setIsOpen: (newValue: boolean) => void,
    id: number,
}

export default function ConfirmationModal(props: props) {
    const handleSubmit = () => {
        handleDialogClose();
        props.callback(props.id);
    };

    const handleDialogClose = () => {
        props.setIsOpen(false);
    };

    return (
        <Dialog open={props.isOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete item?</DialogTitle>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}