# ✅ VerificarEmails Node for n8n

This is a **custom n8n node** that allows you to verify email addresses using the official API of [VerificarEmails.com](https://www.verificaremails.com/).

It performs a **single email validation** request and returns the result status (e.g. `ok_for_all`, `invalid`, etc.).

---

## 📦 Features

- Validates one email per execution.
- Uses VerificarEmails' real-time API via simple GET request.
- Secure API key configuration via n8n credentials.
- Lightweight and easy to install in any self-hosted n8n instance.

---

## 🚀 Installation (Self-hosted n8n)

1. Download or clone this repository:

```bash
git clone https://github.com/apousb/Verificaremails_n8n_email.git
```

2. Go into the directory and install dependencies:

```bash
cd email-validation-node-n8n
npm install
npm run build
```

3. Link the custom node into your n8n instance:

```bash
npm link
cd /path/to/your/n8n
npm link @verificaremails/email-validation-node
```

4. Restart n8n:

```bash
pm2 restart n8n
# OR
docker restart n8n
```

The node should now appear inside the **"Nodes from External Modules"** section in the n8n UI.

---

## 🔐 Credentials

Before using the node, set up the **Verificaremails API** credential inside n8n:

1. Go to **Credentials → Create new**
2. Choose **"Verificaremails API"**
3. Paste your `auth-token` from [https://dashboard.verificaremails.com/](https://dashboard.verificaremails.com/)
4. Save and use it in your node configuration

---

## 🧪 Example Use

### Node Input:

| Parameter | Value               |
|----------:|---------------------|
| Email     | `name@example.com` |

### Node Output:

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

This node uses the endpoint:

```
GET https://dashboard.verificaremails.com/myapi/email/validate/single
```

Documentation: [https://www.verificaremails.com/docs/](https://www.verificaremails.com/docs/)

---

## 🙌 Credits

Built by [VerificarEmails.com](https://www.verificaremails.com/) — the all-in-one platform to validate emails, phones, names, and addresses.

---

## 📄 License

MIT
