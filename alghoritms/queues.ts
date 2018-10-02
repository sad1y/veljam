export const bucketPriorityQueue = (buckets: number, arraySize: number, division: number) => {};

export class BucketPriorityQueue {
  buckets: number;
  arraySize: number;
  division: number;

  constructor(buckets: number, arraySize: number, division: number) {
    this.buckets = buckets;
    this.arraySize = arraySize;
    this.division = division;
  }
}

export class UnsortedPriorityQueue<T extends { iteration: number; finalCost: number }> {
  nextFreeNode = 0;
  iteration = 0;
  nodeArray: T[] = [];
  identical: boolean;

  push = (node: T) => {
    if (this.iteration !== node.iteration) {
      this.nextFreeNode = 0;
      this.identical = true;
      this.iteration = node.iteration;
    } else if (this.identical) {
      this.identical = node.finalCost == this.nodeArray[0].finalCost;
    } else {
      this.identical = this.nextFreeNode === 0;
    }

    this.nodeArray[this.nextFreeNode++] = node;
  };
}
