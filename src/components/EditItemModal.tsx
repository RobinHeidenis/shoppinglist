import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "./TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Item } from "../interfaces/item";

interface EditItemModalProps {
    editItemFunction(item: Item): boolean;

    open: boolean;

    setOpen(open: boolean): any;

    item: Item;
}

export default function EditItemModal({ editItemFunction, open, setOpen, item }: EditItemModalProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = () => {
        setOpen(false);
        if (!name) return;

        item.name = name;
        item.quantity = quantity;
        item.url = link;

        if (editItemFunction(item)) {
            setName("");
            setQuantity("");
            setLink("");
        }
    };

    useEffect(() => {
        setName(`${item.name}`);
        setQuantity(`${item.quantity}`);
        setLink(`${item.url}`);
    });

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="edit-dialog-title">
                <DialogTitle id="edit-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <TextField value={name} setValue={setName} maxLength={255} name={"Name"} />
                    <TextField value={quantity} setValue={setQuantity} maxLength={15} name={"Quantity"} />
                    <TextField value={link} setValue={setLink} maxLength={500} name={"URL"} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
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
