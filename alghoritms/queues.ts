export interface PathFindigingNode {
  iteration: number;
  cost: number;
}

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

export class UnsortedPriorityQueue<T extends PathFindigingNode> {
  nextFreeNode = 0;
  iteration = 0;
  nodeArray: T[] = null;
  identical: boolean;

  constructor(size: number) {
    this.nodeArray = new Array(size);
  }

  push = (node: T) => {
    if (this.iteration !== node.iteration) {
      this.nextFreeNode = 0;
      this.identical = true;
      this.iteration = node.iteration;
    }

    this.nodeArray[this.nextFreeNode++] = node;
  };

  remove = (node: T) => {
    for (let i = 0; i < this.nextFreeNode; i++) {
      if (this.nodeArray[i] === node) {
        // put last node where this one was
        this.nodeArray[i] = this.nodeArray[--this.nextFreeNode];
        return;
      }
    }
  };

  pop = () => {
    if (!this.nodeArray.length) return null;

    let cost = this.nodeArray[0].cost;
    let index = 0;

    for (let i = 1; i < this.nodeArray.length; i++) {
      const node = this.nodeArray[i];

      if (node.cost < cost) {
        cost = node.cost;
        index = i;
      }
    }

    // remove element
    this.nodeArray[index] = this.nodeArray[--this.nextFreeNode];

    return this.nodeArray[index];
  };
}
