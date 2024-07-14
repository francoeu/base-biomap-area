
import Link from "next/link";
import { Paper } from "react-iconly";

interface ListProps {
    data: { 
        id: string;
        name: string;
        description: string;
        projectId: string;
        archiveUrl: string;
    }[];
  }
  
  interface IArchive {
    id: string;
    name: string;
    description: string;
    projectId: string;
    archiveUrl: string;
  }

const ItemsList = ({ data }: ListProps) => {
  return (
    <section className="text-gray-400 body-font min-h-[15rem] container py-4 bg-slate-900- ">
    <div className="grid grid-cols-1  lg:grid lg:grid-cols-2 gap-4 ">


    {data.map((project: IArchive) => (

          <Link target="_blank" href={`${project.archiveUrl}`} key={project.id}>
  <div    className="h-full w-full flex items-center border-gray-800 border p-4 rounded-lg bg-[#171622]">
  <div className="mb-2 w-12 h-12 flex justify-center p-3 justify-items-center bg-gray-800 rounded-full mr-4">
    <Paper set="bold" primaryColor="#0fb269b2"/>
            </div>
            <div className="flex-grow">
              <h2 className="text-white title-font font-medium">{project.name}</h2>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </div>
        </Link>

      ))}

    </div>

</section>
  );
};

export default ItemsList;
