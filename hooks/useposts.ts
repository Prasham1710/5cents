"use client";

import { useState, useEffect } from "react";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export function usePosts(initialPosts: Post[] = []) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 5;

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts();
    }
  }, [initialPosts]);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.id.toString().includes(term)
    );

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const paginatedPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return {
    posts: paginatedPosts(),
    totalPosts: filteredPosts.length,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    refetch: fetchPosts,
  };
}
