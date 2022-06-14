import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React from "react";

interface ConfirmationModelProps {
    isOpen: boolean;
    callback: (itemId: number) => void;
    setIsOpen: (newValue: boolean) => void;
    id: number;
}

export const ConfirmationModal = ({ isOpen, callback, setIsOpen, id }: ConfirmationModelProps): JSX.Element => {
    const handleSubmit = (): void => {
        setIsOpen(false);
        callback(id);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={(): void => {
                setIsOpen(false);
            }}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Delete item?</DialogTitle>
            <DialogActions>
                <Button
                    onClick={(): void => {
                        setIsOpen(false);
                    }}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
