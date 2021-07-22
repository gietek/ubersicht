import { css, styled } from "uebersicht"
import config from "./config.json";

export const command = `cal $(date +"%m %Y") | awk 'NF {DAYS = $NF}; END {print DAYS}'`;

const WEEKEND_COLOR = "#9f1a1a";
const TODAY_COLOR = "#ffe4b5";
const DAY_COLOR = "#fff";

export const className = `
  top: 60px;
  left: 100px;
  right: 100px;
`;

const rootClassName = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Link = styled.a`
  color: ${props => props.weekend ? WEEKEND_COLOR : props.today ? TODAY_COLOR : DAY_COLOR};
  border-radius: 50%;
  font-family: Futura Condensed Medium;
  font-size: 30px;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transform: scaleY(1.5);
  box-shadow: ${props => props.today && `0 0 30px ${props.weekend ? WEEKEND_COLOR : TODAY_COLOR}`};
  text-shadow: ${props => props.today && `0 0 10px ${props.weekend ? WEEKEND_COLOR : TODAY_COLOR}`};
`;

const zeroPad = (value) => {
  if (value < 10) {
    return `0${value}`
  }

  return `${value}`;
}

export const render = ({ output }) => {
  const days = Array.from({length: output}, (_, i) => i + 1);
  const date = new Date();
  const month = zeroPad(date.getMonth() + 1);
  const today = date.getDate();
  const year = date.getFullYear();

  return (
    <div className={rootClassName}>
      {days.map(day => {
        date.setDate(day);
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isToday = day === today;
        const actionUrl = `${config.baseCalendarUrl}${year}-${month}-${zeroPad(day)}`

        return (
          <Link key={day} today={isToday} weekend={isWeekend} href={actionUrl}>{day}</Link>
        )
      })}
    </div>
  )
}