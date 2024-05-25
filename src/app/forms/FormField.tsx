import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuestionSelectModel } from "@/types/form-types";
import { FieldOptionSelectModel } from "@/types/form-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

type Props = {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldOptionSelectModel>;
  };
};

const FormField = ({ element }: Props) => {
  if (!element) return null;

  //components indicate the possible form elements
  const components = {
    Input: () => <Input />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    Select: () => (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option, index) => (
            <SelectItem
              key={`${option.text} ${option.value}`}
              value={`answerId_${option.id}`}
            >
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => (
      <RadioGroup>
        {element.fieldOptions.map((option, index) => (
          <div
            key={`${option.text} ${option.value}`}
            className="flex items-center space-x-2"
          >
            <FormControl>
              <RadioGroupItem
                value={`answerId_${option.id}`}
                id={option?.value?.toString() || `answerId_${option.id}`}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label className="text-base">{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };

  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
};

export default FormField;
