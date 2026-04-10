const api_url = "http://localhost:10010";

export const startPlan = async () => {
    const url = `${api_url}/Plan`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) throw new Error("Failed to create plan");

    return await response.json();
};

export const addProcedureToPlan = async (planId, procedureId) => {
    const url = `${api_url}/Plan/AddProcedureToPlan`;
    var command = { planId: planId, procedureId: procedureId };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) throw new Error("Failed to create plan");

    return true;
};

export const getProcedures = async () => {
    const url = `${api_url}/Procedures`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get procedures");

    return await response.json();
};

export const getPlanProcedures = async (planId) => {
    const url = `${api_url}/PlanProcedure?$filter=planId eq ${planId}&$expand=procedure`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get plan procedures");

    return await response.json();
};

export const getUsers = async () => {
    const url = `${api_url}/Users`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get users");

    return await response.json();
};

const PROCEDURE_USER_API_BASE = "http://localhost:10010/ProcedureUsers";

export async function getAssignedUsers(planId, procedureId) {
  const res = await fetch(`${PROCEDURE_USER_API_BASE}/${planId}/${procedureId}`);
  return res.json();
}

export async function assignUserToProcedure({ planId, procedureId, userId }) {
  await fetch(PROCEDURE_USER_API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId, procedureId, userId }),
  });
}

export async function removeUserFromProcedure(planId, procedureId, userId) {
  await fetch(`${PROCEDURE_USER_API_BASE}/${planId}/${procedureId}/${userId}`, { method: "DELETE" });
}

export async function removeAllUsersFromProcedure(planId, procedureId) {
  await fetch(`${PROCEDURE_USER_API_BASE}/${planId}/${procedureId}`, { method: "DELETE" });
}