-- 1. Tabela de Eventos (Atualizada para suportar Pedidos/Chamadas)
CREATE TABLE eventos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  requisitos TEXT, -- Para armazenar Lvl e Recompensas
  data_hora TIMESTAMPTZ, -- Pode ser NULL para "Pedidos de Ajuda"
  vagas INTEGER NOT NULL DEFAULT 4,
  tipo TEXT NOT NULL DEFAULT 'agendado' CHECK (tipo IN ('agendado', 'pedido')),
  conselho_supply TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Inscrições (Sem alterações necessárias)
CREATE TABLE inscricoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_id UUID REFERENCES eventos(id) ON DELETE CASCADE,
  jogador_nome TEXT NOT NULL,
  level INTEGER NOT NULL,
  vocacao TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar Realtime para as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE eventos;
ALTER PUBLICATION supabase_realtime ADD TABLE inscricoes;

-- 4. Inserir alguns eventos de teste (Opcional)
-- INSERT INTO eventos (nome, descricao, data_hora, vagas) VALUES 
-- ('Desert Quest', 'Necessário 1 de cada vocação level 20+', '2026-04-10 20:00:00+00', 4),
-- ('Demon Helmet', 'Blocker e Shooters level 100+', '2026-04-12 21:00:00+00', 10);

-- 5. Tabelas de Feedback Board
CREATE TABLE feedback_topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('sugestao', 'bug', 'discussao')),
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE feedback_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES feedback_topics(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Realtime para Feedback Board
ALTER PUBLICATION supabase_realtime ADD TABLE feedback_topics;
ALTER PUBLICATION supabase_realtime ADD TABLE feedback_comments;

-- 6. Tabela de Analytics (Visitas ao site)
CREATE TABLE site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visited_at TIMESTAMPTZ DEFAULT NOW(),
  path TEXT,
  user_agent TEXT
);

-- Habilitar Realtime para Analytics (opcional)
ALTER PUBLICATION supabase_realtime ADD TABLE site_visits;