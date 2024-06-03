import React from "react";

type SelectProps = {
  value: number;
  label?: string | null;
};

type Props = {
  options: Array<SelectProps>;
};

const FormsPicker = (props: Props) => {
  const { options } = props;
  return (
    <div>
      {options.map((option) => (
        <p key={option.value}>{option.label}</p>
      ))}
    </div>
  );
};

export default FormsPicker;
