using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // needed for async DB calls
using TaskBoard.API.Context;
using TaskBoard.API.Models;

namespace TaskBoard.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskBoardContext _context;

        public TaskController(TaskBoardContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _context.Tasks.FindAsync(id); // async version

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            try
            {
                var tasks = await _context.Tasks.ToListAsync(); // async version

                if (tasks == null || !tasks.Any())
                    return NotFound("No tasks found.");

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving tasks: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem task)
        {
            if (task == null)
                return BadRequest("Task data is required.");

            await _context.Tasks.AddAsync(task); // async version
            await _context.SaveChangesAsync();   // async version

            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem updatedTask)
        {
            if (id != updatedTask.Id)
                return BadRequest("Task ID mismatch.");

            var existingTask = await _context.Tasks.FindAsync(id);
            if (existingTask == null)
                return NotFound();

            // Update fields
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.isDone = updatedTask.isDone;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingTask);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating task: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);

            try
            {
                await _context.SaveChangesAsync();
                return NoContent(); // 204 No Content
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting task: {ex.Message}");
            }
        }



    }
}
