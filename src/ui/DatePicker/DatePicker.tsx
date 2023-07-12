import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import { DatePicker as ADatePicker } from "antd";
const DatePicker = ADatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
