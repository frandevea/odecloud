import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface ChatSearchInputProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export default function ChatSearchInput({
  onSearch,
  className,
  placeholder = 'Search',
}: ChatSearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View className="px-3">
      <View className={cn('flex-row items-center rounded-lg bg-muted pr-3', className)}>
        <Input
          placeholder={placeholder}
          value={query}
          onChangeText={handleSearch}
          className="flex-1 px-3 text-base border-0 bg-muted placeholder:text-muted-foreground "
        />
        <Search size={20} className="ml-1 text-muted-foreground/80" />
      </View>
    </View>
  );
}
