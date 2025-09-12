# Local Installation (Development) — VerificarEmails n8n Node

This guide explains how to run this **custom n8n node in development mode**, without publishing it as a Community Node. You will build the node on your host and load it into your n8n instance.

> Supported services:
> - Email validation
> - Phone validation – HLR Lookup
> - Phone validation – MNP
> - Phone validation – Syntactic
> - Postal Address validation
> - Name/Surname/Gender validation
> - Name/Surname correction *(JSON `term`)*
> - Name/Surname autocomplete *(JSON `term`)*


## 1) Prerequisites

- **Node.js ≥ 18** and **npm**
- **TypeScript** (installed via `npm install` in this repo)
- An **n8n** instance (Docker Compose recommended)
- Access to your n8n data directory inside the container: `/home/node/.n8n`
- (Recommended) Environment variable in your n8n service:
  ```yaml
  # docker-compose.yml
  services:
    n8n:
      environment:
        - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
  ```


## 2) Get the code & build

On your host machine:

```bash
# Clone or update the repo
git clone https://github.com/apousb/Verificaremails_n8n_email.git verificaremails-email-dev
cd verificaremails-email-dev

# Clean install and build
rm -rf node_modules package-lock.json
npm install
npm run build

# (Optional) verify the icon is in the expected location
ls -la dist/nodes/Verificaremails/verificaremails.svg
```
> The node expects the icon at: `icon: 'file:nodes/Verificaremails/verificaremails.svg'`.


## 3) Load the node into n8n

You have **two options**. Pick one.

### Option A — Bind mount (recommended for live editing)

Mount your local code into the container read-only and **link** it into `~/.n8n/node_modules`:

1. Edit your `docker-compose.yml` (paths are examples):
   ```yaml
   services:
     n8n:
       volumes:
         - n8n_data:/home/node/.n8n
         - /root/verificaremails-email-dev:/home/node/.n8n/custom/verificaremails-email-dev:ro
   ```

2. Recreate n8n so the mount appears:
   ```bash
   docker compose up -d --force-recreate --no-deps n8n
   docker compose exec n8n sh -lc "ls -la /home/node/.n8n/custom/verificaremails-email-dev"
   ```

3. Create a local symlink so n8n can resolve the package:
   ```bash
   docker compose run --rm --no-deps --entrypoint sh n8n -lc '     PKG_DIR="/home/node/.n8n/custom/verificaremails-email-dev";      PKG_NAME=$(node -p "require("$PKG_DIR/package.json").name");      mkdir -p /home/node/.n8n/node_modules;      if echo "$PKG_NAME" | grep -q "@"; then        SCOPE=$(echo "$PKG_NAME" | cut -d/ -f1); NAME=$(echo "$PKG_NAME" | cut -d/ -f2);        mkdir -p "/home/node/.n8n/node_modules/$SCOPE";        ln -sfn "$PKG_DIR" "/home/node/.n8n/node_modules/$SCOPE/$NAME";      else        ln -sfn "$PKG_DIR" "/home/node/.n8n/node_modules/$PKG_NAME";      fi;      ls -l /home/node/.n8n/node_modules    '
   ```

4. Restart n8n:
   ```bash
   docker compose restart n8n
   docker compose logs -f n8n
   ```

> Now every time you `npm run build` on the host, n8n will use the updated files after a restart.


### Option B — Copy the build into the container (simple & stable)

1. Ensure your n8n container is up:
   ```bash
   docker compose up -d n8n
   CID=$(docker compose ps -q n8n)
   ```

2. Copy the **built artifacts only**:
   ```bash
   docker compose exec -u root n8n sh -lc 'mkdir -p /home/node/.n8n/custom/verificaremails-email-dev'
   docker cp package.json "$CID":/home/node/.n8n/custom/verificaremails-email-dev/
   docker cp dist "$CID":/home/node/.n8n/custom/verificaremails-email-dev/ -a
   docker compose exec -u root n8n sh -lc 'chown -R node:node /home/node/.n8n/custom/verificaremails-email-dev'
   ```

