import * as React from 'react';
import dayjs from 'dayjs';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import * as Database from "./Database"
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay/PickersDay";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.filter(item => item.isSame(props.day)).length > 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '⏺' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function Calendar({uid}) {
  var rendezvous_list = [];

  const user = Database.getUser(uid);
  if (user.role === "Nanny") {
    const activeOffers = Database.getOffers({uidNanny:uid, requestID:0});
    if (activeOffers.length > 0)
      rendezvous_list = Database.getRendezvous({offerID:activeOffers[0].id});
  }
  else if (user.role === "Family") {
    rendezvous_list = Database.getRendezvous({uidFamily:uid});
  }
  const rendezvous_dates = rendezvous_list.map(
    (item) => (
      dayjs(item.scheduled)
        .millisecond(0)
        .second(0)
        .minute(0)
        .hour(0)
    )
  )

  const [highlightedDays, setHighlightedDays] = React.useState(rendezvous_dates);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays
          }
        }}
      />
    </LocalizationProvider>
  );

}