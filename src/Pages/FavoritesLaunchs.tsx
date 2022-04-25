import React, {useState} from "react";
import store from "../store";
import {Launch} from "./YearLaunchs";
import request from "../lib/AxiosWrap";
import * as Bootstrap from "react-bootstrap";
import CardComponent from "../Components/CardComponent";

async function getPreciseLaunch(id: any) {
    return request({
        url: `/${id}`,
        method: 'GET',
    });
}

const FavoritesLaunchs = () => {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    //const [favorites, setFavorites] = useState<Array<string>>([])
    const [items, setItems] = useState<Array<Launch>>([])
    const [error, setError] = useState<any>(null)

    const constructor = () => {
        if (constructorHasRun) return;

        const storeState = store.getState()
        //setFavorites(storeState.launchReducer.favorites)
        console.log(storeState.launchReducer.favorites)
        storeState.launchReducer.favorites.forEach(elem => {
            getPreciseLaunch(elem)
                .then(response => {
                    setItems(oldArray => [...oldArray, response])
                })
                .catch(error => {
                    setError(error)
                });
        })

        setConstructorHasRun(true);
    }

    constructor()
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (items.length > 1) {
        return <div>Loading...</div>;
    } else {
        return (
            <Bootstrap.Container fluid={"sm"}>
                <div key={"Title"}>Total number of favorites is {items.length}</div>
                <p/>
                <Bootstrap.Row className="g-4">
                    {
                        items.map(item=>
                            <Bootstrap.Col>
                                <CardComponent id={item.id} image={item.image} mission={item.mission?.description} name={item.name}></CardComponent>
                            </Bootstrap.Col>
                        )
                    }
                </Bootstrap.Row>
            </Bootstrap.Container>
        )
    }
}

export default FavoritesLaunchs;