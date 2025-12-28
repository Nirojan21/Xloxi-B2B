import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Package, DollarSign, TrendingUp, ShoppingCart, Wallet, Star, Eye } from "lucide-react"

export const metadata = {
  title: "Vendor Dashboard - Temple Platform",
}

export default function VendorDashboard() {
  const stats = [
    { title: "Total Tickets Sold", value: "1,234", icon: Ticket, change: "+12%" },
    { title: "Products Sold", value: "567", icon: Package, change: "+8%" },
    { title: "Total Revenue", value: "$12,345", icon: DollarSign, change: "+15%" },
    { title: "Wallet Balance", value: "$2,345", icon: Wallet, change: "+5%" },
    { title: "Pending Orders", value: "23", icon: ShoppingCart, change: "-3%" },
    { title: "Average Rating", value: "4.8", icon: Star, change: "+0.2" },
    { title: "Temple Views", value: "5,678", icon: Eye, change: "+25%" },
    { title: "Growth Rate", value: "18%", icon: TrendingUp, change: "+3%" },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage your temple, tickets, and products</p>
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
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Booking #TKT-{3000 + i}</p>
                    <p className="text-sm text-muted-foreground">Pooja Ticket - {i} person(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Order #ORD-{4000 + i}</p>
                    <p className="text-sm text-muted-foreground">{i + 1} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 150 + 30).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
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
