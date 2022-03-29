/**
 * replacment for neru-alpha when deployed in local
 */
 import { v4 as uuidv4 } from 'uuid';

 // ============================================
 var State = (function() {
     function State() { this.data = {} }
     /**
      * lrange<T>(list: string, startPos: number, endPos: number)
      */
     State.prototype.lrange = function(key, begin = 0, end = null) {
         if (this.data[key] == undefined) return [];
         if (!end) end = this.data[key].length;
         return this.data[key].slice(begin, end)
     }
     /**
      * lpush<T>(list: string, value: T)
      */
     State.prototype.lpush = function(key, value) {
         if (this.data[key] == undefined) this.data[key] = [];
         this.data[key].push(value)
     }
     return State;
 })();
 
 var Session = (function() {
     function Session() { this.id = uuidv4() }
     Session.prototype.getState = function () {
         return new State();
     }
     return Session;
 })();
 
 var NotNeru = (function () {
     function NotNeru() {}
     NotNeru.prototype.createSession = function () {
         return new Session();
     };
     NotNeru.prototype.getSessionById = function (id) {
         return new Session();
     };
     return NotNeru;
 }());
 
 export default NotNeru;
 export { NotNeru };
 export var notNeru = new NotNeru();
 