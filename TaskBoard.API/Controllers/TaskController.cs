using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskBoard.API.Context;
using TaskBoard.API.Models;

namespace TaskBoard.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private TaskBoardContext context;

        public TaskController(TaskBoardContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            try
            {
                var tasks = context.Tasks.ToList();

                if (tasks == null || !tasks.Any())
                {
                    return NotFound("No tasks found."); // 404 if the list is empty
                }

                return Ok(tasks); // 200 OK with JSON array of tasks
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                  $"Error retrieving tasks: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult CreateTask(TaskItem task)
        {
            // Validate the incoming task
            if (task == null)
            {
                return BadRequest("Task data is required.");
            }

            // Save the new task to the database
            context.Tasks.Add(task);
            context.SaveChanges();

            // Return 201 Created + the new task
            return CreatedAtAction(nameof(GetAllTasks), new { id = task.Id }, task);
        }







    }





}

