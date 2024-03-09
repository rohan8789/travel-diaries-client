
let error ={
    title:'', 
    address:'', 
    description:'',
    name:'',
    image:null,
    email:'',
    password:'',
    repassword:''
};
function validateInput(prop, value){
    const titleRegex = /^[a-zA-Z0-9\s,.#'"/-]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const nameRegex = /^[a-zA-Z-' ]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // console.log(prop,'hi', value);
    if (prop==='title') {
        if (value.length === 0) error.title = `Please provide a ${prop}`;
        else if(value.length <=2 ) error.title = `${prop} is too short`;
        else if(value.length > 30)  error.title = `${prop} is too long`;
        else if(titleRegex.test(value)===false)error.title = `${prop} can only contain letters, numbers, and basic punctuation.`;
    }
    if(prop==='image'){
        const maxSize=1024*1024;
        if(value===null)error.image = `please provide an image of .jpg, .jpeg, .png type`;
        else if(value.size>maxSize)error.image='image size should be less than 500kb';
    }
    if(prop==='address'){
        if (value.length === 0)error.address = `Please provide an ${prop}`;
        else if (value.length <= 5) error.address = `${prop} is too short`;
        else if (value.length > 200) error.address = `${prop} is too long`;
    }
    if(prop==='description'){
        if (value.length === 0)error.description = `Please provide ${prop}`;
        else if (value.length <= 10)error.description = `${prop} is too short`;
        else if (value.length > 400)error.description = `${prop} is too long`;
    }
    if (prop === "name") {
        if (value.length === 0) error.name = `Please provide your ${prop}`;
        else if (value.length <= 2) error.name = `${prop} is too short`;
        else if (value.length > 30) error.name = `${prop} is too long`;
        else if (nameRegex.test(value) === false)
        error.name = `Only letters, spaces, hyphens, and apostrophes allowed.`;
}
if(prop==='email'){
    if (value.length === 0) error.email = `Please provide your ${prop}-Id`;
    else if (emailRegex.test(value) === false)
    error.email = `Please enter a Valid ${prop}-Id.`;
}
if(prop==='password'){
    if (value.length === 0) error.password = `Please Enter a ${prop}`;
    else if (passwordRegex.test(value) === false)
    error.password = `${prop} should have atleast 6 character, one uppercase letter, one digit, one special character`;
}
    if (prop === "repassword") {
      if (value.length === 0) error.repassword = `Please Enter a ${prop}`;
      else if (passwordRegex.test(value) === false)
        error.repassword = `${prop} should have atleast 6 character, one uppercase letter, one digit, one special character`;
    }
}

export const validate = (values) => {
    //Place Form validation
    if(values.title!==undefined)validateInput('title', values.title);
    if(values.address!==undefined)validateInput('address', values.address);
    if(values.description!==undefined)validateInput('description', values.description);
    
    //Login Signup Validation
    if(values.name!==undefined)validateInput('name', values.name);
    if(values.email!==undefined)validateInput('email', values.email);
    if(values.password!==undefined)validateInput('password', values.password);
    if(values.repassword!==undefined)validateInput('repassword', values.repassword);
    console.log('hi',values);
    if(values.image!==undefined)validateInput('image', values.image);
    

    // console.log(error); 
    return error;
};


