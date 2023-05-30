interface IStack<T> {
  push: (item: T) => void;
  pop: () => T | null;
  peak: () => T | null;
  reset: () => void;
  size: number;
  elements: Array<T>;
}

export class Stack<T> implements IStack<T> {
  #container: T[] = [];
  #size = 0;

  push = (item: T): void => {
    const size = ++this.#size;
    this.#container[size] = item;
  };

  pop = (): T | null => {
    if (this.size) {
      const lastElem = this.#container[this.size];
      delete this.#container[this.size];
      this.#size--;
      return lastElem;
    }
    return null;
  };

  peak = (): T | null => {
    if (this.#size > 0) {
      return this.#container[this.size];
    }
    return null;
  };

  reset = () => {
    this.#container = [];
    this.#size = 0;
  };

  get size() {
    return this.#size;
  }

  get elements() {
    return this.#container;
  }
}
