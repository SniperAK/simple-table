
Array.create = ( length, init )=>{
  let array = [];
  for( let i=0; i < length; i ++ ) array.push( ( typeof init === 'function' ) ?init(i):init );
  return array;
}

Object.defineProperty( Array.prototype, 'sum',{ value:function( func ){
  if( func ) return this.map( func ).reduce((p,c)=>p+c,0);
  return this.reduce((p,c)=>p + c, 0);
},enumerable:false})


Object.defineProperty( Object.prototype, 'reduceA',{ value:function( func, d = [] ){
  return Object.keys( this ).reduce( (p,c)=>p.concat( func(p,c) ),d)
},enumerable:false})

Object.defineProperty( Array.prototype, 'reduceA',{ value:function( func, d = [] ){
  return this.reduce( (p,c)=>p.concat( func(p,c) ),d)
},enumerable:false})

Object.defineProperty( Object.prototype, 'reduceO',{ value:function( func, d = {} ){
  return Object.keys( this ).reduce( function(p,c){return Object.assign(p,func(p,c))},d)
},enumerable:false})

Object.defineProperty( Array.prototype, 'reduceO',{ value:function( func, d = {} ){
  return this.reduce( function(p,c){return Object.assign(p,func(p,c))},d)
},enumerable:false})

Object.defineProperty( String.prototype,'length2',{ value:function() {
  let $this = this;
  return Array.create( this.length, function(i){return (escape($this.charAt(i)).length == 6) ? 2 : 1}).sum();
}, enumerable:false});