3. Create a local symlink so n8n can resolve the package (only once):
   ```bash
   docker compose run --rm --no-deps --entrypoint sh n8n -lc '     PKG_DIR="/home/node/.n8n/custom/verificaremails-email-dev";      PKG_NAME=$(node -p "require("$PKG_DIR/package.json").name");      mkdir -p /home/node/.n8n/node_modules;      if echo "$PKG_NAME" | grep -q "@"; then        SCOPE=$(echo "$PKG_NAME" | cut -d/ -f1); NAME=$(echo "$PKG_NAME" | cut -d/ -f2);        mkdir -p "/home/node/.n8n/node_modules/$SCOPE";        ln -sfn "$PKG_DIR" "/home/node/.n8n/node_modules/$SCOPE/$NAME";      else        ln -sfn "$PKG_DIR" "/home/node/.n8n/node_modules/$PKG_NAME";      fi;      ls -l /home/node/.n8n/node_modules    '
   ```

4. Restart n8n:
   ```bash
   docker compose restart n8n
   docker compose logs -f n8n
   ```

> For updates, re-run **Step 2** (copy `dist/` + restart). No need to recreate the symlink.


## 4) Configure credentials

In n8n: **Settings → Credentials → VerificarEmails API**  
Provide your API token. The same token is used for all services.


## 5) Use the node

- Drag **VerificarEmails** into a workflow.
- Choose a **Service**:
  - Email validation
  - Phone validation – HLR Lookup
  - Phone validation – MNP
  - Phone validation – Syntactic
  - Postal Address validation
  - Name/Surname/Gender validation
  - Name/Surname correction *(JSON term)*
  - Name/Surname autocomplete *(JSON term)*

### About Name Correction / Autocomplete (JSON `term`)
These two services require a JSON object encoded in the `term` query parameter. The node builds it for you from:
- **Name** (required) → `name`
- **Type** (required: *First name* = `1`, *Surname* = `0`) → `use_first_names`
- **Gender** (optional: `M`|`F`)
- **Country** (optional: ISO Alpha-2 code, e.g. `ES`)

Example effective payload:
```json
{"name":"Antonio","use_first_names":1,"gender":"M","country":"ES"}
```
The node encodes this payload into the request URL automatically.


## 6) Troubleshooting

- **Icon not visible**
  - Make sure the icon is located at: `dist/nodes/Verificaremails/verificaremails.svg`
  - Node/credential should reference: `icon: 'file:nodes/Verificaremails/verificaremails.svg'`
  - Hard refresh the browser (Ctrl/Cmd+Shift+R) and restart n8n after a new build.

- **Permissions (EACCES) or read-only**
  - Avoid `npm install` inside `/home/node/.n8n/custom/...`.
  - If files were copied as root, fix ownership:
    ```bash
    docker compose exec -u root n8n sh -lc 'chown -R node:node /home/node/.n8n'
    ```

- **Bind mount not visible in the container**
  - Use an **absolute path** in `docker-compose.yml` and `--force-recreate`:
    ```bash
    - /absolute/path/verificaremails-email-dev:/home/node/.n8n/custom/verificaremails-email-dev:ro
    ```

- **n8n won’t start after changes**
  - Check logs: `docker compose logs -f n8n`
  - Verify `package.json` → `"n8n"` block points to **compiled** JS in `dist/` (not TS in `src/`).


## 7) Uninstall / Cleanup

```bash
# Remove symlink and custom folder (inside container)
docker compose run --rm --no-deps --entrypoint sh n8n -lc '  rm -rf /home/node/.n8n/node_modules/@verificaremails/email-validation-node          /home/node/.n8n/node_modules/n8n-nodes-verificaremails-email          /home/node/.n8n/custom/verificaremails-email-dev || true '
docker compose restart n8n
```

---

## Dev loop tips

- Keep a terminal running `docker compose logs -f n8n` while iterating.
- Use TypeScript watch mode on host:
  ```bash
  npx tsc -w
  ```
- After each build, **restart n8n** to reload the node class.

Happy building! 🚀
