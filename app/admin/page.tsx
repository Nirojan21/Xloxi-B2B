import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Ticket, Package, DollarSign, TrendingUp, ShoppingCart, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Admin Dashboard - Temple Platform",
}

export default function AdminDashboard() {
  const stats = [
    { title: "Total Temples", value: "156", icon: Building2, change: "+12%" },
    { title: "Total Users", value: "8,432", icon: Users, change: "+23%" },
    { title: "Tickets Booked", value: "45,231", icon: Ticket, change: "+18%" },
    { title: "Products Sold", value: "12,847", icon: Package, change: "+15%" },
    { title: "Total Revenue", value: "$234,567", icon: DollarSign, change: "+28%" },
    { title: "Pending Orders", value: "89", icon: ShoppingCart, change: "-5%" },
    { title: "Pending Withdrawals", value: "23", icon: AlertCircle, change: "+2%" },
    { title: "Growth Rate", value: "24%", icon: TrendingUp, change: "+8%" },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Order #ORD-{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Customer {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Ticket Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Booking #TKT-{2000 + i}</p>
                    <p className="text-sm text-muted-foreground">Temple {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
