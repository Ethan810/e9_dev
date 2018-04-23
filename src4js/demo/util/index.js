import { Modal } from 'antd';

export const transfStr = (name = '', ids = '', list = [], type = '') => {
    console.log(name , ids, list , type )
	let str = '';
	const mirror = {
		37: "doc",
		prjtsk: "task",
		18: "crm",
		152: "workflow",
		135: "project",
	}
	list.map(item => {
		if(name === 'Upload' && type === 'image'){
			str += '<img class="formImgPlay" src="' + item.filelink + '" data-imgsrc="' + (item.loadlink || item.filelink) + '" />'
		}
		if(name === 'Upload' && type === 'file'){
			str += (`<a href='javascript:void(0)'  style='cursor:pointer;text-decoration:underline !important;margin-right:8px'>${item.filename}</a><br>`)
		}
		if(name === 'Browser'){
			str += ( `<a href='javascript:void(0)'  style='cursor:pointer;text-decoration:underline !important;margin-right:8px'>${item.name || item.showname}</a><br>`)
		}
	})
	return str
}

export const getFormFields = (condition=[]) =>{
	let fields = {};
    // let values = {};
    condition && condition.map(f => {
        const field = {};
        let key = f.domkey[0];
        let v = f.value;
        // if (v) values[key] = v;
        // 初始化fields
		field.label = `"${f.label}" `;
		field.value = v;
        fields[key] = field;
    })
	return fields;
}