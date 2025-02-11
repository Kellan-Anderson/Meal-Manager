import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Home() {
  const readmeContent = await fs.readFile(process.cwd() + '/README.md') 

  return (
    <>
    <div className="prose border">
      <MDXRemote source={readmeContent} />
    </div>
    <p className="text-red-500">Testing</p>
    </>
  );
}
