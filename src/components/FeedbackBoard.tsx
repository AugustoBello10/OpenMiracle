import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, ChevronRight, MessageCircle, Clock, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Comment {
  id: string;
  topic_id: string;
  author: string;
  content: string;
  created_at: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
  likes: number;
  comments: Comment[];
  category: 'sugestao' | 'bug' | 'discussao';
}

interface FeedbackBoardProps {
  language: 'pt' | 'en';
}

export const FeedbackBoard: React.FC<FeedbackBoardProps> = ({ language }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [newTopicAuthor, setNewTopicAuthor] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState<'sugestao' | 'bug' | 'discussao'>('sugestao');

  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const fetchTopicsAndComments = async () => {
    try {
      setIsLoading(true);
      const { data: topicsData, error: topicsError } = await supabase
        .from('feedback_topics')
        .select('*')
        .order('created_at', { ascending: false });

      if (topicsError) throw topicsError;

      const { data: commentsData, error: commentsError } = await supabase
        .from('feedback_comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      const formattedTopics: Topic[] = (topicsData || []).map(t => ({
        ...t,
        comments: (commentsData || []).filter(c => c.topic_id === t.id)
      }));

      setTopics(formattedTopics);
      
      // Update selected topic if it exists
      if (selectedTopic) {
        const updated = formattedTopics.find(t => t.id === selectedTopic.id);
        if (updated) setSelectedTopic(updated);
      }
    } catch (e) {
      console.error("Failed to fetch topics", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicsAndComments();

    const topicsSub = supabase.channel('feedback_topics_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback_topics' }, () => {
        fetchTopicsAndComments();
      }).subscribe();

    const commentsSub = supabase.channel('feedback_comments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback_comments' }, () => {
        fetchTopicsAndComments();
      }).subscribe();

    return () => {
      topicsSub.unsubscribe();
      commentsSub.unsubscribe();
    };
  }, []);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicDesc.trim() || !newTopicAuthor.trim()) return;

    try {
      const { error } = await supabase.from('feedback_topics').insert([{
        title: newTopicTitle,
        description: newTopicDesc,
        author: newTopicAuthor,
        category: newTopicCategory,
        likes: 0
      }]);

      if (error) {
        alert('Error creating topic: ' + error.message);
        return;
      }

      setIsCreatingTopic(false);
      setNewTopicTitle('');
      setNewTopicDesc('');
      setNewTopicAuthor('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !newCommentContent.trim() || !newCommentAuthor.trim()) return;

    try {
      const { error } = await supabase.from('feedback_comments').insert([{
        topic_id: selectedTopic.id,
        author: newCommentAuthor,
        content: newCommentContent
      }]);

      if (error) {
        alert('Error adding comment: ' + error.message);
        return;
      }

      setNewCommentContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (e: React.MouseEvent, topic: Topic) => {
    e.stopPropagation();
    try {
      await supabase.from('feedback_topics').update({ likes: topic.likes + 1 }).eq('id', topic.id);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (ts: string | number) => {
    return new Date(ts).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'sugestao': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'bug': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'discussao': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const t = {
    title: language === 'pt' ? 'Comunidade & Feedback' : 'Community & Feedback',
    subtitle: language === 'pt' ? 'Deixe suas sugestões, reporte bugs e discuta melhorias para a Wiki.' : 'Leave suggestions, report bugs, and discuss improvements for the Wiki.',
    newTopic: language === 'pt' ? 'Novo Tópico' : 'New Topic',
    back: language === 'pt' ? 'Voltar para Tópicos' : 'Back to Topics',
    // Categories
    cat_sugestao: language === 'pt' ? 'Sugestão' : 'Suggestion',
    cat_bug: 'Bug Report',
    cat_discussao: language === 'pt' ? 'Discussão' : 'Discussion',
    // Form Create
    f_title: language === 'pt' ? 'Título do Tópico' : 'Topic Title',
    f_desc: language === 'pt' ? 'Descrição / Detalhes' : 'Description / Details',
    f_author: language === 'pt' ? 'Seu Nome / Char' : 'Your Name / CharName',
    f_cat: language === 'pt' ? 'Categoria' : 'Category',
    f_submit: language === 'pt' ? 'Publicar Tópico' : 'Publish Topic',
    f_cancel: language === 'pt' ? 'Cancelar' : 'Cancel',
    // Comments
    comments: language === 'pt' ? 'Comentários' : 'Comments',
    noComments: language === 'pt' ? 'Nenhum comentário ainda. Seja o primeiro!' : 'No comments yet. Be the first!',
    c_add: language === 'pt' ? 'Adicionar Comentário' : 'Add Comment',
    c_msg: language === 'pt' ? 'Sua mensagem...' : 'Your message...',
    c_send: language === 'pt' ? 'Enviar' : 'Send'
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-medieval-gold/20 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black text-medieval-gold uppercase tracking-widest flex items-center gap-3">
            <MessageSquare className="w-6 h-6" />
            {t.title}
          </h1>
          <p className="text-medieval-muted text-sm mt-2 max-w-2xl">
            {t.subtitle} 
          </p>
        </div>
        {!selectedTopic && !isCreatingTopic && (
          <button
            onClick={() => setIsCreatingTopic(true)}
            className="flex items-center gap-2 px-4 py-2 bg-medieval-gold text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          >
            <Plus className="w-4 h-4" />
            {t.newTopic}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCreatingTopic ? (
          // CREATE TOPIC FORM
          <motion.div
            key="create-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-black/40 border border-medieval-gold/20 rounded-lg p-6 max-w-2xl mx-auto"
          >
            <h2 className="text-lg font-bold text-medieval-gold uppercase tracking-wider mb-6 border-b border-medieval-gold/10 pb-2">
              {t.newTopic}
            </h2>
            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-medieval-muted mb-1.5">{t.f_cat}</label>
                <select 
                  value={newTopicCategory} 
                  onChange={(e) => setNewTopicCategory(e.target.value as any)}
                  className="w-full bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none"
                >
                  <option value="sugestao">{t.cat_sugestao}</option>
                  <option value="bug">{t.cat_bug}</option>
                  <option value="discussao">{t.cat_discussao}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-medieval-muted mb-1.5">{t.f_title}</label>
                <input 
                  type="text" 
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="w-full bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none placeholder-medieval-muted/30"
                  placeholder="Ex: Adicionar aba de bestiário"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-medieval-muted mb-1.5">{t.f_desc}</label>
                <textarea 
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  className="w-full h-32 bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none placeholder-medieval-muted/30 resize-none custom-scrollbar"
                  placeholder="Detalhes..."
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-medieval-muted mb-1.5">{t.f_author}</label>
                <input 
                  type="text" 
                  value={newTopicAuthor}
                  onChange={(e) => setNewTopicAuthor(e.target.value)}
                  className="w-full bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none placeholder-medieval-muted/30"
                  placeholder="Player Name"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-medieval-gold/10">
                <button
                  type="button"
                  onClick={() => setIsCreatingTopic(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-medieval-muted hover:text-white transition-colors"
                >
                  {t.f_cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-medieval-gold text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-yellow-500 transition-colors"
                >
                  {t.f_submit}
                </button>
              </div>
            </form>
          </motion.div>
        ) : selectedTopic ? (
          // TOPIC DETAILS
          <motion.div
            key="topic-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-medieval-gold/60 hover:text-medieval-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              {t.back}
            </button>

            {/* OP Post */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-6 relative">
              <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-wider font-bold px-2 py-1 border rounded ${getCategoryColor(selectedTopic.category)}`}>
                {selectedTopic.category === 'sugestao' ? t.cat_sugestao : selectedTopic.category === 'bug' ? t.cat_bug : t.cat_discussao}
              </span>
              <h2 className="text-xl font-bold text-medieval-gold mb-2 pr-24">{selectedTopic.title}</h2>
              <div className="flex items-center gap-4 text-xs font-mono text-medieval-muted/60 mb-6">
                <span>By: <strong className="text-medieval-gold/80 font-sans">{selectedTopic.author}</strong></span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(selectedTopic.created_at)}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedTopic.description}
              </p>
            </div>

            {/* Comments Section */}
            <div className="pl-4 md:pl-8 space-y-4">
              <h3 className="text-sm font-bold text-medieval-gold/80 uppercase tracking-widest border-b border-medieval-gold/10 pb-2">
                {t.comments} ({selectedTopic.comments.length})
              </h3>
              
              {selectedTopic.comments.length === 0 ? (
                <p className="text-sm text-medieval-muted/50 italic">{t.noComments}</p>
              ) : (
                <div className="space-y-3">
                  {selectedTopic.comments.map(comment => (
                    <div key={comment.id} className="bg-black/30 border border-medieval-gold/5 rounded p-4">
                       <div className="flex items-center justify-between gap-4 text-xs font-mono text-medieval-muted/60 mb-2 border-b border-white/5 pb-2">
                        <span><strong className="text-medieval-gold/70 font-sans">{comment.author}</strong></span>
                        <span>{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mt-8 bg-black/20 border border-medieval-gold/10 rounded-lg p-4 flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <input 
                      type="text" 
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      className="w-full bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none placeholder-medieval-muted/30"
                      placeholder={t.f_author}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input 
                      type="text" 
                      value={newCommentContent}
                      onChange={(e) => setNewCommentContent(e.target.value)}
                      className="w-full bg-black/60 border border-medieval-gold/20 rounded p-2 text-sm text-medieval-gold focus:border-medieval-gold outline-none placeholder-medieval-muted/30"
                      placeholder={t.c_msg}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-1.5 bg-medieval-gold/10 border border-medieval-gold/30 text-medieval-gold text-xs font-bold uppercase tracking-wider rounded hover:bg-medieval-gold hover:text-black transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t.c_send}
                  </button>
                </div>
              </form>
            </div>

          </motion.div>
        ) : (
          // TOPIC LIST
          <motion.div
            key="topic-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-3"
          >
            {topics.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-medieval-gold/20 rounded-lg bg-black/20">
                <MessageSquare className="w-8 h-8 text-medieval-muted mx-auto mb-3 opacity-50" />
                <p className="text-medieval-muted text-sm">{language === 'pt' ? 'Nenhum tópico criado ainda.' : 'No topics created yet.'}</p>
              </div>
            ) : (
              topics.map(topic => (
                <div 
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-black/40 border border-medieval-gold/10 rounded-lg p-4 cursor-pointer hover:bg-black/60 hover:border-medieval-gold/40 transition-all flex flex-col md:flex-row gap-4 justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                       <span className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 border rounded ${getCategoryColor(topic.category)}`}>
                        {topic.category === 'sugestao' ? t.cat_sugestao : topic.category === 'bug' ? t.cat_bug : t.cat_discussao}
                      </span>
                      <h3 className="text-base font-bold text-medieval-gold truncate group-hover:text-yellow-400 transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-xs text-medieval-muted truncate w-full max-w-xl">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-medieval-gold/50">
                      <span>By: {topic.author}</span>
                      <span>{formatDate(topic.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-medieval-gold/10 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0">
                     <button 
                        onClick={(e) => handleLike(e, topic.id)}
                        className="flex flex-col items-center gap-1 text-medieval-muted hover:text-emerald-400 transition-colors p-2"
                     >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{topic.likes}</span>
                     </button>
                     <div className="flex flex-col items-center gap-1 text-medieval-muted p-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{topic.comments.length}</span>
                     </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
