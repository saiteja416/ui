export const regExp= {
    "Required":{
        pattern:/./,
        errorMessage:"Please Enter Value"
    },
    "Min5Charc":{
        pattern:/[a-zA-Z0-9]{5,}/,
        errorMessage:"Min 5 Charcters required"
    },
    "EmailFormat":{
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Enter Valid Email"
    }
}