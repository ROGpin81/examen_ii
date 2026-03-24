import { ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface Props {
  children: ReactNode;
  scrollable?: boolean;
}

export default function ScreenContainer({ children, scrollable = false }: Props) {
  if (scrollable) {
    return (
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        {children}
      </ScrollView>
    );
  }

  return <View style={commonStyles.screenContainer}>{children}</View>;
}