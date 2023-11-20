interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  reset: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = -1;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.tail++;
    this.container[this.tail % this.size] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      return null;
    }
    const firstElem = this.container[this.head % this.size];
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
    return firstElem;
  };

  reset = () => {
    this.length = 0;
    this.head = 0;
    this.tail = -1;
  };

  isEmpty = () => this.length === 0;

  get elements() {
    return this.container;
  }

  get headPointer() {
    return this.head;
  }

  get tailPointer() {
    return this.tail;
  }
}
