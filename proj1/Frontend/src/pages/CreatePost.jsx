import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate() // Hook to redirect user to another route programmatically

    const handleSubmit = async (e) => {

        // Prevents the browser from refreshing the page when the form is submitted.
        e.preventDefault()

        /*
        e.target refers to the <form> element because the submit event
        originates from the form.

        new FormData(e.target) automatically scans every input inside the form
        that has a "name" attribute and collects their values.

        In this form it creates something like:

        image   -> selected image file
        caption -> text entered by the user

        Think of it like collecting a completely filled registration form
        instead of reading each input individually.

        FormData is especially useful when uploading files because it can
        store both text data and binary files together in a format that
        browsers and servers understand (multipart/form-data).
        */
        const formData = new FormData(e.target)

        /*
        axios sends the FormData object to the backend.

        The request body will contain:
            image   = uploaded image
            caption = user's caption

        The backend can then extract both values from the request.
        */
        axios.post('http://localhost:3000/create-post', formData)
            .then((res) => {
                // On successful upload + DB save, move user to feed page
                navigate('/feed')
            })
            .catch((err) => {
                // Log error if API call fails
                console.log(err)
            })
    }

    return (
        <section className='create-post'>
            {/* When Submit is clicked, handleSubmit receives the form event */}
            <form onSubmit={handleSubmit}>

                {/* File selected by the user.
                   FormData stores the actual File object, not just its name. */}
                <input
                    type="file"
                    name="image"
                    accept="image/*" // Only image files can be selected in file picker
                />

                {/* Text entered by the user.
                   FormData stores this as a normal string. */}
                <input
                    type="text"
                    name="caption"
                    placeholder="Enter Caption"
                    required // Prevent empty caption submission
                />

                <button type="submit">
                    Submit File
                </button>
            </form>
        </section>
    )
}

export default CreatePost // Export page component for router usage