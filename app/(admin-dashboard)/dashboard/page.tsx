import Link from "next/link";
import prisma from "@/lib/db";
import {
  CardAction,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalOrganizations,
    totalTrainees,
    totalNews,
    publishedNews,
    suspendedUsers,
    recentUsers,
    recentNews,
    recentOrganizations,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.trainee.count(),
    prisma.newsPost.count(),
    prisma.newsPost.count({ where: { status: true } }),
    prisma.user.count({ where: { isSuspended: true } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, email: true, role: true, createdAt: true },
    }),
    prisma.newsPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, status: true, createdAt: true },
    }),
    prisma.organization.findMany({
      orderBy: { trainingStartedAt: "desc" },
      take: 5,
      select: { id: true, name: true, acronym: true, trainingStartedAt: true },
    }),
  ]);

  const stats = [
    {
      label: "Users",
      value: totalUsers,
      helper: `${suspendedUsers} suspended`,
      href: "/users",
    },
    {
      label: "Organizations",
      value: totalOrganizations,
      helper: "Affiliated partners",
      href: "/organization-management",
    },
    {
      label: "Trainees",
      value: totalTrainees,
      helper: "Across all organizations",
      href: "/organization-management",
    },
    {
      label: "News Posts",
      value: totalNews,
      helper: `${publishedNews} published`,
      href: "/news-management",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of users, organizations, trainees, and news content.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{stat.helper}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest admin users added</CardDescription>
            <CardAction>
              <Button asChild size="sm" variant="outline">
                <Link href="/users">Manage</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.length === 0 && (
              <p className="text-sm text-muted-foreground">No users found.</p>
            )}
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{user.email}</p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {user.role}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
            <CardDescription>Latest news posts created</CardDescription>
            <CardAction>
              <Button asChild size="sm" variant="outline">
                <Link href="/news-management">Manage</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNews.length === 0 && (
              <p className="text-sm text-muted-foreground">No posts found.</p>
            )}
            {recentNews.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.status ? "Published" : "Unpublished"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Organizations</CardTitle>
            <CardDescription>Latest partner organizations</CardDescription>
            <CardAction>
              <Button asChild size="sm" variant="outline">
                <Link href="/organization-management">Manage</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrganizations.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No organizations found.
              </p>
            )}
            {recentOrganizations.map((org) => (
              <div
                key={org.id}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{org.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {org.acronym ?? "No acronym"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(org.trainingStartedAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
