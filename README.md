# 🛒 E-Commerce Web App (Next.js & Prisma)

A full-stack e-commerce application built with **Next.js**, **Tailwind CSS**, **Prisma**, and **MongoDB**. This project includes user authentication, product listing, cart functionality.

---

## 📸 Screenshots

![Dashboard Screenshot](https://i.ibb.co/LH914HQ/image.png)  
![item details view](https://i.ibb.co/j9p8DYm2/image.png)
![shipping details view](https://i.ibb.co/TM3jsJdY/image.png)
![cart details view](https://i.ibb.co/yB8qkRnQ/image.png)
![login page view](https://i.ibb.co/spn0JdSw/image.png)
![register page view](https://i.ibb.co/4ZShP5yn/image.png)
![profile page view](https://i.ibb.co/8n1BPh4x/image.png)



---

## 🚀 Features

- ✅ User registration and login using both credential method and git hub O auth method
- ✅ email verify after successfull registration using RESEND
- ✅ View all products and filter by category
- ✅ View profile page details and edit details
- ✅ Add to cart and manage cart items
- ✅ Simple Checkout functionality 
- ✅ UI using Tailwind CSS and shadcn
- ✅ Redux Toolkit for cart and global state management
- ✅ Product images and descriptions
- ✅ Toast notifications for success/errors
- ✅ used Zod for data validation
---

## 🛠️ Tech Stack

- **Frontend & Backend:** Next.js 14 (App Router), Tailwind CSS, Redux Toolkit  
- **Database:** MongoDB with Prisma ORM  
- **Authentication:** NextAuth.js  
- **Libraries & Tools:**  dotenv, bcrypt, React Toastify, Zod

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jazimahmed/ecomwebsite.git
cd ecomwebsite

```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```
### 3. **Setup Environment Variables**
Add the following in `.env` (env should under root folder):

```
DATABASE_URL=your_database_url_here
RESEND_API_KEY=some_value_here
```

Add the following in `.env.local` (env should under root folder):

```
AUTH_SECRET=some_value_here
AUTH_GITHUB_SECRET=some_value_here
AUTH_GITHUB_ID=some_value_here
NEXT_PUBLIC_BASE_URL=some_value_here
RESEND_TEST_EMAIL=some_value_here  #it should be the mail address used to create the account in "resend"

```
 if you have still confusion see the .env.example file inside project root
### 4. **Setup Prisma**

```bash
npx prisma generate
npx prisma db push
```
### 5. **run the app**

```bash
npm run dev
# or
yarn dev
```
### 6. **open the browser**

```bash
Go to: http://localhost:3000
```



---

## 🙌 Author

**Jazim Ahmed**  
📧 mohamedjazim800@gmail.com  
🔗 [GitHub](https://github.com/jazimahmed)

---

## ⭐ Give a Star!

If you found this helpful or interesting, feel free to star the repo ✨
