#!/usr/bin/env bash
# Bucle autónomo: relanza sesiones de Claude Code hasta que exista DONE.md.
# Uso: ./run.sh            (desde la carpeta del proyecto, o vía lanzar.ps1)
cd "$(dirname "$0")" || exit 1

# Herramientas (nvm y Claude Code) aunque se lance desde PowerShell con bash -lc
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
export PATH="$HOME/.local/bin:$PATH"

# Perfil de cuenta (personal o uria): token de GitHub, cuenta e identidad Git
[ -f .perfil ] || { echo "Falta el archivo .perfil (personal o uria)"; exit 1; }
PERFIL=$(tr -d '[:space:]' < .perfil)
ENV_PERFIL="$HOME/.config/autonomo/$PERFIL.env"
[ -f "$ENV_PERFIL" ] || { echo "No existe $ENV_PERFIL"; exit 1; }
. "$ENV_PERFIL"

# Claves de staging del proyecto
[ -f .env.local ] && { set -a; . ./.env.local; set +a; }

command -v claude >/dev/null || { echo "No encuentro claude en el PATH"; exit 1; }
[ -d node_modules ] || npm ci

mkdir -p logs
anterior=""; sin_avance=0
for vuelta in $(seq 1 500); do
  [ -f DONE.md ] && { echo "Terminado: ver DONE.md" | tee -a logs/run.log; break; }
  echo "=== Vuelta $vuelta · $(date '+%F %T') · perfil $PERFIL" | tee -a logs/run.log
  if claude -p "$(cat PROMPT.md)" --dangerously-skip-permissions --max-turns 150 >> logs/run.log 2>&1; then
    git fetch -q origin 2>/dev/null
    actual=$(git rev-parse origin/main 2>/dev/null)
    if [ "$actual" = "$anterior" ]; then sin_avance=$((sin_avance + 1)); else sin_avance=0; fi
    anterior=$actual
    if [ "$sin_avance" -ge 4 ]; then
      echo "Sin avance en main en 4 vueltas: revisa PROGRESS.md" | tee -a logs/run.log
      break
    fi
    # Trae a local lo fusionado (DONE.md llega por PR)
    git switch -q main 2>/dev/null && git pull -q --ff-only 2>/dev/null
  else
    echo "Sesión cortada (cuota o error). Espero 20 min · $(date '+%T')" | tee -a logs/run.log
    sleep 1200
  fi
done
