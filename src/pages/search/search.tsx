import SearchBar from "material-ui-search-bar";
import {useState} from "react";
import {Card, CardContent, IconButton, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import LoadingSearch from "../../components/LoadingSearch";
import request from "../../components/lib/request";

interface searchResultItem {
    name: string,
    link: string,
    img: string,
    amount: string,
    price: string,
    id: string
    checked: boolean,
}

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [items, setItems] = useState([] as searchResultItem[]);
    const [isLoading, setIsLoading] = useState(false);

    function search(query: string, setItems: any) {
        setIsLoading(true);
        request('search', {
            query: query
        })
            .then(result => setItems(result.result)).finally(() => {
            setIsLoading(false)
        });
    }

    function handleClick(item: searchResultItem) {
        request('addItem', {
            item: {name: item.name + ' ' + item.amount, url: item.link}
        })
        const itemsArray = items.slice();
        const element = itemsArray.find(element => element.id === item.id);
        if (!element) return;
        element.checked = true;
        setItems(itemsArray);
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', position: 'fixed', width: "100%"}}>
                <SearchBar value={searchValue} onChange={(newValue) => setSearchValue(newValue)}
                           onRequestSearch={() => search(searchValue, setItems)}
                           style={{width: '75%', marginTop: '10px'}}/>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "70px",
                paddingBottom: "70px"
            }}>
                {isLoading ? <LoadingSearch/> : items.map(item => (
                    <Card style={{margin: "5px", width: '250px'}} key={item.id}>
                        <CardContent style={{display: "flex", flexDirection: "column"}}>
                            <img src={item.img} alt='' width={'auto'} style={{alignSelf: "center"}}/>
                            <Typography variant={"h6"}>{item.name}</Typography>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between"
                            }}>
                                <div>
                                    <Typography>{item.amount}</Typography>
                                    <Typography>€{item.price}</Typography>
                                </div>
                                <IconButton onClick={() => handleClick(item)}>
                                    {item.checked ? <CheckIcon/> : <AddIcon/>}
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
