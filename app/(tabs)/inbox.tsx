import TabsHeader from '@/components/layout/tabs-header';
import { EmptyContent } from '@/components/ui/empty-content';
import { SafeAreaView } from 'react-native';

export default function Inbox() {
  return (
    <SafeAreaView className="flex-1 ">
      <TabsHeader title="Inbox" />
      <EmptyContent
        image={require('@/assets/images/message.png')}
        subtitle="No content"
        description="There is no content here yet"
        buttonText="Add content"
        buttonHref="/(tabs)/chat"
      />
    </SafeAreaView>
  );
}
