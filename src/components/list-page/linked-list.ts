export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }
  
export  interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  toArray: () => T[];
  getSize: () => number;
}
  
export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray? : T[]) {
    this.head = null;
    this.size = 0;
    initialArray?.forEach(elem => {
      this.append(elem);
    })
  }

  append(element: T) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.head === null) {
      return;
    }
    let curr = this.head;
    this.head = curr.next;
    this.size--;
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }
    let curr = this.head;
    let prev = curr;
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = null;
    this.size--;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        this.prepend(element);
      } else {
        let curr = this.head;
        let currIndex = 0;
        
        while (currIndex < index-1 && curr && curr.next) {
          currIndex++;
          curr=curr.next;
        }
        if (curr && curr.next) {
          node.next = curr.next;
          curr.next = node;
        }
        this.size++;
      }
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {

      if (index === 0) {
        this.deleteHead();
      } else {
        let curr = this.head;
        let currIndex = 0;
        
        while (currIndex < index && curr && curr.next) {
          currIndex++;
          curr=curr.next;
        }
        if (curr && curr.next) {
          curr.next = curr.next.next;
        }
        this.size--;
      }
    }
  }

  toArray() {
    let arr: T[] = []
    let curr = this.head;

    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  getSize() {
    return this.size;
  }

}