import { regExp } from "./appRegExp";

const validateFiled=(criteria,inputControlObj,value)=>{
  for(let i=0;i<criteria.length;i++){
    const {pattern,errorMessage}= regExp[ criteria[i]]
    if(!pattern.test(value)){
      inputControlObj.errorMessage=errorMessage;
      break;
    }
}
}

export const handleFiledValidation=(eve,inputControls)=>{
    const{name,value,type,checked}=eve.target;
    const clonedInputControls=JSON.parse(JSON.stringify(inputControls))
    const inputControlObj=clonedInputControls.find((obj)=>{
        return obj.model===name
       })
       if(type==="checkbox"){
        const checkedValues=inputControlObj.value ? inputControlObj.value.split(","):[]
          if(checked){
              checkedValues.push(value)
          }
          else{
              const index=checkedValues.indexOf(value);
              checkedValues.splice(index,1)
          }
          inputControlObj.value=checkedValues.join();
       }

       else{
        inputControlObj.value = value;
       }
    inputControlObj.errorMessage=""
    const criteria=inputControlObj.criteria
    validateFiled(criteria,inputControlObj,inputControlObj.value)
     return clonedInputControls
}

export const handleFormValidation=(inputControls)=>{
  const clonedInputControls=JSON.parse(JSON.stringify(inputControls))
  const dataObj={}
   clonedInputControls.forEach((inputControlObj)=>{
    const {value,criteria,model}=inputControlObj
    dataObj[model]=value;
     validateFiled(criteria,inputControlObj,value)

   })
  const isFormInvalid= clonedInputControls.some((inputControls)=>{
         return inputControls?.errorMessage?.length>0
   })
   return [isFormInvalid,clonedInputControls,dataObj]
}

export const formReset=(inputControls)=>{
  const clonedInputControls=JSON.parse(JSON.stringify(inputControls))
  clonedInputControls.forEach((inputControlObj)=>{
    inputControlObj.value="";
  })
  return clonedInputControls
}

export const formSetData=(inputControls,data)=>{
  const clonedInputControls=JSON.parse(JSON.stringify(inputControls))
  clonedInputControls.forEach((inputControlObj)=>{
    inputControlObj.value= data[inputControlObj.model];
  })
  return clonedInputControls
}