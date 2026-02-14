# 🚀 Exfluencer VN - Quick Start

## 포트 설정
- **Exfluencer VN**: http://localhost:3001
- **BEATFOLIO**: http://localhost:3000

---

## 실행 방법

### Windows PowerShell

**터미널 1 - BEATFOLIO (포트 3000)**
```powershell
cd "C:\Users\user\OneDrive\민기현_SUPERS\신규 프로젝트\DJ247LIVE\beatfolio-package\beatfolio-v2.3-02030504\beatfolio-v2"
npm run dev
```

**터미널 2 - Exfluencer VN (포트 3001)**
```powershell
cd "C:\Users\user\OneDrive\민기현_SUPERS\슈퍼_익스플루언서\베트남\exfluencervn"
npm run dev
```

### WSL (Linux)

**터미널 1 - BEATFOLIO (포트 3000)**
```bash
cd "/mnt/c/Users/user/OneDrive/민기현_SUPERS/신규 프로젝트/DJ247LIVE/beatfolio-package/beatfolio-v2.3-02030504/beatfolio-v2"
npm run dev
```

**터미널 2 - Exfluencer VN (포트 3001)**
```bash
cd "/mnt/c/Users/user/OneDrive/민기현_SUPERS/슈퍼_익스플루언서/베트남/exfluencervn"
npm run dev
```

---

## 브라우저에서 접속

### Desktop
- **BEATFOLIO**: http://localhost:3000
- **Exfluencer VN**: http://localhost:3001

### Mobile (같은 WiFi)
컴퓨터 IP 확인:
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

모바일에서 접속:
- **BEATFOLIO**: http://YOUR_IP:3000
- **Exfluencer VN**: http://YOUR_IP:3001

예: http://192.168.1.100:3000, http://192.168.1.100:3001

---

## VSCode에서 두 프로젝트 열기

### 방법 1: 별도 창
1. VSCode 실행 → BEATFOLIO 폴더 열기
2. File → New Window
3. Exfluencer VN 폴더 열기

### 방법 2: Workspace (추천)
1. File → Add Folder to Workspace → BEATFOLIO 추가
2. File → Add Folder to Workspace → Exfluencer VN 추가
3. File → Save Workspace As → "my-projects.code-workspace"

---

## 터미널 단축키 (VSCode)

- **새 터미널**: Ctrl + Shift + `
- **터미널 분할**: Ctrl + Shift + 5
- **터미널 전환**: Ctrl + PageUp/PageDown

---

## 빠른 전환

### Chrome 북마크바
1. BEATFOLIO: http://localhost:3000
2. Exfluencer VN: http://localhost:3001

### 키보드 단축키
- **탭 전환**: Ctrl + Tab
- **탭 1로 이동**: Ctrl + 1
- **탭 2로 이동**: Ctrl + 2

---

## 개발 중 체크리스트

### BEATFOLIO 작업 중
- [ ] 터미널 1: BEATFOLIO dev server 실행 중
- [ ] 브라우저 탭: http://localhost:3000
- [ ] VSCode: BEATFOLIO 폴더

### Exfluencer VN 작업 중
- [ ] 터미널 2: Exfluencer VN dev server 실행 중
- [ ] 브라우저 탭: http://localhost:3001
- [ ] VSCode: Exfluencer VN 폴더

---

## 서버 종료

각 터미널에서:
```
Ctrl + C
```

---

## 트러블슈팅

### 포트 충돌
```bash
# 포트 3000 사용 중인 프로세스 확인
netstat -ano | findstr :3000

# 포트 3001 사용 중인 프로세스 확인
netstat -ano | findstr :3001

# 프로세스 종료 (Windows)
taskkill /PID <PID> /F
```

### 메모리 부족
- 작업하지 않는 프로젝트 서버 종료 (Ctrl+C)
- Chrome 탭 정리
- VSCode 재시작

### Hot Reload 안됨
1. 서버 재시작 (Ctrl+C → npm run dev)
2. 브라우저 하드 리프레시 (Ctrl+Shift+R)
3. .next 폴더 삭제 후 재시작

---

## 프로젝트 정보

| 항목 | BEATFOLIO | Exfluencer VN |
|------|-----------|---------------|
| 포트 | 3000 | 3001 |
| 시장 | 글로벌 (DJ/아티스트) | 베트남 (인플루언서) |
| 언어 | 6개국어 | 베트남어 |
| 통화 | USD | VND |
| 디자인 | 데스크탑 + 모바일 | 모바일 전용 |
| 색상 | Mint/Cyan | Red/Teal/Yellow |

---

**✨ 두 프로젝트 모두 준비 완료!**
