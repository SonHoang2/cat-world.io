import {useState} from 'react'
import { baseURL } from './App'
import { useContext } from "react";
import { UserContext } from "./App";
import { useNavigate } from 'react-router-dom';

export default function UploadImg () {
    const [image, setImage] = useState({ preview: '', data: '' })
    const navigate = useNavigate();
    const {userData} = useContext(UserContext);
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            let formData = new FormData()
            formData.append('avatar', image.data)
            const res = await fetch(baseURL + '/image', {
                method: "POST",
                body: formData,
            })
            const data = await res.json();
            if (res) {
                const id = userData.id;
                const path = data.path;
                const response = await fetch(baseURL + '/updateAvatar', {
                    method: "POST",
                    body: JSON.stringify({id, path}),
                    credentials: 'include', 
                    headers: {'Content-Type': 'application/json'},
                })
                const {jwt} = await response.json();
                localStorage.setItem('jwt', jwt);
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleDrag(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault(e);
        const { files } = e.dataTransfer

        if (files.length === 1) {
            const img = {
                preview: URL.createObjectURL(files[0]),
                data: files[0],
            }
            setImage(img)
        } else {
            alert("please drop only one image");
            console.log(image);
        }
    }

    function handleDragOver(e) {
        e.preventDefault(e);
    }

    return (
        <div className="upload-img">
            <div className="w-100 h-100 position-fixed d-flex align-items-center justify-content-center bg-gray">
                <div className="rounded bg-light shadow-lg">
                    <div className='d-flex justify-content-end'>
                        <button type='button' className="btn btn-light d-flex" onClick={() => {
                            navigate('/user/edit')
                        }}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} onDragEnter={handleDrag} onDragOver = {handleDragOver} onDrop={handleDrop} className='px-5 pt-4 pb-5'>
                        <h4 className="text-center text-dark pb-4 fw-bold">Upload your images</h4>
                        <h5 className="text-center text-secondary pb-4 fw-light">File should be Jpeg, Png</h5>
                        {
                            image.preview ? 
                            <div className='text-center'>
                                <div className='pb-3'>
                                    <img className='image-preview' src={image.preview} />
                                </div>
                                <button type="button" className="btn btn-danger w-100 mb-3" onClick={() => {
                                    setImage({ preview: '', data: '' })
                                }}>Remove</button>
                                <button className='btn btn-primary w-100' type='submit'>Submit</button>
                            </div>
                            :
                            <div>
                                <div className="bg-gray p-5 img-drop rounded">
                                    <div>
                                        <div className="text-center pb-4">
                                            <span className="material-symbols-outlined icon opacity-75">cloud_upload</span>
                                        </div>
                                        <h5 className="text-secondary opacity-75">Drag & Drop your image here</h5>
                                    </div>
                                </div>
                                <h5 className="text-center text-secondary py-3 fw-light">Or</h5>
                                <div className='text-center'>
                                    <input 
                                        type="file"
                                        id="input-img-upload"
                                        name='avatar'
                                        className="d-none"
                                        onChange={e => {
                                            const img = {
                                                preview: URL.createObjectURL(e.target.files[0]),
                                                data: e.target.files[0],
                                            }
                                            setImage(img)
                                        }}
                                    />
                                    <label className='btn btn-primary' htmlFor="input-img-upload">Choose a file</label>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}