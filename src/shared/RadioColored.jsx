import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioColored = ({ onRadioChange, currentPriority }) => {
  const radioButtons = [
    {
      value: "high",
      radioColor: {
        static: "#bedbb0",
        checked: "#bedbb0",
      },
    },
    {
      value: "medium",
      radioColor: {
        static: "#e09cb5",
        checked: "#e09cb5",
      },
    },
    {
      value: "low",
      radioColor: {
        static: "#8fa1d0",
        checked: "#8fa1d0",
      },
    },
    {
      value: "without",
      radioColor: {
        static: "rgb(var(--text-color-mainboard),0.3)",
        checked: "rgb(var(--text-color-mainboard),0.3)",
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
                    color: radioColor.static,
                    background: radioColor.static,

                    "& .MuiSvgIcon-root": {
                      fill: radioColor.static,
                    },
                    "&.Mui-checked": {
                      color: radioColor.checked,
                      background: "transparent",
                      border: `1px solid ${radioColor.checked}`,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: radioColor.static,
                    },
                    "&.Mui-checked:before": {
                      backgroundColor: "transparent",
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
