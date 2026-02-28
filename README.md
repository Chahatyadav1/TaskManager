# 🗂️ TaskManager – End-to-End DevSecOps CI/CD Pipeline

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Jenkins](https://img.shields.io/badge/Jenkins-CI-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Security](https://img.shields.io/badge/DevSecOps-Enabled-red)
![License](https://img.shields.io/badge/Status-Active-success)

TaskManager is a Node.js application built to demonstrate a **production-style DevSecOps CI/CD pipeline** using Jenkins, security scanning tools, and Docker containerization.

This project showcases secure automation, code quality enforcement, and containerized deployment workflows.

---

# 🚀 Project Goals

- Implement CI/CD automation using Jenkins
- Integrate security scanning into pipeline (DevSecOps)
- Enforce static code quality checks
- Containerize application using Docker
- Follow production-grade DevOps practices

---

# 🏗️ Tech Stack

- **Node.js**
- **Jenkins (Declarative Pipeline)**
- **OWASP Dependency Check**
- **npm audit**
- **SonarQube**
- **Docker**
- **GitHub**

---

# 🛡️ DevSecOps Integration

Security is integrated at multiple stages:

- ✅ **npm audit** – Detects vulnerable packages
- ✅ **OWASP Dependency Check** – Advanced CVE scanning
- ✅ **SonarQube** – Static code analysis & quality gates
- ✅ Fail pipeline if quality gate fails

---

# 🐳 Docker Usage [Prerequisite: MongoDB]

### Build Image

```bash
docker run -d \
  --name mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -e MONGO_INITDB_DATABASE=taskdb \
  mongo:6
```
