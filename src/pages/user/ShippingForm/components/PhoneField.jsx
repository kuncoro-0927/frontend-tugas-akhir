import React from "react";
import { MuiTelInput } from "mui-tel-input";

const PhoneField = ({ value, onChange, error, helperText }) => {
  return (
    <MuiTelInput
      value={value}
      onChange={onChange}
      fullWidth
      label="Nomor Telepon"
      size="small"
      helperText={helperText}
      error={error}
      defaultCountry="ID"
      InputLabelProps={{
        sx: {
          fontSize: "0.78rem",
          pointerEvents: "none",
        },
      }}
      InputProps={{
        sx: {
          "& input": {
            fontSize: "0.87rem",
            lineHeight: "2.2",
            transition: "transform 0.2s ease",
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "49px",
          fontSize: "1rem",
          color: "black !important",
          "& fieldset": {
            borderWidth: "0.3px !important",
            borderColor: "gray !important",
          },
          "&:hover fieldset": {
            borderWidth: "0.5px !important",
            borderColor: "black !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1.5px !important",
            borderColor: "black !important",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "black !important",
        },
        "& .MuiInputLabel-root": {
          color: "gray !important",
        },
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
          fontSize: "1rem",
          color: "black !important",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          fontSize: "1rem",
          color: "black !important",
        },
        "& .MuiOutlinedInput-input": {
          marginTop: 0,
        },
      }}
    />
  );
};

export default PhoneField;
