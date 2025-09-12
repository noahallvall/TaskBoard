
using Microsoft.EntityFrameworkCore;
using TaskBoard.API.Models;
namespace TaskBoard.API.Context;

    public class TaskBoardContext : DbContext
    {   
        public TaskBoardContext(DbContextOptions<TaskBoardContext> options) : base(options)
        {


        }

        public DbSet<TaskItem> Tasks { get; set; }
    }
