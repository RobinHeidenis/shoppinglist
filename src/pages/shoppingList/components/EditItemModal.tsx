import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "../../../components/ui/TextField";
import { Item } from "../../../interfaces/item";
import { usePrevious } from "../../../hooks/usePrevious";
import { SearchTextField } from "./SearchTextField";
import { EditContext } from "../../../contexts/EditContext";

interface EditItemModalProps {
    editItemFunction(item: Item): boolean;
}

export const EditItemModal = ({ editItemFunction }: EditItemModalProps): JSX.Element => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [link, setLink] = useState("");
    const { editingItem, isEditDialogOpen, setIsEditDialogOpen } = useContext(EditContext);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const prevOpen = usePrevious(isEditDialogOpen);

    const handleSubmit = (): void => {
        setIsEditDialogOpen(false);
        if (!name) return;

        const item: Item = { ...editingItem, name, quantity, url: link };

        if (editItemFunction(item)) {
            setName("");
            setQuantity("");
            setLink("");
        }
    };

    const setItemState = (): void => {
        setName(editingItem.name);
        setQuantity(editingItem.quantity);
        setLink(editingItem.url);
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (prevOpen !== isEditDialogOpen && isEditDialogOpen) {
            setItemState();
        }
    });

    return (
        <div>
            <Dialog
                open={isEditDialogOpen}
                onClose={(): void => {
                    setIsEditDialogOpen(false);
                }}
                aria-labelledby="edit-dialog-title"
            >
                <DialogTitle id="edit-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <SearchTextField value={name} setValue={setName} maxLength={255} name="Name" fromEditing />
                    <TextField value={quantity} setValue={setQuantity} maxLength={15} name="Quantity" />
                    <TextField value={link} setValue={setLink} maxLength={500} name="URL" />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(): void => {
                            setIsEditDialogOpen(false);
                        }}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="secondary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
