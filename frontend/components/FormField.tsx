import { Text, TextInput, TextInputProps } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface FormFieldProps extends TextInputProps {
  label: string;
  multiline?: boolean;
}

export default function FormField({
  label,
  multiline = false,
  style,
  ...rest
}: FormFieldProps) {
  return (
    <>
      <Text style={commonStyles.label}>{label}</Text>
      <TextInput
        style={[
          commonStyles.input,
          multiline ? commonStyles.textArea : null,
          style,
        ]}
        multiline={multiline}
        {...rest}
      />
    </>
  );
}