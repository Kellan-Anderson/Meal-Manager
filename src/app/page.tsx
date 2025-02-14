import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc"
import { Checkbox } from "~/components/ui/checkbox";

export default async function Home() {
  const readmeContent = await fs.readFile(process.cwd() + '/README.md') 

  return (
    <>
    <div className="prose flex justify-center w-full max-w-full">
      <div className="w-full md:w-2/3 lg:w-3/5 py-6 px-6 md:px-0">
        <MDXRemote
          source={readmeContent}
          components={{ li: (props) => MarkdownCheckbox(props)}}
        />
      </div>
    </div>
    </>
  );
}

type MarkdownCheckboxProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

export function MarkdownCheckbox(props : MarkdownCheckboxProps) : React.ReactNode {
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
    <li className="flex flex-rox items-start h-fit gap-2">
      <Checkbox checked={checked} className="mt-1.5 rounded cursor-default" />
      <p className="p-0 m-0">{boxLabel ?? ''}</p>
    </li>
  );
}
