import { H3, P } from "./ui/typography";

interface ServiceCardProps extends React.ComponentProps<"div"> {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({
  title,
  description,
  icon,
  ...props
}: ServiceCardProps) => {
  return (
    <div className="max-w-sm rounded-4xl p-[1px] bg-gradient-to-b from-border to-background ">
      <div
        className="relative px-6 py-14 rounded-4xl bg-card h-full"
        {...props}
      >
        <span className="flex items-center justify-center size-16 rounded-full bg-primary shadow-inner shadow-primary-foreground/80 absolute -top-8 right-1/2 translate-x-1/2">
          {icon}
        </span>
        <H3 className="dark:text-gray-50 whitespace-pre-line tracking-widest text-center uppercase">
          {title}
        </H3>
        <P className="text-muted-foreground">{description}</P>
      </div>
    </div>
  );
};
export default ServiceCard;
