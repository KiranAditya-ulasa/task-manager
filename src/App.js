import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, updateDoc, doc, deleteDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import * as S from './Styles';
import { Plus, ChevronRight, Trash2, CheckSquare, Clock, CheckCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'kanban-tasks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, 'kanban-tasks'), {
      title: input,
      status: 'todo',
      createdAt: serverTimestamp()
    });
    setInput('');
  };

  const moveTask = async (task) => {
    const nextStatus = { todo: 'doing', doing: 'done', done: 'todo' };
    await updateDoc(doc(db, 'kanban-tasks', task.id), {
      status: nextStatus[task.status]
    });
  };

  const renderColumn = (status, title, color) => (
    <S.Column>
      <S.ColumnHeader>
        <h2>{title}</h2>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
          {tasks.filter(t => t.status === status).length}
        </span>
      </S.ColumnHeader>
      
      <AnimatePresence mode="popLayout">
        {tasks.filter(t => t.status === status).map(task => (
          <motion.div 
            key={task.id} 
            layout 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <S.TaskCard color={color} onClick={() => moveTask(task)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontWeight: '500', color: '#f8fafc' }}>{task.title}</p>
                <Trash2 
                  size={14} 
                  color="#64748b" 
                  style={{ cursor: 'pointer' }} 
                  onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, 'kanban-tasks', task.id)); }} 
                />
              </div>
              <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.75rem' }}>
                {status === 'done' ? <CheckCircle size={12} color="#10b981" /> : <Clock size={12} />}
                <span>{status === 'todo' ? 'Start Task' : status === 'doing' ? 'In Progress' : 'Completed'}</span>
                {status !== 'done' && <ChevronRight size={12} />}
              </div>
            </S.TaskCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </S.Column>
  );

  return (
    <S.Container>
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>
          <CheckSquare color="#3b82f6" size={36} /> Task<span style={{ color: '#3b82f6' }}>Manager</span>
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '25px', marginTop: '8px' }}>Organize your workflow with status boards</p>
        
        <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', maxWidth: '450px' }}>
          <S.Input 
            placeholder="What needs to be done?" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <S.AddButton type="submit">
            <Plus size={20} /> Add Task
          </S.AddButton>
        </form>
      </header>

      

      <S.Board>
        {renderColumn('todo', 'To Do', '#64748b')}
        {renderColumn('doing', 'In Progress', '#3b82f6')}
        {renderColumn('done', 'Completed', '#10b981')}
      </S.Board>
    </S.Container>
  );
}

export default App;