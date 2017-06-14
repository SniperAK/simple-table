// cli table print
require('./common');
const colors = require('colors');
const TL = '┌', TT = '─',  TM = '┬', TR = '┐', LL = '│',  LM = '├', MM = '┼',  RM = '┤', BM = '┴', BL = '└', BR = '┘';
const CN = 'colnames', _pl = 'paddingLeft', _pr = 'paddingRight', _p = 'padding',_a = 'align',  _l = 'left', _r = 'right', _f = 'formatter';
const U = (v)=>typeof v === 'undefined', F = v=>typeof v === 'function';
const v = (v)=>( v === null ) ? 'null' : U(v) ? 'undefined' : v.toString()
const l = (o)=>v(o).length2()

module.exports = ( c, o = {} )=> {
  if ( !c || typeof c == 'array' ) c = [{}];
  let cn = o && !U(o[CN]) && Object.keys( o[CN] ).length > 0 ? o[CN] : c.reduceO( (p,c)=>c.reduceO((p1,c1)=>({[c1]:c1}))),
      cs = Object.keys( cn ),
      pl = ((o && !U(o[_p])) || (o && !U(o[_pl]))) ? !U(o[_pl]) ? o[_pl] : o[_p] + 1 : 2,
      pr = ((o && !U(o[_p])) || (o && !U(o[_pr]))) ? !U(o[_pr]) ? o[_pr] : o[_p] : 1,
      a  = (o && (o[_a] === _l || o[_a] === _r)) ? o[_a] : _l,
      PL = ' '.repeat(pl),PR = ' '.repeat(pr),
      f  = o && o[_f] && F(o[_f]) ? o[_f] : (c,va)=>v(va),
      mx = c.reduceO( (p,c)=>cs.reduceO((p1,c1)=>({[c1]:Math.max( U(p[c1]) ? 0 : p[c1], l(f(c,c[c1],true)) ) })) ,cn.reduceO((p,c)=>({[c]:l(cn[c])})));

  if( o && o.borderColor ) colors.setTheme({BD:[].concat(o.borderColor)})
  else colors.setTheme({ BD:[] });

  let rv = (r, c)=>(a === _l ? f(c,r[c]) :'') + ' '.repeat(mx[c] - l(f(c,r[c], true))) + (a === _r ? f(c,r[c]) : '')
  let rc = c=>cn[c] + ' '.repeat(mx[c] - l(cn[c]))
  let rb = c=>TT.repeat(mx[c] + pl + pr).BD

  let r = [].concat(
    TL.BD + cs.map(col=>     rb( col )           ).join(TM.BD) + TR.BD,
    LL.BD + cs.map(col=>PL + rc( col ) + PR      ).join(LL.BD) + LL.BD,
    LM.BD + cs.map(col=>     rb( col )           ).join(MM.BD) + RM.BD, c.reduceA((p, row)=>
    LL.BD + cs.map(col=>PL + rv( row, col ) + PR ).join(LL.BD) + LL.BD ),
    BL.BD + cs.map(col=>     rb( col )           ).join(BM.BD) + BR.BD
  ).filter(e=>e);
  return ( o && o.print == false ) ? r : r.forEach(l=>console.log( l ));
};
