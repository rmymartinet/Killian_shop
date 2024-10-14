import { CardProps } from "@/types/dataTypes";

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="rounded-xl shadow-xl p-10 flex gap-8 w-full">
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-pretty">{description}</p>
      </div>
    </div>
  );
};

export default Card;
