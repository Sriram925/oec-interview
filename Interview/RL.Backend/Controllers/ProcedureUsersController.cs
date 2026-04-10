using Microsoft.AspNetCore.Mvc;
using RL.Data;
using RL.Data.DataModels;
using System.Data.Entity;

namespace RL.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ProcedureUsersController : ControllerBase
{
    private readonly RLContext _context;

    public ProcedureUsersController(RLContext context)
    {
        _context = context;
    }

    [HttpPost("")]
    public IActionResult AssignUser([FromBody] ProcedureUser assignment)
    {
        var exists = _context.ProcedureUsers.Any(x =>
       x.PlanId == assignment.PlanId &&
       x.ProcedureId == assignment.ProcedureId &&
       x.UserId == assignment.UserId);

        if (exists)
        {
            return Conflict("User already assigned to this procedure");
        }

        _context.ProcedureUsers.Add(assignment);
        _context.SaveChanges();

        return Ok();
    }

    [HttpGet("{planId}/{procedureId}")]
    public IActionResult GetUsers(int planId, int procedureId)
    {
        var users = _context.ProcedureUsers
            .Where(x => x.PlanId == planId && x.ProcedureId == procedureId)
            .Select(x => x.UserId)
            .ToList();
        return Ok(users);
    }


    [HttpDelete("{planId}/{procedureId}/{userId}")]
    public IActionResult RemoveUser(int planId, int procedureId, int userId)
    {
        var assignment = _context.ProcedureUsers
            .FirstOrDefault(x => x.PlanId == planId && x.ProcedureId == procedureId && x.UserId == userId);
        if (assignment != null)
        {
            _context.ProcedureUsers.Remove(assignment);
            _context.SaveChanges();
        }
        return Ok();
    }
    [HttpDelete("{planId}/{procedureId}")]
    public IActionResult RemoveAllUsers(int planId, int procedureId)
    {
        var assignments = _context.ProcedureUsers
            .Where(x => x.PlanId == planId && x.ProcedureId == procedureId)
            .ToList();
        if (assignments.Any())
        {
            _context.ProcedureUsers.RemoveRange(assignments);
            _context.SaveChanges();
        }
        return Ok();
    }
}

