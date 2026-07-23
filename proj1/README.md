\# 📸 Mini MERN Image Feed App



A beginner-friendly \*\*MERN\*\* project where users can:



\- Upload an \*\*image + caption\*\*

\- Store image in a cloud service (\*\*ImageKit\*\*)

\- Store post metadata in \*\*MongoDB\*\*

\- View all posts in a \*\*Feed\*\* page



This project helped me learn:



\- Building REST APIs with Express

\- File upload handling with Multer

\- Cloud upload flow (ImageKit)

\- MongoDB integration with Mongoose

\- Frontend ↔ Backend communication with Axios

\- CORS for cross-origin requests

\- Routing with React Router



\---



\## 🧩 Tech Stack



\### Frontend

\- React

\- React Router DOM

\- Axios



\### Backend

\- Node.js

\- Express

\- Multer

\- CORS

\- Dotenv



\### Database

\- MongoDB

\- Mongoose



\### Cloud Storage

\- ImageKit (for image hosting)



\---



\## 📁 Project Structure (Simplified)



```bash

project-root/

│

├── backend/

│   ├── server.js

│   └── src/

│       ├── app.js

│       ├── db/

│       │   └── db.js

│       ├── models/

│       │   └── post.model.js

│       └── services/

│           └── storage.services.js

│

└── frontend/

&#x20;   └── src/

&#x20;       ├── App.jsx

&#x20;       └── pages/

&#x20;           ├── CreatePost.jsx

&#x20;           └── Feed.jsx

```



\---



\## ⚙️ Environment Variables



Create a `.env` file in backend root:



```env

MONGO\_DB\_URI=your\_mongodb\_connection\_string

IMAGE\_KIT\_PRIVATE\_KEY=your\_imagekit\_private\_key

```



> `dotenv` loads these values into `process.env`.



\---



\## 🚀 Routes / APIs



\### `POST /create-post`

Uploads one image and one caption.



\- Expects `multipart/form-data`

\- File field name: `image`

\- Text field name: `caption`



Response:

\- `201 Created`

\- Created post object with image URL and caption



\---



\### `GET /posts`

Returns all posts from MongoDB.



Response:

\- `200 OK`

\- Array of posts



\---



\## 🔄 Complete Data Flow (Upload ➜ Feed)



Below is the full flow from user action to feed rendering.



\---



\### 1) User selects image + caption in `CreatePost`

\- Component: `CreatePost.jsx`

\- Form contains:

&#x20; - `<input type="file" name="image" />`

&#x20; - `<input type="text" name="caption" />`



When user clicks \*\*Submit\*\*:

\- `handleSubmit` runs

\- `e.preventDefault()` stops page reload

\- `new FormData(e.target)` collects both values



\---



\### 2) Frontend sends request to backend

`axios.post('http://localhost:3000/create-post', formData)`



Payload format:

\- `multipart/form-data`

\- Includes binary image file + caption text in same request body



\---



\### 3) Express route receives request

In `app.js`:



```js

app.post("/create-post", upload.single("image"), async (req, res) => { ... })

```



Important middleware:

\- `upload.single("image")` from Multer

\- Reads one file from field name `"image"`

\- Stores it in RAM (`memoryStorage`)

\- File available at `req.file.buffer`

\- Caption available at `req.body.caption`



\---



\### 4) Image is uploaded to ImageKit

In `storage.services.js`:



\- `uploadFile(req.file.buffer)` is called

\- Buffer converted to base64 string

\- ImageKit upload API is called

\- ImageKit returns upload result (including hosted URL)



\---



\### 5) Post data saved in MongoDB

After successful cloud upload:



```js

postModel.create({

&#x20; image: result.url,

&#x20; caption: req.body.caption

})

```



So DB stores:

\- `image`: cloud-hosted image URL

\- `caption`: user text



Schema (`post.model.js`):

\- `image: String`

\- `caption: String`



\---



\### 6) Backend returns success response

`POST /create-post` response contains created post object.



Frontend then runs:

```js

navigate('/feed')

```



User is redirected to Feed page.



\---



\### 7) Feed page fetches all posts

In `Feed.jsx`:



\- `useEffect(() => {...}, \[])` runs once on mount

\- Calls `axios.get('http://localhost:3000/posts')`

\- Backend runs `postModel.find()`

\- Returns all posts

\- Frontend stores them with `setPosts(...)`



\---



\### 8) Feed UI renders posts

`posts.map(...)` creates cards:



\- `<img src={post.image} />`

\- `<p>{post.caption}</p>`



Now the user sees the uploaded post in feed 🎉



\---



\## 🧠 Visual Sequence (Quick Architecture)



```text

\[User Form]

&#x20;  │

&#x20;  │ Submit (image + caption)

&#x20;  ▼

\[React CreatePost]

&#x20;  │ axios.post(FormData)

&#x20;  ▼

\[Express POST /create-post]

&#x20;  │

&#x20;  ├─ Multer parses multipart/form-data

&#x20;  │    ├─ req.file.buffer (image)

&#x20;  │    └─ req.body.caption (text)

&#x20;  │

&#x20;  ├─ uploadFile(buffer) → ImageKit

&#x20;  │    └─ returns hosted image URL

&#x20;  │

&#x20;  └─ MongoDB create({ image:url, caption })

&#x20;       └─ saved post document

&#x20;  ▼

\[Response 201]

&#x20;  ▼

\[navigate('/feed')]

&#x20;  ▼

\[React Feed]

&#x20;  │ axios.get('/posts')

&#x20;  ▼

\[Express GET /posts] → MongoDB find()

&#x20;  ▼

\[Feed renders image + caption cards]

```



\---



\## 🛠️ How to Run Locally



\### Backend

```bash

cd backend

npm install

npm run dev

\# or: node server.js

```



\### Frontend

```bash

cd frontend

npm install

npm run dev

```



Open frontend URL shown by Vite/CRA.



\---



\## ✅ What This Project Demonstrates



\- End-to-end file upload pipeline

\- Browser form-data handling

\- API design for create/fetch flow

\- Cloud storage + DB integration

\- React routing and page transitions

\- Basic but complete full-stack feature



\---



\## 🔒 Current Limitations (Good next improvements)



\- No validation for file type/size on backend

\- No error handling with try/catch in APIs yet

\- No loading states / toast messages on frontend

\- No authentication

\- No delete/edit post



\---



\## 🌱 Future Enhancements



\- Add backend `try/catch` and global error middleware

\- Add multer file filters (image only, max size)

\- Add user auth (JWT)

\- Add pagination in feed

\- Add like/comment feature

\- Add deployment (Frontend + Backend + DB)



\---



\## 🙌 Learning Outcome



This mini project gives a practical understanding of:



1\. \*\*How files move from browser to server\*\*

2\. \*\*How server pushes files to cloud\*\*

3\. \*\*How only metadata is stored in DB\*\*

4\. \*\*How frontend fetches and renders stored data\*\*



A complete beginner-to-intermediate MERN workflow in one small app.



\---



If you are revising later, just remember this one line:



> \*\*FormData → Multer Buffer → ImageKit URL → MongoDB Save → Feed Fetch → UI Render\*\*

