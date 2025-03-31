import { FC } from 'react';

type AlertProps = { status?: number; title?: string; message?: string | string[] };

const Alert: FC<AlertProps> = ({ status, title = '', message }) => {
  let fullTitle = status ? `${status} | ${title}` : title;

  return (
    <div>
      {fullTitle && <div style={{ fontSize: '1.25em', fontWeight: 600 }}>{fullTitle}</div>}
      {Array.isArray(message) && message.map(msg => <div key={msg}>{msg}</div>)}
      {typeof message === 'string' && <div>{message}</div>}
    </div>
  );
};

export default Alert;
