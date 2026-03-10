"use client";

import { useEffect, useState } from "react";

export interface BidEntry {
  id: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export function useLiveLeaderboard(auctionId: string) {
  const [leaderboard, setLeaderboard] = useState<BidEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auctionId) return;

    // TARGET: GET /auctions/:id/leaderboard/stream
    const sseUrl = `http://localhost:8000/api/v1/auctions/${auctionId}/leaderboard/stream`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setLeaderboard(data);
        }
      } catch (err) {
        console.error("Institutional SSE data corruption:", err);
      }
    };

    eventSource.onerror = () => {
      setError("Institutional connection interrupted. Re-linking...");
      setIsConnected(false);
    };

    // CRITICAL: ALWAYS close on unmount
    return () => {
      eventSource.close();
    };
  }, [auctionId]);

  return { leaderboard, isConnected, error };
}
