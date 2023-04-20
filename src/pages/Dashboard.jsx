import checkAuth from '../guards/checkAuth'

const stats = [
  { id: 1, name: 'Total users', stat: '71,897', href: '/dashboard/users'},
  { id: 2, name: 'Total Products', stat: '58.16', href: '/dashboard/products' },
]

export default function Dashboard() {
  return (
    <div>
    <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <a href={item.href}>
        <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
        </div>
        </a>
      ))}
    </dl>
  </div>
  )
}
