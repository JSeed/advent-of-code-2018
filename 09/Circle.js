class Node {
  constructor(value, previous, next) {
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
}

class Circle {
  
  constructor() {
    this.root = null;
    this.current = null;
    this.length = 0;
  }

  /** Returns the current value */
  currentValue() {
    return this.current.value;
  }

  /** Shifts the current index by an amount */
  rotate(amount) {
    let shift = (node) => amount > 0 ? node.next : node.previous;

    for(let i = 0; i < Math.abs(amount); i++) {
      this.current = shift(this.current);
    }
  }

  /** Removes the current element */
  remove() {
    if(this.root === this.current) this.root = this.current.next;
    this.current = this.current.next;
    this.current.previous = this.current.previous.previous;
    this.current.previous.next = this.current;
    this.length--;
  }

  /** Places a marble, returning the move score */
  place(value) {
    let score = 0;

    if(this.root === null) {
      this.root = new Node(value);
      this.root.next = this.root;
      this.root.previous = this.root;
      this.current = this.root;
    } else {
      let node = new Node(value, this.current, this.current.next);
      this.current.next.previous = node;
      this.current.next = node;
      this.current = node;
    }

    this.length++;

    return score;
  }

  toString() {
    let values = [];
    let node = this.root;
    
    for(let i = 0; i < this.length; i++) {
      values.push(node.value);
      node = node.next;
    }

    return `[${values.join(',')}]`;
  }
}

module.exports = Circle;