import { getPlaylists } from "@/actions/actions";
import prisma from "@/utils/db";
import { useQuery } from "@tanstack/react-query";

export function useGetPlaylists() {
  return useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => {
      const playlists = await getPlaylists();
      console.log(playlists);
      return playlists;
    },
  });
}
