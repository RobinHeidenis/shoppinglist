import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import item from "../interfaces/item";

interface props {
    editItemFunction(item: item): boolean;

    open: boolean;

    setOpen(open: boolean): any;

    item: item;
}

export default function EditItemModal(props: props) {
    const [Name, setName] = useState<string>('');
    const [Quantity, setQuantity] = useState<string>();
    const [Link, setLink] = useState<string>();

    const handleDialogClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = () => {
        handleDialogClose();
        if (!Name) return;

        props.item.name = Name;
        props.item.quantity = Quantity;
        props.item.url = Link;

        if (props.editItemFunction(props.item)) {
            setName("");
            setQuantity("");
            setLink("");
        }
    }

    useEffect(() => {
        setName(props.item.name);
        setQuantity(props.item.quantity);
        setLink(props.item.url)
    }, [props.item.name, props.item.quantity, props.item.url])

    return (
        <div>
            <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="edit-dialog-title">
                <DialogTitle id="edit-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit_name"
                        label="Name"
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="edit_qty"
                        label="Quantity"
                        type="text"
                        value={Quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="edit_url"
                        label="URL"
                        type="text"
                        value={Link}
                        onChange={(e) => setLink(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}