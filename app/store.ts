import { deleteReminder } from "@/data-access/actions";
import prisma from "@/lib/prisma";
import { create } from "zustand";

type Action = {
  handleRemoveReminder: (data: { id: string }) => void;
};

export const useStore = create<Action>(() => ({
  handleRemoveReminder: async (data: { id: string }) =>
    deleteReminder({ id: data.id }),
}));
