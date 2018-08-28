export default {
  selectArea: (areaName: string): Actions.JPSTrace.SelectArea => {
    return {
      type: 'JPSTrace/SelectArea',
      areaName
    };
  }
};
