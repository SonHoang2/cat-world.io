import {useState} from 'react'
import { baseURL } from './App'
import { useContext } from "react";
import { UserContext } from "./App";

export default function UploadImg () {
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const user = useContext(UserContext);
    console.log(user);
    async function handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('avatar', image.data)
        const res = await fetch(baseURL + '/image', {
            method: "POST",
            body: formData,
        })
        const data = await res.json();
        console.log(data);
        if (res) {
            setStatus(res.statusText)
            const id = user.id;
            const path = data.path;
            const response = await fetch(baseURL + '/updateAvatar', {
                method: "POST",
                body: JSON.stringify({id, path}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            })
            const data2 = await response.json();
            console.log(data2);
        }
    }
    return (
        <div className="upload-img">
            <div className="w-100 h-100 position-fixed d-flex align-items-center justify-content-center bg-gray">
                <form onSubmit={handleSubmit} className="p-5 rounded bg-light shadow-lg">
                    <h4 className="text-center text-dark pb-4 fw-bold">Upload your images</h4>
                    <h5 className="text-center text-secondary pb-4 fw-light">File should be Jpeg, Png</h5>
                    {
                        image.preview ? 
                        <div className='text-center'>
                            <div className='pb-3'>
                                <img style={{width: 300}} src={image.preview} />
                            </div>
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
                {status && <h4 className='text-center'>{status}</h4>}
                </form>
            </div>
        </div>
    )
}