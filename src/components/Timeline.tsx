import { Card, CardContent } from "@/components/ui/card";
import type { NodeExtend } from "@/utils/list";
import { useRouter } from "next/navigation";

interface TimelineProps {
  nodes: NodeExtend[];
  name: string;
}

const Timeline: React.FC<TimelineProps> = ({ nodes, name }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/trip/${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
            {name} Timeline
          </h2>
          <p className="text-center text-muted-foreground">
            Follow along the stages of your exciting adventure.
          </p>
        </div>
        <div className="relative flex flex-col gap-8">
          {nodes.map((node, index) => (
            <div key={node.id} className="relative flex flex-col gap-6">
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div
                className="flex items-start gap-6 cursor-pointer"
                onClick={handleCardClick}
              >
                <div className="flex-none text-2xl font-bold text-primary">
                  {node.data.date}
                </div>
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-primary">
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
