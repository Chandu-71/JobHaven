# JobHaven – Job Portal Web App
[![Live Demo](https://img.shields.io/badge/Live%20Site-Visit-brightgreen?style=flat&logo=vercel)](https://jobhaven-portal.vercel.app/)

A full-stack job portal that connects job seekers and recruiters seamlessly. Built using the MERN stack with modern UI libraries and authentication via Clerk.

## ✨ Features

### 👤 For Job Seekers (Users)
- **Authentication**: Secure sign-in/sign-up with [Clerk](https://clerk.dev).
- **Homepage**: Browse all job listings right after logging in.
- **Filtering**: Search and filter jobs by keyword, category, or location.
- **Job Details**: Click on a job to view its full description and see more jobs from the same company.
- **Apply to Jobs**: Users can apply to jobs **only after uploading a resume**.
- **Resume Upload**: Resume can be uploaded or re-uploaded from the "View Applied Jobs" page.
- **Application Status**: View all applied jobs and track status – Accepted, Rejected, or Pending.
- **Sign Out**: Simple logout functionality provided.

### 🧑‍💼 For Recruiters
> Recruiters don’t use Clerk authentication.

- **SignUp**: Manual signup with email, setpassword, name and company logo input.
- **Login**: Manual login with email and password input.
- **Dashboard Sections**:
  - **Add Jobs**: Post a new job with title, description, category, location, and salary.
  - **Manage Jobs**: Control job visibility and see the number of applicants.
  - **View Applications**: Review applicants, download their resume, and accept or reject candidates.

---

## ⚙️ Tech Stack

| Frontend         | Backend           | Database     | Others                     |
|------------------|-------------------|--------------|----------------------------|
| React.js         | Express.js        | MongoDB      | Clerk (user auth)         |
| Tailwind CSS     | Node.js           |              | Mantine (UI components)   |
| Axios            |                   |              | Sentry (error monitoring) |
|                  |                   |              | Cloudinary (file upload)  |
|                  |                   |              | CORS, Svix (webhooks)     |

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Chandu-71/JobHaven.git
   cd jobhaven

2. **Set up the frontend**
    ```bash
   cd job-haven
   npm i
   npm run dev

4. **Set up the backend**
   ```bash
   cd server
   npm i
   npm run server
   
5. **Create .env file in /job-haven with appropriate keys:**
    ```bash
    VITE_CLERK_PUBLISHABLE_KEY
    VITE_BACKEND_URL

6. **Create .env file in /server with appropriate keys:**
    ```bash
    JWT_SECRET
    
    MONGODB_URI
    
    CLOUDINARY_NAME
    CLOUDINARY_API_KEY
    CLOUDINARY_SECRET_KEY
    
    CLERK_WEBHOOK_SECRET
    CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY
