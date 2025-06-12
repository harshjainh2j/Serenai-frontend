interface ActivityEntry {
  type: string;
  name: string;
  description?: string;
  duration?: number;
}

interface ActivityStats {
  period: string;
  stats: {
    [key: string]: {
      count: number;
      totalDuration: number;
      activities: Array<{
        _id: string;
        type: string;
        name: string;
        description?: string;
        duration?: number;
        timestamp: string;
      }>;
    };
  };
  totalActivities: number;
}

export async function logActivity(
  data: ActivityEntry
): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}

export async function getActivityHistory(params?: {
  startDate?: string;
  endDate?: string;
  type?: string;
  limit?: number;
}): Promise<{ success: boolean; data: any[] }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);
  if (params?.type) queryParams.append("type", params.type);
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const response = await fetch(`/api/activity?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity history");
  }

  return response.json();
}

export async function getActivityStats(
  period: "week" | "month" | "year" = "week"
): Promise<{
  success: boolean;
  data: ActivityStats;
}> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`/api/activity/stats?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity statistics");
  }

  return response.json();
}
