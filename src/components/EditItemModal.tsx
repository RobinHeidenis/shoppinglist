import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "./TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Item } from "../interfaces/item";
import { usePrevious } from "../hooks/usePrevious";
import { SearchTextField } from "./SearchTextField";
import { EditContext } from "../contexts/EditContext";

interface EditItemModalProps {
    editItemFunction(item: Item): boolean;
}

export default function EditItemModal({ editItemFunction }: EditItemModalProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [link, setLink] = useState("");
    const { editingItem, isEditDialogOpen, setIsEditDialogOpen } = useContext(EditContext);
    const prevOpen = usePrevious(isEditDialogOpen);

    const handleSubmit = () => {
        setIsEditDialogOpen(false);
        if (!name) return;

        editingItem.name = name;
        editingItem.quantity = quantity;
        editingItem.url = link;

        if (editItemFunction(editingItem)) {
            setName("");
            setQuantity("");
            setLink("");
        }
    };

    const setItemState = () => {
        setName(editingItem.name);
        setQuantity(editingItem.quantity);
        setLink(editingItem.url);
    };

    useEffect(() => {
        if (prevOpen !== isEditDialogOpen && isEditDialogOpen) {
            setItemState();
        }
    });

    return (
        <div>
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} aria-labelledby="edit-dialog-title">
                <DialogTitle id="edit-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <SearchTextField value={name} setValue={setName} maxLength={255} name={"Name"} fromEditing />
                    <TextField value={quantity} setValue={setQuantity} maxLength={15} name={"Quantity"} />
                    <TextField value={link} setValue={setLink} maxLength={500} name={"URL"} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="secondary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
