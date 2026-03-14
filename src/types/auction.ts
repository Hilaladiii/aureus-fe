export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  reservePrice: number;
  increment: number;
  endTime: string; // ISO string
  status: "ACTIVE" | "ENDED" | "UPCOMING";
  category: "DIGITAL" | "PHYSICAL" | "EXPERIENCE";
  seller: {
    username: string;
    verified: boolean;
  };
}

export type Category = {
  id: string;
  name: string;
};

export type AuctionCreateRequest = {
  name: string;
  description?: string;
  startPrice: number;
  bidIncrement: number;
  startTime: Date;
  endTime: Date;
  categoryId: string;
  images: File[];
};
