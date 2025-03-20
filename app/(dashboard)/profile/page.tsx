import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">@johndoe</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Full Name" />
            <Input placeholder="Email Address" type="email" />
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage password & security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable 2FA</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
