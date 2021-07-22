import { styled } from "uebersicht"
import config from "./config.json";

const getIconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export const className = `
  top: 200px;
  right: 100px;
  color: #fff;
  font-family: Lucida Grande;
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 0 0 5px;
  padding-left: 20px;
`;

const Description = styled.h4`
  font-size: 12px;
  margin: 0;
  padding-left: 20px;
`;

const Temperature = styled.div`
  font-family: Futura Condensed Medium;
  font-size: 30px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const command = (dispatch) =>
  fetch(config.weatherUrl)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: "FETCH_SUCCEDED", data });
    })
    .catch((error) => {
      dispatch({ type: "FETCH_FAILED", error });
    });

export const refreshFrequency = 1000 * 600;

export const initialState = { data: "" }

export const updateState = (event, previousState) => {
  switch(event.type) {
    case 'FETCH_SUCCEDED': return { data: event.data };
    case 'FETCH_FAILED': return { data: null };
    default: {
      return previousState;
    }
  }
}

export const render = ({ data }) => {
  if (!data) {
    return <div />;
  }

  const temperature = Math.round(data.main.temp);
  const icon = getIconUrl(data.weather[0].icon);
  const description = data.weather[0].description;

  return (
    <div>
      <Header>{data.name}</Header>
      <Description>{description}</Description>
      <Details>
        <img src={icon} alt="" />
        <Temperature>{temperature} &deg;C</Temperature>
      </Details>
    </div>
  )
}