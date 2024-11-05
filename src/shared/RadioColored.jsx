import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioColored = ({ onRadioChange, currentPriority }) => {
  const radioButtons = [
    {
      value: "High",
      radioColor: {
        static: "var(--radio-label-green-color)",
        checked: "var(--radio-label-checked-background-color)",
        additional: "var(--radio-label-checked-background-color)",
      },
    },
    {
      value: "Medium",
      radioColor: {
        static: "var(--radio-label-pink-color)",
        checked: "var(--radio-label-checked-background-color)",
      },
    },
    {
      value: "Low",
      radioColor: {
        static: "var(--radio-label-background-color)",
        checked: "var(--radio-label-checked-background-color)",
      },
    },
    {
      value: "Without",
      radioColor: {
        static: "var(--radio-label-grey-color)",
        checked: "var(--radio-label-checked-background-color)",
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "140px",
      }}
    >
      <RadioGroup
        aria-labelledby="label-changer"
        defaultValue={currentPriority}
        name="radio-buttons-group"
        onChange={(ev) => onRadioChange(ev.target.value)}
        sx={{ display: "flex", gap: "8px" }}
        row
      >
        {radioButtons.map((button) => {
          const { value, radioColor } = button;
          return (
            <FormControlLabel
              key={value}
              value={value}
              sx={{ margin: "0" }}
              control={
                <Radio
                  sx={{
                    width: "14px",
                    height: "14px",
                    color: "transparent",

                    backgroundColor: radioColor.static,
                    "&.Mui-checked": {
                      color: radioColor.static,

                      backgroundColor: radioColor.checked,
                    },
                  }}
                  disableRipple
                />
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioColored;
