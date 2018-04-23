import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

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

// const form = new MobxReactForm({ fields }, { plugins, hooks });
export default class Form extends MobxReactForm {

    bindings() {
      return bindings;
    }
  
    hooks() {
      return hooks;
    }
  
    plugins() {
      return {
        dvr: {
          package: validatorjs,
        },
      };
    }
  
    options() {
      return {
        defaultGenericError: 'Invalid Data',
        autoParseNumbers: true,
      };
    }
  }
  