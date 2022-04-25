import * as Bootstrap from "react-bootstrap";
import React from "react";
import {useNavigate} from 'react-router-dom';

interface ToggleProps {
  id: any,
  image : string,
  name: string
  mission: string
}


function CardComponent(props: ToggleProps) {
    const navigate = useNavigate();
    return (
      <Bootstrap.Card key={props.id} style={{ width: '25rem', height:'33rem' }}>
        <Bootstrap.Card.Img style={{maxWidth: "25rem", maxHeight:"15rem"}} variant="top" src={props.image} />
        <Bootstrap.Card.Body>
          <Bootstrap.Card.Title>{props.name}</Bootstrap.Card.Title>
          <Bootstrap.Card.Text>
            {props.mission?.substring(0, 160)}
          </Bootstrap.Card.Text>
          <Bootstrap.Button variant="primary" onClick={() => {navigate(`/${props.id}`)}}>See More</Bootstrap.Button>
        </Bootstrap.Card.Body>
      </Bootstrap.Card>
  );
}

export default CardComponent;