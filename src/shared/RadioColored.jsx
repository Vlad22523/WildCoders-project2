import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioColored = ({ onRadioChange, currentPriority }) => {
  const radioButtons = [
    {
      value: "High",
      radioColor: {
        static: "#bedbb0",
        checked: "#bedbb0",
      },
    },
    {
      value: "Medium",
      radioColor: {
        static: "#e09cb5",
        checked: "#e09cb5",
      },
    },
    {
      value: "Low",
      radioColor: {
        static: "#8fa1d0",
        checked: "#8fa1d0",
      },
    },
    {
      value: "Without",
      radioColor: {
        static: "#1616164D",
        checked: "#1616164D",
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
