# Testes de Performance com K6 – BlazeDemo

Este repositório contém um **script de performance com K6** simulando o fluxo completo de **compra de passagem aérea** no site:

 https://www.blazedemo.com

O objetivo é validar o comportamento da aplicação sob carga e pico, mensurando tempos de resposta e garantindo que o sistema suporte o volume esperado.

##  Cenário de Teste

Fluxo executado:

1. Acessar a página inicial  
2. Buscar voos válidos (origem → destino)  
3. Selecionar um voo  
4. Finalizar compra  
5. Validar sucesso do processo  

##  Critérios de Aceitação

- **250 requisições por segundo (RPS)**  
- **90º percentil do tempo de resposta < 2 segundos**  
- Compra deve ser concluída com sucesso

##  Pré-requisitos

Antes de executar os testes, instale:

### 1. Node.js (v16+)

https://nodejs.org

### 2. Instalar o K6

**Windows (Chocolatey):**
```bash
choco install k6
```

**Linux (APT):**
```bash
sudo apt update
sudo apt install k6
```

**Docker (sem instalar localmente):**
```bash
docker run -it --rm -v ${PWD}:/scripts grafana/k6 run .\blazedemo-performance.js
```

##  Como Executar os Scripts

### 🔹 Teste de carga
```bash
k6 run .\blazedemo-performance.js
```

### 🔹 Teste de pico (Spike Test)
```bash
k6 run .\blazedemo-spike.js
```

##  Resultados e Métricas

Durante a execução, o K6 exibirá:

- Requisições por segundo atingidas  
- Sucesso das requisições (checks)  
- Tempos de resposta (avg, med, p90, p95)  
- Erros  
- VUs utilizados  

O teste será **aprovado** se:

- O fluxo completo concluir com sucesso  
- **p(90) < 2s**  
- A taxa-alvo de **250 RPS** for atingida  

##  Exportar Logs e Relatórios (Opcional)

Gerar saída JSON:
```bash
k6 run .\blazedemo-performance.js --out json=results.json
```

Gerar relatório HTML (k6-reporter):
```bash
set “K6_WEB_DASHBOARD=true”
k6 run --out web-dashboard=export=test-report.html .\blazedemo-performance.js
```

