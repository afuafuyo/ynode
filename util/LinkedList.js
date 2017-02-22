/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var List = require('./List');

/**
 * 链表
 */
class LinkedList extends List {
    
    /**
     * constructor
     */
    constructor() {
        super();
        
        this.headNode = null;
        this.tailNode = null;
        this.size = 0;
        
        this.headNode = this.tailNode = new LinkedList.Node(null, null);
    }
    
    [Symbol.iterator]() {
        return this;
    }
    
    next() {
        if(undefined === this.currentIteratorNode) {
            this.currentIteratorNode = this.headNode.next;
            
        } else {
            this.currentIteratorNode = this.currentIteratorNode.next;
        }
        
        return null === this.currentIteratorNode ? {done: true} :
            {done: false, value: this.currentIteratorNode.data};
    }
    
    /**
     * @inheritdoc
     */
    add(data) {
        var node = new LinkedList.Node(data, null);
        // 队尾指向新节点
        this.tailNode.next = node;
        // 重新指定尾节点
        this.tailNode = node;
        // 计数
        this.size++;
    }
    
    /**
     * @inheritdoc
     */
    take() {
        // 为空直接返回
        if(0 === this.size) {
            return null;
        }
        
        // 队列中头节点
        var tmpHeadNode = this.headNode.next;
        var data = tmpHeadNode.data;
        
        // 从队列去除头节点
        this.headNode.next = tmpHeadNode.next;
        tmpHeadNode.next = null;
        tmpHeadNode = null;
        
        // 没节点了 重置 tail
        if(null === this.headNode.next) {
            this.tailNode = this.headNode;
        }
        
        this.size--;
        
        return data;
    }
    
    /**
     * @inheritdoc
     */
    clear() {
        while(0 !== this.size) {
            this.take();
        }
    }
    
    /**
     * toString
     */
    toString() {
        var str = '[ ';
        
        /*
        for(let current = this.headNode.next; null !== current; current = current.next) {
            str += current.data + ' ';
        }
        */
        for(let data of this) {
            str = str + data + ' ';
        }
        
        return str + ' ]';
    }
    
}
LinkedList.Node = class {
    
    /**
     * constructor
     */
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
    
};

module.exports = LinkedList;
