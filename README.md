# La Specola — Osservare oggi per comprendere il domani

Blog di analisi e commento su attualità, motori, tecnologia e storia.

## Deploy su Vercel (passo passo)

### 1. Carica su GitHub
- Vai su github.com → "New repository" → nome: `la-specola`
- Trascina tutti questi file nella pagina del repository
- Clicca "Commit changes"

### 2. Esegui la migrazione Supabase
- Apri il tuo progetto Supabase → SQL Editor
- Incolla il contenuto di `migration.sql` e premi Run

### 3. Collega Vercel
- Vai su vercel.com → "New Project"
- Importa il repository `la-specola` da GitHub
- Nelle "Environment Variables" aggiungi:
  - `NEXT_PUBLIC_SUPABASE_URL` = https://cquyjijxqzlwqpssrcvv.supabase.co
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (la tua anon key)
  - `SUPABASE_SERVICE_ROLE_KEY` = (la tua service role key - in Project Settings > API)
  - `ADMIN_PASSWORD` = (scegli una password per il pannello admin)
  - `ANTHROPIC_API_KEY` = (la tua API key Anthropic per lo scanner)
  - `GEMINI_API_KEY` = (opzionale)
  - `OPENAI_API_KEY` = (opzionale)
- Clicca "Deploy"

### 4. Dominio personalizzato
- Su Vercel → Settings → Domains → aggiungi `laspecola.it`
- Configura i DNS del dominio come indicato da Vercel

## Pagine
- `/` → Sito pubblico (homepage con articoli)
- `/admin` → Pannello amministrativo (protetto da password)

## Struttura
```
app/
  page.js          → Homepage pubblica
  admin/page.js    → Pannello admin
  api/
    auth/route.js     → Autenticazione admin
    articles/route.js → CRUD articoli
    scan/route.js     → Scanner AI
lib/
  supabase.js      → Client Supabase
```
