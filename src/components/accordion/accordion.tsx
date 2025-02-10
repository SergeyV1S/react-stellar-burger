import { cn } from "@src/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import accordionStyles from "./Accordion.module.css";

interface IAccordionProps extends React.ComponentProps<"button"> {
  heading: string | React.ReactNode;
  children: React.ReactNode;
}

export const Accordion = ({ heading, children, className, ...props }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={accordionStyles.accordion_wrapper}>
      <button className={cn(accordionStyles.accordion_button, className)} {...props} onClick={() => setIsOpen(!isOpen)}>
        {heading}
        {isOpen ? <ChevronUp size={20} color='#ffff' /> : <ChevronDown size={20} color='#ffff' />}
      </button>
      {isOpen && <div className={accordionStyles.accordion_content}>{children}</div>}
    </div>
  );
};
