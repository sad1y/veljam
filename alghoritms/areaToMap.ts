export default (area: IArea) => {
  const dimension = area.dimension || 100;

  const rows = area.size.height / dimension;
  const columns = area.size.width / dimension;

  const map = [];

  for (let i = 0; i < rows; i++) {
    map[i] = new Array<JPSBlock>(columns);

    for (let y = 0; y < columns; y++) {
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
      map[i][y] = block;
    }
  }

  const objects = area.objects || [];

  for (let i = 0; i < objects.length; i++) {
    const element = objects[i];

    const column = ~~element.position.x / dimension;
    const row = ~~element.position.y / dimension;

    map[row][column].isBlocked = true;
  }

  return map;
};
