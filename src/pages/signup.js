import { useState } from "react";
import axios from "axios";

const SignUp = () => {

    const url = "http://localhost:5000/api/file/upload"; // backend url
    const userUrl = "http://localhost:5000/api/users/signUp"
    const [selectedFile, setSelectedFile] = useState(null);
    const [userInfo, setuserInfo] = useState({name: "", email: "", password: "", confirmpassword: ""});

    const onChangeHandler = (event) => {
        console.log(event.target.files[0])
        let img = event.target.files[0];
        setSelectedFile(URL.createObjectURL(img));        
        const fd = new FormData();
        fd.append('productImage', event.target.files[0], event.target.files[0].name);
        axios.post(url, fd, {
            onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
        }).then(res => {
            console.log(res.data._id);
        });

    }

    const onChangeUserHandle = (event) => {
        const newuserInfo = { ...userInfo };
        newuserInfo[event.target.name] = event.target.value;
        setuserInfo(newuserInfo);   
        console.log(userInfo);    

    }

    const onClickUserHandler = (event) => {
        event.preventDefault();
        console.log(userInfo);  
        axios.post(userUrl, userInfo, {
            onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
        }).then(res => {
            console.log("Submited SuccessFully");
        });

    }

    return (
        <>
            <img src={selectedFile} alt="img" />
            <label htmlFor="imgfile">Upload :
            </label>
            <input type="file" name="productImage" onChange={onChangeHandler} />

            <form onChange={onChangeUserHandle}>
                <label htmlFor="name">Name:
                </label>
                <input type="text" required name="name" defaultValue={userInfo.name} />
                <label htmlFor="email">Email:
                </label>
                <input type="text" required name="email" defaultValue={userInfo.email} />
                <label htmlFor="password">Password:
                </label>
                <input type="password" required name="password" defaultValue={userInfo.password} />
                <label htmlFor="confirmPassword">Confir Password:
                </label>
                <input type="text" required name="confirmpassword" defaultValue={userInfo.confirmpassword} />
                <input type="button" onClick={onClickUserHandler} value="submit" />
            </form>
        </>
    );
}

export default SignUp;