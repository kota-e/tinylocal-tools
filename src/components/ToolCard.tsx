import type { ReactNode } from 'react';

type ToolCardProps = {
  title: string;
  description: string;
  helper: string;
  children: ReactNode;
};

export function ToolCard({ title, description, helper, children }: ToolCardProps) {
  return (
    <section className="tool-card" aria-labelledby="tool-title">
      <div className="tool-heading">
        <div>
          <h2 id="tool-title">{title}</h2>
          <p>{description}</p>
        </div>
        <p className="local-note">{helper}</p>
      </div>
      {children}
    </section>
  );
}
