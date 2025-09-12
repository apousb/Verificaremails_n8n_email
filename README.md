# VerificarEmails Node for n8n

Custom node to validate a single email via VerificarEmails API.

## Install (self‑hosted n8n)

```bash
git clone https://github.com/apousb/Verificaremails_n8n_email.git
cd Verificaremails_n8n_email

# IMPORTANT: clean previous cache/locks if you tried older versions
rm -rf node_modules package-lock.json
npm cache clean --force

npm install
npm run build
npm link

# Link into your n8n installation
cd /path/to/your/n8n
npm link n8n-nodes-verificaremails-email

# Restart n8n
pm2 restart n8n   # or: docker restart <n8n-container>
```

## Install

In n8n → **Settings → Community Nodes → Install**: