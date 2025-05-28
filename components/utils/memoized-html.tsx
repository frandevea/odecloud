import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

interface Props {
  html: string;
}

export const MemoizedHTML = React.memo(function MemoizedHTML({ html }: Props) {
  const { width } = useWindowDimensions();

  const tagsStyles = useMemo(
    () => ({
      span: { color: '#3182ce', fontWeight: 600 },
      a: { color: '#3182ce' },
    }),
    []
  );

  const source = useMemo(() => ({ html }), [html]);

  return (
    <RenderHTML
      contentWidth={width}
      source={source}
      baseStyle={{
        color: '#111',
        fontSize: 15,
        lineHeight: 20,
      }}
      tagsStyles={tagsStyles as any}
    />
  );
});
