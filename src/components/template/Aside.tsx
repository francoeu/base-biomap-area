// import DashboardIcon from "./icons/dashboard.svg";

export function Aside() {
    return (
 
        <div className="flex min-h-screen w-full bg-gray-700 font-sans">
    <aside className="flex w-64 flex-col px-4 pt-10 pb-6">
      <a
        href="#"
        className="flex items-center gap-x-4 px-8 text-2xl font-medium text-white focus:outline-none"
      >
        {/* <DashboardIcon className="h-6 w-6 stroke-current" /> */}
        <span>Transfer</span>
      </a>
      <ul className="flex flex-1 flex-col gap-y-10 px-8 pt-14">
        <li v-for="item in menu">
          <a
            href="#"
            className="flex items-center gap-x-4 text-gray-400 hover:font-medium hover:text-white focus:font-medium focus:text-white focus:outline-none"
          >
            {/* <Component is={item.icon} className="h-6 w-6 stroke-current" />
            <span>{{ item.name }}</span> */}
          </a>
        </li>
      </ul>
      <div
        className="sticky bottom-4 rounded-10 bg-gray-900 bg-[url(/img/line-pattern.svg)] bg-top p-6"
      >
        <div className="text-white">
          Refer a friend and get <span className="font-bold">$5</span>
        </div>
        <div className="mt-3 text-sm text-gray-400">The reward of transfer.</div>
        <button
          className="mt-4 w-full rounded-lg bg-gray-700 py-2 text-sm font-normal text-gray-400 hover:text-white"
        >
          Invite
        </button>
      </div>
    </aside>
 </div>
    )
  }

