# Event Fiesta 🎉

**Simple Node.js + Express event registration demo**

## 🔧 Overview
A small Express server that serves a static front-end from `public/` and exposes secure registration, login and review endpoints backed by a MySQL database. Passwords are hashed with `bcrypt` and the server is configured to run on port `5000`.

## 🚀 Features
- Serve static site from `public/` (e.g., `public/index.html`) 🔗
- Registration (`POST /register`) with hashed passwords 🔒
- Login (`POST /login`) with password verification ✅
- Submit reviews (`POST /review`) ✍️

## ⚙️ Prerequisites
- Node.js (v16 or later recommended)
- MySQL server

## 🔁 Installation
1. Clone the repo or copy files into a folder.
2. Install dependencies:

```bash
npm install
```

3. Configure MySQL credentials (recommend using environment variables). By default the app reads the connection values in `server.js`:

```js
host: 'localhost',
user: 'root',
password: 'admin@321',
database: 'event_fiesta'
```

> ⚠️ **Do not** keep production credentials in source control. Use a `.env` file or your environment's secret manager.

4. Create the database and tables (example):

```sql
CREATE DATABASE IF NOT EXISTS event_fiesta;
USE event_fiesta;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  gender VARCHAR(50),
  session_pref VARCHAR(100),
  phone VARCHAR(50)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  rating INT,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ▶️ Run the server
Start the server directly with Node:

```bash
node server.js
```

Or add a convenient `start` script to `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Then run:

```bash
npm start
```

The site will be available at: `http://localhost:5000`

## 🧪 API Endpoints
- POST `/register` — body: `{ fullname, email, password, gender, session, phone }` → returns success/failure message
- POST `/login` — body: `{ email, password }` → returns `{ success: true|false, message }`
- POST `/review` — body: `{ reviewName, rating, feedback }` → returns confirmation

Example `curl` for registration:

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Jane Doe","email":"jane@example.com","password":"secret","gender":"F","session":"morning","phone":"1234567890"}'
```

## 🔐 Security Notes
- Passwords are hashed with `bcrypt` in `server.js`.
- Use environment variables (e.g., via `dotenv`) for DB credentials.
- Consider adding input validation, HTTPS, rate limiting, and session management for production.

## ♻️ Contributing
Feel free to open issues or submit pull requests. Add tests and improve security before production deployment.

## 📄 License
This project is available under the **MIT License** — see `LICENSE` for details.

---

_If you want, I can add a `start` script to `package.json`, add a `.env` example, or expand the API docs with sample requests._
