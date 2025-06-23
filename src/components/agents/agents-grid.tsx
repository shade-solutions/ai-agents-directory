import { AIAgent } from '@/types';
import { AgentCard } from './agent-card';

interface AgentsGridProps {
  agents: AIAgent[];
  showTags?: boolean;
  showDescription?: boolean;
  className?: string;
}

export function AgentsGrid({ 
  agents, 
  showTags = true, 
  showDescription = true,
  className = ''
}: AgentsGridProps) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No AI agents found matching your criteria.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={`grid-auto-fit ${className}`}>
      {agents.map((agent) => (
        <AgentCard
          key={agent.name}
          agent={agent}
          showTags={showTags}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}
