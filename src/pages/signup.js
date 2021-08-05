import { useState } from "react";
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const defaultUserData = {
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
    zipcode: "",
    ProfileImage: null

}

const SignUp = () => {

    const url = "http://localhost:5000/api/file/upload"; // backend url
    const userUrl = "http://localhost:5000/api/users/signUp"
    const [successfull, setSuccessfull] = useState(false);
    const [errors, setErrors] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userInfo, setuserInfo] = useState(defaultUserData);

    const validateInputs = () => {
        let hasErros = false;
        let Errors = [];
        if (userInfo.password.length < 5) {
            hasErros = true
            Errors.push("Passwords must be greater than 5 digits!!!")
        }
        if (userInfo.password !== userInfo.confirmpassword) {
            hasErros = true
            Errors.push("Passwords do not Match!!!")
        }
        if (userInfo.zipcode.length > 6) {
            hasErros = true
            Errors.push("ZipCode length should be less than 7!!!")
        }

        setErrors(Errors)
        return hasErros
    }

    const onImageChangeHandler = (event) => {
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

    const onChangeHandle = (event) => {
        const name = event.target.name
        const value = event.target.value
        const newuserInfo = { ...userInfo, [name]: value };
        setuserInfo(newuserInfo);
        console.log(userInfo);
    }

    const onSubmitUserHandler = (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            axios.post(userUrl, userInfo, {
                onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
            }).then(res => {
                setSuccessfull(true)
                console.log("Submited SuccessFully");
                setErrors([]);
                setSelectedFile(null);
                setuserInfo(defaultUserData);
            });
        }
    }

    if (successfull) {
        return (<div class="bg-green-600 h-screen text-center justify-center" >

            <Container maxWidth="sm">
                <CssBaseline />

                <Box className="rounded-lg shadow-lg pt-6" sx={{ bgcolor: '#ffff', height: '80vh' }} >
                    <header className=" text-2xl font-extrabold">Tekdi technologies user Registration</header>
                    <div class=" justify-center mt-8 content-center">
                        User Registered Successfully
                    </div>
                    <Button className="shadow-xl hover:bg-blue-700" variant="outlined" type="submit" onClick={() => setSuccessfull(false)} color="secondary" > Register another user </Button>
                </Box>
            </Container>
        </div>)
    }

    return (
        <div class="bg-green-600 h-screen text-center justify-center" >

            <Container maxWidth="sm">
                <CssBaseline />

                <Box className="rounded-lg shadow-lg p-6" sx={{ bgcolor: '#ffff' }} >
                    <header className=" text-2xl font-extrabold">Tekdi technologies user Registration</header>
                    <div class=" justify-center mt-8 content-center">
                        {selectedFile && <img src={selectedFile} alt="" />}
                        <input type="file" name="profileImage" onChange={onImageChangeHandler} />
                        <form onSubmit={onSubmitUserHandler}>
                            {errors.map(error => <div >{error}</div>)}
                            <div className=" mt-2">
                                <br />
                                <TextField
                                    required
                                    size="small"
                                    type="username"
                                    label="username"
                                    name="username"
                                    value={userInfo.username}
                                    onChange={onChangeHandle}
                                />
                            </div><br />
                            <div >

                                <TextField
                                    required
                                    type="name"
                                    size="small"
                                    label="Name"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={onChangeHandle}
                                />
                            </div><br />
                            <div>

                                <TextField
                                    required
                                    size="small"
                                    type="Password"
                                    label="Password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={onChangeHandle}
                                />
                            </div><br />
                            <div>
                                <TextField
                                    required
                                    size="small"
                                    type="Password"
                                    label="ConfirmPassword"
                                    name="confirmpassword"
                                    value={userInfo.confirmpassword}
                                    onChange={onChangeHandle}
                                />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    required
                                    size="small"
                                    type="Number"
                                    label="Zip Code"
                                    name="zipcode"
                                    value={userInfo.zipcode}
                                    onChange={onChangeHandle}
                                />
                            </div><br />
                            <Button className="shadow-xl hover:bg-blue-700" variant="outlined" type="submit" color="secondary" > Submit </Button>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
        // <>
        //     <img src={selectedFile} alt="img" />
        //     <label htmlFor="imgfile">Upload :
        //     </label>
        //     <input type="file" name="productImage" onChange={onChangeHandler} />

        //     <form onChange={onChangeUserHandle}>
        //         <label htmlFor="name">Name:
        //         </label>
        //         <input type="text" required name="name" defaultValue={userInfo.name} />
        //         <label htmlFor="email">Email:
        //         </label>
        //         <input type="text" required name="email" defaultValue={userInfo.email} />
        //         <label htmlFor="password">Password:
        //         </label>
        //         <input type="password" required name="password" defaultValue={userInfo.password} />
        //         <label htmlFor="confirmPassword">Confir Password:
        //         </label>
        //         <input type="text" required name="confirmpassword" defaultValue={userInfo.confirmpassword} />
        //         <input type="button" onClick={onClickUserHandler} value="submit" />
        //     </form>
        // </>
    );
}

export default SignUp;