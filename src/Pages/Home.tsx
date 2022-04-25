import React, {useState} from 'react';
import * as Bootstrap from 'react-bootstrap';
import '../App.css';
import DatePicker from "react-datepicker";
import store from '../store'
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleButton = () => {
        const year = startDate.toDateString().split(" ")[3]

        const newDate = {
            type: "SAVE",
            payload: {
                date: year,
            }
        };
        store.dispatch(newDate);

        navigate('/year');
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <main>
            <Bootstrap.Container>
                <Bootstrap.Row>
                    <Bootstrap.Col className={"d-grid gap-2"}>
                        <DatePicker
                            maxDate={new Date()}
                            selected={startDate}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            onChange={(date:Date) => setStartDate(date)} />
                    </Bootstrap.Col>
                    <Bootstrap.Col className={"d-grid gap-2"}>
                        <Bootstrap.Button size="lg" variant="primary" onClick={handleButton}>
                            Save Birthday Date
                        </Bootstrap.Button>
                    </Bootstrap.Col>
                </Bootstrap.Row>
            </Bootstrap.Container>
        </main>
    )
}

export default Home;