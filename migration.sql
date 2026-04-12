-- ============================================
-- MIGRAZIONE: aggiungi colonna subtitle
-- Esegui nell'SQL Editor di Supabase
-- ============================================
ALTER TABLE articles ADD COLUMN IF NOT EXISTS subtitle TEXT DEFAULT '';

-- Aggiorna constraint sezione per usare nomi completi
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_section_check;
ALTER TABLE articles ADD CONSTRAINT articles_section_check 
  CHECK (section IN ('attualita', 'motori', 'tecnologia', 'echi'));

-- Aggiorna eventuali dati esistenti
UPDATE articles SET section = 'tecnologia' WHERE section = 'tech';
