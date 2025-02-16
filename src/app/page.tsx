import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc"
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function Home() {
  const readmeContent = await fs.readFile(process.cwd() + '/README.md') 

  return (
    <>
    <HomepageNav />
    <div className="prose dark:prose-invert flex justify-center w-full max-w-full">
      <div className="w-full md:w-2/3 lg:w-3/5 py-6 px-6 md:px-0">
        <MDXRemote
          source={readmeContent}
          components={{
            li: (props) => MarkdownCheckbox(props),
            ul: (props) => <ul {...props} className="list-disc" />
          }}
        />
        <GetStartedCard />
      </div>
    </div>
    </>
  );
}

type MarkdownCheckboxProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

export function MarkdownCheckbox(props : MarkdownCheckboxProps) : React.ReactNode {
  const children = props.children
  // eslint-disable-next-line
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

export function HomepageNav() {
  return (
    <nav className="flex flex-row justify-end top-0 sticky shadow-md p-2 pr-4 bg-background opacity-100">
      <Button asChild variant="secondary" className="rounded-md">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </nav>
  );
}

export function GetStartedCard() {
  return (
    <Card>
      <CardHeader className="w-full flex justify-center">
        <CardTitle className="text-center">Ready to get started?</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex justify-center">
        <Button asChild className="no-underline">
          <Link href="/sign-in">
            Sign in to get started!
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}