"use strict";

function TernarySearchTree(options){
  this.root = null;
  this.entries = 0;
  options = options || {};
}

TernarySearchTree.prototype = {
  constructor: TernarySearchTree,

  _createNode: function(c){
    return {
      val: c,
      end: false,
      left: null,
      mid: null,
      right: null,
      data: null
    };
  },

  _insert: function(node, str, data){
    const len = str.length;

    if (len < 1){
      return null;
    }

    const c = str.charAt(0);

    if (!node){
      node = this._createNode(c);
    }

    if (!this.root){
      this.root = node;
    }

    if (c < node.val){
      node.left = this._insert(node.left, str, data);
    }
    else if (c > node.val){
      node.right = this._insert(node.right, str, data);
    }
    else {
      if (len > 1) {
        node.mid = this._insert(node.mid, str.slice(1), data);
      } else {
        node.end = true;
        node.data = data;
        this.entries += 1;
      }
    }

    return node;
  },

  _insertManyRecurse: function(strs, begin, end, data) {
    if (end == begin) {
      return;
    }

    const mid = Math.floor((begin + end - 1) / 2);
    this._insert(this.root, strs[mid], data);

    if (mid > begin) {
      this._insertManyRecurse(strs, begin, mid, data);
    }
    if (mid < end - 1) {
      this._insertManyRecurse(strs, mid + 1, end, data);
    }
  },

  _search: function(node, str){
    if (!node){
      return null;
    }

    const len = str.length;

    if (len < 1){
      return null;
    }

    const c = str.charAt(0);

    if (c < node.val) {
      return this._search(node.left, str);
    }
    else if (c > node.val) {
      return this._search(node.right, str);
    }
    else {
      if (len > 1){
        return this._search(node.mid, str.slice(1));
      }
    }
    return node;
  },

  _traverse: function(node, cb) {
    if (!node){
      return;
    }
    this._traverse(node.left, cb);
    if (node.end){
      cb(node);
    }
    else {
      this._traverse(node.mid, cb);
    }
    this._traverse(node.right, cb);
  },

  add: function(str, data){
    this._insert(this.root, str, data);
  },

  addMany: function(strs, data) {
    const strs = strs.slice(0).sort();
    this._insertManyRecurse(strs, 0, strs.length, data);
  },

  empty: function(){
    this.root = null;
    this.entries = 0;
  },

  contains: function(str){
    const ret = this._search(this.root, str);
    if (ret){
      return ret.end;
    }
    return false;
  },

  search: function(str){
    return this._search(this.root, str);
  },

  traverse: function(cb){
    return this._traverse(this.root, cb);
  },

  partialMatch: function(str){
    const results = [];
    const cb = function(node){
      if (node){
        if (node.end){
          results.push(node);
        }
        this._traverse(node.mid, cb);
      }
    }.bind(this);
    const node = this.search(str);
    if (node){
      cb(node);
    }
    return results;
  },

  get length(){
    return this.entries;
  }
};

module.exports = TernarySearchTree;