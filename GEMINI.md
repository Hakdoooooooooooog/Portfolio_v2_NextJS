# Workspace Rules

See [AGENTS.md](file:///e:/New%20Projects%202026/Portfolio_v2_NextJS/AGENTS.md) for editorial and project standards.

## Shell Execution Standard (Git Bash / NVM)

Node.js and npm are configured via NVM in Git Bash (`~/.nvm/versions/node/v24.21.0/bin/`).
PowerShell has no `node` or `npm` in its PATH, and `bash` in System32 invokes WSL (unconfigured).

Run all Node, npm, npx, and Next.js commands via Git Bash login shell:

```powershell
& "D:\Git\bin\bash.exe" -l -c "<command>"
```

## Path Sanitization Standard

Never display personal names or Windows username directories in documentation, committed files, or responses. Use `~`, `<USER>`, or `%USERPROFILE%`.

