// import Financas from '@/components/projects'
import ContentArea from '@/components/template/ContentArea'
import HeaderLayout from './Header'

export function AdminPage() {
  return (
    <>
      <HeaderLayout />
      <ContentArea>
        <div className="gap-4 justify-center items-center m-auto min-w-full">
          <h1>Admin Page</h1>
        </div>
      </ContentArea>
    </>
  )
}
