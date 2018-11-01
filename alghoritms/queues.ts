export interface PathFindigingNode {
  iteration: number;
  cost: number;
}

export class BucketPriorityQueue<T extends PathFindigingNode> {
  bucketsCount: number;
  arraySize: number;
  division: number;
  nextFreeBucket = 0;
  maxFreeBuckets = 200;
  freeBuckets: UnsortedPriorityQueue<T>[] = null;

  constructor(bucketsCount: number, arraySize: number, division: number) {
    this.bucketsCount = bucketsCount;
    this.arraySize = arraySize;
    this.division = division;

    // alloc a bunch of free buckets
    this.freeBuckets = new Array(this.maxFreeBuckets);

    for (let i = 0; i < this.maxFreeBuckets; i++) {
      this.freeBuckets[i] = new UnsortedPriorityQueue(arraySize);
    }
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
