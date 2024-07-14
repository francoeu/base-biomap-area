import { CustomersProvider } from "@/contexts/CustomersContext";
import { IconFileDescription } from "@tabler/icons-react";

interface CustomersListProps {
    data: { 
        id: string
        name: string
        email: string
        isAdmin: boolean
    }[];
  }
  
  interface ICustomers{
    id: string
    name: string
    email: string
    isAdmin: boolean
  }

const CustomersList = ({ data }: CustomersListProps) => {
  return (
    <CustomersProvider>
<section className="text-gray-400 bg-gray-900- body-font">
  <div className="container py-4 mx-auto">

    <div className="flex flex-wrap -m-2">

    {data.map((customer: ICustomers) => (

          <div key={customer.id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
            <div className="w-16 h-16 flex justify-center p-5 justify-items-center bg-gray-100 rounded-full mr-4">
            <IconFileDescription />
            </div>
            <div className="flex-grow">
              <h2 className="text-white title-font font-medium">{customer.name}</h2>
              <p className="text-gray-600">{customer.email}</p>
            </div>
          </div>
        </div>

      ))}

    </div>
  </div>
</section>
</CustomersProvider>
  );
};

export default CustomersList;
