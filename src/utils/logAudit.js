// utils/logAudit.js
import { AuditLog } from "../models/auditLog.model.js";

export const logAudit = async ({ userId, expenseId, action, metadata = {} }) => {
  try {
    await AuditLog.create({
      userId,
      expenseId,
      action,
      metadata,
    });
  } catch (err) {
    console.error("Error logging audit:", err);
   
  }
};
