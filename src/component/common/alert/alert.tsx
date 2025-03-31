import { FC } from 'react';

const Alert: FC<{ title: string; message?: string | string[] }> = ({ title, message }) => {
  return (
    <div>
      {title && (
        <div className="title" style={{ fontSize: '1.25em', fontWeight: 600 }}>
          {title}
        </div>
      )}
      {Array.isArray(message) && message.map(msg => <div key={msg}>{msg}</div>)}
      {typeof message === 'string' && <div>{message}</div>}
    </div>
  );
};

export default Alert;
