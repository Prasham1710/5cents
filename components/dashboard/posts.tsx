"use client";

import type React from "react";

import { useState } from "react";
import { usePosts, type Post } from "@/hooks/useposts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  Search,
  AlertCircle,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PostsTableProps = {
  initialPosts?: Post[];
};

export function PostsTable({ initialPosts = [] }: PostsTableProps) {
  const [searchInput, setSearchInput] = useState("");
  const [sortField, setSortField] = useState<"id" | "title" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const {
    posts,
    totalPosts,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    refetch,
  } = usePosts(initialPosts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field: "id" | "title") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return typeof aValue === "string"
        ? aValue.localeCompare(bValue as string)
        : (aValue as number) - (bValue as number);
    } else {
      return typeof aValue === "string"
        ? (typeof bValue === "string" && typeof aValue === "string" ? bValue.localeCompare(aValue) : 0)
        : (bValue as number) - (aValue as number);
    }
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading posts..."
                : `Showing ${posts.length} of ${totalPosts} posts`}
            </CardDescription>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="shrink-0"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="sr-only">Refresh</span>
            </Button>
          </form>
        </div>
        {searchTerm && (
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className="text-xs">
              Search: {searchTerm}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setSearchInput("");
                }}
              >
                <span>×</span>
                <span className="sr-only">Clear search</span>
              </Button>
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading posts...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : posts.length === 0 ? (
          <Alert>
            <AlertTitle>No posts found</AlertTitle>
            <AlertDescription>
              {searchTerm
                ? `No posts match "${searchTerm}"`
                : "There are no posts available."}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead
                      className="w-[100px] cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center">
                        ID
                        {sortField === "id" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center">
                        Title
                        {sortField === "title" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Content
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPosts.map((post) => (
                    <TableRow key={post.id} className="group">
                      <TableCell className="font-medium">{post.id}</TableCell>
                      <TableCell className="font-medium group-hover:text-primary transition-colors">
                        {post.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {post.body.length > 100
                          ? `${post.body.substring(0, 100)}...`
                          : post.body}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4 rotate-90" />
                  <span className="sr-only">Previous</span>
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button
                      key={i}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ArrowDown className="h-4 w-4 rotate-90" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
