import { Brand } from './Brand'
import UserMenu from './UserMenu'

export default function HeaderLayout() {
  return (
    <div
      className={`
            flex justify-between items-center
            p-7  border-b-2 border-[#0FB268]
        `}
    >
      <Brand />
      <UserMenu />
    </div>
  )
}
