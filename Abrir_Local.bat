@echo off
REM Abre o Arbitra num servidor local (necessario para o login funcionar fora do site publicado)
cd /d "%~dp0"
where python >nul 2>nul || (echo Python nao encontrado. Instale em https://www.python.org && pause && exit /b)
start "" http://localhost:8080
python -m http.server 8080
