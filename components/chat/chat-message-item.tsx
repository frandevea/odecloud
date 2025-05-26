import { View, useWindowDimensions, Image } from 'react-native';
import { useMemo } from 'react';
import { Message, Chat } from '@/types/chat';
import { cn, getUserProfileById } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Reply } from '@/lib/icons/Reply';
import { CheckCheck } from '@/lib/icons/CheckCheck';
import { MemoizedHTML } from '../memoized-html';

function sanitizeHtml(html: string) {
  html = html.replace(/<img[^>]*src=["'](about:blank|\/|file:|undefined|)["'][^>]*>/gi, '');
  html = html.replace(/<img[^>]*src=["']{0,1}["'][^>]*>/gi, '');
  html = html.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');
  return html;
}

interface Props {
  message: Message;
  chat: Chat;
  messages: Message[];
}

export function ChatMessageItem({ message, chat, messages }: Props) {
  const { width } = useWindowDimensions();
  const { userId } = useAuth();
  const isOwn = message.createdBy === userId;

  const members = chat?.data?.members || [];
  const sender = getUserProfileById(members, message.createdBy);

  const replyTo =
    message.associatedId && Array.isArray(messages)
      ? messages.find((m) => m._id === message.associatedId)
      : null;

  const avatarUrl = sender?.profile?.avatar?.secureUrl;
  const senderName =
    `${sender?.profile?.firstName ?? 'User'} ${sender?.profile?.lastName ?? ''}`.trim();
  const initials =
    `${sender?.profile?.firstName?.[0] ?? 'U'}${sender?.profile?.lastName?.[0] ?? ''}`.toUpperCase();

  const reactions = [
    { emoji: '👍', key: 'likes' },
    { emoji: '❤️', key: 'love' },
    { emoji: '🙏', key: 'helpful' },
    { emoji: '💡', key: 'insightful' },
    { emoji: '👀', key: 'views' },
  ];

  const safeHtml = useMemo(() => sanitizeHtml(message.text || ''), [message.text]);
  const hasText = !!safeHtml.trim();
  const files = message?.data?.files || message?.files || [];

  const firstImage = files.find((f) =>
    f?.cloudinary?.secure_url?.match(/\.(jpeg|jpg|png|gif|webp)$/)
  );

  return (
    <View className="mb-4 max-w-[90%]" style={{ alignSelf: isOwn ? 'flex-end' : 'flex-start' }}>
      {replyTo && (
        <View className="flex-row items-center mb-1 gap-x-1">
          <Reply size={16} className="text-primary" />
          <Text className="text-xs italic text-muted-foreground">
            {getUserProfileById(members, replyTo.createdBy)?.profile.firstName} replied: &quot;
            {replyTo.rawText?.slice(0, 40)}...&quot;
          </Text>
        </View>
      )}

      <View className="flex-row gap-2">
        {!isOwn && (
          <Avatar alt={senderName} className="w-8 h-8">
            <AvatarImage source={{ uri: avatarUrl }} />
            <AvatarFallback>
              <Text className="text-xs font-semibold text-foreground">{initials}</Text>
            </AvatarFallback>
          </Avatar>
        )}

        <View className={cn('rounded-xl px-4 py-4', isOwn ? 'bg-[#fddde6]' : 'bg-[#f3f3f3]')}>
          {!!hasText && <MemoizedHTML html={safeHtml} />}
          {!!firstImage?.cloudinary?.secure_url && (
            <Image
              source={{ uri: firstImage.cloudinary.secure_url }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 12,
                marginTop: hasText ? 10 : 0,
              }}
              resizeMode="cover"
            />
          )}
        </View>
      </View>

      <View
        className={cn(
          'mt-2 flex-row flex-wrap items-center gap-2',
          isOwn ? 'mr-2 justify-end' : 'ml-10 justify-start'
        )}>
        {!isOwn && (
          <View className="flex-row items-center justify-between gap-x-2">
            <CheckCheck className="text-primary" size={16} />
            <Text className="text-xs text-muted-foreground">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}

        <View className="flex-row flex-wrap items-center gap-2">
          {reactions.map(({ emoji, key }) => {
            const users = message[key as keyof Message] as string[] | undefined;
            if (!users || users.length === 0) return null;
            return (
              <View
                key={key}
                className="flex-row items-center px-2 py-1 bg-white border rounded-full border-muted">
                <Text className="text-sm font-medium">{emoji}</Text>
                <Text className="ml-1 text-sm font-medium">{users.length}</Text>
              </View>
            );
          })}
        </View>

        {isOwn && (
          <View className="flex-row items-center ml-1 gap-x-2">
            <Text className="text-xs text-muted-foreground">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <CheckCheck className="text-primary" size={16} />
          </View>
        )}
      </View>
    </View>
  );
}
