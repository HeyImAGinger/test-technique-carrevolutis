import React, {useState, useEffect } from "react";
import store from '../store'
import request from '../lib/AxiosWrap';
import * as Bootstrap from 'react-bootstrap'
import CardComponent from "../Components/CardComponent";

export interface Mission {
    description: any;
}

export interface Launch {
    image: any;
    name: any;
    id: any;
    mission: {
        description:any;
    };
}

interface Launches {
    count: number;
    next: string;
    previous: string;
    results: Array<Launch>;
}

async function getYear(year: string) {
    return request({
        url: `/?net__gt=${year}-01-01T00%3A00%3A00Z&net__lt=${year}-12-31T00%3A00%3A00Z&limit=1000`,
        method: 'GET',
    });
}

const YearLaunchs = () => {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [effectHasRun, setEffectHasRun] = useState(false);
    const [storeState, setStoreState] = useState(store.getState());
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Launches>({count:0,next:"",previous:"",results:[]});

    useEffect(() => {
        if (effectHasRun) return
        setEffectHasRun(true);
    });

    const constructor = () => {
        if (constructorHasRun) return;
        getYear(storeState.birthdayReducer.date)
            .then(response => {
                setItems(response)
                setIsLoaded(true);
                setEffectHasRun(false);
            })
            .catch(error => {
                setError(error)
            });
        setConstructorHasRun(true);
    };

    constructor();
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Bootstrap.Container fluid={"sm"}>
                <div key={"Title"}>Total number of launches in {storeState.birthdayReducer.date} is {items.count}</div>
                <p/>
                <Bootstrap.Row className="g-4">
                    {
                        items.results.map(item=>
                                <Bootstrap.Col>
                                <CardComponent id={item.id} image={item.image} mission={item.mission?.description} name={item.name}></CardComponent>
                                </Bootstrap.Col>
                            )
                    }
                </Bootstrap.Row>
            </Bootstrap.Container>
        );
    }
}

export default YearLaunchs;