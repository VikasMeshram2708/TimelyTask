import { NextPage } from "next";
import AddReminder from "./add-reminder";
import ReminderCards from "../dashboard/activity/reminder-cards";
import { getReminders } from "@/data-access/actions";
import { Input } from "@/components/ui/input";

const PlayGroundPage: NextPage = async () => {
  const allReminders = getReminders();
  const reminders = await allReminders;
  
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-6 py-2">
        <div className="grid gap-3 py-10">
          <section className="flex items-center justify-between gap-24">
            {/* Add Reminder  */}
            <AddReminder />

            {/* Search bar */}
            <Input
              placeholder="Search reminders"
              type="text"
              className="container max-w-3xl"
            />
          </section>
          <h2 className="text-lg my-10 md:text-xl lg:text-2xl font-bold">
            Previous reminders
          </h2>

          {/* Show previous created reminders */}
          <ReminderCards data={reminders.meta?.data} />
        </div>
      </div>
    </div>
  );
};

export default PlayGroundPage;
