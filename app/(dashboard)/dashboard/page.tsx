import { Suspense } from "react";
import { PostsTable } from "@/components/dashboard/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Users, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getPosts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const posts = await getPosts();
  return (
    <div className="space-y-10 px-6 py-6">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Last updated: Today at 12:30 PM
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[{
          title: "Total Posts",
          value: posts.length,
          icon: BarChart3,
          trend: "↑ 12%",
          description: "from last month",
        }, {
          title: "Active Users",
          value: 10,
          icon: Users,
          trend: "↑ 5%",
          description: "from last week",
        }, {
          title: "Active Sessions",
          value: 1,
          icon: Clock,
          trend: null,
          description: "Current active sessions",
        }].map(({ title, value, icon: Icon, trend, description }, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                {trend && <span className="text-green-500 font-medium mr-1">{trend}</span>}
                <span>{description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Suspense fallback={<PostsTableSkeleton />}>
        <PostsTable initialPosts={posts} />
      </Suspense>
    </div>
  );
}

function PostsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Posts</CardTitle>
        <CardDescription>Loading posts...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 w-10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
