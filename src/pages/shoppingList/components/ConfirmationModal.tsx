import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

interface ConfirmationModelProps {
    isOpen: boolean;
    callback: (itemId: number) => void;
    setIsOpen: (newValue: boolean) => void;
    id: number;
}

export default function ConfirmationModal({ isOpen, callback, setIsOpen, id }: ConfirmationModelProps) {
    const handleSubmit = (): void => {
        setIsOpen(false);
        callback(id);
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete item?</DialogTitle>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
