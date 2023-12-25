import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';

type SelectFieldProps = {
  label: string;
  name: string;
  children?: React.ReactNode;
  placeholder?: string;
  id?: string;
} & SelectProps;

const SelectField: FC<SelectFieldProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);
  console.log({ field, meta });

  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel htmlFor={props.id || name}>{label}</FormLabel>
      <Select {...field} {...props} id={props.id} />
      <ErrorMessage name={name} component={FormErrorMessage} />
    </FormControl>
  );
};

export default SelectField;
