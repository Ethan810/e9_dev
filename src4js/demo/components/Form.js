import validatorjs from 'validatorjs';
import {Form, Field} from 'mobx-react-form';
import MobxReactForm from 'mobx-react-form';
import React from 'react';
import { observer } from 'mobx-react';
 
const plugins = { dvr: validatorjs };

const bindings = {
    default: {
      id: 'id',
      name: 'name',
      value: 'value',
      valueSpan: 'valueSpan',
      valueObj: 'valueObj',
      label: 'label',
      checked: 'checked',
      placeholder: 'placeholder',
      disabled: 'disabled',
      onChange: 'onChange',
      onBlur: 'onBlur',
      onFocus: 'onFocus',
      autoFocus: 'autoFocus',
    }
  };

const fields = [{
    name: 'codeType',
    label: '编码组成',
    rules: 'required|string',
  }, {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
  }, {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password',
    rules: 'required|string|same:password',
  }];

const hooks = {
    onSuccess(form) {
        console.log('Form is valid! Send the request here.')
        // get field values
        console.log('Form Values!', form.values());
    },
    onError(form) {
        console.log('Form has errors!')
        // get all form errors
        console.log('All form errors', form.errors());
    },
    onSubmit(){
        console.log(1)
    },
    onClear(){
        console.log(2)
    },
    onReset(){
        console.log(3)
    }
}

const form = new MobxReactForm({ fields }, { plugins, hooks });

@observer
export default class FormTest extends React.Component{
    render(){
        return (
            <div>
               
                <label htmlFor={form.$('codeType').id}>
                    {form.$('codeType').label}
                </label>
                 <input {...form.$('codeType').bind()} />
                <p>{form.$('codeType').error}</p>
            
                {/* ... other inputs ... */}
            
                <button type="submit" onClick={form.onSubmit}>Submit</button>
                <button type="button" onClick={form.onClear}>Clear</button>
                <button type="button" onClick={form.onReset}>Reset</button>
            
                <p>{form.error}</p>
          </div>
        )
    }
   
};