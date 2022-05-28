import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "../../../components/ui/TextField";
import { SearchTextField } from "./SearchTextField";
import { useAddItemMutation, useAddStandardItemMutation } from "../../../slices/api/api.slice";
import { Item } from "../../../interfaces/item";
import { MODAL_TYPE_ITEM, ModalType } from "../../../interfaces/modalType";

interface AddItemModalProps {
    useHideOnScroll: boolean;
    modalType: ModalType;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: "fixed",
            bottom: theme.spacing(10),
            right: theme.spacing(2),
        },
    }),
);

export const AddItemModal = ({ useHideOnScroll, modalType }: AddItemModalProps): JSX.Element => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState<string>(""); // using empty strings so react doesn't give uncontrolled input error.
    const [quantity, setQuantity] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [addItem] = useAddItemMutation();
    const [addStandardItem] = useAddStandardItemMutation();

    const trigger = useScrollTrigger({
        threshold: 100,
    });

    const HideOnScroll = useCallback((): JSX.Element => (
        <Zoom in={!trigger}>
            <Fab
                color="secondary"
                aria-label="add"
                className={classes.fab}
                onClick={(): void => {
                    setDialogOpen(true);
                }}
            >
                <AddIcon />
            </Fab>
        </Zoom>
    ), [classes.fab, trigger]);

    const handleDialogClose = (): void => {
        setName("");
        setQuantity("");
        setLink("");
        setDialogOpen(false);
    };

    const handleSubmit = (): void => {
        if (!name) return;

        const item: Partial<Item> = {
            name,
        };

        if (quantity) item.quantity = quantity;
        if (link) item.url = link;

        if (modalType === MODAL_TYPE_ITEM) {
            void addItem({
                ...item,
                categoryId: 1,
            }).then(() => {
                handleDialogClose();
            });
        } else {
            void addStandardItem({ ...item, categoryId: 1 }).then(() => {
                handleDialogClose();
            });
        }
    };

    return (
        <div>
            {useHideOnScroll ? (
                <HideOnScroll />
            ) : (
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={(): void => {
                        setDialogOpen(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            )}
            <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add item</DialogTitle>
                <DialogContent>
                    <SearchTextField value={name} setValue={setName} maxLength={255} name="Name" />
                    <TextField value={quantity} setValue={setQuantity} maxLength={15} name="Quantity" />
                    <TextField value={link} setValue={setLink} maxLength={500} name="URL" />
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
};
