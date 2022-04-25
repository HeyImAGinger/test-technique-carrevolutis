import {useNavigate, useParams} from "react-router-dom";
import request from "../lib/AxiosWrap";
import React, {useEffect, useState} from "react";
import {Button, Container, Card, Row, Col, Image} from "react-bootstrap";
import store from "../store";

async function getPreciseLaunch(id: any) {
    return request({
        url: `/${id}`,
        method: 'GET',
    });
}

const PreciseLaunch = () => {
    let {id} = useParams();
    const navigate = useNavigate();

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseJSON, setResponseJSON] = useState<any>()
    const [isFavorite, setIsFavorite] = useState(false);
    const [launchDate, setLaunchDate] = useState<any>()

    const addFavorite = () => {
        const newFavorite = {
            type: "ADD_LAUNCH",
            payload: {
                favorite: id,
            }
        };
        store.dispatch(newFavorite);
        checkIfFavorite()
    }

    const removeFavorite = () => {

        const toDelFavorite = {
            type: "REMOVE_LAUNCH",
            payload: {
                favorite: id,
            }
        };
        store.dispatch(toDelFavorite);
        checkIfFavorite()
    }

    const learnMore = () => {
        window.open(responseJSON.launch_service_provider.wiki_url);
    };

    useEffect(() => {
        if (isLoaded) {
            checkIfFavorite();
            let date = new Date(responseJSON.net);
            let year: any = date.getFullYear();
            let month: any = date.getMonth() + 1;
            let dt: any = date.getDate();
            let hourUTC:any = date.getUTCHours();
            let minutesUTC:any = date.getUTCMinutes()
            let secondsUTC:any = date.getUTCSeconds()

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            let launchdateToString = year + '-' + month + '-' + dt + ' at ' + hourUTC + ':' + minutesUTC + ':' + secondsUTC;
            setLaunchDate(launchdateToString)
        }
    })

    const checkIfFavorite = () => {
        const storeState = store.getState();
        // @ts-ignore
        const result = storeState.launchReducer.favorites.includes(id);
        if (result)
            setIsFavorite(true);
        else
            setIsFavorite(false);

    }

    const constructor = () => {
        if (constructorHasRun) return;
        getPreciseLaunch(id)
            .then(response => {
                setResponseJSON(response);
                setIsLoaded(true);
            })
            .catch(error => {
                setError(error)
            });
        checkIfFavorite()


        setConstructorHasRun(true);
    }

    constructor();
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container fluid={true}>
                <div>
                    <Button variant="primary" size={"lg"} onClick={() => {
                        navigate('/year')
                    }}>Back</Button>
                </div>
                <p/>
                <Row>
                    <Col md="auto">
                        <Card style={{width: '18rem'}}>
                            <Card.Img variant="top" src={responseJSON.launch_service_provider.logo_url}/>
                            <Card.Body>
                                <Card.Title>Agency: {responseJSON.launch_service_provider.name}</Card.Title>
                                <Card.Text>
                                    {responseJSON.launch_service_provider.description?.substring(0, 160)}
                                </Card.Text>
                                <Button variant="primary" onClick={learnMore}>Learn More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h1>{responseJSON.mission.name}</h1>
                                <h4>Launch date was {launchDate} and it was a {responseJSON.status.name}</h4>
                                <p></p>
                                <span>
                                    {responseJSON.mission.description}
                                </span>
                            </Col>
                            <Col md="auto">
                                <Image style={{  width:"300px", height:"300px"}} roundedCircle={true} src={responseJSON.image} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p/>
                <div className="d-grid gap-2">
                    {!isFavorite ?
                        <Button variant="primary" size={"lg"} onClick={addFavorite}>Add as Favorite</Button>
                        :
                        <Button variant="primary" size={"lg"} onClick={removeFavorite}>Remove from Favorite</Button>
                    }
                </div>
            </Container>
        )
    }
}

export default PreciseLaunch;