import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  assignUserToProcedure,
  getAssignedUsers,
  removeUserFromProcedure,
  removeAllUsersFromProcedure,
} from "../../../api/api";

const PlanProcedureItem = ({ procedure, users, planId }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAssignUserToProcedure = async (e) => {
    const prev = selectedUsers || [];
    const current = e || [];
    if (current.length === 0 && prev.length > 0) {
      await removeAllUsersFromProcedure(planId, procedure.procedureId);
      fetchAssignedUsers();
      return;
    }

    const added = current.filter(
      (user) => !prev.some((u) => u.value === user.value),
    );
    const removed = prev.filter(
      (user) => !current.some((u) => u.value === user.value),
    );
    for (const user of added) {
      await assignUserToProcedure({
        planId: Number(planId),
        procedureId: procedure.procedureId,
        userId: user.value,
      });
    }
    for (const user of removed) {
      await removeUserFromProcedure(planId, procedure.procedureId, user.value);
    }

    fetchAssignedUsers();
  };

  const fetchAssignedUsers = async () => {
    const assignedUsers = await getAssignedUsers(planId, procedure.procedureId);
    const selectedOptions = users.filter((u) =>
      assignedUsers.includes(u.value),
    );
    setSelectedUsers(selectedOptions);
  };

  useEffect(() => {
    if (users.length > 0) {
      fetchAssignedUsers();
    }
  }, [users]);

  return (
    <div className="py-2">
      <div>{procedure.procedureTitle}</div>

      <ReactSelect
        className="mt-2"
        placeholder="Select User to Assign"
        isMulti={true}
        options={users}
        value={selectedUsers}
        onChange={handleAssignUserToProcedure}
        isClearable={true}
      />
    </div>
  );
};

export default PlanProcedureItem;
