import { DateLocalizer, Navigate, ViewProps, Views } from "react-big-calendar";
import Calendar from "react-calendar";
import { Grid, GridItem } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import moment from "moment";
import "moment/locale/en-gb";

// Set the locale globally to English
moment.locale("en");

export default function YearView({
  date,
  localizer,
  onView,
  onNavigate,
  events,
}: ViewProps) {
  const currRange = YearView.range(new Date(date), { localizer });

  return (
    <Grid templateColumns={"repeat(4, 1fr)"} gap={12}>
      {currRange.map((month, index) => {
        return (
          <GridItem w="100%" key={index}>
            <Calendar
              activeStartDate={month}
              locale="en-US"
              tileClassName={({ date, view }) => {
                if (
                  view === "month" &&
                  events?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                )
                  return "event-day";
                return null;
              }}
              onClickDay={(day) => {
                onView && onView(Views.DAY);
                onNavigate(day);
              }}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
}

YearView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = localizer.startOf(date, "year");
  const end = localizer.endOf(date, "year");

  const range = [];
  let current = start;

  while (localizer.lte(current, end, "year")) {
    range.push(current);
    current = localizer.add(current, 1, "month");
  }

  return range;
};

YearView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: DateLocalizer }
) => {
  if (action instanceof Date) return action;

  switch (action) {
    case Navigate.NEXT:
      return localizer.add(date, 1, "year");
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, "year");
    default:
      return date;
  }
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return localizer.format(date, "YYYY");
};
