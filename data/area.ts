let initArea: IArea = {
  name: 'unknown',
  size: {
    height: 2000,
    width: 2000
  },
  objects: []
};

export const getArea = () => initArea;

export const setArea = (area: IArea) => {
  initArea = area;
};
