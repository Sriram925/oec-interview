import React from "react";

const ProcedureItem = ({ procedure, handleAddProcedureToPlan, planProcedures }) => {
    const checkboxId = `procedure-${procedure.procedureId}`;
    return (
        <div className="py-2">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={checkboxId}
                    checked={
                        planProcedures.some(
                            (p) => p.procedureId === procedure.procedureId
                        )
                            ? true
                            : false
                    }
                    onChange={() => handleAddProcedureToPlan(procedure)}
                ></input>
                <label className="form-check-label" htmlFor={checkboxId}>
                    {procedure.procedureTitle}
                </label>
            </div>
        </div>
    );
};

export default ProcedureItem;
