import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { skipToken } from "@reduxjs/toolkit/query";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingSearch } from "./components/LoadingSearch";
import { SearchContext } from "../../contexts/SearchContext";
import { EditContext } from "../../contexts/EditContext";
import { BottomNavContext } from "../../contexts/BottomNavContext";
import { useAddItemMutation, useSearchQuery } from "../../slices/api/api.slice";
import { SearchResultItem } from "../../interfaces/SearchResultItem";

export const Search = (): JSX.Element => {
    const [items, setItems] = useState([] as SearchResultItem[]);
    const { searchValue, setSearchValue, doSearch, setDoSearch } = useContext(SearchContext);
    const { isEditing, setEditingItem, editingItem, setIsEditDialogOpen } = useContext(EditContext);
    const { setBottomNavValue } = useContext(BottomNavContext);
    const [addItem] = useAddItemMutation();

    const { data, isLoading, isSuccess, isError } = useSearchQuery(doSearch ? searchValue : skipToken);

    const handleClick = async (item: SearchResultItem): Promise<void> => {
        const itemName = `${item.name} ${item.price.unitSize}`;
        if (!isEditing) {
            await addItem({ name: itemName, url: item.url, categoryId: 1 });
            return;
        }

        setEditingItem({
            ...editingItem,
            name: itemName,
            quantity: "",
            url: item.url,
        });
        setIsEditDialogOpen(true);
        setBottomNavValue(1);
    };

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess || isError) {
            setDoSearch(false);
        }
    }, [isSuccess, isError, setDoSearch]);

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "fixed",
                    width: "100%",
                    zIndex: 100,
                }}
            >
                <TextField
                    variant="filled"
                    value={searchValue}
                    hiddenLabel
                    onChange={(e): void => {
                        setSearchValue(e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                onClick={(): void => {
                                    setDoSearch(true);
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: "75%",
                        marginTop: "10px",
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "70px",
                    paddingBottom: "70px",
                }}
            >
                {isLoading ? (
                    <LoadingSearch />
                ) : (
                    items.map((item) => (
                        <Card
                            sx={{
                                margin: "5px",
                                width: "250px",
                            }}
                            key={item.id}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <img src={item.imageUrl} alt="" width="auto" height={220} style={{ alignSelf: "center" }} loading="lazy" />
                                <Typography variant="h6">{item.name}</Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <Typography>{item.price.unitSize}</Typography>
                                        <Typography>€{item.price.amount}</Typography>
                                    </div>
                                    <IconButton
                                        onClick={(): void => {
                                            void handleClick(item);
                                        }}
                                        size="large"
                                    >
                                        {item.checked ? <CheckIcon /> : <AddIcon />}
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </div>
    );
};
