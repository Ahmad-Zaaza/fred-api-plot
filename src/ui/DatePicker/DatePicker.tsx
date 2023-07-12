import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Button } from "../Button";
import { CalendarIcon } from "lucide-react";
import { cx } from "cva";
import { Calendar } from "../Calendar/Calendar";
import { format } from "date-fns";

const DatePicker = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          className={cx(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
