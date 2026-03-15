// import { ReactNode } from "react"

// export default async function AdminLayout({ children }: { children: ReactNode }) {

//   return (
//     <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
//       {children}
//     </div>
//   )
// }


import { ReactNode } from "react"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#001436", color: "#f1f5f9" }}>
      {children}
    </div>
  )
}