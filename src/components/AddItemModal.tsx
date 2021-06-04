import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from "@material-ui/icons/Add";
import {Fab, useScrollTrigger, Zoom} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {unsubmittedItem} from "../interfaces/item";

interface props {
    addItemFunction(item: unsubmittedItem): boolean;

    useHideOnScroll: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(10),
            right: theme.spacing(2),
        }
    })
);

export default function AddItemModal(props: props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [link, setLink] = useState<string>('');

    function HideOnScroll(props: any) {
        const trigger = useScrollTrigger({
            threshold: 100,
        });
        return (
            <Zoom in={!trigger}>
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleDialogClickOpen}>
                    <AddIcon/>
                </Fab>
            </Zoom>
        );
    }

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setName("");
        setQuantity("");
        setLink("");

        setDialogOpen(false);
    };

    const handleSubmit = () => {
        handleDialogClose();
        if (!name) return;

        const item = {
            name: name,
            quantity: quantity,
            url: link
        };

        if (props.addItemFunction(item)) {
            setName("");
            setQuantity("");
            setLink("");
        }
    };

    return (
        <div>
            {props.useHideOnScroll ?
                <HideOnScroll/> :
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleDialogClickOpen}>
                    <AddIcon/>
                </Fab>
            }
            <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        inputProps={{maxLength: 255}}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        autoComplete="off"
                    />
                    <TextField
                        margin="dense"
                        id="qty"
                        label="Quantity"
                        type="text"
                        inputProps={{maxLength: 15}}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        autoComplete="off"
                    />
                    <TextField
                        margin="dense"
                        id="url"
                        label="URL"
                        type="text"
                        inputProps={{maxLength: 500}}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        fullWidth
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add item
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}