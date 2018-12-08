const input = require('./input.json');

class Node {
    constructor(numChildren, numEntries) {
        this.children = [];
        this.entries = [];
        this.numChildren = numChildren;
        this.numEntries = numEntries;
    }
}

// Build a tree from the given input
function buildTree(index) {
    const node = new Node(input[index++], input[index++]);

    for(let i = 0; i < node.numChildren; i++) {
        const res = buildTree(index);
        node.children.push(res.node);
        index = res.index;
    }

    for(let i = 0; i < node.numEntries; i++) {
        node.entries.push(input[index++]);
    }

    return {node, index};
}

// Sum the metadata for the given tree of nodes
function sumMetadata(node) {
    let nodeSum = node.entries.reduce((acc, entry) => acc + entry);
    return nodeSum + node.children.reduce((acc, child) => acc + sumMetadata(child), 0);
}

// Get the value for the given trees root node
function getNodeValue(node) {
    if(node.numChildren === 0) return node.entries.reduce((acc, entry) => acc + entry);
    return node.entries.reduce((acc, entry) => node.children[entry - 1] ? acc + getNodeValue(node.children[entry - 1]) : acc, 0);
}

const tree = buildTree(0).node;

console.log('Part 1:', sumMetadata(tree));
console.log('Part 2:', getNodeValue(tree));