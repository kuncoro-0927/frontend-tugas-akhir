import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

export default function FormInput({
  type,
  name,
  label,
  value,
  helperText,
  onChange,
  options = [],
  ...rest
}) {
  const formatPhoneNumber = (number) => {
    const cleaned = ("" + number).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{0,4})$/);
    if (match) {
      return `${match[1]}-${match[2]}${match[3] ? "-" + match[3] : ""}`;
    }
    return cleaned;
  };

  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "tel") {
      let rawValue = val.replace(/\D/g, "");
      if (rawValue.startsWith("0")) {
        rawValue = rawValue.slice(1);
      }
      val = formatPhoneNumber(rawValue);
    }

    onChange({
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <div className="w-full">
      <TextField
        fullWidth
        select={type === "select"}
        multiline={type === "textarea"} // tambahkan ini
        rows={type === "textarea" ? 4 : 1} // default 4 baris
        type={type !== "select" && type !== "textarea" ? type : undefined}
        label={label}
        variant="outlined"
        name={name}
        helperText={helperText}
        value={value}
        size="medium"
        onChange={handleChange}
        InputLabelProps={{
          sx: {
            fontSize: "0.78rem",
            pointerEvents: "none",
          },
        }}
        InputProps={{
          startAdornment:
            type === "tel" ? (
              <InputAdornment position="start">+62</InputAdornment>
            ) : undefined,
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
            height: type === "textarea" ? "auto" : "49px", // auto height untuk textarea
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
        {...rest}
      >
        {type === "select" &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
}
