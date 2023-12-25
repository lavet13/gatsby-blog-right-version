import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';
import {
  Checkbox as CheckboxChakra,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import type { CheckboxProps as CheckboxChakraProps } from '@chakra-ui/react';

type CheckboxProps = {
  name: string;
  children: React.ReactNode;
} & CheckboxChakraProps;

const Checkbox: FC<CheckboxProps> = ({ children, name, ...props }) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  // console.log({ field, meta });

  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!!meta.error && meta.touched}
    >
      <CheckboxChakra isChecked={field.checked} {...field} {...props}>
        {children}
      </CheckboxChakra>

      <ErrorMessage name={name} component={FormErrorMessage} />
    </FormControl>
  );
};

export default Checkbox;
