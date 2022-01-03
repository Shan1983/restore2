import {
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <FormControl component="fieldset">
        <RadioGroup onChange={onChange} value={selectedValue}>
          {options.map((opt) => (
            <FormControlLabel
              value={opt.value}
              control={<Radio />}
              label={opt.label}
              key={opt.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
