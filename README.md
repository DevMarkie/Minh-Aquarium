# Minh-Aquarium

## Chay voi Docker trong VS Code

### 1) Khoi dong container

```bash
docker compose up -d --build
```

Sau khi chay:

- MySQL: `localhost:3307`
- API Express: `http://localhost:3000`

### 2) Kiem tra container

```bash
docker compose ps
docker compose logs -f api
```

### 3) Dung va xoa container

```bash
docker compose down
```

Neu muon xoa ca du lieu MySQL volume:

```bash
docker compose down -v
```
