import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="flex flex-col mt-10 gap-5">
      <h2 className="text-lg font-semibold">Filter Data Berdasarkan Tanggal</h2>
      <div className="flex gap-5 items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newDate) => onStartDateChange(newDate)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newDate) => onEndDateChange(newDate)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DateRangeFilter;
