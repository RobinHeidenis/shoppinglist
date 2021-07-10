import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "./TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { unsubmittedItem } from "../interfaces/item";

interface AddItemModalProps {
    addItemFunction(item: unsubmittedItem): boolean;

    useHideOnScroll: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: "fixed",
            bottom: theme.spacing(10),
            right: theme.spacing(2),
        },
    })
);

export default function AddItemModal({ addItemFunction, useHideOnScroll }: AddItemModalProps) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState<string>(""); //using empty strings so react doesn't give uncontrolled input error.
    const [quantity, setQuantity] = useState<string>("");
    const [link, setLink] = useState<string>("");

    function HideOnScroll() {
        const trigger = useScrollTrigger({
            threshold: 100,
        });
        return (
            <Zoom in={!trigger}>
                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => setDialogOpen(true)}>
                    <AddIcon />
                </Fab>
            </Zoom>
        );
    }

    const handleDialogClose = () => {
        setName("");
        setQuantity("");
        setLink("");
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        if (!name) return;

        const item = {
            name,
            quantity,
            url: link,
        };

        if (addItemFunction(item)) {
            handleDialogClose();
        }
    };

    return (
        <div>
            {useHideOnScroll ? (
                <HideOnScroll />
            ) : (
                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => setDialogOpen(true)}>
                    <AddIcon />
                </Fab>
            )}
            <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add item</DialogTitle>
                <DialogContent>
                    <TextField value={name} setValue={setName} maxLength={255} name={"Name"} />
                    <TextField value={quantity} setValue={setQuantity} maxLength={15} name={"Quantity"} />
                    <TextField value={link} setValue={setLink} maxLength={500} name={"URL"} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="secondary">
                        Add item
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
