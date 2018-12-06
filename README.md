# simple-table-console
Javascript Node JS Simple table print out array of object.

## Install 

```
npm i --save simple-table-console
```

## Bsage

-  Basic

```
const Table = require('simple-table');

const o = [
	{col1:'col1, row1',col2:'col2, row1', col3:true, col4:123},
	{col1:'col1, row2',col2:'col2, row2', col3:null}
];

Table(o);

```
-  Make String Array

```
let result = Table(o,{
	print:false,
});
```

- Custom Table

```
// border color, colname, formatter, align
T(o,{
	borderColor:'red',
	colnames:{
		col1:'First Column',
		col2:'Second Column',
		col3:'col3',
		col4:'col4'
	},
	formatter:(col,v)=>{
		if( col == 'col1' ) return v.replace(',',':');
		if( typeof v == 'undefined') return 'Undef';
		return v;
	},
	align:'right'
});
```
