import { useState } from "react";
import axios from "axios";

const SignUp = () => {

    const url = "http://localhost:5000/api/file/upload"; // backend url
    const [selectedFile, setSelectedFile] = useState(null);
    const [userInfo, setuserInfo] = useState([]);

    const onChangeHandler = (event) => {
        console.log(event.target.files[0])
        let img = event.target.files[0];
        setSelectedFile(URL.createObjectURL(img));
        //console.log(selectedFile)
        const fd = new FormData();
        fd.append('productImage', event.target.files[0], event.target.files[0].name);
        axios.post(url, fd, {
            onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
        }).then(res => {
            console.log(res.data._id);
        });

    }

    const onClickUserHandler = (event) => {
        event.preventDefault();
       console.log(event.target.files[0]);
       
        // const fd = new FormData();
        // fd.append('productImage', selectedFile, selectedFile.name);
        // axios.post(url, fd, {
        //     onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
        // }).then(res => {
        //     console.log(res);
        // });
    }

    return (
        <>

            <img src={selectedFile} alt="img" />
            <label htmlFor="imgfile">Upload :
            </label>
            <input type="file" name="productImage" onChange={onChangeHandler} />

            <form >
                <label htmlFor="name">Name:
                </label>
                <input type="text" name="name" />
                <label htmlFor="email">Email:
                </label>
                <input type="text" name="email" />
                <label htmlFor="password">Password:
                </label>
                <input type="text" name="password" />
                <label htmlFor="confirmPassword">Confir Password:
                </label>
                <input type="text" name="confirmpassword" />
                <input type="button" onClick={onClickUserHandler} />
            </form>
        </>
    );
}

export default SignUp;