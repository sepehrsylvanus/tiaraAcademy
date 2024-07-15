import {
  getPlaylists,
  getRegisteredPlaylist,
  getSinglePlaylist,
  registerPlayList,
} from "@/actions/actions";
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

export function userGetPlaylist(title: string) {
  return useQuery({
    queryKey: ["registeredPlaylist"],
    queryFn: async () => {
      const resgisteredPlaylist = await getRegisteredPlaylist(title);
      return resgisteredPlaylist;
    },
  });
}

export function useGetSinglePlaylist(title: string) {
  return useQuery({
    queryKey: ["singlePlaylist"],
    queryFn: async () => {
      const playlist = await getSinglePlaylist(title);
      return playlist;
    },
  });
}
