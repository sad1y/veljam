import * as React from 'react';
import BlockMarkup from './BlockMarkup';

export default ({ blocks }) => {
  return (
    <div>
      <BlockMarkup
        size={100}
        block={{
          isBlocked: false,
          jumpDistance: {
            Down: 1,
            Left: 2,
            LeftDown: 3,
            LeftUp: 4,
            Right: 5,
            RightDown: 6,
            RightUp: 7,
            Up: 9
          }
        }}
      />
    </div>
  );
};
