# ✅ VerificarEmails Node for n8n

This is a **custom n8n node** that allows you to verify email addresses using the official API of [VerificarEmails.com](https://www.verificaremails.com/).

It performs a **single email validation** request and returns the result status (e.g. `ok_for_all`, `invalid`, etc.).

---

## 🚀 Installation (Self-hosted n8n)

### 1. 📥 Clone this repository

```bash
git clone https://github.com/apousb/Verificaremails_n8n_email.git
cd Verificaremails_n8n_email
```

### 2. 📦 Install dependencies and build

```bash
npm install
npm run build
```

### 3. 🔗 Link the node globally

```bash
npm link
```

### 4. 🔗 Link it into your n8n instance

```bash
cd /path/to/your/n8n
npm link @verificaremails/email-validation-node
```

### 5. 🔄 Restart your n8n instance

#### Using PM2:
```bash
pm2 restart n8n
```

#### Using Docker:
```bash
docker restart <your-n8n-container-name>
```

---

## 🔐 Setup Credentials

1. Go to **Credentials** in n8n
2. Create new → Select **Verificaremails API**
3. Enter your `auth-token` from:
   [https://dashboard.verificaremails.com](https://dashboard.verificaremails.com)
4. Save and assign it to the node

---

## 🧪 Node Output Example

```json
{
  "email": "name@example.com",
  "status": "ok_for_all",
  "result_type": "Inconclusive",
  "result_code": "114"
}
```

---

## 📘 API Reference

**GET**  
`https://dashboard.verificaremails.com/myapi/email/validate/single?auth-token=...&term=email@example.com`

More info at: [https://www.verificaremails.com/docs/](https://www.verificaremails.com/docs/)

---

## 🙌 Credits

Made by [VerificarEmails.com](https://www.verificaremails.com) — the all-in-one platform to verify emails, phones, names, and postal addresses.

---

## 📄 License

MIT
