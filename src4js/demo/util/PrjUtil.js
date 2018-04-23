import isEmpty from 'lodash/isEmpty';

export const getNewFiels=(fields={}) => {
	let params = {};
    if(!isEmpty(fields)){
    	for (let key in fields) {
	    	params[fields[key].name] = fields[key].value
    	}
	}
    return params
}