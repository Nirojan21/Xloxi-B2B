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
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Building2 } from "lucide-react"
import Image from "next/image"

const temples = [
  {
    id: "1",
    name: "Sri Venkateswara Temple",
    location: "Tirupati, India",
    vendor: "Temple Trust Board",
    status: "APPROVED",
    ticketCount: 12,
    productCount: 45,
    revenue: 125000,
    image: "/hindu-temple.png",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Meenakshi Amman Temple",
    location: "Madurai, India",
    vendor: "HR&CE Department",
    status: "APPROVED",
    ticketCount: 8,
    productCount: 32,
    revenue: 89000,
    image: "/meenakshi-temple.jpg",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Golden Temple",
    location: "Amritsar, India",
    vendor: "SGPC",
    status: "PENDING",
    ticketCount: 0,
    productCount: 0,
    revenue: 0,
    image: "/golden-temple.jpg",
    createdAt: "2024-12-01",
  },
  {
    id: "4",
    name: "Jagannath Temple",
    location: "Puri, India",
    vendor: "Shree Jagannath Temple Administration",
    status: "APPROVED",
    ticketCount: 6,
    productCount: 28,
    revenue: 67000,
    image: "/jagannath-temple.jpg",
    createdAt: "2024-03-10",
  },
  {
    id: "5",
    name: "Shirdi Sai Baba Temple",
    location: "Shirdi, India",
    vendor: "Shri Saibaba Sansthan Trust",
    status: "REJECTED",
    ticketCount: 0,
    productCount: 0,
    revenue: 0,
    image: "/sai-baba-temple.jpg",
    createdAt: "2024-11-25",
  },
]

export default function AdminTemplesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemple, setSelectedTemple] = useState<(typeof temples)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredTemples = temples.filter(
    (temple) =>
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.vendor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default"
      case "PENDING":
        return "secondary"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Temple Management</h1>
          <p className="text-muted-foreground">Review and manage temple listings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Temples</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temples.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {temples.filter((t) => t.status === "APPROVED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {temples.filter((t) => t.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${temples.reduce((acc, t) => acc + t.revenue, 0).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Temples</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search temples..."
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
                <TableHead>Temple</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemples.map((temple) => (
                <TableRow key={temple.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={temple.image || "/placeholder.svg"}
                        alt={temple.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{temple.name}</p>
                        <p className="text-sm text-muted-foreground">{temple.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{temple.vendor}</TableCell>
                  <TableCell>{temple.ticketCount}</TableCell>
                  <TableCell>{temple.productCount}</TableCell>
                  <TableCell>${temple.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(temple.status)}>{temple.status}</Badge>
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
                            setSelectedTemple(temple)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {temple.status === "PENDING" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
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
            <DialogTitle>Temple Details</DialogTitle>
            <DialogDescription>Review temple information</DialogDescription>
          </DialogHeader>
          {selectedTemple && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedTemple.image || "/placeholder.svg"}
                  alt={selectedTemple.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedTemple.name}</h3>
                  <p className="text-muted-foreground">{selectedTemple.location}</p>
                  <Badge variant={getStatusColor(selectedTemple.status)} className="mt-1">
                    {selectedTemple.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-medium">{selectedTemple.vendor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Registered On</p>
                  <p className="font-medium">{selectedTemple.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                  <p className="font-medium">{selectedTemple.ticketCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="font-medium">{selectedTemple.productCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="font-medium">${selectedTemple.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
            {selectedTemple?.status === "PENDING" && (
              <>
                <Button variant="destructive">Reject</Button>
                <Button>Approve</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
