"use client"

import { Checkbox } from "~/components/ui/checkbox";

type MarkdownCheckboxProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

function MarkdownCheckbox(props : MarkdownCheckboxProps) : React.ReactNode {
  const children = props.children
  const childrenAsString = children?.toString();
  if(!childrenAsString) {
    return children;
  }

  // Check if checkbox is present
  let checked: boolean;
  let boxLabel: string | undefined;
  if(childrenAsString.startsWith('[ ]')) {
    checked = false;
    boxLabel = childrenAsString.split('[ ]')[1];
  } else if(childrenAsString.startsWith('[x]')) {
    checked = true;
    boxLabel = childrenAsString.split('[x]')[1];
  } else {
    return children;
  }
  
  return (
    <li className="flex flex-rox gap-1">
      <Checkbox checked={checked} />
      <p>{boxLabel ?? ''}</p>
    </li>
  );
}