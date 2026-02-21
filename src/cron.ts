import cron from "node-cron";
import { LeaveService } from "./services/leave.service";

 export default cron.schedule("0 0 * * *", async () => {
    console.log("Running cron Job .....");
  await LeaveService.autoRejectExpiredLeaves();
  console.log("Cron job to auto-reject expired leaves completed");
});