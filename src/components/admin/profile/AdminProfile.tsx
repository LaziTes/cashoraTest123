import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MapPin, Phone, Shield } from "lucide-react";

const AdminProfile = () => {
  // This would typically come from your auth context or API
  const admin = {
    firstName: "John",
    lastName: "Carter",
    email: "john.carter@cashora.com",
    role: "Super Admin",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg",
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={admin.avatar} alt={`${admin.firstName} ${admin.lastName}`} />
                  <AvatarFallback>{admin.firstName[0]}{admin.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{admin.firstName} {admin.lastName}</h3>
                  <Badge variant="secondary" className="mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    {admin.role}
                  </Badge>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                    <p className="font-medium">{admin.email}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </div>
                    <p className="font-medium">{admin.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </div>
                    <p className="font-medium">{admin.location}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Join Date
                    </div>
                    <p className="font-medium">{new Date(admin.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;