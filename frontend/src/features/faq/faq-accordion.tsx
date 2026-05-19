import type { FaqItem } from '@/types/api';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  items: ReadonlyArray<FaqItem>;
};

export const FaqAccordion = ({ items }: Props): JSX.Element => (
  <Card className="border-border/40 bg-card/60 backdrop-blur">
    <CardContent className="p-2 md:p-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="px-4">
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardContent>
  </Card>
);
