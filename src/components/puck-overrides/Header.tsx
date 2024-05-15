import { Button } from "@measured/puck";
import "./puck.css";
import { useDocument } from "../../hooks/useDocument";
import { usePuck } from "@measured/puck";
import { RotateCcw, RotateCw } from "lucide-react"
import * as buttons from "../ui/Button"


const handleClick = (slug: string) => {
  window.open(`/${slug}`, "_blank");
};

export const customHeaderActions = (children: any) => {
  const entityDocument = useDocument();
  const {
    history: { back, forward, historyStore },
  } = usePuck();
  const { hasFuture = false, hasPast = false } = historyStore || {};
  return (
    <>
      {children}
      <buttons.Button variant="ghost" size="icon" disabled={!hasPast} onClick={back}>
        <RotateCcw className="h-4 w-4" />
      </buttons.Button>
      <buttons.Button variant="ghost" size="icon" disabled={!hasFuture} onClick={forward}>
        <RotateCw className="h-4 w-4" />
      </buttons.Button>
      <Button onClick={() => handleClick(entityDocument.slug)}>
        Live Preview
      </Button>
    </>
  );
};

export interface customHeaderProps {
  actions: any;
}

export const customHeader = ({
  actions
}: customHeaderProps) => {
  return (
    <header className="puck-header">
      <div className="header-left" />
      <div className="header-center">
      </div>
      <div className="actions">{actions}</div>
    </header>
  );
};
