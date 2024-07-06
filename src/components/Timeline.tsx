import { Card, CardContent } from "@/components/ui/card";
import type { NodeExtend } from "@/utils/list";

interface TimelineProps {
  nodes: NodeExtend[];
}

const Timeline: React.FC<TimelineProps> = ({ nodes }) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Trip Timeline
          </h2>
          <p className="text-muted-foreground">
            Follow along the stages of your exciting adventure.
          </p>
        </div>
        <div className="relative flex flex-col gap-8">
          {nodes.map((node, index) => (
            <div key={node.id} className="relative flex flex-col gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-none text-2xl font-bold">
                  {node.data.date}
                </div>
                <div className="flex-1">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">
                        {node.data.name}
                      </h3>
                      <p className="text-muted-foreground">{node.data.body}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {index < nodes.length - 1 && (
                <div className="absolute left-[18px] top-0 bottom-0 w-px bg-muted-foreground/20 dark:bg-muted/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
