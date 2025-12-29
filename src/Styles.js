import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 40px;
  font-family: 'Inter', sans-serif;
`;

export const Board = styled.div`
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding-bottom: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  min-width: 320px;
  width: 320px;
  padding: 20px;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0; }
`;

export const TaskCard = styled.div`
  background: #1e293b;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 15px;
  border-left: 5px solid ${props => props.color || '#3b82f6'};
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { transform: translateY(-3px); background: #2d3748; box-shadow: 0 6px 12px rgba(0,0,0,0.3); }
`;

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: white;
  width: 100%;
  outline: none;
  font-size: 1rem;
  &:focus { border-color: #3b82f6; background: rgba(255, 255, 255, 0.08); }
`;

export const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: background 0.2s;
  &:hover { background: #2563eb; }
`;