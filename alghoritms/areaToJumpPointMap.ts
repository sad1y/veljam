const MovingDown = 1;
const MovingUp = 2;
const MovingRight = 4;
const MovingLeft = 8;

const createJumpPointMap = (area: IArea) => {
  const dimension = area.dimension || 100;

  const rows = area.size.height / dimension;
  const columns = area.size.width / dimension;
  const map: JPSBlock[][] = [];

  // init map
  for (let y = 0; y < rows; y++) {
    map[y] = new Array<JPSBlock>(columns);

    for (let x = 0; x < columns; x++) {
      const block: JPSBlock = {
        isBlocked: false,
        jumpDistance: {
          Down: 0,
          Up: 0,
          Left: 0,
          Right: 0,
          LeftDown: 0,
          LeftUp: 0,
          RightDown: 0,
          RightUp: 0
        }
      };

      map[y][x] = block;
    }
  }

  // update blocked object
  const objects = area.objects || [];
  for (let i = 0; i < objects.length; i++) {
    const element = objects[i];

    const column = ~~element.position.x / dimension;
    const row = ~~element.position.y / dimension;

    map[row][column].isBlocked = true;
  }

  // create jps map
  const jpsMap: number[][] = [];

  for (let y = 0; y < rows; ++y) {
    const line = (jpsMap[y] = new Array(columns));
    for (let x = 0; x < columns; ++x) {
      if (isJumpPoint(y, x, 1, 0)) {
        line[x] |= MovingDown;
      }
      if (isJumpPoint(y, x, -1, 0)) {
        line[x] |= MovingUp;
      }
      if (isJumpPoint(y, x, 0, 1)) {
        line[x] |= MovingRight;
      }
      if (isJumpPoint(y, x, 0, -1)) {
        line[x] |= MovingLeft;
      }
    }
  }

  // calc jps distance left and right
  for (let y = 0; y < rows; ++y) {
    {
      let countMovingLeft = -1;
      let jumpPointLastSeen = false;
      for (let x = 0; x < columns; ++x) {
        if (isWall(y, x)) {
          countMovingLeft = -1;
          jumpPointLastSeen = false;
          map[y][x].jumpDistance.Left = 0;
          continue;
        }

        countMovingLeft++;

        if (jumpPointLastSeen) {
          map[y][x].jumpDistance.Left = countMovingLeft;
        } else {
          map[y][x].jumpDistance.Left = -countMovingLeft;
        }

        if ((jpsMap[y][x] & MovingLeft) > 0) {
          countMovingLeft = 0;
          jumpPointLastSeen = true;
        }
      }
    }

    {
      let countMovingRight = -1;
      let jumpPointLastSeen = false;
      for (let x = columns - 1; x >= 0; --x) {
        if (isWall(y, x)) {
          countMovingRight = -1;
          jumpPointLastSeen = false;
          map[y][x].jumpDistance.Right = 0;
          continue;
        }

        countMovingRight++;

        if (jumpPointLastSeen) {
          map[y][x].jumpDistance.Right = countMovingRight;
        } else {
          map[y][x].jumpDistance.Right = -countMovingRight;
        }

        if ((jpsMap[y][x] & MovingRight) > 0) {
          countMovingRight = 0;
          jumpPointLastSeen = true;
        }
      }
    }
  }

  // calc jps distance up and down
  for (let x = 0; x < columns; ++x) {
    {
      let countMovingUp = -1;
      let jumpPointLastSeen = false;
      for (let y = 0; y < rows; ++y) {
        if (isWall(y, x)) {
          countMovingUp = -1;
          jumpPointLastSeen = false;
          map[y][x].jumpDistance.Up = 0;
          continue;
        }

        countMovingUp++;

        if (jumpPointLastSeen) {
          map[y][x].jumpDistance.Up = countMovingUp;
        } // Wall last seen
        else {
          map[y][x].jumpDistance.Up = -countMovingUp;
        }

        if ((jpsMap[y][x] & MovingUp) > 0) {
          countMovingUp = 0;
          jumpPointLastSeen = true;
        }
      }
    }

    {
      let countMovingDown = -1;
      let jumpPointLastSeen = false;
      for (let y = rows - 1; y >= 0; --y) {
        if (isWall(y, x)) {
          countMovingDown = -1;
          jumpPointLastSeen = false;
          map[y][x].jumpDistance.Down = 0;
          continue;
        }

        countMovingDown++;

        if (jumpPointLastSeen) {
          map[y][x].jumpDistance.Down = countMovingDown;
        } else {
          map[y][x].jumpDistance.Down = -countMovingDown;
        }

        if ((jpsMap[y][x] & MovingDown) > 0) {
          countMovingDown = 0;
          jumpPointLastSeen = true;
        }
      }
    }
  }

  // calc jps distance diagonally LeftUp and RightUp
  for (let y = 0; y < rows; ++y) {
    for (let x = 0; x < columns; ++x) {
      if (isEmpty(y, x)) {
        if (y === 0 || x === 0 || (isWall(y - 1, x) || isWall(y, x - 1) || isWall(y - 1, x - 1))) {
          // wall one away
          map[y][x].jumpDistance.LeftUp = 0;
        } else if (
          isEmpty(y - 1, x) &&
          isEmpty(y, x - 1) &&
          (map[y - 1][x - 1].jumpDistance.Up > 0 || map[y - 1][x - 1].jumpDistance.Left > 0)
        ) {
          // diagonal one away
          map[y][x].jumpDistance.LeftUp = 1;
        } else {
          // increment from last
          let jumpDistance = map[y - 1][x - 1].jumpDistance.LeftUp;

          if (jumpDistance > 0) {
            map[y][x].jumpDistance.LeftUp = 1 + jumpDistance;
          } else {
            map[y][x].jumpDistance.LeftUp = -1 + jumpDistance;
          }
        }

        if (y === 0 || x === columns - 1 || (isWall(y - 1, x) || isWall(y, x + 1) || isWall(y - 1, x + 1))) {
          // wall one away
          map[y][x].jumpDistance.RightUp = 0;
        } else if (
          isEmpty(y - 1, x) &&
          isEmpty(y, x + 1) &&
          (map[y - 1][x + 1].jumpDistance.Up > 0 || map[y - 1][x + 1].jumpDistance.Right > 0)
        ) {
          // diagonal one away
          map[y][x].jumpDistance.RightUp = 1;
        } else {
          // increment from last
          let jumpDistance = map[y - 1][x + 1].jumpDistance.RightUp;

          if (jumpDistance > 0) {
            map[y][x].jumpDistance.RightUp = 1 + jumpDistance;
          } 
          else {
            map[y][x].jumpDistance.RightUp = -1 + jumpDistance;
          }
        }
      }
    }

    // calc jps distance diagonally LeftDown and RightDown
    for (let y = rows - 1; y >= 0; --y)
    {
      for (let x = 0; x < columns; ++x)
      {
        if (isEmpty(y, x))
        {
          if (y === rows - 1 || x === 0 ||
            (isWall(y + 1, x) || isWall(y, x - 1) || isWall(y + 1, x - 1)))
          {
            // wall one away
            map[y][x].jumpDistance.LeftDown = 0;
          }
          else if (isEmpty(y + 1, x) && isEmpty(y, x - 1) &&
            (map[y + 1][x - 1].jumpDistance.Down > 0 ||
             map[y + 1][x - 1].jumpDistance.Left > 0))
          {
            // diagonal one away
            map[y][x].jumpDistance.LeftDown = 1;
          }
          else
          {
            // Increment from last
            let jumpDistance = map[y + 1][x - 1].jumpDistance.LeftDown;
  
            if (jumpDistance > 0)
            {
              map[y][x].jumpDistance.LeftDown = 1 + jumpDistance;
            }
            else
            {
              map[y][x].jumpDistance.LeftDown = -1 + jumpDistance;
            }
          }
  
  
          if (y === rows - 1 || x == columns - 1 || (isWall(y + 1, x) || isWall(y, x + 1) || isWall(y + 1, x + 1)))
          {
            // wall one away
            map[y][x].jumpDistance.RightDown = 0;
          }
          else if (isEmpty(y + 1, x) && isEmpty(y, x + 1) &&
            (map[y + 1][x + 1].jumpDistance.Down > 0 ||
             map[y + 1][x + 1].jumpDistance.Right > 0))
          {
            // diagonal one away
            map[y][x].jumpDistance.RightDown = 1;
          }
          else
          {
            // increment from last
            let jumpDistance = map[y + 1][x + 1].jumpDistance.RightDown;
  
            if (jumpDistance > 0)
            {
              map[y][x].jumpDistance.RightDown = 1 + jumpDistance;
            }
            else
            {
              map[y][x].jumpDistance.RightDown = -1 + jumpDistance;
            }
          }
        }
      }
    }
  }

  function isJumpPoint(y: number, x: number, yDir: number, xDir: number) {
    return (
      isEmpty(y - yDir, x - xDir) &&
      ((isEmpty(y + xDir, x + yDir) && isWall(y - yDir + xDir, x - xDir + yDir)) ||
        (isEmpty(y - xDir, x - yDir) && isWall(y - yDir - xDir, x - xDir - yDir)))
    );
  }

  function isWall(y: number, x: number) {
    if (x < 0 || y < 0 || x > columns - 1 || y > rows - 1) {
      return true;
    }
    const cell = map[y][x];
    return cell && cell.isBlocked;
  }

  function isEmpty(y: number, x: number) {
    if (x < 0 || y < 0 || x > columns - 1 || y > rows - 1) {
      return false;
    }
    const cell = map[y][x];
    return cell && !cell.isBlocked;
  }

  return map;
};

export default createJumpPointMap;
