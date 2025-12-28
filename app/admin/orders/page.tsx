"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Eye, ShoppingCart, Package, DollarSign, Clock } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    temple: "Sri Venkateswara Temple",
    type: "TICKET",
    items: [{ name: "VIP Darshan", quantity: 2, price: 200 }],
    total: 400,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-28 10:30 AM",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    temple: "Meenakshi Amman Temple",
    type: "PRODUCT",
    items: [
      { name: "Brass Diya Set", quantity: 1, price: 45 },
      { name: "Kumkum Set", quantity: 2, price: 30 },
    ],
    total: 75,
    status: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2024-12-28 09:15 AM",
  },
  {
    id: "ORD-003",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    temple: "Jagannath Temple",
    type: "TICKET",
    items: [{ name: "Morning Pooja", quantity: 4, price: 200 }],
    total: 200,
    status: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-12-28 08:45 AM",
  },
  {
    id: "ORD-004",
    customer: "Priya Sharma",
    email: "priya@example.com",
    temple: "Sri Venkateswara Temple",
    type: "MIXED",
    items: [
      { name: "Special Archanai", quantity: 1, price: 100 },
      { name: "Prasadam Box", quantity: 2, price: 50 },
    ],
    total: 150,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-27 04:20 PM",
  },
  {
    id: "ORD-005",
    customer: "Mike Johnson",
    email: "mike@example.com",
    temple: "Meenakshi Amman Temple",
    type: "PRODUCT",
    items: [{ name: "Silk Angavastram", quantity: 1, price: 85 }],
    total: 85,
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    createdAt: "2024-12-27 02:10 PM",
  },
]

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.temple.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "tickets") return matchesSearch && order.type === "TICKET"
    if (activeTab === "products") return matchesSearch && order.type === "PRODUCT"
    if (activeTab === "pending") return matchesSearch && order.status === "PENDING"
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PROCESSING":
        return "secondary"
      case "PENDING":
        return "outline"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "default"
      case "PENDING":
        return "secondary"
      case "REFUNDED":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">View and manage all orders across temples</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {orders.filter((o) => o.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "PROCESSING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {orders
                .filter((o) => o.paymentStatus === "PAID")
                .reduce((acc, o) => acc + o.total, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">{order.temple}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.type}</Badge>
                  </TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Temple</p>
                  <p className="font-medium">{selectedOrder.temple}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{selectedOrder.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                    <Badge variant={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between items-center">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${selectedOrder.total}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
